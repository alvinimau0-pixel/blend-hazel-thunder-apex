import { o as __toESM } from "../_runtime.mjs";
import { n as cn } from "./utils-DyetTdWh.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { s as pingForKind } from "./company-BVHhciP6.mjs";
import { D as CircleCheck, b as Inbox } from "../_libs/lucide-react.mjs";
import { T as Button, p as EmptyState, u as useAsOf, x as Badge } from "./router-DCeeEZYX.mjs";
import { A as siteCrewGrouped, b as findMskCell, g as buildMskInsights, h as buildInsights, j as towerFromFlag } from "./domain-B9hSVQhA.mjs";
import { t as SiteGate } from "./site-gate-DjT4Gwiq.mjs";
import { t as UpdateMskDialog } from "./update-msk-dialog-DEMebGrT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/issues-2Ol8PVCc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function IssuesPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteGate, { children: (site) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Issues, { site }) });
}
var KINDS = [
	"all",
	"hole",
	"lag",
	"lie",
	"missed",
	"risk",
	"waiting",
	"sequence",
	"unverified",
	"spread"
];
function Issues({ site }) {
	const { asOf } = useAsOf();
	const ins = buildInsights(site, asOf);
	const msk = buildMskInsights(site, asOf);
	const [kind, setKind] = (0, import_react.useState)("all");
	const [board, setBoard] = (0, import_react.useState)("all");
	const [target, setTarget] = (0, import_react.useState)(null);
	const merged = (0, import_react.useMemo)(() => {
		return [...msk.flags, ...ins.flags].filter((f) => {
			if (board !== "all" && (f.board ?? "toilet") !== board) return false;
			if (kind !== "all" && f.kind !== kind) return false;
			return true;
		});
	}, [
		ins.flags,
		msk.flags,
		kind,
		board
	]);
	const counts = Object.fromEntries(KINDS.map((k) => [k, k === "all" ? msk.flags.length + ins.flags.length : [...msk.flags, ...ins.flags].filter((f) => f.kind === k).length]));
	const filtered = kind !== "all" || board !== "all";
	function openFlag(flag) {
		if (flag.board !== "msk" || flag.activitySeq == null) return;
		const cell = findMskCell(site, flag.floorCode, towerFromFlag(flag.toiletCode), flag.activitySeq);
		if (cell) setTarget(cell);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold uppercase tracking-wide",
				children: "Problems"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-xl text-sm text-ink-soft",
				children: "Tap an MSK row to type the new %. Problems list the live skipped floor per package, not every old 0%."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "chip-scroll sm:flex-wrap sm:overflow-visible",
				children: [
					"all",
					"msk",
					"toilet"
				].map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: board === b ? "default" : "outline",
					onClick: () => setBoard(b),
					children: b === "all" ? "Both boards" : b === "msk" ? "MSK" : "Toilets"
				}, b))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "chip-scroll sm:flex-wrap sm:overflow-visible",
				children: KINDS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: kind === k ? "default" : "outline",
					className: "shrink-0",
					onClick: () => setKind(k),
					children: [
						k === "unverified" ? "sub check" : k,
						" · ",
						counts[k]
					]
				}, k))
			}),
			merged.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: filtered ? Inbox : CircleCheck,
				title: filtered ? "Nothing in this filter" : "All clear",
				hint: filtered ? "Try another chip, or both boards." : "No live problems on the board for this date.",
				action: filtered ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "outline",
					onClick: () => {
						setKind("all");
						setBoard("all");
					},
					children: "Clear filters"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "outline",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/msk",
						children: "Open MSK board"
					})
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: merged.slice(0, 80).map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IssueRow, {
					flag: f,
					onOpen: () => openFlag(f)
				}, f.id))
			}),
			merged.length > 80 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted",
				children: [
					"Showing 80 of ",
					merged.length,
					". Tighten the filter."
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UpdateMskDialog, {
				open: !!target,
				onOpenChange: (v) => !v && setTarget(null),
				target,
				crew: siteCrewGrouped(site.crew).all
			})
		]
	});
}
function IssueRow({ flag, onOpen }) {
	const ping = pingForKind(flag.kind);
	const canEdit = flag.board === "msk" && flag.activitySeq != null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: onOpen,
		disabled: !canEdit,
		className: cn("w-full rounded-xl bg-panel px-4 py-3 text-left shadow-docket transition-[background-color,transform] duration-150 ease-out", canEdit ? "min-h-14 hover:bg-sheet active:scale-[0.99]" : "cursor-default"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: flag.severity === "high" ? "miss" : flag.severity === "medium" ? "risk" : "ink",
						children: flag.kind
					}),
					flag.board ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: flag.board === "msk" ? "MSK" : "Toilet" }) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("font-display text-[11px] uppercase tracking-[0.14em]", flag.severity === "high" && "text-stamp"),
						children: flag.severity
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "ml-auto font-mono text-[11px] text-muted",
						children: [flag.floorCode, flag.toiletCode ? ` ${flag.toiletCode}` : ""]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm font-medium",
				children: flag.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-ink-soft",
				children: flag.detail
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1.5 font-display text-[11px] uppercase tracking-[0.12em] text-accent",
				children: [
					canEdit ? "Tap to update · " : null,
					"Ping ",
					ping.names,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-2 font-sans text-[10px] font-normal normal-case tracking-normal text-muted",
						children: ping.title
					})
				]
			})
		]
	}) });
}
//#endregion
export { IssuesPage as component };
