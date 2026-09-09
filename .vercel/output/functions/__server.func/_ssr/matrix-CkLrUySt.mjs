import { o as __toESM } from "../_runtime.mjs";
import { n as cn } from "./utils-DyetTdWh.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { d as Printer } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as Label, T as Button, _ as DialogContent, g as Dialog, h as Spinner, l as Letterhead, u as useAsOf, v as DialogDescription, w as Textarea, y as DialogTitle } from "./router-DCeeEZYX.mjs";
import { A as siteCrewGrouped, C as mean, D as roundPct, _ as cellStatus, d as SHORT_NAME, h as buildInsights, l as PREDECESSORS } from "./domain-B9hSVQhA.mjs";
import { n as useSiteMutations } from "./use-site-C4IwY3aB.mjs";
import { t as SiteGate } from "./site-gate-DjT4Gwiq.mjs";
import { t as AddPicture } from "./add-picture-CZKih--a.mjs";
import { a as withScopeNote, n as WhoDidThis, r as scopeFromTrade, t as PctPicker } from "./who-did-NTzE6JqS.mjs";
import { n as cellTone, t as Legend } from "./legend-ClU1Syvp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/matrix-CkLrUySt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function UpdateCellDialog({ open, onOpenChange, target, crew, activities, pctOf }) {
	const { asOf } = useAsOf();
	const { update } = useSiteMutations();
	const [pct, setPct] = (0, import_react.useState)(0);
	const [crewId, setCrewId] = (0, import_react.useState)(crew[0]?.id ?? 0);
	const [scope, setScope] = (0, import_react.useState)("SAN");
	const [note, setNote] = (0, import_react.useState)("");
	const [photo, setPhoto] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (target) {
			setPct(target.pct);
			setNote("");
			setPhoto(null);
			const listed = siteCrewGrouped(crew).all;
			const match = listed.find((c) => target.activity.contractor.includes(c.contractor) || target.activity.gmTrade && c.contractor === "GM") ?? listed[0];
			if (match) {
				setCrewId(match.id);
				setScope(scopeFromTrade(match.trade, /irrig/i.test(target.activity.name) ? "IRR" : void 0));
			}
		}
	}, [target, crew]);
	const sub = crew.find((c) => c.id === crewId)?.contractor === "SUB";
	const warnings = (0, import_react.useMemo)(() => {
		if (!target) return [];
		const list = [];
		const jump = pct - target.pct;
		if (pct < target.pct) list.push("Progress went backwards. That will be flagged.");
		if ((jump >= 30 || pct >= 100) && !photo) list.push(sub ? "Big jump with no photo. Sub update waits for GM check — not the client claim." : "Big jump with no photo. It still goes on the board — attach a photo so nobody can lie.");
		if (sub) list.push("Sub update: board will not move until GM checks it. This is not the PC claim to the client.");
		const preds = PREDECESSORS[target.activity.seq] ?? [];
		for (const seq of preds) {
			const p = pctOf(seq);
			if (p < 80 && pct > p + 20) {
				const act = activities.find((a) => a.seq === seq);
				list.push(`Sequence: ${act?.name ?? seq} is only ${p}%. This looks skipped.`);
			}
		}
		return list;
	}, [
		target,
		pct,
		photo,
		activities,
		pctOf,
		sub
	]);
	function submit() {
		if (!target) return;
		if (!crewId) {
			toast.error("Pick who did the work");
			return;
		}
		setBusy(true);
		update.mutate({
			floorId: target.floor.id,
			toiletId: target.toilet.id,
			activityId: target.activity.id,
			pct,
			crewId,
			note: withScopeNote(note, scope),
			photoData: photo || void 0,
			workDate: asOf
		}, {
			onSuccess: () => toast.success(sub ? "Saved. Waiting GM check — not the client claim." : "On the board."),
			onError: (err) => toast.error(err instanceof Error ? err.message : "Update failed"),
			onSettled: () => setBusy(false)
		});
		onOpenChange(false);
	}
	if (!target) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Log progress" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
				target.floor.code,
				" ",
				target.toilet.tower,
				" ",
				target.toilet.code,
				" · ",
				target.activity.name
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg bg-paper-2 px-3 py-2 text-xs text-ink-soft",
						children: [
							"Contractor ",
							target.activity.contractor,
							" · dateline ",
							target.dueOn,
							" · now ",
							target.pct,
							"%"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhoDidThis, {
						crew,
						crewId,
						onCrewId: setCrewId,
						scope,
						onScope: setScope,
						idPrefix: "toilet-who"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PctPicker, {
						value: pct,
						onChange: setPct
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "note",
						children: "What was done"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "note",
						className: "mt-1",
						value: note,
						onChange: (e) => setNote(e.target.value),
						placeholder: "Short site note. No story — just the work."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Photo evidence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddPicture, {
							value: photo,
							onChange: setPhoto,
							needed: (pct - (target?.pct ?? 0) >= 30 || pct >= 100) && !photo
						})
					})] }),
					warnings.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-1 rounded-lg bg-cell-risk/60 px-3 py-2 text-xs text-cell-risk-ink",
						children: warnings.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: w }, w))
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => void submit(),
						disabled: busy,
						children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}), " Saving…"] }) : "Post to board"
					})
				]
			})
		] })
	});
}
function MatrixPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteGate, { children: (site) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Matrix, { site }) });
}
function Matrix({ site }) {
	const { asOf } = useAsOf();
	const ins = buildInsights(site, asOf);
	const [filter, setFilter] = (0, import_react.useState)("gm");
	const [target, setTarget] = (0, import_react.useState)(null);
	const acts = (0, import_react.useMemo)(() => {
		if (filter === "gm") return site.activities.filter((a) => a.gmTrade);
		return site.activities;
	}, [site.activities, filter]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "no-print flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-semibold uppercase tracking-wide",
					children: "Toilet matrix"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 max-w-xl text-sm text-ink-soft",
					children: "Section 1 — CL14–CL19, T4–T7. Gelaran Maju trades only by default. Open All trades if you need to see who is holding fittings."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [[
						"all",
						"open",
						"gm"
					].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: filter === f ? "default" : "outline",
						onClick: () => setFilter(f),
						children: f === "all" ? "All trades" : f === "open" ? "Open only" : "GM only"
					}, f)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => window.print(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, {}), " Print"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { className: "no-print" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "print-sheet overflow-hidden rounded-xl bg-panel shadow-docket",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden print-only border-b border-ink bg-sheet px-4 py-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Letterhead, { asOf })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: cn("border-collapse text-[11px]", filter === "gm" ? "w-full min-w-[640px]" : "min-w-[1100px]"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "bg-ink text-paper",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "sticky left-0 z-10 bg-ink px-2 py-2 text-left font-display text-[11px] uppercase tracking-wider",
									children: "Floor"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "sticky left-12 z-10 bg-ink px-2 py-2 text-left font-display uppercase",
									children: "Toilet"
								}),
								acts.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
									className: "w-11 px-0.5 py-2 text-center font-display font-medium leading-tight",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block text-[9px] text-paper/70",
											children: a.seq
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block text-[10px]",
											children: SHORT_NAME[a.seq] ?? a.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-0.5 block text-[8px] font-normal uppercase text-paper/60",
											children: a.contractor
										})
									]
								}, a.id)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-2 py-2 font-display uppercase",
									children: "Lock"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: site.floors.map((floor) => {
							const dueFor = (activityId) => ins.due.get(`${floor.id}:${activityId}`) ?? asOf;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloorBlock, {
								site,
								floorId: floor.id,
								floorCode: floor.code,
								acts,
								asOf,
								dueFor,
								getPct: ins.getPct,
								filter,
								onCell: (t) => setTarget(t)
							}, floor.id);
						}) })]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UpdateCellDialog, {
				open: !!target,
				onOpenChange: (v) => !v && setTarget(null),
				target,
				crew: site.crew.filter((c) => (c.contractor === "GM" || c.contractor === "SUB") && c.active),
				activities: site.activities,
				pctOf: (seq) => {
					if (!target) return 0;
					const act = site.activities.find((a) => a.seq === seq);
					return act ? ins.getPct(target.floor.id, target.toilet.id, act.id) : 0;
				}
			})
		]
	});
}
function FloorBlock({ site, floorId, floorCode, acts, asOf, dueFor, getPct, filter, onCell }) {
	const floor = site.floors.find((f) => f.id === floorId);
	const toilets = [...site.toilets].sort((a, b) => a.code.localeCompare(b.code));
	const tb = toilets.filter((t) => t.tower === "TB");
	const ta = toilets.filter((t) => t.tower === "TA");
	const ordered = [...tb, ...ta];
	const overall = acts.map((a) => roundPct(mean(ordered.map((t) => getPct(floorId, t.id, a.id)))));
	const lock = roundPct(mean(ordered.flatMap((t) => acts.map((a) => getPct(floorId, t.id, a.id)))));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
			className: "bg-paper-2 text-[10px] uppercase tracking-wider text-muted",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "sticky left-0 bg-paper-2 px-2 py-1 font-display",
				children: floorCode
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
				className: "sticky left-12 bg-paper-2 px-2 py-1",
				colSpan: acts.length + 2,
				children: ["Dateline", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-2 font-mono normal-case tracking-normal",
					children: acts.map((a) => dueFor(a.id).slice(5)).join(" · ")
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "sticky left-0 bg-panel px-2 py-1 font-display text-xs uppercase",
				children: floorCode
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "sticky left-12 bg-panel px-2 py-1 font-semibold",
				children: "OVERALL"
			}),
			acts.map((a, i) => {
				const status = cellStatus(overall[i] ?? 0, dueFor(a.id), asOf);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
					className: cn("px-1 py-1 text-center font-mono tabular-nums", cellTone(status)),
					children: [overall[i], "%"]
				}, a.id);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
				className: "px-2 py-1 text-center font-display text-sm tabular-nums",
				children: [lock, "%"]
			})
		] }),
		ordered.map((toilet) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
			className: "border-t border-line/70",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "sticky left-0 bg-panel px-2 py-1 text-[10px] uppercase text-muted",
					children: toilet.tower
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "sticky left-12 bg-panel px-2 py-1 font-medium",
					children: toilet.code
				}),
				acts.map((activity) => {
					const pct = getPct(floorId, toilet.id, activity.id);
					const dueOn = dueFor(activity.id);
					const status = cellStatus(pct, dueOn, asOf);
					if (filter === "open" && status === "done") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-1 py-1 text-center font-mono text-line-strong",
						children: "—"
					}, activity.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "p-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => onCell({
								floor,
								toilet,
								activity,
								pct,
								dueOn
							}),
							className: cn("flex h-9 w-full items-center justify-center font-mono text-[11px] tabular-nums", cellTone(status)),
							children: [pct, "%"]
						})
					}, activity.id);
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
					className: "px-2 py-1 text-center font-mono tabular-nums",
					children: [roundPct(mean(acts.map((a) => getPct(floorId, toilet.id, a.id)))), "%"]
				})
			]
		}, toilet.id))
	] });
}
//#endregion
export { MatrixPage as component };
