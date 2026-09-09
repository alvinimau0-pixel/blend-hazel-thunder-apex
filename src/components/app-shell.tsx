import { Link, useRouterState } from "@tanstack/react-router";
import {
  AlertTriangle,
  BarChart3,
  Building2,
  ClipboardCheck,
  ClipboardList,
  FileStack,
  GanttChart,
  Globe,
  LayoutGrid,
  Menu,
  Receipt,
  Table2,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { AsOfContext } from "@/lib/as-of";
import { COMPANY, REPORT_DATE } from "@/lib/company";
import { useProject } from "@/lib/project";
import { cn, formatStamp, todayIso } from "@/lib/utils";
import { Letterhead } from "@/components/letterhead";
import { AddProjectDialog } from "@/components/ops-ui";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useOps } from "@/lib/use-ops";

type NavItemDef = {
  to: "/" | "/msk" | "/issues" | "/papers" | "/people" | "/sub-claim" | "/eval-claim" | "/hod" | "/progress" | "/pay" | "/matrix" | "/plan" | "/building" | "/office" | "/budget" | "/flyer" | "/site" | "/dash";
  label: string;
  short?: string;
  icon: LucideIcon;
};

const NAV: NavItemDef[] = [
  { to: "/", label: "Home", short: "Home", icon: ClipboardList },
  { to: "/dash", label: "Charts", short: "Charts", icon: BarChart3 },
  { to: "/msk", label: "MSK board", short: "MSK", icon: Table2 },
  { to: "/issues", label: "Problems", short: "Issues", icon: AlertTriangle },
  { to: "/people", label: "Workers", short: "Crew", icon: Users },
];

const MORE: NavItemDef[] = [
  { to: "/papers", label: "Drawings & PO", icon: FileStack },
  { to: "/sub-claim", label: "Sub claim", icon: ClipboardCheck },
  { to: "/eval-claim", label: "Evaluation claim", icon: Receipt },
  { to: "/hod", label: "Share site", icon: Globe },
  { to: "/progress", label: "Reports", icon: ClipboardList },
  { to: "/pay", label: "Pay", icon: Wallet },
  { to: "/budget", label: "Budget", icon: Wallet },
  { to: "/matrix", label: "Toilet board", icon: LayoutGrid },
  { to: "/plan", label: "Work plan", icon: GanttChart },
  { to: "/building", label: "Building", icon: Building2 },
  { to: "/office", label: "Office", icon: Users },
  { to: "/flyer", label: "One-pager", icon: FileStack },
];

const fieldClass =
  "h-9 rounded-md border border-line bg-panel px-2 font-mono text-xs tabular-nums outline-none transition-[border-color,box-shadow] duration-150 focus:border-accent focus:ring-2 focus:ring-ring";

function NavLinks({ onClick }: { onClick?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="flex flex-col gap-1">
      <p className="px-3 pb-1 font-display text-[10px] uppercase tracking-[0.16em] text-muted">Site</p>
      {NAV.map((item) => (
        <NavItem key={item.to} {...item} active={pathname === item.to} onClick={onClick} />
      ))}
      <p className="mt-4 px-3 pb-1 font-display text-[10px] uppercase tracking-[0.16em] text-muted">More</p>
      {MORE.map((item) => (
        <NavItem key={item.to} {...item} active={pathname === item.to} onClick={onClick} />
      ))}
    </nav>
  );
}

function NavItem({
  to,
  label,
  icon: Icon,
  active,
  onClick,
}: NavItemDef & { active: boolean; onClick?: () => void }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex min-h-11 items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-[background-color,color,transform] duration-150 ease-out active:scale-[0.98]",
        active ? "bg-ink text-paper" : "text-ink-soft hover:bg-paper-2",
      )}
    >
      <Icon className="size-4 shrink-0" />
      <span className="font-display text-[14px] uppercase leading-tight tracking-[0.1em]">{label}</span>
    </Link>
  );
}

