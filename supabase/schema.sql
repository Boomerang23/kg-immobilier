-- KG Immobilier — Supabase schema
-- Run in Supabase SQL Editor (Dashboard → SQL → New query)

-- Extensions
create extension if not exists "pgcrypto";

-- Admin profiles (link auth.users to admin access)
create table if not exists public.admin_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  full_name text,
  role text not null default 'admin' check (role in ('super_admin', 'admin')),
  created_at timestamptz not null default now()
);

-- Properties
create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  price text not null,
  location text not null,
  type text not null check (type in ('Appartement', 'Villa')),
  status text not null check (status in ('Location', 'Vente')),
  description text not null default '',
  bedrooms integer not null default 0,
  bathrooms integer not null default 0,
  parking integer not null default 0,
  area integer not null default 0,
  cover_image_url text not null default '',
  features text[] not null default '{}',
  featured boolean not null default false,
  furnished boolean not null default false,
  floors integer not null default 1,
  year_built integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Property gallery images
create table if not exists public.property_images (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties (id) on delete cascade,
  url text not null,
  storage_path text,
  alt_text text,
  sort_order integer not null default 0,
  is_cover boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists property_images_property_id_idx on public.property_images (property_id);
create index if not exists properties_slug_idx on public.properties (slug);
create index if not exists properties_status_idx on public.properties (status);
create index if not exists admin_profiles_role_idx on public.admin_profiles (role);

-- Updated_at trigger
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists properties_updated_at on public.properties;
create trigger properties_updated_at
  before update on public.properties
  for each row execute function public.set_updated_at();

-- Admin check helpers
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_profiles where id = auth.uid()
  );
$$;

create or replace function public.is_super_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_profiles
    where id = auth.uid() and role = 'super_admin'
  );
$$;

-- Prevent removing/demoting the last super_admin
create or replace function public.enforce_last_super_admin()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  super_count integer;
begin
  if tg_op = 'DELETE' and old.role = 'super_admin' then
    select count(*) into super_count
    from public.admin_profiles
    where role = 'super_admin';

    if super_count <= 1 then
      raise exception 'Cannot delete the last super_admin';
    end if;
  end if;

  if tg_op = 'UPDATE' and old.role = 'super_admin' and new.role <> 'super_admin' then
    select count(*) into super_count
    from public.admin_profiles
    where role = 'super_admin';

    if super_count <= 1 then
      raise exception 'Cannot demote the last super_admin';
    end if;
  end if;

  return coalesce(new, old);
end;
$$;

drop trigger if exists admin_profiles_last_super_admin on public.admin_profiles;
create trigger admin_profiles_last_super_admin
  before update or delete on public.admin_profiles
  for each row execute function public.enforce_last_super_admin();

-- Row Level Security
alter table public.admin_profiles enable row level security;
alter table public.properties enable row level security;
alter table public.property_images enable row level security;

-- admin_profiles policies
create policy "Admins can read own profile"
  on public.admin_profiles for select
  to authenticated
  using (auth.uid() = id);

create policy "Super admins can read all profiles"
  on public.admin_profiles for select
  to authenticated
  using (public.is_super_admin());

create policy "Super admins can update profiles"
  on public.admin_profiles for update
  to authenticated
  using (public.is_super_admin())
  with check (public.is_super_admin());

create policy "Super admins can delete profiles"
  on public.admin_profiles for delete
  to authenticated
  using (public.is_super_admin());

-- properties policies (admin + super_admin)
create policy "Public can read properties"
  on public.properties for select
  to anon, authenticated
  using (true);

create policy "Admins can insert properties"
  on public.properties for insert
  to authenticated
  with check (public.is_admin());

create policy "Admins can update properties"
  on public.properties for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins can delete properties"
  on public.properties for delete
  to authenticated
  using (public.is_admin());

-- property_images policies
create policy "Public can read property images"
  on public.property_images for select
  to anon, authenticated
  using (true);

create policy "Admins can insert property images"
  on public.property_images for insert
  to authenticated
  with check (public.is_admin());

create policy "Admins can update property images"
  on public.property_images for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins can delete property images"
  on public.property_images for delete
  to authenticated
  using (public.is_admin());

-- Storage bucket (create via Dashboard or API)
-- Bucket name: property-images (public read)

insert into storage.buckets (id, name, public)
values ('property-images', 'property-images', true)
on conflict (id) do update set public = true;

-- Storage policies
create policy "Public read property images bucket"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'property-images');

create policy "Admins upload property images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'property-images' and public.is_admin());

create policy "Admins update property images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'property-images' and public.is_admin());

create policy "Admins delete property images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'property-images' and public.is_admin());

-- =============================================================================
-- First super_admin (run once after creating the Auth user)
-- =============================================================================
-- 1. Authentication → Users → Add user (angegbocho@gmail.com + password)
-- 2. Copy the user UUID, then run:
--
-- insert into public.admin_profiles (id, email, full_name, role)
-- values ('USER-UUID-HERE', 'angegbocho@gmail.com', 'Ange Gbocho', 'super_admin');
--
-- For existing deployments, run: supabase/migrations/20260601000000_add_admin_roles.sql
