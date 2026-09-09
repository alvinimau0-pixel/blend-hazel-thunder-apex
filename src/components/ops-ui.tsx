import type { FormEvent, ReactNode } from "react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Inbox, Plus, type LucideIcon } from "lucide-react";
import { toast } from "sonner";
import { useOps, useOpsActions } from "@/lib/use-ops";
import { useProject } from "@/lib/project";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input, Label } from "@/components/ui/input";
import { EmptyState, ErrorState, PageSkeleton, Spinner } from "@/components/status-states";
import { statusTone } from "@/lib/ops";
import { cn } from "@/lib/utils";

export function OpsGate({ children }: { children: ReactNode }) {
  const q = useOps();
  if (q.isLoading && !q.data) {
    return <PageSkeleton />;
  }
  if (!q.data) {
    return (
      <ErrorState
        title="Desk unavailable"
        hint={q.error instanceof Error ? q.error.message : "Could not load."}
        onRetry={() => void q.refetch()}
      />
    );
  }
  return <>{children}</>;
}

export function StatusChip({ status }: { status: string }) {
  return <Badge tone={statusTone(status)}>{status}</Badge>;
}

export function Segmented<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { id: T; label: string }[];
}) {
  const cols = options.length === 3 ? "grid-cols-3" : "grid-cols-2";
  return (
    <div className={cn("grid gap-1.5", cols, options.length > 3 && "sm:grid-cols-4")}>
      {options.map((o) => (
        <Button
          key={o.id}
          size="lg"
          variant={value === o.id ? "default" : "outline"}
          className="min-h-11 w-full whitespace-normal px-2 text-center leading-tight"
          onClick={() => onChange(o.id)}
          aria-pressed={value === o.id}
        >
          {o.label}
        </Button>
      ))}
    </div>
  );
}

export function PageHead({
  kicker,
  title,
  hint,
  action,
}: {
  kicker: string;
  title: string;
  hint: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className="font-display text-[11px] uppercase tracking-[0.2em] text-muted">{kicker}</p>
        <h1 className="mt-1 font-display text-3xl font-semibold uppercase tracking-wide">{title}</h1>
        <p className="mt-1 max-w-xl text-sm text-ink-soft">{hint}</p>
      </div>
      {action}
    </div>
  );
}

export function EmptyDesk({
  text,
  title = "Nothing here",
  action,
  icon: Icon = Inbox,
}: {
  text: string;
  title?: string;
  action?: ReactNode;
  icon?: LucideIcon;
}) {
  return <EmptyState icon={Icon} title={title} hint={text} action={action} />;
}

export function FormGrid({
  children,
  onSubmit,
  busy,
}: {
  children: ReactNode;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  busy?: boolean;
}) {
  return (
    <form onSubmit={onSubmit} className="grid gap-3 sm:grid-cols-2">
      {children}
      <div className="sm:col-span-2">
        <Button type="submit" disabled={busy}>
          {busy ? (
            <>
              <Spinner /> Saving…
            </>
          ) : (
            "Save"
          )}
        </Button>
      </div>
    </form>
  );
}

export function SiteLink({ to, label }: { to: "/msk" | "/daily" | "/matrix"; label: string }) {
  return (
    <Link to={to} className="inline-flex items-center text-xs uppercase tracking-[0.14em] text-accent">
      {label}
    </Link>
  );
}

export function RowCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <li
      className={cn(
        "rounded-xl bg-panel px-4 py-3 shadow-docket transition-[background-color] duration-150",
        className,
      )}
    >
      {children}
    </li>
  );
}

export function AddProjectDialog({ variant = "icon" }: { variant?: "icon" | "card" }) {
  const { setProjectId } = useProject();
  const { addProject } = useOpsActions();
  const [open, setOpen] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    addProject.mutate(
      {
        name: String(fd.get("name")),
        client: String(fd.get("client")),
        location: String(fd.get("location") || ""),
      },
      {
        onSuccess: (ops) => {
          const created = ops.projects[ops.projects.length - 1];
          if (created) setProjectId(created.id);
          toast.success("Project added");
          setOpen(false);
        },
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {variant === "card" ? (
          <button
            type="button"
            className="rounded-lg border border-dashed border-line-strong bg-paper-2 px-3 py-3 text-left transition-[background-color,transform] duration-150 ease-out hover:bg-line active:scale-[0.98]"
          >
            <p className="font-display text-lg font-semibold uppercase tracking-wide">New project</p>
            <p className="mt-1 text-xs text-muted">Name, client, location</p>
          </button>
        ) : (
          <Button variant="ghost" size="icon" aria-label="Add project">
            <Plus className="size-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>New project</DialogTitle>
        <form onSubmit={onSubmit} className="mt-3 space-y-3">
          <div>
            <Label>Name</Label>
            <Input name="name" required className="mt-1" placeholder="Project name" />
          </div>
          <div>
            <Label>Client</Label>
            <Input name="client" required className="mt-1" />
          </div>
          <div>
            <Label>Location</Label>
            <Input name="location" className="mt-1" />
          </div>
          <Button type="submit" disabled={addProject.isPending}>
            {addProject.isPending ? (
              <>
                <Spinner /> Adding…
              </>
            ) : (
              "Add project"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function ProjectCards() {
  const { project, projects, setProjectId } = useProject();
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {projects.map((p) => {
        const on = p.id === project?.id;
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => setProjectId(p.id)}
            className={cn(
              "min-h-14 rounded-lg px-3 py-3 text-left transition-[background-color,color,transform] duration-150 ease-out active:scale-[0.98]",
              on ? "bg-ink text-paper" : "bg-paper-2 text-ink hover:bg-line",
            )}
          >
            <p className="font-display text-lg font-semibold uppercase tracking-wide">{p.name}</p>
            <p className={cn("mt-1 text-xs", on ? "text-paper/70" : "text-muted")}>
              {p.clientName}
              {p.location ? ` · ${p.location}` : ""}
            </p>
          </button>
        );
      })}
      <AddProjectDialog variant="card" />
    </div>
  );
}
