import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Inbox } from "lucide-react";
import { useMemo, useState } from "react";
import { SiteGate } from "@/components/site-gate";
import { EmptyState } from "@/components/status-states";
import { UpdateMskDialog, type MskCellTarget } from "@/components/update-msk-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  buildInsights,
  buildMskInsights,
  findMskCell,
  siteCrewGrouped,
  towerFromFlag,
  type Flag,
  type SiteSnapshot,
} from "@/lib/domain";
import { useAsOf } from "@/lib/as-of";
import { pingForKind } from "@/lib/company";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/issues")({ component: IssuesPage });

function IssuesPage() {
  return <SiteGate>{(site) => <Issues site={site} />}</SiteGate>;
}

const KINDS = ["all", "hole", "lag", "lie", "missed", "risk", "waiting", "sequence", "unverified", "spread"] as const;

function Issues({ site }: { site: SiteSnapshot }) {
  const { asOf } = useAsOf();
  const ins = buildInsights(site, asOf);
  const msk = buildMskInsights(site, asOf);
  const [kind, setKind] = useState<(typeof KINDS)[number]>("all");
  const [board, setBoard] = useState<"all" | "msk" | "toilet">("all");
  const [target, setTarget] = useState<MskCellTarget | null>(null);

  const merged = useMemo(() => {
    const list = [...msk.flags, ...ins.flags];
    return list.filter((f) => {
      if (board !== "all" && (f.board ?? "toilet") !== board) return false;
      if (kind !== "all" && f.kind !== kind) return false;
      return true;
    });
  }, [ins.flags, msk.flags, kind, board]);

  const counts = Object.fromEntries(
    KINDS.map((k) => [
      k,
      k === "all"
        ? msk.flags.length + ins.flags.length
        : [...msk.flags, ...ins.flags].filter((f) => f.kind === k).length,
    ]),
  ) as Record<(typeof KINDS)[number], number>;

  const filtered = kind !== "all" || board !== "all";

  function openFlag(flag: Flag) {
    if (flag.board !== "msk" || flag.activitySeq == null) return;
    const cell = findMskCell(site, flag.floorCode, towerFromFlag(flag.toiletCode), flag.activitySeq);
    if (cell) setTarget(cell);
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-3xl font-semibold uppercase tracking-wide">Problems</h1>
        <p className="mt-1 max-w-xl text-sm text-ink-soft">
          Tap an MSK row to type the new %. Problems list the live skipped floor per package, not every old 0%.
        </p>
      </div>

      <div className="chip-scroll sm:flex-wrap sm:overflow-visible">
        {(["all", "msk", "toilet"] as const).map((b) => (
          <Button key={b} size="sm" variant={board === b ? "default" : "outline"} onClick={() => setBoard(b)}>
            {b === "all" ? "Both boards" : b === "msk" ? "MSK" : "Toilets"}
          </Button>
        ))}
      </div>

      <div className="chip-scroll sm:flex-wrap sm:overflow-visible">
        {KINDS.map((k) => (
          <Button
            key={k}
            size="sm"
            variant={kind === k ? "default" : "outline"}
            className="shrink-0"
            onClick={() => setKind(k)}
          >
            {k === "unverified" ? "sub check" : k} · {counts[k]}
          </Button>
        ))}
      </div>

      {merged.length === 0 ? (
        <EmptyState
          icon={filtered ? Inbox : CheckCircle2}
          title={filtered ? "Nothing in this filter" : "All clear"}
          hint={
            filtered
              ? "Try another chip, or both boards."
              : "No live problems on the board for this date."
          }
          action={
            filtered ? (
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setKind("all");
                  setBoard("all");
                }}
              >
                Clear filters
              </Button>
            ) : (
              <Button size="sm" variant="outline" asChild>
                <Link to="/msk">Open MSK board</Link>
              </Button>
            )
          }
        />
      ) : (
        <ul className="space-y-2">
          {merged.slice(0, 80).map((f) => (
            <IssueRow key={f.id} flag={f} onOpen={() => openFlag(f)} />
          ))}
        </ul>
      )}
      {merged.length > 80 ? (
        <p className="text-xs text-muted">Showing 80 of {merged.length}. Tighten the filter.</p>
      ) : null}

      <UpdateMskDialog
        open={!!target}
        onOpenChange={(v) => !v && setTarget(null)}
        target={target}
        crew={siteCrewGrouped(site.crew).all}
      />
    </div>
  );
}

function IssueRow({ flag, onOpen }: { flag: Flag; onOpen: () => void }) {
  const ping = pingForKind(flag.kind);
  const canEdit = flag.board === "msk" && flag.activitySeq != null;
  return (
    <li>
      <button
        type="button"
        onClick={onOpen}
        disabled={!canEdit}
        className={cn(
          "w-full rounded-xl bg-panel px-4 py-3 text-left shadow-docket transition-[background-color,transform] duration-150 ease-out",
          canEdit ? "min-h-14 hover:bg-sheet active:scale-[0.99]" : "cursor-default",
        )}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            tone={
              flag.severity === "high" ? "miss" : flag.severity === "medium" ? "risk" : "ink"
            }
          >
            {flag.kind}
          </Badge>
          {flag.board ? (
            <Badge>{flag.board === "msk" ? "MSK" : "Toilet"}</Badge>
          ) : null}
          <span
            className={cn(
              "font-display text-[11px] uppercase tracking-[0.14em]",
              flag.severity === "high" && "text-stamp",
            )}
          >
            {flag.severity}
          </span>
          <span className="ml-auto font-mono text-[11px] text-muted">
            {flag.floorCode}
            {flag.toiletCode ? ` ${flag.toiletCode}` : ""}
          </span>
        </div>
        <p className="mt-1 text-sm font-medium">{flag.title}</p>
        <p className="text-xs text-ink-soft">{flag.detail}</p>
        <p className="mt-1.5 font-display text-[11px] uppercase tracking-[0.12em] text-accent">
          {canEdit ? "Tap to update · " : null}
          Ping {ping.names}
          <span className="ml-2 font-sans text-[10px] font-normal normal-case tracking-normal text-muted">
            {ping.title}
          </span>
        </p>
      </button>
    </li>
  );
}
