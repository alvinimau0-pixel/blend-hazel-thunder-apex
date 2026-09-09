import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { addDaysIso, todayIso } from "@/lib/utils";
import type { SiteSnapshot } from "@/lib/domain";
import { shouldCommitProgress, photoList, packPhotos } from "@/lib/domain";
import {
  ACTIVITY_SEED,
  ASSIGNMENT_SEED,
  AUDIT_SEED,
  COMPANY_REV,
  CREW_SEED,
  FLOOR_CODES,
  FLOOR_DATES,
  PROGRESS_SEED,
  PROJECT,
  SCHEDULE_REV,
  TOILET_SEED,
} from "@/lib/seed-data";
import {
  MSK_ASSIGNMENT_SEED,
  MSK_ITEMS,
  MSK_LEVELS,
  MSK_PROGRESS,
  MSK_REV,
  TRADE_WEIGHT,
  seedAssignPhoto,
} from "@/lib/msk-seed";

type MetaRow = {
  project_name: string;
  project_code: string;
  subject: string;
  section: string;
  client_name: string;
  company_name?: string;
  schedule_rev?: string;
  company_rev?: string;
  msk_rev?: string;
};
type ActRow = { id: number; seq: number; name: string; contractor: string; gm_trade: boolean };
type FloorRow = { id: number; code: string; sort_order: number };
type ToiletRow = { id: number; code: string; tower: string };
type DateRow = { floor_id: number; activity_id: number; due_on: string };
type ProgRow = {
  floor_id: number;
  toilet_id: number;
  activity_id: number;
  pct: number;
  updated_at: string;
};
type CrewRow = {
  id: number;
  callsign: string;
  contractor: string;
  trade: string;
  active: boolean;
};
type AssignRow = {
  id: number;
  work_date: string;
  crew_id: number;
  floor_id: number;
  toilet_id: number;
  activity_id: number;
  start_pct: number;
  claimed_pct: number | null;
  note: string | null;
  photo_data: string | null;
  verified: boolean;
  rejected: boolean;
  created_at: string;
};
type AuditDb = {
  id: number;
  created_at: string;
  kind: string;
  floor_code: string;
  toilet_code: string;
  activity_seq: number;
  from_pct: number | null;
  to_pct: number | null;
  crew_callsign: string | null;
  note: string | null;
};
type MskItemRow = {
  id: number;
  seq: number;
  code: string;
  name: string;
  short_name: string;
  trade: string;
  trade_weight: string | number;
};
type MskLevelRow = { id: number; code: string; sort_order: number; zone: string; ffl: string };
type MskProgRow = {
  level_id: number;
  tower: string;
  item_id: number;
  pct: number;
  na: boolean | string;
  updated_at: string;
};
type MskAssignRow = {
  id: number;
  work_date: string;
  crew_id: number;
  level_id: number;
  tower: string;
  item_id: number;
  start_pct: number;
  claimed_pct: number | null;
  note: string | null;
  photo_data: string | null;
  verified: boolean | string;
  rejected: boolean | string;
  created_at: string;
};

async function insertRows(
  table: string,
  columns: string[],
  rows: unknown[][],
) {
  if (rows.length === 0) return;
  const sql = await getSql();
  const colList = columns.join(", ");
  const chunkSize = 80;
  for (let i = 0; i < rows.length; i += chunkSize) {
    const chunk = rows.slice(i, i + chunkSize);
    const params: unknown[] = [];
    const tuples = chunk.map((row) => {
      const marks = row.map((val) => {
        params.push(val);
        return `$${params.length}`;
      });
      return `(${marks.join(", ")})`;
    });
    await sql.query(`insert into ${table} (${colList}) values ${tuples.join(", ")}`, params);
  }
}

async function upsertRows(
  table: string,
  columns: string[],
  rows: unknown[][],
  conflict: string,
  updateSet: string,
) {
  if (rows.length === 0) return;
  const sql = await getSql();
  const colList = columns.join(", ");
  const chunkSize = 80;
  for (let i = 0; i < rows.length; i += chunkSize) {
    const chunk = rows.slice(i, i + chunkSize);
    const params: unknown[] = [];
    const tuples = chunk.map((row) => {
      const marks = row.map((val) => {
        params.push(val);
        return `$${params.length}`;
      });
      return `(${marks.join(", ")})`;
    });
    await sql.query(
      `insert into ${table} (${colList}) values ${tuples.join(", ")}
       on conflict (${conflict}) do update set ${updateSet}`,
      params,
    );
  }
}

function scheduleRows(floors: FloorRow[], toilets: ToiletRow[], acts: ActRow[]) {
  const floorId = Object.fromEntries(floors.map((f) => [f.code, f.id]));
  const toiletId = Object.fromEntries(toilets.map((t) => [t.code, t.id]));
  const actId = Object.fromEntries(acts.map((a) => [a.seq, a.id]));
  const dateRows: unknown[][] = [];
  const progRows: unknown[][] = [];
  for (const code of FLOOR_CODES) {
    const dates = FLOOR_DATES[code];
    for (let i = 0; i < dates.length; i++) {
      dateRows.push([floorId[code], actId[i + 1], dates[i]]);
    }
    const byToilet = PROGRESS_SEED[code];
    for (const tcode of Object.keys(byToilet) as Array<keyof typeof byToilet>) {
      const pcts = byToilet[tcode];
      for (let i = 0; i < pcts.length; i++) {
        progRows.push([floorId[code], toiletId[tcode], actId[i + 1], pcts[i]]);
      }
    }
  }
  return { dateRows, progRows };
}

