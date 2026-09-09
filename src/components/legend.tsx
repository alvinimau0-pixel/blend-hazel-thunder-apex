import { STATUS_LABEL, type CellStatus } from "@/lib/domain";
import { cn } from "@/lib/utils";

const TONE: Record<CellStatus, string> = {
  done: "bg-cell-done",
  missed: "bg-cell-miss",
  risk: "bg-cell-risk",
  track: "border border-line bg-panel",
};

export function Legend({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.12em] text-muted", className)}>
      {(Object.keys(STATUS_LABEL) as CellStatus[]).map((k) => (
        <li key={k} className="flex items-center gap-1.5">
          <span className={cn("size-3 rounded-[2px]", TONE[k])} />
          {STATUS_LABEL[k]}
        </li>
      ))}
    </ul>
  );
}

export function cellTone(status: CellStatus): string {
  switch (status) {
    case "done":
      return "bg-cell-done text-cell-done-ink";
    case "missed":
      return "bg-cell-miss text-cell-miss-ink";
    case "risk":
      return "bg-cell-risk text-cell-risk-ink";
    default:
      return "bg-cell-track text-cell-track-ink";
  }
}
