import { o as __toESM } from "../_runtime.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { a as formatStamp, n as cn, u as todayIso } from "./utils-DyetTdWh.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { R as redirect, _ as createRootRoute, b as useRouter, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as DialogOverlay, c as DialogTrigger$1, i as DialogDescription$1, l as Slot, n as DialogClose, o as DialogPortal, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { a as object, i as number, o as string, r as literal, s as union } from "../_libs/zod.mjs";
import { _ as upsertRepay, a as addProject, c as dropClaim, f as publishDay, g as upsertAdvance, h as updateClaim, i as addPo, l as getOps, m as setRecordStatus, n as addDrawing, o as addReceive, p as setAttend, r as addPerson, s as addReport, t as addClaim, u as markSalaryPaid, y as __exportAll } from "./ops.functions-u1spHYWY.mjs";
import { i as useQueryClient, n as useQuery, r as QueryClientProvider, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { c as siteLine, i as REPORT_DATE, n as COMPANY } from "./company-BVHhciP6.mjs";
import { C as FileStack, E as ClipboardCheck, O as ChartNoAxesGantt, S as Globe, T as ClipboardList, _ as LoaderCircle, b as Inbox, f as Plus, h as Menu, i as TriangleAlert, j as Building2, k as ChartColumn, l as RefreshCw, n as Wallet, o as Table2, r as Users, t as X, u as Receipt, y as LayoutGrid } from "../_libs/lucide-react.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-ops-BkEAaU-c.js
function useOps() {
	return useQuery({
		queryKey: ["ops"],
		queryFn: () => getOps(),
		staleTime: 2e4,
		refetchOnWindowFocus: false,
		placeholderData: (prev) => prev
	});
}
function useOpsActions() {
	const qc = useQueryClient();
	const set = (data) => qc.setQueryData(["ops"], data);
	const addProjectM = useMutation({
		mutationFn: (data) => addProject({ data }),
		onSuccess: set
	});
	const addDrawingM = useMutation({
		mutationFn: (data) => addDrawing({ data }),
		onSuccess: set
	});
	const addPoM = useMutation({
		mutationFn: (data) => addPo({ data }),
		onSuccess: set
	});
	const addReceiveM = useMutation({
		mutationFn: (data) => addReceive({ data }),
		onSuccess: set
	});
	const addClaimM = useMutation({
		mutationFn: (data) => addClaim({ data }),
		onSuccess: set
	});
	const updateClaimM = useMutation({
		mutationFn: (data) => updateClaim({ data }),
		onSuccess: set
	});
	const dropClaimM = useMutation({
		mutationFn: (data) => dropClaim({ data }),
		onSuccess: set
	});
	const addReportM = useMutation({
		mutationFn: (data) => addReport({ data }),
		onSuccess: set
	});
	const publishDayM = useMutation({
		mutationFn: (dated) => publishDay({ data: { dated } }),
		onSuccess: (ops) => {
			set(ops);
			qc.invalidateQueries({ queryKey: ["site"] });
		}
	});
	const addPersonM = useMutation({
		mutationFn: (data) => addPerson({ data }),
		onSuccess: set
	});
	const addAdvanceM = useMutation({
		mutationFn: (data) => upsertAdvance({ data }),
		onSuccess: set
	});
	const upsertRepayM = useMutation({
		mutationFn: (data) => upsertRepay({ data }),
		onSuccess: set
	});
	const markPaid = useMutation({
		mutationFn: (data) => markSalaryPaid({ data }),
		onSuccess: set
	});
	return {
		addProject: addProjectM,
		addDrawing: addDrawingM,
		addPo: addPoM,
		addReceive: addReceiveM,
		addClaim: addClaimM,
		updateClaim: updateClaimM,
		dropClaim: dropClaimM,
		addReport: addReportM,
		publishDay: publishDayM,
		addPerson: addPersonM,
		addAdvance: addAdvanceM,
		upsertRepay: upsertRepayM,
		setAttend: useMutation({
			mutationFn: (data) => setAttend({ data }),
			onSuccess: set
		}),
		markPaid,
		setStatus: useMutation({
			mutationFn: (data) => setRecordStatus({ data }),
			onSuccess: set
		})
	};
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/ops-DumDRcUC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KEY = "gm-project-id";
var ProjectContext = (0, import_react.createContext)({
	projectId: 0,
	setProjectId: () => void 0,
	project: null,
	projects: []
});
function ProjectProvider({ children }) {
	const projects = useOps().data?.projects ?? [];
	const [projectId, setProjectIdState] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (projects.length === 0) return;
		const saved = Number(localStorage.getItem(KEY) || 0);
		if (projects.some((p) => p.id === saved)) setProjectIdState(saved);
		else setProjectIdState(projects[0].id);
	}, [projects]);
	function setProjectId(id) {
		setProjectIdState(id);
		localStorage.setItem(KEY, String(id));
	}
	const project = projects.find((p) => p.id === projectId) ?? projects[0] ?? null;
	const value = (0, import_react.useMemo)(() => ({
		projectId: project?.id ?? 0,
		setProjectId,
		project,
		projects
	}), [project, projects]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectContext.Provider, {
		value,
		children
	});
}
function useProject() {
	return (0, import_react.useContext)(ProjectContext);
}
var GM_SUB_NAMES = /* @__PURE__ */ new Set([
	"Aipoon",
	"Aryan",
	"Kolik"
]);
/** Desk crew: GM workers and plumbing subs that work under GM only. */
function isGmDeskPerson(p) {
	if (!p.active) return false;
	if (p.kind === "worker") return p.contractor === "GM";
	if (GM_SUB_NAMES.has(p.name)) return true;
	return p.contractor === "GM" || p.contractor === "SUB";
}
function statusTone(status) {
	switch (status) {
		case "current":
		case "received":
		case "certified":
		case "paid":
		case "active": return "done";
		case "partial":
		case "issued":
		case "open": return "risk";
		case "held":
		case "superseded": return "miss";
		case "draft": return "track";
		default: return "ink";
	}
}
function filterProject(rows, projectId) {
	return rows.filter((r) => r.projectId === projectId);
}
function parseHash(raw, allowed, fallback) {
	const value = raw.replace(/^#/, "");
	return allowed.includes(value) ? value : fallback;
}
var PAPER_KINDS = [
	{
		id: "drawings",
		label: "Drawings",
		hint: "Latest rev on site",
		ping: "Farah"
	},
	{
		id: "po",
		label: "Purchase order",
		hint: "Issued to supplier",
		ping: "Zilla"
	},
	{
		id: "receive",
		label: "Receive order",
		hint: "DO against PO",
		ping: "Alvin"
	}
];
var PROGRESS_WHEN = [
	{
		id: "daily",
		label: "Daily",
		hint: "Signed report for the day"
	},
	{
		id: "weekly",
		label: "Weekly",
		hint: "Week lock for Khairul"
	},
	{
		id: "monthly",
		label: "Monthly",
		hint: "Month close + claim"
	}
];
var PAY_KINDS = [{
	id: "advance",
	label: "Worker advance",
	hint: "Tap a day · enter RM",
	ping: "Jenny"
}, {
	id: "subcon",
	label: "Sub-contractor",
	hint: "Aipoon · Aryan · Kolik",
	ping: "Jenny"
}];
function deskStats(ops, projectId) {
	const drawings = filterProject(ops.drawings, projectId);
	const pos = filterProject(ops.pos, projectId);
	const receives = filterProject(ops.receives, projectId);
	const claims = filterProject(ops.claims, projectId);
	const reports = filterProject(ops.reports, projectId);
	const people = filterProject(ops.people, projectId);
	const salary = filterProject(ops.salary, projectId);
	const advances = filterProject(ops.advances, projectId);
	const latest = (when) => reports.find((r) => r.cadence === when);
	const month = salary[0]?.month ?? "";
	const monthRows = salary.filter((s) => s.month === month);
	return {
		drawings: drawings.length,
		po: pos.length,
		poOpen: pos.filter((p) => p.status !== "received").length,
		receive: receives.length,
		receivePartial: receives.filter((r) => r.status === "partial").length,
		claims: claims.length,
		claimDraft: claims.find((c) => c.status === "draft")?.claimNo ?? null,
		daily: latest("daily"),
		weekly: latest("weekly"),
		monthly: latest("monthly"),
		workers: people.filter((p) => p.kind === "worker").length,
		subs: people.filter((p) => p.kind === "sub").length,
		salaryNet: monthRows.reduce((s, r) => s + r.net, 0),
		salaryMonth: month,
		advancesOpen: advances.filter((a) => !a.recovered).length
	};
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/button-96bCT14c.js
var tapScale = "active:not-disabled:scale-[0.96]";
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[background-color,color,box-shadow,opacity,transform,border-color] duration-150 ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:bg-accent/90",
			stamp: "bg-stamp text-paper hover:bg-stamp/90",
			outline: "border border-line bg-panel text-ink hover:bg-paper-2",
			ghost: "text-ink-soft hover:bg-paper-2",
			secondary: "bg-paper-2 text-ink hover:bg-line"
		},
		size: {
			default: "min-h-11 h-11 px-4",
			sm: "min-h-11 h-11 px-3 text-sm sm:h-8 sm:min-h-8 sm:text-xs",
			lg: "min-h-12 h-12 px-5",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild, static: isStatic, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), !isStatic && tapScale, className),
		...props
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/input-CYGUV2Jb.js
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("h-11 w-full rounded-md border border-line bg-panel px-3 text-base text-ink outline-none ring-ring placeholder:text-muted transition-[border-color,box-shadow] duration-150 focus:border-accent focus:ring-2 sm:h-10 sm:text-sm", className),
		...props
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("min-h-20 w-full rounded-md border border-line bg-panel px-3 py-2 text-sm text-ink outline-none ring-ring placeholder:text-muted transition-[border-color,box-shadow] duration-150 focus:border-accent focus:ring-2", className),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-muted", className),
		...props
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/badge-2aaxXFFX.js
function Badge({ className, tone = "ink", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-sm px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em]", tone === "ink" && "bg-paper-2 text-ink-soft", tone === "done" && "bg-cell-done text-cell-done-ink", tone === "miss" && "bg-cell-miss text-cell-miss-ink", tone === "risk" && "bg-cell-risk text-cell-risk-ink", tone === "track" && "border border-line text-muted", tone === "stamp" && "bg-stamp/10 text-stamp", className),
		...props
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/dialog-FiUjX3pF.js
var Dialog = Dialog$1;
var DialogTrigger = DialogTrigger$1;
function DialogContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-ink/45 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in data-[state=closed]:fade-out duration-200" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("fixed inset-x-0 bottom-0 top-auto z-50 max-h-[88dvh] w-full origin-bottom overflow-y-auto rounded-t-2xl bg-panel p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-docket focus:outline-none", "sm:inset-auto sm:left-1/2 sm:top-1/2 sm:w-[calc(100%-1.5rem)] sm:max-w-lg sm:max-h-[92dvh] sm:origin-center sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-xl sm:pb-5", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in data-[state=closed]:fade-out", "data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom duration-200", "sm:data-[state=open]:zoom-in-95 sm:data-[state=closed]:zoom-out-95 sm:data-[state=open]:slide-in-from-bottom-0 sm:data-[state=closed]:slide-out-to-bottom-0", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute right-2 top-2 flex size-11 items-center justify-center rounded-md text-muted transition-[background-color,color] duration-150 hover:bg-paper-2 hover:text-ink",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		className: cn("font-display text-2xl font-semibold uppercase tracking-wide", className),
		...props
	});
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
		className: cn("mt-1 text-sm text-muted", className),
		...props
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/status-states-DjqMx59-.js
function Skeleton({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("skel rounded-md", className),
		"aria-hidden": true
	});
}
function Spinner({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
		className: cn("size-4 animate-spin", className),
		"aria-hidden": true
	});
}
function EmptyState({ icon: Icon, title, hint, action, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("rounded-xl bg-panel px-5 py-8 text-center shadow-docket sm:px-8 sm:py-10", className),
		children: [
			Icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex size-12 items-center justify-center rounded-lg bg-paper-2 text-muted",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					className: "size-5",
					strokeWidth: 1.75
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("font-display text-xl font-semibold uppercase tracking-wide", Icon && "mt-4"),
				children: title
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto mt-2 max-w-sm text-sm text-ink-soft",
				children: hint
			}) : null,
			action ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 flex justify-center",
				children: action
			}) : null
		]
	});
}
function EmptyInline({ title, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center py-5 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-sm uppercase tracking-[0.14em] text-muted",
			children: title
		}), hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 max-w-sm text-sm text-muted",
			children: hint
		}) : null]
	});
}
function ErrorState({ title, hint, onRetry }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-panel p-6 shadow-docket sm:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex size-11 items-center justify-center rounded-lg bg-stamp/10 text-stamp",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 font-display text-2xl font-semibold uppercase tracking-wide",
				children: title
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-md text-sm text-muted",
				children: hint
			}) : null,
			onRetry ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				className: "mt-4",
				variant: "outline",
				onClick: onRetry,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {}), " Try again"]
			}) : null
		]
	});
}
function PageSkeleton({ label = "Loading desk…" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		role: "status",
		"aria-live": "polite",
		"aria-busy": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3 w-28" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-9 w-44" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-72 max-w-full" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-11 rounded-lg" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-11 rounded-lg" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-40 w-full rounded-xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-16 w-full rounded-xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-16 w-full rounded-xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-16 w-full rounded-xl" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex items-center gap-2 font-display text-sm uppercase tracking-[0.16em] text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "size-3.5" }), label]
			})
		]
	});
}
function BoardSkeleton({ label = "Loading Gelaran Maju board…" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		role: "status",
		"aria-live": "polite",
		"aria-busy": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3 w-24" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-9 w-36" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-panel p-4 shadow-docket sm:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3 w-36" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mt-3 h-12 w-28" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid grid-cols-3 gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-16 rounded-lg" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-16 rounded-lg" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-16 rounded-lg" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid grid-cols-2 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 rounded-md" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 rounded-md" })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-panel p-4 shadow-docket sm:p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-5 w-32" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-12 w-full" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-12 w-full" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-12 w-full" })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex items-center gap-2 font-display text-sm uppercase tracking-[0.16em] text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "size-3.5" }), label]
			})
		]
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-DCeeEZYX.js
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 bg-paper px-6 text-center text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex size-12 items-center justify-center rounded-lg bg-stamp/10 text-stamp",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-6",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold uppercase tracking-wide",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-muted",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var AsOfContext = (0, import_react.createContext)({
	asOf: todayIso(),
	setAsOf: () => void 0
});
function useAsOf() {
	return (0, import_react.useContext)(AsOfContext);
}
function CompanyMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: "/plans/gm-logo-sm.jpg",
		srcSet: "/plans/gm-logo-sm.jpg 180w, /plans/gm-logo.jpg 512w",
		sizes: "64px",
		alt: COMPANY.legal,
		className: cn("shrink-0 rounded-full bg-sheet object-cover", className)
	});
}
function Letterhead({ asOf, compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0 w-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 items-center gap-2.5 sm:gap-3.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompanyMark, { className: compact ? "size-10" : "size-12 sm:size-16" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-w-0 flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-fit max-w-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: cn("truncate font-display font-extrabold uppercase leading-[0.95] text-ink", compact ? "text-[14px] tracking-[0.04em] sm:text-[1.25rem] sm:tracking-[0.06em]" : "text-[clamp(1.05rem,4.6vw,1.9rem)] tracking-[0.05em]"),
						children: COMPANY.legal
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: cn("mt-0.5 text-right font-display font-medium leading-none text-ink", compact ? "text-[10px] tracking-wide" : "text-[11px] sm:text-sm"),
						children: [
							"(",
							COMPANY.registration,
							")"
						]
					})]
				})
			})]
		}), compact ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-2.5 h-px bg-ink" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1.5 truncate text-[10px] uppercase tracking-[0.16em] text-muted sm:text-[11px]",
			children: [
				COMPANY.trade,
				" · ",
				siteLine(),
				" · ",
				formatStamp(asOf)
			]
		})] })]
	});
}
function OpsGate({ children }) {
	const q = useOps();
	if (q.isLoading && !q.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSkeleton, {});
	if (!q.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
		title: "Desk unavailable",
		hint: q.error instanceof Error ? q.error.message : "Could not load.",
		onRetry: () => void q.refetch()
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function StatusChip({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		tone: statusTone(status),
		children: status
	});
}
function Segmented({ value, onChange, options }) {
	const cols = options.length === 3 ? "grid-cols-3" : "grid-cols-2";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("grid gap-1.5", cols, options.length > 3 && "sm:grid-cols-4"),
		children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "lg",
			variant: value === o.id ? "default" : "outline",
			className: "min-h-11 w-full whitespace-normal px-2 text-center leading-tight",
			onClick: () => onChange(o.id),
			"aria-pressed": value === o.id,
			children: o.label
		}, o.id))
	});
}
function PageHead({ kicker, title, hint, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-end justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-[11px] uppercase tracking-[0.2em] text-muted",
				children: kicker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 font-display text-3xl font-semibold uppercase tracking-wide",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-xl text-sm text-ink-soft",
				children: hint
			})
		] }), action]
	});
}
function EmptyDesk({ text, title = "Nothing here", action, icon: Icon = Inbox }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: Icon,
		title,
		hint: text,
		action
	});
}
function FormGrid({ children, onSubmit, busy }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		className: "grid gap-3 sm:grid-cols-2",
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "sm:col-span-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				disabled: busy,
				children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}), " Saving…"] }) : "Save"
			})
		})]
	});
}
function RowCard({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
		className: cn("rounded-xl bg-panel px-4 py-3 shadow-docket transition-[background-color] duration-150", className),
		children
	});
}
function AddProjectDialog({ variant = "icon" }) {
	const { setProjectId } = useProject();
	const { addProject } = useOpsActions();
	const [open, setOpen] = (0, import_react.useState)(false);
	function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		addProject.mutate({
			name: String(fd.get("name")),
			client: String(fd.get("client")),
			location: String(fd.get("location") || "")
		}, { onSuccess: (ops) => {
			const created = ops.projects[ops.projects.length - 1];
			if (created) setProjectId(created.id);
			toast.success("Project added");
			setOpen(false);
		} });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			asChild: true,
			children: variant === "card" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "rounded-lg border border-dashed border-line-strong bg-paper-2 px-3 py-3 text-left transition-[background-color,transform] duration-150 ease-out hover:bg-line active:scale-[0.98]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-lg font-semibold uppercase tracking-wide",
					children: "New project"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted",
					children: "Name, client, location"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				"aria-label": "Add project",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "New project" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit,
			className: "mt-3 space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					name: "name",
					required: true,
					className: "mt-1",
					placeholder: "Project name"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Client" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					name: "client",
					required: true,
					className: "mt-1"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Location" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					name: "location",
					className: "mt-1"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: addProject.isPending,
					children: addProject.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}), " Adding…"] }) : "Add project"
				})
			]
		})] })]
	});
}
var Sheet = Dialog$1;
var SheetTrigger = DialogTrigger$1;
var SheetClose = DialogClose;
function SheetContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-ink/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in data-[state=closed]:fade-out duration-200" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent$1, {
		className: cn("fixed inset-y-0 left-0 z-50 flex h-full w-[min(20rem,88vw)] flex-col bg-panel p-5 pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-docket", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in data-[state=closed]:fade-out", "data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left duration-300", className),
		...props,
		children
	})] });
}
var NAV = [
	{
		to: "/",
		label: "Home",
		short: "Home",
		icon: ClipboardList
	},
	{
		to: "/dash",
		label: "Charts",
		short: "Charts",
		icon: ChartColumn
	},
	{
		to: "/msk",
		label: "MSK board",
		short: "MSK",
		icon: Table2
	},
	{
		to: "/issues",
		label: "Problems",
		short: "Issues",
		icon: TriangleAlert
	},
	{
		to: "/people",
		label: "Workers",
		short: "Crew",
		icon: Users
	}
];
var MORE = [
	{
		to: "/papers",
		label: "Drawings & PO",
		icon: FileStack
	},
	{
		to: "/sub-claim",
		label: "Sub claim",
		icon: ClipboardCheck
	},
	{
		to: "/eval-claim",
		label: "Evaluation claim",
		icon: Receipt
	},
	{
		to: "/hod",
		label: "Share site",
		icon: Globe
	},
	{
		to: "/progress",
		label: "Reports",
		icon: ClipboardList
	},
	{
		to: "/pay",
		label: "Pay",
		icon: Wallet
	},
	{
		to: "/budget",
		label: "Budget",
		icon: Wallet
	},
	{
		to: "/matrix",
		label: "Toilet board",
		icon: LayoutGrid
	},
	{
		to: "/plan",
		label: "Work plan",
		icon: ChartNoAxesGantt
	},
	{
		to: "/building",
		label: "Building",
		icon: Building2
	},
	{
		to: "/office",
		label: "Office",
		icon: Users
	},
	{
		to: "/flyer",
		label: "One-pager",
		icon: FileStack
	}
];
var fieldClass = "h-9 rounded-md border border-line bg-panel px-2 font-mono text-xs tabular-nums outline-none transition-[border-color,box-shadow] duration-150 focus:border-accent focus:ring-2 focus:ring-ring";
function NavLinks({ onClick }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		className: "flex flex-col gap-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-3 pb-1 font-display text-[10px] uppercase tracking-[0.16em] text-muted",
				children: "Site"
			}),
			NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavItem, {
				...item,
				active: pathname === item.to,
				onClick
			}, item.to)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 px-3 pb-1 font-display text-[10px] uppercase tracking-[0.16em] text-muted",
				children: "More"
			}),
			MORE.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavItem, {
				...item,
				active: pathname === item.to,
				onClick
			}, item.to))
		]
	});
}
function NavItem({ to, label, icon: Icon, active, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		onClick,
		"aria-current": active ? "page" : void 0,
		className: cn("flex min-h-11 items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-[background-color,color,transform] duration-150 ease-out active:scale-[0.98]", active ? "bg-ink text-paper" : "text-ink-soft hover:bg-paper-2"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-display text-[14px] uppercase leading-tight tracking-[0.1em]",
			children: label
		})]
	});
}
function ProjectPicker() {
	const { project, projects, setProjectId } = useProject();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-w-0 flex-1 items-center gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "min-w-0 flex-1 sm:flex-none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Choose project"
			}), projects.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block h-9 truncate rounded-md border border-dashed border-line bg-panel px-2 py-2 font-display text-[12px] uppercase tracking-[0.08em] text-muted",
				children: "No project yet"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				value: project?.id ?? "",
				onChange: (e) => setProjectId(Number(e.target.value)),
				className: "h-9 w-full max-w-full truncate rounded-md border border-line bg-sheet px-2 font-display text-[12px] uppercase tracking-[0.08em] outline-none transition-[border-color,box-shadow] duration-150 focus:border-accent focus:ring-2 focus:ring-ring sm:w-auto sm:max-w-[14rem]",
				children: projects.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: p.id,
					children: p.name
				}, p.id))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddProjectDialog, {})]
	});
}
function AppShell({ children }) {
	const [asOf, setAsOf] = (0, import_react.useState)(() => todayIso());
	const value = (0, import_react.useMemo)(() => ({
		asOf,
		setAsOf
	}), [asOf]);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const { project } = useProject();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 6);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	if (pathname === "/hod") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AsOfContext.Provider, {
		value,
		children
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AsOfContext.Provider, {
		value,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-h-dvh overflow-x-hidden bg-paper text-ink",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none fixed inset-0 bg-[radial-gradient(1200px_circle_at_10%_-10%,rgba(47,68,90,0.06),transparent_55%)]" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: cn("no-print sticky top-0 z-30 bg-sheet pt-[env(safe-area-inset-top)] transition-[box-shadow] duration-200 ease-out", scrolled && "shadow-[var(--shadow-sticky)]"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto flex max-w-[1400px] items-center gap-2 px-4 py-2.5 sm:gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
									open,
									onOpenChange: setOpen,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "icon",
											className: "lg:hidden",
											"aria-label": "Open menu",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Letterhead, {
											asOf,
											compact: true
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-xs text-muted",
											children: project?.name ?? COMPANY.project
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-6",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLinks, { onClick: () => setOpen(false) })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetClose, {
											asChild: true,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "outline",
												className: "mt-auto",
												children: "Close"
											})
										})
									] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "min-w-0 flex-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Letterhead, {
										asOf,
										compact: true
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "hidden sm:block",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectPicker, {})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "hidden flex-col md:flex",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-[10px] uppercase tracking-[0.16em] text-muted",
										children: "As of"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "date",
										value: asOf,
										onChange: (e) => setAsOf(e.target.value),
										className: fieldClass
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "hidden rounded-md border border-stamp/30 bg-stamp/10 px-3 py-1.5 text-stamp lg:block",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-lg font-semibold uppercase leading-none tracking-wide",
										children: formatStamp(asOf)
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto flex max-w-[1400px] items-center gap-2 px-4 pb-2 sm:hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectPicker, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "shrink-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "sr-only",
									children: "As of"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "date",
									value: asOf,
									onChange: (e) => setAsOf(e.target.value),
									className: cn(fieldClass, "text-[11px]")
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px bg-ink" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-[1400px] grid-cols-1 gap-6 px-4 py-5 lg:grid-cols-[13.5rem_1fr] lg:py-7",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
						className: "no-print hidden lg:block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "sticky top-24 rounded-xl bg-panel p-3 shadow-docket",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLinks, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-5 border-t border-line pt-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-display text-[10px] uppercase tracking-[0.16em] text-muted",
											children: "Report date"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "date",
											value: asOf,
											onChange: (e) => setAsOf(e.target.value),
											className: "mt-2 h-10 w-full rounded-md border border-line bg-paper px-2 font-mono text-xs outline-none transition-[border-color,box-shadow] duration-150 focus:border-accent focus:ring-2 focus:ring-ring"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-2 text-[10px] uppercase tracking-[0.14em] text-muted",
											children: ["Last sheet ", formatStamp(REPORT_DATE)]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-4 text-[10px] uppercase tracking-[0.14em] text-muted",
									children: ["Internal · ", COMPANY.legal]
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						className: "min-w-0 pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "page-enter",
							children
						}, pathname)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "no-print fixed inset-x-0 bottom-0 z-30 border-t border-line bg-panel/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-5",
						children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomLink, { ...item }, item.to))
					})
				})
			]
		})
	});
}
function BottomLink({ to, label, short, icon: Icon }) {
	const active = useRouterState({ select: (s) => s.location.pathname }) === to;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		"aria-current": active ? "page" : void 0,
		className: cn("relative flex min-h-14 flex-col items-center justify-center gap-0.5 px-1 text-[10px] uppercase tracking-[0.12em] transition-[color] duration-150", active ? "text-ink" : "text-muted"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute inset-x-1.5 top-1.5 bottom-1.5 rounded-lg bg-paper-2 transition-opacity duration-150 ease-out", active ? "opacity-100" : "opacity-0") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "relative size-4" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "relative",
				children: short ?? label
			})
		]
	});
}
var styles_default = "/assets/styles-D7Fp07QF.css";
var APP_NAME = "Gelaran Maju";
function RootProviders() {
	const [client] = (0, import_react.useState)(() => new QueryClient({ defaultOptions: { queries: {
		staleTime: 8e3,
		refetchOnWindowFocus: false,
		retry: 1
	} } }));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
			position: "top-center",
			richColors: true,
			closeButton: true,
			toastOptions: { classNames: { toast: "font-sans shadow-docket" } }
		})] })
	});
}
var Route$19 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#1C1916"
			},
			{
				name: "description",
				content: "Gelaran Maju Sdn Bhd (817785-V) — plumbing progress, crew truth checks, and planning for The Capitol."
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800&family=DM+Sans:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,600;9..144,700&family=IBM+Plex+Mono:wght@500;600&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RootProviders, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$18 = () => import("./routes-D_mywP0e.mjs");
var Route$18 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$18, "component") });
var $$splitComponentImporter$17 = () => import("./budget-BeIbkjrl.mjs");
var Route$17 = createFileRoute("/budget")({ component: lazyRouteComponent($$splitComponentImporter$17, "component") });
var $$splitComponentImporter$16 = () => import("./building-CHCEgVbc.mjs");
var Route$16 = createFileRoute("/building")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
var $$splitComponentImporter$15 = () => import("./daily-CUNQF3tJ.mjs");
var Route$15 = createFileRoute("/daily")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
var $$splitComponentImporter$14 = () => import("./dash-CGmcOjZq.mjs");
var Route$14 = createFileRoute("/dash")({
	component: lazyRouteComponent($$splitComponentImporter$14, "component"),
	head: () => ({ meta: [{ title: "Charts · Gelaran Maju" }, {
		name: "description",
		content: "Live MSK charts from the Capitol board."
	}] })
});
var $$splitComponentImporter$13 = () => import("./eval-claim-DcAmRzT1.mjs");
var Route$13 = createFileRoute("/eval-claim")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./flyer-DscH8N83.mjs");
var Route$12 = createFileRoute("/flyer")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./hod-9GPQoJ6_.mjs");
var Route$11 = createFileRoute("/hod")({
	component: lazyRouteComponent($$splitComponentImporter$11, "component"),
	head: () => ({ meta: [{ title: "Attn Khairul · Gelaran Maju" }, {
		name: "description",
		content: "Gelaran Maju Sdn Bhd (817785-V) — The Capitol MSK lock, skipped floors, and PC36 for Khairul."
	}] })
});
var $$splitComponentImporter$10 = () => import("./issues-2Ol8PVCc.mjs");
var Route$10 = createFileRoute("/issues")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./matrix-CkLrUySt.mjs");
var Route$9 = createFileRoute("/matrix")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./msk-DcRyAnMH.mjs");
var Route$8 = createFileRoute("/msk")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./office-EfYFZwq3.mjs");
var Route$7 = createFileRoute("/office")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./papers-Brw4hyj2.mjs");
var Route$6 = createFileRoute("/papers")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./pay-dgoJIHNI.mjs");
var Route$5 = createFileRoute("/pay")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./people-lejtP_vC.mjs");
var Route$4 = createFileRoute("/people")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./plan-B-lt8uaf.mjs");
var Route$3 = createFileRoute("/plan")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./progress-DutZ0vwZ.mjs");
var Route$2 = createFileRoute("/progress")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./site-CpZ54R8S.mjs");
var Route$1 = createFileRoute("/site")({
	beforeLoad: () => {
		throw redirect({ to: "/" });
	},
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./sub-claim-DHAM7Xbd.mjs");
var Route = createFileRoute("/sub-claim")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$18.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$19
	}),
	BudgetRoute: Route$17.update({
		id: "/budget",
		path: "/budget",
		getParentRoute: () => Route$19
	}),
	BuildingRoute: Route$16.update({
		id: "/building",
		path: "/building",
		getParentRoute: () => Route$19
	}),
	DailyRoute: Route$15.update({
		id: "/daily",
		path: "/daily",
		getParentRoute: () => Route$19
	}),
	DashRoute: Route$14.update({
		id: "/dash",
		path: "/dash",
		getParentRoute: () => Route$19
	}),
	EvalClaimRoute: Route$13.update({
		id: "/eval-claim",
		path: "/eval-claim",
		getParentRoute: () => Route$19
	}),
	FlyerRoute: Route$12.update({
		id: "/flyer",
		path: "/flyer",
		getParentRoute: () => Route$19
	}),
	HodRoute: Route$11.update({
		id: "/hod",
		path: "/hod",
		getParentRoute: () => Route$19
	}),
	IssuesRoute: Route$10.update({
		id: "/issues",
		path: "/issues",
		getParentRoute: () => Route$19
	}),
	MatrixRoute: Route$9.update({
		id: "/matrix",
		path: "/matrix",
		getParentRoute: () => Route$19
	}),
	MskRoute: Route$8.update({
		id: "/msk",
		path: "/msk",
		getParentRoute: () => Route$19
	}),
	OfficeRoute: Route$7.update({
		id: "/office",
		path: "/office",
		getParentRoute: () => Route$19
	}),
	PapersRoute: Route$6.update({
		id: "/papers",
		path: "/papers",
		getParentRoute: () => Route$19
	}),
	PayRoute: Route$5.update({
		id: "/pay",
		path: "/pay",
		getParentRoute: () => Route$19
	}),
	PeopleRoute: Route$4.update({
		id: "/people",
		path: "/people",
		getParentRoute: () => Route$19
	}),
	PlanRoute: Route$3.update({
		id: "/plan",
		path: "/plan",
		getParentRoute: () => Route$19
	}),
	ProgressRoute: Route$2.update({
		id: "/progress",
		path: "/progress",
		getParentRoute: () => Route$19
	}),
	SiteRoute: Route$1.update({
		id: "/site",
		path: "/site",
		getParentRoute: () => Route$19
	}),
	SubClaimRoute: Route.update({
		id: "/sub-claim",
		path: "/sub-claim",
		getParentRoute: () => Route$19
	})
};
var routeTree = Route$19._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { filterProject as A, Label as C, PAY_KINDS as D, PAPER_KINDS as E, useOpsActions as F, parseHash as M, useProject as N, PROGRESS_WHEN as O, useOps as P, Input as S, Button as T, DialogContent as _, PageHead as a, DialogTrigger as b, StatusChip as c, BoardSkeleton as d, EmptyInline as f, Dialog as g, Spinner as h, OpsGate as i, isGmDeskPerson as j, deskStats as k, Letterhead as l, ErrorState as m, EmptyDesk as n, RowCard as o, EmptyState as p, FormGrid as r, Segmented as s, router_exports as t, useAsOf as u, DialogDescription as v, Textarea as w, Badge as x, DialogTitle as y };
