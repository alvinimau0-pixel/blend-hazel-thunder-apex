export const OPS_REV = "ops-2026-09-03-attend";

export const PROJECT_SEED = [
  {
    code: "capitol",
    name: "The Capitol",
    client: "BUC / The Capitol",
    location: "Kuala Lumpur · Towers A & B",
    status: "active",
  },
] as const;

export const DRAWING_SEED = [
  { ref: "CAP-SEC-20260720", title: "Diagrammatic section B4 to helipad", disc: "Architecture", rev: "1", dated: "2026-07-20", status: "current", href: "/plans/diagrammatic-2026-07-20.pdf" },
  { ref: "CAP-GF-20260605", title: "Overall layout GF — leasing", disc: "Leasing", rev: "A", dated: "2026-06-05", status: "current", href: "/plans/gf.jpg" },
  { ref: "CAP-1F-20260605", title: "Overall layout 1F — leasing", disc: "Leasing", rev: "A", dated: "2026-06-05", status: "current", href: "/plans/l1.jpg" },
  { ref: "PLD-LG-20251203", title: "Podium marketing layout LG", disc: "Podium", rev: "A", dated: "2025-12-03", status: "current", href: "/plans/lg.jpg" },
  { ref: "PLD-B1-20251203", title: "Podium marketing layout B1", disc: "Podium", rev: "A", dated: "2025-12-03", status: "current", href: "/plans/b1.jpg" },
  { ref: "PLD-3F-20251203", title: "Podium marketing layout 3F", disc: "Podium", rev: "A", dated: "2025-12-03", status: "current", href: "/plans/l3.jpg" },
  { ref: "PLD-4F-20251203", title: "Podium marketing layout 4F", disc: "Podium", rev: "A", dated: "2025-12-03", status: "current", href: "/plans/l4.jpg" },
  { ref: "GM-TOI-20260828", title: "Toilet section 1 sequencing", disc: "Plumbing", rev: "28 AUG", dated: "2026-08-28", status: "current", href: "" },
  { ref: "GM-MSK-20260829", title: "MSK progress matrix TA/TB L13–31M", disc: "Plumbing", rev: "29 AUG", dated: "2026-08-29", status: "current", href: "" },
] as const;

export const PO_SEED = [
  { po: "GM-PO-2401", supplier: "PPR Pipe Supply Sdn Bhd", dated: "2026-07-14", material: "PPR PN20 mainstack & distribution", amount: 186400, status: "received" },
  { po: "GM-PO-2402", supplier: "UPVC Outlet Trading", dated: "2026-07-22", material: "UPVC outlet & floor trap", amount: 64200, status: "partial" },
  { po: "GM-PO-2403", supplier: "Sanitary Ware House", dated: "2026-08-04", material: "WC, basin, tap — toilet section 1", amount: 128900, status: "issued" },
  { po: "GM-PO-2404", supplier: "Stainless Steel Pipe Co", dated: "2026-08-11", material: "SS pipe tenant outlets L13–L20", amount: 97350, status: "issued" },
  { po: "GM-PO-2405", supplier: "Irrigation Parts MY", dated: "2026-08-18", material: "Irrigation outlet & wiring", amount: 41200, status: "draft" },
] as const;

export const RECEIVE_SEED = [
  { doNo: "DO-2401-A", po: "GM-PO-2401", dated: "2026-07-28", by: "Alvin", qty: "Full load — PPR mainstack", status: "received" },
  { doNo: "DO-2401-B", po: "GM-PO-2401", dated: "2026-08-06", by: "Alvin", qty: "Balance distribution fittings", status: "received" },
  { doNo: "DO-2402-A", po: "GM-PO-2402", dated: "2026-08-09", by: "Alvin", qty: "Partial — 60% UPVC. Balance next week", status: "partial" },
] as const;

export const CLAIM_SEED = [
  {
    no: "PC35",
    title: "Cold water & sanitary — June",
    period: "Jun 2026",
    dated: "2026-06-25",
    amount: 2_140_000,
    certified: 2_140_000,
    status: "paid",
  },
  {
    no: "PC36",
    title: "Cold water and sanitary plumbing services",
    period: "Jul 2026",
    dated: "2026-07-25",
    amount: 2_930_938,
    certified: 2_930_938,
    status: "certified",
  },
  {
    no: "PC37",
    title: "Cold water, sanitary & irrigation — August",
    period: "Aug 2026",
    dated: "2026-08-28",
    amount: 1_850_000,
    certified: 0,
    status: "draft",
  },
] as const;

