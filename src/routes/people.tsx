import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { EmptyDesk, FormGrid, OpsGate, PageHead, RowCard, Segmented, StatusChip } from "@/components/ops-ui";
import { WorkerMonthGrid } from "@/components/worker-month-grid";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input, Label } from "@/components/ui/input";
import { filterProject, isGmDeskPerson } from "@/lib/ops";
import { useAsOf } from "@/lib/as-of";
import { useDeskHash } from "@/lib/use-desk-hash";
import { useProject } from "@/lib/project";
import { useOps, useOpsActions } from "@/lib/use-ops";

export const Route = createFileRoute("/people")({ component: PeoplePage });

const KINDS = ["worker", "sub"] as const;

function PeoplePage() {
  return (
    <OpsGate>
      <PeopleBody />
    </OpsGate>
  );
}

function PeopleBody() {
  const { asOf } = useAsOf();
  const { project } = useProject();
  const ops = useOps().data!;
  const { addPerson, setAttend } = useOpsActions();
  const pid = project?.id ?? 0;
  const [kind, setKind] = useDeskHash(KINDS, "worker");
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState(asOf.slice(0, 7));
  const desk = filterProject(ops.people, pid).filter(isGmDeskPerson);
  const rows = desk.filter((p) => p.kind === kind);
  const workers = desk.filter((p) => p.kind === "worker");
  const subs = desk.filter((p) => p.kind === "sub");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!project) return;
    const fd = new FormData(e.currentTarget);
    addPerson.mutate(
      {
        projectId: project.id,
        kind,
        name: String(fd.get("name")),
        trade: String(fd.get("trade")),
        contractor: kind === "sub" ? "SUB" : "GM",
        dailyRate: 0,
      },
      {
        onSuccess: () => {
          toast.success(kind === "worker" ? "Worker added" : "Sub added");
          setOpen(false);
        },
      },
    );
  }

  return (
    <div className="space-y-5">
      <PageHead
        kicker={project?.name ?? "Project"}
        title="GM crew"
        hint="Month grid for GM workers. Tap a day. Subs under GM stay on their own list. No worker rates here."
        action={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm">Add {kind === "worker" ? "worker" : "sub"}</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Add {kind}</DialogTitle>
              <FormGrid onSubmit={onSubmit} busy={addPerson.isPending}>
                <div>
                  <Label>Name</Label>
                  <Input name="name" required className="mt-1" />
                </div>
                <div>
                  <Label>Trade</Label>
                  <Input name="trade" required className="mt-1" />
                </div>
              </FormGrid>
            </DialogContent>
          </Dialog>
        }
      />

      <Segmented
        value={kind}
        onChange={setKind}
        options={[
          { id: "worker", label: `Workers · ${workers.length}` },
          { id: "sub", label: `Subs under GM · ${subs.length}` },
        ]}
      />

      {kind === "worker" ? (
        workers.length === 0 ? (
          <EmptyDesk title="No GM workers" text="Add the crew for this project, then tap days on the month grid." />
        ) : (
          <WorkerMonthGrid
            month={month}
            onMonth={setMonth}
            workers={workers}
            attendance={filterProject(ops.attendance ?? [], pid)}
            projectId={pid}
            pending={setAttend.isPending}
            onMark={(data) => setAttend.mutate(data)}
          />
        )
      ) : subs.length === 0 ? (
        <EmptyDesk title="No subs under GM" text="Add Aipoon, Aryan or Kolik. They stay on this list, not the month grid." />
      ) : (
        <ul className="space-y-2">
          {rows.map((p) => (
            <RowCard key={p.id}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-display text-lg uppercase tracking-wide">{p.name}</p>
                <StatusChip status={p.active ? "active" : "held"} />
              </div>
              <p className="text-sm text-ink-soft">{p.trade}</p>
            </RowCard>
          ))}
        </ul>
      )}
    </div>
  );
}
