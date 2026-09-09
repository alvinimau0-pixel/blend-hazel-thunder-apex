import { a as formatStamp, n as cn } from "./utils-DyetTdWh.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as COMPANY } from "./company-BVHhciP6.mjs";
import { N as useProject, P as useOps, k as deskStats, l as Letterhead, u as useAsOf } from "./router-DCeeEZYX.mjs";
import { g as buildMskInsights, h as buildInsights, n as CLAIM, p as TRADE_LABEL, v as claimPct, x as formatRm } from "./domain-B9hSVQhA.mjs";
import { t as SiteGate } from "./site-gate-DjT4Gwiq.mjs";
import { t as SignOff } from "./sign-off-BvBdTETZ.mjs";
import { n as bossSharePayload, t as ShareBoss } from "./share-boss-Cag6uZQh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hod-9GPQoJ6_.js
var import_jsx_runtime = require_jsx_runtime();
function HodRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-dvh bg-paper text-ink",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-3xl px-4 py-6 sm:py-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteGate, { children: (site) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HodSite, { site }) })
		})
	});
}
function HodSite({ site }) {
	const { asOf } = useAsOf();
	const { project } = useProject();
	const ops = useOps();
	const ins = buildInsights(site, asOf);
	const msk = buildMskInsights(site, asOf);
	const stats = ops.data && project ? deskStats(ops.data, project.id) : null;
	const holes = msk.flags.filter((f) => f.kind === "hole").length;
	const waiting = ins.flags.filter((f) => f.kind === "waiting").length;
	const lies = [...ins.flags, ...msk.flags].filter((f) => f.kind === "lie").length;
	const unverified = ins.pendingByCell.size + msk.pendingByCell.size;
	const problems = [...msk.flags, ...ins.flags].slice(0, 8);
	const claimLock = claimPct(CLAIM.workDone, CLAIM.contract);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "print-sheet overflow-hidden rounded-xl bg-sheet shadow-docket",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-b border-ink px-5 py-5 sm:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Letterhead, { asOf })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-5 py-6 sm:px-8 sm:py-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-[11px] uppercase tracking-[0.2em] text-muted",
						children: "Internal website · Share this page"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-display text-2xl font-semibold uppercase tracking-wide sm:text-3xl",
						children: "Attn Khairul"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-ink-soft",
						children: [
							"Engineer / Manager · ",
							COMPANY.project,
							" MSK · ",
							formatStamp(asOf)
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "no-print mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareBoss, { compose: (boss) => bossSharePayload({
							asOf,
							boss,
							ins,
							msk,
							stats
						}) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-6 font-display text-6xl font-semibold uppercase tracking-wide sm:text-7xl",
						children: [msk.weightedAvg, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-3xl text-muted",
							children: "%"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-lg text-sm text-ink-soft",
						children: "Tower lock L13–31M from the live MSK board. Same number as Today. Podium is on PC36, not in this %."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 grid grid-cols-3 gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: TRADE_LABEL.CW,
								value: `${msk.tradeAvg.CW}%`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: TRADE_LABEL.SAN,
								value: `${msk.tradeAvg.SAN}%`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: TRADE_LABEL.IRR,
								value: `${msk.tradeAvg.IRR}%`
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
							label: "Tower A",
							value: msk.towerAvg.A
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
							label: "Tower B",
							value: msk.towerAvg.B
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, {
								label: "Skipped floors",
								value: String(holes),
								tone: "miss"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, {
								label: "Waiting on others",
								value: String(waiting),
								tone: "risk"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, {
								label: "Sub check",
								value: String(unverified),
								tone: "ink"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, {
								label: "Truth flags",
								value: String(lies),
								tone: "stamp"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-8 border-t border-line pt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl uppercase tracking-wide",
							children: "Need your eye"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 divide-y divide-line",
							children: problems.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: f.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 text-[12px] text-muted",
									children: f.detail
								})]
							}, f.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-8 border-t border-line pt-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "font-display text-xl uppercase tracking-wide",
									children: [
										"PC",
										CLAIM.no,
										" to client"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-mono text-sm tabular-nums",
									children: [claimLock, "%"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs text-muted",
								children: [
									"Evaluation claim · certified ",
									formatStamp(CLAIM.date),
									" · not a daily sub update"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 font-display text-3xl tabular-nums",
								children: ["RM ", formatRm(CLAIM.thisClaim)]
							}),
							stats?.claimDraft ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm text-ink-soft",
								children: [
									"Next: ",
									stats.claimDraft,
									" draft · Jenny"
								]
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 border-t border-ink pt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignOff, {})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "border-t border-ink bg-paper-2 px-5 py-4 text-[11px] text-muted sm:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display uppercase tracking-[0.14em] text-ink-soft",
						children: [
							COMPANY.legal,
							" (",
							COMPANY.registration,
							")"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1",
						children: COMPANY.address
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Tel ",
						COMPANY.phone,
						" · Internal — not for client circulation"
					] })
				]
			})
		]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-paper-2 px-3 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-[11px] uppercase tracking-[0.14em] text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-display text-2xl font-semibold tabular-nums",
			children: value
		})]
	});
}
function Bar({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-baseline justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-sm uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "font-mono text-sm tabular-nums",
			children: [value, "%"]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-1 h-3 overflow-hidden rounded-md bg-paper-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("h-full", value >= 70 ? "bg-cell-done" : value >= 40 ? "bg-cell-risk" : "bg-cell-miss"),
			style: { width: `${value}%` }
		})
	})] });
}
function Flag({ label, value, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-paper-2 px-3 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-[11px] uppercase tracking-[0.14em] text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: cn("mt-1 font-display text-3xl font-semibold tabular-nums", tone === "miss" && "text-cell-miss-ink", tone === "risk" && "text-cell-risk-ink", tone === "stamp" && "text-stamp"),
			children: value
		})]
	});
}
//#endregion
export { HodRoute as component };
