import { COMPANY } from "@/lib/company";
import { cn } from "@/lib/utils";

export function CompanyMark({ className }: { className?: string }) {
  return (
    <img
      src="/plans/gm-logo-sm.jpg"
      srcSet="/plans/gm-logo-sm.jpg 180w, /plans/gm-logo.jpg 512w"
      sizes="64px"
      alt={COMPANY.legal}
      className={cn("shrink-0 rounded-full bg-sheet object-cover", className)}
    />
  );
}
