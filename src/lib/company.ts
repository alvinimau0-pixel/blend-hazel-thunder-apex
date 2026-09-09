export const COMPANY = {
  legal: "Gelaran Maju Sdn Bhd",
  short: "Gelaran Maju",
  mark: "G",
  registration: "817785-V",
  trade: "Plumbing & sanitary",
  project: "The Capitol",
  section: "MSK",
  towers: "TA & TB · L13–31M",
  address: "No. 63-B, Jalan BPU 2, Taman Puchong Utama, 47100 Puchong, Selangor",
  phone: "03-5880 8766",
} as const;

/** Latest logged board. Live "As of" follows today (KL) and rolls unfinished work forward. */
export const REPORT_DATE = "2026-09-03";

export function companyLine() {
  return `${COMPANY.legal} (${COMPANY.registration})`;
}

export function siteLine() {
  return `${COMPANY.project} · ${COMPANY.section} · ${COMPANY.towers}`;
}

export type Desk = "board" | "lead" | "site" | "office";

export type Person = {
  id: string;
  name: string;
  title: string;
  desk: Desk;
  handles: string;
};

export const PEOPLE: Person[] = [
  { id: "james", name: "James Wong", title: "CEO", desk: "board", handles: "Company" },
  { id: "ahfat", name: "Ah Fat", title: "Director", desk: "board", handles: "Company" },
  { id: "khairul", name: "Khairul", title: "Engineer / Manager", desk: "lead", handles: "Site · approvals" },
  { id: "alvin", name: "Alvin", title: "Site Supervisor", desk: "site", handles: "Daily board · truth check" },
  { id: "zilla", name: "Zilla", title: "Purchaser", desk: "office", handles: "Material · supplier" },
  { id: "farah", name: "Farah", title: "Documentation", desk: "office", handles: "Letters · submissions" },
  { id: "jenny", name: "Jenny", title: "Accounts", desk: "office", handles: "Progress claim · payment" },
];

export const SIGN_OFF = [
  { role: "Prepared by", title: "Site Supervisor", names: "Alvin" },
  { role: "Checked by", title: "Engineer / Manager", names: "Khairul" },
  { role: "Approved by", title: "CEO", names: "James Wong" },
  { role: "Noted by", title: "Director", names: "Ah Fat" },
] as const;

export const DESK_LABEL: Record<Desk, string> = {
  board: "Board",
  lead: "Engineer / Manager",
  site: "Site desk",
  office: "Office desk",
};

export const CALL_DESK = [
  { when: "Skipped floor, hole, lag, daily truth", ping: "Alvin", title: "Site Supervisor" },
  { when: "Escalate / approve", ping: "Khairul", title: "Engineer / Manager" },
  { when: "Company", ping: "James Wong / Ah Fat", title: "CEO / Director" },
  { when: "Material or supplier", ping: "Zilla", title: "Purchaser" },
  { when: "Progress claim or payment", ping: "Jenny", title: "Accounts" },
  { when: "Letter or submission", ping: "Farah", title: "Documentation" },
] as const;

export function pingForKind(kind: string): { names: string; title: string } {
  switch (kind) {
    case "waiting":
      return { names: "Khairul", title: "Engineer / Manager" };
    case "lie":
    case "unverified":
    case "hole":
    case "missed":
    case "lag":
    case "sequence":
    case "spread":
    case "risk":
      return { names: "Alvin", title: "Site Supervisor" };
    default:
      return { names: "Khairul", title: "Engineer / Manager" };
  }
}

export function signOffLines() {
  return SIGN_OFF.map((s) => `${s.role}: ${s.names} (${s.title})`).join("\n");
}

export function deskLines() {
  return CALL_DESK.map((c) => `- ${c.when} → ${c.ping} (${c.title})`).join("\n");
}
