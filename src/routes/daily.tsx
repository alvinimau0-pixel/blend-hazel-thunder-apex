import { createFileRoute } from "@tanstack/react-router";
import { SiteGate } from "@/components/site-gate";
import { TodayBoard } from "@/components/today-board";

export const Route = createFileRoute("/daily")({ component: DailyPage });

function DailyPage() {
  return (
    <SiteGate>
      {(site) => (
        <div className="space-y-4">
          <div>
            <h1 className="font-display text-3xl font-semibold uppercase tracking-wide">Daily update</h1>
            <p className="mt-1 max-w-md text-sm text-ink-soft">GM save writes the board. Same as Daily update on the home page.</p>
          </div>
          <TodayBoard site={site} who="gm" />
        </div>
      )}
    </SiteGate>
  );
}