async function applyOfficialSchedule() {
  const sql = await getSql();
  let meta: { schedule_rev: string | null } | undefined;
  try {
    [meta] = await sql<{ schedule_rev: string | null }>`
      select schedule_rev from site_meta where id = 1
    `;
  } catch {
    await sql.query(
      "alter table site_meta add column if not exists schedule_rev text not null default ''",
    );
    [meta] = await sql<{ schedule_rev: string | null }>`
      select schedule_rev from site_meta where id = 1
    `;
  }
  if ((meta?.schedule_rev ?? "") === SCHEDULE_REV) return;

  const floors = await sql<FloorRow>`select id, code, sort_order from floors`;
  const toilets = await sql<ToiletRow>`select id, code, tower from toilets`;
  const acts = await sql<ActRow>`select id, seq, name, contractor, gm_trade from activities`;
  const { dateRows, progRows } = scheduleRows(floors, toilets, acts);

  await upsertRows(
    "floor_dates",
    ["floor_id", "activity_id", "due_on"],
    dateRows,
    "floor_id, activity_id",
    "due_on = excluded.due_on",
  );
  await upsertRows(
    "progress",
    ["floor_id", "toilet_id", "activity_id", "pct"],
    progRows,
    "floor_id, toilet_id, activity_id",
    "pct = excluded.pct, updated_at = now()",
  );
  await sql`update site_meta set schedule_rev = ${SCHEDULE_REV} where id = 1`;
  await sql`
    insert into audit_log (kind, floor_code, toilet_code, activity_seq, from_pct, to_pct, crew_callsign, note)
    values (
      ${"import"},
      ${"CL19"},
      ${"T7"},
      ${3},
      ${100},
      ${0},
      ${"SHEET"},
      ${"Official sheet 28 AUG 26 applied"}
    )
  `;
}

async function ensureCompanyColumns() {
  const sql = await getSql();
  await sql.query(
    "alter table site_meta add column if not exists company_name text not null default 'Gelaran Maju Sdn Bhd'",
  );
  await sql.query(
    "alter table site_meta add column if not exists company_rev text not null default ''",
  );
  await sql.query(
    "alter table site_meta add column if not exists msk_rev text not null default ''",
  );
}

async function applyCompanyProfile() {
  const sql = await getSql();
  await ensureCompanyColumns();
  let meta: { company_rev: string | null } | undefined;
  try {
    [meta] = await sql<{ company_rev: string | null }>`
      select company_rev from site_meta where id = 1
    `;
  } catch {
    await ensureCompanyColumns();
    [meta] = await sql<{ company_rev: string | null }>`
      select company_rev from site_meta where id = 1
    `;
  }
  if ((meta?.company_rev ?? "") === COMPANY_REV) return;

  await sql`
    update site_meta set
      project_name = ${PROJECT.name},
      project_code = ${PROJECT.code},
      subject = ${PROJECT.subject},
      section = ${PROJECT.section},
      client_name = ${PROJECT.clientName},
      company_name = ${PROJECT.companyName}
    where id = 1
  `;

  await sql`update crew set active = false where contractor not in ('GM', 'SUB')`;

  for (const c of CREW_SEED) {
    await sql`
      insert into crew (callsign, contractor, trade, active)
      values (${c.callsign}, ${c.contractor}, ${c.trade}, true)
      on conflict (callsign) do update set
        contractor = excluded.contractor,
        trade = excluded.trade,
        active = true
    `;
  }

  await sql.query(`
    delete from assignments
    where crew_id in (select id from crew where contractor not in ('GM', 'SUB'))
  `);
  try {
    await sql.query(`
      delete from msk_assignments
      where crew_id in (select id from crew where contractor not in ('GM', 'SUB'))
    `);
  } catch {
    /* msk table may not exist on first boot */
  }

  const [concealed] = await sql<{ id: number }>`select id from activities where seq = 3`;
  const [fitting] = await sql<{ id: number }>`select id from activities where seq = 20`;
  const [islam] = await sql<{ id: number }>`select id from crew where callsign = 'Islam'`;
  if (islam && concealed) {
    await sql.query(
      `update assignments set activity_id = $1
       where crew_id = $2
         and activity_id not in (select id from activities where gm_trade = true)`,
      [concealed.id, islam.id],
    );
  }
  if (fitting) {
    await sql.query(
      `update assignments set activity_id = $1
       where crew_id in (select id from crew where contractor = 'GM')
         and activity_id not in (select id from activities where gm_trade = true)`,
      [fitting.id],
    );
  }

  for (const a of ASSIGNMENT_SEED) {
    const [crew] = await sql<{ id: number }>`select id from crew where callsign = ${a.callsign}`;
    const [floor] = await sql<{ id: number }>`select id from floors where code = ${a.floor}`;
    const [toilet] = await sql<{ id: number }>`select id from toilets where code = ${a.toilet}`;
    const [act] = await sql<{ id: number }>`select id from activities where seq = ${a.seq}`;
    if (!crew || !floor || !toilet || !act) continue;
    const [row] = await sql<{ id: number }>`
      select id from assignments
      where crew_id = ${crew.id} and work_date = ${a.workDate}::date
      order by id
      limit 1
    `;
    if (!row) {
      await sql`
        insert into assignments (
          work_date, crew_id, floor_id, toilet_id, activity_id,
          start_pct, claimed_pct, note, photo_data, verified, rejected
        ) values (
          ${a.workDate}::date, ${crew.id}, ${floor.id}, ${toilet.id}, ${act.id},
          ${a.startPct}, ${a.claimedPct}, ${a.note}, ${a.hasPhoto ? "seed-photo" : null},
          ${a.verified}, ${a.rejected}
        )
      `;
      continue;
    }
    await sql`
      update assignments set
        floor_id = ${floor.id},
        toilet_id = ${toilet.id},
        activity_id = ${act.id},
        start_pct = ${a.startPct},
        claimed_pct = ${a.claimedPct},
        note = ${a.note},
        verified = ${a.verified},
        rejected = ${a.rejected},
        photo_data = ${a.hasPhoto ? "seed-photo" : null}
      where id = ${row.id}
    `;
  }

  await ensureMskAssignmentSeed();

  await sql`update site_meta set company_rev = ${COMPANY_REV} where id = 1`;
}

