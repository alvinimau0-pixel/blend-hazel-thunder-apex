import { o as __toESM } from "../_runtime.mjs";
import { n as cn } from "./utils-DyetTdWh.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { T as Button, u as useAsOf, x as Badge } from "./router-DCeeEZYX.mjs";
import { g as buildMskInsights, n as CLAIM, r as FLOOR_PLANS, t as BUILDING_STACK, u as SECTION_PLAN, v as claimPct, x as formatRm } from "./domain-B9hSVQhA.mjs";
import { t as SiteGate } from "./site-gate-DjT4Gwiq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/building-CHCEgVbc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BuildingPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteGate, { children: (site) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, { site }) });
}
function Building({ site }) {
	const { asOf } = useAsOf();
	const msk = buildMskInsights(site, asOf);
	const [plan, setPlan] = (0, import_react.useState)("section");
	const lockByCode = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const row of msk.levelRows) map.set(row.level.code, row);
		return map;
	}, [msk.levelRows]);
	const active = plan === "section" ? SECTION_PLAN : FLOOR_PLANS.find((p) => p.code === plan);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold uppercase tracking-wide",
				children: "Capitol stack"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-xl text-sm text-ink-soft",
				children: "B4 plant to helipad. Podium is claimed complete on PC36. Towers follow the 27 Aug MSK sheet. Open a plan to see lots and plant rooms."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl bg-panel p-4 shadow-docket",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-end justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-[11px] uppercase tracking-[0.16em] text-muted",
						children: [
							"Progress claim ",
							CLAIM.no,
							" · 25 Jul 2026"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-2xl font-semibold tabular-nums",
						children: [
							claimPct(CLAIM.workDone, CLAIM.contract),
							"%",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "ml-2 text-sm font-normal text-muted",
								children: [
									"RM ",
									formatRm(CLAIM.workDone),
									" of ",
									formatRm(CLAIM.contract)
								]
							})
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: [
							"This claim RM ",
							formatRm(CLAIM.thisClaim),
							" · VO extra RM ",
							formatRm(CLAIM.voWorkDone)
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 grid gap-1.5 sm:grid-cols-2",
					children: CLAIM.lines.map((line) => {
						const pct = claimPct(line.work, line.contract);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-10 font-mono text-[10px] text-muted",
									children: line.code
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "min-w-0 flex-1 truncate text-sm",
									children: line.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-xs tabular-nums",
									children: [pct, "%"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden w-24 sm:block",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block h-1.5 overflow-hidden rounded-full bg-paper-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("block h-full rounded-full", pct >= 100 ? "bg-cell-done-ink" : "bg-accent"),
											style: { width: `${Math.min(pct, 100)}%` }
										})
									})
								})
							]
						}, line.code);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 lg:grid-cols-[minmax(0,20rem)_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl bg-panel p-3 shadow-docket",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-1 font-display text-[11px] uppercase tracking-[0.16em] text-muted",
						children: "Section · high zone / low zone / podium"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-2",
						children: BUILDING_STACK.map((fl) => {
							const lock = lockByCode.get(fl.code);
							const pct = fl.gm === "podium" ? 100 : fl.gm === "plant" && !lock ? null : lock?.avg ?? null;
							const tone = pct == null ? "bg-paper-2" : pct >= 80 ? "bg-cell-done" : pct >= 40 ? "bg-cell-risk" : "bg-cell-miss";
							const planCode = FLOOR_PLANS.some((p) => p.code === fl.code) ? fl.code : null;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									if (planCode) setPlan(planCode);
								},
								className: cn("flex w-full items-center gap-2 rounded-md px-1.5 py-1 text-left hover:bg-paper-2", plan === fl.code && "bg-paper-2"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-5 w-1.5 shrink-0 rounded-sm", tone) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-12 font-display text-xs uppercase",
										children: fl.code
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "min-w-0 flex-1 truncate text-[11px] text-muted",
										children: fl.label
									}),
									lock ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-mono text-[10px] tabular-nums text-ink-soft",
										children: [
											"A",
											lock.A,
											" B",
											lock.B
										]
									}) : pct != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-mono text-[10px] tabular-nums text-ink-soft",
										children: [pct, "%"]
									}) : null
								]
							}) }, fl.code);
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: plan === "section" ? "default" : "outline",
									onClick: () => setPlan("section"),
									children: "Section"
								}),
								FLOOR_PLANS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: plan === p.code ? "default" : "outline",
									onClick: () => setPlan(p.code),
									children: p.code
								}, p.code)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/msk",
									className: "ml-auto",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "outline",
										children: "Open MSK"
									})
								})
							]
						}),
						active ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
							className: "overflow-hidden rounded-xl bg-panel shadow-docket",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: active.src,
								alt: active.title,
								className: "mx-auto max-h-[70vh] w-full object-contain bg-paper"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
								className: "border-t border-line px-4 py-2 text-xs uppercase tracking-[0.12em] text-muted",
								children: active.title
							})]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl bg-panel p-4 shadow-docket",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-lg uppercase",
								children: "Where the problems sit"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-2 space-y-1.5 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: "miss",
										children: "Hole"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-2",
										children: "L20 Tower B sanitary toilets — L21–25 already 100%."
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: "miss",
										children: "Hole"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-2",
										children: "L26 Tower B sanitary toilets — L27–28 already 25%."
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: "risk",
										children: "Lag"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-2",
										children: "Transfer pump pipes: TA stalled at L14 (10%), TB 50% through L19."
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: "risk",
										children: "Next"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-2",
										children: "CW tenant stops at L29. L30–31 not started. Roof pumps L31 90% / 31M 0%."
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "Podium" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-2",
										children: "B4–L12 claimed 100% on PC36 (25 Jul). Physical check is still your call."
									})] })
								]
							})]
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { BuildingPage as component };
