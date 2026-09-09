import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { F as useOpsActions } from "./router-DCeeEZYX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-auto-report-Xu5iykPX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var KEY = "gm-auto-report-v1";
var GAP_MS = 6e5;
function useAutoReport(asOf) {
	const { publishDay } = useOpsActions();
	const [on, setOn] = (0, import_react.useState)(() => {
		if (typeof window === "undefined") return true;
		return window.localStorage.getItem(KEY) !== "off";
	});
	const [lastAt, setLastAt] = (0, import_react.useState)(null);
	const lastRun = (0, import_react.useRef)(0);
	const pending = (0, import_react.useRef)(false);
	const mutateRef = (0, import_react.useRef)(publishDay.mutate);
	mutateRef.current = publishDay.mutate;
	(0, import_react.useEffect)(() => {
		window.localStorage.setItem(KEY, on ? "on" : "off");
	}, [on]);
	(0, import_react.useEffect)(() => {
		if (!on) return;
		const run = () => {
			const now = Date.now();
			if (pending.current) return;
			if (now - lastRun.current < GAP_MS && lastRun.current !== 0) return;
			pending.current = true;
			lastRun.current = now;
			mutateRef.current(asOf, {
				onSettled: () => {
					pending.current = false;
				},
				onSuccess: () => setLastAt(Date.now())
			});
		};
		run();
		const id = window.setInterval(run, GAP_MS);
		const onFocus = () => run();
		window.addEventListener("focus", onFocus);
		return () => {
			window.clearInterval(id);
			window.removeEventListener("focus", onFocus);
		};
	}, [on, asOf]);
	return {
		on,
		setOn,
		lastAt,
		publishing: publishDay.isPending,
		publishNow: () => publishDay.mutate(asOf, { onSuccess: () => setLastAt(Date.now()) })
	};
}
function formatPulled(ms) {
	if (!ms) return "not yet";
	return new Date(ms).toLocaleTimeString("en-GB", {
		hour: "2-digit",
		minute: "2-digit",
		timeZone: "Asia/Kuala_Lumpur"
	});
}
//#endregion
export { useAutoReport as n, formatPulled as t };
