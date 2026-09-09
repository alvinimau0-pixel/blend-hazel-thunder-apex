import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import {
  ADVANCE_SEED,
  CLAIM_SEED,
  DRAWING_SEED,
  OPS_REV,
  PO_SEED,
  PROJECT_SEED,
  RECEIVE_SEED,
  REPORT_SEED,
  SUB_SEED,
  WORKER_SEED,
} from "@/lib/ops-seed";
import type {
  OpsAdvance,
  OpsAttend,
  OpsClaim,
  OpsDrawing,
  OpsPerson,
  OpsPo,
  OpsProject,
  OpsReceive,
  OpsRepay,
  OpsReport,
  OpsSalary,
  OpsSnapshot,
} from "@/lib/ops";
import { ensureToday } from "@/lib/day-roll";

function toBool(v: boolean | string | number): boolean {
  return v === true || v === "t" || v === "true" || v === 1 || v === "1";
}

function parsePhotos(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw.filter((x): x is string => typeof x === "string");
  if (typeof raw !== "string" || !raw) return [];
  try {
    const p = JSON.parse(raw) as unknown;
    return Array.isArray(p) ? p.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return raw.startsWith("data:") || raw.startsWith("/") ? [raw] : [];
  }
}

async function ensureOpsTables() {
  const sql = await getSql();
  const stmts = [
    `create table if not exists ops_meta (id integer primary key, ops_rev text not null default '')`,
    `create table if not exists ops_projects (
      id serial primary key, code text not null unique, name text not null,
      client_name text not null, location text not null default '',
      status text not null default 'active', created_at timestamptz not null default now())`,
    `create table if not exists ops_drawings (
      id serial primary key, project_id integer not null references ops_projects(id),
      title text not null, ref_no text not null, discipline text not null,
      rev text not null default 'A', dated text not null, status text not null default 'current',
      file_href text not null default '')`,
    `create table if not exists ops_pos (
      id serial primary key, project_id integer not null references ops_projects(id),
      po_no text not null, supplier text not null, dated text not null, material text not null,
      amount integer not null default 0, status text not null default 'issued', ping text not null default 'Zilla')`,
    `create table if not exists ops_receives (
      id serial primary key, project_id integer not null references ops_projects(id),
      do_no text not null, po_id integer, dated text not null, received_by text not null,
      qty_note text not null default '', status text not null default 'received')`,
    `create table if not exists ops_claims (
      id serial primary key, project_id integer not null references ops_projects(id),
      claim_no text not null, title text not null, period text not null, dated text not null,
      amount integer not null default 0, certified integer not null default 0,
      status text not null default 'draft', ping text not null default 'Jenny',
      note text not null default '', photos text not null default '[]')`,
    `create table if not exists ops_reports (
      id serial primary key, project_id integer not null references ops_projects(id),
      cadence text not null, period text not null, dated text not null,
      lock_pct integer not null default 0, summary text not null default '',
      status text not null default 'draft', prepared_by text not null default 'Alvin')`,
    `create table if not exists ops_people (
      id serial primary key, project_id integer not null references ops_projects(id),
      kind text not null, name text not null, trade text not null default '',
      contractor text not null default 'GM', daily_rate integer not null default 0,
      active boolean not null default true)`,
    `create table if not exists ops_salary (
      id serial primary key, project_id integer not null references ops_projects(id),
      person_id integer not null references ops_people(id), month text not null,
      basic integer not null default 0, ot integer not null default 0,
      advance integer not null default 0, net integer not null default 0,
      status text not null default 'open')`,
    `create table if not exists ops_advances (
      id serial primary key, project_id integer not null references ops_projects(id),
      person_id integer not null references ops_people(id), dated text not null,
      amount integer not null, reason text not null default '', recovered boolean not null default false)`,
    `create table if not exists ops_repay (
      id serial primary key, project_id integer not null references ops_projects(id),
      person_id integer not null references ops_people(id), month text not null,
      amount integer not null default 0,
      unique (project_id, person_id, month))`,
  ];
  for (const s of stmts) await sql.query(s);
  await sql.query(`alter table ops_claims add column if not exists note text not null default ''`);
  await sql.query(`alter table ops_claims add column if not exists photos text not null default '[]'`);
}

