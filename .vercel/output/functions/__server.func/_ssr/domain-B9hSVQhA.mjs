//#region node_modules/.nitro/vite/services/ssr/assets/domain-B9hSVQhA.js
/** Latest official board — 1 Sep 2026. L26 tenant is the hole to fill under L27. */
var MSK_REV = "2026-09-02-teams";
var MSK_ITEMS = [
	{
		seq: 1,
		code: "sleeve",
		name: "Pipe sleeve",
		short: "Sleeve",
		trade: "CW"
	},
	{
		seq: 2,
		code: "pump",
		name: "Pump",
		short: "Pump",
		trade: "CW"
	},
	{
		seq: 3,
		code: "pumpPanel",
		name: "Pump control panel",
		short: "Panel",
		trade: "CW"
	},
	{
		seq: 4,
		code: "transfer",
		name: "Transfer pump pipes",
		short: "Transfer",
		trade: "CW"
	},
	{
		seq: 5,
		code: "roofPiping",
		name: "L31 & 31M roof piping",
		short: "Roof pipe",
		trade: "CW"
	},
	{
		seq: 6,
		code: "cwTenant",
		name: "CW tenant",
		short: "CW tenant",
		trade: "CW"
	},
	{
		seq: 7,
		code: "backshaft",
		name: "Backshaft CW & FW toilets",
		short: "Backshaft",
		trade: "CW"
	},
	{
		seq: 8,
		code: "hosereel",
		name: "Hosereel, floortrap & stack",
		short: "Hosereel",
		trade: "SAN"
	},
	{
		seq: 9,
		code: "sanTenant",
		name: "Sanitary tenant",
		short: "SAN tenant",
		trade: "SAN"
	},
	{
		seq: 10,
		code: "toiletDist",
		name: "Toilet pipe distribution & hacking",
		short: "Dist / hack",
		trade: "SAN"
	},
	{
		seq: 11,
		code: "sanToilets",
		name: "Sanitary toilets",
		short: "SAN toilets",
		trade: "SAN"
	},
	{
		seq: 12,
		code: "sanWares",
		name: "Sanitary wares installation",
		short: "Wares",
		trade: "SAN"
	},
	{
		seq: 13,
		code: "irrOut",
		name: "Irrigation outlet",
		short: "IRR out",
		trade: "IRR"
	},
	{
		seq: 14,
		code: "irrIn",
		name: "Irrigation inlet",
		short: "IRR in",
		trade: "IRR"
	},
	{
		seq: 15,
		code: "irrWire",
		name: "Irrigation wiring",
		short: "IRR wire",
		trade: "IRR"
	},
	{
		seq: 16,
		code: "irrPanel",
		name: "Irrigation control panel",
		short: "IRR panel",
		trade: "IRR"
	}
];
/** Official 29 Aug sheet headers still: COLD WATER 40% · SANITARY 33% · IRRIGATION 8%. */
var TRADE_WEIGHT = {
	CW: .4,
	SAN: .33,
	IRR: .08
};
var TRADE_LABEL = {
	CW: "Cold water",
	SAN: "Sanitary",
	IRR: "Irrigation"
};
var MSK_LEVELS = [
	{
		code: "L13",
		sort: 13,
		zone: "low-office",
		ffl: "112.600"
	},
	{
		code: "L14",
		sort: 14,
		zone: "low-office",
		ffl: "123.350"
	},
	{
		code: "L15",
		sort: 15,
		zone: "low-office",
		ffl: "127.850"
	},
	{
		code: "L16",
		sort: 16,
		zone: "low-office",
		ffl: "132.350"
	},
	{
		code: "L17",
		sort: 17,
		zone: "low-office",
		ffl: "136.850"
	},
	{
		code: "L18",
		sort: 18,
		zone: "low-office",
		ffl: "141.350"
	},
	{
		code: "L19",
		sort: 19,
		zone: "low-office",
		ffl: "145.850"
	},
	{
		code: "L20",
		sort: 20,
		zone: "low-office",
		ffl: "150.350"
	},
	{
		code: "L21",
		sort: 21,
		zone: "low-office",
		ffl: "154.850"
	},
	{
		code: "L22",
		sort: 22,
		zone: "low-office",
		ffl: "159.350"
	},
	{
		code: "L23",
		sort: 23,
		zone: "high-office",
		ffl: "163.850"
	},
	{
		code: "L24",
		sort: 24,
		zone: "high-office",
		ffl: "168.350"
	},
	{
		code: "L25",
		sort: 25,
		zone: "high-office",
		ffl: "172.850"
	},
	{
		code: "L26",
		sort: 26,
		zone: "high-office",
		ffl: "177.350"
	},
	{
		code: "L27",
		sort: 27,
		zone: "high-office",
		ffl: "181.850"
	},
	{
		code: "L28",
		sort: 28,
		zone: "high-office",
		ffl: "186.950"
	},
	{
		code: "L29",
		sort: 29,
		zone: "high-office",
		ffl: "192.050"
	},
	{
		code: "L30",
		sort: 30,
		zone: "high-office",
		ffl: "197.150"
	},
	{
		code: "L31",
		sort: 31,
		zone: "high-office",
		ffl: "203.150"
	},
	{
		code: "L31M",
		sort: 32,
		zone: "plant",
		ffl: "210.350"
	}
];
/** -1 = N/A. Board 2 Sep 2026: Aryan SS L13–L21 both 100%. Aipoon tenant L27 4 outlets + 6 tenants, L26 0%, L24B–L25B outlet only. */
var MSK_PROGRESS = {
	A: {
		L13: [
			100,
			-1,
			-1,
			100,
			-1,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			100,
			90,
			0,
			-1
		],
		L14: [
			100,
			-1,
			-1,
			100,
			-1,
			90,
			100,
			100,
			100,
			100,
			100,
			100,
			100,
			0,
			0,
			-1
		],
		L15: [
			100,
			-1,
			-1,
			100,
			-1,
			90,
			100,
			100,
			100,
			100,
			100,
			100,
			100,
			0,
			0,
			-1
		],
		L16: [
			100,
			-1,
			-1,
			100,
			-1,
			90,
			10,
			100,
			100,
			100,
			100,
			50,
			100,
			0,
			0,
			-1
		],
		L17: [
			100,
			-1,
			-1,
			100,
			-1,
			90,
			0,
			100,
			100,
			100,
			100,
			0,
			100,
			0,
			0,
			-1
		],
		L18: [
			100,
			-1,
			-1,
			100,
			-1,
			90,
			0,
			100,
			100,
			100,
			100,
			0,
			50,
			0,
			0,
			-1
		],
		L19: [
			100,
			-1,
			-1,
			100,
			-1,
			90,
			0,
			100,
			100,
			100,
			100,
			0,
			0,
			0,
			0,
			-1
		],
		L20: [
			100,
			-1,
			-1,
			100,
			-1,
			90,
			0,
			100,
			50,
			0,
			100,
			0,
			0,
			0,
			0,
			-1
		],
		L21: [
			100,
			-1,
			-1,
			100,
			-1,
			90,
			0,
			10,
			0,
			0,
			100,
			0,
			0,
			0,
			0,
			-1
		],
		L22: [
			100,
			-1,
			-1,
			0,
			-1,
			90,
			0,
			0,
			0,
			100,
			100,
			0,
			0,
			0,
			0,
			0
		],
		L23: [
			100,
			-1,
			-1,
			0,
			-1,
			90,
			0,
			0,
			0,
			0,
			100,
			0,
			0,
			0,
			0,
			-1
		],
		L24: [
			100,
			-1,
			-1,
			0,
			-1,
			90,
			0,
			0,
			0,
			0,
			100,
			0,
			0,
			0,
			0,
			-1
		],
		L25: [
			100,
			-1,
			-1,
			0,
			-1,
			90,
			0,
			0,
			0,
			0,
			100,
			0,
			0,
			0,
			0,
			-1
		],
		L26: [
			100,
			-1,
			-1,
			0,
			-1,
			90,
			0,
			0,
			0,
			80,
			100,
			0,
			0,
			0,
			0,
			-1
		],
		L27: [
			100,
			-1,
			-1,
			0,
			-1,
			90,
			0,
			0,
			50,
			0,
			100,
			0,
			0,
			0,
			0,
			-1
		],
		L28: [
			100,
			-1,
			-1,
			0,
			-1,
			90,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			-1
		],
		L29: [
			100,
			-1,
			-1,
			0,
			-1,
			90,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			-1
		],
		L30: [
			100,
			-1,
			-1,
			0,
			-1,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			-1
		],
		L31: [
			55,
			90,
			90,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			-1
		],
		L31M: [
			10,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0
		]
	},
	B: {
		L13: [
			100,
			-1,
			-1,
			100,
			-1,
			0,
			0,
			10,
			0,
			0,
			0,
			0,
			100,
			90,
			0,
			-1
		],
		L14: [
			100,
			-1,
			-1,
			100,
			-1,
			90,
			100,
			100,
			100,
			100,
			100,
			100,
			100,
			0,
			0,
			-1
		],
		L15: [
			100,
			-1,
			-1,
			100,
			-1,
			90,
			100,
			100,
			100,
			100,
			100,
			100,
			100,
			0,
			0,
			-1
		],
		L16: [
			100,
			-1,
			-1,
			100,
			-1,
			90,
			10,
			100,
			100,
			100,
			100,
			0,
			100,
			0,
			0,
			-1
		],
		L17: [
			100,
			-1,
			-1,
			100,
			-1,
			90,
			0,
			100,
			100,
			100,
			100,
			0,
			100,
			0,
			0,
			-1
		],
		L18: [
			100,
			-1,
			-1,
			100,
			-1,
			90,
			0,
			100,
			100,
			100,
			100,
			0,
			50,
			0,
			0,
			-1
		],
		L19: [
			100,
			-1,
			-1,
			100,
			-1,
			90,
			0,
			100,
			100,
			100,
			100,
			0,
			0,
			0,
			0,
			-1
		],
		L20: [
			100,
			-1,
			-1,
			100,
			-1,
			90,
			0,
			100,
			50,
			10,
			100,
			0,
			0,
			0,
			0,
			-1
		],
		L21: [
			100,
			-1,
			-1,
			100,
			-1,
			90,
			0,
			0,
			0,
			10,
			100,
			0,
			0,
			0,
			0,
			-1
		],
		L22: [
			100,
			-1,
			-1,
			0,
			-1,
			90,
			0,
			0,
			0,
			100,
			100,
			0,
			0,
			0,
			0,
			0
		],
		L23: [
			100,
			-1,
			-1,
			0,
			-1,
			90,
			0,
			0,
			0,
			0,
			100,
			0,
			0,
			0,
			0,
			-1
		],
		L24: [
			100,
			-1,
			-1,
			0,
			-1,
			90,
			0,
			0,
			25,
			0,
			100,
			100,
			0,
			0,
			0,
			-1
		],
		L25: [
			100,
			-1,
			-1,
			0,
			-1,
			90,
			0,
			0,
			25,
			0,
			100,
			100,
			0,
			0,
			0,
			-1
		],
		L26: [
			100,
			-1,
			-1,
			0,
			-1,
			90,
			0,
			0,
			0,
			80,
			100,
			0,
			0,
			0,
			0,
			-1
		],
		L27: [
			100,
			-1,
			-1,
			0,
			-1,
			90,
			0,
			0,
			50,
			0,
			100,
			0,
			0,
			0,
			0,
			-1
		],
		L28: [
			100,
			-1,
			-1,
			0,
			-1,
			90,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			-1
		],
		L29: [
			100,
			-1,
			-1,
			0,
			-1,
			90,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			-1
		],
		L30: [
			100,
			-1,
			-1,
			0,
			-1,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			-1
		],
		L31: [
			50,
			90,
			90,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			-1
		],
		L31M: [
			10,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0
		]
	}
};
function seedAssignPhoto(a) {
	if (a.photos && a.photos.length > 0) return a.photos.length === 1 ? a.photos[0] : JSON.stringify(a.photos);
	return a.hasPhoto ? "seed-photo" : null;
}
var MSK_ASSIGNMENT_SEED = [
	{
		workDate: "2026-09-02",
		callsign: "Suhairi",
		level: "L31",
		tower: "A",
		seq: 1,
		startPct: 55,
		claimedPct: 55,
		note: "Team 3 sleeve. Specialty only.",
		verified: true,
		rejected: false,
		hasPhoto: false
	},
	{
		workDate: "2026-09-02",
		callsign: "Supendi",
		level: "L31",
		tower: "B",
		seq: 1,
		startPct: 50,
		claimedPct: 50,
		note: "Team 3 sleeve. Specialty only.",
		verified: true,
		rejected: false,
		hasPhoto: false
	},
	{
		workDate: "2026-09-02",
		callsign: "Bilal",
		level: "L26",
		tower: "A",
		seq: 10,
		startPct: 80,
		claimedPct: 80,
		note: "Team 4 concealed pipe. Specialty only.",
		verified: true,
		rejected: false,
		hasPhoto: false
	},
	{
		workDate: "2026-09-02",
		callsign: "Jewel",
		level: "L18",
		tower: "A",
		seq: 13,
		startPct: 50,
		claimedPct: 50,
		note: "Team 5 IRR outlet. Specialty only.",
		verified: true,
		rejected: false,
		hasPhoto: false
	},
	{
		workDate: "2026-09-02",
		callsign: "Jillur",
		level: "L13",
		tower: "A",
		seq: 6,
		startPct: 0,
		claimedPct: 0,
		note: "Team 6 L13 tenant. May take any job.",
		verified: true,
		rejected: false,
		hasPhoto: false
	},
	{
		workDate: "2026-09-02",
		callsign: "Islam",
		level: "L13",
		tower: "B",
		seq: 6,
		startPct: 0,
		claimedPct: 0,
		note: "Team 6 L13 tenant.",
		verified: true,
		rejected: false,
		hasPhoto: false
	},
	{
		workDate: "2026-09-02",
		callsign: "Sarip",
		level: "L16",
		tower: "A",
		seq: 7,
		startPct: 10,
		claimedPct: 10,
		note: "Team 7 backshaft. Specialty only.",
		verified: true,
		rejected: false,
		hasPhoto: false
	},
	{
		workDate: "2026-09-02",
		callsign: "Emon",
		level: "L21",
		tower: "A",
		seq: 6,
		startPct: 90,
		claimedPct: 90,
		note: "Team 8 tenant L21. Specialty only.",
		verified: true,
		rejected: false,
		hasPhoto: false
	},
	{
		workDate: "2026-09-02",
		callsign: "Damil",
		level: "L21",
		tower: "A",
		seq: 8,
		startPct: 10,
		claimedPct: 10,
		note: "Team 9 floortrap. Specialty only.",
		verified: true,
		rejected: false,
		hasPhoto: false
	}
];
var CLAIM = {
	no: 36,
	date: "2026-07-25",
	title: "Cold Water and Sanitary Plumbing Services",
	contract: 105e5,
	workDone: 7376009.19,
	voWorkDone: 7512092.39,
	totalWorkDone: 14888101.58,
	retention: 900604.62,
	totalClaim: 13987496.96,
	thisClaim: 2930937.51,
	lines: [
		{
			code: "A.1",
			zone: "Podium",
			name: "Preliminaries (podium)",
			contract: 24500,
			work: 24500
		},
		{
			code: "A.2",
			zone: "Podium",
			name: "Cold water (podium)",
			contract: 2209200,
			work: 2209200
		},
		{
			code: "A.3",
			zone: "Podium",
			name: "Sanitary (podium)",
			contract: 2308e3,
			work: 2308e3
		},
		{
			code: "B.1",
			zone: "Tower",
			name: "Preliminaries (towers)",
			contract: 24500,
			work: 8800
		},
		{
			code: "B.2",
			zone: "Tower",
			name: "Cold water Tower A",
			contract: 1778400,
			work: 1012670
		},
		{
			code: "B.3",
			zone: "Tower",
			name: "Cold water Tower B",
			contract: 1783400,
			work: 940470
		},
		{
			code: "B.4",
			zone: "Tower",
			name: "Sanitary Tower A",
			contract: 915e3,
			work: 187375
		},
		{
			code: "B.5",
			zone: "Tower",
			name: "Sanitary Tower B",
			contract: 957e3,
			work: 197075
		},
		{
			code: "C",
			zone: "VO",
			name: "Contingency (VO1+VO2+VO4)",
			contract: 5e5,
			work: 487919.19
		}
	]
};
var BUILDING_STACK = [
	{
		code: "ROOF",
		label: "Helipad / roof tanks",
		ffl: "215.850",
		band: "roof",
		gm: "plant"
	},
	{
		code: "L31M",
		label: "L31 Mez · M&E / LMR",
		ffl: "210.350",
		band: "plant",
		gm: "tower"
	},
	{
		code: "L31",
		label: "Level 31 · office",
		ffl: "203.150",
		band: "high-office",
		gm: "tower"
	},
	{
		code: "L30",
		label: "Level 30",
		ffl: "197.150",
		band: "high-office",
		gm: "tower"
	},
	{
		code: "L29",
		label: "Level 29",
		ffl: "192.050",
		band: "high-office",
		gm: "tower"
	},
	{
		code: "L28",
		label: "Level 28",
		ffl: "186.950",
		band: "high-office",
		gm: "tower"
	},
	{
		code: "L27",
		label: "Level 27",
		ffl: "181.850",
		band: "high-office",
		gm: "tower"
	},
	{
		code: "L26",
		label: "Level 26",
		ffl: "177.350",
		band: "high-office",
		gm: "tower"
	},
	{
		code: "L25",
		label: "Level 25",
		ffl: "172.850",
		band: "high-office",
		gm: "tower"
	},
	{
		code: "L24",
		label: "Level 24",
		ffl: "168.350",
		band: "high-office",
		gm: "tower"
	},
	{
		code: "L23",
		label: "Level 23",
		ffl: "163.850",
		band: "high-office",
		gm: "tower"
	},
	{
		code: "L22",
		label: "Level 22",
		ffl: "159.350",
		band: "low-office",
		gm: "tower"
	},
	{
		code: "L21",
		label: "Level 21",
		ffl: "154.850",
		band: "low-office",
		gm: "tower"
	},
	{
		code: "L20",
		label: "Level 20",
		ffl: "150.350",
		band: "low-office",
		gm: "tower"
	},
	{
		code: "L19",
		label: "Level 19",
		ffl: "145.850",
		band: "low-office",
		gm: "tower"
	},
	{
		code: "L18",
		label: "Level 18",
		ffl: "141.350",
		band: "low-office",
		gm: "tower"
	},
	{
		code: "L17",
		label: "Level 17",
		ffl: "136.850",
		band: "low-office",
		gm: "tower"
	},
	{
		code: "L16",
		label: "Level 16",
		ffl: "132.350",
		band: "low-office",
		gm: "tower"
	},
	{
		code: "L15",
		label: "Level 15",
		ffl: "127.850",
		band: "low-office",
		gm: "tower"
	},
	{
		code: "L14",
		label: "Level 14",
		ffl: "123.350",
		band: "low-office",
		gm: "tower"
	},
	{
		code: "L13",
		label: "Level 13 · AC makeup tank",
		ffl: "112.600",
		band: "low-office",
		gm: "tower"
	},
	{
		code: "L12",
		label: "Level 12 · office",
		ffl: "107.800",
		band: "podium-office",
		gm: "podium"
	},
	{
		code: "L11",
		label: "Level 11",
		ffl: "103.000",
		band: "podium-office",
		gm: "podium"
	},
	{
		code: "L10",
		label: "Level 10",
		ffl: "98.200",
		band: "podium-office",
		gm: "podium"
	},
	{
		code: "L9",
		label: "Level 9",
		ffl: "93.400",
		band: "podium-office",
		gm: "podium"
	},
	{
		code: "L8",
		label: "Level 8 · carpark",
		ffl: "88.600",
		band: "carpark",
		gm: "podium"
	},
	{
		code: "L7",
		label: "Level 7 · carpark",
		ffl: "84.800",
		band: "carpark",
		gm: "podium"
	},
	{
		code: "L6",
		label: "Level 6 · carpark",
		ffl: "81.500",
		band: "carpark",
		gm: "podium"
	},
	{
		code: "L5",
		label: "Level 5 · carpark",
		ffl: "78.200",
		band: "carpark",
		gm: "podium"
	},
	{
		code: "L4",
		label: "Level 4 · retail",
		ffl: "74.400",
		band: "retail",
		gm: "podium"
	},
	{
		code: "L3",
		label: "Level 3 · retail",
		ffl: "69.600",
		band: "retail",
		gm: "podium"
	},
	{
		code: "L2",
		label: "Level 2 · commercial",
		ffl: "64.800",
		band: "commercial",
		gm: "podium"
	},
	{
		code: "L1",
		label: "Level 1 · commercial",
		ffl: "60.000",
		band: "commercial",
		gm: "podium"
	},
	{
		code: "GF",
		label: "Ground · retail",
		ffl: "54.000",
		band: "commercial",
		gm: "podium"
	},
	{
		code: "LG",
		label: "Lower ground",
		ffl: "50.500",
		band: "commercial",
		gm: "podium"
	},
	{
		code: "B1",
		label: "Basement 1 · carpark",
		ffl: "47.000",
		band: "basement",
		gm: "podium"
	},
	{
		code: "B2",
		label: "Basement 2 · carpark",
		ffl: "43.800",
		band: "basement",
		gm: "podium"
	},
	{
		code: "B3",
		label: "Basement 3 · carpark",
		ffl: "40.600",
		band: "basement",
		gm: "podium"
	},
	{
		code: "B4",
		label: "Basement 4 · plant",
		ffl: "34.800",
		band: "plant",
		gm: "podium"
	}
];
var FLOOR_PLANS = [
	{
		code: "B1",
		src: "/plans/b1.jpg",
		title: "Basement 1 · carpark, plant, toilets"
	},
	{
		code: "LG",
		src: "/plans/lg.jpg",
		title: "Lower ground · retail & F&B"
	},
	{
		code: "GF",
		src: "/plans/gf.jpg",
		title: "Ground floor · leasing lots"
	},
	{
		code: "L1",
		src: "/plans/l1.jpg",
		title: "Level 1 · leasing lots"
	},
	{
		code: "L3",
		src: "/plans/l3.jpg",
		title: "Level 3 · retail podium"
	},
	{
		code: "L4",
		src: "/plans/l4.jpg",
		title: "Level 4 · retail podium"
	}
];
var SECTION_PLAN = {
	src: "/plans/section.jpg",
	title: "Diagrammatic section · B4 to helipad · 20 Jul 2026"
};
function isGmCrew(c) {
	return c.contractor === "GM" && c.active;
}
function isSubCrew(c) {
	return c.contractor === "SUB" && c.active;
}
function isSiteCrew(c) {
	return (c.contractor === "GM" || c.contractor === "SUB") && c.active;
}
function siteCrewGrouped(crew) {
	const gm = crew.filter(isGmCrew).slice().sort((a, b) => a.callsign.localeCompare(b.callsign));
	const subs = crew.filter(isSubCrew).slice().sort((a, b) => a.callsign.localeCompare(b.callsign));
	return {
		gm,
		subs,
		all: [...gm, ...subs]
	};
}
function isGmActivity(a) {
	return a.gmTrade;
}
/** Logical predecessors by activity seq. Downstream cannot honestly run ahead. */
var PREDECESSORS = {
	3: [2],
	4: [2],
	5: [2],
	6: [2],
	7: [
		1,
		2,
		3
	],
	8: [7],
	9: [8],
	10: [5],
	11: [6],
	12: [8],
	13: [2],
	14: [2],
	15: [12],
	16: [8],
	17: [16],
	18: [12],
	19: [18],
	20: [12, 18],
	21: [17],
	22: [13],
	23: [14]
};
function daysBetween(fromIso, toIso) {
	const a = Date.parse(`${fromIso}T00:00:00Z`);
	const b = Date.parse(`${toIso}T00:00:00Z`);
	return Math.round((b - a) / 864e5);
}
function cellStatus(pct, dueOn, asOf) {
	if (pct >= 100) return "done";
	const delta = daysBetween(asOf, dueOn);
	if (delta < 0) return "missed";
	if (delta <= 3) return "risk";
	return "track";
}
function mean(nums) {
	if (nums.length === 0) return 0;
	return nums.reduce((s, n) => s + n, 0) / nums.length;
}
function roundPct(n) {
	return Math.round(n);
}
function photoList(raw) {
	if (!raw || raw === "seed-photo" || raw === "inline-photo") return [];
	const t = raw.trim();
	if (t.startsWith("[")) try {
		const v = JSON.parse(t);
		return Array.isArray(v) ? v.filter((x) => typeof x === "string" && x.length > 0 && x !== "inline-photo") : [];
	} catch {
		return [];
	}
	return [raw];
}
function packPhotos(urls) {
	const clean = urls.filter(Boolean);
	if (clean.length === 0) return null;
	if (clean.length === 1) return clean[0] ?? null;
	return JSON.stringify(clean);
}
function hasRealPhoto(raw) {
	if (!raw || raw === "seed-photo") return false;
	if (raw === "inline-photo") return true;
	return photoList(raw).length > 0;
}
/** One live hole per package + tower (highest skipped floor). Old 0% leftovers stay on the board, not on Do next. */
function rankMskJobs(input) {
	const jobs = [];
	const seen = /* @__PURE__ */ new Set();
	const holes = [...input.holes].sort((a, b) => b.level.sortOrder - a.level.sortOrder);
	for (const h of holes) {
		const k = `${h.tower}:${h.item.id}`;
		if (seen.has(k)) continue;
		seen.add(k);
		jobs.push({
			level: h.level,
			tower: h.tower,
			item: h.item,
			pct: h.pct,
			why: h.pct === 0 ? "Skipped · higher floor already started" : `Only ${h.pct}% · higher floor already moved on`,
			kind: "hole"
		});
	}
	for (const n of input.nextInLine) {
		const k = `${n.tower}:${n.item.id}`;
		if (seen.has(k) || n.pct !== 0) continue;
		seen.add(k);
		jobs.push({
			level: n.level,
			tower: n.tower,
			item: n.item,
			pct: n.pct,
			why: "Next · floor below is ready",
			kind: "next"
		});
	}
	return jobs;
}
function findMskCell(site, levelCode, tower, seq) {
	const level = site.mskLevels.find((l) => l.code === levelCode);
	const item = site.mskItems.find((i) => i.seq === seq);
	if (!level || !item) return null;
	const cell = site.mskProgress.find((p) => p.levelId === level.id && p.tower === tower && p.itemId === item.id);
	return {
		level,
		tower,
		item,
		pct: cell && !cell.na ? cell.pct : 0,
		na: cell?.na ?? false
	};
}
function towerFromFlag(code) {
	return (code ?? "").toUpperCase().includes("B") ? "B" : "A";
}
/**
* GM crew write the board on Save. Named plumbing subs (Aipoon / Aryan / Kolik)
* only land on the board after a GM check. That check is not the client PC claim.
*/
function shouldCommitProgress(contractor) {
	return contractor !== "SUB";
}
var SHORT_NAME = {
	1: "Sanitary",
	2: "Brick wall",
	3: "Concealed pipe",
	4: "Exhaust",
	5: "Elect. wiring",
	6: "Sprinkler",
	7: "Waterproof",
	8: "Plaster",
	9: "ACMV",
	10: "Lighting",
	11: "Dropper",
	12: "Tiles",
	13: "Door frame",
	14: "Window frame",
	15: "Cubicle",
	16: "Ceiling frame",
	17: "Ceiling board",
	18: "Vanity",
	19: "Mirror",
	20: "Fitting",
	21: "Signage",
	22: "Door panel",
	23: "Window"
};
function predecessorGap(activities, pctOf, seq, currentPct) {
	const preds = PREDECESSORS[seq] ?? [];
	for (const p of preds) {
		const pct = pctOf(p);
		if (pct < 80 && currentPct > pct + 20) {
			const act = activities.find((a) => a.seq === p);
			if (act) return {
				blockedBy: act,
				pct
			};
		}
	}
	return null;
}
function buildInsights(site, asOf) {
	const actById = new Map(site.activities.map((a) => [a.id, a]));
	const floorById = new Map(site.floors.map((f) => [f.id, f]));
	const toiletById = new Map(site.toilets.map((t) => [t.id, t]));
	const crewById = new Map(site.crew.map((c) => [c.id, c]));
	const gmActs = site.activities.filter(isGmActivity);
	const gmCrew = site.crew.filter(isGmCrew);
	const dateKey = (floorId, activityId) => `${floorId}:${activityId}`;
	const due = new Map(site.dates.map((d) => [dateKey(d.floorId, d.activityId), d.dueOn]));
	const pctMap = /* @__PURE__ */ new Map();
	for (const p of site.progress) pctMap.set(`${p.floorId}:${p.toiletId}:${p.activityId}`, p);
	function getPct(floorId, toiletId, activityId) {
		return pctMap.get(`${floorId}:${toiletId}:${activityId}`)?.pct ?? 0;
	}
	const floorAvgs = site.floors.map((floor) => {
		return {
			floor,
			avg: roundPct(mean(site.toilets.flatMap((t) => site.activities.map((a) => getPct(floor.id, t.id, a.id)))))
		};
	});
	const gmFloorAvgs = site.floors.map((floor) => {
		return {
			floor,
			avg: roundPct(mean(site.toilets.flatMap((t) => gmActs.map((a) => getPct(floor.id, t.id, a.id)))))
		};
	});
	const allCells = site.floors.flatMap((floor) => site.toilets.flatMap((t) => site.activities.map((a) => getPct(floor.id, t.id, a.id))));
	const gmCells = site.floors.flatMap((floor) => site.toilets.flatMap((t) => gmActs.map((a) => getPct(floor.id, t.id, a.id))));
	const sectionAvg = roundPct(mean(allCells));
	const gmSectionAvg = roundPct(mean(gmCells));
	const flags = [];
	for (const floor of site.floors) for (const act of site.activities) {
		const dueOn = due.get(dateKey(floor.id, act.id)) ?? asOf;
		const toiletStates = site.toilets.map((toilet) => {
			const pct = getPct(floor.id, toilet.id, act.id);
			const status = cellStatus(pct, dueOn, asOf);
			const pctOf = (seq) => {
				const a = site.activities.find((x) => x.seq === seq);
				return a ? getPct(floor.id, toilet.id, a.id) : 0;
			};
			return {
				toilet,
				pct,
				status,
				gap: predecessorGap(site.activities, pctOf, act.seq, pct)
			};
		});
		const missedToilets = toiletStates.filter((t) => t.status === "missed");
		const riskToilets = toiletStates.filter((t) => t.status === "risk");
		if (missedToilets.length) {
			const avg = roundPct(mean(missedToilets.map((t) => t.pct)));
			const codes = missedToilets.map((t) => t.toilet.code).join(", ");
			flags.push({
				id: `missed-${floor.code}-${act.seq}`,
				severity: avg < 50 ? "high" : "medium",
				kind: "missed",
				title: `${floor.code} · ${act.name} missed`,
				detail: `${codes} still open at ${avg}% avg. Due ${dueOn}. ${act.contractor}.`,
				floorCode: floor.code,
				activitySeq: act.seq,
				gm: act.gmTrade,
				board: "toilet"
			});
		}
		if (riskToilets.length) {
			const avg = roundPct(mean(riskToilets.map((t) => t.pct)));
			const codes = riskToilets.map((t) => t.toilet.code).join(", ");
			flags.push({
				id: `risk-${floor.code}-${act.seq}`,
				severity: "medium",
				kind: "risk",
				title: `${floor.code} · ${act.name} at risk`,
				detail: `${codes} due ${dueOn} (${daysBetween(asOf, dueOn)}d). Now ${avg}%.`,
				floorCode: floor.code,
				activitySeq: act.seq,
				gm: act.gmTrade,
				board: "toilet"
			});
		}
		for (const t of toiletStates) if (t.pct > 20 && t.gap && act.gmTrade) flags.push({
			id: `seq-${floor.code}-${t.toilet.code}-${act.seq}`,
			severity: "high",
			kind: "sequence",
			title: `${floor.code} ${t.toilet.code} skipped sequence`,
			detail: `${act.name} is ${t.pct}% but ${t.gap.blockedBy.name} is only ${t.gap.pct}%.`,
			floorCode: floor.code,
			toiletCode: t.toilet.code,
			activitySeq: act.seq,
			gm: true,
			board: "toilet"
		});
	}
	const todayAssign = site.assignments.filter((a) => {
		if (a.workDate !== asOf) return false;
		const crew = crewById.get(a.crewId);
		return crew ? isSiteCrew(crew) : false;
	});
	const byCrew = /* @__PURE__ */ new Map();
	for (const a of todayAssign) {
		const list = byCrew.get(a.crewId) ?? [];
		list.push(a);
		byCrew.set(a.crewId, list);
	}
	for (const [crewId, list] of byCrew) if (list.length >= 4) {
		const crew = crewById.get(crewId);
		flags.push({
			id: `spread-${crewId}`,
			severity: "medium",
			kind: "spread",
			title: `${crew?.callsign ?? "Crew"} on ${list.length} toilets today`,
			detail: "Too many locations for one person — check they were actually there.",
			floorCode: list[0] ? floorById.get(list[0].floorId)?.code ?? "" : "",
			gm: true,
			board: "toilet"
		});
	}
	const pendingByCell = /* @__PURE__ */ new Map();
	for (const a of todayAssign) {
		const floor = floorById.get(a.floorId);
		const toilet = toiletById.get(a.toiletId);
		const act = actById.get(a.activityId);
		const crew = crewById.get(a.crewId);
		if (a.claimedPct == null) continue;
		const boardPct = getPct(a.floorId, a.toiletId, a.activityId);
		const sub = crew ? isSubCrew(crew) : false;
		if (sub && !a.verified && !a.rejected && a.claimedPct !== boardPct) pendingByCell.set(`${a.floorId}:${a.toiletId}:${a.activityId}`, a);
		const jump = a.claimedPct - a.startPct;
		if (a.claimedPct < a.startPct) flags.push({
			id: `back-${a.id}`,
			severity: "high",
			kind: "lie",
			title: `${crew?.callsign ?? "Crew"} reversed progress`,
			detail: `${floor?.code} ${toilet?.code} ${act?.name}: ${a.startPct}% → ${a.claimedPct}%.`,
			floorCode: floor?.code ?? "",
			toiletCode: toilet?.code,
			activitySeq: act?.seq,
			gm: true,
			board: "toilet"
		});
		else if ((jump >= 30 || a.claimedPct >= 100) && !hasRealPhoto(a.photoData) && !a.verified) flags.push({
			id: `photo-${a.id}`,
			severity: "high",
			kind: "lie",
			title: `${crew?.callsign ?? "Crew"} · no photo for ${jump}% jump`,
			detail: sub ? `${floor?.code} ${toilet?.code} ${act?.name}: sub update ${a.claimedPct}%, board still ${boardPct}%.` : `${floor?.code} ${toilet?.code} ${act?.name}: ${a.startPct}% → ${a.claimedPct}% on the board with no photo.`,
			floorCode: floor?.code ?? "",
			toiletCode: toilet?.code,
			activitySeq: act?.seq,
			gm: true,
			board: "toilet"
		});
		else if (sub && !a.verified && !a.rejected && a.claimedPct !== a.startPct) flags.push({
			id: `unv-${a.id}`,
			severity: "low",
			kind: "unverified",
			title: `${crew?.callsign ?? "Crew"} sub update waiting GM check`,
			detail: `${floor?.code} ${toilet?.code} ${act?.name}: sub ${a.claimedPct}%, board ${boardPct}%. Not the client claim.`,
			floorCode: floor?.code ?? "",
			toiletCode: toilet?.code,
			activitySeq: act?.seq,
			gm: true,
			board: "toilet"
		});
	}
	const waitingOn = [];
	const waitSeen = /* @__PURE__ */ new Set();
	for (const floor of site.floors) for (const toilet of site.toilets) for (const act of gmActs) {
		const pct = getPct(floor.id, toilet.id, act.id);
		if (pct >= 100) continue;
		const preds = PREDECESSORS[act.seq] ?? [];
		for (const seq of preds) {
			const pred = site.activities.find((a) => a.seq === seq);
			if (!pred || pred.gmTrade) continue;
			const blockedPct = getPct(floor.id, toilet.id, pred.id);
			if (blockedPct >= 80) continue;
			const key = `${floor.id}-${toilet.id}-${act.id}-${pred.id}`;
			if (waitSeen.has(key)) continue;
			waitSeen.add(key);
			waitingOn.push({
				floor,
				toilet,
				activity: act,
				blockedBy: pred,
				pct,
				blockedPct
			});
		}
	}
	const waitByFloorAct = /* @__PURE__ */ new Map();
	for (const row of waitingOn) {
		const key = `${row.floor.id}-${row.activity.id}-${row.blockedBy.id}`;
		const list = waitByFloorAct.get(key) ?? [];
		list.push(row);
		waitByFloorAct.set(key, list);
	}
	for (const list of waitByFloorAct.values()) {
		const row = list[0];
		if (!row) continue;
		const codes = list.map((r) => r.toilet.code).join(", ");
		flags.push({
			id: `wait-${row.floor.code}-${row.activity.seq}-${row.blockedBy.seq}`,
			severity: "medium",
			kind: "waiting",
			title: `${row.floor.code} waiting on ${row.blockedBy.contractor}`,
			detail: `${row.activity.name} held — ${row.blockedBy.name} is ${roundPct(mean(list.map((r) => r.blockedPct)))}% on ${codes}.`,
			floorCode: row.floor.code,
			activitySeq: row.activity.seq,
			gm: true,
			board: "toilet"
		});
	}
	const expectedToday = [];
	for (const floor of site.floors) for (const toilet of site.toilets) for (const act of gmActs) {
		const pct = getPct(floor.id, toilet.id, act.id);
		const dueOn = due.get(dateKey(floor.id, act.id)) ?? asOf;
		const status = cellStatus(pct, dueOn, asOf);
		if (status === "missed" || status === "risk") expectedToday.push({
			floor,
			toilet,
			activity: act,
			pct,
			dueOn,
			status
		});
	}
	expectedToday.sort((a, b) => {
		const rank = {
			missed: 0,
			risk: 1,
			track: 2,
			done: 3
		};
		if (rank[a.status] !== rank[b.status]) return rank[a.status] - rank[b.status];
		if (a.floor.sortOrder !== b.floor.sortOrder) return a.floor.sortOrder - b.floor.sortOrder;
		return a.activity.seq - b.activity.seq;
	});
	flags.sort((a, b) => {
		const rank = {
			high: 0,
			medium: 1,
			low: 2
		};
		return rank[a.severity] - rank[b.severity];
	});
	const remainingByFloor = site.floors.map((floor) => {
		return {
			floor,
			remaining: roundPct(mean(site.toilets.flatMap((t) => gmActs.map((a) => 100 - getPct(floor.id, t.id, a.id)))))
		};
	});
	const gmRemaining = [];
	for (const floor of site.floors) for (const toilet of site.toilets) for (const act of gmActs) {
		const pct = getPct(floor.id, toilet.id, act.id);
		if (pct >= 100) continue;
		const dueOn = due.get(dateKey(floor.id, act.id)) ?? asOf;
		gmRemaining.push({
			floor,
			toilet,
			activity: act,
			pct,
			dueOn,
			status: cellStatus(pct, dueOn, asOf)
		});
	}
	const gmFlags = flags.filter((f) => f.gm);
	const gmTradeAvg = (seq) => {
		const act = gmActs.find((a) => a.seq === seq);
		if (!act) return 0;
		return roundPct(mean(site.floors.flatMap((floor) => site.toilets.map((t) => getPct(floor.id, t.id, act.id)))));
	};
	return {
		sectionAvg,
		gmSectionAvg,
		floorAvgs,
		gmFloorAvgs,
		remainingByFloor,
		flags: gmFlags,
		allFlags: flags,
		expectedToday,
		gmRemaining,
		waitingOn,
		todayAssign,
		pendingByCell,
		gmActs,
		gmCrew,
		gmTradeAvg,
		getPct,
		due,
		actById,
		floorById,
		toiletById,
		crewById
	};
}
var STATUS_LABEL = {
	done: "Completed",
	missed: "Missed / hole",
	risk: "Risk / next in line",
	track: "In progress on track"
};
function mskStatus(pct, na, aboveStarted, belowReady) {
	if (na) return "na";
	if (pct >= 100) return "done";
	if (pct === 0 && aboveStarted) return "missed";
	if (pct > 0 && pct < 100 && aboveStarted) return "risk";
	if (pct === 0 && belowReady) return "risk";
	if (pct > 0 && pct < 50 && belowReady) return "risk";
	return "track";
}
function buildMskInsights(site, asOf) {
	const itemById = new Map(site.mskItems.map((i) => [i.id, i]));
	const levelById = new Map(site.mskLevels.map((l) => [l.id, l]));
	const crewById = new Map(site.crew.map((c) => [c.id, c]));
	const sortedLevels = [...site.mskLevels].sort((a, b) => a.sortOrder - b.sortOrder);
	const cellMap = /* @__PURE__ */ new Map();
	for (const p of site.mskProgress) cellMap.set(`${p.levelId}:${p.tower}:${p.itemId}`, p);
	function cell(levelId, tower, itemId) {
		return cellMap.get(`${levelId}:${tower}:${itemId}`);
	}
	function getPct(levelId, tower, itemId) {
		const c = cell(levelId, tower, itemId);
		if (!c || c.na) return 0;
		return c.pct;
	}
	function isNa(levelId, tower, itemId) {
		return cell(levelId, tower, itemId)?.na ?? false;
	}
	function aboveStarted(level, tower, itemId) {
		return sortedLevels.some((l) => l.sortOrder > level.sortOrder && !isNa(l.id, tower, itemId) && getPct(l.id, tower, itemId) > 0);
	}
	function belowReady(level, tower, itemId) {
		const lower = sortedLevels.filter((l) => l.sortOrder < level.sortOrder && !isNa(l.id, tower, itemId));
		if (lower.length === 0) return true;
		const nearest = lower[lower.length - 1];
		if (!nearest) return true;
		return getPct(nearest.id, tower, itemId) >= 80;
	}
	function statusOf(level, tower, item) {
		const c = cell(level.id, tower, item.id);
		return mskStatus(c?.na ? 0 : c?.pct ?? 0, c?.na ?? false, aboveStarted(level, tower, item.id), belowReady(level, tower, item.id));
	}
	const liveCells = [];
	const byTrade = {
		CW: [],
		SAN: [],
		IRR: []
	};
	const byTower = {
		A: [],
		B: []
	};
	const byItem = /* @__PURE__ */ new Map();
	for (const p of site.mskProgress) {
		if (p.na) continue;
		liveCells.push(p.pct);
		const item = itemById.get(p.itemId);
		if (item) {
			byTrade[item.trade].push(p.pct);
			const list = byItem.get(item.id) ?? [];
			list.push(p.pct);
			byItem.set(item.id, list);
		}
		byTower[p.tower].push(p.pct);
	}
	const tradeRaw = {
		CW: mean(byTrade.CW),
		SAN: mean(byTrade.SAN),
		IRR: mean(byTrade.IRR)
	};
	const tradeAvg = {
		CW: roundPct(tradeRaw.CW),
		SAN: roundPct(tradeRaw.SAN),
		IRR: roundPct(tradeRaw.IRR)
	};
	const weightSum = TRADE_WEIGHT.CW + TRADE_WEIGHT.SAN + TRADE_WEIGHT.IRR;
	const weightedAvg = roundPct((tradeRaw.CW * TRADE_WEIGHT.CW + tradeRaw.SAN * TRADE_WEIGHT.SAN + tradeRaw.IRR * TRADE_WEIGHT.IRR) / weightSum);
	const towerAvg = {
		A: roundPct(mean(byTower.A)),
		B: roundPct(mean(byTower.B))
	};
	const levelRows = sortedLevels.map((level) => {
		const towers = ["A", "B"].map((tower) => {
			return {
				tower,
				avg: roundPct(mean(site.mskItems.map((item) => cell(level.id, tower, item.id)).filter((c) => !!c && !c.na).map((c) => c.pct)))
			};
		});
		const raw = mean(site.mskItems.flatMap((item) => ["A", "B"].map((tower) => cell(level.id, tower, item.id)).filter((c) => !!c && !c.na).map((c) => c.pct)));
		return {
			level,
			A: towers[0]?.avg ?? 0,
			B: towers[1]?.avg ?? 0,
			avg: roundPct(raw)
		};
	});
	const itemAvgs = site.mskItems.map((item) => ({
		item,
		avg: roundPct(mean(byItem.get(item.id) ?? []))
	}));
	const flags = [];
	const holes = [];
	const nextInLine = [];
	for (const item of site.mskItems) {
		for (const tower of ["A", "B"]) for (const level of sortedLevels) {
			const c = cell(level.id, tower, item.id);
			if (!c || c.na) continue;
			const st = statusOf(level, tower, item);
			if (st === "missed") holes.push({
				level,
				tower,
				item,
				pct: c.pct,
				status: "missed"
			});
			else if (st === "risk" && c.pct === 0) nextInLine.push({
				level,
				tower,
				item,
				pct: c.pct
			});
		}
		for (const level of sortedLevels) {
			const a = cell(level.id, "A", item.id);
			const b = cell(level.id, "B", item.id);
			if (!a || !b || a.na || b.na) continue;
			const gap = a.pct - b.pct;
			if (Math.abs(gap) >= 50 && Math.max(a.pct, b.pct) >= 80 && Math.min(a.pct, b.pct) <= 25) {
				const lagTower = gap > 0 ? "B" : "A";
				const lead = gap > 0 ? "A" : "B";
				flags.push({
					id: `lag-${level.code}-${item.seq}`,
					severity: "medium",
					kind: "lag",
					title: `${level.code} T${lagTower} lagging ${item.shortName}`,
					detail: `T${lead} is ${Math.max(a.pct, b.pct)}% · T${lagTower} is ${Math.min(a.pct, b.pct)}%. Same floor, same package.`,
					floorCode: level.code,
					toiletCode: `T${lagTower}`,
					activitySeq: item.seq,
					gm: true,
					board: "msk"
				});
			}
		}
	}
	const holeFront = /* @__PURE__ */ new Set();
	for (const h of [...holes].sort((a, b) => b.level.sortOrder - a.level.sortOrder)) {
		const key = `${h.item.id}-${h.tower}`;
		if (holeFront.has(key)) continue;
		holeFront.add(key);
		flags.push({
			id: `hole-${h.level.code}-${h.tower}-${h.item.seq}`,
			severity: h.pct === 0 ? "high" : "medium",
			kind: "hole",
			title: `${h.level.code} T${h.tower} skipped · ${h.item.shortName}`,
			detail: h.pct === 0 ? `Live hole — a higher floor already started ${h.item.name}. Tap to log %.` : `This floor is only ${h.pct}% while a higher floor already moved on. Tap to log %.`,
			floorCode: h.level.code,
			toiletCode: `T${h.tower}`,
			activitySeq: h.item.seq,
			gm: true,
			board: "msk"
		});
	}
	const nextFlags = /* @__PURE__ */ new Set();
	for (const n of nextInLine) {
		const key = `${n.item.id}-${n.tower}`;
		if (nextFlags.has(key)) continue;
		nextFlags.add(key);
		flags.push({
			id: `next-${n.level.code}-${n.tower}-${n.item.seq}`,
			severity: "medium",
			kind: "risk",
			title: `${n.level.code} T${n.tower} next · ${n.item.shortName}`,
			detail: `Floor below is ready. ${n.item.name} not started.`,
			floorCode: n.level.code,
			toiletCode: `T${n.tower}`,
			activitySeq: n.item.seq,
			gm: true,
			board: "msk"
		});
	}
	const todayAssign = site.mskAssignments.filter((a) => {
		if (a.workDate !== asOf) return false;
		const crew = crewById.get(a.crewId);
		return crew ? isSiteCrew(crew) : false;
	});
	const pendingByCell = /* @__PURE__ */ new Map();
	for (const a of todayAssign) {
		const level = levelById.get(a.levelId);
		const item = itemById.get(a.itemId);
		const crew = crewById.get(a.crewId);
		if (a.claimedPct == null) continue;
		const boardPct = getPct(a.levelId, a.tower, a.itemId);
		const sub = crew ? isSubCrew(crew) : false;
		if (sub && !a.verified && !a.rejected && a.claimedPct !== boardPct) pendingByCell.set(`${a.levelId}:${a.tower}:${a.itemId}`, a);
		const jump = a.claimedPct - a.startPct;
		if (a.claimedPct < a.startPct) flags.push({
			id: `msk-back-${a.id}`,
			severity: "high",
			kind: "lie",
			title: `${crew?.callsign ?? "Crew"} reversed MSK progress`,
			detail: `${level?.code} T${a.tower} ${item?.name}: ${a.startPct}% → ${a.claimedPct}%.`,
			floorCode: level?.code ?? "",
			toiletCode: `T${a.tower}`,
			activitySeq: item?.seq,
			gm: true,
			board: "msk"
		});
		else if ((jump >= 30 || a.claimedPct >= 100) && !hasRealPhoto(a.photoData) && !a.verified) flags.push({
			id: `msk-photo-${a.id}`,
			severity: "high",
			kind: "lie",
			title: `${crew?.callsign ?? "Crew"} · no photo for ${jump}% jump`,
			detail: sub ? `${level?.code} T${a.tower} ${item?.name}: sub update ${a.claimedPct}%, board still ${boardPct}%.` : `${level?.code} T${a.tower} ${item?.name}: ${a.startPct}% → ${a.claimedPct}% on the board with no photo.`,
			floorCode: level?.code ?? "",
			toiletCode: `T${a.tower}`,
			activitySeq: item?.seq,
			gm: true,
			board: "msk"
		});
		else if (sub && !a.verified && !a.rejected && a.claimedPct !== a.startPct) flags.push({
			id: `msk-unv-${a.id}`,
			severity: "low",
			kind: "unverified",
			title: `${crew?.callsign ?? "Crew"} sub update waiting GM check`,
			detail: `${level?.code} T${a.tower} ${item?.name}: sub ${a.claimedPct}%, board ${boardPct}%. Not the client claim.`,
			floorCode: level?.code ?? "",
			toiletCode: `T${a.tower}`,
			activitySeq: item?.seq,
			gm: true,
			board: "msk"
		});
	}
	flags.sort((a, b) => {
		const rank = {
			high: 0,
			medium: 1,
			low: 2
		};
		return rank[a.severity] - rank[b.severity];
	});
	return {
		weightedAvg,
		tradeAvg,
		towerAvg,
		levelRows,
		itemAvgs,
		flags,
		holes,
		nextInLine,
		todayAssign,
		pendingByCell,
		wave: site.mskItems.map((item) => {
			return {
				item,
				fronts: ["A", "B"].map((tower) => {
					let front = null;
					for (const level of sortedLevels) {
						if (isNa(level.id, tower, item.id)) continue;
						if (getPct(level.id, tower, item.id) > 0) front = level;
					}
					return {
						tower,
						front
					};
				})
			};
		}),
		getPct,
		isNa,
		statusOf,
		cell,
		itemById,
		levelById,
		crewById,
		liveAvg: roundPct(mean(liveCells))
	};
}
function formatRm(n) {
	return n.toLocaleString("en-MY", {
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	});
}
function claimPct(work, contract) {
	if (contract <= 0) return 0;
	return roundPct(work / contract * 100);
}
//#endregion
export { siteCrewGrouped as A, mean as C, roundPct as D, rankMskJobs as E, seedAssignPhoto as O, hasRealPhoto as S, photoList as T, cellStatus as _, MSK_ITEMS as a, findMskCell as b, MSK_REV as c, SHORT_NAME as d, STATUS_LABEL as f, buildMskInsights as g, buildInsights as h, MSK_ASSIGNMENT_SEED as i, towerFromFlag as j, shouldCommitProgress as k, PREDECESSORS as l, TRADE_WEIGHT as m, CLAIM as n, MSK_LEVELS as o, TRADE_LABEL as p, FLOOR_PLANS as r, MSK_PROGRESS as s, BUILDING_STACK as t, SECTION_PLAN as u, claimPct as v, packPhotos as w, formatRm as x, daysBetween as y };
