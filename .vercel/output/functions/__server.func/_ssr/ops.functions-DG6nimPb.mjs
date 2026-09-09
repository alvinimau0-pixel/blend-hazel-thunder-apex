import { o as getSql } from "./utils-DyetTdWh.mjs";
import { t as createServerFn } from "./ssr.mjs";
import { a as PO_SEED, c as REPORT_SEED, i as OPS_REV, l as SUB_SEED, n as CLAIM_SEED, o as PROJECT_SEED, r as DRAWING_SEED, s as RECEIVE_SEED, t as ADVANCE_SEED, u as WORKER_SEED } from "./ops-seed-AJHg6GHn.mjs";
import { a as object, i as number, n as array, o as string, t as _enum } from "../_libs/zod.mjs";
import { ensureToday } from "./day-roll-CIcXIhhj.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ops.functions-DG6nimPb.js
function toBool(v) {
	return v === true || v === "t" || v === "true" || v === 1 || v === "1";
}
function parsePhotos(raw) {
	if (Array.isArray(raw)) return raw.filter((x) => typeof x === "string");
	if (typeof raw !== "string" || !raw) return [];
	try {
		const p = JSON.parse(raw);
		return Array.isArray(p) ? p.filter((x) => typeof x === "string") : [];
	} catch {
		return raw.startsWith("data:") || raw.startsWith("/") ? [raw] : [];
	}
}
async function ensureOpsTables() {
	const sql = await getSql();
	for (const s of [
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
      unique (project_id, person_id, month))`
	]) await sql.query(s);
	await sql.query(`alter table ops_claims add column if not exists note text not null default ''`);
	await sql.query(`alter table ops_claims add column if not exists photos text not null default '[]'`);
}
async function applyOpsBoard() {
	const sql = await getSql();
	await ensureOpsTables();
	let meta;
	try {
		[meta] = await sql`select ops_rev from ops_meta where id = 1`;
	} catch {
		meta = void 0;
	}
	if ((meta?.ops_rev ?? "") === "ops-2026-09-03-attend") return;
	await sql`
    insert into ops_meta (id, ops_rev) values (1, ${OPS_REV})
    on conflict (id) do update set ops_rev = excluded.ops_rev
  `;
	for (const p of PROJECT_SEED) await sql`
      insert into ops_projects (code, name, client_name, location, status)
      values (${p.code}, ${p.name}, ${p.client}, ${p.location}, ${p.status})
      on conflict (code) do update set
        name = excluded.name, client_name = excluded.client_name, location = excluded.location
    `;
	const [capitol] = await sql`select id from ops_projects where code = 'capitol'`;
	if (!capitol) return;
	const pid = capitol.id;
	if (((await sql`select count(*)::int as n from ops_drawings where project_id = ${pid}`)[0]?.n ?? 0) === 0) for (const d of DRAWING_SEED) await sql`
        insert into ops_drawings (project_id, title, ref_no, discipline, rev, dated, status, file_href)
        values (${pid}, ${d.title}, ${d.ref}, ${d.disc}, ${d.rev}, ${d.dated}, ${d.status}, ${d.href})
      `;
	await sql`
    update ops_drawings
    set file_href = ${"/plans/diagrammatic-2026-07-20.pdf"}
    where project_id = ${pid} and ref_no = ${"CAP-SEC-20260720"}
  `;
	if (((await sql`select count(*)::int as n from ops_pos where project_id = ${pid}`)[0]?.n ?? 0) === 0) for (const p of PO_SEED) await sql`
        insert into ops_pos (project_id, po_no, supplier, dated, material, amount, status, ping)
        values (${pid}, ${p.po}, ${p.supplier}, ${p.dated}, ${p.material}, ${p.amount}, ${p.status}, ${"Zilla"})
      `;
	if (((await sql`select count(*)::int as n from ops_receives where project_id = ${pid}`)[0]?.n ?? 0) === 0) {
		const pos = await sql`select id, po_no from ops_pos where project_id = ${pid}`;
		const poId = Object.fromEntries(pos.map((p) => [p.po_no, p.id]));
		for (const r of RECEIVE_SEED) await sql`
        insert into ops_receives (project_id, do_no, po_id, dated, received_by, qty_note, status)
        values (${pid}, ${r.doNo}, ${poId[r.po] ?? null}, ${r.dated}, ${r.by}, ${r.qty}, ${r.status})
      `;
	}
	if (((await sql`select count(*)::int as n from ops_claims where project_id = ${pid}`)[0]?.n ?? 0) === 0) for (const c of CLAIM_SEED) await sql`
        insert into ops_claims (project_id, claim_no, title, period, dated, amount, certified, status, ping)
        values (${pid}, ${c.no}, ${c.title}, ${c.period}, ${c.dated}, ${c.amount}, ${c.certified}, ${c.status}, ${"Jenny"})
      `;
	if (((await sql`select count(*)::int as n from ops_reports where project_id = ${pid}`)[0]?.n ?? 0) === 0) for (const r of REPORT_SEED) await sql`
        insert into ops_reports (project_id, cadence, period, dated, lock_pct, summary, status, prepared_by)
        values (${pid}, ${r.cadence}, ${r.period}, ${r.dated}, ${r.lock}, ${r.summary}, ${r.status}, ${"Alvin"})
      `;
	await sql`update ops_reports set prepared_by = ${"Alvin"} where prepared_by <> ${"Alvin"}`;
	for (const w of WORKER_SEED) {
		const [row] = await sql`
      select id from ops_people where project_id = ${pid} and name = ${w.name} and kind = ${"worker"}
    `;
		if (row) await sql`
        update ops_people set trade = ${w.trade}, contractor = ${"GM"}, active = true, daily_rate = 0
        where id = ${row.id}
      `;
		else await sql`
        insert into ops_people (project_id, kind, name, trade, contractor, daily_rate, active)
        values (${pid}, ${"worker"}, ${w.name}, ${w.trade}, ${"GM"}, ${0}, ${true})
      `;
	}
	for (const s of SUB_SEED) {
		const [row] = await sql`
      select id from ops_people where project_id = ${pid} and name = ${s.name}
    `;
		if (row) await sql`
        update ops_people set kind = ${"sub"}, trade = ${s.trade}, contractor = ${"GM"}, active = true
        where id = ${row.id}
      `;
		else await sql`
        insert into ops_people (project_id, kind, name, trade, contractor, daily_rate, active)
        values (${pid}, ${"sub"}, ${s.name}, ${s.trade}, ${"GM"}, ${0}, ${true})
      `;
	}
	const gmWorkers = await sql`
    select id from ops_people where project_id = ${pid} and kind = ${"worker"} and active = true
  `;
	for (const w of gmWorkers) await sql`
      insert into ops_attendance (project_id, person_id, dated, mark)
      values (${pid}, ${w.id}, ${"2026-09-03"}, ${"P"})
      on conflict (project_id, person_id, dated) do update set mark = ${"P"}
    `;
	const peIds = await sql`
    select id, name from ops_people where project_id = ${pid} and kind = ${"worker"}
  `;
	const idByName = Object.fromEntries(peIds.map((p) => [p.name, p.id]));
	if (((await sql`select count(*)::int as n from ops_salary where project_id = ${pid}`)[0]?.n ?? 0) === 0) for (const w of WORKER_SEED) {
		const id = idByName[w.name];
		if (!id) continue;
		await sql`
        insert into ops_salary (project_id, person_id, month, basic, ot, advance, net, status)
        values (${pid}, ${id}, ${"2026-08"}, ${0}, ${0}, ${0}, ${0}, ${"open"})
      `;
	}
	if (((await sql`select count(*)::int as n from ops_advances where project_id = ${pid}`)[0]?.n ?? 0) === 0) for (const a of ADVANCE_SEED) {
		const id = idByName[a.name];
		if (!id) continue;
		await sql`
        insert into ops_advances (project_id, person_id, dated, amount, reason, recovered)
        values (${pid}, ${id}, ${a.dated}, ${a.amount}, ${a.reason}, ${a.recovered})
      `;
	}
}
async function loadOps() {
	const sql = await getSql();
	const projects = await sql`select * from ops_projects order by id`;
	const drawings = await sql`select * from ops_drawings order by dated desc, id desc`;
	const pos = await sql`select * from ops_pos order by dated desc, id desc`;
	const receives = await sql`select * from ops_receives order by dated desc, id desc`;
	const claims = await sql`select * from ops_claims order by dated desc, id desc`;
	const reports = await sql`select * from ops_reports order by dated desc, id desc`;
	const people = await sql`select * from ops_people order by kind, name`;
	const salary = await sql`select * from ops_salary order by month desc, id`;
	const advances = await sql`select * from ops_advances order by dated desc, id desc`;
	let attendance = [];
	try {
		attendance = await sql`select * from ops_attendance order by dated, person_id`;
	} catch {
		attendance = [];
	}
	let repay = [];
	try {
		repay = await sql`select * from ops_repay order by month, person_id`;
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
			status: String(p.status)
		})),
		drawings: drawings.map((d) => ({
			id: Number(d.id),
			projectId: Number(d.project_id),
			title: String(d.title),
			refNo: String(d.ref_no),
			discipline: String(d.discipline),
			rev: String(d.rev),
			dated: String(d.dated),
			status: String(d.status),
			fileHref: String(d.file_href ?? "")
		})),
		pos: pos.map((p) => ({
			id: Number(p.id),
			projectId: Number(p.project_id),
			poNo: String(p.po_no),
			supplier: String(p.supplier),
			dated: String(p.dated),
			material: String(p.material),
			amount: Number(p.amount),
			status: String(p.status),
			ping: String(p.ping)
		})),
		receives: receives.map((r) => ({
			id: Number(r.id),
			projectId: Number(r.project_id),
			doNo: String(r.do_no),
			poId: r.po_id == null ? null : Number(r.po_id),
			dated: String(r.dated),
			receivedBy: String(r.received_by),
			qtyNote: String(r.qty_note),
			status: String(r.status)
		})),
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
			photos: parsePhotos(c.photos)
		})),
		reports: reports.map((r) => ({
			id: Number(r.id),
			projectId: Number(r.project_id),
			cadence: r.cadence,
			period: String(r.period),
			dated: String(r.dated),
			lockPct: Number(r.lock_pct),
			summary: String(r.summary),
			status: String(r.status),
			preparedBy: String(r.prepared_by)
		})),
		people: people.map((p) => ({
			id: Number(p.id),
			projectId: Number(p.project_id),
			kind: p.kind === "sub" ? "sub" : "worker",
			name: String(p.name),
			trade: String(p.trade),
			contractor: String(p.contractor),
			dailyRate: Number(p.daily_rate),
			active: toBool(p.active)
		})),
		salary: salary.map((s) => ({
			id: Number(s.id),
			projectId: Number(s.project_id),
			personId: Number(s.person_id),
			month: String(s.month),
			basic: Number(s.basic),
			ot: Number(s.ot),
			advance: Number(s.advance),
			net: Number(s.net),
			status: String(s.status)
		})),
		advances: advances.map((a) => ({
			id: Number(a.id),
			projectId: Number(a.project_id),
			personId: Number(a.person_id),
			dated: String(a.dated),
			amount: Number(a.amount),
			reason: String(a.reason),
			recovered: toBool(a.recovered)
		})),
		attendance: attendance.map((a) => ({
			id: Number(a.id),
			projectId: Number(a.project_id),
			personId: Number(a.person_id),
			dated: String(a.dated),
			mark: a.mark === "X" || a.mark === "OT" ? a.mark : "P"
		})),
		repay: repay.map((r) => ({
			id: Number(r.id),
			projectId: Number(r.project_id),
			personId: Number(r.person_id),
			month: String(r.month),
			amount: Number(r.amount)
		}))
	};
}
var getOps_createServerFn_handler = createServerRpc({
	id: "d250f79bae545e28924107abd7b10d35e00709a0fd30d57dfde88e804cfca701",
	name: "getOps",
	filename: "src/lib/ops.functions.ts"
}, (opts) => getOps.__executeServer(opts));
var getOps = createServerFn({ method: "GET" }).handler(getOps_createServerFn_handler, async () => {
	await applyOpsBoard();
	return loadOps();
});
var addProject_createServerFn_handler = createServerRpc({
	id: "9c7839c9d359aeb12dfb42b514f864ac9509ac55564870e5055bf85a5c7ffeca",
	name: "addProject",
	filename: "src/lib/ops.functions.ts"
}, (opts) => addProject.__executeServer(opts));
var addProject = createServerFn({ method: "POST" }).validator(object({
	name: string().min(1),
	client: string(),
	location: string()
})).handler(addProject_createServerFn_handler, async ({ data }) => {
	await applyOpsBoard();
	await (await getSql())`
      insert into ops_projects (code, name, client_name, location, status)
      values (${data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 24) || "job"}, ${data.name}, ${data.client}, ${data.location}, ${"active"})
      on conflict (code) do update set name = excluded.name
    `;
	return loadOps();
});
var addDrawing_createServerFn_handler = createServerRpc({
	id: "48a6b8727dfe6764af86343c0a6644516af0927710ed32b78a115d343b16ab4e",
	name: "addDrawing",
	filename: "src/lib/ops.functions.ts"
}, (opts) => addDrawing.__executeServer(opts));
var addDrawing = createServerFn({ method: "POST" }).validator(object({
	projectId: number(),
	title: string(),
	refNo: string(),
	discipline: string(),
	rev: string(),
	dated: string()
})).handler(addDrawing_createServerFn_handler, async ({ data }) => {
	await applyOpsBoard();
	await (await getSql())`
      insert into ops_drawings (project_id, title, ref_no, discipline, rev, dated, status, file_href)
      values (${data.projectId}, ${data.title}, ${data.refNo}, ${data.discipline}, ${data.rev}, ${data.dated}, ${"current"}, ${""})
    `;
	return loadOps();
});
var addPo_createServerFn_handler = createServerRpc({
	id: "7e0573e0f9d04dd434e7e97170d30a0aab6619f9b5a2c6a2350222d33edf81f1",
	name: "addPo",
	filename: "src/lib/ops.functions.ts"
}, (opts) => addPo.__executeServer(opts));
var addPo = createServerFn({ method: "POST" }).validator(object({
	projectId: number(),
	poNo: string(),
	supplier: string(),
	dated: string(),
	material: string(),
	amount: number()
})).handler(addPo_createServerFn_handler, async ({ data }) => {
	await applyOpsBoard();
	await (await getSql())`
      insert into ops_pos (project_id, po_no, supplier, dated, material, amount, status, ping)
      values (${data.projectId}, ${data.poNo}, ${data.supplier}, ${data.dated}, ${data.material}, ${data.amount}, ${"issued"}, ${"Zilla"})
    `;
	return loadOps();
});
var addReceive_createServerFn_handler = createServerRpc({
	id: "fa3e3f5d27816124b0735c21fa048a33c2ef66a6e5837f20c09c61122add9070",
	name: "addReceive",
	filename: "src/lib/ops.functions.ts"
}, (opts) => addReceive.__executeServer(opts));
var addReceive = createServerFn({ method: "POST" }).validator(object({
	projectId: number(),
	doNo: string(),
	poId: number().nullable(),
	dated: string(),
	receivedBy: string(),
	qtyNote: string(),
	status: string()
})).handler(addReceive_createServerFn_handler, async ({ data }) => {
	await applyOpsBoard();
	await (await getSql())`
      insert into ops_receives (project_id, do_no, po_id, dated, received_by, qty_note, status)
      values (${data.projectId}, ${data.doNo}, ${data.poId}, ${data.dated}, ${data.receivedBy}, ${data.qtyNote}, ${data.status})
    `;
	return loadOps();
});
var addClaim_createServerFn_handler = createServerRpc({
	id: "a77df45826d4b234593f83e382843f3f88b162bdb9486ea8619f47e8589f8290",
	name: "addClaim",
	filename: "src/lib/ops.functions.ts"
}, (opts) => addClaim.__executeServer(opts));
var addClaim = createServerFn({ method: "POST" }).validator(object({
	projectId: number(),
	claimNo: string(),
	title: string(),
	period: string(),
	dated: string(),
	amount: number()
})).handler(addClaim_createServerFn_handler, async ({ data }) => {
	await applyOpsBoard();
	await (await getSql())`
      insert into ops_claims (project_id, claim_no, title, period, dated, amount, certified, status, ping, note, photos)
      values (${data.projectId}, ${data.claimNo}, ${data.title}, ${data.period}, ${data.dated}, ${data.amount}, ${0}, ${"draft"}, ${"Jenny"}, ${""}, ${"[]"})
    `;
	return loadOps();
});
var updateClaim_createServerFn_handler = createServerRpc({
	id: "b0f2cd27624687282b4a1e76f86eba90aafcf1b9babd8b6fbeaf93d22ababe3e",
	name: "updateClaim",
	filename: "src/lib/ops.functions.ts"
}, (opts) => updateClaim.__executeServer(opts));
var updateClaim = createServerFn({ method: "POST" }).validator(object({
	id: number(),
	claimNo: string(),
	title: string(),
	period: string(),
	dated: string(),
	amount: number(),
	certified: number(),
	status: string(),
	note: string(),
	photos: array(string())
})).handler(updateClaim_createServerFn_handler, async ({ data }) => {
	await applyOpsBoard();
	await (await getSql())`
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
var dropClaim_createServerFn_handler = createServerRpc({
	id: "be4053ccacba0d59843a362f83033b2003ee3dae94c76a5a6b5baf7d6a5e18ef",
	name: "dropClaim",
	filename: "src/lib/ops.functions.ts"
}, (opts) => dropClaim.__executeServer(opts));
var dropClaim = createServerFn({ method: "POST" }).validator(object({ id: number() })).handler(dropClaim_createServerFn_handler, async ({ data }) => {
	await applyOpsBoard();
	await (await getSql())`delete from ops_claims where id = ${data.id}`;
	return loadOps();
});
var addReport_createServerFn_handler = createServerRpc({
	id: "14b1e1e3999223792432b98900af1cecc9badcd8554be75d49c75d52acc763f1",
	name: "addReport",
	filename: "src/lib/ops.functions.ts"
}, (opts) => addReport.__executeServer(opts));
var addReport = createServerFn({ method: "POST" }).validator(object({
	projectId: number(),
	cadence: _enum([
		"daily",
		"weekly",
		"monthly"
	]),
	period: string(),
	dated: string(),
	lockPct: number(),
	summary: string()
})).handler(addReport_createServerFn_handler, async ({ data }) => {
	await applyOpsBoard();
	await (await getSql())`
      insert into ops_reports (project_id, cadence, period, dated, lock_pct, summary, status, prepared_by)
      values (${data.projectId}, ${data.cadence}, ${data.period}, ${data.dated}, ${data.lockPct}, ${data.summary}, ${"issued"}, ${"Alvin"})
    `;
	return loadOps();
});
var publishDay_createServerFn_handler = createServerRpc({
	id: "77ceb76d13e9377668866e3ab09f3633e524236922c010a4dc21126a3d7975f8",
	name: "publishDay",
	filename: "src/lib/ops.functions.ts"
}, (opts) => publishDay.__executeServer(opts));
var publishDay = createServerFn({ method: "POST" }).validator(object({ dated: string() })).handler(publishDay_createServerFn_handler, async ({ data }) => {
	await applyOpsBoard();
	await ensureToday(data.dated, true);
	return loadOps();
});
var addPerson_createServerFn_handler = createServerRpc({
	id: "a34120c7c76923b48514b95211df4861181c9836de29f030bf3ec0d1853c01f2",
	name: "addPerson",
	filename: "src/lib/ops.functions.ts"
}, (opts) => addPerson.__executeServer(opts));
var addPerson = createServerFn({ method: "POST" }).validator(object({
	projectId: number(),
	kind: _enum(["worker", "sub"]),
	name: string().min(1),
	trade: string(),
	contractor: string(),
	dailyRate: number()
})).handler(addPerson_createServerFn_handler, async ({ data }) => {
	await applyOpsBoard();
	await (await getSql())`
      insert into ops_people (project_id, kind, name, trade, contractor, daily_rate, active)
      values (${data.projectId}, ${data.kind}, ${data.name}, ${data.trade}, ${data.contractor}, ${data.dailyRate}, ${true})
    `;
	return loadOps();
});
var upsertAdvance_createServerFn_handler = createServerRpc({
	id: "016a1061251698e45b80d13a4a777ed2faacf9b8ae5a9839e00a42a6271f8bb0",
	name: "upsertAdvance",
	filename: "src/lib/ops.functions.ts"
}, (opts) => upsertAdvance.__executeServer(opts));
var upsertAdvance = createServerFn({ method: "POST" }).validator(object({
	projectId: number(),
	personId: number(),
	dated: string(),
	amount: number(),
	reason: string()
})).handler(upsertAdvance_createServerFn_handler, async ({ data }) => {
	await applyOpsBoard();
	const sql = await getSql();
	const [row] = await sql`
      select id from ops_advances
      where project_id = ${data.projectId} and person_id = ${data.personId} and dated = ${data.dated}
      order by id desc limit 1
    `;
	if (data.amount <= 0) {
		if (row) await sql`delete from ops_advances where id = ${row.id}`;
	} else if (row) await sql`update ops_advances set amount = ${data.amount}, reason = ${data.reason} where id = ${row.id}`;
	else await sql`
        insert into ops_advances (project_id, person_id, dated, amount, reason, recovered)
        values (${data.projectId}, ${data.personId}, ${data.dated}, ${data.amount}, ${data.reason}, ${false})
      `;
	return loadOps();
});
var upsertRepay_createServerFn_handler = createServerRpc({
	id: "cf51ef00fb02502f06b0b83217036c6c211c9d6aaf0cfdd734cd12d7951f8032",
	name: "upsertRepay",
	filename: "src/lib/ops.functions.ts"
}, (opts) => upsertRepay.__executeServer(opts));
var upsertRepay = createServerFn({ method: "POST" }).validator(object({
	projectId: number(),
	personId: number(),
	month: string(),
	amount: number()
})).handler(upsertRepay_createServerFn_handler, async ({ data }) => {
	await applyOpsBoard();
	const sql = await getSql();
	if (data.amount <= 0) await sql`
        delete from ops_repay
        where project_id = ${data.projectId} and person_id = ${data.personId} and month = ${data.month}
      `;
	else await sql`
        insert into ops_repay (project_id, person_id, month, amount)
        values (${data.projectId}, ${data.personId}, ${data.month}, ${data.amount})
        on conflict (project_id, person_id, month) do update set amount = excluded.amount
      `;
	return loadOps();
});
var setAttend_createServerFn_handler = createServerRpc({
	id: "e38514e0c1b7dd811c40b1a06bf2f6c2493872fd76196e5d6908b4afbaf62d04",
	name: "setAttend",
	filename: "src/lib/ops.functions.ts"
}, (opts) => setAttend.__executeServer(opts));
var setAttend = createServerFn({ method: "POST" }).validator(object({
	projectId: number(),
	personId: number(),
	dated: string(),
	mark: _enum([
		"P",
		"X",
		"OT",
		""
	])
})).handler(setAttend_createServerFn_handler, async ({ data }) => {
	await applyOpsBoard();
	const sql = await getSql();
	if (!data.mark) await sql`
        delete from ops_attendance
        where project_id = ${data.projectId} and person_id = ${data.personId} and dated = ${data.dated}
      `;
	else await sql`
        insert into ops_attendance (project_id, person_id, dated, mark)
        values (${data.projectId}, ${data.personId}, ${data.dated}, ${data.mark})
        on conflict (project_id, person_id, dated) do update set mark = excluded.mark
      `;
	return loadOps();
});
var markSalaryPaid_createServerFn_handler = createServerRpc({
	id: "d24ea28dfb0ca9d7db5adeb2f748f847d6e2acb60862970e4ad9bb1992abd1b4",
	name: "markSalaryPaid",
	filename: "src/lib/ops.functions.ts"
}, (opts) => markSalaryPaid.__executeServer(opts));
var markSalaryPaid = createServerFn({ method: "POST" }).validator(object({ id: number() })).handler(markSalaryPaid_createServerFn_handler, async ({ data }) => {
	await applyOpsBoard();
	await (await getSql())`update ops_salary set status = ${"paid"} where id = ${data.id}`;
	return loadOps();
});
var setRecordStatus_createServerFn_handler = createServerRpc({
	id: "80ef2bb23f22acc994c46bdca7db49696dab0be5b713ec03ef28a6faf00cf0f1",
	name: "setRecordStatus",
	filename: "src/lib/ops.functions.ts"
}, (opts) => setRecordStatus.__executeServer(opts));
var setRecordStatus = createServerFn({ method: "POST" }).validator(object({
	table: _enum([
		"ops_pos",
		"ops_claims",
		"ops_reports",
		"ops_drawings"
	]),
	id: number(),
	status: string()
})).handler(setRecordStatus_createServerFn_handler, async ({ data }) => {
	await applyOpsBoard();
	const sql = await getSql();
	if (data.table === "ops_pos") await sql`update ops_pos set status = ${data.status} where id = ${data.id}`;
	if (data.table === "ops_claims") await sql`update ops_claims set status = ${data.status} where id = ${data.id}`;
	if (data.table === "ops_reports") await sql`update ops_reports set status = ${data.status} where id = ${data.id}`;
	if (data.table === "ops_drawings") await sql`update ops_drawings set status = ${data.status} where id = ${data.id}`;
	return loadOps();
});
//#endregion
export { addClaim_createServerFn_handler, addDrawing_createServerFn_handler, addPerson_createServerFn_handler, addPo_createServerFn_handler, addProject_createServerFn_handler, addReceive_createServerFn_handler, addReport_createServerFn_handler, dropClaim_createServerFn_handler, getOps_createServerFn_handler, markSalaryPaid_createServerFn_handler, publishDay_createServerFn_handler, setAttend_createServerFn_handler, setRecordStatus_createServerFn_handler, updateClaim_createServerFn_handler, upsertAdvance_createServerFn_handler, upsertRepay_createServerFn_handler };
