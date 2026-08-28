import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { getSupabaseAdmin } from "../supabase/admin";
import type { AdminUser, AdminUserRole, AdminUserStatus } from "../fitslim/data";

export type CreateUserInput = {
  name: string;
  firstName: string;
  email: string;
  role: AdminUserRole;
  status: AdminUserStatus;
  goals: string[];
};

export type UpdateUserInput = Partial<CreateUserInput>;

type ProfileRow = {
  id?: string | null;
  name?: string | null;
  first_name?: string | null;
  email?: string | null;
  member_id?: string | null;
  role?: string | null;
  status?: string | null;
  member_since?: string | null;
  last_active?: string | null;
  goals?: string[] | null;
  created_at?: string | null;
};

function rowToAdminUser(row: ProfileRow): AdminUser {
  return {
    id: row.id ?? "",
    name: row.name ?? "",
    firstName: row.first_name ?? row.name ?? "",
    email: row.email ?? "",
    memberId: row.member_id ?? "",
    role: (row.role === "admin" ? "admin" : "member") as AdminUserRole,
    status: (row.status === "invited" || row.status === "suspended"
      ? row.status
      : "active") as AdminUserStatus,
    memberSince: row.member_since ?? "",
    lastActive: row.last_active ?? null,
    goals: row.goals ?? [],
  };
}

async function requireAdmin(accessToken: string) {
  // Resolve project URL + anon key from BOTH sources so the verifying client
  // always targets the same Supabase project the browser uses, regardless of
  // runtime (dev SSR, build, deployed worker). Server-only vars stay on env.
  const url =
    import.meta.env["VITE_SUPABASE_URL"] || process.env["VITE_SUPABASE_URL"];
  const anonKey =
    import.meta.env["VITE_SUPABASE_ANON_KEY"] || process.env["VITE_SUPABASE_ANON_KEY"];
  if (!url || !anonKey) throw new Error("Supabase not configured");

  // Verify the JWT on a PLAIN client by passing the token directly to getUser().
  // Do NOT set `global: { headers: { authorization: ... } }` here — supabase-js
  // manages the auth Authorization header via its own storage, and doing so makes
  // getUser() send no usable Bearer token ("This endpoint requires a valid Bearer token").
  const verifier = createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const {
    data: { user },
    error,
  } = await verifier.auth.getUser(accessToken);
  // Surface the real cause (JWT invalid/expired/mismatched project) instead of a
  // generic "Unauthorized" that hides whether the token or env is the problem.
  if (error || !user) {
    const reason = error?.message ?? "could not verify the session";
    throw new Error(`Unauthorized: ${reason}`);
  }

  // Check the admin role via the service-role client (bypasses RLS; no public
  // bearer needed for the REST query).
  const admin = getSupabaseAdmin();
  const { data: profile } = await admin
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  if (!profile || profile.role !== "admin") throw new Error("Forbidden");

  return user;
}
export const listUsers = createServerFn({ method: "POST" })
  .validator((d: { accessToken: string }) => d)
  .handler(async ({ data }) => {
    await requireAdmin(data.accessToken);
    const admin = getSupabaseAdmin();
    const { data: rows, error } = await admin.from("profiles").select("*");
    if (error) throw new Error(error.message);
    return (rows ?? [])
      .slice()
      .sort((a, b) =>
        String(a.created_at ?? "").localeCompare(String(b.created_at ?? "")),
      )
      .map((r) => rowToAdminUser(r as ProfileRow));
  });

function generateTemporaryPassword(): string {
  return `FitSlim${Math.floor(1000 + Math.random() * 9000)}!`;
}

