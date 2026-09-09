import { COMPANY, companyLine, SIGN_OFF } from "@/lib/company";
import { claimPct, formatRm, buildInsights, buildMskInsights } from "@/lib/domain";
import { CLAIM } from "@/lib/msk-seed";
import { formatStamp } from "@/lib/utils";
import type { DeskStats } from "@/lib/ops";

export const BOSSES = [
  { id: "khairul", name: "Khairul", title: "Engineer / Manager", line: "For approval" },
  { id: "alvin", name: "Alvin", title: "Site Supervisor", line: "Site desk" },
  { id: "ahfat", name: "Ah Fat", title: "Director", line: "For information" },
  { id: "james", name: "James Wong", title: "CEO", line: "For information" },
  { id: "zilla", name: "Zilla", title: "Purchaser", line: "Material" },
  { id: "farah", name: "Farah", title: "Documentation", line: "Papers" },
  { id: "jenny", name: "Jenny", title: "Accounts", line: "Claim / pay" },
] as const;

export type Boss = (typeof BOSSES)[number];

const CONTACT_KEY = "gm-boss-contacts";

export type BossContact = { phone: string; email: string };

export function loadBossContacts(): Record<string, BossContact> {
  try {
    const raw = localStorage.getItem(CONTACT_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, BossContact>;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function saveBossContact(id: string, contact: BossContact) {
  const all = loadBossContacts();
  all[id] = contact;
  localStorage.setItem(CONTACT_KEY, JSON.stringify(all));
}

export function waDigits(raw: string): string {
  const d = raw.replace(/\D/g, "");
  if (!d) return "";
  if (d.startsWith("60")) return d;
  if (d.startsWith("0")) return `60${d.slice(1)}`;
  return d;
}

type Ins = ReturnType<typeof buildInsights>;
type Msk = ReturnType<typeof buildMskInsights>;

export function hodPageUrl() {
  if (typeof window === "undefined") return "/hod";
  return `${window.location.origin}/hod`;
}

export function bossSubject(asOf: string, boss: Boss) {
  return `${COMPANY.short} · ${COMPANY.project} MSK · ${formatStamp(asOf)} · ${boss.line} ${boss.name}`;
}

export function bossBriefText(opts: {
  asOf: string;
  boss: Boss;
  ins: Ins;
  msk: Msk;
  stats: DeskStats | null;
}): string {
  const { asOf, boss, ins, msk, stats } = opts;
  const holes = msk.flags.filter((f) => f.kind === "hole").length;
  const waiting = ins.flags.filter((f) => f.kind === "waiting").length;
  const lies = [...ins.flags, ...msk.flags].filter((f) => f.kind === "lie").length;
  const unverified = ins.pendingByCell.size + msk.pendingByCell.size;
  const problems = [...msk.flags, ...ins.flags].slice(0, 6).map((f) => `- ${f.title}: ${f.detail}`);
  const sign = SIGN_OFF.map((s) => `${s.role}: ${s.names}`).join("\n");
  const claimLine = `PC${CLAIM.no} evaluation claim to client · certified ${formatStamp(CLAIM.date)} · RM ${formatRm(CLAIM.thisClaim)} (${claimPct(CLAIM.workDone, CLAIM.contract)}% lock)`;
  const extra = stats
    ? [
        stats.claimDraft ? `Next claim: ${stats.claimDraft} draft (Jenny)` : "",
        stats.poOpen ? `PO still open: ${stats.poOpen}` : "",
        stats.advancesOpen ? `Salary advance open: ${stats.advancesOpen}` : "",
      ].filter(Boolean)
    : [];

  return [
    companyLine().toUpperCase(),
    `${COMPANY.project} · MSK plumbing · ${COMPANY.towers}`,
    `As of ${formatStamp(asOf)}`,
    "",
    `ATTN: ${boss.name.toUpperCase()}  (${boss.title})`,
    boss.line,
    "",
    `TOWER LOCK L13–31M  ${msk.weightedAvg}%`,
    `Cold water ${msk.tradeAvg.CW}%  ·  Sanitary ${msk.tradeAvg.SAN}%  ·  Irrigation ${msk.tradeAvg.IRR}%`,
    `Tower A ${msk.towerAvg.A}%  ·  Tower B ${msk.towerAvg.B}%`,
    `Toilet fittings (section 1 only)  ${ins.gmSectionAvg}%`,
    "",
    claimLine,
    ...extra,
    "",
    "NEED YOUR EYE",
    `- Skipped floors: ${holes}`,
    `- Waiting on other trades: ${waiting}`,
    `- Sub updates waiting GM check: ${unverified}`,
    `- Truth flags (no photo / reversed): ${lies}`,
    "",
    "PROBLEMS",
    problems.length ? problems.join("\n") : "- None flagged on the GM board",
    "",
    sign,
    "",
    "Prepared by Gelaran Maju site desk. Photo truth-check on Today. Lock is from the board.",
  ]
    .filter((line) => line !== undefined)
    .join("\n");
}

export function bossSharePayload(opts: {
  asOf: string;
  boss: Boss;
  ins: Ins;
  msk: Msk;
  stats: DeskStats | null;
}) {
  const subject = bossSubject(opts.asOf, opts.boss);
  const site = hodPageUrl();
  const text = `${bossBriefText(opts)}\n\nOpen the website:\n${site}`;
  return { subject, text, site };
}
