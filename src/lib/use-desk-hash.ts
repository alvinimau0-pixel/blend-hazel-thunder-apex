import { useNavigate, useRouterState } from "@tanstack/react-router";
import { parseHash } from "@/lib/ops";

export function useDeskHash<T extends string>(allowed: readonly T[], fallback: T): [T, (next: T) => void] {
  const navigate = useNavigate();
  const hash = useRouterState({ select: (s) => s.location.hash });
  const value = parseHash(hash, allowed, fallback);

  function set(next: T) {
    void navigate({ to: ".", hash: next, replace: true });
  }

  return [value, set];
}
