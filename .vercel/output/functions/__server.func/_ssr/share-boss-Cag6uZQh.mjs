import { o as __toESM } from "../_runtime.mjs";
import { a as formatStamp, n as cn } from "./utils-DyetTdWh.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as SIGN_OFF, n as COMPANY, o as companyLine } from "./company-BVHhciP6.mjs";
import { S as Globe, d as Printer, g as Mail, m as MessageCircle, s as Share2, v as Link2, w as Copy } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as Label, S as Input, T as Button, _ as DialogContent, b as DialogTrigger, g as Dialog, v as DialogDescription, y as DialogTitle } from "./router-DCeeEZYX.mjs";
import { n as CLAIM, v as claimPct, x as formatRm } from "./domain-B9hSVQhA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/share-boss-Cag6uZQh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var BOSSES = [
	{
		id: "khairul",
		name: "Khairul",
		title: "Engineer / Manager",
		line: "For approval"
	},
	{
		id: "alvin",
		name: "Alvin",
		title: "Site Supervisor",
		line: "Site desk"
	},
	{
		id: "ahfat",
		name: "Ah Fat",
		title: "Director",
		line: "For information"
	},
	{
		id: "james",
		name: "James Wong",
		title: "CEO",
		line: "For information"
	},
	{
		id: "zilla",
		name: "Zilla",
		title: "Purchaser",
		line: "Material"
	},
	{
		id: "farah",
		name: "Farah",
		title: "Documentation",
		line: "Papers"
	},
	{
		id: "jenny",
		name: "Jenny",
		title: "Accounts",
		line: "Claim / pay"
	}
];
var CONTACT_KEY = "gm-boss-contacts";
function loadBossContacts() {
	try {
		const raw = localStorage.getItem(CONTACT_KEY);
		if (!raw) return {};
		const parsed = JSON.parse(raw);
		return parsed && typeof parsed === "object" ? parsed : {};
	} catch {
		return {};
	}
}
function saveBossContact(id, contact) {
	const all = loadBossContacts();
	all[id] = contact;
	localStorage.setItem(CONTACT_KEY, JSON.stringify(all));
}
function waDigits(raw) {
	const d = raw.replace(/\D/g, "");
	if (!d) return "";
	if (d.startsWith("60")) return d;
	if (d.startsWith("0")) return `60${d.slice(1)}`;
	return d;
}
function hodPageUrl() {
	if (typeof window === "undefined") return "/hod";
	return `${window.location.origin}/hod`;
}
function bossSubject(asOf, boss) {
	return `${COMPANY.short} · ${COMPANY.project} MSK · ${formatStamp(asOf)} · ${boss.line} ${boss.name}`;
}
function bossBriefText(opts) {
	const { asOf, boss, ins, msk, stats } = opts;
	const holes = msk.flags.filter((f) => f.kind === "hole").length;
	const waiting = ins.flags.filter((f) => f.kind === "waiting").length;
	const lies = [...ins.flags, ...msk.flags].filter((f) => f.kind === "lie").length;
	const unverified = ins.pendingByCell.size + msk.pendingByCell.size;
	const problems = [...msk.flags, ...ins.flags].slice(0, 6).map((f) => `- ${f.title}: ${f.detail}`);
	const sign = SIGN_OFF.map((s) => `${s.role}: ${s.names}`).join("\n");
	const claimLine = `PC${CLAIM.no} evaluation claim to client · certified ${formatStamp(CLAIM.date)} · RM ${formatRm(CLAIM.thisClaim)} (${claimPct(CLAIM.workDone, CLAIM.contract)}% lock)`;
	const extra = stats ? [
		stats.claimDraft ? `Next claim: ${stats.claimDraft} draft (Jenny)` : "",
		stats.poOpen ? `PO still open: ${stats.poOpen}` : "",
		stats.advancesOpen ? `Salary advance open: ${stats.advancesOpen}` : ""
	].filter(Boolean) : [];
	return [
		companyLine().toUpperCase(),
		`${COMPANY.project} · MSK plumbing · ${COMPANY.towers}`,
		`As of ${formatStamp(asOf)}`,
		"",
		`ATTN: ${boss.name.toUpperCase()}  (${boss.title})`,
		boss.line,
		"",
		`TOWER LOCK L13–31M  ${msk.weightedAvg}%`,
		`Cold water ${msk.tradeAvg.CW}%  ·  Sanitary ${msk.tradeAvg.SAN}%  ·  Irrigation ${msk.tradeAvg.IRR}%`,
		`Tower A ${msk.towerAvg.A}%  ·  Tower B ${msk.towerAvg.B}%`,
		`Toilet fittings (section 1 only)  ${ins.gmSectionAvg}%`,
		"",
		claimLine,
		...extra,
		"",
		"NEED YOUR EYE",
		`- Skipped floors: ${holes}`,
		`- Waiting on other trades: ${waiting}`,
		`- Sub updates waiting GM check: ${unverified}`,
		`- Truth flags (no photo / reversed): ${lies}`,
		"",
		"PROBLEMS",
		problems.length ? problems.join("\n") : "- None flagged on the GM board",
		"",
		sign,
		"",
		"Prepared by Gelaran Maju site desk. Photo truth-check on Today. Lock is from the board."
	].filter((line) => line !== void 0).join("\n");
}
function bossSharePayload(opts) {
	const subject = bossSubject(opts.asOf, opts.boss);
	const site = hodPageUrl();
	return {
		subject,
		text: `${bossBriefText(opts)}\n\nOpen the website:\n${site}`,
		site
	};
}
function ShareBoss({ compose }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [bossId, setBossId] = (0, import_react.useState)("khairul");
	const boss = BOSSES.find((b) => b.id === bossId) ?? BOSSES[0];
	const payload = compose(boss);
	const { subject, text } = payload;
	const site = payload.site ?? hodPageUrl();
	const [phone, setPhone] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const saved = loadBossContacts()[bossId];
		setPhone(saved?.phone ?? "");
		setEmail(saved?.email ?? "");
	}, [open, bossId]);
	function persist(nextPhone = phone, nextEmail = email) {
		saveBossContact(bossId, {
			phone: nextPhone,
			email: nextEmail
		});
	}
	function onWhatsApp() {
		persist();
		const digits = waDigits(phone);
		const q = encodeURIComponent(text);
		const href = digits ? `https://wa.me/${digits}?text=${q}` : `https://wa.me/?text=${q}`;
		window.open(href, "_blank", "noopener,noreferrer");
		toast.success(digits ? `WhatsApp to ${boss.name}` : "WhatsApp opened — pick the chat");
	}
	function onEmail() {
		persist();
		const href = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
		window.location.href = href;
		toast.success(email ? `Email to ${boss.name}` : "Email draft opened");
	}
	async function onCopy() {
		try {
			await navigator.clipboard.writeText(text);
			toast.success("Copied — paste on WhatsApp");
		} catch {
			toast.error("Could not copy. Use WhatsApp or Print.");
		}
	}
	async function onCopySite() {
		try {
			await navigator.clipboard.writeText(site);
			toast.success("Website link copied");
		} catch {
			toast.error("Could not copy the website link.");
		}
	}
	function onOpenSite() {
		window.open(site, "_blank", "noopener,noreferrer");
	}
	async function onShareSheet() {
		try {
			if (typeof navigator.share !== "function") {
				await onCopy();
				return;
			}
			await navigator.share({
				title: subject,
				text,
				url: site
			});
		} catch (err) {
			if (err instanceof Error && err.name === "AbortError") return;
			await onCopy();
		}
	}
	function onPrint() {
		setOpen(false);
		window.setTimeout(() => window.print(), 80);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				className: "w-full min-h-11 sm:w-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, {}), " Share"]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Send to colleagues" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Pick who. Copy the website link or WhatsApp the brief. Same lock they see on this phone." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid grid-cols-2 gap-1.5",
				children: BOSSES.map((b) => {
					const on = b.id === bossId;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setBossId(b.id),
						className: cn("min-h-11 rounded-lg px-3 py-2 text-left transition-colors duration-150", on ? "bg-ink text-paper" : "bg-paper-2 hover:bg-line"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-sm font-semibold uppercase tracking-wide",
							children: b.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: cn("text-[11px]", on ? "text-paper/70" : "text-muted"),
							children: [
								b.title,
								" · ",
								b.line
							]
						})]
					}, b.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "boss-phone",
					children: "WhatsApp no."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "boss-phone",
					className: "mt-1",
					inputMode: "tel",
					placeholder: "012 345 6789",
					value: phone,
					onChange: (e) => setPhone(e.target.value),
					onBlur: () => persist()
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "boss-email",
					children: "Email"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "boss-email",
					className: "mt-1",
					type: "email",
					placeholder: "optional",
					value: email,
					onChange: (e) => setEmail(e.target.value),
					onBlur: () => persist()
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-[11px] text-muted",
				children: "Saved on this phone. Leave blank to pick the chat yourself."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 truncate rounded-lg bg-paper-2 px-3 py-2 font-mono text-[11px] text-ink-soft",
				children: site
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: "mt-3 max-h-40 overflow-auto whitespace-pre-wrap rounded-lg bg-paper-2 px-3 py-2 font-sans text-xs leading-relaxed text-ink-soft",
				children: text
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid grid-cols-2 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "min-h-11",
						onClick: onWhatsApp,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {}), " WhatsApp"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "min-h-11",
						variant: "outline",
						onClick: onOpenSite,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, {}), " Open website"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "min-h-11",
						variant: "outline",
						onClick: () => void onCopySite(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, {}), " Copy website"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "min-h-11",
						variant: "outline",
						onClick: () => void onCopy(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {}), " Copy brief"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "min-h-11",
						variant: "outline",
						onClick: onEmail,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {}), " Email"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "min-h-11",
						variant: "outline",
						onClick: onPrint,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, {}), " Print pack"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				className: "mt-2 w-full min-h-11",
				variant: "ghost",
				onClick: () => void onShareSheet(),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, {}), " Phone share sheet"]
			})
		] })]
	});
}
//#endregion
export { bossSharePayload as n, ShareBoss as t };
