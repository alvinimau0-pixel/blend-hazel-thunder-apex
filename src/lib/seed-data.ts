export const SCHEDULE_REV = "2026-08-28";
export const COMPANY_REV = "gm-2026-09-02-teams";

export const PROJECT = {
  name: "The Capitol",
  code: "CAPITOL-MSK",
  subject: "Cold water, sanitary & irrigation — Capitol MSK",
  section: "MSK · Towers A & B",
  clientName: "The Capitol",
  companyName: "Gelaran Maju Sdn Bhd",
};


export const ACTIVITY_SEED = [
  { seq: 1, name: "Sanitary piping", contractor: "GM", gmTrade: true },
  { seq: 2, name: "Brick wall", contractor: "INNOV", gmTrade: false },
  { seq: 3, name: "Concealed CW & FW piping, elect. conduit", contractor: "GM & MCCT", gmTrade: true },
  { seq: 4, name: "Exhaust fan and duct", contractor: "PH", gmTrade: false },
  { seq: 5, name: "Electrical conduit and wiring", contractor: "MCCT", gmTrade: false },
  { seq: 6, name: "Sprinkler cut off point", contractor: "SKK", gmTrade: false },
  { seq: 7, name: "Waterproof", contractor: "MONARCH", gmTrade: false },
  { seq: 8, name: "Plaster & screed", contractor: "CSY & CAPRI", gmTrade: false },
  { seq: 9, name: "ACMV grille & diffuser", contractor: "PH", gmTrade: false },
  { seq: 10, name: "Lighting", contractor: "MCCT", gmTrade: false },
  { seq: 11, name: "Dropper & sprinkler cap", contractor: "SKK", gmTrade: false },
  { seq: 12, name: "Tiles", contractor: "CSY, CAPRI, SCW", gmTrade: false },
  { seq: 13, name: "Door frame", contractor: "INNOV", gmTrade: false },
  { seq: 14, name: "Window frame", contractor: "UTV", gmTrade: false },
  { seq: 15, name: "Toilet cubicle", contractor: "ASUWARIS", gmTrade: false },
  { seq: 16, name: "Ceiling frame", contractor: "PIC & FIE", gmTrade: false },
  { seq: 17, name: "Ceiling board", contractor: "PIC & FIE", gmTrade: false },
  { seq: 18, name: "Vanity counter", contractor: "SCW & NP", gmTrade: false },
  { seq: 19, name: "Vanity mirror", contractor: "SCW & NP", gmTrade: false },
  { seq: 20, name: "Sanitary fitting", contractor: "GM", gmTrade: true },
  { seq: 21, name: "Signage", contractor: "LAB", gmTrade: false },
  { seq: 22, name: "Door panel", contractor: "PIC & UTV", gmTrade: false },
  { seq: 23, name: "Window", contractor: "PIC & UTV", gmTrade: false },
] as const;

export const FLOOR_CODES = ["CL14", "CL15", "CL16", "CL17", "CL18", "CL19"] as const;

export const TOILET_SEED = [
  { code: "T4", tower: "TA" as const },
  { code: "T5", tower: "TA" as const },
  { code: "T6", tower: "TB" as const },
  { code: "T7", tower: "TB" as const },
];

export const FLOOR_DATES: Record<(typeof FLOOR_CODES)[number], string[]> = {
  CL14: [
    "2026-06-26", "2026-07-22", "2026-08-06", "2026-07-23", "2026-07-23",
    "2026-07-23", "2026-07-24", "2026-07-26", "2026-08-10", "2026-08-10",
    "2026-08-10", "2026-08-09", "2026-08-11", "2026-08-11", "2026-08-13",
    "2026-08-17", "2026-08-20", "2026-08-21", "2026-08-21", "2026-08-22",
    "2026-08-22", "2026-08-22", "2026-08-22",
  ],
  CL15: [
    "2026-06-30", "2026-07-27", "2026-08-09", "2026-07-26", "2026-07-26",
    "2026-07-26", "2026-07-29", "2026-07-31", "2026-08-13", "2026-08-13",
    "2026-08-13", "2026-08-12", "2026-08-14", "2026-08-14", "2026-08-16",
    "2026-08-19", "2026-08-23", "2026-08-24", "2026-08-24", "2026-08-25",
    "2026-08-25", "2026-08-25", "2026-08-25",
  ],
  CL16: [
    "2026-07-03", "2026-08-02", "2026-08-12", "2026-08-12", "2026-08-12",
    "2026-08-12", "2026-08-03", "2026-08-15", "2026-08-16", "2026-08-16",
    "2026-08-16", "2026-08-15", "2026-08-17", "2026-08-17", "2026-08-19",
    "2026-08-22", "2026-08-26", "2026-08-27", "2026-08-27", "2026-08-28",
    "2026-08-28", "2026-08-28", "2026-08-28",
  ],
  CL17: [
    "2026-07-07", "2026-08-07", "2026-08-15", "2026-08-01", "2026-08-01",
    "2026-08-01", "2026-08-08", "2026-08-11", "2026-08-19", "2026-08-19",
    "2026-08-19", "2026-08-18", "2026-08-20", "2026-08-20", "2026-08-22",
    "2026-08-25", "2026-08-29", "2026-08-30", "2026-08-30", "2026-08-31",
    "2026-08-31", "2026-08-31", "2026-08-31",
  ],
  CL18: [
    "2026-07-11", "2026-08-12", "2026-08-18", "2026-08-04", "2026-08-04",
    "2026-08-04", "2026-08-13", "2026-08-16", "2026-08-30", "2026-08-30",
    "2026-08-30", "2026-08-21", "2026-08-23", "2026-08-23", "2026-08-25",
    "2026-08-28", "2026-09-01", "2026-09-02", "2026-09-02", "2026-09-03",
    "2026-09-03", "2026-09-03", "2026-09-03",
  ],
  CL19: [
    "2026-07-15", "2026-08-17", "2026-08-23", "2026-08-07", "2026-08-07",
    "2026-08-07", "2026-08-18", "2026-08-21", "2026-09-07", "2026-09-07",
    "2026-09-07", "2026-08-24", "2026-08-26", "2026-08-26", "2026-08-28",
    "2026-08-30", "2026-09-04", "2026-09-05", "2026-09-05", "2026-09-06",
    "2026-09-06", "2026-09-06", "2026-09-06",
  ],
};

