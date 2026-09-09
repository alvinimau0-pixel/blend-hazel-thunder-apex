import { createFileRoute } from "@tanstack/react-router";
import { SiteGate } from "@/components/site-gate";
import { Badge } from "@/components/ui/badge";
import {
  buildInsights,
  buildMskInsights,
  cellStatus,
  daysBetween,
  type SiteSnapshot,
} from "@/lib/domain";
import { TRADE_LABEL } from "@/lib/msk-seed";
import { useAsOf } from "@/lib/as-of";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/plan")({ component: PlanPage });

function PlanPage() {
  return <SiteGate>{(site) => <Plan site={site} />}</SiteGate>;
}

function Plan({ site }: { site: SiteSnapshot }) {
  const { asOf } = useAsOf();
  const ins = buildInsights(site, asOf);
  const msk = buildMskInsights(site, asOf);

  const week = [];
  for (let d = 0; d <= 7; d++) {
    const dt = new Date(`${asOf}T00:00:00Z`);
    dt.setUTCDate(dt.getUTCDate() + d);
    week.push(dt.toISOString().slice(0, 10));
  }

  const dueThisWeek: {
    date: string;
    floor: string;
    toilet: string;
    name: string;
    contractor: string;
    pct: number;
    status: ReturnType<typeof cellStatus>;
  }[] = [];

  for (const floor of site.floors) {
    for (const toilet of site.toilets) {
      for (const act of site.activities) {
        const dueOn = ins.due.get(`${floor.id}:${act.id}`) ?? asOf;
        if (!week.includes(dueOn)) continue;
        if (!act.gmTrade) continue;
        const pct = ins.getPct(floor.id, toilet.id, act.id);
        if (pct >= 100) continue;
        dueThisWeek.push({
          date: dueOn,
          floor: floor.code,
          toilet: toilet.code,
          name: act.name,
          contractor: act.contractor,
          pct,
          status: cellStatus(pct, dueOn, asOf),
        });
      }
    }
  }
  dueThisWeek.sort((a, b) => a.date.localeCompare(b.date) || a.floor.localeCompare(b.floor));

  const forecasts = ins.gmFloorAvgs.map(({ floor, avg }) => {
    const remaining = 100 - avg;
    const days = remaining <= 0 ? 0 : Math.ceil(remaining / 2.4);
    const eta = new Date(`${asOf}T00:00:00Z`);
    eta.setUTCDate(eta.getUTCDate() + days);
    return { floor, avg, remaining, days, eta: eta.toISOString().slice(0, 10) };
  });

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-3xl font-semibold uppercase tracking-wide">GM plan</h1>
        <p className="mt-1 max-w-xl text-sm text-ink-soft">
          Where the MSK wave sits, which floors are next, and the toilet fitting datelines for the
          next week.
        </p>
      </div>

      <section className="rounded-xl bg-panel p-5 shadow-docket">
        <h2 className="font-display text-xl uppercase tracking-wide">MSK wave front</h2>
        <p className="mt-1 text-xs text-muted">
          Highest floor that already has progress, per package. Work below a hole is a lie or a skip.
        </p>
        <ul className="mt-3 divide-y divide-line">
          {msk.wave.map(({ item, fronts }) => (
            <li key={item.id} className="flex flex-wrap items-center gap-2 py-2">
              <span className="w-20 font-display text-[11px] uppercase text-muted">{TRADE_LABEL[item.trade]}</span>
              <span className="min-w-0 flex-1 text-sm">{item.shortName}</span>
              {fronts.map((f) => (
                <span key={f.tower} className="font-mono text-xs tabular-nums">
                  T{f.tower} {f.front?.code ?? "—"}
                </span>
              ))}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl bg-panel p-5 shadow-docket">
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-display text-xl uppercase tracking-wide">Next honest starts</h2>
          <Badge tone="risk">{msk.nextInLine.filter((n) => n.pct === 0).length}</Badge>
        </div>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {msk.nextInLine
            .filter((n) => n.pct === 0)
            .slice(0, 12)
            .map((n) => (
              <li key={`${n.level.id}-${n.tower}-${n.item.id}`} className="rounded-lg bg-paper-2 px-3 py-2 text-sm">
                <p className="font-medium">
                  {n.level.code} T{n.tower} · {n.item.shortName}
                </p>
                <p className="text-[11px] uppercase tracking-wider text-muted">{TRADE_LABEL[n.item.trade]}</p>
              </li>
            ))}
        </ul>
      </section>

      <section className="rounded-xl bg-panel p-5 shadow-docket">
        <h2 className="font-display text-xl uppercase tracking-wide">Toilet floor lock forecast</h2>
        <p className="mt-1 text-xs text-muted">
          Section 1 only — sanitary piping, concealed piping and fittings.
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {forecasts.map((f) => (
            <div key={f.floor.id} className="rounded-lg bg-paper-2 px-3 py-3">
              <div className="flex items-baseline justify-between">
                <p className="font-display text-lg uppercase">{f.floor.code}</p>
                <p className="font-mono text-sm tabular-nums">{f.avg}%</p>
              </div>
              <p className="mt-1 text-sm text-ink-soft">
                {f.remaining === 0 ? "Locked" : `Lock ~ ${f.eta} · ${f.days}d`}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl bg-panel p-5 shadow-docket">
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-display text-xl uppercase tracking-wide">Next 7 days · toilet GM</h2>
          <Badge>{dueThisWeek.length} open</Badge>
        </div>
        <ul className="mt-3 divide-y divide-line">
          {dueThisWeek.slice(0, 24).map((row, i) => (
            <li key={`${row.floor}-${row.toilet}-${row.name}-${i}`} className="flex items-center gap-3 py-2">
              <span
                className={cn(
                  "w-16 shrink-0 font-mono text-[11px] tabular-nums",
                  row.status === "missed" && "text-cell-miss-ink",
                  row.status === "risk" && "text-cell-risk-ink",
                )}
              >
                {row.date.slice(5)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm">
                  {row.floor} {row.toilet} · {row.name}
                </p>
                <p className="text-[11px] uppercase tracking-wider text-muted">{row.contractor}</p>
              </div>
              <span className="font-mono text-xs tabular-nums">{row.pct}%</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl bg-panel p-5 shadow-docket">
        <h2 className="font-display text-xl uppercase tracking-wide">Held by others</h2>
        <p className="mt-1 text-xs text-muted">
          Sanitary fittings wait on tiles and vanity. If those are not 80%, we cannot honestly finish.
        </p>
        {ins.waitingOn.length === 0 ? (
          <p className="mt-3 text-sm text-ink-soft">No other-trade holds on GM work right now.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {ins.waitingOn.slice(0, 12).map((row) => (
              <li
                key={`${row.floor.id}-${row.toilet.id}-${row.activity.id}-${row.blockedBy.id}`}
                className="rounded-lg bg-cell-risk/50 px-3 py-2 text-sm"
              >
                <p className="font-medium">
                  {row.floor.code} {row.toilet.code} · {row.activity.name}
                </p>
                <p className="text-xs text-ink-soft">
                  Waiting on {row.blockedBy.contractor} · {row.blockedBy.name} {row.blockedPct}%
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <p className="text-xs text-muted">
        Looking {daysBetween(asOf, week[7] ?? asOf)} days ahead from the report date.
      </p>
    </div>
  );
}
