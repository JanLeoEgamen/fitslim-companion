-- ============================================================================
-- FitSlim AI™ — profiles schema (reconcile)
-- The remote project already contains a public.profiles table (plus preferences,
-- saved_items, grocery_items, provider_questions, daily_focus, chat_messages,
-- academy_* etc.). This migration reconciles profiles for authentication &
-- admin user management: it adds name/email/role/status/last_active, admin RLS
-- policies, and an is_admin() helper.
-- Safe to re-run: every statement is idempotent.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Extend profiles with auth + admin-management fields
-- ---------------------------------------------------------------------------

alter table public.profiles
  add column if not exists name text not null default '';

alter table public.profiles
  add column if not exists email text;

alter table public.profiles
  add column if not exists role text not null default 'member';

alter table public.profiles
  add column if not exists status text not null default 'active';

alter table public.profiles
  add column if not exists last_active timestamptz;

alter table public.profiles
  drop constraint if exists profiles_role_check;
alter table public.profiles
  add constraint profiles_role_check check (role in ('admin', 'member'));

alter table public.profiles
  drop constraint if exists profiles_status_check;
alter table public.profiles
  add constraint profiles_status_check check (status in ('active', 'invited', 'suspended'));

-- member_id: keep unique index, backfill any legacy NULLs, and give new rows a
-- generated FS-… value via the trigger below (no DB default to avoid racing).
update public.profiles
set member_id = 'FS-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 5))
where member_id is null;

-- ---------------------------------------------------------------------------
-- 2. Auto-create profile (+ preferences row) on signup
-- ---------------------------------------------------------------------------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  meta jsonb := coalesce(new.raw_user_meta_data, '{}'::jsonb);
begin
  insert into public.profiles (id, name, first_name, email, role, status, member_id)
  values (
    new.id,
    coalesce(meta->>'name', split_part(coalesce(new.email, ''), '@', 1)),
    coalesce(meta->>'first_name', split_part(coalesce(new.email, ''), '@', 1)),
    new.email,
    coalesce(meta->>'role', 'member'),
    'active',
    'FS-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 5))
  )
  on conflict (id) do nothing;

  insert into public.preferences (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- 3. updated_at helper (already present in the remote project; keep it current)
-- ---------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- 4. Admin helper + RLS policies
--    Members can read/update their own row (existing policies). Admins get
--    full access. The service role (server functions) bypasses RLS entirely.
-- ---------------------------------------------------------------------------

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  );
$$;

drop policy if exists profiles_select_admin on public.profiles;
create policy profiles_select_admin on public.profiles
  for select to authenticated
  using (public.is_admin());

drop policy if exists profiles_insert_admin on public.profiles;
create policy profiles_insert_admin on public.profiles
  for insert to authenticated
  with check (public.is_admin());

drop policy if exists profiles_update_admin on public.profiles;
create policy profiles_update_admin on public.profiles
  for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists profiles_delete_admin on public.profiles;
create policy profiles_delete_admin on public.profiles
  for delete to authenticated
  using (public.is_admin());

-- Keep the existing per-user policies if they ever get dropped.
drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own on public.profiles
  for select to authenticated
  using (auth.uid() = id);

drop policy if exists profiles_insert_own on public.profiles;
create policy profiles_insert_own on public.profiles
  for insert to authenticated
  with check (auth.uid() = id);

drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own on public.profiles
  for update to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id and role = 'member');

drop policy if exists profiles_delete_own on public.profiles;
create policy profiles_delete_own on public.profiles
  for delete to authenticated
  using (auth.uid() = id);