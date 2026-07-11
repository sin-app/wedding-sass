-- =====================================================================
-- Wedding SaaS — Schema, RLS, Triggers, Seed
-- Jalankan di Supabase SQL Editor
-- =====================================================================

-- ---------- Tables ----------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'user' check (role in ('user','admin')),
  created_at timestamptz default now()
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan text not null default 'free' check (plan in ('free','premium')),
  status text not null default 'active' check (status in ('active','pending','expired')),
  starts_at timestamptz,
  expires_at timestamptz,
  note text,
  updated_at timestamptz default now(),
  unique (user_id)
);

create table if not exists public.templates (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  thumbnail text,
  is_active boolean not null default true,
  premium boolean not null default false,
  created_at timestamptz default now()
);

create table if not exists public.invitations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  template_id uuid references public.templates(id),
  slug text unique not null,
  title text not null default 'Undangan Baru',
  status text not null default 'draft' check (status in ('draft','published')),
  data jsonb not null default '{}'::jsonb,
  views int not null default 0,
  created_at timestamptz default now()
);

create table if not exists public.guests (
  id uuid primary key default gen_random_uuid(),
  invitation_id uuid not null references public.invitations(id) on delete cascade,
  name text not null,
  group_name text,
  token text not null,
  opened boolean not null default false,
  created_at timestamptz default now()
);

create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  invitation_id uuid not null references public.invitations(id) on delete cascade,
  guest_id uuid references public.guests(id) on delete set null,
  name text not null,
  attendance text not null check (attendance in ('hadir','tidak','ragu')),
  guest_count int default 1,
  message text,
  created_at timestamptz default now()
);

create table if not exists public.wishes (
  id uuid primary key default gen_random_uuid(),
  invitation_id uuid not null references public.invitations(id) on delete cascade,
  name text not null,
  message text not null,
  created_at timestamptz default now()
);

create index if not exists idx_invitations_user on public.invitations(user_id);
create index if not exists idx_guests_invitation on public.guests(invitation_id);
create index if not exists idx_rsvps_invitation on public.rsvps(invitation_id);
create index if not exists idx_wishes_invitation on public.wishes(invitation_id);

-- ---------- Helper: is_admin ----------
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- ---------- Auto-create profile + free subscription on signup ----------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''));

  insert into public.subscriptions (user_id, plan, status)
  values (new.id, 'free', 'active');

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- Atomic view counter ----------
create or replace function public.increment_views(inv_id uuid)
returns void
language sql
security definer
set search_path = public
as $$
  update public.invitations set views = views + 1 where id = inv_id;
$$;

-- =====================================================================
-- RLS
-- =====================================================================
alter table public.profiles      enable row level security;
alter table public.subscriptions enable row level security;
alter table public.templates     enable row level security;
alter table public.invitations   enable row level security;
alter table public.guests        enable row level security;
alter table public.rsvps         enable row level security;
alter table public.wishes        enable row level security;

-- profiles
drop policy if exists "profiles self read" on public.profiles;
create policy "profiles self read" on public.profiles
  for select using (id = auth.uid() or public.is_admin());
drop policy if exists "profiles self update" on public.profiles;
create policy "profiles self update" on public.profiles
  for update using (id = auth.uid() or public.is_admin());

-- subscriptions
drop policy if exists "subs self read" on public.subscriptions;
create policy "subs self read" on public.subscriptions
  for select using (user_id = auth.uid() or public.is_admin());
drop policy if exists "subs admin write" on public.subscriptions;
create policy "subs admin write" on public.subscriptions
  for all using (public.is_admin()) with check (public.is_admin());

-- templates: publik boleh baca yang aktif; admin kelola
drop policy if exists "templates read" on public.templates;
create policy "templates read" on public.templates
  for select using (is_active or public.is_admin());
drop policy if exists "templates admin write" on public.templates;
create policy "templates admin write" on public.templates
  for all using (public.is_admin()) with check (public.is_admin());

-- invitations: pemilik penuh; publik baca yang published; admin penuh
drop policy if exists "inv owner all" on public.invitations;
create policy "inv owner all" on public.invitations
  for all using (user_id = auth.uid() or public.is_admin())
  with check (user_id = auth.uid() or public.is_admin());
