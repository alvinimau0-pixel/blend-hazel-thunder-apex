import type { ReactNode } from "react";
import { Loader2, type LucideIcon, RefreshCw, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function Spinner({ className }: { className?: string }) {
  return <Loader2 className={cn("size-4 animate-spin", className)} aria-hidden />;
}

export function EmptyState({
  icon: Icon,
  title,
  hint,
  action,
  className,
}: {
  icon?: LucideIcon;
  title: string;
  hint?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-xl bg-panel px-5 py-8 text-center shadow-docket sm:px-8 sm:py-10", className)}>
      {Icon ? (
        <div className="mx-auto flex size-12 items-center justify-center rounded-lg bg-paper-2 text-muted">
          <Icon className="size-5" strokeWidth={1.75} />
        </div>
      ) : null}
      <p className={cn("font-display text-xl font-semibold uppercase tracking-wide", Icon && "mt-4")}>{title}</p>
      {hint ? <p className="mx-auto mt-2 max-w-sm text-sm text-ink-soft">{hint}</p> : null}
      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </div>
  );
}

export function EmptyInline({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="flex flex-col items-center py-5 text-center">
      <p className="font-display text-sm uppercase tracking-[0.14em] text-muted">{title}</p>
      {hint ? <p className="mt-1 max-w-sm text-sm text-muted">{hint}</p> : null}
    </div>
  );
}

export function ErrorState({
  title,
  hint,
  onRetry,
}: {
  title: string;
  hint?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="rounded-xl bg-panel p-6 shadow-docket sm:p-8">
      <div className="flex size-11 items-center justify-center rounded-lg bg-stamp/10 text-stamp">
        <TriangleAlert className="size-5" />
      </div>
      <p className="mt-4 font-display text-2xl font-semibold uppercase tracking-wide">{title}</p>
      {hint ? <p className="mt-2 max-w-md text-sm text-muted">{hint}</p> : null}
      {onRetry ? (
        <Button className="mt-4" variant="outline" onClick={onRetry}>
          <RefreshCw /> Try again
        </Button>
      ) : null}
    </div>
  );
}

export function PageSkeleton({ label = "Loading desk…" }: { label?: string }) {
  return (
    <div className="space-y-5" role="status" aria-live="polite" aria-busy="true">
      <div className="space-y-2">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-9 w-44" />
        <Skeleton className="h-4 w-72 max-w-full" />
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <Skeleton className="h-11 rounded-lg" />
        <Skeleton className="h-11 rounded-lg" />
      </div>
      <Skeleton className="h-40 w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-16 w-full rounded-xl" />
        <Skeleton className="h-16 w-full rounded-xl" />
        <Skeleton className="h-16 w-full rounded-xl" />
      </div>
      <p className="flex items-center gap-2 font-display text-sm uppercase tracking-[0.16em] text-muted">
        <Spinner className="size-3.5" />
        {label}
      </p>
    </div>
  );
}

export function BoardSkeleton({ label = "Loading Gelaran Maju board…" }: { label?: string }) {
  return (
    <div className="space-y-5" role="status" aria-live="polite" aria-busy="true">
      <div className="space-y-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-9 w-36" />
      </div>
      <div className="rounded-xl bg-panel p-4 shadow-docket sm:p-5">
        <Skeleton className="h-3 w-36" />
        <Skeleton className="mt-3 h-12 w-28" />
        <div className="mt-4 grid grid-cols-3 gap-2">
          <Skeleton className="h-16 rounded-lg" />
          <Skeleton className="h-16 rounded-lg" />
          <Skeleton className="h-16 rounded-lg" />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Skeleton className="h-8 rounded-md" />
          <Skeleton className="h-8 rounded-md" />
        </div>
      </div>
      <div className="rounded-xl bg-panel p-4 shadow-docket sm:p-5">
        <Skeleton className="h-5 w-32" />
        <div className="mt-4 space-y-3">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
      <p className="flex items-center gap-2 font-display text-sm uppercase tracking-[0.16em] text-muted">
        <Spinner className="size-3.5" />
        {label}
      </p>
    </div>
  );
}
