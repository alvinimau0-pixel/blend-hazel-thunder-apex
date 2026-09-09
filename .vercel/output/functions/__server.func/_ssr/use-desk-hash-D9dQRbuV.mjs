import { d as useRouterState, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { M as parseHash } from "./router-DCeeEZYX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-desk-hash-D9dQRbuV.js
function useDeskHash(allowed, fallback) {
	const navigate = useNavigate();
	const hash = useRouterState({ select: (s) => s.location.hash });
	const value = parseHash(hash, allowed, fallback);
	function set(next) {
		navigate({
			to: ".",
			hash: next,
			replace: true
		});
	}
	return [value, set];
}
//#endregion
export { useDeskHash as t };
