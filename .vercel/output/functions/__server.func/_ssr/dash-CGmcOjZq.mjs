import { o as __toESM } from "../_runtime.mjs";
import { a as formatStamp, u as todayIso } from "./utils-DyetTdWh.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { T as Button, h as Spinner, u as useAsOf } from "./router-DCeeEZYX.mjs";
import { g as buildMskInsights, m as TRADE_WEIGHT, p as TRADE_LABEL } from "./domain-B9hSVQhA.mjs";
import { t as useSite } from "./use-site-C4IwY3aB.mjs";
import { t as SiteGate } from "./site-gate-DjT4Gwiq.mjs";
import { n as useAutoReport, t as formatPulled } from "./use-auto-report-Xu5iykPX.mjs";
import { a as CartesianGrid, c as Cell, d as Legend, i as XAxis, l as ResponsiveContainer, n as BarChart, o as Bar, r as YAxis, s as Pie, t as PieChart, u as Tooltip } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dash-CGmcOjZq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var INK = "#1c1916";
var ACCENT = "#2f445a";
var STAMP = "#6e2c22";
var DONE = "#14532d";
var MUTED = "#6f675d";
var LINE = "#d3cbbd";
var PAPER = "#fbf8f1";
function DashRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteGate, {
		live: true,
		children: (site) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashBody, { site })
	});
}
function DashBody({ site }) {
	const { asOf, setAsOf } = useAsOf();
	const live = useSite({ live: true });
	const auto = useAutoReport(asOf);
	const msk = buildMskInsights(site, asOf);
	(0, import_react.useEffect)(() => {
		const roll = () => {
			const today = todayIso();
			if (today !== asOf) setAsOf(today);
		};
		roll();
		const id = window.setInterval(roll, 3e4);
		return () => window.clearInterval(id);
	}, [asOf, setAsOf]);
	const pulled = live.dataUpdatedAt ? new Date(live.dataUpdatedAt).toLocaleTimeString("en-GB", {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		timeZone: "Asia/Kuala_Lumpur"
	}) : "—";
	const trades = [
		{
			name: "CW",
			label: TRADE_LABEL.CW,
			pct: msk.tradeAvg.CW,
			weight: Math.round(TRADE_WEIGHT.CW * 100)
		},
		{
			name: "SAN",
			label: TRADE_LABEL.SAN,
			pct: msk.tradeAvg.SAN,
			weight: Math.round(TRADE_WEIGHT.SAN * 100)
		},
		{
			name: "IRR",
			label: TRADE_LABEL.IRR,
			pct: msk.tradeAvg.IRR,
			weight: Math.round(TRADE_WEIGHT.IRR * 100)
		}
	];
	const towers = [{
		name: "TA",
		pct: msk.towerAvg.A
	}, {
		name: "TB",
		pct: msk.towerAvg.B
	}];
	const floors = msk.levelRows.map((row) => ({
		floor: row.level.code.replace(/^L/, ""),
		TA: row.A,
		TB: row.B
	}));
	const packs = msk.itemAvgs.slice().sort((a, b) => b.avg - a.avg).map((row) => ({
		name: row.item.shortName,
		pct: row.avg,
		trade: row.item.trade
	}));
	let done = 0;
	let mid = 0;
	let zero = 0;
	let na = 0;
	for (const p of site.mskProgress) if (p.na) na += 1;
	else if (p.pct >= 100) done += 1;
	else if (p.pct > 0) mid += 1;
	else zero += 1;
	const buckets = [
		{
			name: "100%",
			value: done,
			fill: DONE
		},
		{
			name: "Moving",
			value: mid,
			fill: ACCENT
		},
		{
			name: "0%",
			value: zero,
			fill: STAMP
		},
		{
			name: "N/A",
			value: na,
			fill: LINE
		}
	];
	const holes = msk.flags.filter((f) => f.kind === "hole").length;
	const next = msk.flags.filter((f) => f.kind === "risk").length;
	const lag = msk.flags.filter((f) => f.kind === "lag").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-[11px] uppercase tracking-[0.18em] text-muted",
						children: "Dashboard"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl uppercase tracking-wide",
						children: "Charts"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-ink-soft",
						children: [
							"Live board · ",
							formatStamp(asOf),
							" · lock is the same number as Today"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: live.isFetching ? "size-2 animate-pulse rounded-full bg-stamp" : "size-2 rounded-full bg-cell-done-ink" }),
							"Auto every 15s · pulled ",
							pulled,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mx-2",
								children: "·"
							}),
							"Reports ",
							auto.on ? "auto" : "off",
							" · ",
							formatPulled(auto.lastAt)
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => void live.refetch(),
						disabled: live.isFetching,
						children: live.isFetching ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}), " Updating…"] }) : "Refresh now"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/msk",
						className: "text-sm font-medium text-accent underline-offset-4 hover:underline",
						children: "Open MSK board"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-3 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Tower lock",
						value: `${msk.weightedAvg}%`,
						hint: "CW 40 · SAN 33 · IRR 8"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Tower A",
						value: `${msk.towerAvg.A}%`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Tower B",
						value: `${msk.towerAvg.B}%`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Skipped / next / lag",
						value: `${holes} / ${next} / ${lag}`,
						hint: "Live holes only"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 lg:grid-cols-[1.1fr_0.9fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					title: "Trades",
					hint: "Mean of live cells, then one lock",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-56",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: trades,
								margin: {
									top: 8,
									right: 8,
									left: 0,
									bottom: 0
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										stroke: LINE,
										vertical: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "name",
										tick: {
											fill: MUTED,
											fontSize: 12
										},
										axisLine: false,
										tickLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										domain: [0, 100],
										tick: {
											fill: MUTED,
											fontSize: 11
										},
										axisLine: false,
										tickLine: false,
										width: 32
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PctTip, { extra: (d) => `${d.label} · weight ${d.weight}%` }) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Bar, {
										dataKey: "pct",
										radius: [
											6,
											6,
											0,
											0
										],
										maxBarSize: 48,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: ACCENT }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: STAMP }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: DONE })
										]
									})
								]
							})
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					title: "Cells",
					hint: "Every package × floor × tower",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-56 items-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
									data: buckets,
									dataKey: "value",
									nameKey: "name",
									innerRadius: 52,
									outerRadius: 78,
									paddingAngle: 2,
									stroke: PAPER,
									children: buckets.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: b.fill }, b.name))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountTip, {}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
									verticalAlign: "middle",
									align: "right",
									layout: "vertical",
									iconType: "circle",
									formatter: (value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-ink-soft",
										children: value
									})
								})
							] })
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				title: "Floors L13–31M",
				hint: "Average of live packages on that floor",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-64 sm:h-72",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: floors,
							margin: {
								top: 8,
								right: 8,
								left: 0,
								bottom: 0
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									stroke: LINE,
									vertical: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "floor",
									tick: {
										fill: MUTED,
										fontSize: 10
									},
									axisLine: false,
									tickLine: false,
									interval: 0
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									domain: [0, 100],
									tick: {
										fill: MUTED,
										fontSize: 11
									},
									axisLine: false,
									tickLine: false,
									width: 32
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PctTip, {}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { formatter: (v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-ink-soft",
									children: v
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "TA",
									fill: ACCENT,
									radius: [
										3,
										3,
										0,
										0
									],
									maxBarSize: 14
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "TB",
									fill: STAMP,
									radius: [
										3,
										3,
										0,
										0
									],
									maxBarSize: 14
								})
							]
						})
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				title: "Packages",
				hint: "Highest first · same cells as the board",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-[28rem]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: packs,
							layout: "vertical",
							margin: {
								top: 4,
								right: 16,
								left: 8,
								bottom: 0
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									stroke: LINE,
									horizontal: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									type: "number",
									domain: [0, 100],
									tick: {
										fill: MUTED,
										fontSize: 11
									},
									axisLine: false,
									tickLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									type: "category",
									dataKey: "name",
									width: 88,
									tick: {
										fill: INK,
										fontSize: 11
									},
									axisLine: false,
									tickLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PctTip, { extra: (d) => String(d.trade ?? "") }) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "pct",
									radius: [
										0,
										6,
										6,
										0
									],
									maxBarSize: 16,
									children: packs.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: p.trade === "CW" ? ACCENT : p.trade === "SAN" ? STAMP : DONE }, p.name))
								})
							]
						})
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted",
				children: [
					"Towers ",
					towers.map((t) => `${t.name} ${t.pct}%`).join(" · "),
					". Podium stays on the last certified claim — not in these bars."
				]
			})
		]
	});
}
function Stat({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-panel px-4 py-3 shadow-docket",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-[11px] uppercase tracking-[0.16em] text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-display text-3xl uppercase tracking-wide tabular-nums",
				children: value
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-[11px] text-muted",
				children: hint
			}) : null
		]
	});
}
function Card({ title, hint, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl bg-panel p-4 shadow-docket sm:p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex flex-wrap items-baseline justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl uppercase tracking-wide",
				children: title
			}), hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] uppercase tracking-[0.12em] text-muted",
				children: hint
			}) : null]
		}), children]
	});
}
function PctTip({ active, payload, extra }) {
	if (!active || !payload?.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border border-line bg-sheet px-3 py-2 text-xs shadow-docket",
		children: [payload.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-semibold",
				children: row.name
			}),
			" ",
			row.value,
			"%"
		] }, String(row.name))), extra && payload[0]?.payload ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-muted",
			children: extra(payload[0].payload)
		}) : null]
	});
}
function CountTip({ active, payload }) {
	if (!active || !payload?.length) return null;
	const row = payload[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-md border border-line bg-sheet px-3 py-2 text-xs shadow-docket",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-semibold",
				children: row.name
			}),
			" ",
			row.value,
			" cells"
		] })
	});
}
//#endregion
export { DashRoute as component };