const S = (v: number[]) => v;

export const PROGRESS_SEED: Record<
  (typeof FLOOR_CODES)[number],
  Record<"T4" | "T5" | "T6" | "T7", number[]>
> = {
  CL14: {
    T4: S([100, 100, 100, 100, 100, 100, 100, 100, 50, 50, 100, 100, 100, 75, 100, 80, 60, 100, 10, 35, 0, 90, 75]),
    T5: S([100, 100, 100, 100, 100, 100, 100, 100, 50, 50, 100, 100, 100, 75, 100, 80, 60, 100, 10, 35, 0, 90, 75]),
    T6: S([100, 100, 100, 100, 100, 100, 100, 100, 50, 50, 100, 100, 100, 75, 100, 80, 60, 100, 10, 35, 0, 90, 75]),
    T7: S([100, 100, 100, 100, 100, 100, 100, 100, 50, 50, 100, 100, 100, 75, 100, 80, 60, 100, 10, 35, 0, 90, 75]),
  },
  CL15: {
    T4: S([100, 100, 100, 100, 100, 100, 100, 100, 0, 0, 100, 100, 100, 30, 100, 50, 50, 30, 10, 35, 0, 0, 0]),
    T5: S([100, 100, 100, 100, 100, 100, 100, 100, 0, 0, 100, 100, 100, 30, 100, 50, 50, 30, 10, 35, 0, 0, 0]),
    T6: S([100, 100, 100, 100, 100, 100, 100, 100, 0, 0, 100, 100, 100, 30, 50, 50, 50, 15, 10, 35, 0, 0, 0]),
    T7: S([100, 100, 100, 100, 100, 100, 100, 100, 0, 0, 100, 100, 100, 30, 50, 50, 50, 15, 10, 35, 0, 0, 0]),
  },
  CL16: {
    T4: S([100, 100, 100, 100, 100, 100, 100, 100, 0, 0, 100, 100, 100, 30, 20, 25, 10, 0, 0, 0, 0, 0, 0]),
    T5: S([100, 100, 100, 100, 100, 100, 100, 100, 0, 0, 100, 100, 100, 30, 20, 25, 0, 0, 0, 0, 0, 0, 0]),
    T6: S([100, 100, 100, 100, 100, 100, 100, 100, 0, 0, 100, 61, 100, 30, 0, 25, 0, 0, 0, 0, 0, 0, 0]),
    T7: S([100, 100, 100, 100, 100, 100, 100, 100, 0, 0, 100, 100, 100, 30, 0, 25, 0, 0, 0, 0, 0, 0, 0]),
  },
  CL17: {
    T4: S([100, 100, 100, 100, 100, 100, 100, 100, 0, 0, 100, 50, 100, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
    T5: S([100, 100, 100, 100, 100, 100, 100, 100, 0, 0, 100, 50, 100, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
    T6: S([100, 100, 100, 100, 100, 100, 100, 100, 0, 0, 100, 0, 100, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
    T7: S([100, 100, 100, 100, 100, 100, 100, 100, 0, 0, 100, 0, 100, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
  },
  CL18: {
    T4: S([100, 100, 100, 100, 100, 100, 100, 100, 0, 0, 100, 20, 100, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
    T5: S([100, 100, 100, 100, 100, 100, 100, 100, 0, 0, 100, 20, 100, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
    T6: S([100, 100, 100, 100, 100, 100, 100, 100, 0, 0, 100, 0, 100, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
    T7: S([100, 100, 100, 100, 100, 100, 100, 100, 0, 0, 100, 0, 100, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
  },
  CL19: {
    T4: S([100, 100, 100, 30, 100, 0, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
    T5: S([100, 100, 100, 30, 100, 0, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
    T6: S([100, 100, 100, 100, 100, 0, 10, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
    T7: S([100, 100, 0, 20, 100, 0, 10, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
  },
};

export const CREW_SEED = [
  { callsign: "Supaham", contractor: "GM", trade: "Team leader" },
  { callsign: "Solihin", contractor: "GM", trade: "Coring" },
  { callsign: "Ashraful", contractor: "GM", trade: "Coring" },
  { callsign: "Jiarul", contractor: "GM", trade: "Coring" },
  { callsign: "Yasin", contractor: "GM", trade: "Coring" },
  { callsign: "Asgar", contractor: "GM", trade: "Pumps" },
  { callsign: "Rana", contractor: "GM", trade: "Pumps" },
  { callsign: "Suhairi", contractor: "GM", trade: "Pipe sleeve" },
  { callsign: "Supendi", contractor: "GM", trade: "Pipe sleeve" },
  { callsign: "Bilal", contractor: "GM", trade: "Concealed pipe" },
  { callsign: "Farhad", contractor: "GM", trade: "Concealed pipe" },
  { callsign: "Sofikul", contractor: "GM", trade: "Concealed pipe" },
  { callsign: "Amirul", contractor: "GM", trade: "Concealed pipe" },
  { callsign: "Nurul", contractor: "GM", trade: "Concealed pipe" },
  { callsign: "Nazmul", contractor: "GM", trade: "Concealed pipe" },
  { callsign: "Jewel", contractor: "GM", trade: "Irrigation outlet" },
  { callsign: "Badol", contractor: "GM", trade: "Irrigation outlet" },
  { callsign: "Jillur", contractor: "GM", trade: "Tenant" },
  { callsign: "Islam", contractor: "GM", trade: "Tenant" },
  { callsign: "Sarip", contractor: "GM", trade: "Backshaft" },
  { callsign: "Syahib", contractor: "GM", trade: "Backshaft" },
  { callsign: "Emon", contractor: "GM", trade: "Tenant" },
  { callsign: "Mahmud", contractor: "GM", trade: "Tenant" },
  { callsign: "Ibnu", contractor: "GM", trade: "Floortrap" },
  { callsign: "Damil", contractor: "GM", trade: "Floortrap" },
  { callsign: "Kamal", contractor: "GM", trade: "Housekeeping" },
  { callsign: "Lihin", contractor: "GM", trade: "Piping" },
  { callsign: "Aipoon", contractor: "SUB", trade: "Toilet + tenant L24–L30" },
  { callsign: "Aryan", contractor: "SUB", trade: "SS welding" },
  { callsign: "Kolik", contractor: "SUB", trade: "Sanitary fitting" },
] as const;

export type SeedAssignment = {
  workDate: string;
  callsign: string;
  floor: (typeof FLOOR_CODES)[number];
  toilet: "T4" | "T5" | "T6" | "T7";
  seq: number;
  startPct: number;
  claimedPct: number | null;
  note: string | null;
  verified: boolean;
  rejected: boolean;
  hasPhoto: boolean;
};

export const ASSIGNMENT_SEED: SeedAssignment[] = [
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
    hasPhoto: true,
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
    hasPhoto: true,
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
    hasPhoto: false,
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
    hasPhoto: false,
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
    hasPhoto: true,
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
    hasPhoto: false,
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
    hasPhoto: false,
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
    hasPhoto: true,
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
    hasPhoto: true,
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
    hasPhoto: false,
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
    hasPhoto: false,
  },
];

export const AUDIT_SEED = [
  { createdAt: "2026-08-22T09:10:00+08:00", kind: "progress", floor: "CL14", toilet: "T6", seq: 20, fromPct: 0, toPct: 20, callsign: "Sarip", note: "Started fittings" },
  { createdAt: "2026-08-25T16:40:00+08:00", kind: "progress", floor: "CL14", toilet: "T6", seq: 20, fromPct: 20, toPct: 35, callsign: "Sarip", note: "Basin + WC first fix" },
  { createdAt: "2026-08-26T15:20:00+08:00", kind: "progress", floor: "CL15", toilet: "T4", seq: 20, fromPct: 20, toPct: 35, callsign: "Yasin", note: "Fitting first fix" },
  { createdAt: "2026-08-21T10:00:00+08:00", kind: "progress", floor: "CL14", toilet: "T4", seq: 20, fromPct: 0, toPct: 35, callsign: "Nazmul", note: "Started fittings TA" },
  { createdAt: "2026-08-28T08:10:00+08:00", kind: "assign", floor: "CL19", toilet: "T7", seq: 3, fromPct: 0, toPct: 0, callsign: "Islam", note: "Concealed piping T7" },
  { createdAt: "2026-08-28T19:30:00+08:00", kind: "import", floor: "CL19", toilet: "T7", seq: 3, fromPct: 100, toPct: 0, callsign: "SHEET", note: "Official sheet 28 AUG 26 — T7 concealed reset to 0%" },
];
