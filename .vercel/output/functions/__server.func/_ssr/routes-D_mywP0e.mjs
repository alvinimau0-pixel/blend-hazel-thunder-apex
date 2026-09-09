import { o as __toESM } from "../_runtime.mjs";
import { a as formatStamp, n as cn } from "./utils-DyetTdWh.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as REPORT_DATE, s as pingForKind } from "./company-BVHhciP6.mjs";
import { M as ArrowRight } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { F as useOpsActions, N as useProject, P as useOps, T as Button, f as EmptyInline, h as Spinner, k as deskStats, u as useAsOf, x as Badge } from "./router-DCeeEZYX.mjs";
import { A as siteCrewGrouped, E as rankMskJobs, g as buildMskInsights, h as buildInsights, n as CLAIM, p as TRADE_LABEL, v as claimPct, x as formatRm } from "./domain-B9hSVQhA.mjs";
import { t as SiteGate } from "./site-gate-DjT4Gwiq.mjs";
import { t as TodayBoard } from "./today-board-BV-865Ol.mjs";
import { n as bossSharePayload, t as ShareBoss } from "./share-boss-Cag6uZQh.mjs";
import { t as UpdateMskDialog } from "./update-msk-dialog-DEMebGrT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D_mywP0e.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LockStrip({ msk, compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl bg-panel p-4 shadow-docket sm:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-[11px] uppercase tracking-[0.2em] text-muted",
				children: "Tower lock · L13–31M"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-1 flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: cn("font-display font-semibold uppercase tracking-wide tabular-nums", compact ? "text-4xl" : "text-5xl"),
					children: [msk.weightedAvg, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xl text-muted",
						children: "%"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-xs text-xs text-ink-soft",
					children: "Same number on Today, Board, and Khairul. From the MSK cells only — podium sits on the last client claim (PC36)."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid grid-cols-3 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trade, {
						label: TRADE_LABEL.CW,
						value: msk.tradeAvg.CW
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trade, {
						label: TRADE_LABEL.SAN,
						value: msk.tradeAvg.SAN
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trade, {
						label: TRADE_LABEL.IRR,
						value: msk.tradeAvg.IRR
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
					label: "Tower A",
					value: msk.towerAvg.A
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
					label: "Tower B",
					value: msk.towerAvg.B
				})]
			})
		]
	});
}
function Trade({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-paper-2 px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-[10px] uppercase tracking-[0.12em] text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "font-display text-xl font-semibold tabular-nums",
			children: [value, "%"]
		})]
	});
}
function Bar({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-baseline justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-xs uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "font-mono text-xs tabular-nums",
			children: [value, "%"]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-1 h-2 overflow-hidden rounded-md bg-paper-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("bar-fill h-full", value >= 70 ? "bg-cell-done" : value >= 40 ? "bg-cell-risk" : "bg-cell-miss"),
			style: { width: `${Math.max(0, Math.min(100, value))}%` }
		})
	})] });
}
function NextWork({ site, limit = 6, title = "Do next" }) {
	const { asOf } = useAsOf();
	const msk = buildMskInsights(site, asOf);
	const jobs = (0, import_react.useMemo)(() => rankMskJobs(msk), [msk]);
	const [target, setTarget] = (0, import_react.useState)(null);
	const shown = jobs.slice(0, limit);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl bg-panel p-4 shadow-docket sm:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl uppercase tracking-wide",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: shown.some((j) => j.pct === 0) ? "miss" : "track",
					children: shown.length
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-[12px] text-muted",
				children: "Only the live skipped floor per package — not every old 0%. Tap, type the %, save."
			}),
			shown.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyInline, {
				title: "On track",
				hint: "No skipped floors. Next starts sit on the board."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 divide-y divide-line",
				children: shown.map((j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setTarget({
						level: j.level,
						tower: j.tower,
						item: j.item,
						pct: j.pct
					}),
					className: "flex min-h-12 w-full items-center gap-2 py-2 text-left transition-[background-color] duration-150 hover:bg-paper-2/70",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-sm uppercase",
							children: j.level.code
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[12px] text-muted",
							children: ["T", j.tower]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "min-w-0 flex-1 truncate text-sm",
							children: j.item.shortName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: cn("rounded-sm px-2 py-0.5 font-mono text-xs tabular-nums", j.pct === 0 ? "bg-cell-miss text-cell-miss-ink" : "bg-cell-risk text-cell-risk-ink"),
							children: [j.pct, "%"]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "-mt-1 pb-2 text-[11px] text-muted",
					children: j.why
				})] }, `${j.level.id}-${j.tower}-${j.item.id}`))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UpdateMskDialog, {
				open: !!target,
				onOpenChange: (v) => !v && setTarget(null),
				target,
				crew: siteCrewGrouped(site.crew).all
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteGate, { children: (site) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TodayHome, { site }) });
}
function TodayHome({ site }) {
	const { asOf } = useAsOf();
	const { project } = useProject();
	const ops = useOps();
	const actions = useOpsActions();
	const ins = buildInsights(site, asOf);
	const msk = buildMskInsights(site, asOf);
	const stats = ops.data && project ? deskStats(ops.data, project.id) : null;
	const share = (boss) => bossSharePayload({
		asOf,
		boss,
		ins,
		msk,
		stats
	});
	const problems = [...msk.flags, ...ins.flags].slice(0, 4);
	const pending = msk.pendingByCell.size + ins.pendingByCell.size;
	const claimLock = claimPct(CLAIM.workDone, CLAIM.contract);
	function publish() {
		actions.publishDay.mutate(asOf, {
			onSuccess: () => toast.success(`Published ${formatStamp(asOf)} · lock ${msk.weightedAvg}%`),
			onError: () => toast.error("Could not publish")
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-[11px] uppercase tracking-[0.2em] text-muted",
					children: formatStamp(asOf)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-3xl font-semibold uppercase tracking-wide",
					children: "Home"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex w-full flex-wrap items-center gap-2 sm:w-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "flex-1 sm:flex-none",
						size: "sm",
						onClick: publish,
						disabled: actions.publishDay.isPending,
						children: actions.publishDay.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}), " Publishing…"] }) : "Publish today"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareBoss, { compose: share })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockStrip, { msk }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-ink-soft",
				children: [
					"Daily, weekly and August close issue for ",
					formatStamp(asOf),
					". Board dated ",
					formatStamp(REPORT_DATE),
					". Sub claim is under More."
				]
			}),
			pending > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "rounded-lg bg-stamp/10 px-3 py-2 text-sm text-stamp",
				children: [
					pending,
					" sub update",
					pending === 1 ? "" : "s",
					" waiting GM check.",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/sub-claim",
						className: "uppercase tracking-[0.12em] underline",
						children: "Open sub claim"
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NextWork, { site }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TodayBoard, {
				site,
				who: "gm"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl bg-panel p-4 shadow-docket sm:p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl uppercase tracking-wide",
						children: "Need your eye"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/issues",
						className: "inline-flex items-center gap-1 text-xs uppercase tracking-[0.14em] text-accent",
						children: ["All problems ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3" })]
					})]
				}), problems.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyInline, {
					title: "All clear",
					hint: "No live flags for this date."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 divide-y divide-line",
					children: problems.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: f.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[12px] text-muted",
								children: f.detail
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-0.5 font-display text-[11px] uppercase tracking-[0.12em] text-accent",
								children: ["Ping ", pingForKind(f.kind).names]
							})
						]
					}, f.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl bg-panel p-4 shadow-docket sm:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-[11px] uppercase tracking-[0.16em] text-muted",
						children: "Client evaluation claim — PC to client"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 font-display text-lg uppercase",
						children: [
							"PC",
							CLAIM.no,
							" · ",
							claimLock,
							"%"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-ink-soft",
						children: [
							"RM ",
							formatRm(CLAIM.thisClaim),
							" certified ",
							formatStamp(CLAIM.date),
							". Includes podium. Not a worker or sub update. Tower lock above is live from the board."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/eval-claim",
								children: "Evaluation claim"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/hod",
								children: "Share page"
							})
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { Home as component };
