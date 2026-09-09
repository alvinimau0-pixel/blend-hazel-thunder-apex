import { createFileRoute } from "@tanstack/react-router";
import { SiteGate } from "@/components/site-gate";
import { Letterhead } from "@/components/letterhead";
import { SignOff } from "@/components/sign-off";
import { ShareBoss } from "@/components/share-boss";
import { COMPANY } from "@/lib/company";
import { bossSharePayload } from "@/lib/boss";
import { buildInsights, buildMskInsights, claimPct, formatRm } from "@/lib/domain";
import { CLAIM, TRADE_LABEL } from "@/lib/msk-seed";
import { deskStats } from "@/lib/ops";
import { useAsOf } from "@/lib/as-of";
import { useOps } from "@/lib/use-ops";
import { useProject } from "@/lib/project";
import { cn, formatStamp } from "@/lib/utils";

export const Route = createFileRoute("/hod")({
  component: HodRoute,
  head: () => ({
    meta: [
      { title: "Attn Khairul · Gelaran Maju" },
      {
        name: "description",
        content:
          "Gelaran Maju Sdn Bhd (817785-V) — The Capitol MSK lock, skipped floors, and PC36 for Khairul.",
      },
    ],
  }),
});

function HodRoute() {
  return (
    <div className="min-h-dvh bg-paper text-ink">
      <div className="mx-auto max-w-3xl px-4 py-6 sm:py-10">
        <SiteGate>{(site) => <HodSite site={site} />}</SiteGate>
      </div>
    </div>
  );
}

function HodSite({ site }: { site: Parameters<typeof buildInsights>[0] }) {
  const { asOf } = useAsOf();
  const { project } = useProject();
  const ops = useOps();
  const ins = buildInsights(site, asOf);
  const msk = buildMskInsights(site, asOf);
  const stats = ops.data && project ? deskStats(ops.data, project.id) : null;
  const holes = msk.flags.filter((f) => f.kind === "hole").length;
  const waiting = ins.flags.filter((f) => f.kind === "waiting").length;
  const lies = [...ins.flags, ...msk.flags].filter((f) => f.kind === "lie").length;
  const unverified = ins.pendingByCell.size + msk.pendingByCell.size;
  const problems = [...msk.flags, ...ins.flags].slice(0, 8);
  const claimLock = claimPct(CLAIM.workDone, CLAIM.contract);

  return (
    <article className="print-sheet overflow-hidden rounded-xl bg-sheet shadow-docket">
      <div className="border-b border-ink px-5 py-5 sm:px-8">
        <Letterhead asOf={asOf} />
      </div>

      <div className="px-5 py-6 sm:px-8 sm:py-8">
        <p className="font-display text-[11px] uppercase tracking-[0.2em] text-muted">
          Internal website · Share this page
        </p>
        <p className="mt-2 font-display text-2xl font-semibold uppercase tracking-wide sm:text-3xl">
          Attn Khairul
        </p>
        <p className="text-sm text-ink-soft">Engineer / Manager · {COMPANY.project} MSK · {formatStamp(asOf)}</p>

        <div className="no-print mt-4">
          <ShareBoss compose={(boss) => bossSharePayload({ asOf, boss, ins, msk, stats })} />
        </div>

        <h1 className="mt-6 font-display text-6xl font-semibold uppercase tracking-wide sm:text-7xl">
          {msk.weightedAvg}
          <span className="text-3xl text-muted">%</span>
        </h1>
        <p className="mt-2 max-w-lg text-sm text-ink-soft">
          Tower lock L13–31M from the live MSK board. Same number as Today. Podium is on PC36, not in this %.
        </p>

        <div className="mt-6 grid grid-cols-3 gap-2">
          <Stat label={TRADE_LABEL.CW} value={`${msk.tradeAvg.CW}%`} />
          <Stat label={TRADE_LABEL.SAN} value={`${msk.tradeAvg.SAN}%`} />
          <Stat label={TRADE_LABEL.IRR} value={`${msk.tradeAvg.IRR}%`} />
        </div>

        <div className="mt-5 space-y-3">
          <Bar label="Tower A" value={msk.towerAvg.A} />
          <Bar label="Tower B" value={msk.towerAvg.B} />
        </div>

        <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Flag label="Skipped floors" value={String(holes)} tone="miss" />
          <Flag label="Waiting on others" value={String(waiting)} tone="risk" />
          <Flag label="Sub check" value={String(unverified)} tone="ink" />
          <Flag label="Truth flags" value={String(lies)} tone="stamp" />
        </div>

        <section className="mt-8 border-t border-line pt-6">
          <h2 className="font-display text-xl uppercase tracking-wide">Need your eye</h2>
          <ul className="mt-3 divide-y divide-line">
            {problems.map((f) => (
              <li key={f.id} className="py-3">
                <p className="text-sm font-medium">{f.title}</p>
                <p className="mt-0.5 text-[12px] text-muted">{f.detail}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8 border-t border-line pt-6">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="font-display text-xl uppercase tracking-wide">PC{CLAIM.no} to client</h2>
            <p className="font-mono text-sm tabular-nums">{claimLock}%</p>
          </div>
          <p className="mt-1 text-xs text-muted">Evaluation claim · certified {formatStamp(CLAIM.date)} · not a daily sub update</p>
          <p className="mt-2 font-display text-3xl tabular-nums">RM {formatRm(CLAIM.thisClaim)}</p>
          {stats?.claimDraft ? (
            <p className="mt-2 text-sm text-ink-soft">Next: {stats.claimDraft} draft · Jenny</p>
          ) : null}
        </section>

        <div className="mt-10 border-t border-ink pt-6">
          <SignOff />
        </div>
      </div>

      <footer className="border-t border-ink bg-paper-2 px-5 py-4 text-[11px] text-muted sm:px-8">
        <p className="font-display uppercase tracking-[0.14em] text-ink-soft">
          {COMPANY.legal} ({COMPANY.registration})
        </p>
        <p className="mt-1">{COMPANY.address}</p>
        <p>Tel {COMPANY.phone} · Internal — not for client circulation</p>
      </footer>
    </article>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-paper-2 px-3 py-3">
      <p className="font-display text-[11px] uppercase tracking-[0.14em] text-muted">{label}</p>
      <p className="mt-1 font-display text-2xl font-semibold tabular-nums">{value}</p>
    </div>
  );
}

function Bar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="font-display text-sm uppercase">{label}</p>
        <p className="font-mono text-sm tabular-nums">{value}%</p>
      </div>
      <div className="mt-1 h-3 overflow-hidden rounded-md bg-paper-2">
        <div
          className={cn("h-full", value >= 70 ? "bg-cell-done" : value >= 40 ? "bg-cell-risk" : "bg-cell-miss")}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function Flag({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "miss" | "risk" | "ink" | "stamp";
}) {
  return (
    <div className="rounded-lg bg-paper-2 px-3 py-3">
      <p className="font-display text-[11px] uppercase tracking-[0.14em] text-muted">{label}</p>
      <p
        className={cn(
          "mt-1 font-display text-3xl font-semibold tabular-nums",
          tone === "miss" && "text-cell-miss-ink",
          tone === "risk" && "text-cell-risk-ink",
          tone === "stamp" && "text-stamp",
        )}
      >
        {value}
      </p>
    </div>
  );
}
