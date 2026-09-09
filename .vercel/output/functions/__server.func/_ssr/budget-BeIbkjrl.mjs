import { o as __toESM } from "../_runtime.mjs";
import { n as cn } from "./utils-DyetTdWh.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as Trash2, c as RotateCcw, d as Printer, f as Plus } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as Label, N as useProject, S as Input, T as Button, a as PageHead, l as Letterhead, u as useAsOf } from "./router-DCeeEZYX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/budget-BeIbkjrl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KEY = "gm-budget-v1";
function monthOf(iso) {
	return iso.slice(0, 7);
}
function monthLabel(ym) {
	const [y, m] = ym.split("-").map(Number);
	if (!y || !m) return ym;
	return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString("en-GB", {
		month: "long",
		year: "numeric",
		timeZone: "UTC"
	});
}
function line(kind, name) {
	return {
		id: `${kind}-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Math.random().toString(36).slice(2, 6)}`,
		kind,
		name,
		planned: 0,
		actual: 0,
		note: ""
	};
}
function blankSheet(month) {
	return {
		title: "Monthly budget",
		month,
		lines: [
			line("in", "Salary / wages"),
			line("in", "Claim received"),
			line("in", "Other income"),
			line("out", "Housing / rent"),
			line("out", "Food"),
			line("out", "Transport"),
			line("out", "Bills"),
			line("out", "Materials"),
			line("out", "Sub labour"),
			line("out", "Tools / repair"),
			line("out", "Family"),
			line("out", "Savings"),
			line("out", "Other")
		]
	};
}
function loadBudget(month) {
	if (typeof window === "undefined") return blankSheet(month);
	try {
		const raw = window.localStorage.getItem(`${KEY}:${month}`);
		if (!raw) return blankSheet(month);
		const parsed = JSON.parse(raw);
		if (!parsed || !Array.isArray(parsed.lines)) return blankSheet(month);
		return {
			title: parsed.title || "Monthly budget",
			month,
			lines: parsed.lines.map((l, i) => ({
				id: String(l.id || `${l.kind}-${i}`),
				kind: l.kind === "in" ? "in" : "out",
				name: String(l.name || ""),
				planned: Number(l.planned) || 0,
				actual: Number(l.actual) || 0,
				note: String(l.note || "")
			}))
		};
	} catch {
		return blankSheet(month);
	}
}
function saveBudget(sheet) {
	if (typeof window === "undefined") return;
	const payload = JSON.stringify(sheet);
	window.localStorage.setItem(`${KEY}:${sheet.month}`, payload);
	window.localStorage.setItem(KEY, payload);
}
function totals(lines) {
	const sum = (kind, field) => lines.filter((l) => l.kind === kind).reduce((n, l) => n + (Number(l[field]) || 0), 0);
	const inPlan = sum("in", "planned");
	const inAct = sum("in", "actual");
	const outPlan = sum("out", "planned");
	const outAct = sum("out", "actual");
	return {
		inPlan,
		inAct,
		outPlan,
		outAct,
		leftPlan: inPlan - outPlan,
		leftAct: inAct - outAct,
		spentOfPlan: outPlan > 0 ? Math.round(outAct / outPlan * 100) : 0
	};
}
function money(n) {
	const v = Number.isFinite(n) ? n : 0;
	const abs = Math.abs(Math.round(v)).toLocaleString("en-MY");
	return v < 0 ? `−${abs}` : abs;
}
function BudgetPage() {
	const { asOf } = useAsOf();
	const { project } = useProject();
	const startMonth = monthOf(asOf);
	const [month, setMonth] = (0, import_react.useState)(startMonth);
	const [sheet, setSheet] = (0, import_react.useState)(() => loadBudget(startMonth));
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setSheet(loadBudget(month));
		setReady(true);
	}, [month]);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		saveBudget(sheet);
	}, [sheet, ready]);
	const fig = (0, import_react.useMemo)(() => totals(sheet.lines), [sheet.lines]);
	const income = sheet.lines.filter((l) => l.kind === "in");
	const spend = sheet.lines.filter((l) => l.kind === "out");
	function patch(next) {
		setSheet((s) => ({
			...s,
			...next
		}));
	}
	function patchLine(id, next) {
		setSheet((s) => ({
			...s,
			lines: s.lines.map((l) => l.id === id ? {
				...l,
				...next
			} : l)
		}));
	}
	function addLine(kind) {
		setSheet((s) => ({
			...s,
			lines: [...s.lines, {
				id: `${kind}-${Date.now()}`,
				kind,
				name: kind === "in" ? "New income" : "New expense",
				planned: 0,
				actual: 0,
				note: ""
			}]
		}));
	}
	function removeLine(id) {
		setSheet((s) => ({
			...s,
			lines: s.lines.filter((l) => l.id !== id)
		}));
	}
	function reset() {
		setSheet(blankSheet(month));
		toast.success("Sheet reset. Type over the names and numbers.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "no-print",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
					kicker: project?.name ?? "Gelaran Maju",
					title: "Budget",
					hint: "Type in the white boxes. Planned is what you meant to spend. Actual is what really moved. Totals add themselves.",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "outline",
							onClick: () => window.print(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, {}), " Print"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "outline",
							onClick: reset,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {}), " Reset sheet"]
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "no-print rounded-xl bg-panel p-4 shadow-docket sm:p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg uppercase tracking-wide",
					children: "How to use"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
					className: "mt-2 list-decimal space-y-1 pl-5 text-sm text-ink-soft",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Pick the month. The sheet remembers that month on this phone or computer." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Click a category name to rename it. Add a line if you need a new one." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Put the planned RM first. When money moves, type the actual RM." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Green leftover means you are under plan. Red means you spent more than you took in." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Print when you need a paper copy for Jenny, Khairul, or home." })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "print-sheet space-y-4 rounded-xl bg-panel p-4 shadow-docket sm:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-3 hidden print-only",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Letterhead, { asOf: `${month}-01` })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-end justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "budget-title",
								children: "Sheet title"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "budget-title",
								className: "mt-1 h-11 max-w-md font-display text-lg uppercase",
								value: sheet.title,
								onChange: (e) => patch({ title: e.target.value })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "budget-month",
							children: "Month"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "budget-month",
							type: "month",
							value: month,
							onChange: (e) => {
								const next = e.target.value || month;
								setMonth(next);
							},
							className: "mt-1 h-11 rounded-md border border-line bg-panel px-3 text-sm"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Money in",
								value: fig.inAct,
								hint: `Plan ${money(fig.inPlan)}`,
								tone: "track"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Money out",
								value: fig.outAct,
								hint: `Plan ${money(fig.outPlan)} · ${fig.spentOfPlan}% of plan`,
								tone: "risk"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Left this month",
								value: fig.leftAct,
								hint: `Plan leftover ${money(fig.leftPlan)}`,
								tone: fig.leftAct >= 0 ? "done" : "miss"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTable, {
						title: "Money in",
						hint: "Salary, claims, anything that arrives.",
						rows: income,
						onChange: patchLine,
						onRemove: removeLine,
						onAdd: () => addLine("in")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTable, {
						title: "Money out",
						hint: "Rename any line. Delete ones you do not use.",
						rows: spend,
						onChange: patchLine,
						onRemove: removeLine,
						onAdd: () => addLine("out")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto rounded-lg border border-line",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
							className: "w-full border-collapse text-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TotalRow, {
									label: "Total in",
									planned: fig.inPlan,
									actual: fig.inAct
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TotalRow, {
									label: "Total out",
									planned: fig.outPlan,
									actual: fig.outAct
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TotalRow, {
									label: "Left",
									planned: fig.leftPlan,
									actual: fig.leftAct,
									strong: true
								})
							] })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[12px] text-muted",
						children: [monthLabel(month), ". Numbers are RM. This sheet is for tracking — it is not the client PC or sub gaji."]
					})
				]
			})
		]
	});
}
function Stat({ label, value, hint, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: cn("rounded-lg p-3", tone === "done" ? "bg-cell-done text-cell-done-ink" : tone === "miss" ? "bg-cell-miss text-cell-miss-ink" : tone === "risk" ? "bg-cell-risk text-cell-risk-ink" : "bg-paper-2 text-ink"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-[11px] uppercase tracking-[0.16em]",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-display text-3xl font-semibold tabular-nums",
				children: money(value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-[12px] opacity-80",
				children: hint
			})
		]
	});
}
function SheetTable({ title, hint, rows, onChange, onRemove, onAdd }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-2 flex flex-wrap items-end justify-between gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-lg uppercase tracking-wide",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[12px] text-muted",
			children: hint
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			type: "button",
			size: "sm",
			variant: "outline",
			className: "no-print",
			onClick: onAdd,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), " Add line"]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-x-auto rounded-lg border border-line",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full min-w-[640px] border-collapse text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "bg-ink text-paper",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-2 py-2 text-left font-display text-[11px] uppercase",
						children: "Category"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "w-28 px-2 py-2 text-right font-display text-[11px] uppercase",
						children: "Planned"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "w-28 px-2 py-2 text-right font-display text-[11px] uppercase",
						children: "Actual"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "w-28 px-2 py-2 text-right font-display text-[11px] uppercase",
						children: "Difference"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-2 py-2 text-left font-display text-[11px] uppercase",
						children: "Note"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "no-print w-12 px-1 py-2" })
				]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [rows.map((row) => {
				const diff = row.planned - row.actual;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t border-line",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-1 py-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: row.name,
								onChange: (e) => onChange(row.id, { name: e.target.value }),
								className: "h-10 w-full rounded-md bg-transparent px-2 outline-none ring-ring focus:bg-sheet focus:ring-2"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-1 py-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyInput, {
								value: row.planned,
								onChange: (n) => onChange(row.id, { planned: n })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-1 py-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyInput, {
								value: row.actual,
								onChange: (n) => onChange(row.id, { actual: n })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: cn("px-3 py-1 text-right font-mono text-xs tabular-nums", diff < 0 ? "text-cell-miss-ink" : "text-ink-soft"),
							children: money(diff)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-1 py-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: row.note,
								onChange: (e) => onChange(row.id, { note: e.target.value }),
								placeholder: "Optional",
								className: "h-10 w-full rounded-md bg-transparent px-2 outline-none ring-ring placeholder:text-muted focus:bg-sheet focus:ring-2"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "no-print px-1 py-1 text-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => onRemove(row.id),
								className: "inline-flex size-10 items-center justify-center rounded-md text-muted hover:bg-paper-2 hover:text-stamp",
								"aria-label": `Remove ${row.name}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
							})
						})
					]
				}, row.id);
			}), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				colSpan: 6,
				className: "px-3 py-4 text-sm text-muted",
				children: "No lines. Tap Add line."
			}) }) : null] })]
		})
	})] });
}
function MoneyInput({ value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type: "number",
		inputMode: "decimal",
		min: 0,
		step: 1,
		value: Number.isFinite(value) ? value : 0,
		onChange: (e) => {
			const n = Number(e.target.value);
			onChange(Number.isFinite(n) ? Math.max(0, n) : 0);
		},
		className: "h-10 w-full rounded-md bg-transparent px-2 text-right font-mono text-sm tabular-nums outline-none ring-ring focus:bg-sheet focus:ring-2"
	});
}
function TotalRow({ label, planned, actual, strong }) {
	const diff = planned - actual;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
		className: cn("border-t border-line", strong && "bg-paper-2"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-3 py-2 font-display text-sm uppercase",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-3 py-2 text-right font-mono text-sm tabular-nums",
				children: money(planned)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-3 py-2 text-right font-mono text-sm tabular-nums",
				children: money(actual)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: cn("px-3 py-2 text-right font-mono text-sm tabular-nums", diff < 0 && "text-cell-miss-ink"),
				children: money(diff)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-3 py-2",
				colSpan: 2
			})
		]
	});
}
//#endregion
export { BudgetPage as component };