async function ensureMskAssignmentSeed() {
  const sql = await getSql();
  try {
    const crew = await sql<CrewRow>`select id, callsign, contractor, trade, active from crew`;
    const levels = await sql<MskLevelRow>`select id, code, sort_order, zone, ffl from msk_levels`;
    const items = await sql<MskItemRow>`
      select id, seq, code, name, short_name, trade, trade_weight::text as trade_weight from msk_items
    `;
    const crewId = Object.fromEntries(crew.map((c) => [c.callsign, c.id]));
    const levelId = Object.fromEntries(levels.map((l) => [l.code, l.id]));
    const itemId = Object.fromEntries(items.map((i) => [i.seq, i.id]));
    for (const a of MSK_ASSIGNMENT_SEED) {
      const cid = crewId[a.callsign];
      const lid = levelId[a.level];
      const iid = itemId[a.seq];
      if (!cid || !lid || !iid) continue;
      const [row] = await sql<{ id: number }>`
        select id from msk_assignments
        where crew_id = ${cid}
          and work_date = ${a.workDate}::date
          and level_id = ${lid}
          and tower = ${a.tower}
          and item_id = ${iid}
        limit 1
      `;
      if (row) {
        await sql`
          update msk_assignments set
            start_pct = ${a.startPct},
            claimed_pct = ${a.claimedPct},
            note = ${a.note},
            verified = ${a.verified},
            rejected = ${a.rejected},
            photo_data = ${seedAssignPhoto(a)}
          where id = ${row.id}
        `;
        continue;
      }
      await sql`
        insert into msk_assignments (
          work_date, crew_id, level_id, tower, item_id,
          start_pct, claimed_pct, note, photo_data, verified, rejected
        ) values (
          ${a.workDate}::date, ${cid}, ${lid}, ${a.tower}, ${iid},
          ${a.startPct}, ${a.claimedPct}, ${a.note}, ${seedAssignPhoto(a)},
          ${a.verified}, ${a.rejected}
        )
      `;
    }
  } catch {
    /* msk tables may not exist on first boot */
  }
}

function mskProgressRows(levels: MskLevelRow[], items: MskItemRow[]) {
  const levelId = Object.fromEntries(levels.map((l) => [l.code, l.id]));
  const itemId = Object.fromEntries(items.map((i) => [i.seq, i.id]));
  const rows: unknown[][] = [];
  for (const tower of ["A", "B"] as const) {
    const byLevel = MSK_PROGRESS[tower];
    for (const level of MSK_LEVELS) {
      const vals = byLevel[level.code];
      for (let i = 0; i < vals.length; i++) {
        const raw = vals[i] ?? 0;
        const na = raw < 0;
        rows.push([levelId[level.code], tower, itemId[i + 1], na ? 0 : raw, na]);
      }
    }
  }
  return rows;
}

async function applyMskBoard() {
  const sql = await getSql();
  await ensureCompanyColumns();
  await sql.query(`create table if not exists msk_items (
      id serial primary key,
      seq integer not null unique,
      code text not null unique,
      name text not null,
      short_name text not null,
      trade text not null,
      trade_weight numeric not null
    )`);
  await sql.query(`create table if not exists msk_levels (
      id serial primary key,
      code text not null unique,
      sort_order integer not null,
      zone text not null,
      ffl text not null
    )`);
  await sql.query(`create table if not exists msk_progress (
      level_id integer not null references msk_levels(id),
      tower text not null,
      item_id integer not null references msk_items(id),
      pct integer not null default 0,
      na boolean not null default false,
      updated_at timestamptz not null default now(),
      primary key (level_id, tower, item_id)
    )`);
  await sql.query(`create table if not exists msk_assignments (
      id serial primary key,
      work_date date not null,
      crew_id integer not null references crew(id),
      level_id integer not null references msk_levels(id),
      tower text not null,
      item_id integer not null references msk_items(id),
      start_pct integer not null,
      claimed_pct integer,
      note text,
      photo_data text,
      verified boolean not null default false,
      rejected boolean not null default false,
      created_at timestamptz not null default now()
    )`);
  await sql.query(`create index if not exists msk_assignments_date_idx on msk_assignments (work_date)`);


  let meta: { msk_rev: string | null } | undefined;
  try {
    [meta] = await sql<{ msk_rev: string | null }>`select msk_rev from site_meta where id = 1`;
  } catch {
    await ensureCompanyColumns();
    [meta] = await sql<{ msk_rev: string | null }>`select msk_rev from site_meta where id = 1`;
  }
  if ((meta?.msk_rev ?? "") === MSK_REV) return;

  await upsertRows(
    "msk_items",
    ["seq", "code", "name", "short_name", "trade", "trade_weight"],
    MSK_ITEMS.map((i) => [i.seq, i.code, i.name, i.short, i.trade, TRADE_WEIGHT[i.trade]]),
    "seq",
    "code = excluded.code, name = excluded.name, short_name = excluded.short_name, trade = excluded.trade, trade_weight = excluded.trade_weight",
  );
  await upsertRows(
    "msk_levels",
    ["code", "sort_order", "zone", "ffl"],
    MSK_LEVELS.map((l) => [l.code, l.sort, l.zone, l.ffl]),
    "code",
    "sort_order = excluded.sort_order, zone = excluded.zone, ffl = excluded.ffl",
  );

  const levels = await sql<MskLevelRow>`select id, code, sort_order, zone, ffl from msk_levels`;
  const items = await sql<MskItemRow>`
    select id, seq, code, name, short_name, trade, trade_weight::text as trade_weight from msk_items
  `;
  await upsertRows(
    "msk_progress",
    ["level_id", "tower", "item_id", "pct", "na"],
    mskProgressRows(levels, items),
    "level_id, tower, item_id",
    "pct = excluded.pct, na = excluded.na, updated_at = now()",
  );

  const existingAssign = await sql<{ n: number }>`select count(*)::int as n from msk_assignments`;
  const crew = await sql<CrewRow>`select id, callsign, contractor, trade, active from crew`;
  const crewId = Object.fromEntries(crew.map((c) => [c.callsign, c.id]));
  const levelId = Object.fromEntries(levels.map((l) => [l.code, l.id]));
  const itemId = Object.fromEntries(items.map((i) => [i.seq, i.id]));
  await sql`delete from msk_assignments`;
  await insertRows(
    "msk_assignments",
    [
      "work_date",
      "crew_id",
      "level_id",
      "tower",
      "item_id",
      "start_pct",
      "claimed_pct",
      "note",
      "photo_data",
      "verified",
      "rejected",
    ],
    MSK_ASSIGNMENT_SEED.filter((a) => crewId[a.callsign] && levelId[a.level] && itemId[a.seq]).map((a) => [
      a.workDate,
      crewId[a.callsign],
      levelId[a.level],
      a.tower,
      itemId[a.seq],
      a.startPct,
      a.claimedPct,
      a.note,
      seedAssignPhoto(a),
      a.verified,
      a.rejected,
    ]),
  );
  void existingAssign;

  await sql`
    update site_meta set
      project_code = ${"CAPITOL-MSK"},
      subject = ${"Cold water, sanitary & irrigation — Capitol MSK"},
      section = ${"MSK · Towers A & B"}
    where id = 1
  `;
  await sql`update site_meta set msk_rev = ${MSK_REV} where id = 1`;
  await sql`
    insert into audit_log (kind, floor_code, toilet_code, activity_seq, from_pct, to_pct, crew_callsign, note)
    values (
      ${"import"},
      ${"L14"},
      ${"TA"},
      ${1},
      ${0},
      ${100},
      ${"SHEET"},
      ${"MSK board 01 SEP 26 — SAN toilets L23–L27 TA & TB 100%. Wares L24–L25 TB 100%. SAN tenant not started."}
    )
  `;
}

