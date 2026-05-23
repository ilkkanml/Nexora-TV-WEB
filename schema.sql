-- Nexora TV lisans ve cihaz aktivasyon semasi
-- Hedef: PostgreSQL

create table users (
  id uuid primary key default gen_random_uuid(),
  email text unique,
  display_name text,
  role text not null default 'customer' check (role in ('customer', 'reseller', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table devices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete set null,
  device_identifier text not null unique,
  device_key_hash text not null,
  platform text not null,
  model text,
  status text not null default 'pending' check (status in ('pending', 'active', 'suspended')),
  created_at timestamptz not null default now(),
  last_seen_at timestamptz,
  last_sync_at timestamptz
);

create table resellers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete set null,
  name text not null,
  code text not null unique,
  credits integer not null default 0 check (credits >= 0),
  status text not null default 'active' check (status in ('active', 'disabled')),
  created_at timestamptz not null default now()
);

create table license_plans (
  id text primary key,
  name text not null,
  price_cents integer not null check (price_cents >= 0),
  duration_days integer not null check (duration_days > 0),
  reseller_credit_cost integer not null default 1 check (reseller_credit_cost > 0),
  is_active boolean not null default true
);

create table licenses (
  id uuid primary key default gen_random_uuid(),
  device_id uuid not null references devices(id) on delete cascade,
  reseller_id uuid references resellers(id) on delete set null,
  plan_id text not null references license_plans(id),
  payment_provider text,
  payment_reference text unique,
  source text not null default 'direct' check (source in ('direct', 'reseller-code', 'reseller-panel', 'admin')),
  status text not null default 'active' check (status in ('active', 'disabled', 'refunded', 'expired')),
  activated_at timestamptz,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

create table iptv_sources (
  id uuid primary key default gen_random_uuid(),
  device_id uuid not null references devices(id) on delete cascade,
  name text not null,
  portal_url text not null,
  username text not null,
  password_encrypted text not null,
  status text not null default 'pending' check (status in ('pending', 'synced', 'failed', 'disabled')),
  created_at timestamptz not null default now(),
  synced_at timestamptz
);

create table reseller_credit_transactions (
  id uuid primary key default gen_random_uuid(),
  reseller_id uuid not null references resellers(id) on delete cascade,
  license_id uuid references licenses(id) on delete set null,
  amount integer not null,
  reason text not null,
  created_at timestamptz not null default now()
);

create table activation_events (
  id uuid primary key default gen_random_uuid(),
  device_id uuid references devices(id) on delete cascade,
  license_id uuid references licenses(id) on delete set null,
  event_type text not null,
  ip_address inet,
  user_agent text,
  created_at timestamptz not null default now()
);

create table admin_audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid references users(id) on delete set null,
  action text not null,
  entity_type text,
  entity_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index idx_devices_identifier on devices(device_identifier);
create index idx_licenses_device_status on licenses(device_id, status);
create index idx_iptv_sources_device on iptv_sources(device_id);
create index idx_reseller_transactions_reseller on reseller_credit_transactions(reseller_id);
