import { n as cn } from "./utils-DyetTdWh.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { f as STATUS_LABEL } from "./domain-B9hSVQhA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/legend-ClU1Syvp.js
var import_jsx_runtime = require_jsx_runtime();
var TONE = {
	done: "bg-cell-done",
	missed: "bg-cell-miss",
	risk: "bg-cell-risk",
	track: "border border-line bg-panel"
};
function Legend({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: cn("flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.12em] text-muted", className),
		children: Object.keys(STATUS_LABEL).map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex items-center gap-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-3 rounded-[2px]", TONE[k]) }), STATUS_LABEL[k]]
		}, k))
	});
}
function cellTone(status) {
	switch (status) {
		case "done": return "bg-cell-done text-cell-done-ink";
		case "missed": return "bg-cell-miss text-cell-miss-ink";
		case "risk": return "bg-cell-risk text-cell-risk-ink";
		default: return "bg-cell-track text-cell-track-ink";
	}
}
//#endregion
export { cellTone as n, Legend as t };
