/** 24 Aug team sheet + 2 Sep allocation. Subs listed, never auto-assigned. */
export type WorkKind = "gm" | "sub";

export type WorkScopeRow = {
  who: string;
  kind: WorkKind;
  work: string;
  detail: string;
  seq?: number;
  level?: string;
  tower?: "A" | "B";
  auto?: boolean;
};

export const SUB_SCOPE: WorkScopeRow[] = [
  {
    who: "Aipoon",
    kind: "sub",
    work: "Toilet + tenant L24–L30 · TA & TB",
    detail: "L27 both: 4 outlets + 6 tenants. L26 0%. L25B–L24B outlet only. TA L24–L25 0%. Not auto-assigned.",
  },
  {
    who: "Aryan",
    kind: "sub",
    work: "SS welding L13–31M · TA & TB",
    detail: "Transfer 100% L13–L21 both. L22 up not started. Not auto-assigned.",
  },
  {
    who: "Kolik",
    kind: "sub",
    work: "Sanitary fitting",
    detail: "Not auto-assigned.",
  },
];

export type GmTeam = {
  id: number | "lead";
  name: string;
  leader: string;
  crew: string[];
  specialty: string;
  today: string;
  anyJob: boolean;
  seq?: number;
  level?: string;
  tower?: "A" | "B";
};

/** Only Supaham, Asgar (team 2) and Jillur (team 6) may be auto-moved to any job. */
export const GM_TEAMS: GmTeam[] = [
  {
    id: "lead",
    name: "Overall",
    leader: "Supaham",
    crew: ["Supaham"],
    specialty: "Any job",
    today: "Float — any package",
    anyJob: true,
  },
  {
    id: 1,
    name: "Team 1",
    leader: "Solihin",
    crew: ["Solihin", "Ashraful", "Jiarul", "Yasin"],
    specialty: "Coring",
    today: "Coring",
    anyJob: false,
  },
  {
    id: 2,
    name: "Team 2",
    leader: "Asgar",
    crew: ["Asgar", "Rana"],
    specialty: "Pumps",
    today: "L13 replacing pumps",
    anyJob: true,
  },
  {
    id: 3,
    name: "Team 3",
    leader: "Suhairi",
    crew: ["Suhairi", "Supendi"],
    specialty: "Pipe sleeve",
    today: "Pipe sleeve",
    anyJob: false,
    seq: 1,
    level: "L31",
    tower: "A",
  },
  {
    id: 4,
    name: "Team 4",
    leader: "Bilal",
    crew: ["Bilal", "Farhad", "Sofikul", "Amirul", "Nurul", "Nazmul"],
    specialty: "Concealed pipe",
    today: "Concealed pipe",
    anyJob: false,
    seq: 10,
    level: "L26",
    tower: "A",
  },
  {
    id: 5,
    name: "Team 5",
    leader: "Jewel",
    crew: ["Jewel", "Badol"],
    specialty: "Irrigation outlet",
    today: "Irrigation outlet",
    anyJob: false,
    seq: 13,
    level: "L18",
    tower: "A",
  },
  {
    id: 6,
    name: "Team 6",
    leader: "Jillur",
    crew: ["Jillur", "Islam"],
    specialty: "Tenant",
    today: "L13 tenant",
    anyJob: true,
    seq: 6,
    level: "L13",
    tower: "A",
  },
  {
    id: 7,
    name: "Team 7",
    leader: "Sarip",
    crew: ["Sarip", "Syahib"],
    specialty: "Backshaft",
    today: "Backshaft",
    anyJob: false,
    seq: 7,
    level: "L16",
    tower: "A",
  },
  {
    id: 8,
    name: "Team 8",
    leader: "Emon",
    crew: ["Emon", "Mahmud"],
    specialty: "Tenant",
    today: "Tenant L21",
    anyJob: false,
    seq: 6,
    level: "L21",
    tower: "A",
  },
  {
    id: 9,
    name: "Team 9",
    leader: "Ibnu",
    crew: ["Ibnu", "Damil"],
    specialty: "Floortrap",
    today: "Floortrap",
    anyJob: false,
    seq: 8,
    level: "L21",
    tower: "A",
  },
  {
    id: 10,
    name: "Team 10",
    leader: "Kamal",
    crew: ["Kamal"],
    specialty: "Housekeeping",
    today: "Housekeeping",
    anyJob: false,
  },
];

export const GM_SCOPE: WorkScopeRow[] = GM_TEAMS.map((t) => ({
  who: `${t.name} · ${t.leader}`,
  kind: "gm" as const,
  work: t.today,
  detail: `${t.crew.join(" · ")} · ${t.anyJob ? "Can take any job" : `Specialty only · ${t.specialty}`}`,
  seq: t.seq,
  level: t.level,
  tower: t.tower,
  auto: t.anyJob,
}));

export const NOW_SCOPE: WorkScopeRow[] = [...SUB_SCOPE, ...GM_SCOPE];

export const FLOAT_LEADERS = ["Supaham", "Asgar", "Jillur"] as const;

/** Attendance sheet order from the 24 Aug grid. Kamal once. */
export const WORKER_ROLL = [
  "Supaham",
  "Solihin",
  "Asgar",
  "Suhairi",
  "Bilal",
  "Jewel",
  "Jillur",
  "Sarip",
  "Emon",
  "Ibnu",
  "Kamal",
  "Yasin",
  "Sofikul",
  "Nazmul",
  "Mahmud",
  "Nurul",
  "Jiarul",
  "Supendi",
  "Rana",
  "Ashraful",
  "Farhad",
  "Badol",
  "Islam",
  "Syahib",
  "Amirul",
  "Damil",
] as const;
