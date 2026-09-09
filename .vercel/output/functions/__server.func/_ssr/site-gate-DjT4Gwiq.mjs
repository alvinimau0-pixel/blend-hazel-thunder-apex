import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { d as BoardSkeleton, m as ErrorState } from "./router-DCeeEZYX.mjs";
import { t as useSite } from "./use-site-C4IwY3aB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-gate-DjT4Gwiq.js
var import_jsx_runtime = require_jsx_runtime();
function SiteGate({ children, live }) {
	const q = useSite({ live });
	if (q.isLoading && !q.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoardSkeleton, {});
	if (!q.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
		title: "Board unavailable",
		hint: q.error instanceof Error ? q.error.message : "Could not load sequencing data.",
		onRetry: () => void q.refetch()
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: children(q.data) });
}
//#endregion
export { SiteGate as t };
