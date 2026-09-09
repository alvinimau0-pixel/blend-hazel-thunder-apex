import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { EmptyDesk, FormGrid, OpsGate, PageHead, RowCard, Segmented, StatusChip } from "@/components/ops-ui";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input, Label, Textarea } from "@/components/ui/input";
import { filterProject, PAPER_KINDS } from "@/lib/ops";
import { formatRm } from "@/lib/domain";
import { useAsOf } from "@/lib/as-of";
import { useDeskHash } from "@/lib/use-desk-hash";
import { useProject } from "@/lib/project";
import { useOps, useOpsActions } from "@/lib/use-ops";
import { formatStamp } from "@/lib/utils";

export const Route = createFileRoute("/papers")({ component: PapersPage });

const KIND_IDS = ["drawings", "po", "receive"] as const;

function PapersPage() {
  return (
    <OpsGate>
      <PapersBody />
    </OpsGate>
  );
}

function PapersBody() {
  const { asOf } = useAsOf();
  const { project } = useProject();
  const ops = useOps().data!;
  const pid = project?.id ?? 0;
  const [kind, setKind] = useDeskHash(KIND_IDS, "drawings");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const current = PAPER_KINDS.find((k) => k.id === kind) ?? PAPER_KINDS[0];
  const hint = {
    drawings: "Latest rev on site. Farah keeps the register.",
    po: "Zilla issues. Site cannot receive what is not on a PO.",
    receive: "DO against PO. Partial stays yellow until the balance lands.",
  }[kind];

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash.replace(/^#/, "") === "claim") {
      void navigate({ to: "/eval-claim", replace: true });
    }
  }, [navigate]);

  return (
    <div className="space-y-5">
      <PageHead
        kicker={project?.name ?? "Project"}
        title={current.label}
        hint={hint}
        action={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm">New {current.label}</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>New {current.label}</DialogTitle>
              {kind === "drawings" ? <DrawingForm asOf={asOf} onClose={() => setOpen(false)} /> : null}
              {kind === "po" ? <PoForm asOf={asOf} onClose={() => setOpen(false)} /> : null}
              {kind === "receive" ? <ReceiveForm asOf={asOf} onClose={() => setOpen(false)} /> : null}
            </DialogContent>
          </Dialog>
        }
      />
      <Segmented value={kind} onChange={setKind} options={PAPER_KINDS} />

      {kind === "drawings" ? (
        <ul className="space-y-2">
          {filterProject(ops.drawings, pid).map((d) => (
            <RowCard key={d.id}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-display text-lg uppercase tracking-wide">{d.title}</p>
                <StatusChip status={d.status} />
              </div>
              <p className="mt-1 text-[12px] uppercase tracking-[0.12em] text-muted">
                {d.refNo} · {d.discipline} · Rev {d.rev} · {formatStamp(d.dated)}
              </p>
              {d.fileHref ? (
                <a href={d.fileHref} className="mt-2 inline-block text-xs uppercase tracking-[0.14em] text-accent">
                  Open drawing
                </a>
              ) : null}
            </RowCard>
          ))}
        </ul>
      ) : null}

      {kind === "po" ? (
        <ul className="space-y-2">
          {filterProject(ops.pos, pid).map((p) => (
            <RowCard key={p.id}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-display text-lg uppercase tracking-wide">{p.poNo}</p>
                <StatusChip status={p.status} />
              </div>
              <p className="text-sm">{p.material}</p>
              <p className="mt-1 text-[12px] text-muted">
                {p.supplier} · {formatStamp(p.dated)} · Ping {p.ping}
              </p>
              <p className="mt-1 font-mono text-sm tabular-nums">RM {formatRm(p.amount)}</p>
            </RowCard>
          ))}
        </ul>
      ) : null}

      {kind === "receive" ? (
        <ul className="space-y-2">
          {filterProject(ops.receives, pid).map((r) => {
            const po = ops.pos.find((p) => p.id === r.poId);
            return (
              <RowCard key={r.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-display text-lg uppercase tracking-wide">{r.doNo}</p>
                  <StatusChip status={r.status} />
                </div>
                <p className="text-sm">{r.qtyNote}</p>
                <p className="mt-1 text-[12px] text-muted">
                  {po?.poNo ?? "No PO"} · {r.receivedBy} · {formatStamp(r.dated)}
                </p>
              </RowCard>
            );
          })}
        </ul>
      ) : null}

      {kind === "drawings" && filterProject(ops.drawings, pid).length === 0 ? (
        <EmptyDesk title="No drawings" text="Log the latest rev on site. Farah keeps the register." />
      ) : null}
      {kind === "po" && filterProject(ops.pos, pid).length === 0 ? (
        <EmptyDesk title="No purchase orders" text="Zilla issues. Site cannot receive what is not on a PO." />
      ) : null}
      {kind === "receive" && filterProject(ops.receives, pid).length === 0 ? (
        <EmptyDesk title="Nothing received" text="Log a DO against a PO. Partial stays yellow until the balance lands." />
      ) : null}
    </div>
  );
}

