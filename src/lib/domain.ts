import { TRADE_WEIGHT } from "@/lib/msk-seed";

export type CellStatus = "done" | "missed" | "risk" | "track";

export type Activity = {
  id: number;
  seq: number;
  name: string;
  contractor: string;
  gmTrade: boolean;
};

export type Floor = { id: number; code: string; sortOrder: number };
export type Toilet = { id: number; code: string; tower: "TA" | "TB" };

export type CrewMember = {
  id: number;
  callsign: string;
  contractor: string;
  trade: string;
  active: boolean;
};

export type ProgressCell = {
  floorId: number;
  toiletId: number;
  activityId: number;
  pct: number;
  updatedAt: string;
};

export type FloorDate = {
  floorId: number;
  activityId: number;
  dueOn: string;
};

export type Assignment = {
  id: number;
  workDate: string;
  crewId: number;
  floorId: number;
  toiletId: number;
  activityId: number;
  startPct: number;
  claimedPct: number | null;
  note: string | null;
  photoData: string | null;
  verified: boolean;
  rejected: boolean;
  createdAt: string;
};

export type AuditRow = {
  id: number;
  createdAt: string;
  kind: string;
  floorCode: string;
  toiletCode: string;
  activitySeq: number;
  fromPct: number | null;
  toPct: number | null;
  crewCallsign: string | null;
  note: string | null;
};

export type MskItem = {
  id: number;
  seq: number;
  code: string;
  name: string;
  shortName: string;
  trade: "CW" | "SAN" | "IRR";
  tradeWeight: number;
};

export type MskLevel = {
  id: number;
  code: string;
  sortOrder: number;
  zone: string;
  ffl: string;
};

export type MskProgress = {
  levelId: number;
  tower: "A" | "B";
  itemId: number;
  pct: number;
  na: boolean;
  updatedAt: string;
};

export type MskAssignment = {
  id: number;
  workDate: string;
  crewId: number;
  levelId: number;
  tower: "A" | "B";
  itemId: number;
  startPct: number;
  claimedPct: number | null;
  note: string | null;
  photoData: string | null;
  verified: boolean;
  rejected: boolean;
  createdAt: string;
};

export type SiteSnapshot = {
  projectName: string;
  projectCode: string;
  subject: string;
  section: string;
  clientName: string;
  companyName: string;
  activities: Activity[];
  floors: Floor[];
  toilets: Toilet[];
  dates: FloorDate[];
  progress: ProgressCell[];
  crew: CrewMember[];
  assignments: Assignment[];
  audit: AuditRow[];
  mskItems: MskItem[];
  mskLevels: MskLevel[];
  mskProgress: MskProgress[];
  mskAssignments: MskAssignment[];
};

export function isGmCrew(c: CrewMember) {
  return c.contractor === "GM" && c.active;
}

export function isSubCrew(c: CrewMember) {
  return c.contractor === "SUB" && c.active;
}

export function isSiteCrew(c: CrewMember) {
  return (c.contractor === "GM" || c.contractor === "SUB") && c.active;
}

export function siteCrewGrouped(crew: CrewMember[]) {
  const gm = crew.filter(isGmCrew).slice().sort((a, b) => a.callsign.localeCompare(b.callsign));
  const subs = crew.filter(isSubCrew).slice().sort((a, b) => a.callsign.localeCompare(b.callsign));
  return { gm, subs, all: [...gm, ...subs] };
}

export function isGmActivity(a: Activity) {
  return a.gmTrade;
}

/** Logical predecessors by activity seq. Downstream cannot honestly run ahead. */
export const PREDECESSORS: Record<number, number[]> = {
  3: [2],
  4: [2],
  5: [2],
  6: [2],
  7: [1, 2, 3],
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
  23: [14],
};

export const RISK_WINDOW_DAYS = 3;
export const PHOTO_JUMP = 30;

export function daysBetween(fromIso: string, toIso: string): number {
  const a = Date.parse(`${fromIso}T00:00:00Z`);
  const b = Date.parse(`${toIso}T00:00:00Z`);
  return Math.round((b - a) / 86_400_000);
}

