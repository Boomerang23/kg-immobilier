-- Migration: role-based admin access control
-- Run in Supabase SQL Editor if not using Supabase CLI migrations

-- Role column
alter table public.admin_profiles
  add column if not exists role text not null default 'admin';

alter table public.admin_profiles
  drop constraint if exists admin_profiles_role_check;

alter table public.admin_profiles
  add constraint admin_profiles_role_check
  check (role in ('super_admin', 'admin'));

-- First super_admin (Ange)
update public.admin_profiles
set role = 'super_admin', email = 'angegbocho@gmail.com'
where email = 'angegbocho@gmail.com';

-- Helpers
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

-- RLS: replace admin_profiles policies
drop policy if exists "Admins can read own profile" on public.admin_profiles;
drop policy if exists "Super admins can read all profiles" on public.admin_profiles;
drop policy if exists "Super admins can update profiles" on public.admin_profiles;
drop policy if exists "Super admins can delete profiles" on public.admin_profiles;

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
