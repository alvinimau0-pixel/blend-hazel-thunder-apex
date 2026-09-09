import { o as getSql, t as addDaysIso, u as todayIso } from "./utils-DyetTdWh.mjs";
import { t as createServerFn } from "./ssr.mjs";
import { a as object, i as number, o as string, t as _enum } from "../_libs/zod.mjs";
import { O as seedAssignPhoto, T as photoList, a as MSK_ITEMS, c as MSK_REV, i as MSK_ASSIGNMENT_SEED, k as shouldCommitProgress, m as TRADE_WEIGHT, o as MSK_LEVELS, s as MSK_PROGRESS, w as packPhotos } from "./domain-B9hSVQhA.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site.functions-aNT7XKFK.js
var SCHEDULE_REV = "2026-08-28";
var COMPANY_REV = "gm-2026-09-02-teams";
var PROJECT = {
	name: "The Capitol",
	code: "CAPITOL-MSK",
	subject: "Cold water, sanitary & irrigation — Capitol MSK",
	section: "MSK · Towers A & B",
	clientName: "The Capitol",
	companyName: "Gelaran Maju Sdn Bhd"
};
var ACTIVITY_SEED = [
	{
		seq: 1,
		name: "Sanitary piping",
		contractor: "GM",
		gmTrade: true
	},
	{
		seq: 2,
		name: "Brick wall",
		contractor: "INNOV",
		gmTrade: false
	},
	{
		seq: 3,
		name: "Concealed CW & FW piping, elect. conduit",
		contractor: "GM & MCCT",
		gmTrade: true
	},
	{
		seq: 4,
		name: "Exhaust fan and duct",
		contractor: "PH",
		gmTrade: false
	},
	{
		seq: 5,
		name: "Electrical conduit and wiring",
		contractor: "MCCT",
		gmTrade: false
	},
	{
		seq: 6,
		name: "Sprinkler cut off point",
		contractor: "SKK",
		gmTrade: false
	},
	{
		seq: 7,
		name: "Waterproof",
		contractor: "MONARCH",
		gmTrade: false
	},
	{
		seq: 8,
		name: "Plaster & screed",
		contractor: "CSY & CAPRI",
		gmTrade: false
	},
	{
		seq: 9,
		name: "ACMV grille & diffuser",
		contractor: "PH",
		gmTrade: false
	},
	{
		seq: 10,
		name: "Lighting",
		contractor: "MCCT",
		gmTrade: false
	},
	{
		seq: 11,
		name: "Dropper & sprinkler cap",
		contractor: "SKK",
		gmTrade: false
	},
	{
		seq: 12,
		name: "Tiles",
		contractor: "CSY, CAPRI, SCW",
		gmTrade: false
	},
	{
		seq: 13,
		name: "Door frame",
		contractor: "INNOV",
		gmTrade: false
	},
	{
		seq: 14,
		name: "Window frame",
		contractor: "UTV",
		gmTrade: false
	},
	{
		seq: 15,
		name: "Toilet cubicle",
		contractor: "ASUWARIS",
		gmTrade: false
	},
	{
		seq: 16,
		name: "Ceiling frame",
		contractor: "PIC & FIE",
		gmTrade: false
	},
	{
		seq: 17,
		name: "Ceiling board",
		contractor: "PIC & FIE",
		gmTrade: false
	},
	{
		seq: 18,
		name: "Vanity counter",
		contractor: "SCW & NP",
		gmTrade: false
	},
	{
		seq: 19,
		name: "Vanity mirror",
		contractor: "SCW & NP",
		gmTrade: false
	},
	{
		seq: 20,
		name: "Sanitary fitting",
		contractor: "GM",
		gmTrade: true
	},
	{
		seq: 21,
		name: "Signage",
		contractor: "LAB",
		gmTrade: false
	},
	{
		seq: 22,
		name: "Door panel",
		contractor: "PIC & UTV",
		gmTrade: false
	},
	{
		seq: 23,
		name: "Window",
		contractor: "PIC & UTV",
		gmTrade: false
	}
];
var FLOOR_CODES = [
	"CL14",
	"CL15",
	"CL16",
	"CL17",
	"CL18",
	"CL19"
];
var TOILET_SEED = [
	{
		code: "T4",
		tower: "TA"
	},
	{
		code: "T5",
		tower: "TA"
	},
	{
		code: "T6",
		tower: "TB"
	},
	{
		code: "T7",
		tower: "TB"
	}
];
var FLOOR_DATES = {
	CL14: [
		"2026-06-26",
		"2026-07-22",
		"2026-08-06",
		"2026-07-23",
		"2026-07-23",
		"2026-07-23",
		"2026-07-24",
		"2026-07-26",
		"2026-08-10",
		"2026-08-10",
		"2026-08-10",
		"2026-08-09",
		"2026-08-11",
		"2026-08-11",
		"2026-08-13",
		"2026-08-17",
		"2026-08-20",
		"2026-08-21",
		"2026-08-21",
		"2026-08-22",
		"2026-08-22",
		"2026-08-22",
		"2026-08-22"
	],
	CL15: [
		"2026-06-30",
		"2026-07-27",
		"2026-08-09",
		"2026-07-26",
		"2026-07-26",
		"2026-07-26",
		"2026-07-29",
		"2026-07-31",
		"2026-08-13",
		"2026-08-13",
		"2026-08-13",
		"2026-08-12",
		"2026-08-14",
		"2026-08-14",
		"2026-08-16",
		"2026-08-19",
		"2026-08-23",
		"2026-08-24",
		"2026-08-24",
		"2026-08-25",
		"2026-08-25",
		"2026-08-25",
		"2026-08-25"
	],
	CL16: [
		"2026-07-03",
		"2026-08-02",
		"2026-08-12",
		"2026-08-12",
		"2026-08-12",
		"2026-08-12",
		"2026-08-03",
		"2026-08-15",
		"2026-08-16",
		"2026-08-16",
		"2026-08-16",
		"2026-08-15",
		"2026-08-17",
		"2026-08-17",
		"2026-08-19",
		"2026-08-22",
		"2026-08-26",
		"2026-08-27",
		"2026-08-27",
		"2026-08-28",
		"2026-08-28",
		"2026-08-28",
		"2026-08-28"
	],
	CL17: [
		"2026-07-07",
		"2026-08-07",
		"2026-08-15",
		"2026-08-01",
		"2026-08-01",
		"2026-08-01",
		"2026-08-08",
		"2026-08-11",
		"2026-08-19",
		"2026-08-19",
		"2026-08-19",
		"2026-08-18",
		"2026-08-20",
		"2026-08-20",
		"2026-08-22",
		"2026-08-25",
		"2026-08-29",
		"2026-08-30",
		"2026-08-30",
		"2026-08-31",
		"2026-08-31",
		"2026-08-31",
		"2026-08-31"
	],
	CL18: [
		"2026-07-11",
		"2026-08-12",
		"2026-08-18",
		"2026-08-04",
		"2026-08-04",
		"2026-08-04",
		"2026-08-13",
		"2026-08-16",
		"2026-08-30",
		"2026-08-30",
		"2026-08-30",
		"2026-08-21",
		"2026-08-23",
		"2026-08-23",
		"2026-08-25",
		"2026-08-28",
		"2026-09-01",
		"2026-09-02",
		"2026-09-02",
		"2026-09-03",
		"2026-09-03",
		"2026-09-03",
		"2026-09-03"
	],
	CL19: [
		"2026-07-15",
		"2026-08-17",
		"2026-08-23",
		"2026-08-07",
		"2026-08-07",
		"2026-08-07",
		"2026-08-18",
		"2026-08-21",
		"2026-09-07",
		"2026-09-07",
		"2026-09-07",
		"2026-08-24",
		"2026-08-26",
		"2026-08-26",
		"2026-08-28",
		"2026-08-30",
		"2026-09-04",
		"2026-09-05",
		"2026-09-05",
		"2026-09-06",
		"2026-09-06",
		"2026-09-06",
		"2026-09-06"
	]
};
var S = (v) => v;
var PROGRESS_SEED = {
	CL14: {
		T4: S([
			100,
			100,
			100,
			100,
			100,
			100,
			100,
			100,
			50,
			50,
			100,
			100,
			100,
			75,
			100,
			80,
			60,
			100,
			10,
			35,
			0,
			90,
			75
		]),
		T5: S([
			100,
			100,
			100,
			100,
			100,
			100,
			100,
			100,
			50,
			50,
			100,
			100,
			100,
			75,
			100,
			80,
			60,
			100,
			10,
			35,
			0,
			90,
			75
		]),
		T6: S([
			100,
			100,
			100,
			100,
			100,
			100,
			100,
			100,
			50,
			50,
			100,
			100,
			100,
			75,
			100,
			80,
			60,
			100,
			10,
			35,
			0,
			90,
			75
		]),
		T7: S([
			100,
			100,
			100,
			100,
			100,
			100,
			100,
			100,
			50,
			50,
			100,
			100,
			100,
			75,
			100,
			80,
			60,
			100,
			10,
			35,
			0,
			90,
			75
		])
	},
	CL15: {
		T4: S([
			100,
			100,
			100,
			100,
			100,
			100,
			100,
			100,
			0,
			0,
			100,
			100,
			100,
			30,
			100,
			50,
			50,
			30,
			10,
			35,
			0,
			0,
			0
		]),
		T5: S([
			100,
			100,
			100,
			100,
			100,
			100,
			100,
			100,
			0,
			0,
			100,
			100,
			100,
			30,
			100,
			50,
			50,
			30,
			10,
			35,
			0,
			0,
			0
		]),
		T6: S([
			100,
			100,
			100,
			100,
			100,
			100,
			100,
			100,
			0,
			0,
			100,
			100,
			100,
			30,
			50,
			50,
			50,
			15,
			10,
			35,
			0,
			0,
			0
		]),
		T7: S([
			100,
			100,
			100,
			100,
			100,
			100,
			100,
			100,
			0,
			0,
			100,
			100,
			100,
			30,
			50,
			50,
			50,
			15,
			10,
			35,
			0,
			0,
			0
		])
	},
	CL16: {
		T4: S([
			100,
			100,
			100,
			100,
			100,
			100,
			100,
			100,
			0,
			0,
			100,
			100,
			100,
			30,
			20,
			25,
			10,
			0,
			0,
			0,
			0,
			0,
			0
		]),
		T5: S([
			100,
			100,
			100,
			100,
			100,
			100,
			100,
			100,
			0,
			0,
			100,
			100,
			100,
			30,
			20,
			25,
			0,
			0,
			0,
			0,
			0,
			0,
			0
		]),
		T6: S([
			100,
			100,
			100,
			100,
			100,
			100,
			100,
			100,
			0,
			0,
			100,
			61,
			100,
			30,
			0,
			25,
			0,
			0,
			0,
			0,
			0,
			0,
			0
		]),
		T7: S([
			100,
			100,
			100,
			100,
			100,
			100,
			100,
			100,
			0,
			0,
			100,
			100,
			100,
			30,
			0,
			25,
			0,
			0,
			0,
			0,
			0,
			0,
			0
		])
	},
	CL17: {
		T4: S([
			100,
			100,
			100,
			100,
			100,
			100,
			100,
			100,
			0,
			0,
			100,
			50,
			100,
			30,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0
		]),
		T5: S([
			100,
			100,
			100,
			100,
			100,
			100,
			100,
			100,
			0,
			0,
			100,
			50,
			100,
			30,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0
		]),
		T6: S([
			100,
			100,
			100,
			100,
			100,
			100,
			100,
			100,
			0,
			0,
			100,
			0,
			100,
			30,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0
		]),
		T7: S([
			100,
			100,
			100,
			100,
			100,
			100,
			100,
			100,
			0,
			0,
			100,
			0,
			100,
			30,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0
		])
	},
	CL18: {
		T4: S([
			100,
			100,
			100,
			100,
			100,
			100,
			100,
			100,
			0,
			0,
			100,
			20,
			100,
			30,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0
		]),
		T5: S([
			100,
			100,
			100,
			100,
			100,
			100,
			100,
			100,
			0,
			0,
			100,
			20,
			100,
			30,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0
		]),
		T6: S([
			100,
			100,
			100,
			100,
			100,
			100,
			100,
			100,
			0,
			0,
			100,
			0,
			100,
			30,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0
		]),
		T7: S([
			100,
			100,
			100,
			100,
			100,
			100,
			100,
			100,
			0,
			0,
			100,
			0,
			100,
			30,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0
		])
	},
	CL19: {
		T4: S([
			100,
			100,
			100,
			30,
			100,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			100,
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
		]),
		T5: S([
			100,
			100,
			100,
			30,
			100,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			100,
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
		]),
		T6: S([
			100,
			100,
			100,
			100,
			100,
			0,
			10,
			0,
			0,
			0,
			0,
			0,
			100,
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
		]),
		T7: S([
			100,
			100,
			0,
			20,
			100,
			0,
			10,
			0,
			0,
			0,
			0,
			0,
			100,
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
		])
	}
};
var CREW_SEED = [
	{
		callsign: "Supaham",
		contractor: "GM",
		trade: "Team leader"
	},
	{
		callsign: "Solihin",
		contractor: "GM",
		trade: "Coring"
	},
	{
		callsign: "Ashraful",
		contractor: "GM",
		trade: "Coring"
	},
	{
		callsign: "Jiarul",
		contractor: "GM",
		trade: "Coring"
	},
	{
		callsign: "Yasin",
		contractor: "GM",
		trade: "Coring"
	},
	{
		callsign: "Asgar",
		contractor: "GM",
		trade: "Pumps"
	},
	{
		callsign: "Rana",
		contractor: "GM",
		trade: "Pumps"
	},
	{
		callsign: "Suhairi",
		contractor: "GM",
		trade: "Pipe sleeve"
	},
	{
		callsign: "Supendi",
		contractor: "GM",
		trade: "Pipe sleeve"
	},
	{
		callsign: "Bilal",
		contractor: "GM",
		trade: "Concealed pipe"
	},
	{
		callsign: "Farhad",
		contractor: "GM",
		trade: "Concealed pipe"
	},
	{
		callsign: "Sofikul",
		contractor: "GM",
		trade: "Concealed pipe"
	},
	{
		callsign: "Amirul",
		contractor: "GM",
		trade: "Concealed pipe"
	},
	{
		callsign: "Nurul",
		contractor: "GM",
		trade: "Concealed pipe"
	},
	{
		callsign: "Nazmul",
		contractor: "GM",
		trade: "Concealed pipe"
	},
	{
		callsign: "Jewel",
		contractor: "GM",
		trade: "Irrigation outlet"
	},
	{
		callsign: "Badol",
		contractor: "GM",
		trade: "Irrigation outlet"
	},
	{
		callsign: "Jillur",
		contractor: "GM",
		trade: "Tenant"
	},
	{
		callsign: "Islam",
		contractor: "GM",
		trade: "Tenant"
	},
	{
		callsign: "Sarip",
		contractor: "GM",
		trade: "Backshaft"
	},
	{
		callsign: "Syahib",
		contractor: "GM",
		trade: "Backshaft"
	},
	{
		callsign: "Emon",
		contractor: "GM",
		trade: "Tenant"
	},
	{
		callsign: "Mahmud",
		contractor: "GM",
		trade: "Tenant"
	},
	{
		callsign: "Ibnu",
		contractor: "GM",
		trade: "Floortrap"
	},
	{
		callsign: "Damil",
		contractor: "GM",
		trade: "Floortrap"
	},
	{
		callsign: "Kamal",
		contractor: "GM",
		trade: "Housekeeping"
	},
	{
		callsign: "Lihin",
		contractor: "GM",
		trade: "Piping"
	},
	{
		callsign: "Aipoon",
		contractor: "SUB",
		trade: "Toilet + tenant L24–L30"
	},
	{
		callsign: "Aryan",
		contractor: "SUB",
		trade: "SS welding"
	},
	{
		callsign: "Kolik",
		contractor: "SUB",
		trade: "Sanitary fitting"
	}
];
var ASSIGNMENT_SEED = [
	{
		workDate: "2026-08-29",
		callsign: "Sarip",
		floor: "CL14",
		toilet: "T6",
		seq: 20,
		startPct: 35,
		claimedPct: 55,
		note: "Basin mixer T6 installed. Angle valve pending.",
		verified: false,
		rejected: false,
		hasPhoto: true
	},
	{
		workDate: "2026-08-29",
		callsign: "Nurul",
		floor: "CL14",
		toilet: "T7",
		seq: 20,
		startPct: 35,
		claimedPct: 60,
		note: "WC pan set. Flush valve tomorrow.",
		verified: false,
		rejected: false,
		hasPhoto: true
	},
	{
		workDate: "2026-08-29",
		callsign: "Nazmul",
		floor: "CL14",
		toilet: "T4",
		seq: 20,
		startPct: 35,
		claimedPct: 100,
		note: "All fittings done.",
		verified: false,
		rejected: false,
		hasPhoto: false
	},
	{
		workDate: "2026-08-29",
		callsign: "Islam",
		floor: "CL19",
		toilet: "T7",
		seq: 3,
		startPct: 0,
		claimedPct: 80,
		note: "Concealed piping almost finish.",
		verified: false,
		rejected: false,
		hasPhoto: false
	},
	{
		workDate: "2026-08-29",
		callsign: "Yasin",
		floor: "CL15",
		toilet: "T4",
		seq: 20,
		startPct: 35,
		claimedPct: 50,
		note: "Basin first fix. Waiting mixer.",
		verified: true,
		rejected: false,
		hasPhoto: true
	},
	{
		workDate: "2026-08-29",
		callsign: "Jiarul",
		floor: "CL16",
		toilet: "T4",
		seq: 20,
		startPct: 0,
		claimedPct: 0,
		note: "Cannot start fittings. Vanity not in. Tiles still wet.",
		verified: false,
		rejected: false,
		hasPhoto: false
	},
	{
		workDate: "2026-08-29",
		callsign: "Kamal",
		floor: "CL14",
		toilet: "T5",
		seq: 20,
		startPct: 35,
		claimedPct: 35,
		note: "Housekeeping CL14 toilets. Protect installed fittings.",
		verified: true,
		rejected: false,
		hasPhoto: false
	},
	{
		workDate: "2026-08-29",
		callsign: "Bilal",
		floor: "CL14",
		toilet: "T5",
		seq: 20,
		startPct: 35,
		claimedPct: 40,
		note: "Started WC. Need more pan connectors.",
		verified: false,
		rejected: false,
		hasPhoto: true
	},
	{
		workDate: "2026-08-27",
		callsign: "Sarip",
		floor: "CL14",
		toilet: "T6",
		seq: 20,
		startPct: 20,
		claimedPct: 35,
		note: "First fix sanitary.",
		verified: true,
		rejected: false,
		hasPhoto: true
	},
	{
		workDate: "2026-08-29",
		callsign: "Kolik",
		floor: "CL16",
		toilet: "T5",
		seq: 20,
		startPct: 0,
		claimedPct: 25,
		note: "Started fittings T5. Waiting GM check.",
		verified: false,
		rejected: false,
		hasPhoto: false
	},
	{
		workDate: "2026-09-01",
		callsign: "Kolik",
		floor: "CL16",
		toilet: "T5",
		seq: 20,
		startPct: 0,
		claimedPct: 25,
		note: "Not this claim. SAN toilets L23–L27 TA & TB done — see MSK sub claim.",
		verified: false,
		rejected: true,
		hasPhoto: false
	}
];
var AUDIT_SEED = [
	{
		createdAt: "2026-08-22T09:10:00+08:00",
		kind: "progress",
		floor: "CL14",
		toilet: "T6",
		seq: 20,
		fromPct: 0,
		toPct: 20,
		callsign: "Sarip",
		note: "Started fittings"
	},
	{
		createdAt: "2026-08-25T16:40:00+08:00",
		kind: "progress",
		floor: "CL14",
		toilet: "T6",
		seq: 20,
		fromPct: 20,
		toPct: 35,
		callsign: "Sarip",
		note: "Basin + WC first fix"
	},
	{
		createdAt: "2026-08-26T15:20:00+08:00",
		kind: "progress",
		floor: "CL15",
		toilet: "T4",
		seq: 20,
		fromPct: 20,
		toPct: 35,
		callsign: "Yasin",
		note: "Fitting first fix"
	},
	{
		createdAt: "2026-08-21T10:00:00+08:00",
		kind: "progress",
		floor: "CL14",
		toilet: "T4",
		seq: 20,
		fromPct: 0,
		toPct: 35,
		callsign: "Nazmul",
		note: "Started fittings TA"
	},
	{
		createdAt: "2026-08-28T08:10:00+08:00",
		kind: "assign",
		floor: "CL19",
		toilet: "T7",
		seq: 3,
		fromPct: 0,
		toPct: 0,
		callsign: "Islam",
		note: "Concealed piping T7"
	},
	{
		createdAt: "2026-08-28T19:30:00+08:00",
		kind: "import",
		floor: "CL19",
		toilet: "T7",
		seq: 3,
		fromPct: 100,
		toPct: 0,
		callsign: "SHEET",
		note: "Official sheet 28 AUG 26 — T7 concealed reset to 0%"
	}
];
async function insertRows(table, columns, rows) {
	if (rows.length === 0) return;
	const sql = await getSql();
	const colList = columns.join(", ");
	const chunkSize = 80;
	for (let i = 0; i < rows.length; i += chunkSize) {
		const chunk = rows.slice(i, i + chunkSize);
		const params = [];
		const tuples = chunk.map((row) => {
			return `(${row.map((val) => {
				params.push(val);
				return `$${params.length}`;
			}).join(", ")})`;
		});
		await sql.query(`insert into ${table} (${colList}) values ${tuples.join(", ")}`, params);
	}
}
async function upsertRows(table, columns, rows, conflict, updateSet) {
	if (rows.length === 0) return;
	const sql = await getSql();
	const colList = columns.join(", ");
	const chunkSize = 80;
	for (let i = 0; i < rows.length; i += chunkSize) {
		const chunk = rows.slice(i, i + chunkSize);
		const params = [];
		const tuples = chunk.map((row) => {
			return `(${row.map((val) => {
				params.push(val);
				return `$${params.length}`;
			}).join(", ")})`;
		});
		await sql.query(`insert into ${table} (${colList}) values ${tuples.join(", ")}
       on conflict (${conflict}) do update set ${updateSet}`, params);
	}
}
function scheduleRows(floors, toilets, acts) {
	const floorId = Object.fromEntries(floors.map((f) => [f.code, f.id]));
	const toiletId = Object.fromEntries(toilets.map((t) => [t.code, t.id]));
	const actId = Object.fromEntries(acts.map((a) => [a.seq, a.id]));
	const dateRows = [];
	const progRows = [];
	for (const code of FLOOR_CODES) {
		const dates = FLOOR_DATES[code];
		for (let i = 0; i < dates.length; i++) dateRows.push([
			floorId[code],
			actId[i + 1],
			dates[i]
		]);
		const byToilet = PROGRESS_SEED[code];
		for (const tcode of Object.keys(byToilet)) {
			const pcts = byToilet[tcode];
			for (let i = 0; i < pcts.length; i++) progRows.push([
				floorId[code],
				toiletId[tcode],
				actId[i + 1],
				pcts[i]
			]);
		}
	}
	return {
		dateRows,
		progRows
	};
}
async function applyOfficialSchedule() {
	const sql = await getSql();
	let meta;
	try {
		[meta] = await sql`
      select schedule_rev from site_meta where id = 1
    `;
	} catch {
		await sql.query("alter table site_meta add column if not exists schedule_rev text not null default ''");
		[meta] = await sql`
      select schedule_rev from site_meta where id = 1
    `;
	}
	if ((meta?.schedule_rev ?? "") === "2026-08-28") return;
	const { dateRows, progRows } = scheduleRows(await sql`select id, code, sort_order from floors`, await sql`select id, code, tower from toilets`, await sql`select id, seq, name, contractor, gm_trade from activities`);
	await upsertRows("floor_dates", [
		"floor_id",
		"activity_id",
		"due_on"
	], dateRows, "floor_id, activity_id", "due_on = excluded.due_on");
	await upsertRows("progress", [
		"floor_id",
		"toilet_id",
		"activity_id",
		"pct"
	], progRows, "floor_id, toilet_id, activity_id", "pct = excluded.pct, updated_at = now()");
	await sql`update site_meta set schedule_rev = ${SCHEDULE_REV} where id = 1`;
	await sql`
    insert into audit_log (kind, floor_code, toilet_code, activity_seq, from_pct, to_pct, crew_callsign, note)
    values (
      ${"import"},
      ${"CL19"},
      ${"T7"},
      ${3},
      ${100},
      ${0},
      ${"SHEET"},
      ${"Official sheet 28 AUG 26 applied"}
    )
  `;
}
async function ensureCompanyColumns() {
	const sql = await getSql();
	await sql.query("alter table site_meta add column if not exists company_name text not null default 'Gelaran Maju Sdn Bhd'");
	await sql.query("alter table site_meta add column if not exists company_rev text not null default ''");
	await sql.query("alter table site_meta add column if not exists msk_rev text not null default ''");
}
async function applyCompanyProfile() {
	const sql = await getSql();
	await ensureCompanyColumns();
	let meta;
	try {
		[meta] = await sql`
      select company_rev from site_meta where id = 1
    `;
	} catch {
		await ensureCompanyColumns();
		[meta] = await sql`
      select company_rev from site_meta where id = 1
    `;
	}
	if ((meta?.company_rev ?? "") === "gm-2026-09-02-teams") return;
	await sql`
    update site_meta set
      project_name = ${PROJECT.name},
      project_code = ${PROJECT.code},
      subject = ${PROJECT.subject},
      section = ${PROJECT.section},
      client_name = ${PROJECT.clientName},
      company_name = ${PROJECT.companyName}
    where id = 1
  `;
	await sql`update crew set active = false where contractor not in ('GM', 'SUB')`;
	for (const c of CREW_SEED) await sql`
      insert into crew (callsign, contractor, trade, active)
      values (${c.callsign}, ${c.contractor}, ${c.trade}, true)
      on conflict (callsign) do update set
        contractor = excluded.contractor,
        trade = excluded.trade,
        active = true
    `;
	await sql.query(`
    delete from assignments
    where crew_id in (select id from crew where contractor not in ('GM', 'SUB'))
  `);
	try {
		await sql.query(`
      delete from msk_assignments
      where crew_id in (select id from crew where contractor not in ('GM', 'SUB'))
    `);
	} catch {}
	const [concealed] = await sql`select id from activities where seq = 3`;
	const [fitting] = await sql`select id from activities where seq = 20`;
	const [islam] = await sql`select id from crew where callsign = 'Islam'`;
	if (islam && concealed) await sql.query(`update assignments set activity_id = $1
       where crew_id = $2
         and activity_id not in (select id from activities where gm_trade = true)`, [concealed.id, islam.id]);
	if (fitting) await sql.query(`update assignments set activity_id = $1
       where crew_id in (select id from crew where contractor = 'GM')
         and activity_id not in (select id from activities where gm_trade = true)`, [fitting.id]);
	for (const a of ASSIGNMENT_SEED) {
		const [crew] = await sql`select id from crew where callsign = ${a.callsign}`;
		const [floor] = await sql`select id from floors where code = ${a.floor}`;
		const [toilet] = await sql`select id from toilets where code = ${a.toilet}`;
		const [act] = await sql`select id from activities where seq = ${a.seq}`;
		if (!crew || !floor || !toilet || !act) continue;
		const [row] = await sql`
      select id from assignments
      where crew_id = ${crew.id} and work_date = ${a.workDate}::date
      order by id
      limit 1
    `;
		if (!row) {
			await sql`
        insert into assignments (
          work_date, crew_id, floor_id, toilet_id, activity_id,
          start_pct, claimed_pct, note, photo_data, verified, rejected
        ) values (
          ${a.workDate}::date, ${crew.id}, ${floor.id}, ${toilet.id}, ${act.id},
          ${a.startPct}, ${a.claimedPct}, ${a.note}, ${a.hasPhoto ? "seed-photo" : null},
          ${a.verified}, ${a.rejected}
        )
      `;
			continue;
		}
		await sql`
      update assignments set
        floor_id = ${floor.id},
        toilet_id = ${toilet.id},
        activity_id = ${act.id},
        start_pct = ${a.startPct},
        claimed_pct = ${a.claimedPct},
        note = ${a.note},
        verified = ${a.verified},
        rejected = ${a.rejected},
        photo_data = ${a.hasPhoto ? "seed-photo" : null}
      where id = ${row.id}
    `;
	}
	await ensureMskAssignmentSeed();
	await sql`update site_meta set company_rev = ${COMPANY_REV} where id = 1`;
}
async function ensureMskAssignmentSeed() {
	const sql = await getSql();
	try {
		const crew = await sql`select id, callsign, contractor, trade, active from crew`;
		const levels = await sql`select id, code, sort_order, zone, ffl from msk_levels`;
		const items = await sql`
      select id, seq, code, name, short_name, trade, trade_weight::text as trade_weight from msk_items
    `;
		const crewId = Object.fromEntries(crew.map((c) => [c.callsign, c.id]));
		const levelId = Object.fromEntries(levels.map((l) => [l.code, l.id]));
		const itemId = Object.fromEntries(items.map((i) => [i.seq, i.id]));
		for (const a of MSK_ASSIGNMENT_SEED) {
			const cid = crewId[a.callsign];
			const lid = levelId[a.level];
			const iid = itemId[a.seq];
			if (!cid || !lid || !iid) continue;
			const [row] = await sql`
        select id from msk_assignments
        where crew_id = ${cid}
          and work_date = ${a.workDate}::date
          and level_id = ${lid}
          and tower = ${a.tower}
          and item_id = ${iid}
        limit 1
      `;
			if (row) {
				await sql`
          update msk_assignments set
            start_pct = ${a.startPct},
            claimed_pct = ${a.claimedPct},
            note = ${a.note},
            verified = ${a.verified},
            rejected = ${a.rejected},
            photo_data = ${seedAssignPhoto(a)}
          where id = ${row.id}
        `;
				continue;
			}
			await sql`
        insert into msk_assignments (
          work_date, crew_id, level_id, tower, item_id,
          start_pct, claimed_pct, note, photo_data, verified, rejected
        ) values (
          ${a.workDate}::date, ${cid}, ${lid}, ${a.tower}, ${iid},
          ${a.startPct}, ${a.claimedPct}, ${a.note}, ${seedAssignPhoto(a)},
          ${a.verified}, ${a.rejected}
        )
      `;
		}
	} catch {}
}
function mskProgressRows(levels, items) {
	const levelId = Object.fromEntries(levels.map((l) => [l.code, l.id]));
	const itemId = Object.fromEntries(items.map((i) => [i.seq, i.id]));
	const rows = [];
	for (const tower of ["A", "B"]) {
		const byLevel = MSK_PROGRESS[tower];
		for (const level of MSK_LEVELS) {
			const vals = byLevel[level.code];
			for (let i = 0; i < vals.length; i++) {
				const raw = vals[i] ?? 0;
				const na = raw < 0;
				rows.push([
					levelId[level.code],
					tower,
					itemId[i + 1],
					na ? 0 : raw,
					na
				]);
			}
		}
	}
	return rows;
}
async function applyMskBoard() {
	const sql = await getSql();
	await ensureCompanyColumns();
	await sql.query(`create table if not exists msk_items (
      id serial primary key,
      seq integer not null unique,
      code text not null unique,
      name text not null,
      short_name text not null,
      trade text not null,
      trade_weight numeric not null
    )`);
	await sql.query(`create table if not exists msk_levels (
      id serial primary key,
      code text not null unique,
      sort_order integer not null,
      zone text not null,
      ffl text not null
    )`);
	await sql.query(`create table if not exists msk_progress (
      level_id integer not null references msk_levels(id),
      tower text not null,
      item_id integer not null references msk_items(id),
      pct integer not null default 0,
      na boolean not null default false,
      updated_at timestamptz not null default now(),
      primary key (level_id, tower, item_id)
    )`);
	await sql.query(`create table if not exists msk_assignments (
      id serial primary key,
      work_date date not null,
      crew_id integer not null references crew(id),
      level_id integer not null references msk_levels(id),
      tower text not null,
      item_id integer not null references msk_items(id),
      start_pct integer not null,
      claimed_pct integer,
      note text,
      photo_data text,
      verified boolean not null default false,
      rejected boolean not null default false,
      created_at timestamptz not null default now()
    )`);
	await sql.query(`create index if not exists msk_assignments_date_idx on msk_assignments (work_date)`);
	let meta;
	try {
		[meta] = await sql`select msk_rev from site_meta where id = 1`;
	} catch {
		await ensureCompanyColumns();
		[meta] = await sql`select msk_rev from site_meta where id = 1`;
	}
	if ((meta?.msk_rev ?? "") === "2026-09-02-teams") return;
	await upsertRows("msk_items", [
		"seq",
		"code",
		"name",
		"short_name",
		"trade",
		"trade_weight"
	], MSK_ITEMS.map((i) => [
		i.seq,
		i.code,
		i.name,
		i.short,
		i.trade,
		TRADE_WEIGHT[i.trade]
	]), "seq", "code = excluded.code, name = excluded.name, short_name = excluded.short_name, trade = excluded.trade, trade_weight = excluded.trade_weight");
	await upsertRows("msk_levels", [
		"code",
		"sort_order",
		"zone",
		"ffl"
	], MSK_LEVELS.map((l) => [
		l.code,
		l.sort,
		l.zone,
		l.ffl
	]), "code", "sort_order = excluded.sort_order, zone = excluded.zone, ffl = excluded.ffl");
	const levels = await sql`select id, code, sort_order, zone, ffl from msk_levels`;
	const items = await sql`
    select id, seq, code, name, short_name, trade, trade_weight::text as trade_weight from msk_items
  `;
	await upsertRows("msk_progress", [
		"level_id",
		"tower",
		"item_id",
		"pct",
		"na"
	], mskProgressRows(levels, items), "level_id, tower, item_id", "pct = excluded.pct, na = excluded.na, updated_at = now()");
	await sql`select count(*)::int as n from msk_assignments`;
	const crew = await sql`select id, callsign, contractor, trade, active from crew`;
	const crewId = Object.fromEntries(crew.map((c) => [c.callsign, c.id]));
	const levelId = Object.fromEntries(levels.map((l) => [l.code, l.id]));
	const itemId = Object.fromEntries(items.map((i) => [i.seq, i.id]));
	await sql`delete from msk_assignments`;
	await insertRows("msk_assignments", [
		"work_date",
		"crew_id",
		"level_id",
		"tower",
		"item_id",
		"start_pct",
		"claimed_pct",
		"note",
		"photo_data",
		"verified",
		"rejected"
	], MSK_ASSIGNMENT_SEED.filter((a) => crewId[a.callsign] && levelId[a.level] && itemId[a.seq]).map((a) => [
		a.workDate,
		crewId[a.callsign],
		levelId[a.level],
		a.tower,
		itemId[a.seq],
		a.startPct,
		a.claimedPct,
		a.note,
		seedAssignPhoto(a),
		a.verified,
		a.rejected
	]));
	await sql`
    update site_meta set
      project_code = ${"CAPITOL-MSK"},
      subject = ${"Cold water, sanitary & irrigation — Capitol MSK"},
      section = ${"MSK · Towers A & B"}
    where id = 1
  `;
	await sql`update site_meta set msk_rev = ${MSK_REV} where id = 1`;
	await sql`
    insert into audit_log (kind, floor_code, toilet_code, activity_seq, from_pct, to_pct, crew_callsign, note)
    values (
      ${"import"},
      ${"L14"},
      ${"TA"},
      ${1},
      ${0},
      ${100},
      ${"SHEET"},
      ${"MSK board 01 SEP 26 — SAN toilets L23–L27 TA & TB 100%. Wares L24–L25 TB 100%. SAN tenant not started."}
    )
  `;
}
async function ensureSeeded() {
	const sql = await getSql();
	await ensureCompanyColumns();
	if (((await sql`select count(*)::int as n from site_meta`)[0]?.n ?? 0) > 0) {
		await applyOfficialSchedule();
		await applyCompanyProfile();
		await applyMskBoard();
		const { applyOpsBoard } = await import("./ops.functions-u1spHYWY.mjs").then((n) => n.d);
		await applyOpsBoard();
		return;
	}
	await sql`
    insert into site_meta (id, project_name, project_code, subject, section, client_name, company_name, schedule_rev, company_rev)
    values (1, ${PROJECT.name}, ${PROJECT.code}, ${PROJECT.subject}, ${PROJECT.section}, ${PROJECT.clientName}, ${PROJECT.companyName}, ${SCHEDULE_REV}, ${COMPANY_REV})
  `;
	await insertRows("activities", [
		"seq",
		"name",
		"contractor",
		"gm_trade"
	], ACTIVITY_SEED.map((a) => [
		a.seq,
		a.name,
		a.contractor,
		a.gmTrade
	]));
	await insertRows("floors", ["code", "sort_order"], FLOOR_CODES.map((code, i) => [code, i]));
	await insertRows("toilets", ["code", "tower"], TOILET_SEED.map((t) => [t.code, t.tower]));
	await insertRows("crew", [
		"callsign",
		"contractor",
		"trade",
		"active"
	], CREW_SEED.map((c) => [
		c.callsign,
		c.contractor,
		c.trade,
		true
	]));
	const floors = await sql`select id, code, sort_order from floors`;
	const toilets = await sql`select id, code, tower from toilets`;
	const acts = await sql`select id, seq, name, contractor, gm_trade from activities`;
	const crew = await sql`select id, callsign, contractor, trade, active from crew`;
	const crewId = Object.fromEntries(crew.map((c) => [c.callsign, c.id]));
	const floorId = Object.fromEntries(floors.map((f) => [f.code, f.id]));
	const toiletId = Object.fromEntries(toilets.map((t) => [t.code, t.id]));
	const actId = Object.fromEntries(acts.map((a) => [a.seq, a.id]));
	const { dateRows, progRows } = scheduleRows(floors, toilets, acts);
	await insertRows("floor_dates", [
		"floor_id",
		"activity_id",
		"due_on"
	], dateRows);
	await insertRows("progress", [
		"floor_id",
		"toilet_id",
		"activity_id",
		"pct"
	], progRows);
	await insertRows("assignments", [
		"work_date",
		"crew_id",
		"floor_id",
		"toilet_id",
		"activity_id",
		"start_pct",
		"claimed_pct",
		"note",
		"photo_data",
		"verified",
		"rejected"
	], ASSIGNMENT_SEED.map((a) => [
		a.workDate,
		crewId[a.callsign],
		floorId[a.floor],
		toiletId[a.toilet],
		actId[a.seq],
		a.startPct,
		a.claimedPct,
		a.note,
		a.hasPhoto ? "seed-photo" : null,
		a.verified,
		a.rejected
	]));
	await insertRows("audit_log", [
		"created_at",
		"kind",
		"floor_code",
		"toilet_code",
		"activity_seq",
		"from_pct",
		"to_pct",
		"crew_callsign",
		"note"
	], AUDIT_SEED.map((a) => [
		a.createdAt,
		a.kind,
		a.floor,
		a.toilet,
		a.seq,
		a.fromPct,
		a.toPct,
		a.callsign,
		a.note
	]));
	await applyMskBoard();
	const { applyOpsBoard } = await import("./ops.functions-u1spHYWY.mjs").then((n) => n.d);
	await applyOpsBoard();
}
function toBool(v) {
	return v === true || v === "t" || v === "true" || v === 1 || v === "1";
}
async function loadMsk(sql) {
	try {
		const since = addDaysIso(todayIso(), -14);
		const [items, levels, progress, assignments] = await Promise.all([
			sql`
        select id, seq, code, name, short_name, trade, trade_weight::text as trade_weight
        from msk_items order by seq
      `,
			sql`
        select id, code, sort_order, zone, ffl from msk_levels order by sort_order
      `,
			sql`
        select level_id, tower, item_id, pct, na, updated_at::text as updated_at from msk_progress
      `,
			sql`
        select id, work_date, crew_id, level_id, tower, item_id,
               start_pct, claimed_pct, note, photo_data, verified, rejected,
               created_at::text as created_at
        from msk_assignments
        where work_date >= ${since}::date
        order by work_date desc, id desc
      `
		]);
		return {
			mskItems: items.map((i) => ({
				id: Number(i.id),
				seq: Number(i.seq),
				code: i.code,
				name: i.name,
				shortName: i.short_name,
				trade: i.trade,
				tradeWeight: Number(i.trade_weight)
			})),
			mskLevels: levels.map((l) => ({
				id: Number(l.id),
				code: l.code,
				sortOrder: Number(l.sort_order),
				zone: l.zone,
				ffl: l.ffl
			})),
			mskProgress: progress.map((p) => ({
				levelId: Number(p.level_id),
				tower: p.tower,
				itemId: Number(p.item_id),
				pct: Number(p.pct),
				na: toBool(p.na),
				updatedAt: String(p.updated_at)
			})),
			mskAssignments: assignments.map((a) => ({
				id: Number(a.id),
				workDate: String(a.work_date).slice(0, 10),
				crewId: Number(a.crew_id),
				levelId: Number(a.level_id),
				tower: a.tower,
				itemId: Number(a.item_id),
				startPct: Number(a.start_pct),
				claimedPct: a.claimed_pct == null ? null : Number(a.claimed_pct),
				note: a.note,
				photoData: slimPhoto(a.photo_data, String(a.work_date).slice(0, 10) === todayIso()),
				verified: toBool(a.verified),
				rejected: toBool(a.rejected),
				createdAt: String(a.created_at)
			}))
		};
	} catch (err) {
		console.error("loadMsk failed", err);
		return {
			mskItems: [],
			mskLevels: [],
			mskProgress: [],
			mskAssignments: []
		};
	}
}
function slimPhoto(raw, keepFull) {
	if (!raw) return null;
	if (keepFull) return raw;
	if (raw.startsWith("data:")) return "inline-photo";
	if (raw.startsWith("[")) try {
		const arr = JSON.parse(raw);
		if (!Array.isArray(arr)) return raw;
		const kept = arr.filter((u) => typeof u === "string" && u.length > 0 && !u.startsWith("data:"));
		if (kept.length === 0) return arr.length ? "inline-photo" : null;
		return packPhotos(kept);
	} catch {
		return raw;
	}
	return raw;
}
async function loadSnapshot() {
	await ensureSeeded();
	const { ensureToday } = await import("./day-roll-CIcXIhhj.mjs");
	await ensureToday();
	const sql = await getSql();
	const since = addDaysIso(todayIso(), -14);
	const [metaRows, activities, floors, toilets, dates, progress, crew, assignments, audit, msk] = await Promise.all([
		sql`
      select project_name, project_code, subject, section, client_name, company_name from site_meta where id = 1
    `,
		sql`select id, seq, name, contractor, gm_trade from activities order by seq`,
		sql`select id, code, sort_order from floors order by sort_order`,
		sql`select id, code, tower from toilets order by code`,
		sql`select floor_id, activity_id, due_on from floor_dates`,
		sql`
      select floor_id, toilet_id, activity_id, pct, updated_at::text as updated_at from progress
    `,
		sql`select id, callsign, contractor, trade, active from crew order by callsign`,
		sql`
      select id, work_date, crew_id, floor_id, toilet_id, activity_id,
             start_pct, claimed_pct, note, photo_data, verified, rejected,
             created_at::text as created_at
      from assignments
      where work_date >= ${since}::date
      order by work_date desc, id desc
    `,
		sql`
      select id, created_at::text as created_at, kind, floor_code, toilet_code,
             activity_seq, from_pct, to_pct, crew_callsign, note
      from audit_log
      order by created_at desc
      limit 40
    `,
		loadMsk(sql)
	]);
	const [meta] = metaRows;
	if (!meta) throw new Error("Site is not seeded");
	return {
		projectName: meta.project_name,
		projectCode: meta.project_code,
		subject: meta.subject,
		section: meta.section,
		clientName: meta.client_name,
		companyName: meta.company_name || PROJECT.companyName,
		activities: activities.map((a) => ({
			id: Number(a.id),
			seq: Number(a.seq),
			name: a.name,
			contractor: a.contractor,
			gmTrade: toBool(a.gm_trade)
		})),
		floors: floors.map((f) => ({
			id: Number(f.id),
			code: f.code,
			sortOrder: Number(f.sort_order)
		})),
		toilets: toilets.map((t) => ({
			id: Number(t.id),
			code: t.code,
			tower: t.tower
		})),
		dates: dates.map((d) => ({
			floorId: Number(d.floor_id),
			activityId: Number(d.activity_id),
			dueOn: String(d.due_on).slice(0, 10)
		})),
		progress: progress.map((p) => ({
			floorId: Number(p.floor_id),
			toiletId: Number(p.toilet_id),
			activityId: Number(p.activity_id),
			pct: Number(p.pct),
			updatedAt: String(p.updated_at)
		})),
		crew: crew.map((c) => ({
			id: Number(c.id),
			callsign: c.callsign,
			contractor: c.contractor,
			trade: c.trade,
			active: toBool(c.active)
		})),
		assignments: assignments.map((a) => ({
			id: Number(a.id),
			workDate: String(a.work_date).slice(0, 10),
			crewId: Number(a.crew_id),
			floorId: Number(a.floor_id),
			toiletId: Number(a.toilet_id),
			activityId: Number(a.activity_id),
			startPct: Number(a.start_pct),
			claimedPct: a.claimed_pct == null ? null : Number(a.claimed_pct),
			note: a.note,
			photoData: slimPhoto(a.photo_data, String(a.work_date).slice(0, 10) === todayIso()),
			verified: toBool(a.verified),
			rejected: toBool(a.rejected),
			createdAt: String(a.created_at)
		})),
		audit: audit.map((a) => ({
			id: Number(a.id),
			createdAt: String(a.created_at),
			kind: a.kind,
			floorCode: a.floor_code,
			toiletCode: a.toilet_code,
			activitySeq: Number(a.activity_seq),
			fromPct: a.from_pct == null ? null : Number(a.from_pct),
			toPct: a.to_pct == null ? null : Number(a.to_pct),
			crewCallsign: a.crew_callsign,
			note: a.note
		})),
		...msk
	};
}
var getSnapshot_createServerFn_handler = createServerRpc({
	id: "4ae4d4e5f71761eaec8cb13fc216ace58c8fc430eb2b8919807c2f01a6d6ce34",
	name: "getSnapshot",
	filename: "src/lib/site.functions.ts"
}, (opts) => getSnapshot.__executeServer(opts));
var getSnapshot = createServerFn({ method: "GET" }).handler(getSnapshot_createServerFn_handler, async () => {
	return loadSnapshot();
});
function ack(id) {
	return id != null ? {
		ok: true,
		id
	} : { ok: true };
}
var updateSchema = object({
	floorId: number(),
	toiletId: number(),
	activityId: number(),
	pct: number().int().min(0).max(100),
	crewId: number(),
	note: string().max(400).optional(),
	photoData: string().max(18e4).nullable().optional(),
	workDate: string()
});
var updateProgress_createServerFn_handler = createServerRpc({
	id: "e27a8f06a2730d4815a18844813237a4fd5080b7fa799b4200f8b39fd8db6fa1",
	name: "updateProgress",
	filename: "src/lib/site.functions.ts"
}, (opts) => updateProgress.__executeServer(opts));
var updateProgress = createServerFn({ method: "POST" }).validator(updateSchema).handler(updateProgress_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const [prev] = await sql`
      select floor_id, toilet_id, activity_id, pct, updated_at::text as updated_at
      from progress
      where floor_id = ${data.floorId} and toilet_id = ${data.toiletId} and activity_id = ${data.activityId}
    `;
	const fromPct = prev?.pct ?? 0;
	const [crew] = await sql`select id, callsign, contractor, trade, active from crew where id = ${data.crewId}`;
	if (!crew) throw new Error("Pick who did the work");
	const commit = shouldCommitProgress(crew.contractor);
	if (commit) await sql`
        insert into progress (floor_id, toilet_id, activity_id, pct, updated_at)
        values (${data.floorId}, ${data.toiletId}, ${data.activityId}, ${data.pct}, now())
        on conflict (floor_id, toilet_id, activity_id)
        do update set pct = excluded.pct, updated_at = now()
      `;
	const [floor] = await sql`select id, code, sort_order from floors where id = ${data.floorId}`;
	const [toilet] = await sql`select id, code, tower from toilets where id = ${data.toiletId}`;
	const [act] = await sql`select id, seq, name, contractor, gm_trade from activities where id = ${data.activityId}`;
	const [existing] = await sql`
      select id, photo_data from assignments
      where work_date = ${data.workDate}::date
        and crew_id = ${data.crewId}
        and floor_id = ${data.floorId}
        and toilet_id = ${data.toiletId}
        and activity_id = ${data.activityId}
      limit 1
    `;
	const nextPhoto = data.photoData ? packPhotos([...photoList(existing?.photo_data), data.photoData]) : existing?.photo_data ?? null;
	if (existing) await sql`
        update assignments
        set claimed_pct = ${data.pct},
            note = coalesce(${data.note ?? null}, note),
            photo_data = ${nextPhoto},
            verified = ${commit},
            rejected = false
        where id = ${existing.id}
      `;
	else await sql`
        insert into assignments (
          work_date, crew_id, floor_id, toilet_id, activity_id,
          start_pct, claimed_pct, note, photo_data, verified, rejected
        ) values (
          ${data.workDate}::date,
          ${data.crewId},
          ${data.floorId},
          ${data.toiletId},
          ${data.activityId},
          ${fromPct},
          ${data.pct},
          ${data.note ?? null},
          ${nextPhoto},
          ${commit},
          false
        )
      `;
	await sql`
      insert into audit_log (
        kind, floor_code, toilet_code, activity_seq, from_pct, to_pct, crew_callsign, note
      ) values (
        ${"progress"},
        ${floor.code},
        ${toilet.code},
        ${act.seq},
        ${fromPct},
        ${data.pct},
        ${crew.callsign},
        ${data.note ?? null}
      )
    `;
	return ack();
});
var assignSchema = object({
	workDate: string(),
	crewId: number(),
	floorId: number(),
	toiletId: number(),
	activityId: number(),
	note: string().max(400).optional()
});
var assignCrew_createServerFn_handler = createServerRpc({
	id: "7be32d7aa73b2647f04ed6d45eaa71e3b52b40ff50c2860e2f84d123e69bc479",
	name: "assignCrew",
	filename: "src/lib/site.functions.ts"
}, (opts) => assignCrew.__executeServer(opts));
var assignCrew = createServerFn({ method: "POST" }).validator(assignSchema).handler(assignCrew_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const [prev] = await sql`
      select pct from progress
      where floor_id = ${data.floorId} and toilet_id = ${data.toiletId} and activity_id = ${data.activityId}
    `;
	const startPct = prev?.pct ?? 0;
	const [existing] = await sql`
      select id from assignments
      where work_date = ${data.workDate}::date
        and crew_id = ${data.crewId}
        and floor_id = ${data.floorId}
        and toilet_id = ${data.toiletId}
        and activity_id = ${data.activityId}
      limit 1
    `;
	if (existing) {
		await sql`
        update assignments
        set note = coalesce(${data.note ?? null}, note), rejected = false
        where id = ${existing.id}
      `;
		return ack(Number(existing.id));
	}
	const [created] = await sql`
      insert into assignments (
        work_date, crew_id, floor_id, toilet_id, activity_id, start_pct, note
      ) values (
        ${data.workDate}::date,
        ${data.crewId},
        ${data.floorId},
        ${data.toiletId},
        ${data.activityId},
        ${startPct},
        ${data.note ?? null}
      )
      returning id
    `;
	const [floor] = await sql`select id, code, sort_order from floors where id = ${data.floorId}`;
	const [toilet] = await sql`select id, code, tower from toilets where id = ${data.toiletId}`;
	const [act] = await sql`select id, seq, name, contractor, gm_trade from activities where id = ${data.activityId}`;
	const [crew] = await sql`select id, callsign, contractor, trade, active from crew where id = ${data.crewId}`;
	await sql`
      insert into audit_log (kind, floor_code, toilet_code, activity_seq, from_pct, to_pct, crew_callsign, note)
      values (${"assign"}, ${floor.code}, ${toilet.code}, ${act.seq}, ${startPct}, ${startPct}, ${crew.callsign}, ${data.note ?? "Assigned"})
    `;
	return ack(Number(created?.id ?? 0));
});
var verifySchema = object({
	assignmentId: number(),
	action: _enum(["verify", "reject"])
});
var reviewAssignment_createServerFn_handler = createServerRpc({
	id: "c520cb706decafa9c0055a504d11c8229e314527a4e9b3d9c1ac73f92d717685",
	name: "reviewAssignment",
	filename: "src/lib/site.functions.ts"
}, (opts) => reviewAssignment.__executeServer(opts));
var reviewAssignment = createServerFn({ method: "POST" }).validator(verifySchema).handler(reviewAssignment_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const verified = data.action === "verify";
	const [row] = await sql`
      select id, work_date, crew_id, floor_id, toilet_id, activity_id,
             start_pct, claimed_pct, note, photo_data, verified, rejected,
             created_at::text as created_at
      from assignments where id = ${data.assignmentId}
    `;
	if (!row) return ack();
	if (verified && row.claimed_pct != null) await sql`
        insert into progress (floor_id, toilet_id, activity_id, pct, updated_at)
        values (${row.floor_id}, ${row.toilet_id}, ${row.activity_id}, ${row.claimed_pct}, now())
        on conflict (floor_id, toilet_id, activity_id)
        do update set pct = excluded.pct, updated_at = now()
      `;
	if (!verified) {
		const [board] = await sql`
        select pct from progress
        where floor_id = ${row.floor_id} and toilet_id = ${row.toilet_id} and activity_id = ${row.activity_id}
      `;
		if (board && row.claimed_pct != null && Number(board.pct) === Number(row.claimed_pct)) await sql`
          update progress
          set pct = ${row.start_pct}, updated_at = now()
          where floor_id = ${row.floor_id} and toilet_id = ${row.toilet_id} and activity_id = ${row.activity_id}
        `;
	}
	await sql`
      update assignments
      set verified = ${verified}, rejected = ${!verified}
      where id = ${data.assignmentId}
    `;
	const [floor] = await sql`select id, code, sort_order from floors where id = ${row.floor_id}`;
	const [toilet] = await sql`select id, code, tower from toilets where id = ${row.toilet_id}`;
	const [act] = await sql`select id, seq, name, contractor, gm_trade from activities where id = ${row.activity_id}`;
	const [crew] = await sql`select id, callsign, contractor, trade, active from crew where id = ${row.crew_id}`;
	await sql`
      insert into audit_log (kind, floor_code, toilet_code, activity_seq, from_pct, to_pct, crew_callsign, note)
      values (
        ${data.action},
        ${floor.code},
        ${toilet.code},
        ${act.seq},
        ${row.start_pct},
        ${row.claimed_pct},
        ${crew.callsign},
        ${data.action === "verify" ? "Verified — on the board" : "Rejected — sub update not accepted"}
      )
    `;
	return ack();
});
var mskUpdateSchema = object({
	levelId: number(),
	tower: _enum(["A", "B"]),
	itemId: number(),
	pct: number().int().min(0).max(100),
	crewId: number(),
	note: string().max(400).optional(),
	photoData: string().max(18e4).nullable().optional(),
	workDate: string()
});
var updateMskProgress_createServerFn_handler = createServerRpc({
	id: "ecc4d4355801b17c14de56f9534fee44cf7f58aa5457eb2d68099321a51b76d3",
	name: "updateMskProgress",
	filename: "src/lib/site.functions.ts"
}, (opts) => updateMskProgress.__executeServer(opts));
var updateMskProgress = createServerFn({ method: "POST" }).validator(mskUpdateSchema).handler(updateMskProgress_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const [prev] = await sql`
      select level_id, tower, item_id, pct, na, updated_at::text as updated_at
      from msk_progress
      where level_id = ${data.levelId} and tower = ${data.tower} and item_id = ${data.itemId}
    `;
	const fromPct = prev?.pct ?? 0;
	const [crew] = await sql`select id, callsign, contractor, trade, active from crew where id = ${data.crewId}`;
	if (!crew) throw new Error("Pick who did the work");
	const commit = shouldCommitProgress(crew.contractor);
	if (commit) await sql`
        insert into msk_progress (level_id, tower, item_id, pct, na, updated_at)
        values (${data.levelId}, ${data.tower}, ${data.itemId}, ${data.pct}, false, now())
        on conflict (level_id, tower, item_id)
        do update set pct = excluded.pct, na = false, updated_at = now()
      `;
	const [level] = await sql`select id, code, sort_order, zone, ffl from msk_levels where id = ${data.levelId}`;
	const [item] = await sql`
      select id, seq, code, name, short_name, trade, trade_weight::text as trade_weight from msk_items where id = ${data.itemId}
    `;
	const [existing] = await sql`
      select id, photo_data from msk_assignments
      where work_date = ${data.workDate}::date
        and crew_id = ${data.crewId}
        and level_id = ${data.levelId}
        and tower = ${data.tower}
        and item_id = ${data.itemId}
      limit 1
    `;
	const nextPhoto = data.photoData ? packPhotos([...photoList(existing?.photo_data), data.photoData]) : existing?.photo_data ?? null;
	if (existing) await sql`
        update msk_assignments
        set claimed_pct = ${data.pct},
            note = coalesce(${data.note ?? null}, note),
            photo_data = ${nextPhoto},
            verified = ${commit},
            rejected = false
        where id = ${existing.id}
      `;
	else await sql`
        insert into msk_assignments (
          work_date, crew_id, level_id, tower, item_id,
          start_pct, claimed_pct, note, photo_data, verified, rejected
        ) values (
          ${data.workDate}::date, ${data.crewId}, ${data.levelId}, ${data.tower}, ${data.itemId},
          ${fromPct}, ${data.pct}, ${data.note ?? null}, ${nextPhoto}, ${commit}, false
        )
      `;
	await sql`
      insert into audit_log (kind, floor_code, toilet_code, activity_seq, from_pct, to_pct, crew_callsign, note)
      values (
        ${"msk-progress"},
        ${level.code},
        ${`T${data.tower}`},
        ${item.seq},
        ${fromPct},
        ${data.pct},
        ${crew.callsign},
        ${data.note ?? null}
      )
    `;
	return ack();
});
var mskAssignSchema = object({
	workDate: string(),
	crewId: number(),
	levelId: number(),
	tower: _enum(["A", "B"]),
	itemId: number(),
	note: string().max(400).optional()
});
var assignMskCrew_createServerFn_handler = createServerRpc({
	id: "bc624da124244ce78485490c04e8c2e246eda7719ca03d744c38d07a11ea458c",
	name: "assignMskCrew",
	filename: "src/lib/site.functions.ts"
}, (opts) => assignMskCrew.__executeServer(opts));
var assignMskCrew = createServerFn({ method: "POST" }).validator(mskAssignSchema).handler(assignMskCrew_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const [prev] = await sql`
      select pct from msk_progress
      where level_id = ${data.levelId} and tower = ${data.tower} and item_id = ${data.itemId}
    `;
	const startPct = prev?.pct ?? 0;
	const [existing] = await sql`
      select id from msk_assignments
      where work_date = ${data.workDate}::date
        and crew_id = ${data.crewId}
        and level_id = ${data.levelId}
        and tower = ${data.tower}
        and item_id = ${data.itemId}
      limit 1
    `;
	if (existing) await sql`
        update msk_assignments
        set note = coalesce(${data.note ?? null}, note), rejected = false
        where id = ${existing.id}
      `;
	else await sql`
        insert into msk_assignments (work_date, crew_id, level_id, tower, item_id, start_pct, note)
        values (${data.workDate}::date, ${data.crewId}, ${data.levelId}, ${data.tower}, ${data.itemId}, ${startPct}, ${data.note ?? null})
      `;
	const [level] = await sql`select id, code, sort_order, zone, ffl from msk_levels where id = ${data.levelId}`;
	const [item] = await sql`
      select id, seq, code, name, short_name, trade, trade_weight::text as trade_weight from msk_items where id = ${data.itemId}
    `;
	const [crew] = await sql`select id, callsign, contractor, trade, active from crew where id = ${data.crewId}`;
	await sql`
      insert into audit_log (kind, floor_code, toilet_code, activity_seq, from_pct, to_pct, crew_callsign, note)
      values (${"msk-assign"}, ${level.code}, ${`T${data.tower}`}, ${item.seq}, ${startPct}, ${startPct}, ${crew.callsign}, ${data.note ?? "Assigned"})
    `;
	const [row] = existing ? [existing] : await sql`
          select id from msk_assignments
          where work_date = ${data.workDate}::date
            and crew_id = ${data.crewId}
            and level_id = ${data.levelId}
            and tower = ${data.tower}
            and item_id = ${data.itemId}
          order by id desc
          limit 1
        `;
	return ack(Number(row?.id ?? 0));
});
var attachPhotoSchema = object({
	assignmentId: number(),
	photoData: string().max(18e4),
	kind: _enum(["msk", "toilet"]).default("msk")
});
var attachAssignmentPhoto_createServerFn_handler = createServerRpc({
	id: "6aeb83caf19dd117c243ce53fe4010a19483bd8c562f1cdec22b81f484a4ec21",
	name: "attachAssignmentPhoto",
	filename: "src/lib/site.functions.ts"
}, (opts) => attachAssignmentPhoto.__executeServer(opts));
var attachAssignmentPhoto = createServerFn({ method: "POST" }).validator(attachPhotoSchema).handler(attachAssignmentPhoto_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	if (data.kind === "toilet") {
		const [row] = await sql`select photo_data from assignments where id = ${data.assignmentId}`;
		await sql`update assignments set photo_data = ${packPhotos([...photoList(row?.photo_data), data.photoData])} where id = ${data.assignmentId}`;
	} else {
		const [row] = await sql`select photo_data from msk_assignments where id = ${data.assignmentId}`;
		await sql`update msk_assignments set photo_data = ${packPhotos([...photoList(row?.photo_data), data.photoData])} where id = ${data.assignmentId}`;
	}
	return ack();
});
var reviewMskAssignment_createServerFn_handler = createServerRpc({
	id: "eca355415b0888c19cf74d827e3cac3f28ae4cf98fcf1f4e86183337055bbe33",
	name: "reviewMskAssignment",
	filename: "src/lib/site.functions.ts"
}, (opts) => reviewMskAssignment.__executeServer(opts));
var reviewMskAssignment = createServerFn({ method: "POST" }).validator(verifySchema).handler(reviewMskAssignment_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const verified = data.action === "verify";
	const [row] = await sql`
      select id, work_date, crew_id, level_id, tower, item_id,
             start_pct, claimed_pct, note, photo_data, verified, rejected,
             created_at::text as created_at
      from msk_assignments where id = ${data.assignmentId}
    `;
	if (!row) return ack();
	if (verified && row.claimed_pct != null) await sql`
        insert into msk_progress (level_id, tower, item_id, pct, na, updated_at)
        values (${row.level_id}, ${row.tower}, ${row.item_id}, ${row.claimed_pct}, false, now())
        on conflict (level_id, tower, item_id)
        do update set pct = excluded.pct, na = false, updated_at = now()
      `;
	if (!verified) {
		const [board] = await sql`
        select pct from msk_progress
        where level_id = ${row.level_id} and tower = ${row.tower} and item_id = ${row.item_id}
      `;
		if (board && row.claimed_pct != null && Number(board.pct) === Number(row.claimed_pct)) await sql`
          update msk_progress
          set pct = ${row.start_pct}, updated_at = now()
          where level_id = ${row.level_id} and tower = ${row.tower} and item_id = ${row.item_id}
        `;
	}
	await sql`
      update msk_assignments
      set verified = ${verified}, rejected = ${!verified}
      where id = ${data.assignmentId}
    `;
	const [level] = await sql`select id, code, sort_order, zone, ffl from msk_levels where id = ${row.level_id}`;
	const [item] = await sql`
      select id, seq, code, name, short_name, trade, trade_weight::text as trade_weight from msk_items where id = ${row.item_id}
    `;
	const [crew] = await sql`select id, callsign, contractor, trade, active from crew where id = ${row.crew_id}`;
	await sql`
      insert into audit_log (kind, floor_code, toilet_code, activity_seq, from_pct, to_pct, crew_callsign, note)
      values (
        ${data.action},
        ${level.code},
        ${`T${row.tower}`},
        ${item.seq},
        ${row.start_pct},
        ${row.claimed_pct},
        ${crew.callsign},
        ${data.action === "verify" ? "Verified MSK — on the board" : "Rejected — sub update not accepted"}
      )
    `;
	return ack();
});
//#endregion
export { assignCrew_createServerFn_handler, assignMskCrew_createServerFn_handler, attachAssignmentPhoto_createServerFn_handler, getSnapshot_createServerFn_handler, reviewAssignment_createServerFn_handler, reviewMskAssignment_createServerFn_handler, updateMskProgress_createServerFn_handler, updateProgress_createServerFn_handler };