export function cellStatus(pct: number, dueOn: string, asOf: string): CellStatus {
  if (pct >= 100) return "done";
  const delta = daysBetween(asOf, dueOn);
  if (delta < 0) return "missed";
  if (delta <= RISK_WINDOW_DAYS) return "risk";
  return "track";
}

export function mean(nums: number[]): number {
  if (nums.length === 0) return 0;
  return nums.reduce((s, n) => s + n, 0) / nums.length;
}

export function roundPct(n: number): number {
  return Math.round(n);
}

/** Big jump or 100% finish should have a photo so nobody can lie. */
export function needsPhoto(fromPct: number, toPct: number) {
  const jump = toPct - fromPct;
  return jump >= PHOTO_JUMP || toPct >= 100;
}

export function photoList(raw: string | null | undefined): string[] {
  if (!raw || raw === "seed-photo" || raw === "inline-photo") return [];
  const t = raw.trim();
  if (t.startsWith("[")) {
    try {
      const v = JSON.parse(t) as unknown;
      return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string" && x.length > 0 && x !== "inline-photo") : [];
    } catch {
      return [];
    }
  }
  return [raw];
}

export function packPhotos(urls: string[]): string | null {
  const clean = urls.filter(Boolean);
  if (clean.length === 0) return null;
  if (clean.length === 1) return clean[0] ?? null;
  return JSON.stringify(clean);
}

export function hasRealPhoto(raw: string | null | undefined) {
  if (!raw || raw === "seed-photo") return false;
  if (raw === "inline-photo") return true;
  return photoList(raw).length > 0;
}

export type MskJob = {
  level: MskLevel;
  tower: "A" | "B";
  item: MskItem;
  pct: number;
  why: string;
  kind: "hole" | "next";
};

/** One live hole per package + tower (highest skipped floor). Old 0% leftovers stay on the board, not on Do next. */
export function rankMskJobs(input: {
  holes: { level: MskLevel; tower: "A" | "B"; item: MskItem; pct: number }[];
  nextInLine: { level: MskLevel; tower: "A" | "B"; item: MskItem; pct: number }[];
}): MskJob[] {
  const jobs: MskJob[] = [];
  const seen = new Set<string>();
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
      kind: "hole",
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
      kind: "next",
    });
  }
  return jobs;
}

export function findMskCell(site: SiteSnapshot, levelCode: string, tower: "A" | "B", seq: number) {
  const level = site.mskLevels.find((l) => l.code === levelCode);
  const item = site.mskItems.find((i) => i.seq === seq);
  if (!level || !item) return null;
  const cell = site.mskProgress.find((p) => p.levelId === level.id && p.tower === tower && p.itemId === item.id);
  return {
    level,
    tower,
    item,
    pct: cell && !cell.na ? cell.pct : 0,
    na: cell?.na ?? false,
  };
}

export function towerFromFlag(code?: string): "A" | "B" {
  return (code ?? "").toUpperCase().includes("B") ? "B" : "A";
}

/**
 * GM crew write the board on Save. Named plumbing subs (Aipoon / Aryan / Kolik)
 * only land on the board after a GM check. That check is not the client PC claim.
 */
export function shouldCommitProgress(contractor: string) {
  return contractor !== "SUB";
}

export type Flag = {
  id: string;
  severity: "high" | "medium" | "low";
  kind: string;
  title: string;
  detail: string;
  floorCode: string;
  toiletCode?: string;
  activitySeq?: number;
  gm: boolean;
  board?: "toilet" | "msk";
};

export const SHORT_NAME: Record<number, string> = {
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
  23: "Window",
};

export function predecessorGap(
  activities: Activity[],
  pctOf: (seq: number) => number,
  seq: number,
  currentPct: number,
): { blockedBy: Activity; pct: number } | null {
  const preds = PREDECESSORS[seq] ?? [];
  for (const p of preds) {
    const pct = pctOf(p);
    if (pct < 80 && currentPct > pct + 20) {
      const act = activities.find((a) => a.seq === p);
      if (act) return { blockedBy: act, pct };
    }
  }
  return null;
}

