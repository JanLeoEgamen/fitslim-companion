-- ============================================================================
-- FitSlim AI™ — member-data RLS for saved_items
-- The remote project has saved_items with RLS enabled and user_id NOT NULL, but
-- no per-user policies and no way to stamp user_id on insert. Every anon/member
-- write ("Save answer", recipe saves, etc.) was rejected with:
--   new row violates row-level security policy for table "saved_items"
-- This migration adds a before-insert trigger to stamp user_id = auth.uid() and
-- per-user SELECT/INSERT/UPDATE/DELETE policies. Idempotent (safe to re-run).
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Stamp user_id = auth.uid() on insert (unless already provided)
-- ---------------------------------------------------------------------------
create or replace function public.set_saved_items_user_id()
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

drop trigger if exists saved_items_set_user_id on public.saved_items;
create trigger saved_items_set_user_id
  before insert on public.saved_items
  for each row execute function public.set_saved_items_user_id();

-- ---------------------------------------------------------------------------
-- 2. Per-user RLS policies (mirrors the existing profiles pattern)
-- ---------------------------------------------------------------------------
drop policy if exists saved_items_select_own on public.saved_items;
create policy saved_items_select_own on public.saved_items
  for select to authenticated
  using (auth.uid() = user_id);

drop policy if exists saved_items_insert_own on public.saved_items;
create policy saved_items_insert_own on public.saved_items
  for insert to authenticated
  with check (auth.uid() = user_id);

drop policy if exists saved_items_update_own on public.saved_items;
create policy saved_items_update_own on public.saved_items
  for update to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists saved_items_delete_own on public.saved_items;
create policy saved_items_delete_own on public.saved_items
  for delete to authenticated
  using (auth.uid() = user_id);

-- Admin helper sees all rows (admins manage accounts, but have read access too).
drop policy if exists saved_items_select_admin on public.saved_items;
create policy saved_items_select_admin on public.saved_items
  for select to authenticated
  using (public.is_admin());
