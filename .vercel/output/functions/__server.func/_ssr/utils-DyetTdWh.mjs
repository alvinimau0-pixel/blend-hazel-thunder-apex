import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-DyetTdWh.js
var _0002_schema_default = "create table if not exists site_meta (\n  id integer primary key,\n  project_name text not null,\n  project_code text not null,\n  subject text not null,\n  section text not null,\n  client_name text not null,\n  seeded_at timestamptz not null default now()\n);\n\ncreate table if not exists activities (\n  id serial primary key,\n  seq integer not null unique,\n  name text not null,\n  contractor text not null,\n  gm_trade boolean not null default false\n);\n\ncreate table if not exists floors (\n  id serial primary key,\n  code text not null unique,\n  sort_order integer not null\n);\n\ncreate table if not exists toilets (\n  id serial primary key,\n  code text not null unique,\n  tower text not null\n);\n\ncreate table if not exists floor_dates (\n  floor_id integer not null references floors(id),\n  activity_id integer not null references activities(id),\n  due_on date not null,\n  primary key (floor_id, activity_id)\n);\n\ncreate table if not exists progress (\n  floor_id integer not null references floors(id),\n  toilet_id integer not null references toilets(id),\n  activity_id integer not null references activities(id),\n  pct integer not null default 0,\n  updated_at timestamptz not null default now(),\n  primary key (floor_id, toilet_id, activity_id)\n);\n\ncreate table if not exists crew (\n  id serial primary key,\n  callsign text not null unique,\n  contractor text not null,\n  trade text not null,\n  active boolean not null default true\n);\n\ncreate table if not exists assignments (\n  id serial primary key,\n  work_date date not null,\n  crew_id integer not null references crew(id),\n  floor_id integer not null references floors(id),\n  toilet_id integer not null references toilets(id),\n  activity_id integer not null references activities(id),\n  start_pct integer not null,\n  claimed_pct integer,\n  note text,\n  photo_data text,\n  verified boolean not null default false,\n  rejected boolean not null default false,\n  created_at timestamptz not null default now()\n);\n\ncreate index if not exists assignments_date_idx on assignments (work_date);\n\ncreate table if not exists audit_log (\n  id serial primary key,\n  created_at timestamptz not null default now(),\n  kind text not null,\n  floor_code text not null,\n  toilet_code text not null,\n  activity_seq integer not null,\n  from_pct integer,\n  to_pct integer,\n  crew_callsign text,\n  note text\n);\n\ncreate index if not exists audit_log_created_idx on audit_log (created_at desc);\n";
var _0003_schedule_rev_default = "alter table site_meta add column if not exists schedule_rev text not null default '';\n";
var _0004_company_default = "alter table site_meta add column if not exists company_name text not null default 'Gelaran Maju Sdn Bhd';\nalter table site_meta add column if not exists company_rev text not null default '';\n";
var _0005_msk_default = "alter table site_meta add column if not exists msk_rev text not null default '';\n\ncreate table if not exists msk_items (\n  id serial primary key,\n  seq integer not null unique,\n  code text not null unique,\n  name text not null,\n  short_name text not null,\n  trade text not null,\n  trade_weight numeric not null\n);\n\ncreate table if not exists msk_levels (\n  id serial primary key,\n  code text not null unique,\n  sort_order integer not null,\n  zone text not null,\n  ffl text not null\n);\n\ncreate table if not exists msk_progress (\n  level_id integer not null references msk_levels(id),\n  tower text not null,\n  item_id integer not null references msk_items(id),\n  pct integer not null default 0,\n  na boolean not null default false,\n  updated_at timestamptz not null default now(),\n  primary key (level_id, tower, item_id)\n);\n\ncreate table if not exists msk_assignments (\n  id serial primary key,\n  work_date date not null,\n  crew_id integer not null references crew(id),\n  level_id integer not null references msk_levels(id),\n  tower text not null,\n  item_id integer not null references msk_items(id),\n  start_pct integer not null,\n  claimed_pct integer,\n  note text,\n  photo_data text,\n  verified boolean not null default false,\n  rejected boolean not null default false,\n  created_at timestamptz not null default now()\n);\n\ncreate index if not exists msk_assignments_date_idx on msk_assignments (work_date);\n";
var _0006_ops_default = "create table if not exists ops_meta (\n  id integer primary key,\n  ops_rev text not null default ''\n);\n\ncreate table if not exists ops_projects (\n  id serial primary key,\n  code text not null unique,\n  name text not null,\n  client_name text not null,\n  location text not null default '',\n  status text not null default 'active',\n  created_at timestamptz not null default now()\n);\n\ncreate table if not exists ops_drawings (\n  id serial primary key,\n  project_id integer not null references ops_projects(id),\n  title text not null,\n  ref_no text not null,\n  discipline text not null,\n  rev text not null default 'A',\n  dated text not null,\n  status text not null default 'current',\n  file_href text not null default ''\n);\n\ncreate table if not exists ops_pos (\n  id serial primary key,\n  project_id integer not null references ops_projects(id),\n  po_no text not null,\n  supplier text not null,\n  dated text not null,\n  material text not null,\n  amount integer not null default 0,\n  status text not null default 'issued',\n  ping text not null default 'Zilla'\n);\n\ncreate table if not exists ops_receives (\n  id serial primary key,\n  project_id integer not null references ops_projects(id),\n  do_no text not null,\n  po_id integer references ops_pos(id),\n  dated text not null,\n  received_by text not null,\n  qty_note text not null default '',\n  status text not null default 'received'\n);\n\ncreate table if not exists ops_claims (\n  id serial primary key,\n  project_id integer not null references ops_projects(id),\n  claim_no text not null,\n  title text not null,\n  period text not null,\n  dated text not null,\n  amount integer not null default 0,\n  certified integer not null default 0,\n  status text not null default 'draft',\n  ping text not null default 'Jenny'\n);\n\ncreate table if not exists ops_reports (\n  id serial primary key,\n  project_id integer not null references ops_projects(id),\n  cadence text not null,\n  period text not null,\n  dated text not null,\n  lock_pct integer not null default 0,\n  summary text not null default '',\n  status text not null default 'draft',\n  prepared_by text not null default 'Mus / Alvin / Hakim'\n);\n\ncreate table if not exists ops_people (\n  id serial primary key,\n  project_id integer not null references ops_projects(id),\n  kind text not null,\n  name text not null,\n  trade text not null default '',\n  contractor text not null default 'GM',\n  daily_rate integer not null default 0,\n  active boolean not null default true\n);\n\ncreate table if not exists ops_salary (\n  id serial primary key,\n  project_id integer not null references ops_projects(id),\n  person_id integer not null references ops_people(id),\n  month text not null,\n  basic integer not null default 0,\n  ot integer not null default 0,\n  advance integer not null default 0,\n  net integer not null default 0,\n  status text not null default 'open',\n  unique (person_id, month)\n);\n\ncreate table if not exists ops_advances (\n  id serial primary key,\n  project_id integer not null references ops_projects(id),\n  person_id integer not null references ops_people(id),\n  dated text not null,\n  amount integer not null,\n  reason text not null default '',\n  recovered boolean not null default false\n);\n\ncreate unique index if not exists ops_pos_no_idx on ops_pos (project_id, po_no);\ncreate unique index if not exists ops_claims_no_idx on ops_claims (project_id, claim_no);\n";
/**
* Migration bookkeeping shared by the two appliers — `scripts/migrate.mjs`
* (deploy, `readdir`) and `src/lib/db.ts` (PGLite preview, `import.meta.glob`).
*
* Applied files are keyed by BASENAME, so the same file applies once no matter
* which directory it is globbed from. That is what makes the auth schema safe to
* copy from `migrations/auth/` into `migrations/` when an app turns sign-in on:
* a database that already has `0001_auth.sql` will not re-run it.
*
* Neither applier descends into subdirectories, so `migrations/auth/*.sql` is
* out of scope for both until it is copied up.
*/
/**
* The `_migrations` key for a migration path (or bare filename).
* @param {string} path
* @returns {string}
*/
function migrationName(path) {
	return path.split("/").pop() ?? path;
}
/**
* @param {string} path
* @returns {boolean}
*/
function isMigrationFile(path) {
	return path.endsWith(".sql");
}
/**
* Migrations in `paths` that are not yet in `applied`, in apply order.
* Non-`.sql` entries (a `readdir` also yields `migrations/auth/`) are dropped.
* @param {Iterable<string>} paths
* @param {Iterable<string>} applied
* @returns {Array<{ name: string, path: string }>}
*/
function pendingMigrations(paths, applied) {
	const done = new Set(applied);
	return [...paths].filter(isMigrationFile).map((path) => ({
		name: migrationName(path),
		path
	})).sort((a, b) => a.name.localeCompare(b.name)).filter(({ name }) => !done.has(name));
}
var rawDatabaseUrl = typeof process !== "undefined" ? process.env.DATABASE_URL : void 0;
var databaseUrl = rawDatabaseUrl && rawDatabaseUrl.trim() ? rawDatabaseUrl : void 0;
/**
* Active backend: real **Neon** when `DATABASE_URL` is set (deployed / configured
* sandbox), otherwise a local embedded **PGLite** (Postgres compiled to WASM) so
* the app has a working database even with nothing configured — the live preview
* included. Swap in Neon later by just setting `DATABASE_URL`; no code changes.
*/
var dbSource = databaseUrl ? "neon" : "pglite";
/**
* Init state lives on globalThis as promises: dev HMR creates new instances of
* this module, and two instances racing module-level state would open a second
* pool or run two concurrent PGLite migration passes (whose duplicate
* `_migrations` insert rejects — and would get memoized, poisoning every later
* `getSql()`). A failed init clears its slot so the next call retries.
*/
var globalRef = globalThis;
/**
* Result-type parity: Postgres sends every value as text plus a type OID — the
* JS value is the DRIVER's parsing choice, and pg and PGLite disagree (pg:
* int8 -> string, date -> local-midnight Date; PGLite: int8 -> BigInt, which
* JSON.stringify rejects, date -> UTC Date). Normalize both so preview and
* production return identical, JSON-safe shapes:
*   int8/bigint (incl. count(*)) -> number (past 2^53 loses precision — cast
*                                   `::text` if you ever need huge integers)
*   date                         -> 'YYYY-MM-DD' string
*   interval                     -> Postgres interval text
* numeric already comes back as a string on both (arbitrary precision).
*/
var OID_INT8 = 20;
var OID_DATE = 1082;
var OID_INTERVAL = 1186;
var identity = (v) => v;
/** Wrap a query runner in the tagged-template + `.query()` `Sql` surface. */
function toSql(run) {
	const sql = (async (strings, ...values) => {
		let text = strings[0];
		for (let i = 0; i < values.length; i += 1) text += `$${i + 1}${strings[i + 1]}`;
		return run(text, values);
	});
	sql.query = (text, params = []) => run(text, params);
	return sql;
}
function createNeonSql() {
	globalRef.__pgSqlPromise__ ??= (async () => {
		const { Pool, types } = await import("../_libs/pg.mjs").then((n) => n.t);
		types.setTypeParser(OID_INT8, Number);
		types.setTypeParser(OID_DATE, identity);
		types.setTypeParser(OID_INTERVAL, identity);
		const pool = new Pool({ connectionString: databaseUrl });
		return toSql(async (text, params) => {
			return (await pool.query(text, params)).rows;
		});
	})().catch((err) => {
		globalRef.__pgSqlPromise__ = void 0;
		throw err;
	});
	return globalRef.__pgSqlPromise__;
}
async function createPgliteSql() {
	globalRef.__pgliteInstance__ ??= (async () => {
		const { PGlite } = await import("../_libs/electric-sql__pglite.mjs").then((n) => n.t);
		const pg = new PGlite({ parsers: {
			[OID_INT8]: Number,
			[OID_DATE]: identity,
			[OID_INTERVAL]: identity
		} });
		await pg.waitReady;
		await pg.exec("create table if not exists _migrations (name text primary key, applied_at timestamptz not null default now())");
		return pg;
	})().catch((err) => {
		globalRef.__pgliteInstance__ = void 0;
		throw err;
	});
	const pg = await globalRef.__pgliteInstance__;
	const migrate = async () => {
		const migrations = /* #__PURE__ */ Object.assign({
			"/migrations/0002_schema.sql": _0002_schema_default,
			"/migrations/0003_schedule_rev.sql": _0003_schedule_rev_default,
			"/migrations/0004_company.sql": _0004_company_default,
			"/migrations/0005_msk.sql": _0005_msk_default,
			"/migrations/0006_ops.sql": _0006_ops_default
		});
		const done = (await pg.query("select name from _migrations")).rows.map((r) => r.name);
		for (const { name, path } of pendingMigrations(Object.keys(migrations), done)) await pg.transaction(async (tx) => {
			await tx.exec(migrations[path]);
			await tx.query("insert into _migrations (name) values ($1)", [name]);
		});
	};
	const pass = (globalRef.__pgliteMigrateChain__ ?? Promise.resolve()).catch(() => void 0).then(migrate);
	globalRef.__pgliteMigrateChain__ = pass;
	await pass;
	return toSql(async (text, params) => {
		return (await pg.query(text, params)).rows;
	});
}
var sqlPromise = null;
async function createSql() {
	if (typeof window !== "undefined") throw new Error("@/lib/db is server-only — call getSql() from a createServerFn handler or a server route loader, never from client code.");
	return dbSource === "neon" ? createNeonSql() : createPgliteSql();
}
/**
* Get the shared, **server-only** SQL client. Neon when `DATABASE_URL` is set,
* otherwise the local PGLite fallback. Memoized — safe to call per request.
*
* Schema comes from `migrations/*.sql`, auto-applied before the first query on
* both backends — define tables there, never inline in server functions.
*/
function getSql() {
	sqlPromise ??= createSql().catch((err) => {
		sqlPromise = null;
		throw err;
	});
	return sqlPromise;
}
/**
* Finish DB bootstrap before the server handles traffic.
*
* - **PGLite** (preview / no `DATABASE_URL`): open the in-memory DB and apply
*   `migrations/*.sql`. Idempotent — concurrent callers share one promise.
* - **Neon**: no-op (pool is created lazily on first query).
*
* Vite `configureServer` awaits this at dev startup; production imports of this
* module kick it off immediately (see bottom of file).
*/
function ensureDbReady() {
	if (dbSource !== "pglite") return Promise.resolve();
	return getSql().then(() => void 0);
}
var globalBoot = globalThis;
if (typeof window === "undefined" && dbSource === "pglite") globalBoot.__pgBootstrapPromise__ ??= ensureDbReady().catch((err) => {
	globalBoot.__pgBootstrapPromise__ = void 0;
	console.error("[db] PGLite bootstrap failed:", err);
	throw err;
});
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function todayIso(timeZone = "Asia/Kuala_Lumpur") {
	return new Intl.DateTimeFormat("en-CA", { timeZone }).format(/* @__PURE__ */ new Date());
}
function formatStamp(iso) {
	const [y, m, d] = iso.split("-").map(Number);
	return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-GB", {
		day: "2-digit",
		month: "short",
		year: "numeric",
		timeZone: "UTC"
	}).toUpperCase();
}
/** "1 Sep 2026" — signed report period, not the stamp. */
function formatPeriod(iso) {
	const [y, m, d] = iso.split("-").map(Number);
	return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric",
		timeZone: "UTC"
	});
}
function addDaysIso(iso, days) {
	const [y, m, d] = iso.split("-").map(Number);
	return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10);
}
function mondayOf(iso) {
	const [y, m, d] = iso.split("-").map(Number);
	const day = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
	return addDaysIso(iso, day === 0 ? -6 : 1 - day);
}
function shortDay(iso) {
	const [y, m, d] = iso.split("-").map(Number);
	return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-GB", {
		day: "numeric",
		month: "short",
		timeZone: "UTC"
	});
}
function weekPeriod(iso) {
	const start = mondayOf(iso);
	const end = addDaysIso(start, 6);
	return `Week ${shortDay(start)}–${shortDay(end)} ${iso.slice(0, 4)}`;
}
function monthTitle(iso) {
	const [y, m] = iso.split("-").map(Number);
	return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString("en-GB", {
		month: "long",
		year: "numeric",
		timeZone: "UTC"
	});
}
function prevMonthIso(iso) {
	const [y, m] = iso.split("-").map(Number);
	return new Date(Date.UTC(y, m - 2, 1)).toISOString().slice(0, 10);
}
function dayOfMonth(iso) {
	return Number(iso.slice(8, 10));
}
//#endregion
export { formatStamp as a, monthTitle as c, weekPeriod as d, formatPeriod as i, prevMonthIso as l, cn as n, getSql as o, dayOfMonth as r, mondayOf as s, addDaysIso as t, todayIso as u };
