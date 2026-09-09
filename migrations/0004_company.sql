alter table site_meta add column if not exists company_name text not null default 'Gelaran Maju Sdn Bhd';
alter table site_meta add column if not exists company_rev text not null default '';
