import type { CrewMember } from "@/lib/domain";
import { siteCrewGrouped } from "@/lib/domain";
import { Label } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const JOB_SCOPES = [
  { id: "CW", label: "CW" },
  { id: "FW", label: "FW" },
  { id: "SAN", label: "SAN" },
  { id: "IRR", label: "IRR" },
  { id: "WELD", label: "Welding" },
  { id: "REPAIR", label: "Repair" },
] as const;

export type JobScope = (typeof JOB_SCOPES)[number]["id"];
export type CrewSide = "GM" | "SUB";

export function scopeFromTrade(trade: string, packageTrade?: string): JobScope {
  const pack = (packageTrade ?? "").toUpperCase();
  if (pack === "IRR") return "IRR";
  if (pack === "CW") return "CW";
  if (pack === "SAN") return "SAN";
  const t = trade.toLowerCase();
  if (/\birr|irrig/.test(t)) return "IRR";
  if (/weld/.test(t)) return "WELD";
  if (/repair|housekeep/.test(t)) return "REPAIR";
  if (/\bfw\b|fire water|floor.?waste/.test(t)) return "FW";
  if (/san|upvc|fitting|wares|tenant|outlet/.test(t)) return "SAN";
  if (/cw|ppr|sleeve|mainstack|stainless|\bss\b|piping|pipe/.test(t)) return "CW";
  return "SAN";
}

export function withScopeNote(note: string | undefined, scope: JobScope): string | undefined {
  const tag = JOB_SCOPES.find((s) => s.id === scope)?.label ?? scope;
  const body = (note ?? "").replace(/^(CW|FW|SAN|IRR|Welding|Repair)\s*·\s*/i, "").trim();
  if (!body) return tag;
  return `${tag} · ${body}`;
}

function selectClass(extra?: string) {
  return cn("mt-1 h-11 w-full rounded-md border border-line bg-panel px-3 text-sm", extra);
}

export function WhoDidThis({
  crew,
  crewId,
  onCrewId,
  scope,
  onScope,
  preferSubs = false,
  idPrefix = "who",
}: {
  crew: CrewMember[];
  crewId: number;
  onCrewId: (id: number) => void;
  scope: JobScope;
  onScope: (s: JobScope) => void;
  preferSubs?: boolean;
  idPrefix?: string;
}) {
  const grouped = siteCrewGrouped(crew);
  const who = crew.find((c) => c.id === crewId);
  const side: CrewSide = who?.contractor === "SUB" ? "SUB" : "GM";
  const listed = side === "SUB" ? grouped.subs : grouped.gm;
  const names = listed.length ? listed : grouped.all;

  function setSide(next: CrewSide) {
    const pool = next === "SUB" ? grouped.subs : grouped.gm;
    if (pool.some((c) => c.id === crewId)) return;
    const pick =
      (preferSubs && next === "SUB" && pool.find((c) => c.callsign === "Aipoon")) ||
      pool.find((c) => scopeFromTrade(c.trade) === scope) ||
      pool[0];
    if (pick) onCrewId(pick.id);
  }

  return (
    <div className="grid gap-3">
      <div>
        <Label htmlFor={`${idPrefix}-worker`}>Worker</Label>
        <select
          id={`${idPrefix}-worker`}
          value={names.some((c) => c.id === crewId) ? crewId : (names[0]?.id ?? 0)}
          onChange={(e) => onCrewId(Number(e.target.value))}
          className={selectClass()}
        >
          {names.map((c) => (
            <option key={c.id} value={c.id}>
              {c.callsign}
            </option>
          ))}
        </select>
      </div>
      <div>
        <p className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">GM or sub</p>
        <div className="mt-1 grid grid-cols-2 gap-1.5">
          {([
            { id: "GM" as const, label: "GM" },
            { id: "SUB" as const, label: "Sub under GM" },
          ]).map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setSide(opt.id)}
              className={cn(
                "min-h-11 rounded-md border text-sm uppercase tracking-[0.08em]",
                side === opt.id ? "border-ink bg-ink text-paper" : "border-line bg-panel hover:bg-paper-2",
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Job scope</p>
        <div className="mt-1 grid grid-cols-3 gap-1.5 sm:grid-cols-6">
          {JOB_SCOPES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => onScope(s.id)}
              className={cn(
                "min-h-11 rounded-md border px-1 text-sm",
                scope === s.id ? "border-ink bg-ink text-paper" : "border-line bg-panel hover:bg-paper-2",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
