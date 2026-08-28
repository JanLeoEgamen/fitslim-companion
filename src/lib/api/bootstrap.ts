import { createServerFn } from "@tanstack/react-start";
import { getSupabaseAdmin } from "../supabase/admin";

/**
 * One-time bootstrap for demo accounts so the marketing/app demo flow works
 * against real Supabase Auth. Idempotent — safe to call on every login render.
 * The handle_new_user trigger creates the profile row (role comes from
 * user_metadata), so no profile insert is needed here.
 */
export const ADMIN_DEMO_EMAIL = "admin@fitslim.demo";
export const DEMO_MEMBER_EMAIL = "demo@fitslim.demo";
export const ADMIN_DEMO_PASSWORD = "FitSlimAdmin1!";
export const DEMO_MEMBER_PASSWORD = "FitSlimMember1!";

export const ensureDemoAccounts = createServerFn({ method: "GET" }).handler(async () => {
  const admin = getSupabaseAdmin();
  const created: string[] = [];

  const { data } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
  const existingEmails = new Set((data?.users ?? []).map((u) => u.email?.toLowerCase()));

  if (!existingEmails.has(ADMIN_DEMO_EMAIL.toLowerCase())) {
    await admin.auth.admin.createUser({
      email: ADMIN_DEMO_EMAIL,
      password: ADMIN_DEMO_PASSWORD,
      email_confirm: true,
      user_metadata: {
        name: "Sarah Johnson",
        first_name: "Sarah",
        role: "admin",
      },
    });
    created.push(ADMIN_DEMO_EMAIL);
  }

  if (!existingEmails.has(DEMO_MEMBER_EMAIL.toLowerCase())) {
    await admin.auth.admin.createUser({
      email: DEMO_MEMBER_EMAIL,
      password: DEMO_MEMBER_PASSWORD,
      email_confirm: true,
      user_metadata: {
        name: "Demo Member",
        first_name: "Demo",
        role: "member",
      },
    });
    created.push(DEMO_MEMBER_EMAIL);
  }

  return { created };
});