export type WaitingRow = {
  floor: Floor;
  toilet: Toilet;
  activity: Activity;
  blockedBy: Activity;
  pct: number;
  blockedPct: number;
};

export function buildInsights(site: SiteSnapshot, asOf: string) {
  const actById = new Map(site.activities.map((a) => [a.id, a]));
  const floorById = new Map(site.floors.map((f) => [f.id, f]));
  const toiletById = new Map(site.toilets.map((t) => [t.id, t]));
  const crewById = new Map(site.crew.map((c) => [c.id, c]));
  const gmActs = site.activities.filter(isGmActivity);
  const gmCrew = site.crew.filter(isGmCrew);

  const dateKey = (floorId: number, activityId: number) => `${floorId}:${activityId}`;
  const due = new Map(site.dates.map((d) => [dateKey(d.floorId, d.activityId), d.dueOn]));

  const pctMap = new Map<string, ProgressCell>();
  for (const p of site.progress) {
    pctMap.set(`${p.floorId}:${p.toiletId}:${p.activityId}`, p);
  }

  function getPct(floorId: number, toiletId: number, activityId: number): number {
    return pctMap.get(`${floorId}:${toiletId}:${activityId}`)?.pct ?? 0;
  }

  const floorAvgs = site.floors.map((floor) => {
    const cells = site.toilets.flatMap((t) => site.activities.map((a) => getPct(floor.id, t.id, a.id)));
    return { floor, avg: roundPct(mean(cells)) };
  });

  const gmFloorAvgs = site.floors.map((floor) => {
    const cells = site.toilets.flatMap((t) => gmActs.map((a) => getPct(floor.id, t.id, a.id)));
    return { floor, avg: roundPct(mean(cells)) };
  });

  const allCells = site.floors.flatMap((floor) =>
    site.toilets.flatMap((t) => site.activities.map((a) => getPct(floor.id, t.id, a.id))),
  );
  const gmCells = site.floors.flatMap((floor) =>
    site.toilets.flatMap((t) => gmActs.map((a) => getPct(floor.id, t.id, a.id))),
  );
  const sectionAvg = roundPct(mean(allCells));
  const gmSectionAvg = roundPct(mean(gmCells));

  const flags: Flag[] = [];

  for (const floor of site.floors) {
    for (const act of site.activities) {
      const dueOn = due.get(dateKey(floor.id, act.id)) ?? asOf;
      const toiletStates = site.toilets.map((toilet) => {
        const pct = getPct(floor.id, toilet.id, act.id);
        const status = cellStatus(pct, dueOn, asOf);
        const pctOf = (seq: number) => {
          const a = site.activities.find((x) => x.seq === seq);
          return a ? getPct(floor.id, toilet.id, a.id) : 0;
        };
        const gap = predecessorGap(site.activities, pctOf, act.seq, pct);
        return { toilet, pct, status, gap };
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
          board: "toilet",
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
          board: "toilet",
        });
      }
      for (const t of toiletStates) {
        if (t.pct > 20 && t.gap && act.gmTrade) {
          flags.push({
            id: `seq-${floor.code}-${t.toilet.code}-${act.seq}`,
            severity: "high",
            kind: "sequence",
            title: `${floor.code} ${t.toilet.code} skipped sequence`,
            detail: `${act.name} is ${t.pct}% but ${t.gap.blockedBy.name} is only ${t.gap.pct}%.`,
            floorCode: floor.code,
            toiletCode: t.toilet.code,
            activitySeq: act.seq,
            gm: true,
            board: "toilet",
          });
        }
      }
    }
  }

  const todayAssign = site.assignments.filter((a) => {
    if (a.workDate !== asOf) return false;
    const crew = crewById.get(a.crewId);
    return crew ? isSiteCrew(crew) : false;
  });
  const byCrew = new Map<number, Assignment[]>();
  for (const a of todayAssign) {
    const list = byCrew.get(a.crewId) ?? [];
    list.push(a);
    byCrew.set(a.crewId, list);
  }
  for (const [crewId, list] of byCrew) {
    if (list.length >= 4) {
      const crew = crewById.get(crewId);
      flags.push({
        id: `spread-${crewId}`,
        severity: "medium",
        kind: "spread",
        title: `${crew?.callsign ?? "Crew"} on ${list.length} toilets today`,
        detail: "Too many locations for one person — check they were actually there.",
        floorCode: list[0] ? (floorById.get(list[0].floorId)?.code ?? "") : "",
        gm: true,
        board: "toilet",
      });
    }
  }

  const pendingByCell = new Map<string, Assignment>();
  for (const a of todayAssign) {
    const floor = floorById.get(a.floorId);
    const toilet = toiletById.get(a.toiletId);
    const act = actById.get(a.activityId);
    const crew = crewById.get(a.crewId);
    if (a.claimedPct == null) continue;
    const boardPct = getPct(a.floorId, a.toiletId, a.activityId);
    const sub = crew ? isSubCrew(crew) : false;
    if (sub && !a.verified && !a.rejected && a.claimedPct !== boardPct) {
      pendingByCell.set(`${a.floorId}:${a.toiletId}:${a.activityId}`, a);
    }
    const jump = a.claimedPct - a.startPct;
    if (a.claimedPct < a.startPct) {
      flags.push({
        id: `back-${a.id}`,
        severity: "high",
        kind: "lie",
        title: `${crew?.callsign ?? "Crew"} reversed progress`,
        detail: `${floor?.code} ${toilet?.code} ${act?.name}: ${a.startPct}% → ${a.claimedPct}%.`,
        floorCode: floor?.code ?? "",
        toiletCode: toilet?.code,
        activitySeq: act?.seq,
        gm: true,
        board: "toilet",
      });
    } else if ((jump >= 30 || a.claimedPct >= 100) && !hasRealPhoto(a.photoData) && !a.verified) {
      flags.push({
        id: `photo-${a.id}`,
        severity: "high",
        kind: "lie",
        title: `${crew?.callsign ?? "Crew"} · no photo for ${jump}% jump`,
        detail: sub
          ? `${floor?.code} ${toilet?.code} ${act?.name}: sub update ${a.claimedPct}%, board still ${boardPct}%.`
          : `${floor?.code} ${toilet?.code} ${act?.name}: ${a.startPct}% → ${a.claimedPct}% on the board with no photo.`,
        floorCode: floor?.code ?? "",
        toiletCode: toilet?.code,
        activitySeq: act?.seq,
        gm: true,
        board: "toilet",
      });
    } else if (sub && !a.verified && !a.rejected && a.claimedPct !== a.startPct) {
      flags.push({
        id: `unv-${a.id}`,
        severity: "low",
        kind: "unverified",
        title: `${crew?.callsign ?? "Crew"} sub update waiting GM check`,
        detail: `${floor?.code} ${toilet?.code} ${act?.name}: sub ${a.claimedPct}%, board ${boardPct}%. Not the client claim.`,
        floorCode: floor?.code ?? "",
        toiletCode: toilet?.code,
        activitySeq: act?.seq,
        gm: true,
        board: "toilet",
      });
    }
  }

  const waitingOn: WaitingRow[] = [];
  const waitSeen = new Set<string>();
  for (const floor of site.floors) {
    for (const toilet of site.toilets) {
      for (const act of gmActs) {
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
          waitingOn.push({ floor, toilet, activity: act, blockedBy: pred, pct, blockedPct });
        }
      }
    }
  }

  const waitByFloorAct = new Map<string, WaitingRow[]>();
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
      board: "toilet",
    });
  }

  const expectedToday: {
    floor: Floor;
    toilet: Toilet;
    activity: Activity;
    pct: number;
    dueOn: string;
    status: CellStatus;
  }[] = [];

  for (const floor of site.floors) {
    for (const toilet of site.toilets) {
      for (const act of gmActs) {
        const pct = getPct(floor.id, toilet.id, act.id);
        const dueOn = due.get(dateKey(floor.id, act.id)) ?? asOf;
        const status = cellStatus(pct, dueOn, asOf);
        if (status === "missed" || status === "risk") {
          expectedToday.push({ floor, toilet, activity: act, pct, dueOn, status });
        }
      }
    }
  }

  expectedToday.sort((a, b) => {
    const rank = { missed: 0, risk: 1, track: 2, done: 3 };
    if (rank[a.status] !== rank[b.status]) return rank[a.status] - rank[b.status];
    if (a.floor.sortOrder !== b.floor.sortOrder) return a.floor.sortOrder - b.floor.sortOrder;
    return a.activity.seq - b.activity.seq;
  });

  flags.sort((a, b) => {
    const rank = { high: 0, medium: 1, low: 2 };
    return rank[a.severity] - rank[b.severity];
  });

  const remainingByFloor = site.floors.map((floor) => {
    const cells = site.toilets.flatMap((t) => gmActs.map((a) => 100 - getPct(floor.id, t.id, a.id)));
    return { floor, remaining: roundPct(mean(cells)) };
  });

  const gmRemaining: {
    floor: Floor;
    toilet: Toilet;
    activity: Activity;
    pct: number;
    dueOn: string;
    status: CellStatus;
  }[] = [];
  for (const floor of site.floors) {
    for (const toilet of site.toilets) {
      for (const act of gmActs) {
        const pct = getPct(floor.id, toilet.id, act.id);
        if (pct >= 100) continue;
        const dueOn = due.get(dateKey(floor.id, act.id)) ?? asOf;
        gmRemaining.push({
          floor,
          toilet,
          activity: act,
          pct,
          dueOn,
          status: cellStatus(pct, dueOn, asOf),
        });
      }
    }
  }

  const gmFlags = flags.filter((f) => f.gm);
  const gmTradeAvg = (seq: number) => {
    const act = gmActs.find((a) => a.seq === seq);
    if (!act) return 0;
    const cells = site.floors.flatMap((floor) => site.toilets.map((t) => getPct(floor.id, t.id, act.id)));
    return roundPct(mean(cells));
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
    crewById,
  };
}

