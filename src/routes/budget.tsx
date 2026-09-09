import { createFileRoute } from "@tanstack/react-router";
import { Printer, Plus, RotateCcw, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Letterhead } from "@/components/letterhead";
import { PageHead } from "@/components/ops-ui";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { useAsOf } from "@/lib/as-of";
import {
  blankSheet,
  loadBudget,
  money,
  monthLabel,
  monthOf,
  saveBudget,
  totals,
  type BudgetKind,
  type BudgetLine,
  type BudgetSheet,
} from "@/lib/budget";
import { useProject } from "@/lib/project";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/budget")({ component: BudgetPage });

function BudgetPage() {
  const { asOf } = useAsOf();
  const { project } = useProject();
  const startMonth = monthOf(asOf);
  const [month, setMonth] = useState(startMonth);
  const [sheet, setSheet] = useState<BudgetSheet>(() => loadBudget(startMonth));
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSheet(loadBudget(month));
    setReady(true);
  }, [month]);

  useEffect(() => {
    if (!ready) return;
    saveBudget(sheet);
  }, [sheet, ready]);

  const fig = useMemo(() => totals(sheet.lines), [sheet.lines]);
  const income = sheet.lines.filter((l) => l.kind === "in");
  const spend = sheet.lines.filter((l) => l.kind === "out");

  function patch(next: Partial<BudgetSheet>) {
    setSheet((s) => ({ ...s, ...next }));
  }

  function patchLine(id: string, next: Partial<BudgetLine>) {
    setSheet((s) => ({
      ...s,
      lines: s.lines.map((l) => (l.id === id ? { ...l, ...next } : l)),
    }));
  }

  function addLine(kind: BudgetKind) {
    setSheet((s) => ({
      ...s,
      lines: [
        ...s.lines,
        {
          id: `${kind}-${Date.now()}`,
          kind,
          name: kind === "in" ? "New income" : "New expense",
          planned: 0,
          actual: 0,
          note: "",
        },
      ],
    }));
  }

  function removeLine(id: string) {
    setSheet((s) => ({ ...s, lines: s.lines.filter((l) => l.id !== id) }));
  }

  function reset() {
    setSheet(blankSheet(month));
    toast.success("Sheet reset. Type over the names and numbers.");
  }

  return (
    <div className="space-y-5">
      <div className="no-print">
        <PageHead
          kicker={project?.name ?? "Gelaran Maju"}
          title="Budget"
          hint="Type in the white boxes. Planned is what you meant to spend. Actual is what really moved. Totals add themselves."
          action={
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline" onClick={() => window.print()}>
                <Printer /> Print
              </Button>
              <Button size="sm" variant="outline" onClick={reset}>
                <RotateCcw /> Reset sheet
              </Button>
            </div>
          }
        />
      </div>

      <section className="no-print rounded-xl bg-panel p-4 shadow-docket sm:p-5">
        <h2 className="font-display text-lg uppercase tracking-wide">How to use</h2>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-ink-soft">
          <li>Pick the month. The sheet remembers that month on this phone or computer.</li>
          <li>Click a category name to rename it. Add a line if you need a new one.</li>
          <li>Put the planned RM first. When money moves, type the actual RM.</li>
          <li>Green leftover means you are under plan. Red means you spent more than you took in.</li>
          <li>Print when you need a paper copy for Jenny, Khairul, or home.</li>
        </ol>
      </section>

      <div className="print-sheet space-y-4 rounded-xl bg-panel p-4 shadow-docket sm:p-5">
        <div className="mb-3 hidden print-only">
          <Letterhead asOf={`${month}-01`} />
        </div>

        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="min-w-0 flex-1">
            <Label htmlFor="budget-title">Sheet title</Label>
            <Input
              id="budget-title"
              className="mt-1 h-11 max-w-md font-display text-lg uppercase"
              value={sheet.title}
              onChange={(e) => patch({ title: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="budget-month">Month</Label>
            <input
              id="budget-month"
              type="month"
              value={month}
              onChange={(e) => {
                const next = e.target.value || month;
                setMonth(next);
              }}
              className="mt-1 h-11 rounded-md border border-line bg-panel px-3 text-sm"
            />
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-3">
          <Stat label="Money in" value={fig.inAct} hint={`Plan ${money(fig.inPlan)}`} tone="track" />
          <Stat label="Money out" value={fig.outAct} hint={`Plan ${money(fig.outPlan)} · ${fig.spentOfPlan}% of plan`} tone="risk" />
          <Stat
            label="Left this month"
            value={fig.leftAct}
            hint={`Plan leftover ${money(fig.leftPlan)}`}
            tone={fig.leftAct >= 0 ? "done" : "miss"}
          />
        </div>

        <SheetTable
          title="Money in"
          hint="Salary, claims, anything that arrives."
          rows={income}
          onChange={patchLine}
          onRemove={removeLine}
          onAdd={() => addLine("in")}
        />
        <SheetTable
          title="Money out"
          hint="Rename any line. Delete ones you do not use."
          rows={spend}
          onChange={patchLine}
          onRemove={removeLine}
          onAdd={() => addLine("out")}
        />

        <div className="overflow-x-auto rounded-lg border border-line">
          <table className="w-full border-collapse text-sm">
            <tbody>
              <TotalRow label="Total in" planned={fig.inPlan} actual={fig.inAct} />
              <TotalRow label="Total out" planned={fig.outPlan} actual={fig.outAct} />
              <TotalRow label="Left" planned={fig.leftPlan} actual={fig.leftAct} strong />
            </tbody>
          </table>
        </div>

        <p className="text-[12px] text-muted">
          {monthLabel(month)}. Numbers are RM. This sheet is for tracking — it is not the client PC or sub gaji.
        </p>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  hint,
  tone,
}: {
  label: string;
  value: number;
  hint: string;
  tone: "done" | "miss" | "risk" | "track";
}) {
  const toneClass =
    tone === "done"
      ? "bg-cell-done text-cell-done-ink"
      : tone === "miss"
        ? "bg-cell-miss text-cell-miss-ink"
        : tone === "risk"
          ? "bg-cell-risk text-cell-risk-ink"
          : "bg-paper-2 text-ink";
  return (
    <article className={cn("rounded-lg p-3", toneClass)}>
      <p className="font-display text-[11px] uppercase tracking-[0.16em]">{label}</p>
      <p className="mt-1 font-display text-3xl font-semibold tabular-nums">{money(value)}</p>
      <p className="mt-1 text-[12px] opacity-80">{hint}</p>
    </article>
  );
}

function SheetTable({
  title,
  hint,
  rows,
  onChange,
  onRemove,
  onAdd,
}: {
  title: string;
  hint: string;
  rows: BudgetLine[];
  onChange: (id: string, next: Partial<BudgetLine>) => void;
  onRemove: (id: string) => void;
  onAdd: () => void;
}) {
  return (
    <section>
      <div className="mb-2 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="font-display text-lg uppercase tracking-wide">{title}</h2>
          <p className="text-[12px] text-muted">{hint}</p>
        </div>
        <Button type="button" size="sm" variant="outline" className="no-print" onClick={onAdd}>
          <Plus /> Add line
        </Button>
      </div>
      <div className="overflow-x-auto rounded-lg border border-line">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="bg-ink text-paper">
              <th className="px-2 py-2 text-left font-display text-[11px] uppercase">Category</th>
              <th className="w-28 px-2 py-2 text-right font-display text-[11px] uppercase">Planned</th>
              <th className="w-28 px-2 py-2 text-right font-display text-[11px] uppercase">Actual</th>
              <th className="w-28 px-2 py-2 text-right font-display text-[11px] uppercase">Difference</th>
              <th className="px-2 py-2 text-left font-display text-[11px] uppercase">Note</th>
              <th className="no-print w-12 px-1 py-2" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const diff = row.planned - row.actual;
              return (
                <tr key={row.id} className="border-t border-line">
                  <td className="px-1 py-1">
                    <input
                      value={row.name}
                      onChange={(e) => onChange(row.id, { name: e.target.value })}
                      className="h-10 w-full rounded-md bg-transparent px-2 outline-none ring-ring focus:bg-sheet focus:ring-2"
                    />
                  </td>
                  <td className="px-1 py-1">
                    <MoneyInput value={row.planned} onChange={(n) => onChange(row.id, { planned: n })} />
                  </td>
                  <td className="px-1 py-1">
                    <MoneyInput value={row.actual} onChange={(n) => onChange(row.id, { actual: n })} />
                  </td>
                  <td
                    className={cn(
                      "px-3 py-1 text-right font-mono text-xs tabular-nums",
                      diff < 0 ? "text-cell-miss-ink" : "text-ink-soft",
                    )}
                  >
                    {money(diff)}
                  </td>
                  <td className="px-1 py-1">
                    <input
                      value={row.note}
                      onChange={(e) => onChange(row.id, { note: e.target.value })}
                      placeholder="Optional"
                      className="h-10 w-full rounded-md bg-transparent px-2 outline-none ring-ring placeholder:text-muted focus:bg-sheet focus:ring-2"
                    />
                  </td>
                  <td className="no-print px-1 py-1 text-center">
                    <button
                      type="button"
                      onClick={() => onRemove(row.id)}
                      className="inline-flex size-10 items-center justify-center rounded-md text-muted hover:bg-paper-2 hover:text-stamp"
                      aria-label={`Remove ${row.name}`}
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
            {rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-3 py-4 text-sm text-muted">
                  No lines. Tap Add line.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function MoneyInput({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <input
      type="number"
      inputMode="decimal"
      min={0}
      step={1}
      value={Number.isFinite(value) ? value : 0}
      onChange={(e) => {
        const n = Number(e.target.value);
        onChange(Number.isFinite(n) ? Math.max(0, n) : 0);
      }}
      className="h-10 w-full rounded-md bg-transparent px-2 text-right font-mono text-sm tabular-nums outline-none ring-ring focus:bg-sheet focus:ring-2"
    />
  );
}

function TotalRow({
  label,
  planned,
  actual,
  strong,
}: {
  label: string;
  planned: number;
  actual: number;
  strong?: boolean;
}) {
  const diff = planned - actual;
  return (
    <tr className={cn("border-t border-line", strong && "bg-paper-2")}>
      <td className="px-3 py-2 font-display text-sm uppercase">{label}</td>
      <td className="px-3 py-2 text-right font-mono text-sm tabular-nums">{money(planned)}</td>
      <td className="px-3 py-2 text-right font-mono text-sm tabular-nums">{money(actual)}</td>
      <td className={cn("px-3 py-2 text-right font-mono text-sm tabular-nums", diff < 0 && "text-cell-miss-ink")}>
        {money(diff)}
      </td>
      <td className="px-3 py-2" colSpan={2} />
    </tr>
  );
}
