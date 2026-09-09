import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteGate } from "@/components/site-gate";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buildMskInsights, claimPct, formatRm, type SiteSnapshot } from "@/lib/domain";
import { BUILDING_STACK, CLAIM, FLOOR_PLANS, SECTION_PLAN } from "@/lib/msk-seed";
import { useAsOf } from "@/lib/as-of";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/building")({ component: BuildingPage });

function BuildingPage() {
  return <SiteGate>{(site) => <Building site={site} />}</SiteGate>;
}

function Building({ site }: { site: SiteSnapshot }) {
  const { asOf } = useAsOf();
  const msk = buildMskInsights(site, asOf);
  const [plan, setPlan] = useState<(typeof FLOOR_PLANS)[number]["code"] | "section">("section");
  const lockByCode = useMemo(() => {
    const map = new Map<string, { A: number; B: number; avg: number }>();
    for (const row of msk.levelRows) map.set(row.level.code, row);
    return map;
  }, [msk.levelRows]);

  const active = plan === "section" ? SECTION_PLAN : FLOOR_PLANS.find((p) => p.code === plan);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-3xl font-semibold uppercase tracking-wide">Capitol stack</h1>
        <p className="mt-1 max-w-xl text-sm text-ink-soft">
          B4 plant to helipad. Podium is claimed complete on PC36. Towers follow the 27 Aug MSK
          sheet. Open a plan to see lots and plant rooms.
        </p>
      </div>

      <section className="rounded-xl bg-panel p-4 shadow-docket">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="font-display text-[11px] uppercase tracking-[0.16em] text-muted">
              Progress claim {CLAIM.no} · 25 Jul 2026
            </p>
            <p className="font-display text-2xl font-semibold tabular-nums">
              {claimPct(CLAIM.workDone, CLAIM.contract)}%
              <span className="ml-2 text-sm font-normal text-muted">
                RM {formatRm(CLAIM.workDone)} of {formatRm(CLAIM.contract)}
              </span>
            </p>
          </div>
          <p className="text-xs text-muted">
            This claim RM {formatRm(CLAIM.thisClaim)} · VO extra RM {formatRm(CLAIM.voWorkDone)}
          </p>
        </div>
        <ul className="mt-4 grid gap-1.5 sm:grid-cols-2">
          {CLAIM.lines.map((line) => {
            const pct = claimPct(line.work, line.contract);
            return (
              <li key={line.code} className="flex items-center gap-2">
                <span className="w-10 font-mono text-[10px] text-muted">{line.code}</span>
                <span className="min-w-0 flex-1 truncate text-sm">{line.name}</span>
                <span className="font-mono text-xs tabular-nums">{pct}%</span>
                <span className="hidden w-24 sm:block">
                  <span className="block h-1.5 overflow-hidden rounded-full bg-paper-2">
                    <span
                      className={cn("block h-full rounded-full", pct >= 100 ? "bg-cell-done-ink" : "bg-accent")}
                      style={{ width: `${Math.min(pct, 100)}%` }}
                    />
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,20rem)_1fr]">
        <section className="rounded-xl bg-panel p-3 shadow-docket">
          <p className="px-1 font-display text-[11px] uppercase tracking-[0.16em] text-muted">
            Section · high zone / low zone / podium
          </p>
          <ol className="mt-2">
            {BUILDING_STACK.map((fl) => {
              const lock = lockByCode.get(fl.code);
              const pct = fl.gm === "podium" ? 100 : fl.gm === "plant" && !lock ? null : lock?.avg ?? null;
              const tone =
                pct == null ? "bg-paper-2" : pct >= 80 ? "bg-cell-done" : pct >= 40 ? "bg-cell-risk" : "bg-cell-miss";
              const planCode = FLOOR_PLANS.some((p) => p.code === fl.code) ? fl.code : null;
              return (
                <li key={fl.code}>
                  <button
                    type="button"
                    onClick={() => {
                      if (planCode) setPlan(planCode as (typeof FLOOR_PLANS)[number]["code"]);
                    }}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-md px-1.5 py-1 text-left hover:bg-paper-2",
                      plan === fl.code && "bg-paper-2",
                    )}
                  >
                    <span className={cn("h-5 w-1.5 shrink-0 rounded-sm", tone)} />
                    <span className="w-12 font-display text-xs uppercase">{fl.code}</span>
                    <span className="min-w-0 flex-1 truncate text-[11px] text-muted">{fl.label}</span>
                    {lock ? (
                      <span className="font-mono text-[10px] tabular-nums text-ink-soft">
                        A{lock.A} B{lock.B}
                      </span>
                    ) : pct != null ? (
                      <span className="font-mono text-[10px] tabular-nums text-ink-soft">{pct}%</span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ol>
        </section>

        <section className="space-y-3">
          <div className="flex flex-wrap gap-1.5">
            <Button size="sm" variant={plan === "section" ? "default" : "outline"} onClick={() => setPlan("section")}>
              Section
            </Button>
            {FLOOR_PLANS.map((p) => (
              <Button
                key={p.code}
                size="sm"
                variant={plan === p.code ? "default" : "outline"}
                onClick={() => setPlan(p.code)}
              >
                {p.code}
              </Button>
            ))}
            <Link to="/msk" className="ml-auto">
              <Button size="sm" variant="outline">
                Open MSK
              </Button>
            </Link>
          </div>
          {active ? (
            <figure className="overflow-hidden rounded-xl bg-panel shadow-docket">
              <img
                src={active.src}
                alt={active.title}
                className="mx-auto max-h-[70vh] w-full object-contain bg-paper"
              />
              <figcaption className="border-t border-line px-4 py-2 text-xs uppercase tracking-[0.12em] text-muted">
                {active.title}
              </figcaption>
            </figure>
          ) : null}
          <div className="rounded-xl bg-panel p-4 shadow-docket">
            <h2 className="font-display text-lg uppercase">Where the problems sit</h2>
            <ul className="mt-2 space-y-1.5 text-sm">
              <li>
                <Badge tone="miss">Hole</Badge>
                <span className="ml-2">L20 Tower B sanitary toilets — L21–25 already 100%.</span>
              </li>
              <li>
                <Badge tone="miss">Hole</Badge>
                <span className="ml-2">L26 Tower B sanitary toilets — L27–28 already 25%.</span>
              </li>
              <li>
                <Badge tone="risk">Lag</Badge>
                <span className="ml-2">Transfer pump pipes: TA stalled at L14 (10%), TB 50% through L19.</span>
              </li>
              <li>
                <Badge tone="risk">Next</Badge>
                <span className="ml-2">CW tenant stops at L29. L30–31 not started. Roof pumps L31 90% / 31M 0%.</span>
              </li>
              <li>
                <Badge>Podium</Badge>
                <span className="ml-2">B4–L12 claimed 100% on PC36 (25 Jul). Physical check is still your call.</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
