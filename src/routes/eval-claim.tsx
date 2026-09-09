import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ClaimPictures } from "@/components/add-picture";
import { EmptyDesk, OpsGate, PageHead, StatusChip } from "@/components/ops-ui";
import { Spinner } from "@/components/status-states";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { filterProject, type OpsClaim } from "@/lib/ops";
import { formatRm } from "@/lib/domain";
import { useAsOf } from "@/lib/as-of";
import { useProject } from "@/lib/project";
import { useOps, useOpsActions } from "@/lib/use-ops";
import { formatStamp } from "@/lib/utils";

export const Route = createFileRoute("/eval-claim")({ component: EvalClaimPage });

function EvalClaimPage() {
  return (
    <OpsGate>
      <EvalClaimBody />
    </OpsGate>
  );
}

function EvalClaimBody() {
  const { asOf } = useAsOf();
  const { project } = useProject();
  const ops = useOps().data!;
  const { addClaim } = useOpsActions();
  const pid = project?.id ?? 0;
  const rows = filterProject(ops.claims, pid);

  return (
    <div className="space-y-5">
      <PageHead
        kicker={project?.name ?? "Project"}
        title="Evaluation claim"
        hint="PC to the client. Edit the card, add or remove pictures, save. Not sub gaji."
        action={
          <Button
            size="sm"
            disabled={!project || addClaim.isPending}
            onClick={() => {
              if (!project) return;
              addClaim.mutate(
                {
                  projectId: project.id,
                  claimNo: nextPc(rows.map((r) => r.claimNo)),
                  title: "Cold water, sanitary & irrigation",
                  period: asOf.slice(0, 7),
                  dated: asOf,
                  amount: 0,
                },
                { onSuccess: () => toast.success("Blank claim added") },
              );
            }}
          >
            {addClaim.isPending ? (
              <>
                <Spinner /> Adding…
              </>
            ) : (
              "Add claim"
            )}
          </Button>
        }
      />

      <p className="text-sm text-ink-soft">
        Aipoon / Aryan / Kolik sit under{" "}
        <Link to="/sub-claim" className="uppercase tracking-[0.12em] text-accent">
          Sub claim
        </Link>
        .
      </p>

      {rows.length === 0 ? (
        <EmptyDesk
          title="No evaluation claim"
          text="Add a PC card, drop pictures, then save. This is the client claim — not sub gaji."
        />
      ) : (
        <ul className="space-y-4">
          {rows.map((c) => (
            <li key={c.id}>
              <ClaimCard claim={c} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function nextPc(existing: string[]) {
  const nums = existing.map((n) => Number(n.replace(/\D/g, ""))).filter((n) => Number.isFinite(n) && n > 0);
  return `PC${(nums.length ? Math.max(...nums) : 37) + 1}`;
}

function ClaimCard({ claim }: { claim: OpsClaim }) {
  const { updateClaim, dropClaim } = useOpsActions();
  const [draft, setDraft] = useState(claim);
  useEffect(() => setDraft(claim), [claim]);

  function save() {
    updateClaim.mutate(
      {
        id: draft.id,
        claimNo: draft.claimNo.trim() || claim.claimNo,
        title: draft.title.trim() || claim.title,
        period: draft.period.trim() || claim.period,
        dated: draft.dated,
        amount: Number(draft.amount) || 0,
        certified: Number(draft.certified) || 0,
        status: draft.status,
        note: draft.note,
        photos: draft.photos.slice(0, 8),
      },
      { onSuccess: () => toast.success("Claim saved") },
    );
  }

  return (
    <article className="space-y-3 rounded-xl bg-panel p-4 shadow-docket sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <StatusChip status={draft.status} />
        <div className="flex gap-2">
          <Button size="sm" onClick={save} disabled={updateClaim.isPending}>
            {updateClaim.isPending ? (
              <>
                <Spinner /> Saving…
              </>
            ) : (
              "Save"
            )}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              if (!window.confirm("Remove this claim?")) return;
              dropClaim.mutate({ id: claim.id }, { onSuccess: () => toast.success("Claim removed") });
            }}
          >
            Remove
          </Button>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <Label>PC no</Label>
          <Input className="mt-1" value={draft.claimNo} onChange={(e) => setDraft({ ...draft, claimNo: e.target.value })} />
        </label>
        <label className="block">
          <Label>Period</Label>
          <Input className="mt-1" value={draft.period} onChange={(e) => setDraft({ ...draft, period: e.target.value })} />
        </label>
        <label className="block sm:col-span-2">
          <Label>Title</Label>
          <Input className="mt-1" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
        </label>
        <label className="block">
          <Label>Amount RM</Label>
          <Input
            className="mt-1"
            type="number"
            min={0}
            value={draft.amount}
            onChange={(e) => setDraft({ ...draft, amount: Number(e.target.value) })}
          />
        </label>
        <label className="block">
          <Label>Certified RM</Label>
          <Input
            className="mt-1"
            type="number"
            min={0}
            value={draft.certified}
            onChange={(e) => setDraft({ ...draft, certified: Number(e.target.value) })}
          />
        </label>
        <label className="block">
          <Label>Date</Label>
          <Input className="mt-1" type="date" value={draft.dated} onChange={(e) => setDraft({ ...draft, dated: e.target.value })} />
        </label>
        <label className="block">
          <Label>Status</Label>
          <select
            className="mt-1 h-10 w-full rounded-md border border-line bg-panel px-3 text-sm"
            value={draft.status}
            onChange={(e) => setDraft({ ...draft, status: e.target.value })}
          >
            <option value="draft">draft</option>
            <option value="issued">issued</option>
            <option value="certified">certified</option>
            <option value="paid">paid</option>
          </select>
        </label>
        <label className="block sm:col-span-2">
          <Label>Note</Label>
          <Textarea className="mt-1" rows={3} value={draft.note} onChange={(e) => setDraft({ ...draft, note: e.target.value })} />
        </label>
      </div>
      <ClaimPictures photos={draft.photos} onChange={(photos) => setDraft({ ...draft, photos })} />
      <p className="text-[11px] uppercase tracking-[0.14em] text-muted">
        {formatStamp(draft.dated)} · {draft.ping} · {draft.certified ? `certified RM ${formatRm(draft.certified)}` : "not certified"}
      </p>
    </article>
  );
}
