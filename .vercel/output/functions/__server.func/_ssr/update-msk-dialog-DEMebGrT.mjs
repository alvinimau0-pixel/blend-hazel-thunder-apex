import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as Label, T as Button, _ as DialogContent, g as Dialog, h as Spinner, u as useAsOf, v as DialogDescription, w as Textarea, y as DialogTitle } from "./router-DCeeEZYX.mjs";
import { A as siteCrewGrouped, p as TRADE_LABEL } from "./domain-B9hSVQhA.mjs";
import { n as useSiteMutations } from "./use-site-C4IwY3aB.mjs";
import { t as AddPicture } from "./add-picture-CZKih--a.mjs";
import { a as withScopeNote, i as tenantOutlets, n as WhoDidThis, r as scopeFromTrade, t as PctPicker } from "./who-did-NTzE6JqS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/update-msk-dialog-DEMebGrT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function UpdateMskDialog({ open, onOpenChange, target, crew }) {
	const { asOf } = useAsOf();
	const { updateMsk } = useSiteMutations();
	const [pct, setPct] = (0, import_react.useState)(0);
	const [crewId, setCrewId] = (0, import_react.useState)(crew[0]?.id ?? 0);
	const [scope, setScope] = (0, import_react.useState)("SAN");
	const [note, setNote] = (0, import_react.useState)("");
	const [photo, setPhoto] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (target) {
			setPct(target.pct);
			setNote("");
			setPhoto(null);
			const listed = siteCrewGrouped(crew).all;
			const match = target.item.seq === 9 && listed.find((c) => c.callsign === "Aipoon") || listed.find((c) => c.trade.toLowerCase().includes(target.item.shortName.split(" ")[0]?.toLowerCase() ?? "")) || listed[0];
			if (match) {
				setCrewId(match.id);
				setScope(scopeFromTrade(match.trade, target.item.trade));
			} else setScope(scopeFromTrade("", target.item.trade));
		}
	}, [target, crew]);
	const sub = crew.find((c) => c.id === crewId)?.contractor === "SUB";
	const warnings = (0, import_react.useMemo)(() => {
		if (!target) return [];
		const list = [];
		const jump = pct - target.pct;
		if (pct < target.pct) list.push("Progress went backwards. That will be flagged.");
		if ((jump >= 30 || pct >= 100) && !photo) list.push(sub ? "Big jump with no photo. Sub update waits for GM check — not the client claim." : "Big jump with no photo. It still goes on the board — attach a photo so nobody can lie.");
		if (sub) list.push("Sub update: board will not move until GM checks it. This is not the PC claim to the client.");
		return list;
	}, [
		target,
		pct,
		photo,
		sub
	]);
	function submit() {
		if (!target) return;
		if (!crewId) {
			toast.error("Pick who did the work");
			return;
		}
		setBusy(true);
		updateMsk.mutate({
			levelId: target.level.id,
			tower: target.tower,
			itemId: target.item.id,
			pct,
			crewId,
			note: withScopeNote(note, scope),
			photoData: photo || void 0,
			workDate: asOf
		}, {
			onSuccess: () => toast.success(sub ? "Saved. Waiting GM check — not the client claim." : "On the board."),
			onError: (err) => toast.error(err instanceof Error ? err.message : "Update failed"),
			onSettled: () => setBusy(false)
		});
		onOpenChange(false);
	}
	if (!target) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Log MSK progress" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
				target.level.code,
				" Tower ",
				target.tower,
				" · ",
				target.item.name
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg bg-paper-2 px-3 py-2 text-xs text-ink-soft",
						children: [
							TRADE_LABEL[target.item.trade],
							" · now ",
							target.na ? "N/A" : `${target.pct}%`,
							" · FFL ",
							target.level.ffl,
							target.na ? " · Sheet marked N/A. Save will put this cell on the lock." : target.pct === 0 ? target.item.seq === 9 ? " · This floor is open. Type any % — 33 is 4 of 12 outlets." : " · This floor is open. Type any %." : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PctPicker, {
						value: pct,
						onChange: setPct,
						outlets: tenantOutlets(target.item.seq)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhoDidThis, {
						crew,
						crewId,
						onCrewId: setCrewId,
						scope,
						onScope: setScope,
						preferSubs: target.item.seq === 9,
						idPrefix: "msk-who"
					}),
					warnings.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-1 rounded-lg bg-cell-risk/60 px-3 py-2 text-xs text-cell-risk-ink",
						children: warnings.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: w }, w))
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "min-h-11",
						onClick: () => void submit(),
						disabled: busy,
						children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}), " Saving…"] }) : "Save progress"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "msk-note",
						children: "What was done"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "msk-note",
						className: "mt-1",
						value: note,
						onChange: (e) => setNote(e.target.value),
						placeholder: "Short site note. Floor, package, what finished."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Photo evidence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddPicture, {
							value: photo,
							onChange: setPhoto,
							needed: (pct - (target?.pct ?? 0) >= 30 || pct >= 100) && !photo
						})
					})] })
				]
			})
		] })
	});
}
//#endregion
export { UpdateMskDialog as t };
