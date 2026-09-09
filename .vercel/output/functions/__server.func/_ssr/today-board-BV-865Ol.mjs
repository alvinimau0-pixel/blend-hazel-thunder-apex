import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as NOW_SCOPE } from "./work-scope-DwH38QaA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/today-board-BV-865Ol.js
var import_jsx_runtime = require_jsx_runtime();
function TodayBoard({ who = "all" }) {
	const rows = NOW_SCOPE.filter((row) => who === "sub" ? row.kind === "sub" : who === "gm" ? row.kind === "gm" : true);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-xl bg-panel p-4 shadow-docket sm:p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl uppercase tracking-wide",
					children: "Now on site"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-[12px] text-muted",
					children: "Current scope only. GM workers are on the board. Subs are listed, not auto-assigned."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 divide-y divide-line",
					children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-col gap-0.5 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-display text-sm font-semibold uppercase tracking-wide",
							children: [row.who, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-2 font-sans text-[11px] font-normal normal-case tracking-normal text-muted",
								children: row.kind === "sub" ? "Sub" : "GM"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-ink",
							children: row.work
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-md text-[12px] text-ink-soft sm:text-right",
							children: row.detail
						})]
					}, `${row.kind}-${row.who}-${row.work}`))
				})
			]
		})
	});
}
//#endregion
export { TodayBoard as t };
