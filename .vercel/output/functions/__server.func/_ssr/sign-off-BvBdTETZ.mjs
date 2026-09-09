import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as SIGN_OFF } from "./company-BVHhciP6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sign-off-BvBdTETZ.js
var import_jsx_runtime = require_jsx_runtime();
function SignOff({ compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "font-display text-[11px] uppercase tracking-[0.18em] text-muted",
		children: "Sign-off"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: compact ? "mt-2 space-y-2" : "mt-3 grid gap-3 sm:grid-cols-3",
		children: SIGN_OFF.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-[10px] uppercase tracking-[0.16em] text-muted",
					children: row.role
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-display text-base font-semibold uppercase leading-tight tracking-wide",
					children: row.names
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] text-ink-soft",
					children: row.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-4 border-b border-ink/70" })
			]
		}, row.role))
	})] });
}
//#endregion
export { SignOff as t };
