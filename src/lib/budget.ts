export type BudgetKind = "in" | "out";

export type BudgetLine = {
  id: string;
  kind: BudgetKind;
  name: string;
  planned: number;
  actual: number;
  note: string;
};

export type BudgetSheet = {
  title: string;
  month: string;
  lines: BudgetLine[];
};

const KEY = "gm-budget-v1";

export function monthOf(iso: string) {
  return iso.slice(0, 7);
}

export function monthLabel(ym: string) {
  const [y, m] = ym.split("-").map(Number);
  if (!y || !m) return ym;
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function line(kind: BudgetKind, name: string): BudgetLine {
  return {
    id: `${kind}-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Math.random().toString(36).slice(2, 6)}`,
    kind,
    name,
    planned: 0,
    actual: 0,
    note: "",
  };
}

export function blankSheet(month: string): BudgetSheet {
  return {
    title: "Monthly budget",
    month,
    lines: [
      line("in", "Salary / wages"),
      line("in", "Claim received"),
      line("in", "Other income"),
      line("out", "Housing / rent"),
      line("out", "Food"),
      line("out", "Transport"),
      line("out", "Bills"),
      line("out", "Materials"),
      line("out", "Sub labour"),
      line("out", "Tools / repair"),
      line("out", "Family"),
      line("out", "Savings"),
      line("out", "Other"),
    ],
  };
}

export function loadBudget(month: string): BudgetSheet {
  if (typeof window === "undefined") return blankSheet(month);
  try {
    const raw = window.localStorage.getItem(`${KEY}:${month}`);
    if (!raw) return blankSheet(month);
    const parsed = JSON.parse(raw) as BudgetSheet;
    if (!parsed || !Array.isArray(parsed.lines)) return blankSheet(month);
    return {
      title: parsed.title || "Monthly budget",
      month,

      lines: parsed.lines.map((l, i) => ({
        id: String(l.id || `${l.kind}-${i}`),
        kind: l.kind === "in" ? "in" : "out",
        name: String(l.name || ""),
        planned: Number(l.planned) || 0,
        actual: Number(l.actual) || 0,
        note: String(l.note || ""),
      })),
    };
  } catch {
    return blankSheet(month);
  }
}

export function saveBudget(sheet: BudgetSheet) {
  if (typeof window === "undefined") return;
  const payload = JSON.stringify(sheet);
  window.localStorage.setItem(`${KEY}:${sheet.month}`, payload);
  window.localStorage.setItem(KEY, payload);
}

export function totals(lines: BudgetLine[]) {
  const sum = (kind: BudgetKind, field: "planned" | "actual") =>
    lines.filter((l) => l.kind === kind).reduce((n, l) => n + (Number(l[field]) || 0), 0);
  const inPlan = sum("in", "planned");
  const inAct = sum("in", "actual");
  const outPlan = sum("out", "planned");
  const outAct = sum("out", "actual");
  return {
    inPlan,
    inAct,
    outPlan,
    outAct,
    leftPlan: inPlan - outPlan,
    leftAct: inAct - outAct,
    spentOfPlan: outPlan > 0 ? Math.round((outAct / outPlan) * 100) : 0,
  };
}

export function money(n: number) {
  const v = Number.isFinite(n) ? n : 0;
  const abs = Math.abs(Math.round(v)).toLocaleString("en-MY");
  return v < 0 ? `−${abs}` : abs;
}
