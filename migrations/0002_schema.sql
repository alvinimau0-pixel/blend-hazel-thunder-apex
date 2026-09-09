create table if not exists site_meta (
  id integer primary key,
  project_name text not null,
  project_code text not null,
  subject text not null,
  section text not null,
  client_name text not null,
  seeded_at timestamptz not null default now()
);

create table if not exists activities (
  id serial primary key,
  seq integer not null unique,
  name text not null,
  contractor text not null,
  gm_trade boolean not null default false
);

create table if not exists floors (
  id serial primary key,
  code text not null unique,
  sort_order integer not null
);

create table if not exists toilets (
  id serial primary key,
  code text not null unique,
  tower text not null
);

create table if not exists floor_dates (
  floor_id integer not null references floors(id),
  activity_id integer not null references activities(id),
  due_on date not null,
  primary key (floor_id, activity_id)
);

create table if not exists progress (
  floor_id integer not null references floors(id),
  toilet_id integer not null references toilets(id),
  activity_id integer not null references activities(id),
  pct integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (floor_id, toilet_id, activity_id)
);

create table if not exists crew (
  id serial primary key,
  callsign text not null unique,
  contractor text not null,
  trade text not null,
  active boolean not null default true
);

create table if not exists assignments (
  id serial primary key,
  work_date date not null,
  crew_id integer not null references crew(id),
  floor_id integer not null references floors(id),
  toilet_id integer not null references toilets(id),
  activity_id integer not null references activities(id),
  start_pct integer not null,
  claimed_pct integer,
  note text,
  photo_data text,
  verified boolean not null default false,
  rejected boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists assignments_date_idx on assignments (work_date);

create table if not exists audit_log (
  id serial primary key,
  created_at timestamptz not null default now(),
  kind text not null,
  floor_code text not null,
  toilet_code text not null,
  activity_seq integer not null,
  from_pct integer,
  to_pct integer,
  crew_callsign text,
  note text
);

create index if not exists audit_log_created_idx on audit_log (created_at desc);
