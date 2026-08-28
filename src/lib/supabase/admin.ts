import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the service-role key.
 * Bypasses RLS — used exclusively inside server functions for admin management.
 * IMPORTANT: never import this module from client code.
 */
export function getSupabaseAdmin(): SupabaseClient {
  const url = process.env["VITE_SUPABASE_URL"];
  const serviceRoleKey = process.env["SUPABASE_SERVICE_ROLE_KEY"];
  if (!url || !serviceRoleKey) {
    throw new Error("Missing Supabase admin env vars (SUPABASE_SERVICE_ROLE_KEY).");
  }
  return createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}