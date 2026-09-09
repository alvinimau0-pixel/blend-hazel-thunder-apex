import type { ReactNode } from "react";
import { BoardSkeleton, ErrorState } from "@/components/status-states";
import { useSite } from "@/lib/use-site";
import type { SiteSnapshot } from "@/lib/domain";

export function SiteGate({ children, live }: { children: (site: SiteSnapshot) => ReactNode; live?: boolean }) {
  const q = useSite({ live });
  if (q.isLoading && !q.data) {
    return <BoardSkeleton />;
  }
  if (!q.data) {
    return (
      <ErrorState
        title="Board unavailable"
        hint={q.error instanceof Error ? q.error.message : "Could not load sequencing data."}
        onRetry={() => void q.refetch()}
      />
    );
  }
  return <>{children(q.data)}</>;
}