export const STATUS_LABEL: Record<CellStatus, string> = {
  done: "Completed",
  missed: "Missed / hole",
  risk: "Risk / next in line",
  track: "In progress on track",
};

export function briefingText(
  companyName: string,
  asOf: string,
  ins: ReturnType<typeof buildInsights>,
  msk?: ReturnType<typeof buildMskInsights>,
): string {
  const floors = [...ins.gmFloorAvgs].reverse();
  const floorLine = floors.map((f) => `${f.floor.code} ${f.avg}%`).join(" · ");
  const missed = ins.flags.filter((f) => f.kind === "missed").length;
  const waiting = ins.flags.filter((f) => f.kind === "waiting").length;
  const lies = ins.flags.filter((f) => f.kind === "lie").length;
  const unverified = ins.pendingByCell.size + (msk?.pendingByCell.size ?? 0);
  const crewLines = ins.todayAssign.map((a) => {
    const crew = ins.crewById.get(a.crewId);
    const floor = ins.floorById.get(a.floorId);
    const toilet = ins.toiletById.get(a.toiletId);
    const act = ins.actById.get(a.activityId);
    const board = ins.getPct(a.floorId, a.toiletId, a.activityId);
    const sub = crew ? isSubCrew(crew) : false;
    const line =
      a.claimedPct == null
        ? "no update yet"
        : sub && a.claimedPct !== board
          ? `sub ${a.claimedPct}% · board ${board}% · waiting GM check`
          : `${a.claimedPct}% on board`;
    return `- ${crew?.callsign ?? "Crew"} · ${floor?.code} ${toilet?.code} ${act?.name} · ${line}`;
  });
  const mskCrew = (msk?.todayAssign ?? []).map((a) => {
    const crew = msk?.crewById.get(a.crewId);
    const level = msk?.levelById.get(a.levelId);
    const item = msk?.itemById.get(a.itemId);
    const board = msk ? msk.getPct(a.levelId, a.tower, a.itemId) : 0;
    const sub = crew ? isSubCrew(crew) : false;
    const line =
      a.claimedPct == null
        ? "no update yet"
        : sub && a.claimedPct !== board
          ? `sub ${a.claimedPct}% · board ${board}% · waiting GM check`
          : `${a.claimedPct}% on board`;
    return `- ${crew?.callsign ?? "Crew"} · ${level?.code} T${a.tower} ${item?.shortName} · ${line}`;
  });
  const problems = [...(msk?.flags.slice(0, 6) ?? []), ...ins.flags.slice(0, 6)].slice(0, 10).map((f) => `- ${f.title}: ${f.detail}`);
  const mskLine = msk
    ? `Tower lock L13–31M: ${msk.weightedAvg}%  ·  CW ${msk.tradeAvg.CW}%  SAN ${msk.tradeAvg.SAN}%  IRR ${msk.tradeAvg.IRR}%\nTA ${msk.towerAvg.A}% · TB ${msk.towerAvg.B}%`
    : "";
  return [
    companyName.toUpperCase(),
    `The Capitol · MSK plumbing · TA & TB`,
    `As of ${asOf}`,
    "",
    mskLine,
    "",
    `Toilet section 1 (fittings only): ${ins.gmSectionAvg}%`,
    floorLine,
    `Sanitary piping ${ins.gmTradeAvg(1)}% · Concealed piping ${ins.gmTradeAvg(3)}% · Sanitary fitting ${ins.gmTradeAvg(20)}%`,
    "",
    `Missed ${missed} · Waiting on others ${waiting} · Sub updates waiting check ${unverified} · Truth flags ${lies}${msk ? ` · MSK holes ${msk.flags.filter((f) => f.kind === "hole").length}` : ""}`,
    "",
    "Crew today",
    [...crewLines, ...mskCrew].length ? [...crewLines, ...mskCrew].join("\n") : "- No assignments logged",
    "",
    "Problems",
    problems.length ? problems.join("\n") : "- None on the GM board",
  ]
    .filter((line) => line !== undefined)
    .join("\n");
}