drop policy if exists "inv public read" on public.invitations;
create policy "inv public read" on public.invitations
  for select using (status = 'published');

-- guests: hanya pemilik undangan / admin
drop policy if exists "guests owner all" on public.guests;
create policy "guests owner all" on public.guests
  for all using (
    exists (select 1 from public.invitations i
            where i.id = invitation_id
              and (i.user_id = auth.uid() or public.is_admin()))
  )
  with check (
    exists (select 1 from public.invitations i
            where i.id = invitation_id
              and (i.user_id = auth.uid() or public.is_admin()))
  );

-- rsvps: publik boleh insert; pemilik/admin baca
drop policy if exists "rsvps public insert" on public.rsvps;
create policy "rsvps public insert" on public.rsvps
  for insert to anon, authenticated with check (true);
drop policy if exists "rsvps owner read" on public.rsvps;
create policy "rsvps owner read" on public.rsvps
  for select using (
    exists (select 1 from public.invitations i
            where i.id = invitation_id
              and (i.user_id = auth.uid() or public.is_admin()))
  );

-- wishes: publik insert & read; pemilik/admin delete
drop policy if exists "wishes public insert" on public.wishes;
create policy "wishes public insert" on public.wishes
  for insert to anon, authenticated with check (true);
drop policy if exists "wishes public read" on public.wishes;
create policy "wishes public read" on public.wishes
  for select using (true);
drop policy if exists "wishes owner delete" on public.wishes;
create policy "wishes owner delete" on public.wishes
  for delete using (
    exists (select 1 from public.invitations i
            where i.id = invitation_id
              and (i.user_id = auth.uid() or public.is_admin()))
  );

-- rsvps: pemilik/admin boleh hapus (moderasi spam)
drop policy if exists "rsvps owner delete" on public.rsvps;
create policy "rsvps owner delete" on public.rsvps
  for delete using (
    exists (select 1 from public.invitations i
            where i.id = invitation_id
              and (i.user_id = auth.uid() or public.is_admin()))
  );

-- =====================================================================
-- Storage bucket (foto undangan)
-- =====================================================================
insert into storage.buckets (id, name, public)
values ('invitations', 'invitations', true)
on conflict (id) do nothing;

drop policy if exists "inv storage read" on storage.objects;
create policy "inv storage read" on storage.objects
  for select using (bucket_id = 'invitations');
drop policy if exists "inv storage write" on storage.objects;
create policy "inv storage write" on storage.objects
  for insert to authenticated with check (bucket_id = 'invitations');
drop policy if exists "inv storage update" on storage.objects;
create policy "inv storage update" on storage.objects
  for update to authenticated using (bucket_id = 'invitations');
drop policy if exists "inv storage delete" on storage.objects;
create policy "inv storage delete" on storage.objects
  for delete to authenticated using (bucket_id = 'invitations');

-- =====================================================================
-- Batas jumlah undangan per paket (atomik, cegah race condition)
-- Sinkron dengan config/plans.ts: free = 1, premium = 10
-- =====================================================================
create or replace function public.enforce_invitation_limit()
returns trigger
language plpgsql
as $$
declare
  v_plan text;
  v_max  int;
begin
  select plan into v_plan from public.subscriptions where user_id = new.user_id;
  v_max := case coalesce(v_plan, 'free') when 'premium' then 10 else 1 end;
  if (select count(*) from public.invitations where user_id = new.user_id) >= v_max then
    raise exception 'Batas paket tercapai (%)', v_max;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_inv_limit on public.invitations;
create trigger trg_inv_limit
  before insert on public.invitations
  for each row execute function public.enforce_invitation_limit();

-- =====================================================================
-- Seed templates
-- =====================================================================
insert into public.templates (slug, name, thumbnail, premium) values
  ('classic', 'Classic Elegant', null, false),
  ('floral', 'Floral Romance', null, true),
  ('minimalist', 'Modern Minimalist', null, true),
  ('luxury', 'Luxury Gold', null, true)
on conflict (slug) do nothing;

-- =====================================================================
-- Jadikan user admin (jalankan manual setelah register):
--   update public.profiles set role = 'admin' where id = 'UUID_USER';
-- =====================================================================
