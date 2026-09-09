import { createContext, useContext } from "react";
import { todayIso } from "@/lib/utils";

export const AsOfContext = createContext<{
  asOf: string;
  setAsOf: (iso: string) => void;
}>({ asOf: todayIso(), setAsOf: () => undefined });

export function useAsOf() {
  return useContext(AsOfContext);
}