async function ensureSeeded() {
  const sql = await getSql();
  await ensureCompanyColumns();
  const existing = await sql<{ n: number }>`select count(*)::int as n from site_meta`;
  if ((existing[0]?.n ?? 0) > 0) {
    await applyOfficialSchedule();
    await applyCompanyProfile();
    await applyMskBoard();
    const { applyOpsBoard } = await import("@/lib/ops.functions");
    await applyOpsBoard();
    return;
  }

  await sql`
    insert into site_meta (id, project_name, project_code, subject, section, client_name, company_name, schedule_rev, company_rev)
    values (1, ${PROJECT.name}, ${PROJECT.code}, ${PROJECT.subject}, ${PROJECT.section}, ${PROJECT.clientName}, ${PROJECT.companyName}, ${SCHEDULE_REV}, ${COMPANY_REV})
  `;

  await insertRows(
    "activities",
    ["seq", "name", "contractor", "gm_trade"],
    ACTIVITY_SEED.map((a) => [a.seq, a.name, a.contractor, a.gmTrade]),
  );
  await insertRows(
    "floors",
    ["code", "sort_order"],
    FLOOR_CODES.map((code, i) => [code, i]),
  );
  await insertRows(
    "toilets",
    ["code", "tower"],
    TOILET_SEED.map((t) => [t.code, t.tower]),
  );
  await insertRows(
    "crew",
    ["callsign", "contractor", "trade", "active"],
    CREW_SEED.map((c) => [c.callsign, c.contractor, c.trade, true]),
  );

  const floors = await sql<FloorRow>`select id, code, sort_order from floors`;
  const toilets = await sql<ToiletRow>`select id, code, tower from toilets`;
  const acts = await sql<ActRow>`select id, seq, name, contractor, gm_trade from activities`;
  const crew = await sql<CrewRow>`select id, callsign, contractor, trade, active from crew`;

  const crewId = Object.fromEntries(crew.map((c) => [c.callsign, c.id]));
  const floorId = Object.fromEntries(floors.map((f) => [f.code, f.id]));
  const toiletId = Object.fromEntries(toilets.map((t) => [t.code, t.id]));
  const actId = Object.fromEntries(acts.map((a) => [a.seq, a.id]));
  const { dateRows, progRows } = scheduleRows(floors, toilets, acts);

  await insertRows("floor_dates", ["floor_id", "activity_id", "due_on"], dateRows);
  await insertRows("progress", ["floor_id", "toilet_id", "activity_id", "pct"], progRows);

  await insertRows(
    "assignments",
    [
      "work_date",
      "crew_id",
      "floor_id",
      "toilet_id",
      "activity_id",
      "start_pct",
      "claimed_pct",
      "note",
      "photo_data",
      "verified",
      "rejected",
    ],
    ASSIGNMENT_SEED.map((a) => [
      a.workDate,
      crewId[a.callsign],
      floorId[a.floor],
      toiletId[a.toilet],
      actId[a.seq],
      a.startPct,
      a.claimedPct,
      a.note,
      a.hasPhoto ? "seed-photo" : null,
      a.verified,
      a.rejected,
    ]),
  );

  await insertRows(
    "audit_log",
    [
      "created_at",
      "kind",
      "floor_code",
      "toilet_code",
      "activity_seq",
      "from_pct",
      "to_pct",
      "crew_callsign",
      "note",
    ],
    AUDIT_SEED.map((a) => [
      a.createdAt,
      a.kind,
      a.floor,
      a.toilet,
      a.seq,
      a.fromPct,
      a.toPct,
      a.callsign,
      a.note,
    ]),
  );

  await applyMskBoard();
  const { applyOpsBoard } = await import("@/lib/ops.functions");
  await applyOpsBoard();
}

function toBool(v: boolean | string | number): boolean {
  return v === true || v === "t" || v === "true" || v === 1 || v === "1";
}

