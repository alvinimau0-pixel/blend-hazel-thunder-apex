import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { SiteGate } from "@/components/site-gate";
import { LockStrip } from "@/components/lock-strip";
import { ShareBoss } from "@/components/share-boss";
import { EmptyInline, Spinner } from "@/components/status-states";
import { TodayBoard } from "@/components/today-board";
import { NextWork } from "@/components/next-work";
import { Button } from "@/components/ui/button";
import { buildInsights, buildMskInsights, claimPct, formatRm } from "@/lib/domain";
import { bossSharePayload } from "@/lib/boss";
import { deskStats } from "@/lib/ops";
import { useProject } from "@/lib/project";
import { useOps, useOpsActions } from "@/lib/use-ops";
import { CLAIM } from "@/lib/msk-seed";
import { pingForKind, REPORT_DATE } from "@/lib/company";
import { useAsOf } from "@/lib/as-of";
import { formatStamp } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <SiteGate>{(site) => <TodayHome site={site} />}</SiteGate>;
}

function TodayHome({ site }: { site: Parameters<typeof buildInsights>[0] }) {
  const { asOf } = useAsOf();
  const { project } = useProject();
  const ops = useOps();
  const actions = useOpsActions();
  const ins = buildInsights(site, asOf);
  const msk = buildMskInsights(site, asOf);
  const stats = ops.data && project ? deskStats(ops.data, project.id) : null;
  const share = (boss: Parameters<typeof bossSharePayload>[0]["boss"]) =>
    bossSharePayload({ asOf, boss, ins, msk, stats });
  const problems = [...msk.flags, ...ins.flags].slice(0, 4);
  const pending = msk.pendingByCell.size + ins.pendingByCell.size;
  const claimLock = claimPct(CLAIM.workDone, CLAIM.contract);

  function publish() {
    actions.publishDay.mutate(asOf, {
      onSuccess: () => toast.success(`Published ${formatStamp(asOf)} · lock ${msk.weightedAvg}%`),
      onError: () => toast.error("Could not publish"),
    });
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-display text-[11px] uppercase tracking-[0.2em] text-muted">{formatStamp(asOf)}</p>
          <h1 className="mt-1 font-display text-3xl font-semibold uppercase tracking-wide">Home</h1>
        </div>
        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
          <Button className="flex-1 sm:flex-none" size="sm" onClick={publish} disabled={actions.publishDay.isPending}>
            {actions.publishDay.isPending ? (
              <>
                <Spinner /> Publishing…
              </>
            ) : (
              "Publish today"
            )}
          </Button>
          <ShareBoss compose={share} />
        </div>
      </div>

      <LockStrip msk={msk} />

      <p className="text-sm text-ink-soft">
        Daily, weekly and August close issue for {formatStamp(asOf)}. Board dated {formatStamp(REPORT_DATE)}. Sub claim is under More.
      </p>

      {pending > 0 ? (
        <p className="rounded-lg bg-stamp/10 px-3 py-2 text-sm text-stamp">
          {pending} sub update{pending === 1 ? "" : "s"} waiting GM check.{" "}
          <Link to="/sub-claim" className="uppercase tracking-[0.12em] underline">
            Open sub claim
          </Link>
        </p>
      ) : null}

      <NextWork site={site} />

      <TodayBoard site={site} who="gm" />

      <section className="rounded-xl bg-panel p-4 shadow-docket sm:p-5">
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-display text-xl uppercase tracking-wide">Need your eye</h2>
          <Link to="/issues" className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.14em] text-accent">
            All problems <ArrowRight className="size-3" />
          </Link>
        </div>
        {problems.length === 0 ? (
          <EmptyInline title="All clear" hint="No live flags for this date." />
        ) : (
          <ul className="mt-3 divide-y divide-line">
            {problems.map((f) => (
              <li key={f.id} className="py-2">
                <p className="text-sm font-medium">{f.title}</p>
                <p className="text-[12px] text-muted">{f.detail}</p>
                <p className="mt-0.5 font-display text-[11px] uppercase tracking-[0.12em] text-accent">
                  Ping {pingForKind(f.kind).names}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-xl bg-panel p-4 shadow-docket sm:p-5">
        <p className="font-display text-[11px] uppercase tracking-[0.16em] text-muted">Client evaluation claim — PC to client</p>
        <p className="mt-1 font-display text-lg uppercase">PC{CLAIM.no} · {claimLock}%</p>
        <p className="mt-1 text-sm text-ink-soft">
          RM {formatRm(CLAIM.thisClaim)} certified {formatStamp(CLAIM.date)}. Includes podium. Not a worker or sub update. Tower lock above is live from the board.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to="/eval-claim">Evaluation claim</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link to="/hod">Share page</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
