import { n as cn } from "./utils-DyetTdWh.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { u as useAsOf, x as Badge } from "./router-DCeeEZYX.mjs";
import { _ as cellStatus, g as buildMskInsights, h as buildInsights, p as TRADE_LABEL, y as daysBetween } from "./domain-B9hSVQhA.mjs";
import { t as SiteGate } from "./site-gate-DjT4Gwiq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/plan-B-lt8uaf.js
var import_jsx_runtime = require_jsx_runtime();
function PlanPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteGate, { children: (site) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plan, { site }) });
}
function Plan({ site }) {
	const { asOf } = useAsOf();
	const ins = buildInsights(site, asOf);
	const msk = buildMskInsights(site, asOf);
	const week = [];
	for (let d = 0; d <= 7; d++) {
		const dt = /* @__PURE__ */ new Date(`${asOf}T00:00:00Z`);
		dt.setUTCDate(dt.getUTCDate() + d);
		week.push(dt.toISOString().slice(0, 10));
	}
	const dueThisWeek = [];
	for (const floor of site.floors) for (const toilet of site.toilets) for (const act of site.activities) {
		const dueOn = ins.due.get(`${floor.id}:${act.id}`) ?? asOf;
		if (!week.includes(dueOn)) continue;
		if (!act.gmTrade) continue;
		const pct = ins.getPct(floor.id, toilet.id, act.id);
		if (pct >= 100) continue;
		dueThisWeek.push({
			date: dueOn,
			floor: floor.code,
			toilet: toilet.code,
			name: act.name,
			contractor: act.contractor,
			pct,
			status: cellStatus(pct, dueOn, asOf)
		});
	}
	dueThisWeek.sort((a, b) => a.date.localeCompare(b.date) || a.floor.localeCompare(b.floor));
	const forecasts = ins.gmFloorAvgs.map(({ floor, avg }) => {
		const remaining = 100 - avg;
		const days = remaining <= 0 ? 0 : Math.ceil(remaining / 2.4);
		const eta = /* @__PURE__ */ new Date(`${asOf}T00:00:00Z`);
		eta.setUTCDate(eta.getUTCDate() + days);
		return {
			floor,
			avg,
			remaining,
			days,
			eta: eta.toISOString().slice(0, 10)
		};
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold uppercase tracking-wide",
				children: "GM plan"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-xl text-sm text-ink-soft",
				children: "Where the MSK wave sits, which floors are next, and the toilet fitting datelines for the next week."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl bg-panel p-5 shadow-docket",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl uppercase tracking-wide",
						children: "MSK wave front"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						children: "Highest floor that already has progress, per package. Work below a hole is a lie or a skip."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 divide-y divide-line",
						children: msk.wave.map(({ item, fronts }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex flex-wrap items-center gap-2 py-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-20 font-display text-[11px] uppercase text-muted",
									children: TRADE_LABEL[item.trade]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "min-w-0 flex-1 text-sm",
									children: item.shortName
								}),
								fronts.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-xs tabular-nums",
									children: [
										"T",
										f.tower,
										" ",
										f.front?.code ?? "—"
									]
								}, f.tower))
							]
						}, item.id))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl bg-panel p-5 shadow-docket",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl uppercase tracking-wide",
						children: "Next honest starts"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "risk",
						children: msk.nextInLine.filter((n) => n.pct === 0).length
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 grid gap-2 sm:grid-cols-2",
					children: msk.nextInLine.filter((n) => n.pct === 0).slice(0, 12).map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-lg bg-paper-2 px-3 py-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-medium",
							children: [
								n.level.code,
								" T",
								n.tower,
								" · ",
								n.item.shortName
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] uppercase tracking-wider text-muted",
							children: TRADE_LABEL[n.item.trade]
						})]
					}, `${n.level.id}-${n.tower}-${n.item.id}`))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl bg-panel p-5 shadow-docket",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl uppercase tracking-wide",
						children: "Toilet floor lock forecast"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						children: "Section 1 only — sanitary piping, concealed piping and fittings."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3",
						children: forecasts.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg bg-paper-2 px-3 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-lg uppercase",
									children: f.floor.code
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-mono text-sm tabular-nums",
									children: [f.avg, "%"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-ink-soft",
								children: f.remaining === 0 ? "Locked" : `Lock ~ ${f.eta} · ${f.days}d`
							})]
						}, f.floor.id))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl bg-panel p-5 shadow-docket",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl uppercase tracking-wide",
						children: "Next 7 days · toilet GM"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: [dueThisWeek.length, " open"] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 divide-y divide-line",
					children: dueThisWeek.slice(0, 24).map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-3 py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("w-16 shrink-0 font-mono text-[11px] tabular-nums", row.status === "missed" && "text-cell-miss-ink", row.status === "risk" && "text-cell-risk-ink"),
								children: row.date.slice(5)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "truncate text-sm",
									children: [
										row.floor,
										" ",
										row.toilet,
										" · ",
										row.name
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] uppercase tracking-wider text-muted",
									children: row.contractor
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-xs tabular-nums",
								children: [row.pct, "%"]
							})
						]
					}, `${row.floor}-${row.toilet}-${row.name}-${i}`))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl bg-panel p-5 shadow-docket",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl uppercase tracking-wide",
						children: "Held by others"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						children: "Sanitary fittings wait on tiles and vanity. If those are not 80%, we cannot honestly finish."
					}),
					ins.waitingOn.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-ink-soft",
						children: "No other-trade holds on GM work right now."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-2",
						children: ins.waitingOn.slice(0, 12).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-lg bg-cell-risk/50 px-3 py-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-medium",
								children: [
									row.floor.code,
									" ",
									row.toilet.code,
									" · ",
									row.activity.name
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-ink-soft",
								children: [
									"Waiting on ",
									row.blockedBy.contractor,
									" · ",
									row.blockedBy.name,
									" ",
									row.blockedPct,
									"%"
								]
							})]
						}, `${row.floor.id}-${row.toilet.id}-${row.activity.id}-${row.blockedBy.id}`))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted",
				children: [
					"Looking ",
					daysBetween(asOf, week[7] ?? asOf),
					" days ahead from the report date."
				]
			})
		]
	});
}
//#endregion
export { PlanPage as component };