function DrawingForm({ asOf, onClose }: { asOf: string; onClose: () => void }) {
  const { project } = useProject();
  const { addDrawing } = useOpsActions();
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!project) return;
    const fd = new FormData(e.currentTarget);
    addDrawing.mutate(
      {
        projectId: project.id,
        title: String(fd.get("title")),
        refNo: String(fd.get("ref")),
        discipline: String(fd.get("disc")),
        rev: String(fd.get("rev")),
        dated: String(fd.get("dated") || asOf),
      },
      { onSuccess: () => { toast.success("Drawing logged"); onClose(); } },
    );
  }
  return (
    <FormGrid onSubmit={onSubmit} busy={addDrawing.isPending}>
      <div className="sm:col-span-2">
        <Label>Title</Label>
        <Input name="title" required className="mt-1" />
      </div>
      <div>
        <Label>Ref</Label>
        <Input name="ref" required className="mt-1" />
      </div>
      <div>
        <Label>Discipline</Label>
        <Input name="disc" defaultValue="Plumbing" className="mt-1" />
      </div>
      <div>
        <Label>Rev</Label>
        <Input name="rev" defaultValue="A" className="mt-1" />
      </div>
      <div>
        <Label>Date</Label>
        <Input name="dated" type="date" defaultValue={asOf} className="mt-1" />
      </div>
    </FormGrid>
  );
}

function PoForm({ asOf, onClose }: { asOf: string; onClose: () => void }) {
  const { project } = useProject();
  const { addPo } = useOpsActions();
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!project) return;
    const fd = new FormData(e.currentTarget);
    addPo.mutate(
      {
        projectId: project.id,
        poNo: String(fd.get("po")),
        supplier: String(fd.get("supplier")),
        dated: String(fd.get("dated") || asOf),
        material: String(fd.get("material")),
        amount: Number(fd.get("amount") || 0),
      },
      { onSuccess: () => { toast.success("PO issued"); onClose(); } },
    );
  }
  return (
    <FormGrid onSubmit={onSubmit} busy={addPo.isPending}>
      <div>
        <Label>PO no</Label>
        <Input name="po" required placeholder="GM-PO-2406" className="mt-1" />
      </div>
      <div>
        <Label>Date</Label>
        <Input name="dated" type="date" defaultValue={asOf} className="mt-1" />
      </div>
      <div className="sm:col-span-2">
        <Label>Supplier</Label>
        <Input name="supplier" required className="mt-1" />
      </div>
      <div className="sm:col-span-2">
        <Label>Material</Label>
        <Input name="material" required className="mt-1" />
      </div>
      <div>
        <Label>Amount RM</Label>
        <Input name="amount" type="number" min={0} className="mt-1" />
      </div>
    </FormGrid>
  );
}

function ReceiveForm({ asOf, onClose }: { asOf: string; onClose: () => void }) {
  const { project } = useProject();
  const ops = useOps().data!;
  const { addReceive } = useOpsActions();
  const pos = filterProject(ops.pos, project?.id ?? 0);
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!project) return;
    const fd = new FormData(e.currentTarget);
    addReceive.mutate(
      {
        projectId: project.id,
        doNo: String(fd.get("do")),
        poId: fd.get("po") ? Number(fd.get("po")) : null,
        dated: String(fd.get("dated") || asOf),
        receivedBy: String(fd.get("by")),
        qtyNote: String(fd.get("qty")),
        status: String(fd.get("status") || "received"),
      },
      { onSuccess: () => { toast.success("Receive logged"); onClose(); } },
    );
  }
  return (
    <FormGrid onSubmit={onSubmit} busy={addReceive.isPending}>
      <div>
        <Label>DO no</Label>
        <Input name="do" required className="mt-1" />
      </div>
      <div>
        <Label>Against PO</Label>
        <select name="po" className="mt-1 h-10 w-full rounded-md border border-line bg-panel px-2 text-sm outline-none transition-[border-color,box-shadow] duration-150 focus:border-accent focus:ring-2 focus:ring-ring">
          <option value="">No PO</option>
          {pos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.poNo}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label>Received by</Label>
        <Input name="by" defaultValue="Alvin" className="mt-1" />
      </div>
      <div>
        <Label>Date</Label>
        <Input name="dated" type="date" defaultValue={asOf} className="mt-1" />
      </div>
      <div className="sm:col-span-2">
        <Label>Qty / note</Label>
        <Textarea name="qty" className="mt-1" />
      </div>
      <div>
        <Label>Status</Label>
        <select name="status" className="mt-1 h-10 w-full rounded-md border border-line bg-panel px-2 text-sm outline-none transition-[border-color,box-shadow] duration-150 focus:border-accent focus:ring-2 focus:ring-ring">
          <option value="received">Received</option>
          <option value="partial">Partial</option>
        </select>
      </div>
    </FormGrid>
  );
}

