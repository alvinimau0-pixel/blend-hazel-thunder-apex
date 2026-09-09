import { TRADE_LABEL } from "@/lib/msk-seed";
import { buildMskInsights } from "@/lib/domain";
import { cn } from "@/lib/utils";

type Msk = ReturnType<typeof buildMskInsights>;

export function LockStrip({ msk, compact = false }: { msk: Msk; compact?: boolean }) {
  return (
    <section className="rounded-xl bg-panel p-4 shadow-docket sm:p-5">
      <p className="font-display text-[11px] uppercase tracking-[0.2em] text-muted">Tower lock · L13–31M</p>
      <div className="mt-1 flex flex-wrap items-end justify-between gap-3">
        <p className={cn("font-display font-semibold uppercase tracking-wide tabular-nums", compact ? "text-4xl" : "text-5xl")}>
          {msk.weightedAvg}
          <span className="text-xl text-muted">%</span>
        </p>
        <p className="max-w-xs text-xs text-ink-soft">
          Same number on Today, Board, and Khairul. From the MSK cells only — podium sits on the last client claim (PC36).
        </p>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <Trade label={TRADE_LABEL.CW} value={msk.tradeAvg.CW} />
        <Trade label={TRADE_LABEL.SAN} value={msk.tradeAvg.SAN} />
        <Trade label={TRADE_LABEL.IRR} value={msk.tradeAvg.IRR} />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <Bar label="Tower A" value={msk.towerAvg.A} />
        <Bar label="Tower B" value={msk.towerAvg.B} />
      </div>
    </section>
  );
}

function Trade({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg bg-paper-2 px-3 py-2">
      <p className="font-display text-[10px] uppercase tracking-[0.12em] text-muted">{label}</p>
      <p className="font-display text-xl font-semibold tabular-nums">{value}%</p>
    </div>
  );
}

function Bar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="font-display text-xs uppercase">{label}</p>
        <p className="font-mono text-xs tabular-nums">{value}%</p>
      </div>
      <div className="mt-1 h-2 overflow-hidden rounded-md bg-paper-2">
        <div
          className={cn(
            "bar-fill h-full",
            value >= 70 ? "bg-cell-done" : value >= 40 ? "bg-cell-risk" : "bg-cell-miss",
          )}
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </div>
    </div>
  );
}
