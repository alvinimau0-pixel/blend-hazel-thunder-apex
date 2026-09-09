import { o as __toESM } from "../_runtime.mjs";
import { a as formatStamp } from "./utils-DyetTdWh.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { A as filterProject, C as Label, F as useOpsActions, N as useProject, O as PROGRESS_WHEN, P as useOps, S as Input, T as Button, _ as DialogContent, a as PageHead, b as DialogTrigger, c as StatusChip, g as Dialog, h as Spinner, i as OpsGate, l as Letterhead, n as EmptyDesk, o as RowCard, r as FormGrid, s as Segmented, u as useAsOf, w as Textarea, y as DialogTitle } from "./router-DCeeEZYX.mjs";
import { g as buildMskInsights } from "./domain-B9hSVQhA.mjs";
import { t as useSite } from "./use-site-C4IwY3aB.mjs";
import { n as useAutoReport, t as formatPulled } from "./use-auto-report-Xu5iykPX.mjs";
import { t as SignOff } from "./sign-off-BvBdTETZ.mjs";
import { t as useDeskHash } from "./use-desk-hash-D9dQRbuV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/progress-DutZ0vwZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var WHEN_IDS = [
	"daily",
	"weekly",
	"monthly"
];
function ProgressPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpsGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressBody, {}) });
}
function ProgressBody() {
	const { asOf } = useAsOf();
	const { project } = useProject();
	const ops = useOps().data;
	const site = useSite();
	const liveLock = site.data ? buildMskInsights(site.data, asOf).weightedAvg : null;
	const actions = useOpsActions();
	const auto = useAutoReport(asOf);
	const [cadence, setCadence] = useDeskHash(WHEN_IDS, "daily");
	const [open, setOpen] = (0, import_react.useState)(false);
	const rows = filterProject(ops.reports, project?.id ?? 0).filter((r) => r.cadence === cadence);
	const current = PROGRESS_WHEN.find((c) => c.id === cadence) ?? PROGRESS_WHEN[0];
	function onSubmit(e) {
		e.preventDefault();
		if (!project) return;
		const fd = new FormData(e.currentTarget);
		actions.addReport.mutate({
			projectId: project.id,
			cadence,
			period: String(fd.get("period") || ""),
			dated: String(fd.get("dated") || asOf),
			lockPct: Number(fd.get("lock") || 0),
			summary: String(fd.get("summary") || "")
		}, { onSuccess: () => {
			toast.success("Report saved");
			setOpen(false);
		} });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
				kicker: project?.name ?? "Project",
				title: `${current.label} progress`,
				hint: current.hint,
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: auto.on ? "default" : "outline",
							onClick: () => auto.setOn(!auto.on),
							children: auto.on ? "Auto on" : "Auto off"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							onClick: () => {
								auto.publishNow();
								toast.success(`Generating ${formatStamp(asOf)} daily, weekly, monthly`);
							},
							disabled: auto.publishing,
							children: auto.publishing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}), " Generating…"] }) : "Generate now"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
							open,
							onOpenChange: setOpen,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									children: ["New ", cadence]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, { children: [
								"New ",
								cadence,
								" report"
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormGrid, {
								onSubmit,
								busy: actions.addReport.isPending,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Period" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										name: "period",
										required: true,
										placeholder: cadence === "monthly" ? "August 2026" : "28 Aug 2026",
										className: "mt-1"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Date" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										name: "dated",
										type: "date",
										defaultValue: asOf,
										className: "mt-1"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Lock %" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										name: "lock",
										type: "number",
										min: 0,
										max: 100,
										defaultValue: liveLock ?? 0,
										className: "mt-1"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "sm:col-span-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "What happened" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											name: "summary",
											required: true,
											className: "mt-1",
											placeholder: "Holes, manpower, material, claim…"
										})]
									})
								]
							})] })]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
				value: cadence,
				onChange: setCadence,
				options: PROGRESS_WHEN
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "rounded-lg bg-paper-2 px-3 py-2 text-sm",
				children: [liveLock != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					"Live tower lock ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-display text-lg font-semibold tabular-nums",
						children: [liveLock, "%"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: " — signed copies below. Generate writes lock from the board."
					})
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted",
					children: "Board still loading lock."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "mt-1 block text-[11px] uppercase tracking-[0.12em] text-muted",
					children: [
						"Auto ",
						auto.on ? "every 10 min + on return" : "off",
						" · last write ",
						formatPulled(auto.lastAt)
					]
				})]
			}),
			cadence === "daily" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-ink-soft",
				children: [
					"Update crew on",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "text-accent uppercase tracking-[0.12em]",
						children: "Today"
					}),
					". This list is the signed copy you keep."
				]
			}) : null,
			rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyDesk, {
				title: `No ${cadence} report`,
				text: `Generate or write the first ${cadence} copy for ${project?.name ?? "this project"}.`
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-3",
				children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowCard, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "print-sheet",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-3 hidden print-only",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Letterhead, { asOf: r.dated })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-baseline justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-xl uppercase tracking-wide",
								children: r.period
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, { status: r.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-display text-2xl font-semibold tabular-nums",
									children: [r.lockPct, "%"]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-ink-soft",
							children: r.summary
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-[11px] uppercase tracking-[0.14em] text-muted",
							children: [
								formatStamp(r.dated),
								" · ",
								r.preparedBy
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 hidden print-only",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignOff, { compact: true })
						})
					]
				}) }, r.id))
			})
		]
	});
}
//#endregion
export { ProgressPage as component };