export async function applyOpsBoard() {
  const sql = await getSql();
  await ensureOpsTables();
  let meta: { ops_rev: string | null } | undefined;
  try {
    [meta] = await sql<{ ops_rev: string | null }>`select ops_rev from ops_meta where id = 1`;
  } catch {
    meta = undefined;
  }
  if ((meta?.ops_rev ?? "") === OPS_REV) return;

  await sql`
    insert into ops_meta (id, ops_rev) values (1, ${OPS_REV})
    on conflict (id) do update set ops_rev = excluded.ops_rev
  `;

  for (const p of PROJECT_SEED) {
    await sql`
      insert into ops_projects (code, name, client_name, location, status)
      values (${p.code}, ${p.name}, ${p.client}, ${p.location}, ${p.status})
      on conflict (code) do update set
        name = excluded.name, client_name = excluded.client_name, location = excluded.location
    `;
  }

  const [capitol] = await sql<{ id: number }>`select id from ops_projects where code = 'capitol'`;
  if (!capitol) return;
  const pid = capitol.id;

  const drawN = await sql<{ n: number }>`select count(*)::int as n from ops_drawings where project_id = ${pid}`;
  if ((drawN[0]?.n ?? 0) === 0) {
    for (const d of DRAWING_SEED) {
      await sql`
        insert into ops_drawings (project_id, title, ref_no, discipline, rev, dated, status, file_href)
        values (${pid}, ${d.title}, ${d.ref}, ${d.disc}, ${d.rev}, ${d.dated}, ${d.status}, ${d.href})
      `;
    }
  }
  await sql`
    update ops_drawings
    set file_href = ${"/plans/diagrammatic-2026-07-20.pdf"}
    where project_id = ${pid} and ref_no = ${"CAP-SEC-20260720"}
  `;

  const poN = await sql<{ n: number }>`select count(*)::int as n from ops_pos where project_id = ${pid}`;
  if ((poN[0]?.n ?? 0) === 0) {
    for (const p of PO_SEED) {
      await sql`
        insert into ops_pos (project_id, po_no, supplier, dated, material, amount, status, ping)
        values (${pid}, ${p.po}, ${p.supplier}, ${p.dated}, ${p.material}, ${p.amount}, ${p.status}, ${"Zilla"})
      `;
    }
  }

  const recN = await sql<{ n: number }>`select count(*)::int as n from ops_receives where project_id = ${pid}`;
  if ((recN[0]?.n ?? 0) === 0) {
    const pos = await sql<{ id: number; po_no: string }>`select id, po_no from ops_pos where project_id = ${pid}`;
    const poId = Object.fromEntries(pos.map((p) => [p.po_no, p.id]));
    for (const r of RECEIVE_SEED) {
      await sql`
        insert into ops_receives (project_id, do_no, po_id, dated, received_by, qty_note, status)
        values (${pid}, ${r.doNo}, ${poId[r.po] ?? null}, ${r.dated}, ${r.by}, ${r.qty}, ${r.status})
      `;
    }
  }

  const clN = await sql<{ n: number }>`select count(*)::int as n from ops_claims where project_id = ${pid}`;
  if ((clN[0]?.n ?? 0) === 0) {
    for (const c of CLAIM_SEED) {
      await sql`
        insert into ops_claims (project_id, claim_no, title, period, dated, amount, certified, status, ping)
        values (${pid}, ${c.no}, ${c.title}, ${c.period}, ${c.dated}, ${c.amount}, ${c.certified}, ${c.status}, ${"Jenny"})
      `;
    }
  }

  const rpN = await sql<{ n: number }>`select count(*)::int as n from ops_reports where project_id = ${pid}`;
  if ((rpN[0]?.n ?? 0) === 0) {
    for (const r of REPORT_SEED) {
      await sql`
        insert into ops_reports (project_id, cadence, period, dated, lock_pct, summary, status, prepared_by)
        values (${pid}, ${r.cadence}, ${r.period}, ${r.dated}, ${r.lock}, ${r.summary}, ${r.status}, ${"Alvin"})
      `;
    }
  }

  await sql`update ops_reports set prepared_by = ${"Alvin"} where prepared_by <> ${"Alvin"}`;

  for (const w of WORKER_SEED) {
    const [row] = await sql<{ id: number }>`
      select id from ops_people where project_id = ${pid} and name = ${w.name} and kind = ${"worker"}
    `;
    if (row) {
      await sql`
        update ops_people set trade = ${w.trade}, contractor = ${"GM"}, active = true, daily_rate = 0
        where id = ${row.id}
      `;
    } else {
      await sql`
        insert into ops_people (project_id, kind, name, trade, contractor, daily_rate, active)
        values (${pid}, ${"worker"}, ${w.name}, ${w.trade}, ${"GM"}, ${0}, ${true})
      `;
    }
  }
  for (const s of SUB_SEED) {
    const [row] = await sql<{ id: number }>`
      select id from ops_people where project_id = ${pid} and name = ${s.name}
    `;
    if (row) {
      await sql`
        update ops_people set kind = ${"sub"}, trade = ${s.trade}, contractor = ${"GM"}, active = true
        where id = ${row.id}
      `;
    } else {
      await sql`
        insert into ops_people (project_id, kind, name, trade, contractor, daily_rate, active)
        values (${pid}, ${"sub"}, ${s.name}, ${s.trade}, ${"GM"}, ${0}, ${true})
      `;
    }
  }

  const gmWorkers = await sql<{ id: number }>`
    select id from ops_people where project_id = ${pid} and kind = ${"worker"} and active = true
  `;
  for (const w of gmWorkers) {
    await sql`
      insert into ops_attendance (project_id, person_id, dated, mark)
      values (${pid}, ${w.id}, ${"2026-09-03"}, ${"P"})
      on conflict (project_id, person_id, dated) do update set mark = ${"P"}
    `;
  }

  const peIds = await sql<{ id: number; name: string }>`
    select id, name from ops_people where project_id = ${pid} and kind = ${"worker"}
  `;
  const idByName = Object.fromEntries(peIds.map((p) => [p.name, p.id]));
  const salN = await sql<{ n: number }>`select count(*)::int as n from ops_salary where project_id = ${pid}`;
  if ((salN[0]?.n ?? 0) === 0) {
    const days = 26;
    for (const w of WORKER_SEED) {
      const id = idByName[w.name];
      if (!id) continue;
      await sql`
        insert into ops_salary (project_id, person_id, month, basic, ot, advance, net, status)
        values (${pid}, ${id}, ${"2026-08"}, ${0}, ${0}, ${0}, ${0}, ${"open"})
      `;
    }
  }

  const advN = await sql<{ n: number }>`select count(*)::int as n from ops_advances where project_id = ${pid}`;
  if ((advN[0]?.n ?? 0) === 0) {
    for (const a of ADVANCE_SEED) {
      const id = idByName[a.name];
      if (!id) continue;
      await sql`
        insert into ops_advances (project_id, person_id, dated, amount, reason, recovered)
        values (${pid}, ${id}, ${a.dated}, ${a.amount}, ${a.reason}, ${a.recovered})
      `;
    }
  }
}