async function loadMsk(sql: Awaited<ReturnType<typeof getSql>>): Promise<{
  mskItems: SiteSnapshot["mskItems"];
  mskLevels: SiteSnapshot["mskLevels"];
  mskProgress: SiteSnapshot["mskProgress"];
  mskAssignments: SiteSnapshot["mskAssignments"];
}> {
  try {
    const since = addDaysIso(todayIso(), -14);
    const [items, levels, progress, assignments] = await Promise.all([
      sql<MskItemRow>`
        select id, seq, code, name, short_name, trade, trade_weight::text as trade_weight
        from msk_items order by seq
      `,
      sql<MskLevelRow>`
        select id, code, sort_order, zone, ffl from msk_levels order by sort_order
      `,
      sql<MskProgRow>`
        select level_id, tower, item_id, pct, na, updated_at::text as updated_at from msk_progress
      `,
      sql<MskAssignRow>`
        select id, work_date, crew_id, level_id, tower, item_id,
               start_pct, claimed_pct, note, photo_data, verified, rejected,
               created_at::text as created_at
        from msk_assignments
        where work_date >= ${since}::date
        order by work_date desc, id desc
      `,
    ]);
    return {
      mskItems: items.map((i) => ({
        id: Number(i.id),
        seq: Number(i.seq),
        code: i.code,
        name: i.name,
        shortName: i.short_name,
        trade: i.trade as "CW" | "SAN" | "IRR",
        tradeWeight: Number(i.trade_weight),
      })),
      mskLevels: levels.map((l) => ({
        id: Number(l.id),
        code: l.code,
        sortOrder: Number(l.sort_order),
        zone: l.zone,
        ffl: l.ffl,
      })),
      mskProgress: progress.map((p) => ({
        levelId: Number(p.level_id),
        tower: p.tower as "A" | "B",
        itemId: Number(p.item_id),
        pct: Number(p.pct),
        na: toBool(p.na),
        updatedAt: String(p.updated_at),
      })),
      mskAssignments: assignments.map((a) => ({
        id: Number(a.id),
        workDate: String(a.work_date).slice(0, 10),
        crewId: Number(a.crew_id),
        levelId: Number(a.level_id),
        tower: a.tower as "A" | "B",
        itemId: Number(a.item_id),
        startPct: Number(a.start_pct),
        claimedPct: a.claimed_pct == null ? null : Number(a.claimed_pct),
        note: a.note,
        photoData: slimPhoto(a.photo_data, String(a.work_date).slice(0, 10) === todayIso()),
        verified: toBool(a.verified),
        rejected: toBool(a.rejected),
        createdAt: String(a.created_at),
      })),
    };
  } catch (err) {
    console.error("loadMsk failed", err);
    return { mskItems: [], mskLevels: [], mskProgress: [], mskAssignments: [] };
  }
}

function slimPhoto(raw: string | null | undefined, keepFull: boolean): string | null {
  if (!raw) return null;
  if (keepFull) return raw;
  if (raw.startsWith("data:")) return "inline-photo";
  if (raw.startsWith("[")) {
    try {
      const arr = JSON.parse(raw) as unknown;
      if (!Array.isArray(arr)) return raw;
      const kept = arr.filter((u): u is string => typeof u === "string" && u.length > 0 && !u.startsWith("data:"));
      if (kept.length === 0) return arr.length ? "inline-photo" : null;
      return packPhotos(kept);
    } catch {
      return raw;
    }
  }
  return raw;
}

async function loadSnapshot(): Promise<SiteSnapshot> {
  await ensureSeeded();
  const { ensureToday } = await import("@/lib/day-roll");
  await ensureToday();
  const sql = await getSql();
  const since = addDaysIso(todayIso(), -14);
  const [metaRows, activities, floors, toilets, dates, progress, crew, assignments, audit, msk] = await Promise.all([
    sql<MetaRow>`
      select project_name, project_code, subject, section, client_name, company_name from site_meta where id = 1
    `,
    sql<ActRow>`select id, seq, name, contractor, gm_trade from activities order by seq`,
    sql<FloorRow>`select id, code, sort_order from floors order by sort_order`,
    sql<ToiletRow>`select id, code, tower from toilets order by code`,
    sql<DateRow>`select floor_id, activity_id, due_on from floor_dates`,
    sql<ProgRow>`
      select floor_id, toilet_id, activity_id, pct, updated_at::text as updated_at from progress
    `,
    sql<CrewRow>`select id, callsign, contractor, trade, active from crew order by callsign`,
    sql<AssignRow>`
      select id, work_date, crew_id, floor_id, toilet_id, activity_id,
             start_pct, claimed_pct, note, photo_data, verified, rejected,
             created_at::text as created_at
      from assignments
      where work_date >= ${since}::date
      order by work_date desc, id desc
    `,
    sql<AuditDb>`
      select id, created_at::text as created_at, kind, floor_code, toilet_code,
             activity_seq, from_pct, to_pct, crew_callsign, note
      from audit_log
      order by created_at desc
      limit 40
    `,
    loadMsk(sql),
  ]);
  const [meta] = metaRows;
  if (!meta) throw new Error("Site is not seeded");

  return {
    projectName: meta.project_name,
    projectCode: meta.project_code,
    subject: meta.subject,
    section: meta.section,
    clientName: meta.client_name,
    companyName: meta.company_name || PROJECT.companyName,
    activities: activities.map((a) => ({
      id: Number(a.id),
      seq: Number(a.seq),
      name: a.name,
      contractor: a.contractor,
      gmTrade: toBool(a.gm_trade),
    })),
    floors: floors.map((f) => ({
      id: Number(f.id),
      code: f.code,
      sortOrder: Number(f.sort_order),
    })),
    toilets: toilets.map((t) => ({
      id: Number(t.id),
      code: t.code,
      tower: t.tower as "TA" | "TB",
    })),
    dates: dates.map((d) => ({
      floorId: Number(d.floor_id),
      activityId: Number(d.activity_id),
      dueOn: String(d.due_on).slice(0, 10),
    })),
    progress: progress.map((p) => ({
      floorId: Number(p.floor_id),
      toiletId: Number(p.toilet_id),
      activityId: Number(p.activity_id),
      pct: Number(p.pct),
      updatedAt: String(p.updated_at),
    })),
    crew: crew.map((c) => ({
      id: Number(c.id),
      callsign: c.callsign,
      contractor: c.contractor,
      trade: c.trade,
      active: toBool(c.active),
    })),
    assignments: assignments.map((a) => ({
      id: Number(a.id),
      workDate: String(a.work_date).slice(0, 10),
      crewId: Number(a.crew_id),
      floorId: Number(a.floor_id),
      toiletId: Number(a.toilet_id),
      activityId: Number(a.activity_id),
      startPct: Number(a.start_pct),
      claimedPct: a.claimed_pct == null ? null : Number(a.claimed_pct),
      note: a.note,
      photoData: slimPhoto(a.photo_data, String(a.work_date).slice(0, 10) === todayIso()),
      verified: toBool(a.verified),
      rejected: toBool(a.rejected),
      createdAt: String(a.created_at),
    })),
    audit: audit.map((a) => ({
      id: Number(a.id),
      createdAt: String(a.created_at),
      kind: a.kind,
      floorCode: a.floor_code,
      toiletCode: a.toilet_code,
      activitySeq: Number(a.activity_seq),
      fromPct: a.from_pct == null ? null : Number(a.from_pct),
      toPct: a.to_pct == null ? null : Number(a.to_pct),
      crewCallsign: a.crew_callsign,
      note: a.note,
    })),
    ...msk,
  };
}

