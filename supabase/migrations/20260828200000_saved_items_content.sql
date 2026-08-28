-- ============================================================================
-- FitSlim AI™ — add content to saved_items + prevent duplicate saves
-- Adds a `content` column holding the full saved answer (so the "Open" modal can
-- show the whole response), removes any existing duplicate rows per user/title,
-- and adds a unique index on (user_id, title) as a DB-level backstop so the app's
-- title-based dedup can never create duplicate rows again.
-- Idempotent (safe to re-run).
-- ============================================================================

-- 1. Full content column (default '' so existing rows stay valid).
alter table public.saved_items
  add column if not exists content text not null default '';

-- 2. Remove historical duplicates: keep the earliest row per (user_id, title).
delete from public.saved_items a
using public.saved_items b
where a.user_id = b.user_id
  and a.title = b.title
  and a.id > b.id;

-- 3. Unique backstop per user + title.
create unique index if not exists saved_items_user_title_key
  on public.saved_items (user_id, title);
