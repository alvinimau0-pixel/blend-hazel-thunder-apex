import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-md border border-line bg-panel px-3 text-base text-ink outline-none ring-ring placeholder:text-muted transition-[border-color,box-shadow] duration-150 focus:border-accent focus:ring-2 sm:h-10 sm:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "min-h-20 w-full rounded-md border border-line bg-panel px-3 py-2 text-sm text-ink outline-none ring-ring placeholder:text-muted transition-[border-color,box-shadow] duration-150 focus:border-accent focus:ring-2",
        className,
      )}
      {...props}
    />
  );
}

export function Label({ className, ...props }: ComponentProps<"label">) {
  return (
    <label
      className={cn(
        "font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-muted",
        className,
      )}
      {...props}
    />
  );
}