export const getSnapshot = createServerFn({ method: "GET" }).handler(async () => {
  return loadSnapshot();
});

function ack(id?: number) {
  return id != null ? { ok: true as const, id } : { ok: true as const };
}

export const updateSchema = z.object({
  floorId: z.number(),
  toiletId: z.number(),
  activityId: z.number(),
  pct: z.number().int().min(0).max(100),
  crewId: z.number(),
  note: z.string().max(400).optional(),
  photoData: z.string().max(180_000).nullable().optional(),
  workDate: z.string(),
});

export const updateProgress = createServerFn({ method: "POST" })
  .validator(updateSchema)
  .handler(async ({ data }) => {
    const sql = await getSql();
    const [prev] = await sql<ProgRow>`
      select floor_id, toilet_id, activity_id, pct, updated_at::text as updated_at
      from progress
      where floor_id = ${data.floorId} and toilet_id = ${data.toiletId} and activity_id = ${data.activityId}
    `;
    const fromPct = prev?.pct ?? 0;
    const [crew] = await sql<CrewRow>`select id, callsign, contractor, trade, active from crew where id = ${data.crewId}`;
    if (!crew) throw new Error("Pick who did the work");
    const commit = shouldCommitProgress(crew.contractor);
    if (commit) {
      await sql`
        insert into progress (floor_id, toilet_id, activity_id, pct, updated_at)
        values (${data.floorId}, ${data.toiletId}, ${data.activityId}, ${data.pct}, now())
        on conflict (floor_id, toilet_id, activity_id)
        do update set pct = excluded.pct, updated_at = now()
      `;
    }

    const [floor] = await sql<FloorRow>`select id, code, sort_order from floors where id = ${data.floorId}`;
    const [toilet] = await sql<ToiletRow>`select id, code, tower from toilets where id = ${data.toiletId}`;
    const [act] = await sql<ActRow>`select id, seq, name, contractor, gm_trade from activities where id = ${data.activityId}`;

    const [existing] = await sql<{ id: number; photo_data: string | null }>`
      select id, photo_data from assignments
      where work_date = ${data.workDate}::date
        and crew_id = ${data.crewId}
        and floor_id = ${data.floorId}
        and toilet_id = ${data.toiletId}
        and activity_id = ${data.activityId}
      limit 1
    `;

    const nextPhoto = data.photoData
      ? packPhotos([...photoList(existing?.photo_data), data.photoData])
      : (existing?.photo_data ?? null);

    if (existing) {
      await sql`
        update assignments
        set claimed_pct = ${data.pct},
            note = coalesce(${data.note ?? null}, note),
            photo_data = ${nextPhoto},
            verified = ${commit},
            rejected = false
        where id = ${existing.id}
      `;
    } else {
      await sql`
        insert into assignments (
          work_date, crew_id, floor_id, toilet_id, activity_id,
          start_pct, claimed_pct, note, photo_data, verified, rejected
        ) values (
          ${data.workDate}::date,
          ${data.crewId},
          ${data.floorId},
          ${data.toiletId},
          ${data.activityId},
          ${fromPct},
          ${data.pct},
          ${data.note ?? null},
          ${nextPhoto},
          ${commit},
          false
        )
      `;
    }

    await sql`
      insert into audit_log (
        kind, floor_code, toilet_code, activity_seq, from_pct, to_pct, crew_callsign, note
      ) values (
        ${"progress"},
        ${floor.code},
        ${toilet.code},
        ${act.seq},
        ${fromPct},
        ${data.pct},
        ${crew.callsign},
        ${data.note ?? null}
      )
    `;

    return ack();
  });

export const assignSchema = z.object({
  workDate: z.string(),
  crewId: z.number(),
  floorId: z.number(),
  toiletId: z.number(),
  activityId: z.number(),
  note: z.string().max(400).optional(),
});

export const assignCrew = createServerFn({ method: "POST" })
  .validator(assignSchema)
  .handler(async ({ data }) => {
    const sql = await getSql();
    const [prev] = await sql<{ pct: number }>`
      select pct from progress
      where floor_id = ${data.floorId} and toilet_id = ${data.toiletId} and activity_id = ${data.activityId}
    `;
    const startPct = prev?.pct ?? 0;
    const [existing] = await sql<{ id: number }>`
      select id from assignments
      where work_date = ${data.workDate}::date
        and crew_id = ${data.crewId}
        and floor_id = ${data.floorId}
        and toilet_id = ${data.toiletId}
        and activity_id = ${data.activityId}
      limit 1
    `;
    if (existing) {
      await sql`
        update assignments
        set note = coalesce(${data.note ?? null}, note), rejected = false
        where id = ${existing.id}
      `;
      return ack(Number(existing.id));
    }
    const [created] = await sql<{ id: number }>`
      insert into assignments (
        work_date, crew_id, floor_id, toilet_id, activity_id, start_pct, note
      ) values (
        ${data.workDate}::date,
        ${data.crewId},
        ${data.floorId},
        ${data.toiletId},
        ${data.activityId},
        ${startPct},
        ${data.note ?? null}
      )
      returning id
    `;
    const [floor] = await sql<FloorRow>`select id, code, sort_order from floors where id = ${data.floorId}`;
    const [toilet] = await sql<ToiletRow>`select id, code, tower from toilets where id = ${data.toiletId}`;
    const [act] = await sql<ActRow>`select id, seq, name, contractor, gm_trade from activities where id = ${data.activityId}`;
    const [crew] = await sql<CrewRow>`select id, callsign, contractor, trade, active from crew where id = ${data.crewId}`;
    await sql`
      insert into audit_log (kind, floor_code, toilet_code, activity_seq, from_pct, to_pct, crew_callsign, note)
      values (${"assign"}, ${floor.code}, ${toilet.code}, ${act.seq}, ${startPct}, ${startPct}, ${crew.callsign}, ${data.note ?? "Assigned"})
    `;
    return ack(Number(created?.id ?? 0));
  });

export const verifySchema = z.object({
  assignmentId: z.number(),
  action: z.enum(["verify", "reject"]),
});

