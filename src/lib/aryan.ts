import type { SiteSnapshot } from "@/lib/domain";

/** Aryan (sheet: Ariyan) SS transfer-pump labour — GAJI ARYAN.xlsx. */
export const ARYAN_GAJI = {
  name: "Aryan",
  sheetName: "Ariyan",
  title: "SS welding · transfer pump pipe L13–31M · Towers A & B",
  ratePerMeter: 80,
  fittingEach: 150,
  seq: 4,
  floorsA: ["L13", "L14", "L15", "L16", "L17", "L18", "L19", "L20", "L21", "L22", "L23", "L24", "L25", "L26", "L27", "L28", "L29", "L30", "L31", "L31M"] as const,
  floorsB: ["L13", "L14", "L15", "L16", "L17", "L18", "L19", "L20", "L21", "L22", "L23", "L24", "L25", "L26", "L27", "L28", "L29", "L30", "L31", "L31M"] as const,
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
    L31M: 0,
  } as Record<string, number>,
  fittings: {
    A: {
      L13: { amount: 300, note: "2 elbow" },
      L14: { amount: 300, note: "1 elbow + 1 check valve" },
    } as Record<string, { amount: number; note: string }>,
    B: {
      L13: { amount: 300, note: "2 elbow" },
      L14: { amount: 300, note: "1 elbow + 1 check valve" },
    } as Record<string, { amount: number; note: string }>,
  },
  /** Live 2 Sep: L13–L21 both towers 100%. Sheet ticks are not pay. */
  sheetDone: {
    A: ["L13", "L14", "L15", "L16", "L17", "L18", "L19", "L20", "L21"],
    B: ["L13", "L14", "L15", "L16", "L17", "L18", "L19", "L20", "L21"],
  },
  sheetClaimed: 7736,
} as const;

export type AryanCell = {
  level: string;
  tower: "A" | "B";
  meters: number;
  pipe: number;
  fittings: number;
  fittingNote: string;
  labour: number;
  pct: number;
  earned: number;
  sheetDone: boolean;
  clash: boolean;
};

export type AryanTowerRow = {
  tower: "A" | "B";
  cells: AryanCell[];
  labourTotal: number;
  earned: number;
  doneFloors: number;
  floorCount: number;
  clashCount: number;
};

export type AryanGajiView = {
  towers: AryanTowerRow[];
  labourTotal: number;
  earned: number;
  pct: number;
  clashCount: number;
  sheetClaimed: number;
};

export function aryanLabour(tower: "A" | "B", level: string): { meters: number; pipe: number; fittings: number; note: string; labour: number } {
  const meters = ARYAN_GAJI.meters[level] ?? 0;
  const pipe = Math.round(meters * ARYAN_GAJI.ratePerMeter);
  const fit = ARYAN_GAJI.fittings[tower][level];
  const fittings = fit?.amount ?? 0;
  return { meters, pipe, fittings, note: fit?.note ?? "", labour: pipe + fittings };
}

export function buildAryanGaji(site: SiteSnapshot): AryanGajiView {
  const item = site.mskItems.find((i) => i.seq === ARYAN_GAJI.seq);
  const levelByCode = new Map(site.mskLevels.map((l) => [l.code, l]));
  const cellMap = new Map<string, { pct: number; na: boolean }>();
  for (const p of site.mskProgress) {
    cellMap.set(`${p.levelId}:${p.tower}:${p.itemId}`, { pct: p.pct, na: p.na });
  }

  const towers: AryanTowerRow[] = (["A", "B"] as const).map((tower) => {
    const floors = tower === "A" ? ARYAN_GAJI.floorsA : ARYAN_GAJI.floorsB;
    const doneSet = new Set(ARYAN_GAJI.sheetDone[tower] as readonly string[]);
    const cells: AryanCell[] = [];
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
      const pay = (pct / 100) * rate.labour;
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
        clash,
      });
    }
    return { tower, cells, labourTotal, earned, doneFloors, floorCount: floors.length, clashCount };
  });

  const labourTotal = towers.reduce((s, t) => s + t.labourTotal, 0);
  const earned = towers.reduce((s, t) => s + t.earned, 0);
  const clashCount = towers.reduce((s, t) => s + t.clashCount, 0);
  const pct = labourTotal <= 0 ? 0 : Math.round((earned / labourTotal) * 100);
  return { towers, labourTotal, earned, pct, clashCount, sheetClaimed: ARYAN_GAJI.sheetClaimed };
}
