import { o as __toESM } from "../_runtime.mjs";
import { a as formatStamp } from "./utils-DyetTdWh.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { A as filterProject, C as Label, F as useOpsActions, N as useProject, P as useOps, S as Input, T as Button, a as PageHead, c as StatusChip, h as Spinner, i as OpsGate, n as EmptyDesk, u as useAsOf, w as Textarea } from "./router-DCeeEZYX.mjs";
import { x as formatRm } from "./domain-B9hSVQhA.mjs";
import { n as ClaimPictures } from "./add-picture-CZKih--a.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/eval-claim-DcAmRzT1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EvalClaimPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpsGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EvalClaimBody, {}) });
}
function EvalClaimBody() {
	const { asOf } = useAsOf();
	const { project } = useProject();
	const ops = useOps().data;
	const { addClaim } = useOpsActions();
	const pid = project?.id ?? 0;
	const rows = filterProject(ops.claims, pid);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
				kicker: project?.name ?? "Project",
				title: "Evaluation claim",
				hint: "PC to the client. Edit the card, add or remove pictures, save. Not sub gaji.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					disabled: !project || addClaim.isPending,
					onClick: () => {
						if (!project) return;
						addClaim.mutate({
							projectId: project.id,
							claimNo: nextPc(rows.map((r) => r.claimNo)),
							title: "Cold water, sanitary & irrigation",
							period: asOf.slice(0, 7),
							dated: asOf,
							amount: 0
						}, { onSuccess: () => toast.success("Blank claim added") });
					},
					children: addClaim.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}), " Adding…"] }) : "Add claim"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-ink-soft",
				children: [
					"Aipoon / Aryan / Kolik sit under",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/sub-claim",
						className: "uppercase tracking-[0.12em] text-accent",
						children: "Sub claim"
					}),
					"."
				]
			}),
			rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyDesk, {
				title: "No evaluation claim",
				text: "Add a PC card, drop pictures, then save. This is the client claim — not sub gaji."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-4",
				children: rows.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClaimCard, { claim: c }) }, c.id))
			})
		]
	});
}
function nextPc(existing) {
	const nums = existing.map((n) => Number(n.replace(/\D/g, ""))).filter((n) => Number.isFinite(n) && n > 0);
	return `PC${(nums.length ? Math.max(...nums) : 37) + 1}`;
}
function ClaimCard({ claim }) {
	const { updateClaim, dropClaim } = useOpsActions();
	const [draft, setDraft] = (0, import_react.useState)(claim);
	(0, import_react.useEffect)(() => setDraft(claim), [claim]);
	function save() {
		updateClaim.mutate({
			id: draft.id,
			claimNo: draft.claimNo.trim() || claim.claimNo,
			title: draft.title.trim() || claim.title,
			period: draft.period.trim() || claim.period,
			dated: draft.dated,
			amount: Number(draft.amount) || 0,
			certified: Number(draft.certified) || 0,
			status: draft.status,
			note: draft.note,
			photos: draft.photos.slice(0, 8)
		}, { onSuccess: () => toast.success("Claim saved") });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "space-y-3 rounded-xl bg-panel p-4 shadow-docket sm:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, { status: draft.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						onClick: save,
						disabled: updateClaim.isPending,
						children: updateClaim.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}), " Saving…"] }) : "Save"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => {
							if (!window.confirm("Remove this claim?")) return;
							dropClaim.mutate({ id: claim.id }, { onSuccess: () => toast.success("Claim removed") });
						},
						children: "Remove"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "PC no" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "mt-1",
							value: draft.claimNo,
							onChange: (e) => setDraft({
								...draft,
								claimNo: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Period" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "mt-1",
							value: draft.period,
							onChange: (e) => setDraft({
								...draft,
								period: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Title" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "mt-1",
							value: draft.title,
							onChange: (e) => setDraft({
								...draft,
								title: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Amount RM" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "mt-1",
							type: "number",
							min: 0,
							value: draft.amount,
							onChange: (e) => setDraft({
								...draft,
								amount: Number(e.target.value)
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Certified RM" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "mt-1",
							type: "number",
							min: 0,
							value: draft.certified,
							onChange: (e) => setDraft({
								...draft,
								certified: Number(e.target.value)
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Date" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "mt-1",
							type: "date",
							value: draft.dated,
							onChange: (e) => setDraft({
								...draft,
								dated: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Status" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "mt-1 h-10 w-full rounded-md border border-line bg-panel px-3 text-sm",
							value: draft.status,
							onChange: (e) => setDraft({
								...draft,
								status: e.target.value
							}),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "draft",
									children: "draft"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "issued",
									children: "issued"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "certified",
									children: "certified"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "paid",
									children: "paid"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Note" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							className: "mt-1",
							rows: 3,
							value: draft.note,
							onChange: (e) => setDraft({
								...draft,
								note: e.target.value
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClaimPictures, {
				photos: draft.photos,
				onChange: (photos) => setDraft({
					...draft,
					photos
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-[11px] uppercase tracking-[0.14em] text-muted",
				children: [
					formatStamp(draft.dated),
					" · ",
					draft.ping,
					" · ",
					draft.certified ? `certified RM ${formatRm(draft.certified)}` : "not certified"
				]
			})
		]
	});
}
//#endregion
export { EvalClaimPage as component };
