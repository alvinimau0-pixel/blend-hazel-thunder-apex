alter table site_meta add column if not exists msk_rev text not null default '';

create table if not exists msk_items (
  id serial primary key,
  seq integer not null unique,
  code text not null unique,
  name text not null,
  short_name text not null,
  trade text not null,
  trade_weight numeric not null
);

create table if not exists msk_levels (
  id serial primary key,
  code text not null unique,
  sort_order integer not null,
  zone text not null,
  ffl text not null
);

create table if not exists msk_progress (
  level_id integer not null references msk_levels(id),
  tower text not null,
  item_id integer not null references msk_items(id),
  pct integer not null default 0,
  na boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (level_id, tower, item_id)
);

create table if not exists msk_assignments (
  id serial primary key,
  work_date date not null,
  crew_id integer not null references crew(id),
  level_id integer not null references msk_levels(id),
  tower text not null,
  item_id integer not null references msk_items(id),
  start_pct integer not null,
  claimed_pct integer,
  note text,
  photo_data text,
  verified boolean not null default false,
  rejected boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists msk_assignments_date_idx on msk_assignments (work_date);
