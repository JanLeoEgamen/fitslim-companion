-- ============================================================================
-- FitSlim AI™ — member-data RLS for grocery_items
-- The hosted project has grocery_items with RLS enabled but no per-user policies
-- and no way to stamp user_id on insert. Every member write ("Add Item",
-- toggling, checking all, clearing) is rejected with:
--   new row violates row-level security policy for table "grocery_items"
-- This migration mirrors the saved_items fix (20260828120000_saved_items_rls.sql):
--  1. adds user_id if it is missing
--  2. adds a before-insert trigger that stamps user_id = auth.uid()
--  3. adds per-user SELECT/INSERT/UPDATE/DELETE policies
--  4. adds an admin SELECT policy (admins read all rows)
-- Idempotent (safe to re-run).
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Ensure the user_id column exists (no-op when already present)
-- ---------------------------------------------------------------------------
alter table public.grocery_items
  add column if not exists user_id uuid;

-- ---------------------------------------------------------------------------
-- 2. Stamp user_id = auth.uid() on insert (unless already provided)
-- ---------------------------------------------------------------------------
create or replace function public.set_grocery_items_user_id()
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

drop trigger if exists grocery_items_set_user_id on public.grocery_items;
create trigger grocery_items_set_user_id
  before insert on public.grocery_items
  for each row execute function public.set_grocery_items_user_id();

-- ---------------------------------------------------------------------------
-- 3. Per-user RLS policies (mirrors the saved_items pattern)
-- ---------------------------------------------------------------------------
drop policy if exists grocery_items_select_own on public.grocery_items;
create policy grocery_items_select_own on public.grocery_items
  for select to authenticated
  using (auth.uid() = user_id);

drop policy if exists grocery_items_insert_own on public.grocery_items;
create policy grocery_items_insert_own on public.grocery_items
  for insert to authenticated
  with check (auth.uid() = user_id);

drop policy if exists grocery_items_update_own on public.grocery_items;
create policy grocery_items_update_own on public.grocery_items
  for update to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists grocery_items_delete_own on public.grocery_items;
create policy grocery_items_delete_own on public.grocery_items
  for delete to authenticated
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- 4. Admin helper sees all rows (admins manage accounts, read access too)
-- ---------------------------------------------------------------------------
drop policy if exists grocery_items_select_admin on public.grocery_items;
create policy grocery_items_select_admin on public.grocery_items
  for select to authenticated
  using (public.is_admin());