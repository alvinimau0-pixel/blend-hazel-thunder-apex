import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  tone = "ink",
  ...props
}: ComponentProps<"span"> & {
  tone?: "ink" | "done" | "miss" | "risk" | "track" | "stamp";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em]",
        tone === "ink" && "bg-paper-2 text-ink-soft",
        tone === "done" && "bg-cell-done text-cell-done-ink",
        tone === "miss" && "bg-cell-miss text-cell-miss-ink",
        tone === "risk" && "bg-cell-risk text-cell-risk-ink",
        tone === "track" && "border border-line text-muted",
        tone === "stamp" && "bg-stamp/10 text-stamp",
        className,
      )}
      {...props}
    />
  );
}