export type UpdateInput = z.infer<typeof updateSchema>;
export type AssignInput = z.infer<typeof assignSchema>;
export type VerifyInput = z.infer<typeof verifySchema>;

export const reviewAssignment = createServerFn({ method: "POST" })
  .validator(verifySchema)
  .handler(async ({ data }) => {
    const sql = await getSql();
    const verified = data.action === "verify";
    const [row] = await sql<AssignRow>`
      select id, work_date, crew_id, floor_id, toilet_id, activity_id,
             start_pct, claimed_pct, note, photo_data, verified, rejected,
             created_at::text as created_at
      from assignments where id = ${data.assignmentId}
    `;
    if (!row) return ack();

    if (verified && row.claimed_pct != null) {
      await sql`
        insert into progress (floor_id, toilet_id, activity_id, pct, updated_at)
        values (${row.floor_id}, ${row.toilet_id}, ${row.activity_id}, ${row.claimed_pct}, now())
        on conflict (floor_id, toilet_id, activity_id)
        do update set pct = excluded.pct, updated_at = now()
      `;
    }
    if (!verified) {
      const [board] = await sql<{ pct: number }>`
        select pct from progress
        where floor_id = ${row.floor_id} and toilet_id = ${row.toilet_id} and activity_id = ${row.activity_id}
      `;
      if (board && row.claimed_pct != null && Number(board.pct) === Number(row.claimed_pct)) {
        await sql`
          update progress
          set pct = ${row.start_pct}, updated_at = now()
          where floor_id = ${row.floor_id} and toilet_id = ${row.toilet_id} and activity_id = ${row.activity_id}
        `;
      }
    }

    await sql`
      update assignments
      set verified = ${verified}, rejected = ${!verified}
      where id = ${data.assignmentId}
    `;
    const [floor] = await sql<FloorRow>`select id, code, sort_order from floors where id = ${row.floor_id}`;
    const [toilet] = await sql<ToiletRow>`select id, code, tower from toilets where id = ${row.toilet_id}`;
    const [act] = await sql<ActRow>`select id, seq, name, contractor, gm_trade from activities where id = ${row.activity_id}`;
    const [crew] = await sql<CrewRow>`select id, callsign, contractor, trade, active from crew where id = ${row.crew_id}`;
    await sql`
      insert into audit_log (kind, floor_code, toilet_code, activity_seq, from_pct, to_pct, crew_callsign, note)
      values (
        ${data.action},
        ${floor.code},
        ${toilet.code},
        ${act.seq},
        ${row.start_pct},
        ${row.claimed_pct},
        ${crew.callsign},
        ${data.action === "verify" ? "Verified — on the board" : "Rejected — sub update not accepted"}
      )
    `;
    return ack();
  });

export const mskUpdateSchema = z.object({
  levelId: z.number(),
  tower: z.enum(["A", "B"]),
  itemId: z.number(),
  pct: z.number().int().min(0).max(100),
  crewId: z.number(),
  note: z.string().max(400).optional(),
  photoData: z.string().max(180_000).nullable().optional(),
  workDate: z.string(),
});

export type MskUpdateInput = z.infer<typeof mskUpdateSchema>;

export const updateMskProgress = createServerFn({ method: "POST" })
  .validator(mskUpdateSchema)
  .handler(async ({ data }) => {
    const sql = await getSql();
    const [prev] = await sql<MskProgRow>`
      select level_id, tower, item_id, pct, na, updated_at::text as updated_at
      from msk_progress
      where level_id = ${data.levelId} and tower = ${data.tower} and item_id = ${data.itemId}
    `;
    const fromPct = prev?.pct ?? 0;
    const [crew] = await sql<CrewRow>`select id, callsign, contractor, trade, active from crew where id = ${data.crewId}`;
    if (!crew) throw new Error("Pick who did the work");
    const commit = shouldCommitProgress(crew.contractor);
    if (commit) {
      await sql`
        insert into msk_progress (level_id, tower, item_id, pct, na, updated_at)
        values (${data.levelId}, ${data.tower}, ${data.itemId}, ${data.pct}, false, now())
        on conflict (level_id, tower, item_id)
        do update set pct = excluded.pct, na = false, updated_at = now()
      `;
    }
    const [level] = await sql<MskLevelRow>`select id, code, sort_order, zone, ffl from msk_levels where id = ${data.levelId}`;
    const [item] = await sql<MskItemRow>`
      select id, seq, code, name, short_name, trade, trade_weight::text as trade_weight from msk_items where id = ${data.itemId}
    `;

    const [existing] = await sql<{ id: number; photo_data: string | null }>`
      select id, photo_data from msk_assignments
      where work_date = ${data.workDate}::date
        and crew_id = ${data.crewId}
        and level_id = ${data.levelId}
        and tower = ${data.tower}
        and item_id = ${data.itemId}
      limit 1
    `;
    const nextPhoto = data.photoData
      ? packPhotos([...photoList(existing?.photo_data), data.photoData])
      : (existing?.photo_data ?? null);
    if (existing) {
      await sql`
        update msk_assignments
        set claimed_pct = ${data.pct},
            note = coalesce(${data.note ?? null}, note),
            photo_data = ${nextPhoto},
            verified = ${commit},
            rejected = false
        where id = ${existing.id}
      `;
    } else {
      await sql`
        insert into msk_assignments (
          work_date, crew_id, level_id, tower, item_id,
          start_pct, claimed_pct, note, photo_data, verified, rejected
        ) values (
          ${data.workDate}::date, ${data.crewId}, ${data.levelId}, ${data.tower}, ${data.itemId},
          ${fromPct}, ${data.pct}, ${data.note ?? null}, ${nextPhoto}, ${commit}, false
        )
      `;
    }
    await sql`
      insert into audit_log (kind, floor_code, toilet_code, activity_seq, from_pct, to_pct, crew_callsign, note)
      values (
        ${"msk-progress"},
        ${level.code},
        ${`T${data.tower}`},
        ${item.seq},
        ${fromPct},
        ${data.pct},
        ${crew.callsign},
        ${data.note ?? null}
      )
    `;
    return ack();
  });

