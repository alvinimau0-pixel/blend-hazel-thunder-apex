/** Latest official board — 1 Sep 2026. L26 tenant is the hole to fill under L27. */
export const MSK_REV = "2026-09-02-teams";

export const SAN_TENANT_SEQ = 9;
export const TENANT_OUTLETS = 12;

export const MSK_ITEMS = [
  { seq: 1, code: "sleeve", name: "Pipe sleeve", short: "Sleeve", trade: "CW" as const },
  { seq: 2, code: "pump", name: "Pump", short: "Pump", trade: "CW" as const },
  { seq: 3, code: "pumpPanel", name: "Pump control panel", short: "Panel", trade: "CW" as const },
  { seq: 4, code: "transfer", name: "Transfer pump pipes", short: "Transfer", trade: "CW" as const },
  { seq: 5, code: "roofPiping", name: "L31 & 31M roof piping", short: "Roof pipe", trade: "CW" as const },
  { seq: 6, code: "cwTenant", name: "CW tenant", short: "CW tenant", trade: "CW" as const },
  { seq: 7, code: "backshaft", name: "Backshaft CW & FW toilets", short: "Backshaft", trade: "CW" as const },
  { seq: 8, code: "hosereel", name: "Hosereel, floortrap & stack", short: "Hosereel", trade: "SAN" as const },
  { seq: 9, code: "sanTenant", name: "Sanitary tenant", short: "SAN tenant", trade: "SAN" as const },
  { seq: 10, code: "toiletDist", name: "Toilet pipe distribution & hacking", short: "Dist / hack", trade: "SAN" as const },
  { seq: 11, code: "sanToilets", name: "Sanitary toilets", short: "SAN toilets", trade: "SAN" as const },
  { seq: 12, code: "sanWares", name: "Sanitary wares installation", short: "Wares", trade: "SAN" as const },
  { seq: 13, code: "irrOut", name: "Irrigation outlet", short: "IRR out", trade: "IRR" as const },
  { seq: 14, code: "irrIn", name: "Irrigation inlet", short: "IRR in", trade: "IRR" as const },
  { seq: 15, code: "irrWire", name: "Irrigation wiring", short: "IRR wire", trade: "IRR" as const },
  { seq: 16, code: "irrPanel", name: "Irrigation control panel", short: "IRR panel", trade: "IRR" as const },
] as const;

/** Official 29 Aug sheet headers still: COLD WATER 40% · SANITARY 33% · IRRIGATION 8%. */
export const TRADE_WEIGHT = { CW: 0.4, SAN: 0.33, IRR: 0.08 } as const;
export const TRADE_LABEL = { CW: "Cold water", SAN: "Sanitary", IRR: "Irrigation" } as const;

export const MSK_LEVELS = [
  { code: "L13", sort: 13, zone: "low-office", ffl: "112.600" },
  { code: "L14", sort: 14, zone: "low-office", ffl: "123.350" },
  { code: "L15", sort: 15, zone: "low-office", ffl: "127.850" },
  { code: "L16", sort: 16, zone: "low-office", ffl: "132.350" },
  { code: "L17", sort: 17, zone: "low-office", ffl: "136.850" },
  { code: "L18", sort: 18, zone: "low-office", ffl: "141.350" },
  { code: "L19", sort: 19, zone: "low-office", ffl: "145.850" },
  { code: "L20", sort: 20, zone: "low-office", ffl: "150.350" },
  { code: "L21", sort: 21, zone: "low-office", ffl: "154.850" },
  { code: "L22", sort: 22, zone: "low-office", ffl: "159.350" },
  { code: "L23", sort: 23, zone: "high-office", ffl: "163.850" },
  { code: "L24", sort: 24, zone: "high-office", ffl: "168.350" },
  { code: "L25", sort: 25, zone: "high-office", ffl: "172.850" },
  { code: "L26", sort: 26, zone: "high-office", ffl: "177.350" },
  { code: "L27", sort: 27, zone: "high-office", ffl: "181.850" },
  { code: "L28", sort: 28, zone: "high-office", ffl: "186.950" },
  { code: "L29", sort: 29, zone: "high-office", ffl: "192.050" },
  { code: "L30", sort: 30, zone: "high-office", ffl: "197.150" },
  { code: "L31", sort: 31, zone: "high-office", ffl: "203.150" },
  { code: "L31M", sort: 32, zone: "plant", ffl: "210.350" },
] as const;

export type MskLevelCode = (typeof MSK_LEVELS)[number]["code"];