export const createUser = createServerFn({ method: "POST" })
  .validator((d: { accessToken: string; input: CreateUserInput; invite: boolean }) => d)
  .handler(async ({ data }) => {
    await requireAdmin(data.accessToken);
    const admin = getSupabaseAdmin();

    let userId: string;
    let temporaryPassword: string | null = null;

    if (data.invite) {
      const { data: invited, error } = await admin.auth.admin.inviteUserByEmail(
        data.input.email.trim(),
        {
          data: {
            name: data.input.name.trim(),
            first_name: data.input.firstName.trim() || data.input.name.trim(),
            role: data.input.role,
          },
        },
      );
      if (error) throw new Error(error.message);
      userId = invited.user.id;
    } else {
      temporaryPassword = generateTemporaryPassword();
      const { data: created, error } = await admin.auth.admin.createUser({
        email: data.input.email.trim(),
        password: temporaryPassword,
        email_confirm: true,
        user_metadata: {
          name: data.input.name.trim(),
          first_name: data.input.firstName.trim() || data.input.name.trim(),
          role: data.input.role,
        },
      });
      if (error) throw new Error(error.message);
      userId = created.user.id;
    }

    const { error: profileError } = await admin
      .from("profiles")
      .update({
        goals: data.input.goals ?? [],
        role: data.input.role,
        status: data.invite ? "invited" : data.input.status,
      })
      .eq("id", userId);
    if (profileError) throw new Error(profileError.message);

    return { ok: true, userId, temporaryPassword };
  });
export const updateUser = createServerFn({ method: "POST" })
  .validator((d: { accessToken: string; id: string; patch: UpdateUserInput }) => d)
  .handler(async ({ data }) => {
    await requireAdmin(data.accessToken);
    const admin = getSupabaseAdmin();

    const row: ProfileRow = {};
    if (data.patch.name !== undefined) row.name = data.patch.name.trim();
    if (data.patch.firstName !== undefined)
      row.first_name = data.patch.firstName.trim() || data.patch.name?.trim() || "";
    if (data.patch.role !== undefined) row.role = data.patch.role;
    if (data.patch.status !== undefined) row.status = data.patch.status;
    if (data.patch.goals !== undefined) row.goals = data.patch.goals;

    if (data.patch.email !== undefined) {
      row.email = data.patch.email.trim();
      const { error: authError } = await admin.auth.admin.updateUserById(data.id, {
        email: data.patch.email.trim(),
        user_metadata: {
          name: data.patch.name ?? undefined,
          first_name: data.patch.firstName ?? undefined,
        },
      });
      if (authError) throw new Error(authError.message);
    }

    if (Object.keys(row).length > 0) {
      const { error } = await admin.from("profiles").update(row).eq("id", data.id);
      if (error) throw new Error(error.message);
    }

    return { ok: true };
  });

export const removeUser = createServerFn({ method: "POST" })
  .validator((d: { accessToken: string; id: string }) => d)
  .handler(async ({ data }) => {
    await requireAdmin(data.accessToken);
    const admin = getSupabaseAdmin();

    const { data: target, error: targetError } = await admin
      .from("profiles")
      .select("id, role")
      .eq("id", data.id)
      .single();
    if (targetError || !target) throw new Error("Account not found");

    if (target.role === "admin") {
      const { data: admins } = await admin
        .from("profiles")
        .select("id")
        .eq("role", "admin")
        .neq("status", "suspended");
      if ((admins?.length ?? 0) <= 1) throw new Error("Cannot remove the last active admin account");
    }

    const { error } = await admin.auth.admin.deleteUser(data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const setUserStatus = createServerFn({ method: "POST" })
  .validator((d: { accessToken: string; id: string; status: AdminUserStatus }) => d)
  .handler(async ({ data }) => {
    await requireAdmin(data.accessToken);
    const admin = getSupabaseAdmin();

    if (data.status === "suspended") {
      const { data: target } = await admin
        .from("profiles")
        .select("id, role, status")
        .eq("id", data.id)
        .single();
      if (target?.role === "admin" && target.status !== "suspended") {
        const { data: admins } = await admin
          .from("profiles")
          .select("id")
          .eq("role", "admin")
          .neq("status", "suspended");
        if ((admins?.length ?? 0) <= 1) throw new Error("Cannot suspend the last active admin account");
      }
    }

    const { error } = await admin.from("profiles").update({ status: data.status }).eq("id", data.id);
    if (error) throw new Error(error.message);

    const { error: authError } = await admin.auth.admin.updateUserById(data.id, {
      ban_duration: data.status === "suspended" ? "365d" : "none",
    });
    if (authError) throw new Error(authError.message);

    return { ok: true };
  });