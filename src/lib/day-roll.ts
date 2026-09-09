import { getSql } from "@/lib/db";
import { mean, roundPct } from "@/lib/domain";
import { REPORT_DATE } from "@/lib/company";
import { TRADE_WEIGHT } from "@/lib/msk-seed";
import {
  addDaysIso,
  dayOfMonth,
  formatPeriod,
  formatStamp,
  mondayOf,
  monthTitle,
  prevMonthIso,
  todayIso,
  weekPeriod,
} from "@/lib/utils";

function toBool(v: boolean | string | number): boolean {
  return v === true || v === "t" || v === "true" || v === 1 || v === "1";
}

function isoDay(v: unknown): string {
  if (v instanceof Date && !Number.isNaN(v.getTime())) {
    return v.toISOString().slice(0, 10);
  }
  const s = String(v ?? "");
  const m = s.match(/^(\d{4}-\d{2}-\d{2})/);
  return m?.[1] ?? "";
}

export type DayPublish = {
  dated: string;
  lock: number;
  rolled: number;
  daily: boolean;
  weekly: boolean;
  monthly: boolean;
};

async function liveLock(sql: Awaited<ReturnType<typeof getSql>>): Promise<{
  lock: number;
  cw: number;
  san: number;
  irr: number;
}> {
  try {
    const rows = await sql<{ trade: string; pct: number; na: boolean | string }>`
      select i.trade, p.pct, p.na
      from msk_progress p
      join msk_items i on i.id = p.item_id
    `;
    const byTrade: Record<"CW" | "SAN" | "IRR", number[]> = { CW: [], SAN: [], IRR: [] };
    for (const r of rows) {
      if (toBool(r.na)) continue;
      const t = r.trade as "CW" | "SAN" | "IRR";
      if (byTrade[t]) byTrade[t].push(Number(r.pct));
    }
    const cw = mean(byTrade.CW);
    const san = mean(byTrade.SAN);
    const irr = mean(byTrade.IRR);
    const weightSum = TRADE_WEIGHT.CW + TRADE_WEIGHT.SAN + TRADE_WEIGHT.IRR;
    return {
      lock: roundPct((cw * TRADE_WEIGHT.CW + san * TRADE_WEIGHT.SAN + irr * TRADE_WEIGHT.IRR) / weightSum),
      cw: roundPct(cw),
      san: roundPct(san),
      irr: roundPct(irr),
    };
  } catch {
    return { lock: 0, cw: 0, san: 0, irr: 0 };
  }
}

async function crewBlurb(sql: Awaited<ReturnType<typeof getSql>>, dated: string): Promise<string> {
  try {
    const rows = await sql<{
      callsign: string;
      contractor: string;
      level: string;
      tower: string;
      short: string;
      start_pct: number;
      claimed_pct: number | null;
      verified: boolean | string;
    }>`
      select c.callsign, c.contractor, l.code as level, a.tower, i.short_name as short,
             a.start_pct, a.claimed_pct, a.verified
      from msk_assignments a
      join crew c on c.id = a.crew_id
      join msk_levels l on l.id = a.level_id
      join msk_items i on i.id = a.item_id
      where a.work_date = ${dated}::date
      order by c.callsign
    `;
    if (rows.length === 0) return "No MSK tickets today.";
    return rows
      .map((r) => {
        const claimed = r.claimed_pct == null ? "assigned" : `${r.claimed_pct}%`;
        const waiting = r.contractor === "SUB" && !toBool(r.verified) && r.claimed_pct != null ? " waiting check" : "";
        return `${r.callsign} ${r.level} T${r.tower} ${r.short} ${r.start_pct}% → ${claimed}${waiting}`;
      })
      .join(". ");
  } catch {
    return "Crew list not ready.";
  }
}