export const REPORT_SEED = [
  {
    cadence: "daily",
    period: "1 Sep 2026",
    dated: "2026-09-01",
    lock: 40,
    summary:
      "1 Sep Aipoon tenant. Lock 40%. SAN 40%. Tenant L24–L25 TB all outlets done. L27 TA & TB 4 of 12 outlets (33%). L26 not complete. Photos still needed.",
    status: "issued",
  },
  {
    cadence: "daily",
    period: "29 Aug 2026",
    dated: "2026-08-29",
    lock: 37,
    summary:
      "Official 29 Aug sheet. Lock 37%. Transfer TA L14 50%, TB L13 100%. Backshaft L14–15 100%. SAN toilets L23–28 TB reversed to 0. Dist L22/L26 moving. Aipoon SAN tenant L23 TA waiting check.",
    status: "issued",
  },
  {
    cadence: "daily",
    period: "28 Aug 2026",
    dated: "2026-08-28",
    lock: 36,
    summary: "MSK lock 36%. L13 skipped while L14 started. Jewel claimed 0→40 without photo. TA transfer stuck at L14 10%.",
    status: "issued",
  },
  {
    cadence: "daily",
    period: "27 Aug 2026",
    dated: "2026-08-27",
    lock: 36,
    summary: "Official MSK sheet applied. CW 46%, SAN behind, IRR outlets on low floors only.",
    status: "issued",
  },
  {
    cadence: "weekly",
    period: "Week 31 Aug–6 Sep 2026",
    dated: "2026-09-01",
    lock: 40,
    summary: "Week 31 Aug–6 Sep. Lock 40%. SAN 40%. Aipoon tenant L24–L25 TB done, L27 4 outlets, L26 not complete.",
    status: "issued",
  },
  {
    cadence: "weekly",
    period: "Week 24–29 Aug 2026",
    dated: "2026-08-29",
    lock: 37,
    summary: "Week close on the 29 Aug sheet. Lock 37%. Holes on L13 CW tenant/backshaft. TB sanitary toilets L23–28 reversed. Waiting tiles/vanity for fittings.",
    status: "issued",
  },
  {
    cadence: "monthly",
    period: "August 2026",
    dated: "2026-09-01",
    lock: 40,
    summary: "August close on 1 Sep. Lock 40%. SAN toilets L23–L27 TA & TB. Wares L24–L25 TB. Aipoon tenant L24–L25 TB done, L27 4 outlets, L26 not complete. PC36 certified 25 Jul. PC37 draft for Jenny.",
    status: "issued",
  },
] as const;

export const WORKER_SEED = [
  { name: "Supaham", trade: "Team leader", rate: 2000 },
  { name: "Solihin", trade: "Coring", rate: 1000 },
  { name: "Ashraful", trade: "Coring", rate: 500 },
  { name: "Jiarul", trade: "Coring", rate: 0 },
  { name: "Yasin", trade: "Coring", rate: 500 },
  { name: "Asgar", trade: "Pumps", rate: 500 },
  { name: "Rana", trade: "Pumps", rate: 500 },
  { name: "Suhairi", trade: "Pipe sleeve", rate: 700 },
  { name: "Supendi", trade: "Pipe sleeve", rate: 500 },
  { name: "Bilal", trade: "Concealed pipe", rate: 500 },
  { name: "Farhad", trade: "Concealed pipe", rate: 500 },
  { name: "Sofikul", trade: "Concealed pipe", rate: 1000 },
  { name: "Amirul", trade: "Concealed pipe", rate: 500 },
  { name: "Nurul", trade: "Concealed pipe", rate: 500 },
  { name: "Nazmul", trade: "Concealed pipe", rate: 500 },
  { name: "Jewel", trade: "Irrigation outlet", rate: 500 },
  { name: "Badol", trade: "Irrigation outlet", rate: 500 },
  { name: "Jillur", trade: "Tenant", rate: 500 },
  { name: "Islam", trade: "Tenant", rate: 500 },
  { name: "Sarip", trade: "Backshaft", rate: 700 },
  { name: "Syahib", trade: "Backshaft", rate: 500 },
  { name: "Emon", trade: "Tenant", rate: 500 },
  { name: "Mahmud", trade: "Tenant", rate: 500 },
  { name: "Ibnu", trade: "Floortrap", rate: 500 },
  { name: "Damil", trade: "Floortrap", rate: 500 },
  { name: "Kamal", trade: "Housekeeping", rate: 500 },
  { name: "Lihin", trade: "Piping", rate: 500 },
] as const;

export const GM_PLUMBING_SUBS = [
  { name: "Aipoon", trade: "Toilet + tenant L24–L30" },
  { name: "Aryan", trade: "SS welding" },
  { name: "Kolik", trade: "Sanitary fitting" },
] as const;

export const SUB_SEED = GM_PLUMBING_SUBS;

export const ADVANCE_SEED = [
  { name: "Jewel", dated: "2026-08-12", amount: 400, reason: "Family", recovered: true },
  { name: "Nazmul", dated: "2026-08-18", amount: 300, reason: "Site stay", recovered: false },
  { name: "Kamal", dated: "2026-08-21", amount: 200, reason: "Advance", recovered: false },
  { name: "Islam", dated: "2026-08-25", amount: 250, reason: "Tools", recovered: false },
] as const;
