import type { SiteSnapshot } from "@/lib/domain";

/** Official GAJI AIPOON SUBS.xlsx rates. Work now L24–L30 both towers (Alvin 2 Sep). */
export const AIPOON_GAJI = {
  name: "Aipoon",
  dated: "2026-08-12",
  po: "PO6706",
  title: "UPVC toilet + tenant L24–L30 · both towers",
  floors: ["L24", "L25", "L26", "L27", "L28", "L29", "L30"] as const,
  toiletGross: {
    L24: 5800,
    L25: 5800,
    L26: 5800,
    L27: 5800,
    L28: 5800,
    L29: 5800,
    L30: 5800,
  } as Record<string, number>,
  toiletGrossTotal: 40600,
  toiletFinal: 32000,
  tenantGrossPerLevel: 1440,
  tenantGrossTotal: 10080,
  tenantFinal: 10000,
  grandTotal: 42000,
  perLevel: 6000,
  packages: [
    {
      id: "toilet" as const,
      seq: 11,
      label: "Toilet + stack",
      points: "Basin 7 · Floor trap 16 · Urinal 3 · Stack 3 · RM50 / point",
    },
    {
      id: "tenant" as const,
      seq: 9,
      label: "Tenant + hosereel + stack",
      points: "Floor 12 · Basin 12 · Hosereel 12 · Stack 12 · RM30 / point",
    },
  ],
} as const;

export type AipoonPkgId = (typeof AIPOON_GAJI.packages)[number]["id"];

/** One tower-cell share so both towers sum to the sheet total. */
export function aipoonLabourRate(pkg: AipoonPkgId, level: string): number {
  if (pkg === "tenant") {
    return AIPOON_GAJI.tenantFinal / AIPOON_GAJI.floors.length / 2;
  }
  const gross = AIPOON_GAJI.toiletGross[level] ?? 0;
  const levelPay = (gross * AIPOON_GAJI.toiletFinal) / AIPOON_GAJI.toiletGrossTotal;
  return levelPay / 2;
}

export type AipoonCell = {
  level: string;
  tower: "A" | "B";
  pct: number;
  labour: number;
  earned: number;
};

export type AipoonPkgRow = {
  id: AipoonPkgId;
  seq: number;
  label: string;
  points: string;
  cells: AipoonCell[];
  labourTotal: number;
  earned: number;
  doneFloors: number;
  floorCount: number;
};

export type AipoonGajiView = {
  packages: AipoonPkgRow[];
  labourTotal: number;
  earned: number;
  pct: number;
};

export function buildAipoonGaji(site: SiteSnapshot): AipoonGajiView {
  const itemBySeq = new Map(site.mskItems.map((i) => [i.seq, i]));
  const levelByCode = new Map(site.mskLevels.map((l) => [l.code, l]));
  const cellMap = new Map<string, { pct: number; na: boolean }>();
  for (const p of site.mskProgress) {
    cellMap.set(`${p.levelId}:${p.tower}:${p.itemId}`, { pct: p.pct, na: p.na });
  }

  const packages: AipoonPkgRow[] = AIPOON_GAJI.packages.map((pkg) => {
    const item = itemBySeq.get(pkg.seq);
    const cells: AipoonCell[] = [];
    let labourTotal = 0;
    let earned = 0;
    let doneFloors = 0;
    for (const code of AIPOON_GAJI.floors) {
      const level = levelByCode.get(code);
      const rate = aipoonLabourRate(pkg.id, code);
      for (const tower of ["A", "B"] as const) {
        labourTotal += rate;
        let pct = 0;
        if (item && level) {
          const c = cellMap.get(`${level.id}:${tower}:${item.id}`);
          pct = !c || c.na ? 0 : c.pct;
        }
        const pay = (pct / 100) * rate;
        earned += pay;
        if (pct >= 100) doneFloors += 1;
        cells.push({ level: code, tower, pct, labour: rate, earned: pay });
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
      floorCount: AIPOON_GAJI.floors.length * 2,
    };
  });

  const labourTotal = packages.reduce((s, p) => s + p.labourTotal, 0);
  const earned = packages.reduce((s, p) => s + p.earned, 0);
  const pct = labourTotal <= 0 ? 0 : Math.round((earned / labourTotal) * 100);
  return { packages, labourTotal, earned, pct };
}
