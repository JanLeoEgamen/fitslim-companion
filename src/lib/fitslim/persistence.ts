import { supabase } from "../supabase/client";
import type { GroceryItem, SavedItem } from "./data";

/**
 * Member-data persistence — reads/writes against the per-user RLS tables
 * (saved_items, grocery_items, provider_questions, daily_focus, preferences).
 * Uses the browser anon client so Row Level Security scopes every query to the
 * signed-in user (auth.uid() = user_id). No service role, no server functions.
 * Every function throws on error so callers can show a toast.
 */

function errMsg(e: unknown): string {
  return e instanceof Error ? e.message : "Request failed";
}

function todayIso(): string {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

// ---------------------------------------------------------------------------
// Saved
// ---------------------------------------------------------------------------

type SavedRow = {
  id: string;
  title: string;
  category: string;
  summary: string | null;
  created_at: string | null;
};

export async function loadSaved(): Promise<SavedItem[]> {
  const { data, error } = await supabase
    .from("saved_items")
    .select("id, title, category, summary, created_at")
    .order("created_at", { ascending: false });
  if (error) throw new Error(errMsg(error));
  return ((data ?? []) as SavedRow[]).map((r) => ({
    id: r.id,
    title: r.title,
    category: (r.category as SavedItem["category"]) ?? "Tips",
    savedAt: r.created_at ?? new Date().toISOString(),
    summary: r.summary ?? "",
  }));
}

export async function createSaved(
  item: Omit<SavedItem, "id" | "savedAt">,
): Promise<SavedItem> {
  const { data, error } = await supabase
    .from("saved_items")
    .insert({ title: item.title, category: item.category, summary: item.summary ?? "" })
    .select("id, title, category, summary, created_at")
    .single();
  if (error || !data) throw new Error(error ? errMsg(error) : "Failed to save");
  const r = data as SavedRow;
  return {
    id: r.id,
    title: r.title,
    category: (r.category as SavedItem["category"]) ?? "Tips",
    savedAt: r.created_at ?? new Date().toISOString(),
    summary: r.summary ?? "",
  };
}

export async function deleteSaved(id: string): Promise<void> {
  const { error } = await supabase.from("saved_items").delete().eq("id", id);
  if (error) throw new Error(errMsg(error));
}
// ---------------------------------------------------------------------------
// Grocery (internal, grouped into a member-facing API below)
// ---------------------------------------------------------------------------

type GroceryRow = {
  id: string;
  name: string;
  section: string;
  checked: boolean;
};

async function loadGrocery(): Promise<GroceryItem[]> {
  const { data, error } = await supabase
    .from("grocery_items")
    .select("id, name, section, checked")
    .order("created_at", { ascending: true });
  if (error) throw new Error(errMsg(error));
  return ((data ?? []) as GroceryRow[]).map((r) => ({
    id: r.id,
    name: r.name,
    section: r.section,
    checked: r.checked,
  }));
}

async function createGrocery(name: string, section: string): Promise<GroceryItem> {
  const { data, error } = await supabase
    .from("grocery_items")
    .insert({ name, section, checked: false })
    .select("id, name, section, checked")
    .single();
  if (error || !data) throw new Error(error ? errMsg(error) : "Failed to add item");
  const r = data as GroceryRow;
  return { id: r.id, name: r.name, section: r.section, checked: r.checked };
}

async function setGroceryChecked(id: string, checked: boolean): Promise<void> {
  const { error } = await supabase.from("grocery_items").update({ checked }).eq("id", id);
  if (error) throw new Error(errMsg(error));
}

async function deleteGrocery(id: string): Promise<void> {
  const { error } = await supabase.from("grocery_items").delete().eq("id", id);
  if (error) throw new Error(errMsg(error));
}

// ---------------------------------------------------------------------------
// Provider questions
// ---------------------------------------------------------------------------

type ProviderQuestionRow = { id: string; text: string };

async function loadProviderQuestions(): Promise<{ id: string; text: string }[]> {
  const { data, error } = await supabase
    .from("provider_questions")
    .select("id, text")
    .order("created_at", { ascending: true });
  if (error) throw new Error(errMsg(error));
  return ((data ?? []) as ProviderQuestionRow[]).map((r) => ({ id: r.id, text: r.text }));
}

async function createProviderQuestion(text: string): Promise<{ id: string; text: string }> {
  const { data, error } = await supabase
    .from("provider_questions")
    .insert({ text })
    .select("id, text")
    .single();
  if (error || !data) throw new Error(error ? errMsg(error) : "Failed to save");
  return { id: data.id as string, text: data.text as string };
}

async function deleteProviderQuestion(id: string): Promise<void> {
  const { error } = await supabase.from("provider_questions").delete().eq("id", id);
  if (error) throw new Error(errMsg(error));
}
// ---------------------------------------------------------------------------
// Daily focus — today's items. The app shows TODAY_FOCUS (ids f1..f5); we
// persist the done-state keyed by (focus_date, title) so the UI keeps its
// stable ids while the completed flag survives page reloads.
// ---------------------------------------------------------------------------

type FocusRow = { id: string; title: string; done: boolean };

async function loadFocus(date: string): Promise<Record<string, boolean>> {
  const { data, error } = await supabase.from("daily_focus").select("title, done").eq("focus_date", date);
  if (error) throw new Error(errMsg(error));
  const map: Record<string, boolean> = {};
  for (const r of data ?? []) map[r.title] = !!r.done;
  return map;
}

async function setFocusDone(
  title: string,
  copy: string,
  icon: string,
  done: boolean,
): Promise<void> {
  const date = todayIso();
  const { data: existing, error: selErr } = await supabase
    .from("daily_focus")
    .select("id")
    .eq("focus_date", date)
    .eq("title", title)
    .maybeSingle();
  if (selErr) throw new Error(errMsg(selErr));
  if (existing) {
    const { error } = await supabase.from("daily_focus").update({ done }).eq("id", existing.id);
    if (error) throw new Error(errMsg(error));
  } else {
    const { error } = await supabase
      .from("daily_focus")
      .insert({ focus_date: date, title, copy, icon, done });
    if (error) throw new Error(errMsg(error));
  }
}

// ---------------------------------------------------------------------------
// Preferences — a subset persisted to the single preferences row per user.
// ---------------------------------------------------------------------------

export type PersistedPrefs = {
  theme: string;
  notifications: boolean;
  reduced_motion: boolean;
  remember: boolean;
  use_past_conversations: boolean;
  sidebar_collapsed: boolean;
  panel_open: boolean;
};

export async function loadPreferences(): Promise<Partial<PersistedPrefs> | null> {
  const { data, error } = await supabase
    .from("preferences")
    .select(
      "theme, notifications, reduced_motion, remember, use_past_conversations, sidebar_collapsed, panel_open",
    )
    .maybeSingle();
  if (error) throw new Error(errMsg(error));
  return (data as Partial<PersistedPrefs>) ?? null;
}

// ---------------------------------------------------------------------------
// Grouped loader + public API used by the store.
// ---------------------------------------------------------------------------

export type PersistedMemberData = {
  saved: SavedItem[];
  grocery: GroceryItem[];
  providerQuestions: { id: string; text: string }[];
  focusDone: Record<string, boolean>;
  preferences: Partial<PersistedPrefs> | null;
};

export async function loadMemberData(): Promise<PersistedMemberData> {
  const [saved, grocery, providerQuestions, focusDone, preferences] = await Promise.all([
    loadSaved(),
    loadGrocery(),
    loadProviderQuestions(),
    loadFocus(todayIso()),
    loadPreferences(),
  ]);
  return { saved, grocery, providerQuestions, focusDone, preferences };
}

export const persistence = {
  createSaved,
  deleteSaved,
  createGrocery,
  setGroceryChecked,
  deleteGrocery,
  createProviderQuestion,
  deleteProviderQuestion,
  setFocusDone,
  savePreferences,
};

export async function savePreferences(p: Partial<PersistedPrefs>): Promise<void> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not signed in");
  const { error } = await supabase.from("preferences").upsert({ user_id: user.id, ...p });
  if (error) throw new Error(errMsg(error));
}