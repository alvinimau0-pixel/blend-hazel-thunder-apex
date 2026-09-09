import { n as cn } from "./utils-DyetTdWh.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { C as Label } from "./router-DCeeEZYX.mjs";
import { A as siteCrewGrouped } from "./domain-B9hSVQhA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/who-did-NTzE6JqS.js
var import_jsx_runtime = require_jsx_runtime();
function PctPicker({ value, onChange, outlets }) {
	const of = outlets ?? 0;
	const chips = of ? [
		{
			n: 0,
			label: "0"
		},
		{
			n: Math.round(4 / of * 100),
			label: "4/12"
		},
		{
			n: 50,
			label: "6/12"
		},
		{
			n: Math.round(8 / of * 100),
			label: "8/12"
		},
		{
			n: 100,
			label: "12/12"
		}
	] : [
		{
			n: 0,
			label: "0"
		},
		{
			n: 25,
			label: "25"
		},
		{
			n: 50,
			label: "50"
		},
		{
			n: 75,
			label: "75"
		},
		{
			n: 100,
			label: "100"
		}
	];
	function setRaw(raw) {
		const n = Number(raw);
		if (!Number.isFinite(n)) return;
		onChange(Math.max(0, Math.min(100, Math.round(n))));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-muted",
						children: "Set %"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "number",
						inputMode: "numeric",
						min: 0,
						max: 100,
						value,
						onChange: (e) => setRaw(e.target.value),
						className: "mt-1 h-12 w-full rounded-md border border-line bg-panel px-3 font-mono text-lg tabular-nums outline-none ring-ring focus:ring-2"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mb-2 font-display text-sm uppercase text-muted",
					children: "%"
				})]
			}),
			of > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-[12px] text-ink-soft",
				children: [
					Math.round(value / 100 * of),
					" of ",
					of,
					" outlets",
					value === 0 ? " · this floor is next" : null
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-5 gap-1.5",
				children: chips.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onChange(c.n),
					className: cn("min-h-11 rounded-md border text-sm tabular-nums", value === c.n ? "border-ink bg-ink text-paper" : "border-line bg-panel hover:bg-paper-2"),
					children: c.label
				}, c.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "range",
				min: 0,
				max: 100,
				step: 1,
				value,
				onChange: (e) => onChange(Number(e.target.value)),
				className: "w-full accent-accent"
			})
		]
	});
}
function tenantOutlets(seq) {
	return seq === 9 ? 12 : void 0;
}
var JOB_SCOPES = [
	{
		id: "CW",
		label: "CW"
	},
	{
		id: "FW",
		label: "FW"
	},
	{
		id: "SAN",
		label: "SAN"
	},
	{
		id: "IRR",
		label: "IRR"
	},
	{
		id: "WELD",
		label: "Welding"
	},
	{
		id: "REPAIR",
		label: "Repair"
	}
];
function scopeFromTrade(trade, packageTrade) {
	const pack = (packageTrade ?? "").toUpperCase();
	if (pack === "IRR") return "IRR";
	if (pack === "CW") return "CW";
	if (pack === "SAN") return "SAN";
	const t = trade.toLowerCase();
	if (/\birr|irrig/.test(t)) return "IRR";
	if (/weld/.test(t)) return "WELD";
	if (/repair|housekeep/.test(t)) return "REPAIR";
	if (/\bfw\b|fire water|floor.?waste/.test(t)) return "FW";
	if (/san|upvc|fitting|wares|tenant|outlet/.test(t)) return "SAN";
	if (/cw|ppr|sleeve|mainstack|stainless|\bss\b|piping|pipe/.test(t)) return "CW";
	return "SAN";
}
function withScopeNote(note, scope) {
	const tag = JOB_SCOPES.find((s) => s.id === scope)?.label ?? scope;
	const body = (note ?? "").replace(/^(CW|FW|SAN|IRR|Welding|Repair)\s*·\s*/i, "").trim();
	if (!body) return tag;
	return `${tag} · ${body}`;
}
function selectClass(extra) {
	return cn("mt-1 h-11 w-full rounded-md border border-line bg-panel px-3 text-sm", extra);
}
function WhoDidThis({ crew, crewId, onCrewId, scope, onScope, preferSubs = false, idPrefix = "who" }) {
	const grouped = siteCrewGrouped(crew);
	const side = crew.find((c) => c.id === crewId)?.contractor === "SUB" ? "SUB" : "GM";
	const listed = side === "SUB" ? grouped.subs : grouped.gm;
	const names = listed.length ? listed : grouped.all;
	function setSide(next) {
		const pool = next === "SUB" ? grouped.subs : grouped.gm;
		if (pool.some((c) => c.id === crewId)) return;
		const pick = preferSubs && next === "SUB" && pool.find((c) => c.callsign === "Aipoon") || pool.find((c) => scopeFromTrade(c.trade) === scope) || pool[0];
		if (pick) onCrewId(pick.id);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor: `${idPrefix}-worker`,
				children: "Worker"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				id: `${idPrefix}-worker`,
				value: names.some((c) => c.id === crewId) ? crewId : names[0]?.id ?? 0,
				onChange: (e) => onCrewId(Number(e.target.value)),
				className: selectClass(),
				children: names.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: c.id,
					children: c.callsign
				}, c.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-muted",
				children: "GM or sub"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 grid grid-cols-2 gap-1.5",
				children: [{
					id: "GM",
					label: "GM"
				}, {
					id: "SUB",
					label: "Sub under GM"
				}].map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setSide(opt.id),
					className: cn("min-h-11 rounded-md border text-sm uppercase tracking-[0.08em]", side === opt.id ? "border-ink bg-ink text-paper" : "border-line bg-panel hover:bg-paper-2"),
					children: opt.label
				}, opt.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-muted",
				children: "Job scope"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 grid grid-cols-3 gap-1.5 sm:grid-cols-6",
				children: JOB_SCOPES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onScope(s.id),
					className: cn("min-h-11 rounded-md border px-1 text-sm", scope === s.id ? "border-ink bg-ink text-paper" : "border-line bg-panel hover:bg-paper-2"),
					children: s.label
				}, s.id))
			})] })
		]
	});
}
//#endregion
export { withScopeNote as a, tenantOutlets as i, WhoDidThis as n, scopeFromTrade as r, PctPicker as t };
