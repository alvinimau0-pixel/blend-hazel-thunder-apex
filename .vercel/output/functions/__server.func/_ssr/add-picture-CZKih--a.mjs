import { n as cn } from "./utils-DyetTdWh.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { A as Camera, t as X, x as Images } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { T as photoList } from "./domain-B9hSVQhA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/add-picture-CZKih--a.js
var import_jsx_runtime = require_jsx_runtime();
async function compressImage(file, max = 480) {
	const bitmap = await createImageBitmap(file);
	const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
	const w = Math.max(1, Math.round(bitmap.width * scale));
	const h = Math.max(1, Math.round(bitmap.height * scale));
	const canvas = document.createElement("canvas");
	canvas.width = w;
	canvas.height = h;
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Canvas unavailable");
	ctx.drawImage(bitmap, 0, 0, w, h);
	bitmap.close();
	return canvas.toDataURL("image/jpeg", .62);
}
function PhotoStrip({ urls, labels }) {
	if (urls.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: cn("grid gap-2", urls.length > 1 ? "grid-cols-2" : "grid-cols-1"),
		children: urls.map((src, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src,
			alt: labels?.[i] ?? "",
			loading: "lazy",
			decoding: "async",
			className: "h-28 w-full rounded-md object-cover"
		}), labels?.[i] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-[11px] uppercase text-muted",
			children: labels[i]
		}) : null] }, `${src}-${i}`))
	});
}
function ClaimPictures({ photos, onChange, max = 8 }) {
	async function onFile(file) {
		if (!file) return;
		if (photos.length >= max) {
			toast.error(`Max ${max} pictures`);
			return;
		}
		try {
			onChange([...photos, await compressImage(file)]);
		} catch {
			toast.error("Could not read photo");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-line bg-paper-2 px-3 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-4 shrink-0" }),
					"Take picture",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "file",
						accept: "image/*",
						capture: "environment",
						className: "sr-only",
						onChange: (e) => void onFile(e.target.files?.[0])
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-line bg-paper-2 px-3 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Images, { className: "size-4 shrink-0" }),
					"From album",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "file",
						accept: "image/*",
						className: "sr-only",
						onChange: (e) => void onFile(e.target.files?.[0])
					})
				]
			})]
		}), photos.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid grid-cols-2 gap-2 sm:grid-cols-3",
			children: photos.map((src, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src,
					alt: "",
					className: "h-28 w-full rounded-md object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "absolute right-1 top-1 flex size-8 items-center justify-center rounded-full bg-ink text-paper",
					onClick: () => onChange(photos.filter((_, j) => j !== i)),
					"aria-label": "Remove picture",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
				})]
			}, `${i}-${src.slice(-12)}`))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[12px] text-muted",
			children: "No pictures yet."
		})]
	});
}
function AddPicture({ value, onChange, needed = false, existing = null }) {
	async function onFile(file) {
		if (!file) return;
		try {
			onChange(await compressImage(file));
		} catch {
			toast.error("Could not read photo");
		}
	}
	const kept = photoList(existing);
	const shownNew = value && value !== "seed-photo" ? value : null;
	const hasAny = kept.length > 0 || !!shownNew;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: cn("flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed px-3 text-sm", needed && !hasAny ? "border-stamp bg-stamp/10 text-stamp" : "border-line bg-paper-2"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-4 shrink-0" }),
						"Take picture",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "file",
							accept: "image/*",
							capture: "environment",
							className: "sr-only",
							onChange: (e) => void onFile(e.target.files?.[0])
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-line bg-paper-2 px-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Images, { className: "size-4 shrink-0" }),
						"From album",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "file",
							accept: "image/*",
							className: "sr-only",
							onChange: (e) => void onFile(e.target.files?.[0])
						})
					]
				})]
			}),
			needed && !hasAny ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[12px] text-stamp",
				children: "Photo needed for this jump."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoStrip, { urls: kept }),
			shownNew ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: shownNew,
				alt: "",
				className: "h-28 w-full rounded-md object-cover sm:max-w-xs"
			}) : null
		]
	});
}
//#endregion
export { ClaimPictures as n, AddPicture as t };
