import fs from "fs";
import { createClient } from "@supabase/supabase-js";

const env = fs
  .readFileSync(".env", "utf8")
  .split(/\r?\n/)
  .reduce((acc, line) => {
    const m = line.match(/^([A-Z_]+)=(.*)$/);
    if (m) acc[m[1]] = m[2];
    return acc;
  }, {});

const sb = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

// Sign in as the demo member (what the app does via the anon client + RLS)
const { error: se } = await sb.auth.signInWithPassword({
  email: "demo@fitslim.demo",
  password: "FitSlimMember1!",
});
if (se) {
  console.log("SIGNIN FAIL:", se.message);
  process.exit(1);
}
console.log("SIGNIN OK");

// 1. Grocery — create, toggle, read back
const g1 = await sb.from("grocery_items").insert({ name: "Test Oats", section: "Proteins", checked: false }).select("id, name, checked").single();
if (g1.error) console.log("GROCERY INSERT FAIL:", g1.error.message);
else {
  console.log("GROCERY INSERT OK:", g1.data.name, g1.data.id);
  await sb.from("grocery_items").update({ checked: true }).eq("id", g1.data.id);
  const gr = await sb.from("grocery_items").select("id, checked").eq("id", g1.data.id).single();
  console.log("GROCERY UPDATE OK checked:", gr.data.checked);
  await sb.from("grocery_items").delete().eq("id", g1.data.id);
  console.log("GROCERY DELETE OK");
}

// 2. Saved — create, read, delete
const s = await sb.from("saved_items").insert({ title: "Test Save", category: "Tips", summary: "test" }).select("id, title").single();
if (s.error) console.log("SAVED INSERT FAIL:", s.error.message);
else {
  console.log("SAVED INSERT OK:", s.data.title, s.data.id);
  const sr = await sb.from("saved_items").select("id").eq("id", s.data.id).single();
  console.log("SAVED READ OK:", sr.data.id === s.data.id);
  await sb.from("saved_items").delete().eq("id", s.data.id);
  console.log("SAVED DELETE OK");
}

// 3. Provider question
const p = await sb.from("provider_questions").insert({ text: "Test question?" }).select("id, text").single();
if (p.error) console.log("PROVQ INSERT FAIL:", p.error.message);
else { await sb.from("provider_questions").delete().eq("id", p.data.id); console.log("PROVQ OK:", p.data.text); }

// 4. Preferences upsert
const { data: u } = await sb.auth.getUser();
const pp = await sb.from("preferences").upsert({ user_id: u.user.id, theme: "light", notifications: true, reduced_motion: false, remember: true, use_past_conversations: true, sidebar_collapsed: false, panel_open: true });
console.log("PREFS UPSERT:", pp.error ? "FAIL " + pp.error.message : "OK");

console.log("DONE");