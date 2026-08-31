-- ============================================================================
-- FitSlim AI™ — member-data RLS for provider_questions
-- The hosted project has provider_questions with RLS enabled but no per-user
-- policies and no way to stamp user_id on insert. Every member write is
-- rejected with:
--   new row violates row-level security policy for table "provider_questions"
-- This migration mirrors the grocery_items/saved_items fixes: adds user_id if
-- missing, a before-insert trigger that stamps user_id = auth.uid(), per-user
-- SELECT/INSERT/UPDATE/DELETE policies, and an admin SELECT policy.
-- Idempotent (safe to re-run).
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Ensure the user_id column exists (no-op when already present)
-- ---------------------------------------------------------------------------
alter table public.provider_questions
  add column if not exists user_id uuid;

-- ---------------------------------------------------------------------------
-- 2. Stamp user_id = auth.uid() on insert (unless already provided)
-- ---------------------------------------------------------------------------
create or replace function public.set_provider_questions_user_id()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.user_id is null then
    new.user_id := auth.uid();
  end if;
  return new;
end;
$$;

drop trigger if exists provider_questions_set_user_id on public.provider_questions;
create trigger provider_questions_set_user_id
  before insert on public.provider_questions
  for each row execute function public.set_provider_questions_user_id();

-- ---------------------------------------------------------------------------
-- 3. Per-user RLS policies (mirrors the saved_items pattern)
-- ---------------------------------------------------------------------------
drop policy if exists provider_questions_select_own on public.provider_questions;
create policy provider_questions_select_own on public.provider_questions
  for select to authenticated
  using (auth.uid() = user_id);

drop policy if exists provider_questions_insert_own on public.provider_questions;
create policy provider_questions_insert_own on public.provider_questions
  for insert to authenticated
  with check (auth.uid() = user_id);

drop policy if exists provider_questions_update_own on public.provider_questions;
create policy provider_questions_update_own on public.provider_questions
  for update to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists provider_questions_delete_own on public.provider_questions;
create policy provider_questions_delete_own on public.provider_questions
  for delete to authenticated
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- 4. Admin helper sees all rows (admins manage accounts, read access too)
-- ---------------------------------------------------------------------------
drop policy if exists provider_questions_select_admin on public.provider_questions;
create policy provider_questions_select_admin on public.provider_questions
  for select to authenticated
  using (public.is_admin());