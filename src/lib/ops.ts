export type OpsStatus =
  | "draft"
  | "issued"
  | "current"
  | "superseded"
  | "partial"
  | "received"
  | "certified"
  | "paid"
  | "open"
  | "active"
  | "held";

export type OpsProject = {
  id: number;
  code: string;
  name: string;
  clientName: string;
  location: string;
  status: string;
};

export type OpsDrawing = {
  id: number;
  projectId: number;
  title: string;
  refNo: string;
  discipline: string;
  rev: string;
  dated: string;
  status: string;
  fileHref: string;
};

export type OpsPo = {
  id: number;
  projectId: number;
  poNo: string;
  supplier: string;
  dated: string;
  material: string;
  amount: number;
  status: string;
  ping: string;
};

export type OpsReceive = {
  id: number;
  projectId: number;
  doNo: string;
  poId: number | null;
  dated: string;
  receivedBy: string;
  qtyNote: string;
  status: string;
};

export type OpsClaim = {
  id: number;
  projectId: number;
  claimNo: string;
  title: string;
  period: string;
  dated: string;
  amount: number;
  certified: number;
  status: string;
  ping: string;
  note: string;
  photos: string[];
};

export type OpsReport = {
  id: number;
  projectId: number;
  cadence: "daily" | "weekly" | "monthly";
  period: string;
  dated: string;
  lockPct: number;
  summary: string;
  status: string;
  preparedBy: string;
};

export type OpsPerson = {
  id: number;
  projectId: number;
  kind: "worker" | "sub";
  name: string;
  trade: string;
  contractor: string;
  dailyRate: number;
  active: boolean;
};

const GM_SUB_NAMES = new Set(["Aipoon", "Aryan", "Kolik"]);

/** Desk crew: GM workers and plumbing subs that work under GM only. */
export function isGmDeskPerson(p: OpsPerson) {
  if (!p.active) return false;
  if (p.kind === "worker") return p.contractor === "GM";
  if (GM_SUB_NAMES.has(p.name)) return true;
  return p.contractor === "GM" || p.contractor === "SUB";
}

export type OpsSalary = {
  id: number;
  projectId: number;
  personId: number;
  month: string;
  basic: number;
  ot: number;
  advance: number;
  net: number;
  status: string;
};

export type OpsAdvance = {
  id: number;
  projectId: number;
  personId: number;
  dated: string;
  amount: number;
  reason: string;
  recovered: boolean;
};

export type OpsAttend = {
  id: number;
  projectId: number;
  personId: number;
  dated: string;
  mark: "P" | "X" | "OT";
};

export type OpsRepay = {
  id: number;
  projectId: number;
  personId: number;
  month: string;
  amount: number;
};

export type OpsSnapshot = {
  projects: OpsProject[];
  drawings: OpsDrawing[];
  pos: OpsPo[];
  receives: OpsReceive[];
  claims: OpsClaim[];
  reports: OpsReport[];
  people: OpsPerson[];
  salary: OpsSalary[];
  advances: OpsAdvance[];
  attendance: OpsAttend[];
  repay: OpsRepay[];
};

export type PaperKind = "drawings" | "po" | "receive" | "claim";
export type ProgressWhen = "daily" | "weekly" | "monthly";
export type PayKind = "advance" | "subcon";
export type PeopleKind = "worker" | "sub";

export function statusTone(status: string): "done" | "miss" | "risk" | "track" | "ink" | "stamp" {
  switch (status) {
    case "current":
    case "received":
    case "certified":
    case "paid":
    case "active":
      return "done";
    case "partial":
    case "issued":
    case "open":
      return "risk";
    case "held":
    case "superseded":
      return "miss";
    case "draft":
      return "track";
    default:
      return "ink";
  }
}

export function filterProject<T extends { projectId: number }>(rows: T[], projectId: number) {
  return rows.filter((r) => r.projectId === projectId);
}

export function parseHash<T extends string>(raw: string, allowed: readonly T[], fallback: T): T {
  const value = raw.replace(/^#/, "");
  return (allowed as readonly string[]).includes(value) ? (value as T) : fallback;
}

export const PAPER_KINDS = [
  { id: "drawings" as const, label: "Drawings", hint: "Latest rev on site", ping: "Farah" },
  { id: "po" as const, label: "Purchase order", hint: "Issued to supplier", ping: "Zilla" },
  { id: "receive" as const, label: "Receive order", hint: "DO against PO", ping: "Alvin" },
];

export const PROGRESS_WHEN = [
  { id: "daily" as const, label: "Daily", hint: "Signed report for the day" },
  { id: "weekly" as const, label: "Weekly", hint: "Week lock for Khairul" },
  { id: "monthly" as const, label: "Monthly", hint: "Month close + claim" },
];

export const PAY_KINDS = [
  { id: "advance" as const, label: "Worker advance", hint: "Tap a day · enter RM", ping: "Jenny" },
  { id: "subcon" as const, label: "Sub-contractor", hint: "Aipoon · Aryan · Kolik", ping: "Jenny" },
];

export function deskStats(ops: OpsSnapshot, projectId: number) {
  const drawings = filterProject(ops.drawings, projectId);
  const pos = filterProject(ops.pos, projectId);
  const receives = filterProject(ops.receives, projectId);
  const claims = filterProject(ops.claims, projectId);
  const reports = filterProject(ops.reports, projectId);
  const people = filterProject(ops.people, projectId);
  const salary = filterProject(ops.salary, projectId);
  const advances = filterProject(ops.advances, projectId);
  const latest = (when: ProgressWhen) => reports.find((r) => r.cadence === when);
  const month = salary[0]?.month ?? "";
  const monthRows = salary.filter((s) => s.month === month);
  return {
    drawings: drawings.length,
    po: pos.length,
    poOpen: pos.filter((p) => p.status !== "received").length,
    receive: receives.length,
    receivePartial: receives.filter((r) => r.status === "partial").length,
    claims: claims.length,
    claimDraft: claims.find((c) => c.status === "draft")?.claimNo ?? null,
    daily: latest("daily"),
    weekly: latest("weekly"),
    monthly: latest("monthly"),
    workers: people.filter((p) => p.kind === "worker").length,
    subs: people.filter((p) => p.kind === "sub").length,
    salaryNet: monthRows.reduce((s, r) => s + r.net, 0),
    salaryMonth: month,
    advancesOpen: advances.filter((a) => !a.recovered).length,
  };
}

export type DeskStats = ReturnType<typeof deskStats>;

export const FOLDERS = [
  { to: "/papers" as const, hash: "drawings", label: "Drawings", hint: "Latest rev on site", ping: "Farah" },
  { to: "/papers" as const, hash: "po", label: "Purchase order", hint: "Issued to supplier", ping: "Zilla" },
  { to: "/papers" as const, hash: "receive", label: "Receive order", hint: "DO against PO", ping: "Alvin" },
  { to: "/eval-claim" as const, hash: "", label: "Evaluation claim", hint: "PC to client", ping: "Jenny" },
  { to: "/people" as const, hash: "worker", label: "Workers & subs", hint: "GM crew + subcontractors", ping: "Khairul" },
  { to: "/pay" as const, hash: "advance", label: "Worker advance", hint: "Month grid · tap a day", ping: "Jenny" },
  { to: "/pay" as const, hash: "subcon", label: "Sub-contractor", hint: "Aipoon · Aryan · Kolik", ping: "Jenny" },
];
