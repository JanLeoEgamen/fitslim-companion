import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { supabase } from "./supabase/client";
import type { Session, User } from "@supabase/supabase-js";

export type MemberRole = "admin" | "member";
export type MemberStatus = "active" | "invited" | "suspended";

export type MemberProfile = {
  id: string;
  name: string;
  firstName: string;
  email: string;
  memberId: string;
  memberSince: string;
  role: MemberRole;
  status: MemberStatus;
  goals: string[];
  age: number | null;
  focusAreas: string[];
  favoriteFoods: string[];
  dietaryPreference: string;
  activityLevel: string;
  responseStyle: string;
};

type ProfileRow = Record<string, unknown>;

export const PUBLIC_PATHS = ["/", "/login", "/signup", "/marketing"];

export function mapProfileRow(row: ProfileRow): MemberProfile {
  return {
    id: String(row["id"] ?? ""),
    name: String(row["name"] ?? ""),
    firstName: String(row["first_name"] ?? row["name"] ?? ""),
    email: String(row["email"] ?? ""),
    memberId: String(row["member_id"] ?? ""),
    memberSince: String(row["member_since"] ?? ""),
    role: row["role"] === "admin" ? "admin" : "member",
    status: (row["status"] as MemberProfile["status"]) ?? "active",
    goals: Array.isArray(row["goals"]) ? (row["goals"] as string[]) : [],
    age: typeof row["age"] === "number" ? (row["age"] as number) : null,
    focusAreas: Array.isArray(row["focus_areas"]) ? (row["focus_areas"] as string[]) : [],
    favoriteFoods: Array.isArray(row["favorite_foods"])
      ? (row["favorite_foods"] as string[])
      : [],
    dietaryPreference: String(row["dietary_preference"] ?? "Balanced"),
    activityLevel: String(row["activity_level"] ?? "Beginner"),
    responseStyle: String(row["response_style"] ?? "Simple and encouraging"),
  };
}

type AuthValue = {
  session: Session | null;
  user: User | null;
  profile: MemberProfile | null;
  accessToken: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (input: {
    email: string;
    password: string;
    name: string;
    firstName: string;
  }) => Promise<{ error?: string; needsConfirmation?: boolean }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error?: string }>;
  refreshProfile: () => Promise<void>;
};

const Ctx = createContext<AuthValue | null>(null);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<MemberProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (uid: string) => {
    const { data, error } = await supabase.from("profiles").select("*").eq("id", uid).maybeSingle();
    if (error) {
      console.error("[auth] failed to load profile:", error.message);
      return;
    }
    setProfile(mapProfileRow(data as ProfileRow));
  }, []);

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      if (!active) return;
      setSession(s);
      setUser(s?.user ?? null);
      setLoading(false);
      if (s?.user) fetchProfile(s.user.id);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      setUser(next?.user ?? null);
      if (next?.user) {
        fetchProfile(next.user.id);
      } else {
        setProfile(null);
      }
    });
    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [fetchProfile]);
const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    return error ? { error: error.message } : {};
  }, []);

  const signUp = useCallback(
    async ({
      email,
      password,
      name,
      firstName,
    }: {
      email: string;
      password: string;
      name: string;
      firstName: string;
    }) => {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            name: name.trim(),
            first_name: firstName.trim() || name.trim(),
            role: "member",
          },
        },
      });
      if (error) return { error: error.message };
      return { needsConfirmation: !data.session };
    },
    [],
  );

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setProfile(null);
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim());
    return error ? { error: error.message } : {};
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user) await fetchProfile(user.id);
  }, [user, fetchProfile]);

  const value = useMemo<AuthValue>(
    () => ({
      session,
      user,
      profile,
      accessToken: session?.access_token ?? null,
      loading,
      signIn,
      signUp,
      signOut,
      resetPassword,
      refreshProfile,
    }),
    [session, user, profile, loading, signIn, signUp, signOut, resetPassword, refreshProfile],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

function AuthSplash() {
  return (
    <div className="fs-surface flex h-screen items-center justify-center">
      <div className="flex animate-pulse flex-col items-center gap-3">
        <span className="grid size-14 place-items-center rounded-[20px] bg-gradient-to-br from-navy to-teal text-xl font-black text-white">
          F
        </span>
        <p className="font-display text-sm font-semibold text-navy">FitSlim AI™</p>
      </div>
    </div>
  );
}

export function AuthGate({ children }: { children: ReactNode }) {
  const { user, profile, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const isPublic = PUBLIC_PATHS.includes(path);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      if (!isPublic) navigate({ to: "/login", search: { redirect: path } });
      return;
    }
    if (path === "/login" || path === "/signup") {
      // Wait for the profile to load before choosing a destination — otherwise an
      // admin would be landed on /home before their role is known.
      if (!profile) return;
      navigate({ to: profile.role === "admin" ? "/admin" : "/home" });
      return;
    }
    if (path.startsWith("/admin") && profile?.role !== "admin") navigate({ to: "/home" });
  }, [loading, user, profile, path, isPublic, navigate]);

  if (loading || (!user && !isPublic)) return <AuthSplash />;

  return <>{children}</>;
}