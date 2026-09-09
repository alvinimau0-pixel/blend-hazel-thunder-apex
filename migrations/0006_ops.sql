create table if not exists ops_meta (
  id integer primary key,
  ops_rev text not null default ''
);

create table if not exists ops_projects (
  id serial primary key,
  code text not null unique,
  name text not null,
  client_name text not null,
  location text not null default '',
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists ops_drawings (
  id serial primary key,
  project_id integer not null references ops_projects(id),
  title text not null,
  ref_no text not null,
  discipline text not null,
  rev text not null default 'A',
  dated text not null,
  status text not null default 'current',
  file_href text not null default ''
);

create table if not exists ops_pos (
  id serial primary key,
  project_id integer not null references ops_projects(id),
  po_no text not null,
  supplier text not null,
  dated text not null,
  material text not null,
  amount integer not null default 0,
  status text not null default 'issued',
  ping text not null default 'Zilla'
);

create table if not exists ops_receives (
  id serial primary key,
  project_id integer not null references ops_projects(id),
  do_no text not null,
  po_id integer references ops_pos(id),
  dated text not null,
  received_by text not null,
  qty_note text not null default '',
  status text not null default 'received'
);

create table if not exists ops_claims (
  id serial primary key,
  project_id integer not null references ops_projects(id),
  claim_no text not null,
  title text not null,
  period text not null,
  dated text not null,
  amount integer not null default 0,
  certified integer not null default 0,
  status text not null default 'draft',
  ping text not null default 'Jenny'
);

create table if not exists ops_reports (
  id serial primary key,
  project_id integer not null references ops_projects(id),
  cadence text not null,
  period text not null,
  dated text not null,
  lock_pct integer not null default 0,
  summary text not null default '',
  status text not null default 'draft',
  prepared_by text not null default 'Mus / Alvin / Hakim'
);

create table if not exists ops_people (
  id serial primary key,
  project_id integer not null references ops_projects(id),
  kind text not null,
  name text not null,
  trade text not null default '',
  contractor text not null default 'GM',
  daily_rate integer not null default 0,
  active boolean not null default true
);

create table if not exists ops_salary (
  id serial primary key,
  project_id integer not null references ops_projects(id),
  person_id integer not null references ops_people(id),
  month text not null,
  basic integer not null default 0,
  ot integer not null default 0,
  advance integer not null default 0,
  net integer not null default 0,
  status text not null default 'open',
  unique (person_id, month)
);

create table if not exists ops_advances (
  id serial primary key,
  project_id integer not null references ops_projects(id),
  person_id integer not null references ops_people(id),
  dated text not null,
  amount integer not null,
  reason text not null default '',
  recovered boolean not null default false
);

create unique index if not exists ops_pos_no_idx on ops_pos (project_id, po_no);
create unique index if not exists ops_claims_no_idx on ops_claims (project_id, claim_no);
