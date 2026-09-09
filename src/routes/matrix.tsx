import { createFileRoute } from "@tanstack/react-router";
import { Printer } from "lucide-react";
import { useMemo, useState } from "react";
import { SiteGate } from "@/components/site-gate";
import { Letterhead } from "@/components/letterhead";
import { Legend, cellTone } from "@/components/legend";
import { UpdateCellDialog, type CellTarget } from "@/components/update-cell-dialog";
import { Button } from "@/components/ui/button";
import { buildInsights, cellStatus, mean, roundPct, SHORT_NAME, type SiteSnapshot } from "@/lib/domain";
import { useAsOf } from "@/lib/as-of";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/matrix")({ component: MatrixPage });

function MatrixPage() {
  return <SiteGate>{(site) => <Matrix site={site} />}</SiteGate>;
}

function Matrix({ site }: { site: SiteSnapshot }) {
  const { asOf } = useAsOf();
  const ins = buildInsights(site, asOf);
  const [filter, setFilter] = useState<"all" | "open" | "gm">("gm");
  const [target, setTarget] = useState<CellTarget | null>(null);

  const acts = useMemo(() => {
    if (filter === "gm") return site.activities.filter((a) => a.gmTrade);
    return site.activities;
  }, [site.activities, filter]);

  return (
    <div className="space-y-4">
      <div className="no-print flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold uppercase tracking-wide">Toilet matrix</h1>
          <p className="mt-1 max-w-xl text-sm text-ink-soft">
            Section 1 — CL14–CL19, T4–T7. Gelaran Maju trades only by default. Open All trades if
            you need to see who is holding fittings.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(["all", "open", "gm"] as const).map((f) => (
            <Button
              key={f}
              size="sm"
              variant={filter === f ? "default" : "outline"}
              onClick={() => setFilter(f)}
            >
              {f === "all" ? "All trades" : f === "open" ? "Open only" : "GM only"}
            </Button>
          ))}
          <Button size="sm" variant="outline" onClick={() => window.print()}>
            <Printer /> Print
          </Button>
        </div>
      </div>
      <Legend className="no-print" />

      <div className="print-sheet overflow-hidden rounded-xl bg-panel shadow-docket">
        <div className="hidden print-only border-b border-ink bg-sheet px-4 py-3">
          <Letterhead asOf={asOf} />
        </div>
        <div className="overflow-x-auto">
          <table className={cn("border-collapse text-[11px]", filter === "gm" ? "w-full min-w-[640px]" : "min-w-[1100px]")}>
            <thead>
              <tr className="bg-ink text-paper">
                <th className="sticky left-0 z-10 bg-ink px-2 py-2 text-left font-display text-[11px] uppercase tracking-wider">
                  Floor
                </th>
                <th className="sticky left-12 z-10 bg-ink px-2 py-2 text-left font-display uppercase">Toilet</th>
                {acts.map((a) => (
                  <th key={a.id} className="w-11 px-0.5 py-2 text-center font-display font-medium leading-tight">
                    <span className="block text-[9px] text-paper/70">{a.seq}</span>
                    <span className="block text-[10px]">{SHORT_NAME[a.seq] ?? a.name}</span>
                    <span className="mt-0.5 block text-[8px] font-normal uppercase text-paper/60">{a.contractor}</span>
                  </th>
                ))}
                <th className="px-2 py-2 font-display uppercase">Lock</th>
              </tr>
            </thead>
            <tbody>
              {site.floors.map((floor) => {
                const dueFor = (activityId: number) =>
                  ins.due.get(`${floor.id}:${activityId}`) ?? asOf;
                return (
                  <FloorBlock
                    key={floor.id}
                    site={site}
                    floorId={floor.id}
                    floorCode={floor.code}
                    acts={acts}
                    asOf={asOf}
                    dueFor={dueFor}
                    getPct={ins.getPct}
                    filter={filter}
                    onCell={(t) => setTarget(t)}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <UpdateCellDialog
        open={!!target}
        onOpenChange={(v) => !v && setTarget(null)}
        target={target}
        crew={site.crew.filter((c) => (c.contractor === "GM" || c.contractor === "SUB") && c.active)}
        activities={site.activities}
        pctOf={(seq) => {
          if (!target) return 0;
          const act = site.activities.find((a) => a.seq === seq);
          return act ? ins.getPct(target.floor.id, target.toilet.id, act.id) : 0;
        }}
      />
    </div>
  );
}

function FloorBlock({
  site,
  floorId,
  floorCode,
  acts,
  asOf,
  dueFor,
  getPct,
  filter,
  onCell,
}: {
  site: SiteSnapshot;
  floorId: number;
  floorCode: string;
  acts: SiteSnapshot["activities"];
  asOf: string;
  dueFor: (activityId: number) => string;
  getPct: (floorId: number, toiletId: number, activityId: number) => number;
  filter: "all" | "open" | "gm";
  onCell: (t: CellTarget) => void;
}) {
  const floor = site.floors.find((f) => f.id === floorId)!
  const toilets = [...site.toilets].sort((a, b) => a.code.localeCompare(b.code));
  const tb = toilets.filter((t) => t.tower === "TB");
  const ta = toilets.filter((t) => t.tower === "TA");
  const ordered = [...tb, ...ta];

  const overall = acts.map((a) => roundPct(mean(ordered.map((t) => getPct(floorId, t.id, a.id)))));
  const lock = roundPct(mean(ordered.flatMap((t) => acts.map((a) => getPct(floorId, t.id, a.id)))));

  return (
    <>
      <tr className="bg-paper-2 text-[10px] uppercase tracking-wider text-muted">
        <td className="sticky left-0 bg-paper-2 px-2 py-1 font-display">{floorCode}</td>
        <td className="sticky left-12 bg-paper-2 px-2 py-1" colSpan={acts.length + 2}>
          Dateline
          <span className="ml-2 font-mono normal-case tracking-normal">
            {acts.map((a) => dueFor(a.id).slice(5)).join(" · ")}
          </span>
        </td>
      </tr>
      <tr>
        <td className="sticky left-0 bg-panel px-2 py-1 font-display text-xs uppercase">{floorCode}</td>
        <td className="sticky left-12 bg-panel px-2 py-1 font-semibold">OVERALL</td>
        {acts.map((a, i) => {
          const status = cellStatus(overall[i] ?? 0, dueFor(a.id), asOf);
          return (
            <td key={a.id} className={cn("px-1 py-1 text-center font-mono tabular-nums", cellTone(status))}>
              {overall[i]}%
            </td>
          );
        })}
        <td className="px-2 py-1 text-center font-display text-sm tabular-nums">{lock}%</td>
      </tr>
      {ordered.map((toilet) => (
        <tr key={toilet.id} className="border-t border-line/70">
          <td className="sticky left-0 bg-panel px-2 py-1 text-[10px] uppercase text-muted">{toilet.tower}</td>
          <td className="sticky left-12 bg-panel px-2 py-1 font-medium">{toilet.code}</td>
          {acts.map((activity) => {
            const pct = getPct(floorId, toilet.id, activity.id);
            const dueOn = dueFor(activity.id);
            const status = cellStatus(pct, dueOn, asOf);
            if (filter === "open" && status === "done") {
              return (
                <td key={activity.id} className="px-1 py-1 text-center font-mono text-line-strong">
                  —
                </td>
              );
            }
            return (
              <td key={activity.id} className="p-0">
                <button
                  type="button"
                  onClick={() =>
                    onCell({ floor, toilet, activity, pct, dueOn })
                  }
                  className={cn(
                    "flex h-9 w-full items-center justify-center font-mono text-[11px] tabular-nums",
                    cellTone(status),
                  )}
                >
                  {pct}%
                </button>
              </td>
            );
          })}
          <td className="px-2 py-1 text-center font-mono tabular-nums">
            {roundPct(mean(acts.map((a) => getPct(floorId, toilet.id, a.id))))}%
          </td>
        </tr>
      ))}
    </>
  );
}
