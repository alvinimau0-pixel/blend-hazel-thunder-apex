import { useEffect, useRef, useState } from "react";
import { useOpsActions } from "@/lib/use-ops";

const KEY = "gm-auto-report-v1";
const GAP_MS = 10 * 60_000;

export function useAutoReport(asOf: string) {
  const { publishDay } = useOpsActions();
  const [on, setOn] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.localStorage.getItem(KEY) !== "off";
  });
  const [lastAt, setLastAt] = useState<number | null>(null);
  const lastRun = useRef(0);
  const pending = useRef(false);
  const mutateRef = useRef(publishDay.mutate);
  mutateRef.current = publishDay.mutate;

  useEffect(() => {
    window.localStorage.setItem(KEY, on ? "on" : "off");
  }, [on]);

  useEffect(() => {
    if (!on) return;

    const run = () => {
      const now = Date.now();
      if (pending.current) return;
      if (now - lastRun.current < GAP_MS && lastRun.current !== 0) return;
      pending.current = true;
      lastRun.current = now;
      mutateRef.current(asOf, {
        onSettled: () => {
          pending.current = false;
        },
        onSuccess: () => setLastAt(Date.now()),
      });
    };

    run();
    const id = window.setInterval(run, GAP_MS);
    const onFocus = () => run();
    window.addEventListener("focus", onFocus);
    return () => {
      window.clearInterval(id);
      window.removeEventListener("focus", onFocus);
    };
  }, [on, asOf]);

  return {
    on,
    setOn,
    lastAt,
    publishing: publishDay.isPending,
    publishNow: () =>
      publishDay.mutate(asOf, {
        onSuccess: () => setLastAt(Date.now()),
      }),
  };
}

export function formatPulled(ms: number | null): string {
  if (!ms) return "not yet";
  return new Date(ms).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kuala_Lumpur",
  });
}
