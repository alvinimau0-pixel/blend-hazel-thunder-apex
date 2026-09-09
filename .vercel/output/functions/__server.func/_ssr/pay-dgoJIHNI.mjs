import { o as __toESM } from "../_runtime.mjs";
import { n as cn } from "./utils-DyetTdWh.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { A as filterProject, C as Label, D as PAY_KINDS, F as useOpsActions, N as useProject, P as useOps, S as Input, T as Button, _ as DialogContent, a as PageHead, f as EmptyInline, g as Dialog, h as Spinner, i as OpsGate, j as isGmDeskPerson, s as Segmented, u as useAsOf, y as DialogTitle } from "./router-DCeeEZYX.mjs";
import { x as formatRm } from "./domain-B9hSVQhA.mjs";
import { t as SiteGate } from "./site-gate-DjT4Gwiq.mjs";
import { n as WORKER_ROLL } from "./work-scope-DwH38QaA.mjs";
import { t as useDeskHash } from "./use-desk-hash-D9dQRbuV.mjs";
import { n as AryanGaji, t as AipoonGaji } from "./aryan-gaji-GbOMCAxK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pay-dgoJIHNI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function daysInMonth(month) {
	const [y, m] = month.split("-").map(Number);
	return new Date(y, m, 0).getDate();
}
function sortPeople(rows) {
	const rank = new Map(WORKER_ROLL.map((n, i) => [n.toUpperCase(), i]));
	return [...rows].sort((a, b) => {
		return (rank.get(a.name.toUpperCase()) ?? 800 + a.name.localeCompare(b.name)) - (rank.get(b.name.toUpperCase()) ?? 800 + b.name.localeCompare(a.name));
	});
}
function AdvanceMonthGrid({ title, hint, month, onMonth, people, advances, repay, projectId, onSave, onRepay, pending }) {
	const days = daysInMonth(month);
	const rows = (0, import_react.useMemo)(() => sortPeople(people), [people]);
	const map = (0, import_react.useMemo)(() => {
		const m = /* @__PURE__ */ new Map();
		for (const a of advances) if (a.dated.startsWith(month)) m.set(`${a.personId}:${a.dated}`, a);
		return m;
	}, [advances, month]);
	const repayMap = (0, import_react.useMemo)(() => {
		const m = /* @__PURE__ */ new Map();
		for (const r of repay) if (r.month === month) m.set(r.personId, r.amount);
		return m;
	}, [repay, month]);
	const [edit, setEdit] = (0, import_react.useState)(null);
	const [payback, setPayback] = (0, import_react.useState)(null);
	function saveEdit(amount) {
		if (!edit) return;
		onSave({
			projectId,
			personId: edit.person.id,
			dated: edit.dated,
			amount,
			reason: "Advance"
		});
		toast.success(`${edit.person.name} ${edit.dated.slice(8)} · ${amount ? `RM ${amount}` : "cleared"}`);
		setEdit(null);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "overflow-hidden rounded-xl bg-panel shadow-docket",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-[11px] uppercase tracking-[0.16em] text-muted",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl uppercase tracking-wide",
					children: month
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "month",
						value: month,
						onChange: (e) => onMonth(e.target.value),
						className: "h-11 rounded-md border border-line bg-paper px-2 text-base sm:text-sm"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						className: "no-print",
						onClick: () => window.print(),
						children: "Print"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "px-4 py-2 text-[12px] text-ink-soft",
				children: [hint, pending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "ml-2 inline-flex items-center gap-1 font-display text-[11px] uppercase tracking-[0.12em] text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "size-3" }), " Saving"]
				}) : null]
			}),
			rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyInline, {
				title: "Nobody on this list",
				hint: "Add workers or subs under Crew first."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "min-w-max border-collapse text-[11px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "bg-paper-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "sticky left-0 z-10 min-w-28 border-b border-r border-line bg-paper-2 px-2 py-2 text-left font-display text-[11px] uppercase tracking-[0.12em]",
								children: "Name"
							}),
							Array.from({ length: days }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "min-w-9 border-b border-line px-0 py-2 text-center font-mono font-normal tabular-nums text-muted",
								children: i + 1
							}, i)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "min-w-12 border-b border-l border-line px-1 py-2 text-center font-display text-[10px] uppercase text-muted",
								children: "Adv"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "min-w-12 border-b border-line px-1 py-2 text-center font-display text-[10px] uppercase text-muted",
								children: "Repay"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "min-w-12 border-b border-line px-1 py-2 text-center font-display text-[10px] uppercase text-muted",
								children: "Bal"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((w) => {
						let total = 0;
						const cells = Array.from({ length: days }, (_, i) => {
							const dated = `${month}-${String(i + 1).padStart(2, "0")}`;
							const row = map.get(`${w.id}:${dated}`);
							if (row) total += row.amount;
							return {
								dated,
								amount: row?.amount ?? 0,
								day: i + 1
							};
						});
						const repaid = repayMap.get(w.id) ?? 0;
						const bal = total - repaid;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "odd:bg-sheet",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
									className: "sticky left-0 z-10 border-b border-r border-line bg-inherit px-2 py-0 text-left font-display text-[12px] font-semibold uppercase tracking-wide",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block leading-tight",
										children: w.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block font-sans text-[10px] font-normal normal-case tracking-normal text-muted",
										children: w.trade
									})]
								}),
								cells.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "border-b border-line p-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										disabled: pending,
										onClick: () => setEdit({
											person: w,
											dated: c.dated,
											amount: c.amount ? String(c.amount) : ""
										}),
										className: cn("flex h-9 w-9 items-center justify-center font-mono text-[9px] tabular-nums", c.amount > 0 && "bg-cell-risk text-cell-risk-ink"),
										children: c.amount ? c.amount : ""
									})
								}, c.day)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "border-b border-l border-line text-center font-mono tabular-nums text-ink-soft",
									children: total ? formatRm(total) : ""
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "border-b border-line p-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										disabled: pending,
										onClick: () => setPayback({
											person: w,
											amount: repaid ? String(repaid) : ""
										}),
										className: cn("flex h-9 w-full min-w-12 items-center justify-center font-mono text-[10px] tabular-nums", repaid > 0 && "bg-cell-done text-cell-done-ink"),
										children: repaid ? formatRm(repaid) : ""
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: cn("border-b border-line text-center font-mono tabular-nums", bal > 0 ? "text-stamp" : "text-ink-soft"),
									children: total || repaid ? formatRm(bal) : ""
								})
							]
						}, w.id);
					}) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!edit,
				onOpenChange: (o) => !o && setEdit(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: edit ? `${edit.person.name} · ${edit.dated.slice(8)}` : "Advance" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-3 space-y-3",
					onSubmit: (e) => {
						e.preventDefault();
						saveEdit(Number(edit?.amount || 0));
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Amount RM" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						min: 0,
						inputMode: "numeric",
						value: edit?.amount ?? "",
						onChange: (e) => setEdit((cur) => cur ? {
							...cur,
							amount: e.target.value
						} : cur),
						className: "mt-1",
						autoFocus: true
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							className: "flex-1",
							children: "Save"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							className: "flex-1",
							onClick: () => saveEdit(0),
							children: "Clear"
						})]
					})]
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!payback,
				onOpenChange: (o) => !o && setPayback(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: payback ? `${payback.person.name} · repay ${month}` : "Repay" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-3 space-y-3",
					onSubmit: (e) => {
						e.preventDefault();
						if (!payback) return;
						const amount = Number(payback.amount || 0);
						onRepay({
							projectId,
							personId: payback.person.id,
							month,
							amount
						});
						toast.success(`${payback.person.name} repay · ${amount ? `RM ${amount}` : "cleared"}`);
						setPayback(null);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Repay RM this month" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						min: 0,
						inputMode: "numeric",
						value: payback?.amount ?? "",
						onChange: (e) => setPayback((cur) => cur ? {
							...cur,
							amount: e.target.value
						} : cur),
						className: "mt-1",
						autoFocus: true
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							className: "flex-1",
							children: "Save"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							className: "flex-1",
							onClick: () => {
								if (!payback) return;
								onRepay({
									projectId,
									personId: payback.person.id,
									month,
									amount: 0
								});
								setPayback(null);
							},
							children: "Clear"
						})]
					})]
				})] })
			})
		]
	});
}
var KIND_IDS = ["advance", "subcon"];
function PayPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpsGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PayBody, {}) });
}
function PayBody() {
	const { asOf } = useAsOf();
	const { project } = useProject();
	const ops = useOps().data;
	const { addAdvance, upsertRepay } = useOpsActions();
	const pid = project?.id ?? 0;
	const [tab, setTab] = useDeskHash(KIND_IDS, "advance");
	const [month, setMonth] = (0, import_react.useState)(asOf.slice(0, 7));
	const desk = filterProject(ops.people, pid).filter(isGmDeskPerson);
	const workers = desk.filter((p) => p.kind === "worker");
	const subs = desk.filter((p) => p.kind === "sub");
	const advances = filterProject(ops.advances, pid);
	const current = PAY_KINDS.find((k) => k.id === tab) ?? PAY_KINDS[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
				kicker: project?.name ?? "Project",
				title: current.label,
				hint: tab === "advance" ? "GM workers only. Tap a day, type RM. Empty cell is no advance." : "Aipoon, Aryan, Kolik. Same month grid for advances. Gaji cards stay below. Not the client PC."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
				value: tab,
				onChange: setTab,
				options: PAY_KINDS
			}),
			tab === "advance" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdvanceMonthGrid, {
				title: "Worker advance",
				hint: "Tap a day for advance. Tap Repay for money returned this month.",
				month,
				onMonth: setMonth,
				people: workers,
				advances,
				repay: filterProject(ops.repay ?? [], pid),
				projectId: pid,
				pending: addAdvance.isPending || upsertRepay.isPending,
				onSave: (data) => addAdvance.mutate(data),
				onRepay: (data) => upsertRepay.mutate(data)
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdvanceMonthGrid, {
					title: "Sub-contractor advance",
					hint: "Aipoon, Aryan, Kolik. Tap a day for RM.",
					month,
					onMonth: setMonth,
					people: subs,
					advances,
					repay: filterProject(ops.repay ?? [], pid),
					projectId: pid,
					pending: addAdvance.isPending || upsertRepay.isPending,
					onSave: (data) => addAdvance.mutate(data),
					onRepay: (data) => upsertRepay.mutate(data)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteGate, { children: (site) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AipoonGaji, { site }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AryanGaji, { site })]
				}) })]
			})
		]
	});
}
//#endregion
export { PayPage as component };