async function rollToilet(sql: Awaited<ReturnType<typeof getSql>>, dated: string): Promise<number> {
  const [src] = await sql<{ d: string | null }>`
    select max(work_date)::text as d from assignments where work_date < ${dated}::date
  `;
  const from = isoDay(src?.d);
  if (!from) return 0;
  const rows = await sql<{
    crew_id: number;
    floor_id: number;
    toilet_id: number;
    activity_id: number;
    start_pct: number;
    claimed_pct: number | null;
    note: string | null;
    verified: boolean | string;
    rejected: boolean | string;
  }>`
    select crew_id, floor_id, toilet_id, activity_id, start_pct, claimed_pct, note, verified, rejected
    from assignments
    where work_date = ${from}::date
  `;
  let n = 0;
  for (const a of rows) {
    if (toBool(a.rejected)) continue;
    if (a.claimed_pct != null && Number(a.claimed_pct) >= 100) continue;
    const [exists] = await sql<{ id: number }>`
      select id from assignments
      where work_date = ${dated}::date
        and crew_id = ${a.crew_id}
        and floor_id = ${a.floor_id}
        and toilet_id = ${a.toilet_id}
        and activity_id = ${a.activity_id}
      limit 1
    `;
    if (exists) continue;
    const [board] = await sql<{ pct: number }>`
      select pct from progress
      where floor_id = ${a.floor_id} and toilet_id = ${a.toilet_id} and activity_id = ${a.activity_id}
    `;
    const start = board ? Number(board.pct) : Number(a.start_pct);
    if (start >= 100) continue;
    const [crew] = await sql<{ contractor: string }>`select contractor from crew where id = ${a.crew_id}`;
    const pendingSub =
      crew?.contractor === "SUB" &&
      a.claimed_pct != null &&
      !toBool(a.verified) &&
      Number(a.claimed_pct) !== start;
    const claimed = pendingSub ? Number(a.claimed_pct) : a.claimed_pct == null ? null : start;
    await sql`
      insert into assignments (
        work_date, crew_id, floor_id, toilet_id, activity_id,
        start_pct, claimed_pct, note, photo_data, verified, rejected
      ) values (
        ${dated}::date, ${a.crew_id}, ${a.floor_id}, ${a.toilet_id}, ${a.activity_id},
        ${start}, ${claimed}, ${a.note}, ${null}, ${false}, ${false}
      )
    `;
    n += 1;
  }
  return n;
}

async function rollMsk(sql: Awaited<ReturnType<typeof getSql>>, dated: string): Promise<number> {
  const [src] = await sql<{ d: string | null }>`
    select max(work_date)::text as d from msk_assignments where work_date < ${dated}::date
  `;
  const from = isoDay(src?.d);
  if (!from) return 0;
  const rows = await sql<{
    crew_id: number;
    level_id: number;
    tower: string;
    item_id: number;
    start_pct: number;
    claimed_pct: number | null;
    note: string | null;
    verified: boolean | string;
    rejected: boolean | string;
  }>`
    select crew_id, level_id, tower, item_id, start_pct, claimed_pct, note, verified, rejected
    from msk_assignments
    where work_date = ${from}::date
  `;
  let n = 0;
  for (const a of rows) {
    if (toBool(a.rejected)) continue;
    if (a.claimed_pct != null && Number(a.claimed_pct) >= 100) continue;
    const [exists] = await sql<{ id: number }>`
      select id from msk_assignments
      where work_date = ${dated}::date
        and crew_id = ${a.crew_id}
        and level_id = ${a.level_id}
        and tower = ${a.tower}
        and item_id = ${a.item_id}
      limit 1
    `;
    if (exists) continue;
    const [board] = await sql<{ pct: number; na: boolean | string }>`
      select pct, na from msk_progress
      where level_id = ${a.level_id} and tower = ${a.tower} and item_id = ${a.item_id}
    `;
    if (board && toBool(board.na)) continue;
    const start = board ? Number(board.pct) : Number(a.start_pct);
    if (start >= 100) continue;
    const [crew] = await sql<{ contractor: string }>`select contractor from crew where id = ${a.crew_id}`;
    const pendingSub =
      crew?.contractor === "SUB" &&
      a.claimed_pct != null &&
      !toBool(a.verified) &&
      Number(a.claimed_pct) !== start;
    const claimed = pendingSub ? Number(a.claimed_pct) : a.claimed_pct == null ? null : start;
    await sql`
      insert into msk_assignments (
        work_date, crew_id, level_id, tower, item_id,
        start_pct, claimed_pct, note, photo_data, verified, rejected
      ) values (
        ${dated}::date, ${a.crew_id}, ${a.level_id}, ${a.tower}, ${a.item_id},
        ${start}, ${claimed}, ${a.note}, ${null}, ${false}, ${false}
      )
    `;
    n += 1;
  }
  if (n > 0) {
    await sql`
      insert into audit_log (kind, floor_code, toilet_code, activity_seq, from_pct, to_pct, crew_callsign, note)
      values (
        ${"assign"},
        ${"MSK"},
        ${"TA"},
        ${0},
        ${0},
        ${0},
        ${"SHEET"},
        ${`Unfinished tickets carried ${formatStamp(from)} → ${formatStamp(dated)}`}
      )
    `;
  }
  return n;
}

