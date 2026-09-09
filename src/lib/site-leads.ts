const KEY = "gm-site-leads-v1";

export const SITE_SERVICES = [
  { id: "cw", label: "Cold water (CW)" },
  { id: "san", label: "Sanitary (SAN)" },
  { id: "irr", label: "Irrigation (IRR)" },
  { id: "weld", label: "Welding" },
  { id: "repair", label: "Repair" },
  { id: "other", label: "Other site work" },
] as const;

export const SITE_URGENCY = [
  { id: "week", label: "This week — on the board" },
  { id: "next", label: "Next visit" },
  { id: "quote", label: "Quote only" },
] as const;

export type SiteLead = {
  id: string;
  name: string;
  phone: string;
  service: string;
  urgency: string;
  area: string;
  message: string;
  createdAt: string;
};

export function loadSiteLeads(): SiteLead[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SiteLead[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveSiteLead(lead: Omit<SiteLead, "id" | "createdAt">): SiteLead {
  const next: SiteLead = {
    ...lead,
    id: `${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  const all = [next, ...loadSiteLeads()].slice(0, 40);
  window.localStorage.setItem(KEY, JSON.stringify(all));
  return next;
}
