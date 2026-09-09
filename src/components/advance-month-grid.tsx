import { useMemo, useState } from "react";
import { toast } from "sonner";
import { EmptyInline, Spinner } from "@/components/status-states";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input, Label } from "@/components/ui/input";
import type { OpsAdvance, OpsPerson, OpsRepay } from "@/lib/ops";
import { WORKER_ROLL } from "@/lib/work-scope";
import { cn } from "@/lib/utils";
import { formatRm } from "@/lib/domain";

function daysInMonth(month: string) {
  const [y, m] = month.split("-").map(Number);
  return new Date(y, m, 0).getDate();
}

function sortPeople(rows: OpsPerson[]) {
  const rank = new Map(WORKER_ROLL.map((n, i) => [n.toUpperCase(), i]));
  return [...rows].sort((a, b) => {
    const ra = rank.get(a.name.toUpperCase()) ?? 800 + a.name.localeCompare(b.name);
    const rb = rank.get(b.name.toUpperCase()) ?? 800 + b.name.localeCompare(a.name);
    return ra - rb;
  });
}

export function AdvanceMonthGrid({
  title,
  hint,
  month,
  onMonth,
  people,
  advances,
  repay,
  projectId,
  onSave,
  onRepay,
  pending,
}: {
  title: string;
  hint: string;
  month: string;
  onMonth: (m: string) => void;
  people: OpsPerson[];
  advances: OpsAdvance[];
  repay: OpsRepay[];
  projectId: number;
  onSave: (data: { projectId: number; personId: number; dated: string; amount: number; reason: string }) => void;
  onRepay: (data: { projectId: number; personId: number; month: string; amount: number }) => void;
  pending?: boolean;
}) {
  const days = daysInMonth(month);
  const rows = useMemo(() => sortPeople(people), [people]);
  const map = useMemo(() => {
    const m = new Map<string, OpsAdvance>();
    for (const a of advances) {
      if (a.dated.startsWith(month)) m.set(`${a.personId}:${a.dated}`, a);
    }
    return m;
  }, [advances, month]);

  const repayMap = useMemo(() => {
    const m = new Map<number, number>();
    for (const r of repay) {
      if (r.month === month) m.set(r.personId, r.amount);
    }
    return m;
  }, [repay, month]);

  const [edit, setEdit] = useState<{ person: OpsPerson; dated: string; amount: string } | null>(null);
  const [payback, setPayback] = useState<{ person: OpsPerson; amount: string } | null>(null);

  function saveEdit(amount: number) {
    if (!edit) return;
    onSave({
      projectId,
      personId: edit.person.id,
      dated: edit.dated,
      amount,
      reason: "Advance",
    });
    toast.success(`${edit.person.name} ${edit.dated.slice(8)} · ${amount ? `RM ${amount}` : "cleared"}`);
    setEdit(null);
  }

  return (
    <section className="overflow-hidden rounded-xl bg-panel shadow-docket">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-3">
        <div>
          <p className="font-display text-[11px] uppercase tracking-[0.16em] text-muted">{title}</p>
          <h2 className="font-display text-xl uppercase tracking-wide">{month}</h2>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="month"
            value={month}
            onChange={(e) => onMonth(e.target.value)}
            className="h-11 rounded-md border border-line bg-paper px-2 text-base sm:text-sm"
          />
          <Button size="sm" variant="outline" className="no-print" onClick={() => window.print()}>
            Print
          </Button>
        </div>
      </div>
      <p className="px-4 py-2 text-[12px] text-ink-soft">
        {hint}
        {pending ? (
          <span className="ml-2 inline-flex items-center gap-1 font-display text-[11px] uppercase tracking-[0.12em] text-muted">
            <Spinner className="size-3" /> Saving
          </span>
        ) : null}
      </p>
      {rows.length === 0 ? (
        <EmptyInline title="Nobody on this list" hint="Add workers or subs under Crew first." />
      ) : (
      <div className="overflow-x-auto">
        <table className="min-w-max border-collapse text-[11px]">
          <thead>
            <tr className="bg-paper-2">
              <th className="sticky left-0 z-10 min-w-28 border-b border-r border-line bg-paper-2 px-2 py-2 text-left font-display text-[11px] uppercase tracking-[0.12em]">
                Name
              </th>
              {Array.from({ length: days }, (_, i) => (
                <th key={i} className="min-w-9 border-b border-line px-0 py-2 text-center font-mono font-normal tabular-nums text-muted">
                  {i + 1}
                </th>
              ))}
              <th className="min-w-12 border-b border-l border-line px-1 py-2 text-center font-display text-[10px] uppercase text-muted">
                Adv
              </th>
              <th className="min-w-12 border-b border-line px-1 py-2 text-center font-display text-[10px] uppercase text-muted">
                Repay
              </th>
              <th className="min-w-12 border-b border-line px-1 py-2 text-center font-display text-[10px] uppercase text-muted">
                Bal
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((w) => {
              let total = 0;
              const cells = Array.from({ length: days }, (_, i) => {
                const dated = `${month}-${String(i + 1).padStart(2, "0")}`;
                const row = map.get(`${w.id}:${dated}`);
                if (row) total += row.amount;
                return { dated, amount: row?.amount ?? 0, day: i + 1 };
              });
              const repaid = repayMap.get(w.id) ?? 0;
              const bal = total - repaid;
              return (
                <tr key={w.id} className="odd:bg-sheet">
                  <th className="sticky left-0 z-10 border-b border-r border-line bg-inherit px-2 py-0 text-left font-display text-[12px] font-semibold uppercase tracking-wide">
                    <span className="block leading-tight">{w.name}</span>
                    <span className="block font-sans text-[10px] font-normal normal-case tracking-normal text-muted">
                      {w.trade}
                    </span>
                  </th>
                  {cells.map((c) => (
                    <td key={c.day} className="border-b border-line p-0">
                      <button
                        type="button"
                        disabled={pending}
                        onClick={() => setEdit({ person: w, dated: c.dated, amount: c.amount ? String(c.amount) : "" })}
                        className={cn(
                          "flex h-9 w-9 items-center justify-center font-mono text-[9px] tabular-nums",
                          c.amount > 0 && "bg-cell-risk text-cell-risk-ink",
                        )}
                      >
                        {c.amount ? c.amount : ""}
                      </button>
                    </td>
                  ))}
                  <td className="border-b border-l border-line text-center font-mono tabular-nums text-ink-soft">
                    {total ? formatRm(total) : ""}
                  </td>
                  <td className="border-b border-line p-0">
                    <button
                      type="button"
                      disabled={pending}
                      onClick={() => setPayback({ person: w, amount: repaid ? String(repaid) : "" })}
                      className={cn(
                        "flex h-9 w-full min-w-12 items-center justify-center font-mono text-[10px] tabular-nums",
                        repaid > 0 && "bg-cell-done text-cell-done-ink",
                      )}
                    >
                      {repaid ? formatRm(repaid) : ""}
                    </button>
                  </td>
                  <td
                    className={cn(
                      "border-b border-line text-center font-mono tabular-nums",
                      bal > 0 ? "text-stamp" : "text-ink-soft",
                    )}
                  >
                    {total || repaid ? formatRm(bal) : ""}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      )}

      <Dialog open={!!edit} onOpenChange={(o) => !o && setEdit(null)}>
        <DialogContent>
          <DialogTitle>
            {edit ? `${edit.person.name} · ${edit.dated.slice(8)}` : "Advance"}
          </DialogTitle>
          <form
            className="mt-3 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              saveEdit(Number(edit?.amount || 0));
            }}
          >
            <div>
              <Label>Amount RM</Label>
              <Input
                type="number"
                min={0}
                inputMode="numeric"
                value={edit?.amount ?? ""}
                onChange={(e) => setEdit((cur) => (cur ? { ...cur, amount: e.target.value } : cur))}
                className="mt-1"
                autoFocus
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                Save
              </Button>
              <Button type="button" variant="outline" className="flex-1" onClick={() => saveEdit(0)}>
                Clear
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={!!payback} onOpenChange={(o) => !o && setPayback(null)}>
        <DialogContent>
          <DialogTitle>{payback ? `${payback.person.name} · repay ${month}` : "Repay"}</DialogTitle>
          <form
            className="mt-3 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (!payback) return;
              const amount = Number(payback.amount || 0);
              onRepay({ projectId, personId: payback.person.id, month, amount });
              toast.success(`${payback.person.name} repay · ${amount ? `RM ${amount}` : "cleared"}`);
              setPayback(null);
            }}
          >
            <div>
              <Label>Repay RM this month</Label>
              <Input
                type="number"
                min={0}
                inputMode="numeric"
                value={payback?.amount ?? ""}
                onChange={(e) => setPayback((cur) => (cur ? { ...cur, amount: e.target.value } : cur))}
                className="mt-1"
                autoFocus
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                Save
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => {
                  if (!payback) return;
                  onRepay({ projectId, personId: payback.person.id, month, amount: 0 });
                  setPayback(null);
                }}
              >
                Clear
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
