import { useMemo } from "react";
import { toast } from "sonner";
import { Spinner } from "@/components/status-states";
import { Button } from "@/components/ui/button";
import type { OpsAttend, OpsPerson } from "@/lib/ops";
import { WORKER_ROLL } from "@/lib/work-scope";
import { cn } from "@/lib/utils";

const MARKS = ["", "P", "X", "OT"] as const;
type Mark = (typeof MARKS)[number];

function nextMark(cur: Mark): Mark {
  const i = MARKS.indexOf(cur);
  return MARKS[(i + 1) % MARKS.length] ?? "";
}

function daysInMonth(month: string) {
  const [y, m] = month.split("-").map(Number);
  return new Date(y, m, 0).getDate();
}

function sortWorkers(rows: OpsPerson[]) {
  const rank = new Map(WORKER_ROLL.map((n, i) => [n.toUpperCase(), i]));
  return [...rows].sort((a, b) => {
    const ra = rank.get(a.name.toUpperCase()) ?? 900 + a.name.localeCompare(b.name);
    const rb = rank.get(b.name.toUpperCase()) ?? 900 + b.name.localeCompare(a.name);
    return ra - rb;
  });
}

export function WorkerMonthGrid({
  month,
  onMonth,
  workers,
  attendance,
  projectId,
  onMark,
  pending,
}: {
  month: string;
  onMonth: (m: string) => void;
  workers: OpsPerson[];
  attendance: OpsAttend[];
  projectId: number;
  onMark: (data: { projectId: number; personId: number; dated: string; mark: Mark }) => void;
  pending?: boolean;
}) {
  const days = daysInMonth(month);
  const rows = useMemo(() => sortWorkers(workers), [workers]);
  const map = useMemo(() => {
    const m = new Map<string, Mark>();
    for (const a of attendance) {
      if (a.dated.startsWith(month)) m.set(`${a.personId}:${a.dated}`, a.mark);
    }
    return m;
  }, [attendance, month]);

  const presentByDay = useMemo(() => {
    const counts = Array.from({ length: days }, () => 0);
    for (const a of attendance) {
      if (!a.dated.startsWith(month) || (a.mark !== "P" && a.mark !== "OT")) continue;
      const d = Number(a.dated.slice(8, 10));
      if (d >= 1 && d <= days) counts[d - 1] += 1;
    }
    return counts;
  }, [attendance, month, days]);

  return (
    <section className="overflow-hidden rounded-xl bg-panel shadow-docket">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-3">
        <div>
          <p className="font-display text-[11px] uppercase tracking-[0.16em] text-muted">GM workers</p>
          <h2 className="font-display text-xl uppercase tracking-wide">Attendance · {month}</h2>
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
        Tap a cell: blank → P present → X off → OT. No rates on this sheet.
        {pending ? (
          <span className="ml-2 inline-flex items-center gap-1 font-display text-[11px] uppercase tracking-[0.12em] text-muted">
            <Spinner className="size-3" /> Saving
          </span>
        ) : null}
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-max border-collapse text-[11px]">
          <thead>
            <tr className="bg-paper-2">
              <th className="sticky left-0 z-10 min-w-28 border-b border-r border-line bg-paper-2 px-2 py-2 text-left font-display text-[11px] uppercase tracking-[0.12em]">
                Name
              </th>
              {Array.from({ length: days }, (_, i) => (
                <th
                  key={i}
                  className="min-w-9 border-b border-line px-0 py-2 text-center font-mono font-normal tabular-nums text-muted"
                >
                  {i + 1}
                </th>
              ))}
              <th className="min-w-10 border-b border-l border-line px-1 py-2 text-center font-display text-[10px] uppercase text-muted">
                P
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((w) => {
              let present = 0;
              const cells = Array.from({ length: days }, (_, i) => {
                const dated = `${month}-${String(i + 1).padStart(2, "0")}`;
                const mark = (map.get(`${w.id}:${dated}`) ?? "") as Mark;
                if (mark === "P" || mark === "OT") present += 1;
                return { dated, mark, day: i + 1 };
              });
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
                        onClick={() => {
                          const next = nextMark(c.mark);
                          onMark({ projectId, personId: w.id, dated: c.dated, mark: next });
                          if (next) toast.success(`${w.name} ${c.day} · ${next}`);
                        }}
                        className={cn(
                          "flex h-9 w-9 items-center justify-center font-display text-[11px] uppercase",
                          c.mark === "P" && "bg-cell-done text-cell-done-ink",
                          c.mark === "X" && "bg-cell-miss text-cell-miss-ink",
                          c.mark === "OT" && "bg-cell-risk text-cell-risk-ink",
                        )}
                      >
                        {c.mark || ""}
                      </button>
                    </td>
                  ))}
                  <td className="border-b border-l border-line text-center font-mono tabular-nums text-ink-soft">
                    {present}
                  </td>
                </tr>
              );
            })}
            <tr>
              <th className="sticky left-0 z-10 border-t border-r border-line bg-paper-2 px-2 py-2 text-left font-display text-[11px] uppercase text-muted">
                On site
              </th>
              {presentByDay.map((n, i) => (
                <td key={i} className="border-t border-line py-1 text-center font-mono text-[10px] tabular-nums text-muted">
                  {n || ""}
                </td>
              ))}
              <td className="border-t border-l border-line" />
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