export const mskAssignSchema = z.object({
  workDate: z.string(),
  crewId: z.number(),
  levelId: z.number(),
  tower: z.enum(["A", "B"]),
  itemId: z.number(),
  note: z.string().max(400).optional(),
});

export type MskAssignInput = z.infer<typeof mskAssignSchema>;

export const assignMskCrew = createServerFn({ method: "POST" })
  .validator(mskAssignSchema)
  .handler(async ({ data }) => {
    const sql = await getSql();
    const [prev] = await sql<{ pct: number }>`
      select pct from msk_progress
      where level_id = ${data.levelId} and tower = ${data.tower} and item_id = ${data.itemId}
    `;
    const startPct = prev?.pct ?? 0;
    const [existing] = await sql<{ id: number }>`
      select id from msk_assignments
      where work_date = ${data.workDate}::date
        and crew_id = ${data.crewId}
        and level_id = ${data.levelId}
        and tower = ${data.tower}
        and item_id = ${data.itemId}
      limit 1
    `;
    if (existing) {
      await sql`
        update msk_assignments
        set note = coalesce(${data.note ?? null}, note), rejected = false
        where id = ${existing.id}
      `;
    } else {
      await sql`
        insert into msk_assignments (work_date, crew_id, level_id, tower, item_id, start_pct, note)
        values (${data.workDate}::date, ${data.crewId}, ${data.levelId}, ${data.tower}, ${data.itemId}, ${startPct}, ${data.note ?? null})
      `;
    }
    const [level] = await sql<MskLevelRow>`select id, code, sort_order, zone, ffl from msk_levels where id = ${data.levelId}`;
    const [item] = await sql<MskItemRow>`
      select id, seq, code, name, short_name, trade, trade_weight::text as trade_weight from msk_items where id = ${data.itemId}
    `;
    const [crew] = await sql<CrewRow>`select id, callsign, contractor, trade, active from crew where id = ${data.crewId}`;
    await sql`
      insert into audit_log (kind, floor_code, toilet_code, activity_seq, from_pct, to_pct, crew_callsign, note)
      values (${"msk-assign"}, ${level.code}, ${`T${data.tower}`}, ${item.seq}, ${startPct}, ${startPct}, ${crew.callsign}, ${data.note ?? "Assigned"})
    `;
    const [row] = existing
      ? [existing]
      : await sql<{ id: number }>`
          select id from msk_assignments
          where work_date = ${data.workDate}::date
            and crew_id = ${data.crewId}
            and level_id = ${data.levelId}
            and tower = ${data.tower}
            and item_id = ${data.itemId}
          order by id desc
          limit 1
        `;
    return ack(Number(row?.id ?? 0));
  });

export const attachPhotoSchema = z.object({
  assignmentId: z.number(),
  photoData: z.string().max(180_000),
  kind: z.enum(["msk", "toilet"]).default("msk"),
});

export type AttachPhotoInput = z.infer<typeof attachPhotoSchema>;

export const attachAssignmentPhoto = createServerFn({ method: "POST" })
  .validator(attachPhotoSchema)
  .handler(async ({ data }) => {
    const sql = await getSql();
    if (data.kind === "toilet") {
      const [row] = await sql<{ photo_data: string | null }>`select photo_data from assignments where id = ${data.assignmentId}`;
      const next = packPhotos([...photoList(row?.photo_data), data.photoData]);
      await sql`update assignments set photo_data = ${next} where id = ${data.assignmentId}`;
    } else {
      const [row] = await sql<{ photo_data: string | null }>`select photo_data from msk_assignments where id = ${data.assignmentId}`;
      const next = packPhotos([...photoList(row?.photo_data), data.photoData]);
      await sql`update msk_assignments set photo_data = ${next} where id = ${data.assignmentId}`;
    }
    return ack();
  });

export const reviewMskAssignment = createServerFn({ method: "POST" })
  .validator(verifySchema)
  .handler(async ({ data }) => {
    const sql = await getSql();
    const verified = data.action === "verify";
    const [row] = await sql<MskAssignRow>`
      select id, work_date, crew_id, level_id, tower, item_id,
             start_pct, claimed_pct, note, photo_data, verified, rejected,
             created_at::text as created_at
      from msk_assignments where id = ${data.assignmentId}
    `;
    if (!row) return ack();

    if (verified && row.claimed_pct != null) {
      await sql`
        insert into msk_progress (level_id, tower, item_id, pct, na, updated_at)
        values (${row.level_id}, ${row.tower}, ${row.item_id}, ${row.claimed_pct}, false, now())
        on conflict (level_id, tower, item_id)
        do update set pct = excluded.pct, na = false, updated_at = now()
      `;
    }
    if (!verified) {
      const [board] = await sql<{ pct: number }>`
        select pct from msk_progress
        where level_id = ${row.level_id} and tower = ${row.tower} and item_id = ${row.item_id}
      `;
      if (board && row.claimed_pct != null && Number(board.pct) === Number(row.claimed_pct)) {
        await sql`
          update msk_progress
          set pct = ${row.start_pct}, updated_at = now()
          where level_id = ${row.level_id} and tower = ${row.tower} and item_id = ${row.item_id}
        `;
      }
    }

    await sql`
      update msk_assignments
      set verified = ${verified}, rejected = ${!verified}
      where id = ${data.assignmentId}
    `;
    const [level] = await sql<MskLevelRow>`select id, code, sort_order, zone, ffl from msk_levels where id = ${row.level_id}`;
    const [item] = await sql<MskItemRow>`
      select id, seq, code, name, short_name, trade, trade_weight::text as trade_weight from msk_items where id = ${row.item_id}
    `;
    const [crew] = await sql<CrewRow>`select id, callsign, contractor, trade, active from crew where id = ${row.crew_id}`;
    await sql`
      insert into audit_log (kind, floor_code, toilet_code, activity_seq, from_pct, to_pct, crew_callsign, note)
      values (
        ${data.action},
        ${level.code},
        ${`T${row.tower}`},
        ${item.seq},
        ${row.start_pct},
        ${row.claimed_pct},
        ${crew.callsign},
        ${data.action === "verify" ? "Verified MSK — on the board" : "Rejected — sub update not accepted"}
      )
    `;
    return ack();
  });