async function loadOps(): Promise<OpsSnapshot> {
  const sql = await getSql();
  const projects = await sql<Record<string, unknown>>`select * from ops_projects order by id`;
  const drawings = await sql<Record<string, unknown>>`select * from ops_drawings order by dated desc, id desc`;
  const pos = await sql<Record<string, unknown>>`select * from ops_pos order by dated desc, id desc`;
  const receives = await sql<Record<string, unknown>>`select * from ops_receives order by dated desc, id desc`;
  const claims = await sql<Record<string, unknown>>`select * from ops_claims order by dated desc, id desc`;
  const reports = await sql<Record<string, unknown>>`select * from ops_reports order by dated desc, id desc`;
  const people = await sql<Record<string, unknown>>`select * from ops_people order by kind, name`;
  const salary = await sql<Record<string, unknown>>`select * from ops_salary order by month desc, id`;
  const advances = await sql<Record<string, unknown>>`select * from ops_advances order by dated desc, id desc`;
  let attendance: Record<string, unknown>[] = [];
  try {
    attendance = await sql<Record<string, unknown>>`select * from ops_attendance order by dated, person_id`;
  } catch {
    attendance = [];
  }
  let repay: Record<string, unknown>[] = [];
  try {
    repay = await sql<Record<string, unknown>>`select * from ops_repay order by month, person_id`;
  } catch {
    repay = [];
  }

  return {
    projects: projects.map((p) => ({
      id: Number(p.id),
      code: String(p.code),
      name: String(p.name),
      clientName: String(p.client_name),
      location: String(p.location),
      status: String(p.status),
    })) as OpsProject[],
    drawings: drawings.map((d) => ({
      id: Number(d.id),
      projectId: Number(d.project_id),
      title: String(d.title),
      refNo: String(d.ref_no),
      discipline: String(d.discipline),
      rev: String(d.rev),
      dated: String(d.dated),
      status: String(d.status),
      fileHref: String(d.file_href ?? ""),
    })) as OpsDrawing[],
    pos: pos.map((p) => ({
      id: Number(p.id),
      projectId: Number(p.project_id),
      poNo: String(p.po_no),
      supplier: String(p.supplier),
      dated: String(p.dated),
      material: String(p.material),
      amount: Number(p.amount),
      status: String(p.status),
      ping: String(p.ping),
    })) as OpsPo[],
    receives: receives.map((r) => ({
      id: Number(r.id),
      projectId: Number(r.project_id),
      doNo: String(r.do_no),
      poId: r.po_id == null ? null : Number(r.po_id),
      dated: String(r.dated),
      receivedBy: String(r.received_by),
      qtyNote: String(r.qty_note),
      status: String(r.status),
    })) as OpsReceive[],
    claims: claims.map((c) => ({
      id: Number(c.id),
      projectId: Number(c.project_id),
      claimNo: String(c.claim_no),
      title: String(c.title),
      period: String(c.period),
      dated: String(c.dated),
      amount: Number(c.amount),
      certified: Number(c.certified),
      status: String(c.status),
      ping: String(c.ping),
      note: String(c.note ?? ""),
      photos: parsePhotos(c.photos),
    })) as OpsClaim[],
    reports: reports.map((r) => ({
      id: Number(r.id),
      projectId: Number(r.project_id),
      cadence: r.cadence as OpsReport["cadence"],
      period: String(r.period),
      dated: String(r.dated),
      lockPct: Number(r.lock_pct),
      summary: String(r.summary),
      status: String(r.status),
      preparedBy: String(r.prepared_by),
    })),
    people: people.map((p) => ({
      id: Number(p.id),
      projectId: Number(p.project_id),
      kind: p.kind === "sub" ? "sub" : "worker",
      name: String(p.name),
      trade: String(p.trade),
      contractor: String(p.contractor),
      dailyRate: Number(p.daily_rate),
      active: toBool(p.active as boolean | string),
    })) as OpsPerson[],
    salary: salary.map((s) => ({
      id: Number(s.id),
      projectId: Number(s.project_id),
      personId: Number(s.person_id),
      month: String(s.month),
      basic: Number(s.basic),
      ot: Number(s.ot),
      advance: Number(s.advance),
      net: Number(s.net),
      status: String(s.status),
    })) as OpsSalary[],
    advances: advances.map((a) => ({
      id: Number(a.id),
      projectId: Number(a.project_id),
      personId: Number(a.person_id),
      dated: String(a.dated),
      amount: Number(a.amount),
      reason: String(a.reason),
      recovered: toBool(a.recovered as boolean | string),
    })) as OpsAdvance[],
    attendance: attendance.map((a) => ({
      id: Number(a.id),
      projectId: Number(a.project_id),
      personId: Number(a.person_id),
      dated: String(a.dated),
      mark: a.mark === "X" || a.mark === "OT" ? a.mark : "P",
    })) as OpsAttend[],
    repay: repay.map((r) => ({
      id: Number(r.id),
      projectId: Number(r.project_id),
      personId: Number(r.person_id),
      month: String(r.month),
      amount: Number(r.amount),
    })) as OpsRepay[],
  };
}

