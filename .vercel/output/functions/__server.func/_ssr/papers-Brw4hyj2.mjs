import { o as __toESM } from "../_runtime.mjs";
import { a as formatStamp } from "./utils-DyetTdWh.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { A as filterProject, C as Label, E as PAPER_KINDS, F as useOpsActions, N as useProject, P as useOps, S as Input, T as Button, _ as DialogContent, a as PageHead, b as DialogTrigger, c as StatusChip, g as Dialog, i as OpsGate, n as EmptyDesk, o as RowCard, r as FormGrid, s as Segmented, u as useAsOf, w as Textarea, y as DialogTitle } from "./router-DCeeEZYX.mjs";
import { x as formatRm } from "./domain-B9hSVQhA.mjs";
import { t as useDeskHash } from "./use-desk-hash-D9dQRbuV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/papers-Brw4hyj2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KIND_IDS = [
	"drawings",
	"po",
	"receive"
];
function PapersPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpsGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PapersBody, {}) });
}
function PapersBody() {
	const { asOf } = useAsOf();
	const { project } = useProject();
	const ops = useOps().data;
	const pid = project?.id ?? 0;
	const [kind, setKind] = useDeskHash(KIND_IDS, "drawings");
	const [open, setOpen] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	const current = PAPER_KINDS.find((k) => k.id === kind) ?? PAPER_KINDS[0];
	const hint = {
		drawings: "Latest rev on site. Farah keeps the register.",
		po: "Zilla issues. Site cannot receive what is not on a PO.",
		receive: "DO against PO. Partial stays yellow until the balance lands."
	}[kind];
	(0, import_react.useEffect)(() => {
		if (typeof window !== "undefined" && window.location.hash.replace(/^#/, "") === "claim") navigate({
			to: "/eval-claim",
			replace: true
		});
	}, [navigate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
				kicker: project?.name ?? "Project",
				title: current.label,
				hint,
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
					open,
					onOpenChange: setOpen,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							children: ["New ", current.label]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, { children: ["New ", current.label] }),
						kind === "drawings" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawingForm, {
							asOf,
							onClose: () => setOpen(false)
						}) : null,
						kind === "po" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PoForm, {
							asOf,
							onClose: () => setOpen(false)
						}) : null,
						kind === "receive" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReceiveForm, {
							asOf,
							onClose: () => setOpen(false)
						}) : null
					] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
				value: kind,
				onChange: setKind,
				options: PAPER_KINDS
			}),
			kind === "drawings" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: filterProject(ops.drawings, pid).map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RowCard, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-baseline justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg uppercase tracking-wide",
							children: d.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, { status: d.status })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-[12px] uppercase tracking-[0.12em] text-muted",
						children: [
							d.refNo,
							" · ",
							d.discipline,
							" · Rev ",
							d.rev,
							" · ",
							formatStamp(d.dated)
						]
					}),
					d.fileHref ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: d.fileHref,
						className: "mt-2 inline-block text-xs uppercase tracking-[0.14em] text-accent",
						children: "Open drawing"
					}) : null
				] }, d.id))
			}) : null,
			kind === "po" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: filterProject(ops.pos, pid).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RowCard, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-baseline justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg uppercase tracking-wide",
							children: p.poNo
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, { status: p.status })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: p.material
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-[12px] text-muted",
						children: [
							p.supplier,
							" · ",
							formatStamp(p.dated),
							" · Ping ",
							p.ping
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 font-mono text-sm tabular-nums",
						children: ["RM ", formatRm(p.amount)]
					})
				] }, p.id))
			}) : null,
			kind === "receive" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: filterProject(ops.receives, pid).map((r) => {
					const po = ops.pos.find((p) => p.id === r.poId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RowCard, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-baseline justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-lg uppercase tracking-wide",
								children: r.doNo
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, { status: r.status })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm",
							children: r.qtyNote
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-[12px] text-muted",
							children: [
								po?.poNo ?? "No PO",
								" · ",
								r.receivedBy,
								" · ",
								formatStamp(r.dated)
							]
						})
					] }, r.id);
				})
			}) : null,
			kind === "drawings" && filterProject(ops.drawings, pid).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyDesk, {
				title: "No drawings",
				text: "Log the latest rev on site. Farah keeps the register."
			}) : null,
			kind === "po" && filterProject(ops.pos, pid).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyDesk, {
				title: "No purchase orders",
				text: "Zilla issues. Site cannot receive what is not on a PO."
			}) : null,
			kind === "receive" && filterProject(ops.receives, pid).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyDesk, {
				title: "Nothing received",
				text: "Log a DO against a PO. Partial stays yellow until the balance lands."
			}) : null
		]
	});
}
function DrawingForm({ asOf, onClose }) {
	const { project } = useProject();
	const { addDrawing } = useOpsActions();
	function onSubmit(e) {
		e.preventDefault();
		if (!project) return;
		const fd = new FormData(e.currentTarget);
		addDrawing.mutate({
			projectId: project.id,
			title: String(fd.get("title")),
			refNo: String(fd.get("ref")),
			discipline: String(fd.get("disc")),
			rev: String(fd.get("rev")),
			dated: String(fd.get("dated") || asOf)
		}, { onSuccess: () => {
			toast.success("Drawing logged");
			onClose();
		} });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormGrid, {
		onSubmit,
		busy: addDrawing.isPending,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sm:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Title" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					name: "title",
					required: true,
					className: "mt-1"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Ref" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				name: "ref",
				required: true,
				className: "mt-1"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Discipline" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				name: "disc",
				defaultValue: "Plumbing",
				className: "mt-1"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Rev" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				name: "rev",
				defaultValue: "A",
				className: "mt-1"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Date" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				name: "dated",
				type: "date",
				defaultValue: asOf,
				className: "mt-1"
			})] })
		]
	});
}
function PoForm({ asOf, onClose }) {
	const { project } = useProject();
	const { addPo } = useOpsActions();
	function onSubmit(e) {
		e.preventDefault();
		if (!project) return;
		const fd = new FormData(e.currentTarget);
		addPo.mutate({
			projectId: project.id,
			poNo: String(fd.get("po")),
			supplier: String(fd.get("supplier")),
			dated: String(fd.get("dated") || asOf),
			material: String(fd.get("material")),
			amount: Number(fd.get("amount") || 0)
		}, { onSuccess: () => {
			toast.success("PO issued");
			onClose();
		} });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormGrid, {
		onSubmit,
		busy: addPo.isPending,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "PO no" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				name: "po",
				required: true,
				placeholder: "GM-PO-2406",
				className: "mt-1"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Date" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				name: "dated",
				type: "date",
				defaultValue: asOf,
				className: "mt-1"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sm:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Supplier" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					name: "supplier",
					required: true,
					className: "mt-1"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sm:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Material" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					name: "material",
					required: true,
					className: "mt-1"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Amount RM" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				name: "amount",
				type: "number",
				min: 0,
				className: "mt-1"
			})] })
		]
	});
}
function ReceiveForm({ asOf, onClose }) {
	const { project } = useProject();
	const ops = useOps().data;
	const { addReceive } = useOpsActions();
	const pos = filterProject(ops.pos, project?.id ?? 0);
	function onSubmit(e) {
		e.preventDefault();
		if (!project) return;
		const fd = new FormData(e.currentTarget);
		addReceive.mutate({
			projectId: project.id,
			doNo: String(fd.get("do")),
			poId: fd.get("po") ? Number(fd.get("po")) : null,
			dated: String(fd.get("dated") || asOf),
			receivedBy: String(fd.get("by")),
			qtyNote: String(fd.get("qty")),
			status: String(fd.get("status") || "received")
		}, { onSuccess: () => {
			toast.success("Receive logged");
			onClose();
		} });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormGrid, {
		onSubmit,
		busy: addReceive.isPending,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "DO no" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				name: "do",
				required: true,
				className: "mt-1"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Against PO" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				name: "po",
				className: "mt-1 h-10 w-full rounded-md border border-line bg-panel px-2 text-sm outline-none transition-[border-color,box-shadow] duration-150 focus:border-accent focus:ring-2 focus:ring-ring",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					children: "No PO"
				}), pos.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: p.id,
					children: p.poNo
				}, p.id))]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Received by" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				name: "by",
				defaultValue: "Alvin",
				className: "mt-1"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Date" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				name: "dated",
				type: "date",
				defaultValue: asOf,
				className: "mt-1"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sm:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Qty / note" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					name: "qty",
					className: "mt-1"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Status" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				name: "status",
				className: "mt-1 h-10 w-full rounded-md border border-line bg-panel px-2 text-sm outline-none transition-[border-color,box-shadow] duration-150 focus:border-accent focus:ring-2 focus:ring-ring",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "received",
					children: "Received"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "partial",
					children: "Partial"
				})]
			})] })
		]
	});
}
//#endregion
export { PapersPage as component };
