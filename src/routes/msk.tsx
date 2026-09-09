import { createFileRoute } from "@tanstack/react-router";
import { Printer } from "lucide-react";
import { useMemo, useState } from "react";
import { SiteGate } from "@/components/site-gate";
import { Letterhead } from "@/components/letterhead";
import { Legend, cellTone } from "@/components/legend";
import { UpdateMskDialog, type MskCellTarget } from "@/components/update-msk-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  buildMskInsights,
  rankMskJobs,
  siteCrewGrouped,
  roundPct,
  type CellStatus,
  type MskItem,
  type MskLevel,
  type SiteSnapshot,
} from "@/lib/domain";
import { TRADE_LABEL, TRADE_WEIGHT } from "@/lib/msk-seed";
import { useAsOf } from "@/lib/as-of";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/msk")({ component: MskPage });

function MskPage() {
  return <SiteGate>{(site) => <MskBoard site={site} />}</SiteGate>;
}

function MskBoard({ site }: { site: SiteSnapshot }) {
  const { asOf } = useAsOf();
  const msk = buildMskInsights(site, asOf);
  const jobs = useMemo(() => rankMskJobs(msk), [msk]);
  const [trade, setTrade] = useState<"all" | "CW" | "SAN" | "IRR">("all");
  const [tower, setTower] = useState<"both" | "A" | "B">("both");
  const [target, setTarget] = useState<MskCellTarget | null>(null);
  const defaultFloor = jobs[0]?.level.id ?? site.mskLevels[site.mskLevels.length - 1]?.id ?? 0;
  const [floorId, setFloorId] = useState(defaultFloor);

  const items = useMemo(
    () => (trade === "all" ? site.mskItems : site.mskItems.filter((i) => i.trade === trade)),
    [site.mskItems, trade],
  );
  const towers = tower === "both" ? (["A", "B"] as const) : ([tower] as const);
  const siteCrew = siteCrewGrouped(site.crew).all;
  const floor = site.mskLevels.find((l) => l.id === floorId) ?? site.mskLevels[0];

  function openCell(level: MskLevel, tw: "A" | "B", item: MskItem) {
    const c = msk.cell(level.id, tw, item.id);
    const pending = msk.pendingByCell.get(`${level.id}:${tw}:${item.id}`);
    setTarget({
      level,
      tower: tw,
      item,
      pct: pending?.claimedPct ?? (c && !c.na ? c.pct : 0),
      na: c?.na ?? false,
    });
  }

  return (
    <div className="space-y-4">
      <div className="no-print flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold uppercase tracking-wide">MSK board</h1>
          <p className="mt-1 max-w-xl text-sm text-ink-soft">
            Tap a cell — even 0% or the dash. Type any %. A ring is a sub update waiting GM check.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(["all", "CW", "SAN", "IRR"] as const).map((t) => (
            <Button
              key={t}
              size="sm"
              variant={trade === t ? "default" : "outline"}
              onClick={() => setTrade(t)}
            >
              {t === "all" ? "All packages" : TRADE_LABEL[t]}
            </Button>
          ))}
          <Button size="sm" variant="outline" onClick={() => window.print()}>
            <Printer /> Print
          </Button>
        </div>
      </div>

      <div className="no-print grid gap-2 sm:grid-cols-4">
        <LockCard label="MSK lock" value={msk.weightedAvg} hint="Same as Today · from cells" />
        <LockCard label="Cold water" value={msk.tradeAvg.CW} hint={`${roundPct(TRADE_WEIGHT.CW * 100)}% of board`} />
        <LockCard label="Sanitary" value={msk.tradeAvg.SAN} hint={`${roundPct(TRADE_WEIGHT.SAN * 100)}% of board`} />
        <LockCard label="Irrigation" value={msk.tradeAvg.IRR} hint={`${roundPct(TRADE_WEIGHT.IRR * 100)}% of board`} />
      </div>

      <div className="no-print flex flex-wrap items-center gap-2">
        <Legend />
        <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] text-muted">
          <span className="size-3 rounded-[2px] bg-paper-2 outline outline-1 outline-line" /> N/A · still tappable
        </span>
        <div className="ml-auto flex gap-1">
          {(["both", "A", "B"] as const).map((t) => (
            <Button
              key={t}
              size="sm"
              variant={tower === t ? "default" : "outline"}
              onClick={() => setTower(t)}
            >
              {t === "both" ? "TA + TB" : `Tower ${t}`}
            </Button>
          ))}
        </div>
      </div>

      {floor ? (
        <section className="no-print rounded-xl bg-panel p-4 shadow-docket md:hidden">
          <p className="font-display text-[11px] uppercase tracking-[0.16em] text-muted">Update one floor</p>
          <div className="-mx-1 mt-2 flex gap-1.5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
            {[...site.mskLevels].reverse().map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => setFloorId(l.id)}
                className={cn(
                  "h-12 min-w-14 shrink-0 snap-start rounded-md border px-3 font-display text-sm uppercase",
                  l.id === floor.id ? "border-ink bg-ink text-paper" : "border-line bg-paper-2",
                )}
              >
                {l.code}
              </button>
            ))}
          </div>
          <ul className="mt-3 divide-y divide-line">
            {items.map((item) => (
              <li key={item.id} className="grid grid-cols-[1fr_auto_auto] items-center gap-2 py-2">
                <div>
                  <p className="text-sm font-medium">{item.shortName}</p>
                  <p className="text-[11px] uppercase text-muted">{item.trade}</p>
                </div>
                {towers.map((tw) => {
                  const c = msk.cell(floor.id, tw, item.id);
                  const na = !c || c.na;
                  const pending = msk.pendingByCell.get(`${floor.id}:${tw}:${item.id}`);
                  const st = msk.statusOf(floor, tw, item) as CellStatus | "na";
                  return (
                    <button
                      key={tw}
                      type="button"
                      onClick={() => openCell(floor, tw, item)}
                      className={cn(
                        "flex h-14 min-w-[4.5rem] flex-col items-center justify-center rounded-md px-3 font-mono text-sm tabular-nums",
                        na ? "border border-line bg-paper-2 text-muted" : cellTone(st === "na" ? "track" : st),
                        pending && "ring-2 ring-stamp",
                      )}
                    >
                      <span className="text-[10px] uppercase">T{tw}</span>
                      {na ? "—" : `${c.pct}%`}
                    </button>
                  );
                })}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="print-sheet hidden overflow-hidden rounded-xl bg-panel shadow-docket md:block print:block">
        <div className="hidden print-only border-b border-ink bg-sheet px-4 py-3">
          <Letterhead asOf={asOf} />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-[920px] w-full border-collapse text-[11px]">
            <thead>
              <tr className="bg-ink text-paper">
                <th className="sticky left-0 z-10 bg-ink px-2 py-2 text-left font-display uppercase">Level</th>
                <th className="sticky left-12 z-10 bg-ink px-2 py-2 text-left font-display uppercase">Tw</th>
                {items.map((item) => (
                  <th key={item.id} className="w-12 px-0.5 py-2 text-center font-display font-medium leading-tight">
                    <span className="block text-[8px] text-paper/60">{item.trade}</span>
                    <span className="block text-[10px]">{item.shortName}</span>
                  </th>
                ))}
                <th className="px-2 py-2 font-display uppercase">Lock</th>
              </tr>
            </thead>
            <tbody>
              {[...site.mskLevels].reverse().flatMap((level) =>
                towers.map((tw) => {
                  const vals = items
                    .map((item) => msk.cell(level.id, tw, item.id))
                    .filter((c) => c && !c.na)
                    .map((c) => c!.pct);
                  const lock = roundPct(vals.length ? vals.reduce((s, n) => s + n, 0) / vals.length : 0);
                  return (
                    <tr key={`${level.id}-${tw}`} className="border-b border-line">
                      <td className="sticky left-0 z-10 bg-panel px-2 py-1 font-display text-xs uppercase">
                        {level.code}
                      </td>
                      <td className="sticky left-12 z-10 bg-panel px-2 py-1 text-[10px] text-muted">T{tw}</td>
                      {items.map((item) => {
                        const c = msk.cell(level.id, tw, item.id);
                        const na = !c || c.na;
                        const pending = msk.pendingByCell.get(`${level.id}:${tw}:${item.id}`);
                        const st = msk.statusOf(level, tw, item) as CellStatus | "na";
                        const tone = na ? "bg-paper-2 text-muted" : cellTone(st === "na" ? "track" : st);
                        return (
                          <td key={item.id} className="p-0">
                            <button
                              type="button"
                              onClick={() => openCell(level, tw, item)}
                              className={cn(
                                "relative flex min-h-11 w-full items-center justify-center font-mono text-[11px] tabular-nums",
                                tone,
                                pending && "ring-2 ring-inset ring-stamp",
                              )}
                              title={
                                pending
                                  ? `Board ${c?.pct ?? 0}% · sub ${pending.claimedPct}% waiting GM check`
                                  : na
                                    ? "N/A on the sheet — tap to put a % on the lock"
                                    : undefined
                              }
                            >
                              {na ? "—" : c?.pct}
                            </button>
                          </td>
                        );
                      })}
                      <td className="px-2 text-center font-mono text-xs tabular-nums">{lock}%</td>
                    </tr>
                  );
                }),
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="no-print grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-panel p-4 shadow-docket">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg uppercase">Holes</h2>
            <Badge tone="miss">{jobs.filter((j) => j.kind === "hole").length}</Badge>
          </div>
          <p className="mt-1 text-xs text-muted">Live skipped floor per package. Tap to update.</p>
          <ul className="mt-2 divide-y divide-line">
            {jobs
              .filter((j) => j.kind === "hole")
              .slice(0, 8)
              .map((h) => (
                <li key={`${h.level.id}-${h.tower}-${h.item.id}`}>
                  <button
                    type="button"
                    onClick={() => openCell(h.level, h.tower, h.item)}
                    className="flex min-h-11 w-full items-center gap-2 py-1.5 text-left text-sm"
                  >
                    <span className="font-display uppercase">{h.level.code}</span>
                    <span className="text-muted">T{h.tower}</span>
                    <span className="min-w-0 flex-1 truncate">{h.item.shortName}</span>
                    <span className="font-mono text-xs">{h.pct}%</span>
                  </button>
                </li>
              ))}
            {jobs.filter((j) => j.kind === "hole").length === 0 ? <li className="py-2 text-sm text-muted">No skipped floors.</li> : null}
          </ul>
        </div>
        <div className="rounded-xl bg-panel p-4 shadow-docket">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg uppercase">What to expect</h2>
            <Badge tone="risk">{jobs.filter((n) => n.kind === "next").length}</Badge>
          </div>
          <p className="mt-1 text-xs text-muted">Floor below is ready. Tap to start.</p>
          <ul className="mt-2 divide-y divide-line">
            {jobs
              .filter((n) => n.kind === "next")
              .slice(0, 8)
              .map((n) => (
                <li key={`${n.level.id}-${n.tower}-${n.item.id}`}>
                  <button
                    type="button"
                    onClick={() => openCell(n.level, n.tower, n.item)}
                    className="flex min-h-11 w-full items-center gap-2 py-1.5 text-left text-sm"
                  >
                    <span className="font-display uppercase">{n.level.code}</span>
                    <span className="text-muted">T{n.tower}</span>
                    <span className="min-w-0 flex-1 truncate">{n.item.shortName}</span>
                    <span className="font-mono text-xs">{n.pct}%</span>
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <UpdateMskDialog
        open={!!target}
        onOpenChange={(v) => !v && setTarget(null)}
        target={target}
        crew={siteCrew}
      />
    </div>
  );
}

function LockCard({ label, value, hint }: { label: string; value: number; hint: string }) {
  return (
    <div className="rounded-xl bg-panel px-4 py-3 shadow-docket">
      <p className="font-display text-[11px] uppercase tracking-[0.14em] text-muted">{label}</p>
      <p className="font-display text-2xl font-semibold tabular-nums">{value}%</p>
      <p className="text-[11px] text-muted">{hint}</p>
    </div>
  );
}
