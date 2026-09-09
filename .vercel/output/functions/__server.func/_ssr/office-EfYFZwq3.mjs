import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as COMPANY, r as PEOPLE, t as CALL_DESK } from "./company-BVHhciP6.mjs";
import { l as Letterhead, u as useAsOf, x as Badge } from "./router-DCeeEZYX.mjs";
import { t as SignOff } from "./sign-off-BvBdTETZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/office-EfYFZwq3.js
var import_jsx_runtime = require_jsx_runtime();
var GROUPS = [
	{
		id: "lead",
		label: "Leadership",
		ids: [
			"james",
			"ahfat",
			"khairul"
		]
	},
	{
		id: "site",
		label: "Site desk",
		ids: ["alvin"]
	},
	{
		id: "office",
		label: "Office desk",
		ids: [
			"zilla",
			"farah",
			"jenny"
		]
	}
];
function OfficePage() {
	const { asOf } = useAsOf();
	const byId = new Map(PEOPLE.map((p) => [p.id, p]));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "print-sheet overflow-hidden rounded-xl bg-panel shadow-docket",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-b border-ink bg-sheet px-5 py-4 sm:px-7",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Letterhead, { asOf })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5 sm:p-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-display text-[11px] uppercase tracking-[0.2em] text-muted",
							children: ["Internal · ", COMPANY.project]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-1 font-display text-3xl font-semibold uppercase tracking-wide",
							children: "Gelaran Maju desk"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 max-w-xl text-sm text-ink-soft",
							children: "Who signs the brief, who walks the board, and who to ping when a floor is skipped or a claim is stuck."
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "grid gap-3 lg:grid-cols-3",
				children: GROUPS.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl bg-panel p-5 shadow-docket",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-[11px] uppercase tracking-[0.16em] text-muted",
						children: group.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 divide-y divide-line",
						children: group.ids.map((id) => {
							const p = byId.get(id);
							if (!p) return null;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "py-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-baseline justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-lg font-semibold uppercase tracking-wide",
										children: p.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: p.title })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[12px] text-ink-soft",
									children: p.handles
								})]
							}, p.id);
						})
					})]
				}, group.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl bg-panel p-5 shadow-docket sm:p-7",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl uppercase tracking-wide",
					children: "Who to ping"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 divide-y divide-line",
					children: CALL_DESK.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-col gap-0.5 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-ink-soft",
							children: row.when
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "shrink-0 font-display text-sm font-semibold uppercase tracking-wide",
							children: [row.ping, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-2 font-sans text-[11px] font-normal normal-case tracking-normal text-muted",
								children: row.title
							})]
						})]
					}, row.when))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "print-sheet rounded-xl bg-panel p-5 shadow-docket sm:p-7",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignOff, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-[11px] uppercase tracking-[0.14em] text-muted",
					children: [
						COMPANY.legal,
						" · ",
						COMPANY.registration,
						" · The Capitol MSK"
					]
				})]
			})
		]
	});
}
//#endregion
export { OfficePage as component };