export const getOps = createServerFn({ method: "GET" }).handler(async () => {
  await applyOpsBoard();
  return loadOps();
});

export const addProject = createServerFn({ method: "POST" })
  .validator(z.object({ name: z.string().min(1), client: z.string(), location: z.string() }))
  .handler(async ({ data }) => {
    await applyOpsBoard();
    const sql = await getSql();
    const code = data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 24) || "job";
    await sql`
      insert into ops_projects (code, name, client_name, location, status)
      values (${code}, ${data.name}, ${data.client}, ${data.location}, ${"active"})
      on conflict (code) do update set name = excluded.name
    `;
    return loadOps();
  });

export const addDrawing = createServerFn({ method: "POST" })
  .validator(
    z.object({
      projectId: z.number(),
      title: z.string(),
      refNo: z.string(),
      discipline: z.string(),
      rev: z.string(),
      dated: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    await applyOpsBoard();
    const sql = await getSql();
    await sql`
      insert into ops_drawings (project_id, title, ref_no, discipline, rev, dated, status, file_href)
      values (${data.projectId}, ${data.title}, ${data.refNo}, ${data.discipline}, ${data.rev}, ${data.dated}, ${"current"}, ${""})
    `;
    return loadOps();
  });

export const addPo = createServerFn({ method: "POST" })
  .validator(
    z.object({
      projectId: z.number(),
      poNo: z.string(),
      supplier: z.string(),
      dated: z.string(),
      material: z.string(),
      amount: z.number(),
    }),
  )
  .handler(async ({ data }) => {
    await applyOpsBoard();
    const sql = await getSql();
    await sql`
      insert into ops_pos (project_id, po_no, supplier, dated, material, amount, status, ping)
      values (${data.projectId}, ${data.poNo}, ${data.supplier}, ${data.dated}, ${data.material}, ${data.amount}, ${"issued"}, ${"Zilla"})
    `;
    return loadOps();
  });

export const addReceive = createServerFn({ method: "POST" })
  .validator(
    z.object({
      projectId: z.number(),
      doNo: z.string(),
      poId: z.number().nullable(),
      dated: z.string(),
      receivedBy: z.string(),
      qtyNote: z.string(),
      status: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    await applyOpsBoard();
    const sql = await getSql();
    await sql`
      insert into ops_receives (project_id, do_no, po_id, dated, received_by, qty_note, status)
      values (${data.projectId}, ${data.doNo}, ${data.poId}, ${data.dated}, ${data.receivedBy}, ${data.qtyNote}, ${data.status})
    `;
    return loadOps();
  });

export const addClaim = createServerFn({ method: "POST" })
  .validator(
    z.object({
      projectId: z.number(),
      claimNo: z.string(),
      title: z.string(),
      period: z.string(),
      dated: z.string(),
      amount: z.number(),
    }),
  )
  .handler(async ({ data }) => {
    await applyOpsBoard();
    const sql = await getSql();
    await sql`
      insert into ops_claims (project_id, claim_no, title, period, dated, amount, certified, status, ping, note, photos)
      values (${data.projectId}, ${data.claimNo}, ${data.title}, ${data.period}, ${data.dated}, ${data.amount}, ${0}, ${"draft"}, ${"Jenny"}, ${""}, ${"[]"})
    `;
    return loadOps();
  });

export const updateClaim = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.number(),
      claimNo: z.string(),
      title: z.string(),
      period: z.string(),
      dated: z.string(),
      amount: z.number(),
      certified: z.number(),
      status: z.string(),
      note: z.string(),
      photos: z.array(z.string()),
    }),
  )
  .handler(async ({ data }) => {
    await applyOpsBoard();
    const sql = await getSql();
    await sql`
      update ops_claims set
        claim_no = ${data.claimNo},
        title = ${data.title},
        period = ${data.period},
        dated = ${data.dated},
        amount = ${data.amount},
        certified = ${data.certified},
        status = ${data.status},
        note = ${data.note},
        photos = ${JSON.stringify(data.photos)}
      where id = ${data.id}
    `;
    return loadOps();
  });

