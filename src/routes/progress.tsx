import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Letterhead } from "@/components/letterhead";
import { SignOff } from "@/components/sign-off";
import { EmptyDesk, FormGrid, OpsGate, PageHead, RowCard, Segmented, StatusChip } from "@/components/ops-ui";
import { Spinner } from "@/components/status-states";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input, Label, Textarea } from "@/components/ui/input";
import { filterProject, PROGRESS_WHEN } from "@/lib/ops";
import { useAsOf } from "@/lib/as-of";
import { useDeskHash } from "@/lib/use-desk-hash";
import { useProject } from "@/lib/project";
import { useOps, useOpsActions } from "@/lib/use-ops";
import { useSite } from "@/lib/use-site";
import { formatPulled, useAutoReport } from "@/lib/use-auto-report";
import { buildMskInsights } from "@/lib/domain";
import { formatStamp } from "@/lib/utils";

export const Route = createFileRoute("/progress")({ component: ProgressPage });

const WHEN_IDS = ["daily", "weekly", "monthly"] as const;

function ProgressPage() {
  return (
    <OpsGate>
      <ProgressBody />
    </OpsGate>
  );
}

function ProgressBody() {
  const { asOf } = useAsOf();
  const { project } = useProject();
  const ops = useOps().data!;
  const site = useSite();
  const liveLock = site.data ? buildMskInsights(site.data, asOf).weightedAvg : null;
  const actions = useOpsActions();
  const auto = useAutoReport(asOf);
  const [cadence, setCadence] = useDeskHash(WHEN_IDS, "daily");
  const [open, setOpen] = useState(false);
  const rows = filterProject(ops.reports, project?.id ?? 0).filter((r) => r.cadence === cadence);
  const current = PROGRESS_WHEN.find((c) => c.id === cadence) ?? PROGRESS_WHEN[0];

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!project) return;
    const fd = new FormData(e.currentTarget);
    actions.addReport.mutate(
      {
        projectId: project.id,
        cadence,
        period: String(fd.get("period") || ""),
        dated: String(fd.get("dated") || asOf),
        lockPct: Number(fd.get("lock") || 0),
        summary: String(fd.get("summary") || ""),
      },
      {
        onSuccess: () => {
          toast.success("Report saved");
          setOpen(false);
        },
      },
    );
  }

  return (
    <div className="space-y-5">
      <PageHead
        kicker={project?.name ?? "Project"}
        title={`${current.label} progress`}
        hint={current.hint}
        action={
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant={auto.on ? "default" : "outline"} onClick={() => auto.setOn(!auto.on)}>
              {auto.on ? "Auto on" : "Auto off"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                auto.publishNow();
                toast.success(`Generating ${formatStamp(asOf)} daily, weekly, monthly`);
              }}
              disabled={auto.publishing}
            >
              {auto.publishing ? (
                <>
                  <Spinner /> Generating…
                </>
              ) : (
                "Generate now"
              )}
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="sm">New {cadence}</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>New {cadence} report</DialogTitle>
                <FormGrid onSubmit={onSubmit} busy={actions.addReport.isPending}>
                  <div>
                    <Label>Period</Label>
                    <Input name="period" required placeholder={cadence === "monthly" ? "August 2026" : "28 Aug 2026"} className="mt-1" />
                  </div>
                  <div>
                    <Label>Date</Label>
                    <Input name="dated" type="date" defaultValue={asOf} className="mt-1" />
                  </div>
                  <div>
                    <Label>Lock %</Label>
                    <Input name="lock" type="number" min={0} max={100} defaultValue={liveLock ?? 0} className="mt-1" />
                  </div>
                  <div className="sm:col-span-2">
                    <Label>What happened</Label>
                    <Textarea name="summary" required className="mt-1" placeholder="Holes, manpower, material, claim…" />
                  </div>
                </FormGrid>
              </DialogContent>
            </Dialog>
          </div>
        }
      />

      <Segmented value={cadence} onChange={setCadence} options={PROGRESS_WHEN} />

      <p className="rounded-lg bg-paper-2 px-3 py-2 text-sm">
        {liveLock != null ? (
          <>
            Live tower lock <span className="font-display text-lg font-semibold tabular-nums">{liveLock}%</span>
            <span className="text-muted"> — signed copies below. Generate writes lock from the board.</span>
          </>
        ) : (
          <span className="text-muted">Board still loading lock.</span>
        )}
        <span className="mt-1 block text-[11px] uppercase tracking-[0.12em] text-muted">
          Auto {auto.on ? "every 10 min + on return" : "off"} · last write {formatPulled(auto.lastAt)}
        </span>
      </p>

      {cadence === "daily" ? (
        <p className="text-sm text-ink-soft">
          Update crew on{" "}
          <Link to="/" className="text-accent uppercase tracking-[0.12em]">
            Today
          </Link>
          . This list is the signed copy you keep.
        </p>
      ) : null}

      {rows.length === 0 ? (
        <EmptyDesk
          title={`No ${cadence} report`}
          text={`Generate or write the first ${cadence} copy for ${project?.name ?? "this project"}.`}
        />
      ) : (
        <ul className="space-y-3">
          {rows.map((r) => (
            <RowCard key={r.id}>
              <article className="print-sheet">
                <div className="mb-3 hidden print-only">
                  <Letterhead asOf={r.dated} />
                </div>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-display text-xl uppercase tracking-wide">{r.period}</p>
                  <div className="flex items-center gap-2">
                    <StatusChip status={r.status} />
                    <span className="font-display text-2xl font-semibold tabular-nums">{r.lockPct}%</span>
                  </div>
                </div>
                <p className="mt-2 text-sm text-ink-soft">{r.summary}</p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-muted">
                  {formatStamp(r.dated)} · {r.preparedBy}
                </p>
                <div className="mt-4 hidden print-only">
                  <SignOff compact />
                </div>
              </article>
            </RowCard>
          ))}
        </ul>
      )}
    </div>
  );
}