function ProjectPicker() {
  const { project, projects, setProjectId } = useProject();
  const ops = useOps();
  const waiting = (ops.isLoading || ops.isFetching) && projects.length === 0;

  return (
    <div className="flex min-w-0 flex-1 items-center gap-1.5">
      <label className="min-w-0 flex-1 sm:flex-none">
        <span className="sr-only">Choose project</span>
        {waiting ? (
          <Skeleton className="h-9 w-full rounded-md sm:w-44" />
        ) : projects.length === 0 ? (
          <span className="block h-9 truncate rounded-md border border-dashed border-line bg-panel px-2 py-2 font-display text-[12px] uppercase tracking-[0.08em] text-muted">
            No project yet
          </span>
        ) : (
          <select
            value={project?.id ?? ""}
            onChange={(e) => setProjectId(Number(e.target.value))}
            className="h-9 w-full max-w-full truncate rounded-md border border-line bg-sheet px-2 font-display text-[12px] uppercase tracking-[0.08em] outline-none transition-[border-color,box-shadow] duration-150 focus:border-accent focus:ring-2 focus:ring-ring sm:w-auto sm:max-w-[14rem]"
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        )}
      </label>
      <AddProjectDialog />
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [asOf, setAsOf] = useState(() => todayIso());
  const value = useMemo(() => ({ asOf, setAsOf }), [asOf]);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { project } = useProject();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/hod") {
    return <AsOfContext.Provider value={value}>{children}</AsOfContext.Provider>;
  }

  return (
    <AsOfContext.Provider value={value}>
      <div className="min-h-dvh overflow-x-hidden bg-paper text-ink">
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(1200px_circle_at_10%_-10%,rgba(47,68,90,0.06),transparent_55%)]" />
        <header
          className={cn(
            "no-print sticky top-0 z-30 bg-sheet pt-[env(safe-area-inset-top)] transition-[box-shadow] duration-200 ease-out",
            scrolled && "shadow-[var(--shadow-sticky)]",
          )}
        >
          <div className="mx-auto flex max-w-[1400px] items-center gap-2 px-4 py-2.5 sm:gap-3">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <Letterhead asOf={asOf} compact />
                <p className="mt-2 text-xs text-muted">{project?.name ?? COMPANY.project}</p>
                <div className="mt-6">
                  <NavLinks onClick={() => setOpen(false)} />
                </div>
                <SheetClose asChild>
                  <Button variant="outline" className="mt-auto">
                    Close
                  </Button>
                </SheetClose>
              </SheetContent>
            </Sheet>
            <div className="min-w-0 flex-1">
              <Letterhead asOf={asOf} compact />
            </div>
            <div className="hidden sm:block">
              <ProjectPicker />
            </div>
            <label className="hidden flex-col md:flex">
              <span className="font-display text-[10px] uppercase tracking-[0.16em] text-muted">As of</span>
              <input
                type="date"
                value={asOf}
                onChange={(e) => setAsOf(e.target.value)}
                className={fieldClass}
              />
            </label>
            <div className="hidden rounded-md border border-stamp/30 bg-stamp/10 px-3 py-1.5 text-stamp lg:block">
              <p className="font-display text-lg font-semibold uppercase leading-none tracking-wide">
                {formatStamp(asOf)}
              </p>
            </div>
          </div>
          <div className="mx-auto flex max-w-[1400px] items-center gap-2 px-4 pb-2 sm:hidden">
            <ProjectPicker />
            <label className="shrink-0">
              <span className="sr-only">As of</span>
              <input
                type="date"
                value={asOf}
                onChange={(e) => setAsOf(e.target.value)}
                className={cn(fieldClass, "text-[11px]")}
              />
            </label>
          </div>
          <div className="h-px bg-ink" />
        </header>

        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 px-4 py-5 lg:grid-cols-[13.5rem_1fr] lg:py-7">
          <aside className="no-print hidden lg:block">
            <div className="sticky top-24 rounded-xl bg-panel p-3 shadow-docket">
              <NavLinks />
              <div className="mt-5 border-t border-line pt-4">
                <p className="font-display text-[10px] uppercase tracking-[0.16em] text-muted">Report date</p>
                <input
                  type="date"
                  value={asOf}
                  onChange={(e) => setAsOf(e.target.value)}
                  className="mt-2 h-10 w-full rounded-md border border-line bg-paper px-2 font-mono text-xs outline-none transition-[border-color,box-shadow] duration-150 focus:border-accent focus:ring-2 focus:ring-ring"
                />
                <p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-muted">
                  Last sheet {formatStamp(REPORT_DATE)}
                </p>
              </div>
              <p className="mt-4 text-[10px] uppercase tracking-[0.14em] text-muted">
                Internal · {COMPANY.legal}
              </p>
            </div>
          </aside>
          <main className="min-w-0 pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-8">
            <div key={pathname} className="page-enter">
              {children}
            </div>
          </main>
        </div>

        <nav className="no-print fixed inset-x-0 bottom-0 z-30 border-t border-line bg-panel/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
          <div className="grid grid-cols-5">
            {NAV.map((item) => (
              <BottomLink key={item.to} {...item} />
            ))}
          </div>
        </nav>
      </div>
    </AsOfContext.Provider>
  );
}

function BottomLink({ to, label, short, icon: Icon }: NavItemDef) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const active = pathname === to;
  return (
    <Link
      to={to}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative flex min-h-14 flex-col items-center justify-center gap-0.5 px-1 text-[10px] uppercase tracking-[0.12em] transition-[color] duration-150",
        active ? "text-ink" : "text-muted",
      )}
    >
      <span
        className={cn(
          "absolute inset-x-1.5 top-1.5 bottom-1.5 rounded-lg bg-paper-2 transition-opacity duration-150 ease-out",
          active ? "opacity-100" : "opacity-0",
        )}
      />
      <Icon className="relative size-4" />
      <span className="relative">{short ?? label}</span>
    </Link>
  );
}