export function mskStatus(
  pct: number,
  na: boolean,
  aboveStarted: boolean,
  belowReady: boolean,
): CellStatus | "na" {
  if (na) return "na";
  if (pct >= 100) return "done";
  if (pct === 0 && aboveStarted) return "missed";
  if (pct > 0 && pct < 100 && aboveStarted) return "risk";
  if (pct === 0 && belowReady) return "risk";
  if (pct > 0 && pct < 50 && belowReady) return "risk";
  return "track";
}

export function buildMskInsights(site: SiteSnapshot, asOf: string) {
  const itemById = new Map(site.mskItems.map((i) => [i.id, i]));
  const levelById = new Map(site.mskLevels.map((l) => [l.id, l]));
  const crewById = new Map(site.crew.map((c) => [c.id, c]));
  const sortedLevels = [...site.mskLevels].sort((a, b) => a.sortOrder - b.sortOrder);

  const cellMap = new Map<string, MskProgress>();
  for (const p of site.mskProgress) {
    cellMap.set(`${p.levelId}:${p.tower}:${p.itemId}`, p);
  }

  function cell(levelId: number, tower: "A" | "B", itemId: number): MskProgress | undefined {
    return cellMap.get(`${levelId}:${tower}:${itemId}`);
  }

  function getPct(levelId: number, tower: "A" | "B", itemId: number): number {
    const c = cell(levelId, tower, itemId);
    if (!c || c.na) return 0;
    return c.pct;
  }

  function isNa(levelId: number, tower: "A" | "B", itemId: number): boolean {
    return cell(levelId, tower, itemId)?.na ?? false;
  }

  function aboveStarted(level: MskLevel, tower: "A" | "B", itemId: number): boolean {
    return sortedLevels.some(
      (l) => l.sortOrder > level.sortOrder && !isNa(l.id, tower, itemId) && getPct(l.id, tower, itemId) > 0,
    );
  }

  function belowReady(level: MskLevel, tower: "A" | "B", itemId: number): boolean {
    const lower = sortedLevels.filter((l) => l.sortOrder < level.sortOrder && !isNa(l.id, tower, itemId));
    if (lower.length === 0) return true;
    const nearest = lower[lower.length - 1];
    if (!nearest) return true;
    return getPct(nearest.id, tower, itemId) >= 80;
  }

  function statusOf(level: MskLevel, tower: "A" | "B", item: MskItem): CellStatus | "na" {
    const c = cell(level.id, tower, item.id);
    const pct = c?.na ? 0 : (c?.pct ?? 0);
    return mskStatus(pct, c?.na ?? false, aboveStarted(level, tower, item.id), belowReady(level, tower, item.id));
  }

  const liveCells: number[] = [];
  const byTrade: Record<"CW" | "SAN" | "IRR", number[]> = { CW: [], SAN: [], IRR: [] };
  const byTower: Record<"A" | "B", number[]> = { A: [], B: [] };
  const byItem = new Map<number, number[]>();

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
    IRR: mean(byTrade.IRR),
  };
  const tradeAvg = {
    CW: roundPct(tradeRaw.CW),
    SAN: roundPct(tradeRaw.SAN),
    IRR: roundPct(tradeRaw.IRR),
  };
  const weightSum = TRADE_WEIGHT.CW + TRADE_WEIGHT.SAN + TRADE_WEIGHT.IRR;
  const weightedAvg = roundPct(
    (tradeRaw.CW * TRADE_WEIGHT.CW + tradeRaw.SAN * TRADE_WEIGHT.SAN + tradeRaw.IRR * TRADE_WEIGHT.IRR) / weightSum,
  );
  const towerAvg = { A: roundPct(mean(byTower.A)), B: roundPct(mean(byTower.B)) };

  const levelRows = sortedLevels.map((level) => {
    const towers = (["A", "B"] as const).map((tower) => {
      const vals = site.mskItems
        .map((item) => cell(level.id, tower, item.id))
        .filter((c): c is MskProgress => !!c && !c.na)
        .map((c) => c.pct);
      return { tower, avg: roundPct(mean(vals)) };
    });
    const raw = mean(
      site.mskItems
        .flatMap((item) =>
          (["A", "B"] as const)
            .map((tower) => cell(level.id, tower, item.id))
            .filter((c): c is MskProgress => !!c && !c.na)
            .map((c) => c.pct),
        ),
    );
    return {
      level,
      A: towers[0]?.avg ?? 0,
      B: towers[1]?.avg ?? 0,
      avg: roundPct(raw),
    };
  });

  const itemAvgs = site.mskItems.map((item) => ({
    item,
    avg: roundPct(mean(byItem.get(item.id) ?? [])),
  }));

  const flags: Flag[] = [];
  const holes: {
    level: MskLevel;
    tower: "A" | "B";
    item: MskItem;
    pct: number;
    status: CellStatus;
  }[] = [];
  const nextInLine: {
    level: MskLevel;
    tower: "A" | "B";
    item: MskItem;
    pct: number;
  }[] = [];

  for (const item of site.mskItems) {
    for (const tower of ["A", "B"] as const) {
      for (const level of sortedLevels) {
        const c = cell(level.id, tower, item.id);
        if (!c || c.na) continue;
        const st = statusOf(level, tower, item);
        if (st === "missed") {
          holes.push({ level, tower, item, pct: c.pct, status: "missed" });
        } else if (st === "risk" && c.pct === 0) {
          nextInLine.push({ level, tower, item, pct: c.pct });
        }
      }
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
          board: "msk",
        });
      }
    }
  }

  const holeFront = new Set<string>();
  for (const h of [...holes].sort((a, b) => b.level.sortOrder - a.level.sortOrder)) {
    const key = `${h.item.id}-${h.tower}`;
    if (holeFront.has(key)) continue;
    holeFront.add(key);
    flags.push({
      id: `hole-${h.level.code}-${h.tower}-${h.item.seq}`,
      severity: h.pct === 0 ? "high" : "medium",
      kind: "hole",
      title: `${h.level.code} T${h.tower} skipped · ${h.item.shortName}`,
      detail:
        h.pct === 0
          ? `Live hole — a higher floor already started ${h.item.name}. Tap to log %.`
          : `This floor is only ${h.pct}% while a higher floor already moved on. Tap to log %.`,
      floorCode: h.level.code,
      toiletCode: `T${h.tower}`,
      activitySeq: h.item.seq,
      gm: true,
      board: "msk",
    });
  }

  const nextFlags = new Set<string>();
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
      board: "msk",
    });
  }

  const todayAssign = site.mskAssignments.filter((a) => {
    if (a.workDate !== asOf) return false;
    const crew = crewById.get(a.crewId);
    return crew ? isSiteCrew(crew) : false;
  });

  const pendingByCell = new Map<string, MskAssignment>();
  for (const a of todayAssign) {
    const level = levelById.get(a.levelId);
    const item = itemById.get(a.itemId);
    const crew = crewById.get(a.crewId);
    if (a.claimedPct == null) continue;
    const boardPct = getPct(a.levelId, a.tower, a.itemId);
    const sub = crew ? isSubCrew(crew) : false;
    if (sub && !a.verified && !a.rejected && a.claimedPct !== boardPct) {
      pendingByCell.set(`${a.levelId}:${a.tower}:${a.itemId}`, a);
    }
    const jump = a.claimedPct - a.startPct;
    if (a.claimedPct < a.startPct) {
      flags.push({
        id: `msk-back-${a.id}`,
        severity: "high",
        kind: "lie",
        title: `${crew?.callsign ?? "Crew"} reversed MSK progress`,
        detail: `${level?.code} T${a.tower} ${item?.name}: ${a.startPct}% → ${a.claimedPct}%.`,
        floorCode: level?.code ?? "",
        toiletCode: `T${a.tower}`,
        activitySeq: item?.seq,
        gm: true,
        board: "msk",
      });
    } else if ((jump >= 30 || a.claimedPct >= 100) && !hasRealPhoto(a.photoData) && !a.verified) {
      flags.push({
        id: `msk-photo-${a.id}`,
        severity: "high",
        kind: "lie",
        title: `${crew?.callsign ?? "Crew"} · no photo for ${jump}% jump`,
        detail: sub
          ? `${level?.code} T${a.tower} ${item?.name}: sub update ${a.claimedPct}%, board still ${boardPct}%.`
          : `${level?.code} T${a.tower} ${item?.name}: ${a.startPct}% → ${a.claimedPct}% on the board with no photo.`,
        floorCode: level?.code ?? "",
        toiletCode: `T${a.tower}`,
        activitySeq: item?.seq,
        gm: true,
        board: "msk",
      });
    } else if (sub && !a.verified && !a.rejected && a.claimedPct !== a.startPct) {
      flags.push({
        id: `msk-unv-${a.id}`,
        severity: "low",
        kind: "unverified",
        title: `${crew?.callsign ?? "Crew"} sub update waiting GM check`,
        detail: `${level?.code} T${a.tower} ${item?.name}: sub ${a.claimedPct}%, board ${boardPct}%. Not the client claim.`,
        floorCode: level?.code ?? "",
        toiletCode: `T${a.tower}`,
        activitySeq: item?.seq,
        gm: true,
        board: "msk",
      });
    }
  }

  flags.sort((a, b) => {
    const rank = { high: 0, medium: 1, low: 2 };
    return rank[a.severity] - rank[b.severity];
  });

  const wave = site.mskItems.map((item) => {
    const fronts = (["A", "B"] as const).map((tower) => {
      let front: MskLevel | null = null;
      for (const level of sortedLevels) {
        if (isNa(level.id, tower, item.id)) continue;
        if (getPct(level.id, tower, item.id) > 0) front = level;
      }
      return { tower, front };
    });
    return { item, fronts };
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
    wave,
    getPct,
    isNa,
    statusOf,
    cell,
    itemById,
    levelById,
    crewById,
    liveAvg: roundPct(mean(liveCells)),
  };
}

export function formatRm(n: number): string {
  return n.toLocaleString("en-MY", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export function claimPct(work: number, contract: number): number {
  if (contract <= 0) return 0;
  return roundPct((work / contract) * 100);
}
