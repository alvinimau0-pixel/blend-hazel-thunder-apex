import { createFileRoute } from "@tanstack/react-router";
import { Letterhead } from "@/components/letterhead";
import { SignOff } from "@/components/sign-off";
import { Badge } from "@/components/ui/badge";
import { CALL_DESK, COMPANY, PEOPLE } from "@/lib/company";
import { useAsOf } from "@/lib/as-of";

export const Route = createFileRoute("/office")({ component: OfficePage });

const GROUPS = [
  { id: "lead", label: "Leadership", ids: ["james", "ahfat", "khairul"] },
  { id: "site", label: "Site desk", ids: ["alvin"] },
  { id: "office", label: "Office desk", ids: ["zilla", "farah", "jenny"] },
] as const;

function OfficePage() {
  const { asOf } = useAsOf();
  const byId = new Map(PEOPLE.map((p) => [p.id, p]));
  return (
    <div className="space-y-5">
      <section className="print-sheet overflow-hidden rounded-xl bg-panel shadow-docket">
        <div className="border-b border-ink bg-sheet px-5 py-4 sm:px-7">
          <Letterhead asOf={asOf} />
        </div>
        <div className="p-5 sm:p-7">
          <p className="font-display text-[11px] uppercase tracking-[0.2em] text-muted">
            Internal · {COMPANY.project}
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold uppercase tracking-wide">
            Gelaran Maju desk
          </h1>
          <p className="mt-2 max-w-xl text-sm text-ink-soft">
            Who signs the brief, who walks the board, and who to ping when a floor is skipped or a
            claim is stuck.
          </p>
        </div>
      </section>

      <section className="grid gap-3 lg:grid-cols-3">
        {GROUPS.map((group) => (
          <div key={group.id} className="rounded-xl bg-panel p-5 shadow-docket">
            <p className="font-display text-[11px] uppercase tracking-[0.16em] text-muted">
              {group.label}
            </p>
            <ul className="mt-3 divide-y divide-line">
              {group.ids.map((id) => {
                const p = byId.get(id);
                if (!p) return null;
                return (
                  <li key={p.id} className="py-2.5">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="font-display text-lg font-semibold uppercase tracking-wide">
                        {p.name}
                      </p>
                      <Badge>{p.title}</Badge>
                    </div>
                    <p className="text-[12px] text-ink-soft">{p.handles}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </section>

      <section className="rounded-xl bg-panel p-5 shadow-docket sm:p-7">
        <h2 className="font-display text-xl uppercase tracking-wide">Who to ping</h2>
        <ul className="mt-3 divide-y divide-line">
          {CALL_DESK.map((row) => (
            <li
              key={row.when}
              className="flex flex-col gap-0.5 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
            >
              <p className="text-sm text-ink-soft">{row.when}</p>
              <p className="shrink-0 font-display text-sm font-semibold uppercase tracking-wide">
                {row.ping}
                <span className="ml-2 font-sans text-[11px] font-normal normal-case tracking-normal text-muted">
                  {row.title}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="print-sheet rounded-xl bg-panel p-5 shadow-docket sm:p-7">
        <SignOff />
        <p className="mt-4 text-[11px] uppercase tracking-[0.14em] text-muted">
          {COMPANY.legal} · {COMPANY.registration} · The Capitol MSK
        </p>
      </section>
    </div>
  );
}
