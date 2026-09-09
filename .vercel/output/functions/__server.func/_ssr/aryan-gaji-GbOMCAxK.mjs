import { o as __toESM } from "../_runtime.mjs";
import { a as formatStamp, n as cn } from "./utils-DyetTdWh.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as REPORT_DATE } from "./company-BVHhciP6.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { T as Button, l as Letterhead, x as Badge } from "./router-DCeeEZYX.mjs";
import { S as hasRealPhoto, T as photoList, x as formatRm } from "./domain-B9hSVQhA.mjs";
import { n as useSiteMutations } from "./use-site-C4IwY3aB.mjs";
import { t as AddPicture } from "./add-picture-CZKih--a.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/aryan-gaji-GbOMCAxK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Official GAJI AIPOON SUBS.xlsx rates. Work now L24–L30 both towers (Alvin 2 Sep). */
var AIPOON_GAJI = {
	name: "Aipoon",
	dated: "2026-08-12",
	po: "PO6706",
	title: "UPVC toilet + tenant L24–L30 · both towers",
	floors: [
		"L24",
		"L25",
		"L26",
		"L27",
		"L28",
		"L29",
		"L30"
	],
	toiletGross: {
		L24: 5800,
		L25: 5800,
		L26: 5800,
		L27: 5800,
		L28: 5800,
		L29: 5800,
		L30: 5800
	},
	toiletGrossTotal: 40600,
	toiletFinal: 32e3,
	tenantGrossPerLevel: 1440,
	tenantGrossTotal: 10080,
	tenantFinal: 1e4,
	grandTotal: 42e3,
	perLevel: 6e3,
	packages: [{
		id: "toilet",
		seq: 11,
		label: "Toilet + stack",
		points: "Basin 7 · Floor trap 16 · Urinal 3 · Stack 3 · RM50 / point"
	}, {
		id: "tenant",
		seq: 9,
		label: "Tenant + hosereel + stack",
		points: "Floor 12 · Basin 12 · Hosereel 12 · Stack 12 · RM30 / point"
	}]
};
/** One tower-cell share so both towers sum to the sheet total. */
function aipoonLabourRate(pkg, level) {
	if (pkg === "tenant") return AIPOON_GAJI.tenantFinal / AIPOON_GAJI.floors.length / 2;
	return (AIPOON_GAJI.toiletGross[level] ?? 0) * AIPOON_GAJI.toiletFinal / AIPOON_GAJI.toiletGrossTotal / 2;
}
function buildAipoonGaji(site) {
	const itemBySeq = new Map(site.mskItems.map((i) => [i.seq, i]));
	const levelByCode = new Map(site.mskLevels.map((l) => [l.code, l]));
	const cellMap = /* @__PURE__ */ new Map();
	for (const p of site.mskProgress) cellMap.set(`${p.levelId}:${p.tower}:${p.itemId}`, {
		pct: p.pct,
		na: p.na
	});
	const packages = AIPOON_GAJI.packages.map((pkg) => {
		const item = itemBySeq.get(pkg.seq);
		const cells = [];
		let labourTotal = 0;
		let earned = 0;
		let doneFloors = 0;
		for (const code of AIPOON_GAJI.floors) {
			const level = levelByCode.get(code);
			const rate = aipoonLabourRate(pkg.id, code);
			for (const tower of ["A", "B"]) {
				labourTotal += rate;
				let pct = 0;
				if (item && level) {
					const c = cellMap.get(`${level.id}:${tower}:${item.id}`);
					pct = !c || c.na ? 0 : c.pct;
				}
				const pay = pct / 100 * rate;
				earned += pay;
				if (pct >= 100) doneFloors += 1;
				cells.push({
					level: code,
					tower,
					pct,
					labour: rate,
					earned: pay
				});
			}
		}
		return {
			id: pkg.id,
			seq: pkg.seq,
			label: pkg.label,
			points: pkg.points,
			cells,
			labourTotal,
			earned,
			doneFloors,
			floorCount: AIPOON_GAJI.floors.length * 2
		};
	});
	const labourTotal = packages.reduce((s, p) => s + p.labourTotal, 0);
	const earned = packages.reduce((s, p) => s + p.earned, 0);
	return {
		packages,
		labourTotal,
		earned,
		pct: labourTotal <= 0 ? 0 : Math.round(earned / labourTotal * 100)
	};
}
function AipoonGaji({ site }) {
	const gaji = buildAipoonGaji(site);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "print-sheet space-y-4 rounded-xl bg-panel p-4 shadow-docket sm:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-3 hidden print-only",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Letterhead, { asOf: AIPOON_GAJI.dated })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-[11px] uppercase tracking-[0.16em] text-muted",
						children: [
							"Sub gaji · ",
							formatStamp(AIPOON_GAJI.dated),
							" · ",
							AIPOON_GAJI.po
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-display text-2xl uppercase tracking-wide",
						children: "Aipoon"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 max-w-md text-sm text-ink-soft",
						children: [AIPOON_GAJI.title, ". Labour from the point sheet. Not the client PC."]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-right",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-display text-4xl font-semibold tabular-nums",
							children: [formatRm(gaji.earned), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-lg text-muted",
								children: " RM"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[12px] text-muted",
							children: [
								"of RM ",
								formatRm(gaji.labourTotal),
								" · ",
								gaji.pct,
								"%"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							className: "mt-2 no-print",
							onClick: () => window.print(),
							children: "Print"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-3",
				children: gaji.packages.map((pkg) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-lg bg-paper-2 p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-sm uppercase tracking-wide",
								children: pkg.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								tone: pkg.earned >= pkg.labourTotal ? "done" : pkg.earned > 0 ? "risk" : "track",
								children: [
									pkg.doneFloors,
									"/",
									pkg.floorCount
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 text-[11px] text-muted",
							children: pkg.points
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 font-display text-xl font-semibold tabular-nums",
							children: [
								"RM ",
								formatRm(pkg.earned),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm font-normal text-muted",
									children: [" / ", formatRm(pkg.labourTotal)]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-3 grid grid-cols-2 gap-x-2 gap-y-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "text-[10px] uppercase tracking-[0.12em] text-muted",
									children: "TA"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "text-[10px] uppercase tracking-[0.12em] text-muted",
									children: "TB"
								}),
								AIPOON_GAJI.floors.map((code) => {
									const a = pkg.cells.find((c) => c.level === code && c.tower === "A");
									const b = pkg.cells.find((c) => c.level === code && c.tower === "B");
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "col-span-2 grid grid-cols-[2.2rem_1fr_1fr] items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-display text-[11px] uppercase",
												children: code
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloorPct$1, { pct: a?.pct ?? 0 }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloorPct$1, { pct: b?.pct ?? 0 })
										]
									}, code);
								})
							]
						})
					]
				}, pkg.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AipoonPictures, { site }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-[12px] text-ink-soft",
				children: [
					"Official sheet grand RM ",
					formatRm(AIPOON_GAJI.grandTotal),
					" · toilet RM ",
					formatRm(AIPOON_GAJI.toiletFinal),
					" · tenant RM ",
					formatRm(AIPOON_GAJI.tenantFinal),
					". Work is L24–L30 both towers. L13–L23 and L31 are not Aipoon. Pay the live board %."
				]
			})
		]
	});
}
var PHOTO_SLOTS = [
	{
		level: "L24",
		tower: "A",
		label: "L24 TA"
	},
	{
		level: "L24",
		tower: "B",
		label: "L24 TB"
	},
	{
		level: "L25",
		tower: "A",
		label: "L25 TA"
	},
	{
		level: "L25",
		tower: "B",
		label: "L25 TB"
	},
	{
		level: "L26",
		tower: "A",
		label: "L26 TA"
	},
	{
		level: "L26",
		tower: "B",
		label: "L26 TB"
	},
	{
		level: "L27",
		tower: "A",
		label: "L27 TA"
	},
	{
		level: "L27",
		tower: "B",
		label: "L27 TB"
	},
	{
		level: "L28",
		tower: "A",
		label: "L28 TA"
	},
	{
		level: "L28",
		tower: "B",
		label: "L28 TB"
	},
	{
		level: "L29",
		tower: "A",
		label: "L29 TA"
	},
	{
		level: "L29",
		tower: "B",
		label: "L29 TB"
	},
	{
		level: "L30",
		tower: "A",
		label: "L30 TA"
	},
	{
		level: "L30",
		tower: "B",
		label: "L30 TB"
	}
];
function AipoonPictures({ site }) {
	const { attachPhoto } = useSiteMutations();
	const [slot, setSlot] = (0, import_react.useState)("L27A");
	const [photo, setPhoto] = (0, import_react.useState)(null);
	const aipoon = site.crew.find((c) => c.callsign === "Aipoon");
	const item = site.mskItems.find((i) => i.seq === 9);
	const levelByCode = (0, import_react.useMemo)(() => new Map(site.mskLevels.map((l) => [l.code, l])), [site.mskLevels]);
	const shots = site.mskAssignments.flatMap((a) => {
		if (a.crewId !== aipoon?.id || !hasRealPhoto(a.photoData)) return [];
		const urls = photoList(a.photoData);
		const level = site.mskLevels.find((l) => l.id === a.levelId);
		return urls.map((src, i) => ({
			src,
			key: `${a.id}-${i}`,
			label: level?.code === "L27" && a.tower === "A" ? `L27 TA · ${i === 0 ? "1st" : i === 1 ? "2nd" : `${i + 1}th`} outlet` : `${level?.code ?? ""} T${a.tower}`
		}));
	});
	function savePhoto() {
		if (!photo || !aipoon || !item) return;
		const picked = PHOTO_SLOTS.find((s) => `${s.level}${s.tower}` === slot) ?? PHOTO_SLOTS[2];
		const level = levelByCode.get(picked.level);
		if (!level) return;
		const row = site.mskAssignments.filter((a) => a.crewId === aipoon.id && a.levelId === level.id && a.tower === picked.tower && a.itemId === item.id).sort((a, b) => b.id - a.id)[0];
		if (!row) {
			toast.error(`No Aipoon ticket on ${picked.label} yet`);
			return;
		}
		attachPhoto.mutate({
			assignmentId: row.id,
			photoData: photo,
			kind: "msk"
		}, {
			onSuccess: () => {
				setPhoto(null);
				toast.success(`Picture saved on ${picked.label}`);
			},
			onError: (err) => toast.error(err instanceof Error ? err.message : "Could not save picture")
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-paper-2 p-3 no-print",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-sm uppercase tracking-wide",
				children: "Pictures"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-0.5 text-[12px] text-muted",
				children: "L27 TA 1st & 2nd outlet on file. Add a picture on the floor you just moved. Still need L24–L25 TB and L27 TB."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 grid grid-cols-3 gap-1.5 sm:grid-cols-6",
				children: PHOTO_SLOTS.map((s) => {
					const id = `${s.level}${s.tower}`;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setSlot(id),
						className: cn("min-h-11 rounded-md border px-2 text-sm", slot === id ? "border-ink bg-panel" : "border-line bg-panel text-muted"),
						children: s.label
					}, id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddPicture, {
					value: photo,
					onChange: setPhoto,
					needed: true
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				className: "mt-2 min-h-11 w-full sm:w-auto",
				disabled: !photo || attachPhoto.isPending,
				onClick: () => void savePhoto(),
				children: "Save picture"
			}),
			shots.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 grid grid-cols-2 gap-2",
				children: shots.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: s.src,
					alt: s.label,
					loading: "lazy",
					decoding: "async",
					className: "h-28 w-full rounded-md object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-[11px] uppercase text-muted",
					children: s.label
				})] }, s.key))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-[12px] text-stamp",
				children: "No pictures yet — L24–L25 100% and L27 jump still need a photo."
			})
		]
	});
}
function FloorPct$1({ pct }) {
	const tone = pct >= 100 ? "done" : pct > 0 ? "risk" : "track";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("flex h-7 items-center justify-center rounded-sm font-mono text-[11px] tabular-nums", tone === "done" && "bg-cell-done text-cell-done-ink", tone === "risk" && "bg-cell-risk text-cell-risk-ink", tone === "track" && "border border-line bg-panel text-muted"),
		children: [pct, "%"]
	});
}
/** Aryan (sheet: Ariyan) SS transfer-pump labour — GAJI ARYAN.xlsx. */
var ARYAN_GAJI = {
	name: "Aryan",
	sheetName: "Ariyan",
	title: "SS welding · transfer pump pipe L13–31M · Towers A & B",
	ratePerMeter: 80,
	fittingEach: 150,
	seq: 4,
	floorsA: [
		"L13",
		"L14",
		"L15",
		"L16",
		"L17",
		"L18",
		"L19",
		"L20",
		"L21",
		"L22",
		"L23",
		"L24",
		"L25",
		"L26",
		"L27",
		"L28",
		"L29",
		"L30",
		"L31",
		"L31M"
	],
	floorsB: [
		"L13",
		"L14",
		"L15",
		"L16",
		"L17",
		"L18",
		"L19",
		"L20",
		"L21",
		"L22",
		"L23",
		"L24",
		"L25",
		"L26",
		"L27",
		"L28",
		"L29",
		"L30",
		"L31",
		"L31M"
	],
	meters: {
		L13: 8.6,
		L14: 4.5,
		L15: 4.5,
		L16: 4.5,
		L17: 4.5,
		L18: 4.5,
		L19: 4.5,
		L20: 4.5,
		L21: 4.5,
		L22: 4.5,
		L23: 4.5,
		L24: 4.5,
		L25: 4.5,
		L26: 4.5,
		L27: 5.1,
		L28: 5.1,
		L29: 5.1,
		L30: 6,
		L31: 4.9,
		L31M: 0
	},
	fittings: {
		A: {
			L13: {
				amount: 300,
				note: "2 elbow"
			},
			L14: {
				amount: 300,
				note: "1 elbow + 1 check valve"
			}
		},
		B: {
			L13: {
				amount: 300,
				note: "2 elbow"
			},
			L14: {
				amount: 300,
				note: "1 elbow + 1 check valve"
			}
		}
	},
	/** Live 2 Sep: L13–L21 both towers 100%. Sheet ticks are not pay. */
	sheetDone: {
		A: [
			"L13",
			"L14",
			"L15",
			"L16",
			"L17",
			"L18",
			"L19",
			"L20",
			"L21"
		],
		B: [
			"L13",
			"L14",
			"L15",
			"L16",
			"L17",
			"L18",
			"L19",
			"L20",
			"L21"
		]
	},
	sheetClaimed: 7736
};
function aryanLabour(tower, level) {
	const meters = ARYAN_GAJI.meters[level] ?? 0;
	const pipe = Math.round(meters * ARYAN_GAJI.ratePerMeter);
	const fit = ARYAN_GAJI.fittings[tower][level];
	const fittings = fit?.amount ?? 0;
	return {
		meters,
		pipe,
		fittings,
		note: fit?.note ?? "",
		labour: pipe + fittings
	};
}
function buildAryanGaji(site) {
	const item = site.mskItems.find((i) => i.seq === ARYAN_GAJI.seq);
	const levelByCode = new Map(site.mskLevels.map((l) => [l.code, l]));
	const cellMap = /* @__PURE__ */ new Map();
	for (const p of site.mskProgress) cellMap.set(`${p.levelId}:${p.tower}:${p.itemId}`, {
		pct: p.pct,
		na: p.na
	});
	const towers = ["A", "B"].map((tower) => {
		const floors = tower === "A" ? ARYAN_GAJI.floorsA : ARYAN_GAJI.floorsB;
		const doneSet = new Set(ARYAN_GAJI.sheetDone[tower]);
		const cells = [];
		let labourTotal = 0;
		let earned = 0;
		let doneFloors = 0;
		let clashCount = 0;
		for (const code of floors) {
			const rate = aryanLabour(tower, code);
			labourTotal += rate.labour;
			const level = levelByCode.get(code);
			let pct = 0;
			if (item && level) {
				const c = cellMap.get(`${level.id}:${tower}:${item.id}`);
				pct = !c || c.na ? 0 : c.pct;
			}
			const sheetDone = doneSet.has(code);
			const clash = sheetDone && pct < 100;
			if (clash) clashCount += 1;
			if (pct >= 100) doneFloors += 1;
			const pay = pct / 100 * rate.labour;
			earned += pay;
			cells.push({
				level: code,
				tower,
				meters: rate.meters,
				pipe: rate.pipe,
				fittings: rate.fittings,
				fittingNote: rate.note,
				labour: rate.labour,
				pct,
				earned: pay,
				sheetDone,
				clash
			});
		}
		return {
			tower,
			cells,
			labourTotal,
			earned,
			doneFloors,
			floorCount: floors.length,
			clashCount
		};
	});
	const labourTotal = towers.reduce((s, t) => s + t.labourTotal, 0);
	const earned = towers.reduce((s, t) => s + t.earned, 0);
	const clashCount = towers.reduce((s, t) => s + t.clashCount, 0);
	return {
		towers,
		labourTotal,
		earned,
		pct: labourTotal <= 0 ? 0 : Math.round(earned / labourTotal * 100),
		clashCount,
		sheetClaimed: ARYAN_GAJI.sheetClaimed
	};
}
function AryanGaji({ site }) {
	const gaji = buildAryanGaji(site);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "print-sheet space-y-4 rounded-xl bg-panel p-4 shadow-docket sm:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-3 hidden print-only",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Letterhead, { asOf: REPORT_DATE })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-[11px] uppercase tracking-[0.16em] text-muted",
						children: [
							"Sub gaji · ",
							ARYAN_GAJI.sheetName,
							" · RM ",
							ARYAN_GAJI.ratePerMeter,
							"/m"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-display text-2xl uppercase tracking-wide",
						children: "Aryan"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 max-w-md text-sm text-ink-soft",
						children: [
							ARYAN_GAJI.title,
							". Fittings RM ",
							ARYAN_GAJI.fittingEach,
							" each. Pay the board, not the sheet DONE ticks."
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "shrink-0 text-right",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-display text-4xl font-semibold tabular-nums whitespace-nowrap",
							children: [formatRm(gaji.earned), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-lg text-muted",
								children: " RM"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[12px] text-muted",
							children: [
								"of RM ",
								formatRm(gaji.labourTotal),
								" · ",
								gaji.pct,
								"%"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							className: "mt-2 no-print",
							onClick: () => window.print(),
							children: "Print"
						})
					]
				})]
			}),
			gaji.clashCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "rounded-lg bg-stamp/10 px-3 py-2 text-sm text-stamp",
				children: [
					"Sheet ticks L13–L21 both towers. Board is lower on ",
					gaji.clashCount,
					" floors — those floors are not paid."
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: gaji.towers.map((tw) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-lg bg-paper-2 p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-display text-sm uppercase tracking-wide",
								children: ["Tower ", tw.tower]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								tone: tw.earned >= tw.labourTotal ? "done" : tw.earned > 0 ? "risk" : "track",
								children: [
									tw.doneFloors,
									"/",
									tw.floorCount
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 font-display text-xl font-semibold tabular-nums",
							children: [
								"RM ",
								formatRm(tw.earned),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm font-normal text-muted",
									children: [" / ", formatRm(tw.labourTotal)]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 space-y-1",
							children: tw.cells.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "grid grid-cols-[2.2rem_1fr_auto_2.6rem] items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-[11px] uppercase",
										children: c.level
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "truncate text-[11px] text-muted",
										children: [
											c.meters,
											"m · RM ",
											formatRm(c.pipe),
											c.fittings ? ` + ${c.fittingNote}` : ""
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloorPct, {
										pct: c.pct,
										clash: c.clash
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-right font-mono text-[11px] tabular-nums",
										children: formatRm(c.earned)
									})
								]
							}, c.level))
						})
					]
				}, tw.tower))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[12px] text-ink-soft",
				children: "TA & TB L13–31M. L31M has no metres on the gaji sheet. Roof-top row on the old sheet is the TA subtotal, not roof piping. L13 +2 elbow RM 300. L14 +elbow / check valve RM 300."
			})
		]
	});
}
function FloorPct({ pct, clash }) {
	const tone = clash ? "miss" : pct >= 100 ? "done" : pct > 0 ? "risk" : "track";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("flex h-7 min-w-10 items-center justify-center rounded-sm font-mono text-[11px] tabular-nums", tone === "done" && "bg-cell-done text-cell-done-ink", tone === "risk" && "bg-cell-risk text-cell-risk-ink", tone === "miss" && "bg-cell-miss text-cell-miss-ink", tone === "track" && "border border-line bg-panel text-muted"),
		children: [pct, "%"]
	});
}
//#endregion
export { AryanGaji as n, AipoonGaji as t };
