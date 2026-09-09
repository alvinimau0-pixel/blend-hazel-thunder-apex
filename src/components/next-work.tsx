import { useMemo, useState } from "react";
import { UpdateMskDialog, type MskCellTarget } from "@/components/update-msk-dialog";
import { EmptyInline } from "@/components/status-states";
import { Badge } from "@/components/ui/badge";
import {
  buildMskInsights,
  rankMskJobs,
  siteCrewGrouped,
  type SiteSnapshot,
} from "@/lib/domain";
import { useAsOf } from "@/lib/as-of";
import { cn } from "@/lib/utils";

export function NextWork({
  site,
  limit = 6,
  title = "Do next",
}: {
  site: SiteSnapshot;
  limit?: number;
  title?: string;
}) {
  const { asOf } = useAsOf();
  const msk = buildMskInsights(site, asOf);
  const jobs = useMemo(() => rankMskJobs(msk), [msk]);
  const [target, setTarget] = useState<MskCellTarget | null>(null);
  const shown = jobs.slice(0, limit);

  return (
    <section className="rounded-xl bg-panel p-4 shadow-docket sm:p-5">
      <div className="flex items-baseline justify-between gap-2">
        <h2 className="font-display text-xl uppercase tracking-wide">{title}</h2>
        <Badge tone={shown.some((j) => j.pct === 0) ? "miss" : "track"}>{shown.length}</Badge>
      </div>
      <p className="mt-1 text-[12px] text-muted">
        Only the live skipped floor per package — not every old 0%. Tap, type the %, save.
      </p>
      {shown.length === 0 ? (
        <EmptyInline title="On track" hint="No skipped floors. Next starts sit on the board." />
      ) : (
        <ul className="mt-3 divide-y divide-line">
          {shown.map((j) => (
            <li key={`${j.level.id}-${j.tower}-${j.item.id}`}>
              <button
                type="button"
                onClick={() => setTarget({ level: j.level, tower: j.tower, item: j.item, pct: j.pct })}
                className="flex min-h-12 w-full items-center gap-2 py-2 text-left transition-[background-color] duration-150 hover:bg-paper-2/70"
              >
                <span className="font-display text-sm uppercase">{j.level.code}</span>
                <span className="text-[12px] text-muted">T{j.tower}</span>
                <span className="min-w-0 flex-1 truncate text-sm">{j.item.shortName}</span>
                <span
                  className={cn(
                    "rounded-sm px-2 py-0.5 font-mono text-xs tabular-nums",
                    j.pct === 0 ? "bg-cell-miss text-cell-miss-ink" : "bg-cell-risk text-cell-risk-ink",
                  )}
                >
                  {j.pct}%
                </span>
              </button>
              <p className="-mt-1 pb-2 text-[11px] text-muted">{j.why}</p>
            </li>
          ))}
        </ul>
      )}
      <UpdateMskDialog
        open={!!target}
        onOpenChange={(v) => !v && setTarget(null)}
        target={target}
        crew={siteCrewGrouped(site.crew).all}
      />
    </section>
  );
}
