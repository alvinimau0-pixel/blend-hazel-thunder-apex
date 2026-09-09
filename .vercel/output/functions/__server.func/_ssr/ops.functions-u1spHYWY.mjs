import { o as getSql } from "./utils-DyetTdWh.mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as PO_SEED, c as REPORT_SEED, i as OPS_REV, l as SUB_SEED, n as CLAIM_SEED, o as PROJECT_SEED, r as DRAWING_SEED, s as RECEIVE_SEED, t as ADVANCE_SEED, u as WORKER_SEED } from "./ops-seed-AJHg6GHn.mjs";
import { a as object, i as number, n as array, o as string, t as _enum } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ops.functions-u1spHYWY.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var ops_functions_exports = /* @__PURE__ */ __exportAll({
	addClaim: () => addClaim,
	addDrawing: () => addDrawing,
	addPerson: () => addPerson,
	addPo: () => addPo,
	addProject: () => addProject,
	addReceive: () => addReceive,
	addReport: () => addReport,
	applyOpsBoard: () => applyOpsBoard,
	dropClaim: () => dropClaim,
	getOps: () => getOps,
	markSalaryPaid: () => markSalaryPaid,
	publishDay: () => publishDay,
	setAttend: () => setAttend,
	setRecordStatus: () => setRecordStatus,
	updateClaim: () => updateClaim,
	upsertAdvance: () => upsertAdvance,
	upsertRepay: () => upsertRepay
});
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
var getOps = createServerFn({ method: "GET" }).handler(createSsrRpc("d250f79bae545e28924107abd7b10d35e00709a0fd30d57dfde88e804cfca701"));
var addProject = createServerFn({ method: "POST" }).validator(object({
	name: string().min(1),
	client: string(),
	location: string()
})).handler(createSsrRpc("9c7839c9d359aeb12dfb42b514f864ac9509ac55564870e5055bf85a5c7ffeca"));
var addDrawing = createServerFn({ method: "POST" }).validator(object({
	projectId: number(),
	title: string(),
	refNo: string(),
	discipline: string(),
	rev: string(),
	dated: string()
})).handler(createSsrRpc("48a6b8727dfe6764af86343c0a6644516af0927710ed32b78a115d343b16ab4e"));
var addPo = createServerFn({ method: "POST" }).validator(object({
	projectId: number(),
	poNo: string(),
	supplier: string(),
	dated: string(),
	material: string(),
	amount: number()
})).handler(createSsrRpc("7e0573e0f9d04dd434e7e97170d30a0aab6619f9b5a2c6a2350222d33edf81f1"));
var addReceive = createServerFn({ method: "POST" }).validator(object({
	projectId: number(),
	doNo: string(),
	poId: number().nullable(),
	dated: string(),
	receivedBy: string(),
	qtyNote: string(),
	status: string()
})).handler(createSsrRpc("fa3e3f5d27816124b0735c21fa048a33c2ef66a6e5837f20c09c61122add9070"));
var addClaim = createServerFn({ method: "POST" }).validator(object({
	projectId: number(),
	claimNo: string(),
	title: string(),
	period: string(),
	dated: string(),
	amount: number()
})).handler(createSsrRpc("a77df45826d4b234593f83e382843f3f88b162bdb9486ea8619f47e8589f8290"));
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
})).handler(createSsrRpc("b0f2cd27624687282b4a1e76f86eba90aafcf1b9babd8b6fbeaf93d22ababe3e"));
var dropClaim = createServerFn({ method: "POST" }).validator(object({ id: number() })).handler(createSsrRpc("be4053ccacba0d59843a362f83033b2003ee3dae94c76a5a6b5baf7d6a5e18ef"));
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
})).handler(createSsrRpc("14b1e1e3999223792432b98900af1cecc9badcd8554be75d49c75d52acc763f1"));
var publishDay = createServerFn({ method: "POST" }).validator(object({ dated: string() })).handler(createSsrRpc("77ceb76d13e9377668866e3ab09f3633e524236922c010a4dc21126a3d7975f8"));
var addPerson = createServerFn({ method: "POST" }).validator(object({
	projectId: number(),
	kind: _enum(["worker", "sub"]),
	name: string().min(1),
	trade: string(),
	contractor: string(),
	dailyRate: number()
})).handler(createSsrRpc("a34120c7c76923b48514b95211df4861181c9836de29f030bf3ec0d1853c01f2"));
var upsertAdvance = createServerFn({ method: "POST" }).validator(object({
	projectId: number(),
	personId: number(),
	dated: string(),
	amount: number(),
	reason: string()
})).handler(createSsrRpc("016a1061251698e45b80d13a4a777ed2faacf9b8ae5a9839e00a42a6271f8bb0"));
var upsertRepay = createServerFn({ method: "POST" }).validator(object({
	projectId: number(),
	personId: number(),
	month: string(),
	amount: number()
})).handler(createSsrRpc("cf51ef00fb02502f06b0b83217036c6c211c9d6aaf0cfdd734cd12d7951f8032"));
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
})).handler(createSsrRpc("e38514e0c1b7dd811c40b1a06bf2f6c2493872fd76196e5d6908b4afbaf62d04"));
var markSalaryPaid = createServerFn({ method: "POST" }).validator(object({ id: number() })).handler(createSsrRpc("d24ea28dfb0ca9d7db5adeb2f748f847d6e2acb60862970e4ad9bb1992abd1b4"));
var setRecordStatus = createServerFn({ method: "POST" }).validator(object({
	table: _enum([
		"ops_pos",
		"ops_claims",
		"ops_reports",
		"ops_drawings"
	]),
	id: number(),
	status: string()
})).handler(createSsrRpc("80ef2bb23f22acc994c46bdca7db49696dab0be5b713ec03ef28a6faf00cf0f1"));
//#endregion
export { upsertRepay as _, addProject as a, dropClaim as c, ops_functions_exports as d, publishDay as f, upsertAdvance as g, updateClaim as h, addPo as i, getOps as l, setRecordStatus as m, addDrawing as n, addReceive as o, setAttend as p, addPerson as r, addReport as s, addClaim as t, markSalaryPaid as u, createSsrRpc as v, __exportAll as y };
