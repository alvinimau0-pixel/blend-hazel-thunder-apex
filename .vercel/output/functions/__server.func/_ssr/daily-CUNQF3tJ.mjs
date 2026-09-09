import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as SiteGate } from "./site-gate-DjT4Gwiq.mjs";
import { t as TodayBoard } from "./today-board-BV-865Ol.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/daily-CUNQF3tJ.js
var import_jsx_runtime = require_jsx_runtime();
function DailyPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteGate, { children: (site) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-semibold uppercase tracking-wide",
			children: "Daily update"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 max-w-md text-sm text-ink-soft",
			children: "GM save writes the board. Same as Daily update on the home page."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TodayBoard, {
			site,
			who: "gm"
		})]
	}) });
}
//#endregion
export { DailyPage as component };