/** -1 = N/A. Board 2 Sep 2026: Aryan SS L13–L21 both 100%. Aipoon tenant L27 4 outlets + 6 tenants, L26 0%, L24B–L25B outlet only. */
export const MSK_PROGRESS: Record<"A" | "B", Record<MskLevelCode, number[]>> = {
  A: {
    L13: [100, -1, -1, 100, -1, 0, 0, 0, 0, 0, 0, 0, 100, 90, 0, -1],
    L14: [100, -1, -1, 100, -1, 90, 100, 100, 100, 100, 100, 100, 100, 0, 0, -1],
    L15: [100, -1, -1, 100, -1, 90, 100, 100, 100, 100, 100, 100, 100, 0, 0, -1],
    L16: [100, -1, -1, 100, -1, 90, 10, 100, 100, 100, 100, 50, 100, 0, 0, -1],
    L17: [100, -1, -1, 100, -1, 90, 0, 100, 100, 100, 100, 0, 100, 0, 0, -1],
    L18: [100, -1, -1, 100, -1, 90, 0, 100, 100, 100, 100, 0, 50, 0, 0, -1],
    L19: [100, -1, -1, 100, -1, 90, 0, 100, 100, 100, 100, 0, 0, 0, 0, -1],
    L20: [100, -1, -1, 100, -1, 90, 0, 100, 50, 0, 100, 0, 0, 0, 0, -1],
    L21: [100, -1, -1, 100, -1, 90, 0, 10, 0, 0, 100, 0, 0, 0, 0, -1],
    L22: [100, -1, -1, 0, -1, 90, 0, 0, 0, 100, 100, 0, 0, 0, 0, 0],
    L23: [100, -1, -1, 0, -1, 90, 0, 0, 0, 0, 100, 0, 0, 0, 0, -1],
    L24: [100, -1, -1, 0, -1, 90, 0, 0, 0, 0, 100, 0, 0, 0, 0, -1],
    L25: [100, -1, -1, 0, -1, 90, 0, 0, 0, 0, 100, 0, 0, 0, 0, -1],
    L26: [100, -1, -1, 0, -1, 90, 0, 0, 0, 80, 100, 0, 0, 0, 0, -1],
    L27: [100, -1, -1, 0, -1, 90, 0, 0, 50, 0, 100, 0, 0, 0, 0, -1],
    L28: [100, -1, -1, 0, -1, 90, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
    L29: [100, -1, -1, 0, -1, 90, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
    L30: [100, -1, -1, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
    L31: [55, 90, 90, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
    L31M: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  B: {
    L13: [100, -1, -1, 100, -1, 0, 0, 10, 0, 0, 0, 0, 100, 90, 0, -1],
    L14: [100, -1, -1, 100, -1, 90, 100, 100, 100, 100, 100, 100, 100, 0, 0, -1],
    L15: [100, -1, -1, 100, -1, 90, 100, 100, 100, 100, 100, 100, 100, 0, 0, -1],
    L16: [100, -1, -1, 100, -1, 90, 10, 100, 100, 100, 100, 0, 100, 0, 0, -1],
    L17: [100, -1, -1, 100, -1, 90, 0, 100, 100, 100, 100, 0, 100, 0, 0, -1],
    L18: [100, -1, -1, 100, -1, 90, 0, 100, 100, 100, 100, 0, 50, 0, 0, -1],
    L19: [100, -1, -1, 100, -1, 90, 0, 100, 100, 100, 100, 0, 0, 0, 0, -1],
    L20: [100, -1, -1, 100, -1, 90, 0, 100, 50, 10, 100, 0, 0, 0, 0, -1],
    L21: [100, -1, -1, 100, -1, 90, 0, 0, 0, 10, 100, 0, 0, 0, 0, -1],
    L22: [100, -1, -1, 0, -1, 90, 0, 0, 0, 100, 100, 0, 0, 0, 0, 0],
    L23: [100, -1, -1, 0, -1, 90, 0, 0, 0, 0, 100, 0, 0, 0, 0, -1],
    L24: [100, -1, -1, 0, -1, 90, 0, 0, 25, 0, 100, 100, 0, 0, 0, -1],
    L25: [100, -1, -1, 0, -1, 90, 0, 0, 25, 0, 100, 100, 0, 0, 0, -1],
    L26: [100, -1, -1, 0, -1, 90, 0, 0, 0, 80, 100, 0, 0, 0, 0, -1],
    L27: [100, -1, -1, 0, -1, 90, 0, 0, 50, 0, 100, 0, 0, 0, 0, -1],
    L28: [100, -1, -1, 0, -1, 90, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
    L29: [100, -1, -1, 0, -1, 90, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
    L30: [100, -1, -1, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
    L31: [50, 90, 90, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
    L31M: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
};

export type MskAssignSeed = {
  workDate: string;
  callsign: string;
  level: MskLevelCode;
  tower: "A" | "B";
  seq: number;
  startPct: number;
  claimedPct: number | null;
  note: string | null;
  verified: boolean;
  rejected: boolean;
  hasPhoto: boolean;
  photos?: string[];
};

export function seedAssignPhoto(a: MskAssignSeed): string | null {
  if (a.photos && a.photos.length > 0) {
    return a.photos.length === 1 ? a.photos[0]! : JSON.stringify(a.photos);
  }
  return a.hasPhoto ? "seed-photo" : null;
}

export const MSK_ASSIGNMENT_SEED: MskAssignSeed[] = [
  { workDate: "2026-09-02", callsign: "Suhairi", level: "L31", tower: "A", seq: 1, startPct: 55, claimedPct: 55, note: "Team 3 sleeve. Specialty only.", verified: true, rejected: false, hasPhoto: false },
  { workDate: "2026-09-02", callsign: "Supendi", level: "L31", tower: "B", seq: 1, startPct: 50, claimedPct: 50, note: "Team 3 sleeve. Specialty only.", verified: true, rejected: false, hasPhoto: false },
  { workDate: "2026-09-02", callsign: "Bilal", level: "L26", tower: "A", seq: 10, startPct: 80, claimedPct: 80, note: "Team 4 concealed pipe. Specialty only.", verified: true, rejected: false, hasPhoto: false },
  { workDate: "2026-09-02", callsign: "Jewel", level: "L18", tower: "A", seq: 13, startPct: 50, claimedPct: 50, note: "Team 5 IRR outlet. Specialty only.", verified: true, rejected: false, hasPhoto: false },
  { workDate: "2026-09-02", callsign: "Jillur", level: "L13", tower: "A", seq: 6, startPct: 0, claimedPct: 0, note: "Team 6 L13 tenant. May take any job.", verified: true, rejected: false, hasPhoto: false },
  { workDate: "2026-09-02", callsign: "Islam", level: "L13", tower: "B", seq: 6, startPct: 0, claimedPct: 0, note: "Team 6 L13 tenant.", verified: true, rejected: false, hasPhoto: false },
  { workDate: "2026-09-02", callsign: "Sarip", level: "L16", tower: "A", seq: 7, startPct: 10, claimedPct: 10, note: "Team 7 backshaft. Specialty only.", verified: true, rejected: false, hasPhoto: false },
  { workDate: "2026-09-02", callsign: "Emon", level: "L21", tower: "A", seq: 6, startPct: 90, claimedPct: 90, note: "Team 8 tenant L21. Specialty only.", verified: true, rejected: false, hasPhoto: false },
  { workDate: "2026-09-02", callsign: "Damil", level: "L21", tower: "A", seq: 8, startPct: 10, claimedPct: 10, note: "Team 9 floortrap. Specialty only.", verified: true, rejected: false, hasPhoto: false },
];
export const CLAIM = {
  no: 36,
  date: "2026-07-25",
  title: "Cold Water and Sanitary Plumbing Services",
  contract: 10_500_000,
  workDone: 7_376_009.19,
  voWorkDone: 7_512_092.39,
  totalWorkDone: 14_888_101.58,
  retention: 900_604.62,
  totalClaim: 13_987_496.96,
  thisClaim: 2_930_937.51,
  lines: [
    { code: "A.1", zone: "Podium", name: "Preliminaries (podium)", contract: 24_500, work: 24_500 },
    { code: "A.2", zone: "Podium", name: "Cold water (podium)", contract: 2_209_200, work: 2_209_200 },
    { code: "A.3", zone: "Podium", name: "Sanitary (podium)", contract: 2_308_000, work: 2_308_000 },
    { code: "B.1", zone: "Tower", name: "Preliminaries (towers)", contract: 24_500, work: 8_800 },
    { code: "B.2", zone: "Tower", name: "Cold water Tower A", contract: 1_778_400, work: 1_012_670 },
    { code: "B.3", zone: "Tower", name: "Cold water Tower B", contract: 1_783_400, work: 940_470 },
    { code: "B.4", zone: "Tower", name: "Sanitary Tower A", contract: 915_000, work: 187_375 },
    { code: "B.5", zone: "Tower", name: "Sanitary Tower B", contract: 957_000, work: 197_075 },
    { code: "C", zone: "VO", name: "Contingency (VO1+VO2+VO4)", contract: 500_000, work: 487_919.19 },
  ],
} as const;

export const BUILDING_STACK = [
  { code: "ROOF", label: "Helipad / roof tanks", ffl: "215.850", band: "roof", gm: "plant" as const },
  { code: "L31M", label: "L31 Mez · M&E / LMR", ffl: "210.350", band: "plant", gm: "tower" as const },
  { code: "L31", label: "Level 31 · office", ffl: "203.150", band: "high-office", gm: "tower" as const },
  { code: "L30", label: "Level 30", ffl: "197.150", band: "high-office", gm: "tower" as const },
  { code: "L29", label: "Level 29", ffl: "192.050", band: "high-office", gm: "tower" as const },
  { code: "L28", label: "Level 28", ffl: "186.950", band: "high-office", gm: "tower" as const },
  { code: "L27", label: "Level 27", ffl: "181.850", band: "high-office", gm: "tower" as const },
  { code: "L26", label: "Level 26", ffl: "177.350", band: "high-office", gm: "tower" as const },
  { code: "L25", label: "Level 25", ffl: "172.850", band: "high-office", gm: "tower" as const },
  { code: "L24", label: "Level 24", ffl: "168.350", band: "high-office", gm: "tower" as const },
  { code: "L23", label: "Level 23", ffl: "163.850", band: "high-office", gm: "tower" as const },
  { code: "L22", label: "Level 22", ffl: "159.350", band: "low-office", gm: "tower" as const },
  { code: "L21", label: "Level 21", ffl: "154.850", band: "low-office", gm: "tower" as const },
  { code: "L20", label: "Level 20", ffl: "150.350", band: "low-office", gm: "tower" as const },
  { code: "L19", label: "Level 19", ffl: "145.850", band: "low-office", gm: "tower" as const },
  { code: "L18", label: "Level 18", ffl: "141.350", band: "low-office", gm: "tower" as const },
  { code: "L17", label: "Level 17", ffl: "136.850", band: "low-office", gm: "tower" as const },
  { code: "L16", label: "Level 16", ffl: "132.350", band: "low-office", gm: "tower" as const },
  { code: "L15", label: "Level 15", ffl: "127.850", band: "low-office", gm: "tower" as const },
  { code: "L14", label: "Level 14", ffl: "123.350", band: "low-office", gm: "tower" as const },
  { code: "L13", label: "Level 13 · AC makeup tank", ffl: "112.600", band: "low-office", gm: "tower" as const },
  { code: "L12", label: "Level 12 · office", ffl: "107.800", band: "podium-office", gm: "podium" as const },
  { code: "L11", label: "Level 11", ffl: "103.000", band: "podium-office", gm: "podium" as const },
  { code: "L10", label: "Level 10", ffl: "98.200", band: "podium-office", gm: "podium" as const },
  { code: "L9", label: "Level 9", ffl: "93.400", band: "podium-office", gm: "podium" as const },
  { code: "L8", label: "Level 8 · carpark", ffl: "88.600", band: "carpark", gm: "podium" as const },
  { code: "L7", label: "Level 7 · carpark", ffl: "84.800", band: "carpark", gm: "podium" as const },
  { code: "L6", label: "Level 6 · carpark", ffl: "81.500", band: "carpark", gm: "podium" as const },
  { code: "L5", label: "Level 5 · carpark", ffl: "78.200", band: "carpark", gm: "podium" as const },
  { code: "L4", label: "Level 4 · retail", ffl: "74.400", band: "retail", gm: "podium" as const },
  { code: "L3", label: "Level 3 · retail", ffl: "69.600", band: "retail", gm: "podium" as const },
  { code: "L2", label: "Level 2 · commercial", ffl: "64.800", band: "commercial", gm: "podium" as const },
  { code: "L1", label: "Level 1 · commercial", ffl: "60.000", band: "commercial", gm: "podium" as const },
  { code: "GF", label: "Ground · retail", ffl: "54.000", band: "commercial", gm: "podium" as const },
  { code: "LG", label: "Lower ground", ffl: "50.500", band: "commercial", gm: "podium" as const },
  { code: "B1", label: "Basement 1 · carpark", ffl: "47.000", band: "basement", gm: "podium" as const },
  { code: "B2", label: "Basement 2 · carpark", ffl: "43.800", band: "basement", gm: "podium" as const },
  { code: "B3", label: "Basement 3 · carpark", ffl: "40.600", band: "basement", gm: "podium" as const },
  { code: "B4", label: "Basement 4 · plant", ffl: "34.800", band: "plant", gm: "podium" as const },
] as const;

export const FLOOR_PLANS = [
  { code: "B1", src: "/plans/b1.jpg", title: "Basement 1 · carpark, plant, toilets" },
  { code: "LG", src: "/plans/lg.jpg", title: "Lower ground · retail & F&B" },
  { code: "GF", src: "/plans/gf.jpg", title: "Ground floor · leasing lots" },
  { code: "L1", src: "/plans/l1.jpg", title: "Level 1 · leasing lots" },
  { code: "L3", src: "/plans/l3.jpg", title: "Level 3 · retail podium" },
  { code: "L4", src: "/plans/l4.jpg", title: "Level 4 · retail podium" },
] as const;

export const SECTION_PLAN = {
  src: "/plans/section.jpg",
  title: "Diagrammatic section · B4 to helipad · 20 Jul 2026",
};