export const dropClaim = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.number() }))
  .handler(async ({ data }) => {
    await applyOpsBoard();
    const sql = await getSql();
    await sql`delete from ops_claims where id = ${data.id}`;
    return loadOps();
  });

export const addReport = createServerFn({ method: "POST" })
  .validator(
    z.object({
      projectId: z.number(),
      cadence: z.enum(["daily", "weekly", "monthly"]),
      period: z.string(),
      dated: z.string(),
      lockPct: z.number(),
      summary: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    await applyOpsBoard();
    const sql = await getSql();
    await sql`
      insert into ops_reports (project_id, cadence, period, dated, lock_pct, summary, status, prepared_by)
      values (${data.projectId}, ${data.cadence}, ${data.period}, ${data.dated}, ${data.lockPct}, ${data.summary}, ${"issued"}, ${"Alvin"})
    `;
    return loadOps();
  });

export const publishDay = createServerFn({ method: "POST" })
  .validator(z.object({ dated: z.string() }))
  .handler(async ({ data }) => {
    await applyOpsBoard();
    await ensureToday(data.dated, true);
    return loadOps();
  });

export const addPerson = createServerFn({ method: "POST" })
  .validator(
    z.object({
      projectId: z.number(),
      kind: z.enum(["worker", "sub"]),
      name: z.string().min(1),
      trade: z.string(),
      contractor: z.string(),
      dailyRate: z.number(),
    }),
  )
  .handler(async ({ data }) => {
    await applyOpsBoard();
    const sql = await getSql();
    await sql`
      insert into ops_people (project_id, kind, name, trade, contractor, daily_rate, active)
      values (${data.projectId}, ${data.kind}, ${data.name}, ${data.trade}, ${data.contractor}, ${data.dailyRate}, ${true})
    `;
    return loadOps();
  });

export const upsertAdvance = createServerFn({ method: "POST" })
  .validator(
    z.object({
      projectId: z.number(),
      personId: z.number(),
      dated: z.string(),
      amount: z.number(),
      reason: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    await applyOpsBoard();
    const sql = await getSql();
    const [row] = await sql<{ id: number }>`
      select id from ops_advances
      where project_id = ${data.projectId} and person_id = ${data.personId} and dated = ${data.dated}
      order by id desc limit 1
    `;
    if (data.amount <= 0) {
      if (row) await sql`delete from ops_advances where id = ${row.id}`;
    } else if (row) {
      await sql`update ops_advances set amount = ${data.amount}, reason = ${data.reason} where id = ${row.id}`;
    } else {
      await sql`
        insert into ops_advances (project_id, person_id, dated, amount, reason, recovered)
        values (${data.projectId}, ${data.personId}, ${data.dated}, ${data.amount}, ${data.reason}, ${false})
      `;
    }
    return loadOps();
  });

export const upsertRepay = createServerFn({ method: "POST" })
  .validator(
    z.object({
      projectId: z.number(),
      personId: z.number(),
      month: z.string(),
      amount: z.number(),
    }),
  )
  .handler(async ({ data }) => {
    await applyOpsBoard();
    const sql = await getSql();
    if (data.amount <= 0) {
      await sql`
        delete from ops_repay
        where project_id = ${data.projectId} and person_id = ${data.personId} and month = ${data.month}
      `;
    } else {
      await sql`
        insert into ops_repay (project_id, person_id, month, amount)
        values (${data.projectId}, ${data.personId}, ${data.month}, ${data.amount})
        on conflict (project_id, person_id, month) do update set amount = excluded.amount
      `;
    }
    return loadOps();
  });

export const setAttend = createServerFn({ method: "POST" })
  .validator(
    z.object({
      projectId: z.number(),
      personId: z.number(),
      dated: z.string(),
      mark: z.enum(["P", "X", "OT", ""]),
    }),
  )
  .handler(async ({ data }) => {
    await applyOpsBoard();
    const sql = await getSql();
    if (!data.mark) {
      await sql`
        delete from ops_attendance
        where project_id = ${data.projectId} and person_id = ${data.personId} and dated = ${data.dated}
      `;
    } else {
      await sql`
        insert into ops_attendance (project_id, person_id, dated, mark)
        values (${data.projectId}, ${data.personId}, ${data.dated}, ${data.mark})
        on conflict (project_id, person_id, dated) do update set mark = excluded.mark
      `;
    }
    return loadOps();
  });

export const markSalaryPaid = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.number() }))
  .handler(async ({ data }) => {
    await applyOpsBoard();
    const sql = await getSql();
    await sql`update ops_salary set status = ${"paid"} where id = ${data.id}`;
    return loadOps();
  });

export const setRecordStatus = createServerFn({ method: "POST" })
  .validator(
    z.object({
      table: z.enum(["ops_pos", "ops_claims", "ops_reports", "ops_drawings"]),
      id: z.number(),
      status: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    await applyOpsBoard();
    const sql = await getSql();
    if (data.table === "ops_pos") await sql`update ops_pos set status = ${data.status} where id = ${data.id}`;
    if (data.table === "ops_claims") await sql`update ops_claims set status = ${data.status} where id = ${data.id}`;
    if (data.table === "ops_reports") await sql`update ops_reports set status = ${data.status} where id = ${data.id}`;
    if (data.table === "ops_drawings") await sql`update ops_drawings set status = ${data.status} where id = ${data.id}`;
    return loadOps();
  });
