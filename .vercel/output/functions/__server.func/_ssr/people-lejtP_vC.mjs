import { o as __toESM } from "../_runtime.mjs";
import { n as cn } from "./utils-DyetTdWh.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { A as filterProject, C as Label, F as useOpsActions, N as useProject, P as useOps, S as Input, T as Button, _ as DialogContent, a as PageHead, b as DialogTrigger, c as StatusChip, g as Dialog, h as Spinner, i as OpsGate, j as isGmDeskPerson, n as EmptyDesk, o as RowCard, r as FormGrid, s as Segmented, u as useAsOf, y as DialogTitle } from "./router-DCeeEZYX.mjs";
import { n as WORKER_ROLL } from "./work-scope-DwH38QaA.mjs";
import { t as useDeskHash } from "./use-desk-hash-D9dQRbuV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/people-lejtP_vC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MARKS = [
	"",
	"P",
	"X",
	"OT"
];
function nextMark(cur) {
	return MARKS[(MARKS.indexOf(cur) + 1) % MARKS.length] ?? "";
}
function daysInMonth(month) {
	const [y, m] = month.split("-").map(Number);
	return new Date(y, m, 0).getDate();
}
function sortWorkers(rows) {
	const rank = new Map(WORKER_ROLL.map((n, i) => [n.toUpperCase(), i]));
	return [...rows].sort((a, b) => {
		return (rank.get(a.name.toUpperCase()) ?? 900 + a.name.localeCompare(b.name)) - (rank.get(b.name.toUpperCase()) ?? 900 + b.name.localeCompare(a.name));
	});
}
function WorkerMonthGrid({ month, onMonth, workers, attendance, projectId, onMark, pending }) {
	const days = daysInMonth(month);
	const rows = (0, import_react.useMemo)(() => sortWorkers(workers), [workers]);
	const map = (0, import_react.useMemo)(() => {
		const m = /* @__PURE__ */ new Map();
		for (const a of attendance) if (a.dated.startsWith(month)) m.set(`${a.personId}:${a.dated}`, a.mark);
		return m;
	}, [attendance, month]);
	const presentByDay = (0, import_react.useMemo)(() => {
		const counts = Array.from({ length: days }, () => 0);
		for (const a of attendance) {
			if (!a.dated.startsWith(month) || a.mark !== "P" && a.mark !== "OT") continue;
			const d = Number(a.dated.slice(8, 10));
			if (d >= 1 && d <= days) counts[d - 1] += 1;
		}
		return counts;
	}, [
		attendance,
		month,
		days
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "overflow-hidden rounded-xl bg-panel shadow-docket",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-[11px] uppercase tracking-[0.16em] text-muted",
					children: "GM workers"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "font-display text-xl uppercase tracking-wide",
					children: ["Attendance · ", month]
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
				children: ["Tap a cell: blank → P present → X off → OT. No rates on this sheet.", pending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "ml-2 inline-flex items-center gap-1 font-display text-[11px] uppercase tracking-[0.12em] text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "size-3" }), " Saving"]
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
								className: "min-w-10 border-b border-l border-line px-1 py-2 text-center font-display text-[10px] uppercase text-muted",
								children: "P"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [rows.map((w) => {
						let present = 0;
						const cells = Array.from({ length: days }, (_, i) => {
							const dated = `${month}-${String(i + 1).padStart(2, "0")}`;
							const mark = map.get(`${w.id}:${dated}`) ?? "";
							if (mark === "P" || mark === "OT") present += 1;
							return {
								dated,
								mark,
								day: i + 1
							};
						});
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
										onClick: () => {
											const next = nextMark(c.mark);
											onMark({
												projectId,
												personId: w.id,
												dated: c.dated,
												mark: next
											});
											if (next) toast.success(`${w.name} ${c.day} · ${next}`);
										},
										className: cn("flex h-9 w-9 items-center justify-center font-display text-[11px] uppercase", c.mark === "P" && "bg-cell-done text-cell-done-ink", c.mark === "X" && "bg-cell-miss text-cell-miss-ink", c.mark === "OT" && "bg-cell-risk text-cell-risk-ink"),
										children: c.mark || ""
									})
								}, c.day)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "border-b border-l border-line text-center font-mono tabular-nums text-ink-soft",
									children: present
								})
							]
						}, w.id);
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "sticky left-0 z-10 border-t border-r border-line bg-paper-2 px-2 py-2 text-left font-display text-[11px] uppercase text-muted",
							children: "On site"
						}),
						presentByDay.map((n, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "border-t border-line py-1 text-center font-mono text-[10px] tabular-nums text-muted",
							children: n || ""
						}, i)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "border-t border-l border-line" })
					] })] })]
				})
			})
		]
	});
}
var KINDS = ["worker", "sub"];
function PeoplePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpsGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PeopleBody, {}) });
}
function PeopleBody() {
	const { asOf } = useAsOf();
	const { project } = useProject();
	const ops = useOps().data;
	const { addPerson, setAttend } = useOpsActions();
	const pid = project?.id ?? 0;
	const [kind, setKind] = useDeskHash(KINDS, "worker");
	const [open, setOpen] = (0, import_react.useState)(false);
	const [month, setMonth] = (0, import_react.useState)(asOf.slice(0, 7));
	const desk = filterProject(ops.people, pid).filter(isGmDeskPerson);
	const rows = desk.filter((p) => p.kind === kind);
	const workers = desk.filter((p) => p.kind === "worker");
	const subs = desk.filter((p) => p.kind === "sub");
	function onSubmit(e) {
		e.preventDefault();
		if (!project) return;
		const fd = new FormData(e.currentTarget);
		addPerson.mutate({
			projectId: project.id,
			kind,
			name: String(fd.get("name")),
			trade: String(fd.get("trade")),
			contractor: kind === "sub" ? "SUB" : "GM",
			dailyRate: 0
		}, { onSuccess: () => {
			toast.success(kind === "worker" ? "Worker added" : "Sub added");
			setOpen(false);
		} });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
				kicker: project?.name ?? "Project",
				title: "GM crew",
				hint: "Month grid for GM workers. Tap a day. Subs under GM stay on their own list. No worker rates here.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
					open,
					onOpenChange: setOpen,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							children: ["Add ", kind === "worker" ? "worker" : "sub"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, { children: ["Add ", kind] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormGrid, {
						onSubmit,
						busy: addPerson.isPending,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							name: "name",
							required: true,
							className: "mt-1"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Trade" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							name: "trade",
							required: true,
							className: "mt-1"
						})] })]
					})] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
				value: kind,
				onChange: setKind,
				options: [{
					id: "worker",
					label: `Workers · ${workers.length}`
				}, {
					id: "sub",
					label: `Subs under GM · ${subs.length}`
				}]
			}),
			kind === "worker" ? workers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyDesk, {
				title: "No GM workers",
				text: "Add the crew for this project, then tap days on the month grid."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkerMonthGrid, {
				month,
				onMonth: setMonth,
				workers,
				attendance: filterProject(ops.attendance ?? [], pid),
				projectId: pid,
				pending: setAttend.isPending,
				onMark: (data) => setAttend.mutate(data)
			}) : subs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyDesk, {
				title: "No subs under GM",
				text: "Add Aipoon, Aryan or Kolik. They stay on this list, not the month grid."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: rows.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RowCard, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-baseline justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg uppercase tracking-wide",
						children: p.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, { status: p.active ? "active" : "held" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-ink-soft",
					children: p.trade
				})] }, p.id))
			})
		]
	});
}
//#endregion
export { PeoplePage as component };
