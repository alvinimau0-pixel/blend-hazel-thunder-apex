import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { T as Button, u as useAsOf, w as Textarea } from "./router-DCeeEZYX.mjs";
import { g as buildMskInsights, h as buildInsights } from "./domain-B9hSVQhA.mjs";
import { t as SiteGate } from "./site-gate-DjT4Gwiq.mjs";
import { n as ClaimPictures } from "./add-picture-CZKih--a.mjs";
import { n as AryanGaji, t as AipoonGaji } from "./aryan-gaji-GbOMCAxK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sub-claim-DHAM7Xbd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KEY = "gm-sub-claim-pack-v1";
var SUB_CLAIM_NAMES = [
	"Aipoon",
	"Aryan",
	"Kolik"
];
function empty() {
	return {
		Aipoon: {
			name: "Aipoon",
			note: "",
			photos: []
		},
		Aryan: {
			name: "Aryan",
			note: "",
			photos: []
		},
		Kolik: {
			name: "Kolik",
			note: "",
			photos: []
		}
	};
}
function loadSubClaimPacks() {
	if (typeof window === "undefined") return empty();
	try {
		const raw = window.localStorage.getItem(KEY);
		if (!raw) return empty();
		const parsed = JSON.parse(raw);
		const base = empty();
		for (const name of SUB_CLAIM_NAMES) {
			const row = parsed[name];
			if (!row) continue;
			base[name] = {
				name,
				note: String(row.note ?? ""),
				photos: Array.isArray(row.photos) ? row.photos.filter((x) => typeof x === "string") : []
			};
		}
		return base;
	} catch {
		return empty();
	}
}
function saveSubClaimPack(pack) {
	const all = loadSubClaimPacks();
	all[pack.name] = {
		...pack,
		photos: pack.photos.slice(0, 8)
	};
	window.localStorage.setItem(KEY, JSON.stringify(all));
}
function SubClaimPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteGate, { children: (site) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubClaimBody, { site }) });
}
function SubClaimBody({ site }) {
	const { asOf } = useAsOf();
	const msk = buildMskInsights(site, asOf);
	const ins = buildInsights(site, asOf);
	const pending = msk.pendingByCell.size + ins.pendingByCell.size;
	const [showGaji, setShowGaji] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-[11px] uppercase tracking-[0.2em] text-muted",
					children: "More · not the client PC"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-3xl font-semibold uppercase tracking-wide",
					children: "Sub claim"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 max-w-lg text-sm text-ink-soft",
					children: [
						"Aipoon, Aryan, Kolik only. Write a note, add or remove pictures, save. Client PC is",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/eval-claim",
							className: "uppercase tracking-[0.12em] text-accent",
							children: "Evaluation claim"
						}),
						"."
					]
				})
			] }),
			pending > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "rounded-lg bg-stamp/10 px-3 py-2 text-sm text-stamp",
				children: [pending, " waiting GM check — not on the lock yet."]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4",
				children: SUB_CLAIM_NAMES.map((name) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubPackCard, { name }, name))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "text-sm text-accent underline-offset-4 hover:underline",
				onClick: () => setShowGaji((v) => !v),
				children: showGaji ? "Hide gaji cards" : "Show Aipoon / Aryan gaji"
			}),
			showGaji ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AipoonGaji, { site }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AryanGaji, { site })] }) : null
		]
	});
}
function SubPackCard({ name }) {
	const [pack, setPack] = (0, import_react.useState)(() => loadSubClaimPacks()[name]);
	function save() {
		saveSubClaimPack(pack);
		toast.success(`${name} saved`);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "space-y-3 rounded-xl bg-panel p-4 shadow-docket sm:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl uppercase tracking-wide",
					children: name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					onClick: save,
					children: "Save"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				rows: 3,
				value: pack.note,
				placeholder: "What this check covers",
				onChange: (e) => setPack({
					...pack,
					note: e.target.value
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClaimPictures, {
				photos: pack.photos,
				onChange: (photos) => setPack({
					...pack,
					photos
				})
			})
		]
	});
}
//#endregion
export { SubClaimPage as component };