async function upsertReport(
  sql: Awaited<ReturnType<typeof getSql>>,
  pid: number,
  cadence: "daily" | "weekly" | "monthly",
  period: string,
  dated: string,
  lock: number,
  summary: string,
  status: string,
  force: boolean,
): Promise<boolean> {
  const matchDated = cadence === "daily";
  const existing = matchDated
    ? await sql<{ id: number; status: string }>`
        select id, status from ops_reports
        where project_id = ${pid} and cadence = ${cadence} and dated = ${dated}
        limit 1
      `
    : await sql<{ id: number; status: string }>`
        select id, status from ops_reports
        where project_id = ${pid} and cadence = ${cadence} and period = ${period}
        order by id desc
        limit 1
      `;
  const row = existing[0];
  if (row && !force) return false;
  if (row) {
    await sql`
      update ops_reports
      set dated = ${dated}, lock_pct = ${lock}, summary = ${summary}, status = ${status}
      where id = ${row.id}
    `;
    return true;
  }
  await sql`
    insert into ops_reports (project_id, cadence, period, dated, lock_pct, summary, status, prepared_by)
    values (${pid}, ${cadence}, ${period}, ${dated}, ${lock}, ${summary}, ${status}, ${"Alvin"})
  `;
  return true;
}

async function publishReports(
  sql: Awaited<ReturnType<typeof getSql>>,
  dated: string,
  force: boolean,
): Promise<{ daily: boolean; weekly: boolean; monthly: boolean; lock: number }> {
  const [capitol] = await sql<{ id: number }>`select id from ops_projects where code = ${"capitol"}`;
  if (!capitol) return { daily: false, weekly: false, monthly: false, lock: 0 };
  const pid = capitol.id;
  const trades = await liveLock(sql);
  const crew = await crewBlurb(sql, dated);
  const sheet = formatPeriod(REPORT_DATE);
  const dailySummary = `Auto-published ${formatPeriod(dated)}. Last official MSK sheet ${sheet}. Lock ${trades.lock}% (CW ${trades.cw} / SAN ${trades.san} / IRR ${trades.irr}). ${crew}`;
  const week = weekPeriod(dated);
  const weekStart = mondayOf(dated);
  const weekEnd = addDaysIso(weekStart, 6);
  const weeklySummary = `Week ${formatPeriod(weekStart)} to ${formatPeriod(weekEnd)}. Live lock ${trades.lock}%. Last official sheet ${sheet}. ${crew}`;
  const closePrev = dayOfMonth(dated) === 1;
  const monthIso = closePrev ? prevMonthIso(dated) : dated;
  const month = monthTitle(monthIso);
  const monthStatus = closePrev ? "issued" : "draft";
  const monthlySummary = closePrev
    ? `${month} close on ${formatPeriod(dated)}. Tower lock ${trades.lock}%. Last official sheet ${sheet}. PC36 certified. PC37 draft for Jenny.`
    : `${month} in progress. Live lock ${trades.lock}%. Last official sheet ${sheet}.`;

  const daily = await upsertReport(sql, pid, "daily", formatPeriod(dated), dated, trades.lock, dailySummary, "issued", force);
  const weekly = await upsertReport(sql, pid, "weekly", week, dated, trades.lock, weeklySummary, "issued", force);
  const monthly = await upsertReport(sql, pid, "monthly", month, dated, trades.lock, monthlySummary, monthStatus, force);
  return { daily, weekly, monthly, lock: trades.lock };
}

const rolledDates = new Set<string>();

export async function ensureToday(dated = todayIso(), force = false): Promise<DayPublish> {
  if (!force && rolledDates.has(dated)) {
    return { dated, lock: 0, rolled: 0, daily: false, weekly: false, monthly: false };
  }
  if (!force) rolledDates.add(dated);
  const sql = await getSql();
  let rolled = 0;
  try {
    rolled += await rollMsk(sql, dated);
  } catch {
    /* msk tables may not exist yet */
  }
  try {
    rolled += await rollToilet(sql, dated);
  } catch {
    /* toilet tables may not exist yet */
  }
  let published = { daily: false, weekly: false, monthly: false, lock: 0 };
  try {
    published = await publishReports(sql, dated, force);
  } catch {
    /* reports table may not exist yet */
  }
  if (force) rolledDates.add(dated);
  return { dated, lock: published.lock, rolled, daily: published.daily, weekly: published.weekly, monthly: published.monthly };
}
