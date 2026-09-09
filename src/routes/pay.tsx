import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AipoonGaji } from "@/components/aipoon-gaji";
import { AryanGaji } from "@/components/aryan-gaji";
import { AdvanceMonthGrid } from "@/components/advance-month-grid";
import { OpsGate, PageHead, Segmented } from "@/components/ops-ui";
import { SiteGate } from "@/components/site-gate";
import { filterProject, isGmDeskPerson, PAY_KINDS } from "@/lib/ops";
import { useAsOf } from "@/lib/as-of";
import { useDeskHash } from "@/lib/use-desk-hash";
import { useProject } from "@/lib/project";
import { useOps, useOpsActions } from "@/lib/use-ops";

export const Route = createFileRoute("/pay")({ component: PayPage });

const KIND_IDS = ["advance", "subcon"] as const;

function PayPage() {
  return (
    <OpsGate>
      <PayBody />
    </OpsGate>
  );
}

function PayBody() {
  const { asOf } = useAsOf();
  const { project } = useProject();
  const ops = useOps().data!;
  const { addAdvance, upsertRepay } = useOpsActions();
  const pid = project?.id ?? 0;
  const [tab, setTab] = useDeskHash(KIND_IDS, "advance");
  const [month, setMonth] = useState(asOf.slice(0, 7));
  const desk = filterProject(ops.people, pid).filter(isGmDeskPerson);
  const workers = desk.filter((p) => p.kind === "worker");
  const subs = desk.filter((p) => p.kind === "sub");
  const advances = filterProject(ops.advances, pid);
  const current = PAY_KINDS.find((k) => k.id === tab) ?? PAY_KINDS[0];

  return (
    <div className="space-y-5">
      <PageHead
        kicker={project?.name ?? "Project"}
        title={current.label}
        hint={
          tab === "advance"
            ? "GM workers only. Tap a day, type RM. Empty cell is no advance."
            : "Aipoon, Aryan, Kolik. Same month grid for advances. Gaji cards stay below. Not the client PC."
        }
      />

      <Segmented value={tab} onChange={setTab} options={PAY_KINDS} />

      {tab === "advance" ? (
        <AdvanceMonthGrid
          title="Worker advance"
          hint="Tap a day for advance. Tap Repay for money returned this month."
          month={month}
          onMonth={setMonth}
          people={workers}
          advances={advances}
          repay={filterProject(ops.repay ?? [], pid)}
          projectId={pid}
          pending={addAdvance.isPending || upsertRepay.isPending}
          onSave={(data) => addAdvance.mutate(data)}
          onRepay={(data) => upsertRepay.mutate(data)}
        />
      ) : (
        <div className="space-y-4">
          <AdvanceMonthGrid
            title="Sub-contractor advance"
            hint="Aipoon, Aryan, Kolik. Tap a day for RM."
            month={month}
            onMonth={setMonth}
            people={subs}
            advances={advances}
            repay={filterProject(ops.repay ?? [], pid)}
            projectId={pid}
            pending={addAdvance.isPending || upsertRepay.isPending}
            onSave={(data) => addAdvance.mutate(data)}
            onRepay={(data) => upsertRepay.mutate(data)}
          />
          <SiteGate>
            {(site) => (
              <div className="space-y-4">
                <AipoonGaji site={site} />
                <AryanGaji site={site} />
              </div>
            )}
          </SiteGate>
        </div>
      )}
    </div>
  );
}
