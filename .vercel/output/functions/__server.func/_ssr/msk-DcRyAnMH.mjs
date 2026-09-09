import { o as __toESM } from "../_runtime.mjs";
import { n as cn } from "./utils-DyetTdWh.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { d as Printer } from "../_libs/lucide-react.mjs";
import { T as Button, l as Letterhead, u as useAsOf, x as Badge } from "./router-DCeeEZYX.mjs";
import { A as siteCrewGrouped, D as roundPct, E as rankMskJobs, g as buildMskInsights, m as TRADE_WEIGHT, p as TRADE_LABEL } from "./domain-B9hSVQhA.mjs";
import { t as SiteGate } from "./site-gate-DjT4Gwiq.mjs";
import { t as UpdateMskDialog } from "./update-msk-dialog-DEMebGrT.mjs";
import { n as cellTone, t as Legend } from "./legend-ClU1Syvp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/msk-DcRyAnMH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MskPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteGate, { children: (site) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MskBoard, { site }) });
}
function MskBoard({ site }) {
	const { asOf } = useAsOf();
	const msk = buildMskInsights(site, asOf);
	const jobs = (0, import_react.useMemo)(() => rankMskJobs(msk), [msk]);
	const [trade, setTrade] = (0, import_react.useState)("all");
	const [tower, setTower] = (0, import_react.useState)("both");
	const [target, setTarget] = (0, import_react.useState)(null);
	const defaultFloor = jobs[0]?.level.id ?? site.mskLevels[site.mskLevels.length - 1]?.id ?? 0;
	const [floorId, setFloorId] = (0, import_react.useState)(defaultFloor);
	const items = (0, import_react.useMemo)(() => trade === "all" ? site.mskItems : site.mskItems.filter((i) => i.trade === trade), [site.mskItems, trade]);
	const towers = tower === "both" ? ["A", "B"] : [tower];
	const siteCrew = siteCrewGrouped(site.crew).all;
	const floor = site.mskLevels.find((l) => l.id === floorId) ?? site.mskLevels[0];
	function openCell(level, tw, item) {
		const c = msk.cell(level.id, tw, item.id);
		const pending = msk.pendingByCell.get(`${level.id}:${tw}:${item.id}`);
		setTarget({
			level,
			tower: tw,
			item,
			pct: pending?.claimedPct ?? (c && !c.na ? c.pct : 0),
			na: c?.na ?? false
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "no-print flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-semibold uppercase tracking-wide",
					children: "MSK board"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 max-w-xl text-sm text-ink-soft",
					children: "Tap a cell — even 0% or the dash. Type any %. A ring is a sub update waiting GM check."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [[
						"all",
						"CW",
						"SAN",
						"IRR"
					].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: trade === t ? "default" : "outline",
						onClick: () => setTrade(t),
						children: t === "all" ? "All packages" : TRADE_LABEL[t]
					}, t)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => window.print(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, {}), " Print"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "no-print grid gap-2 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockCard, {
						label: "MSK lock",
						value: msk.weightedAvg,
						hint: "Same as Today · from cells"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockCard, {
						label: "Cold water",
						value: msk.tradeAvg.CW,
						hint: `${roundPct(TRADE_WEIGHT.CW * 100)}% of board`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockCard, {
						label: "Sanitary",
						value: msk.tradeAvg.SAN,
						hint: `${roundPct(TRADE_WEIGHT.SAN * 100)}% of board`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockCard, {
						label: "Irrigation",
						value: msk.tradeAvg.IRR,
						hint: `${roundPct(TRADE_WEIGHT.IRR * 100)}% of board`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "no-print flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-3 rounded-[2px] bg-paper-2 outline outline-1 outline-line" }), " N/A · still tappable"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "ml-auto flex gap-1",
						children: [
							"both",
							"A",
							"B"
						].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: tower === t ? "default" : "outline",
							onClick: () => setTower(t),
							children: t === "both" ? "TA + TB" : `Tower ${t}`
						}, t))
					})
				]
			}),
			floor ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "no-print rounded-xl bg-panel p-4 shadow-docket md:hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-[11px] uppercase tracking-[0.16em] text-muted",
						children: "Update one floor"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "-mx-1 mt-2 flex gap-1.5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory",
						children: [...site.mskLevels].reverse().map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setFloorId(l.id),
							className: cn("h-12 min-w-14 shrink-0 snap-start rounded-md border px-3 font-display text-sm uppercase", l.id === floor.id ? "border-ink bg-ink text-paper" : "border-line bg-paper-2"),
							children: l.code
						}, l.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 divide-y divide-line",
						children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "grid grid-cols-[1fr_auto_auto] items-center gap-2 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: item.shortName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] uppercase text-muted",
								children: item.trade
							})] }), towers.map((tw) => {
								const c = msk.cell(floor.id, tw, item.id);
								const na = !c || c.na;
								const pending = msk.pendingByCell.get(`${floor.id}:${tw}:${item.id}`);
								const st = msk.statusOf(floor, tw, item);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => openCell(floor, tw, item),
									className: cn("flex h-14 min-w-[4.5rem] flex-col items-center justify-center rounded-md px-3 font-mono text-sm tabular-nums", na ? "border border-line bg-paper-2 text-muted" : cellTone(st === "na" ? "track" : st), pending && "ring-2 ring-stamp"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[10px] uppercase",
										children: ["T", tw]
									}), na ? "—" : `${c.pct}%`]
								}, tw);
							})]
						}, item.id))
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "print-sheet hidden overflow-hidden rounded-xl bg-panel shadow-docket md:block print:block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden print-only border-b border-ink bg-sheet px-4 py-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Letterhead, { asOf })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "min-w-[920px] w-full border-collapse text-[11px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "bg-ink text-paper",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "sticky left-0 z-10 bg-ink px-2 py-2 text-left font-display uppercase",
									children: "Level"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "sticky left-12 z-10 bg-ink px-2 py-2 text-left font-display uppercase",
									children: "Tw"
								}),
								items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
									className: "w-12 px-0.5 py-2 text-center font-display font-medium leading-tight",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-[8px] text-paper/60",
										children: item.trade
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-[10px]",
										children: item.shortName
									})]
								}, item.id)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-2 py-2 font-display uppercase",
									children: "Lock"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: [...site.mskLevels].reverse().flatMap((level) => towers.map((tw) => {
							const vals = items.map((item) => msk.cell(level.id, tw, item.id)).filter((c) => c && !c.na).map((c) => c.pct);
							const lock = roundPct(vals.length ? vals.reduce((s, n) => s + n, 0) / vals.length : 0);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-line",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "sticky left-0 z-10 bg-panel px-2 py-1 font-display text-xs uppercase",
										children: level.code
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "sticky left-12 z-10 bg-panel px-2 py-1 text-[10px] text-muted",
										children: ["T", tw]
									}),
									items.map((item) => {
										const c = msk.cell(level.id, tw, item.id);
										const na = !c || c.na;
										const pending = msk.pendingByCell.get(`${level.id}:${tw}:${item.id}`);
										const st = msk.statusOf(level, tw, item);
										const tone = na ? "bg-paper-2 text-muted" : cellTone(st === "na" ? "track" : st);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-0",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => openCell(level, tw, item),
												className: cn("relative flex min-h-11 w-full items-center justify-center font-mono text-[11px] tabular-nums", tone, pending && "ring-2 ring-inset ring-stamp"),
												title: pending ? `Board ${c?.pct ?? 0}% · sub ${pending.claimedPct}% waiting GM check` : na ? "N/A on the sheet — tap to put a % on the lock" : void 0,
												children: na ? "—" : c?.pct
											})
										}, item.id);
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-2 text-center font-mono text-xs tabular-nums",
										children: [lock, "%"]
									})
								]
							}, `${level.id}-${tw}`);
						})) })]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "no-print grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl bg-panel p-4 shadow-docket",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-lg uppercase",
								children: "Holes"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "miss",
								children: jobs.filter((j) => j.kind === "hole").length
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted",
							children: "Live skipped floor per package. Tap to update."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-2 divide-y divide-line",
							children: [jobs.filter((j) => j.kind === "hole").slice(0, 8).map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => openCell(h.level, h.tower, h.item),
								className: "flex min-h-11 w-full items-center gap-2 py-1.5 text-left text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display uppercase",
										children: h.level.code
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted",
										children: ["T", h.tower]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "min-w-0 flex-1 truncate",
										children: h.item.shortName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-mono text-xs",
										children: [h.pct, "%"]
									})
								]
							}) }, `${h.level.id}-${h.tower}-${h.item.id}`)), jobs.filter((j) => j.kind === "hole").length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "py-2 text-sm text-muted",
								children: "No skipped floors."
							}) : null]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl bg-panel p-4 shadow-docket",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-lg uppercase",
								children: "What to expect"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "risk",
								children: jobs.filter((n) => n.kind === "next").length
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted",
							children: "Floor below is ready. Tap to start."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2 divide-y divide-line",
							children: jobs.filter((n) => n.kind === "next").slice(0, 8).map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => openCell(n.level, n.tower, n.item),
								className: "flex min-h-11 w-full items-center gap-2 py-1.5 text-left text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display uppercase",
										children: n.level.code
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted",
										children: ["T", n.tower]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "min-w-0 flex-1 truncate",
										children: n.item.shortName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-mono text-xs",
										children: [n.pct, "%"]
									})
								]
							}) }, `${n.level.id}-${n.tower}-${n.item.id}`))
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UpdateMskDialog, {
				open: !!target,
				onOpenChange: (v) => !v && setTarget(null),
				target,
				crew: siteCrew
			})
		]
	});
}
function LockCard({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-panel px-4 py-3 shadow-docket",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-[11px] uppercase tracking-[0.14em] text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-display text-2xl font-semibold tabular-nums",
				children: [value, "%"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] text-muted",
				children: hint
			})
		]
	});
}
//#endregion
export { MskPage as component };
