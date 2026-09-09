import { ARYAN_GAJI, buildAryanGaji } from "@/lib/aryan";
import { REPORT_DATE } from "@/lib/company";
import { formatRm, type SiteSnapshot } from "@/lib/domain";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Letterhead } from "@/components/letterhead";

export function AryanGaji({ site }: { site: SiteSnapshot }) {
  const gaji = buildAryanGaji(site);

  return (
    <section className="print-sheet space-y-4 rounded-xl bg-panel p-4 shadow-docket sm:p-5">
      <div className="mb-3 hidden print-only">
        <Letterhead asOf={REPORT_DATE} />
      </div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-display text-[11px] uppercase tracking-[0.16em] text-muted">
            Sub gaji · {ARYAN_GAJI.sheetName} · RM {ARYAN_GAJI.ratePerMeter}/m
          </p>
          <h2 className="mt-1 font-display text-2xl uppercase tracking-wide">Aryan</h2>
          <p className="mt-1 max-w-md text-sm text-ink-soft">
            {ARYAN_GAJI.title}. Fittings RM {ARYAN_GAJI.fittingEach} each. Pay the board, not the sheet DONE ticks.
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="font-display text-4xl font-semibold tabular-nums whitespace-nowrap">
            {formatRm(gaji.earned)}
            <span className="text-lg text-muted"> RM</span>
          </p>
          <p className="text-[12px] text-muted">
            of RM {formatRm(gaji.labourTotal)} · {gaji.pct}%
          </p>
          <Button size="sm" variant="outline" className="mt-2 no-print" onClick={() => window.print()}>
            Print
          </Button>
        </div>
      </div>

      {gaji.clashCount > 0 ? (
        <p className="rounded-lg bg-stamp/10 px-3 py-2 text-sm text-stamp">
          Sheet ticks L13–L21 both towers. Board is lower on {gaji.clashCount} floors — those floors are not paid.
        </p>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2">
        {gaji.towers.map((tw) => (
          <article key={tw.tower} className="rounded-lg bg-paper-2 p-3">
            <div className="flex items-baseline justify-between gap-2">
              <p className="font-display text-sm uppercase tracking-wide">Tower {tw.tower}</p>
              <Badge tone={tw.earned >= tw.labourTotal ? "done" : tw.earned > 0 ? "risk" : "track"}>
                {tw.doneFloors}/{tw.floorCount}
              </Badge>
            </div>
            <p className="mt-2 font-display text-xl font-semibold tabular-nums">
              RM {formatRm(tw.earned)}
              <span className="text-sm font-normal text-muted"> / {formatRm(tw.labourTotal)}</span>
            </p>
            <ul className="mt-3 space-y-1">
              {tw.cells.map((c) => (
                <li key={c.level} className="grid grid-cols-[2.2rem_1fr_auto_2.6rem] items-center gap-1">
                  <span className="font-display text-[11px] uppercase">{c.level}</span>
                  <span className="truncate text-[11px] text-muted">
                    {c.meters}m · RM {formatRm(c.pipe)}
                    {c.fittings ? ` + ${c.fittingNote}` : ""}
                  </span>
                  <FloorPct pct={c.pct} clash={c.clash} />
                  <span className="text-right font-mono text-[11px] tabular-nums">{formatRm(c.earned)}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <p className="text-[12px] text-ink-soft">
        TA & TB L13–31M. L31M has no metres on the gaji sheet. Roof-top row on the old sheet is the TA subtotal, not roof piping. L13 +2 elbow RM 300. L14 +elbow / check valve RM 300.
      </p>
    </section>
  );
}

function FloorPct({ pct, clash }: { pct: number; clash?: boolean }) {
  const tone = clash ? "miss" : pct >= 100 ? "done" : pct > 0 ? "risk" : "track";
  return (
    <span
      className={cn(
        "flex h-7 min-w-10 items-center justify-center rounded-sm font-mono text-[11px] tabular-nums",
        tone === "done" && "bg-cell-done text-cell-done-ink",
        tone === "risk" && "bg-cell-risk text-cell-risk-ink",
        tone === "miss" && "bg-cell-miss text-cell-miss-ink",
        tone === "track" && "border border-line bg-panel text-muted",
      )}
    >
      {pct}%
    </span>
  );
}
