import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import {
  INITIAL_GROCERY,
  INITIAL_SAVED,
  MEMBER,
  type AdminUser,
  type AdminUserRole,
  type AdminUserStatus,
  type GroceryItem,
  type SavedItem,
} from "./data";
import { generateReply, newId, userMessage, type ChatMessage } from "./ai";
import { type ConversationKey } from "./sections";
import { type MemberProfile } from "../auth";
import {
  listUsers as listUsersFn,
  createUser as createUserFn,
  updateUser as updateUserFn,
  removeUser as removeUserFn,
  setUserStatus as setUserStatusFn,
  type CreateUserInput,
  type UpdateUserInput,
} from "../api/admin-users";
import { chatWithAi, type AiChatMessage, type AiResponse } from "../api/ai";
import {
  loadMemberData,
  persistence,
  type PersistedMemberData,
  type PersistedPrefs,
} from "./persistence";

export type ThemeMode = "light" | "dark" | "system";
const STORAGE_KEY_PREFIX = "fitslim:conversations:v1:";
function storageKey(uid: string): string {
  return STORAGE_KEY_PREFIX + uid;
}
function loadStoredConversations(uid: string) {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(storageKey(uid));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (parsed && typeof parsed === "object")
      return parsed as Partial<Record<ConversationKey, ChatMessage[]>>;
    return null;
  } catch {
    return null;
  }
}
function persistConversations(
  uid: string,
  conversations: Partial<Record<ConversationKey, ChatMessage[]>>,
) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(storageKey(uid), JSON.stringify(conversations));
  } catch {
    // Storage full / unavailable — history is best-effort and non-fatal.
  }
}

const seededMessages = (): ChatMessage[] => {
  const t = Date.now();
  return [
    {
      id: "seed1",
      role: "user",
      createdAt: t - 5000,
      text: "Can you help me plan a high-protein breakfast?",
    },
    {
      id: "seed2",
      role: "ai",
      createdAt: t - 4000,
      text: `Absolutely! If you want something quick, try a Greek yogurt power bowl.

## 🥣 Greek Yogurt Power Bowl

• Greek yogurt
• Berries
• Chia seeds
• Almonds
• Optional drizzle of honey

Prep time: 5 minutes.

Would you like me to make this into a grocery list?`,
      actions: [
        { label: "Create Grocery List", prompt: "Create a grocery list." },
        { label: "Show More Breakfasts", prompt: "Show me 3 more high-protein breakfasts." },
        {
          label: "Save Recipe",
          save: {
            title: "5-Minute Greek Yogurt Power Bowl",
            category: "Recipes",
            summary: "Quick high-protein breakfast bowl.",
          },
        },
      ],
    },
    { id: "seed3", role: "user", createdAt: t - 3000, text: "Create a grocery list." },
    {
      id: "seed4",
      role: "ai",
      createdAt: t - 2000,
      text: `Here's a simple list for 3 breakfasts:

## Protein
• Greek yogurt

## Fruit
• Blueberries
• Strawberries

## Pantry
• Chia seeds
• Almonds

Want me to add anything else?`,
      actions: [{ label: "Open Grocery List", to: "/grocery-list" }],
    },
  ];
};

type Prefs = {
  remember: boolean;
  usePastConversations: boolean;
  favoriteFoods: string[];
  goals: string[];
  activityLevel: string;
  notifications: boolean;
  reducedMotion: boolean;
};

type ChatFocus = { key: ConversationKey; nonce: number };

/** Input for creating or editing an account through the admin UI. */
export type AdminUserInput = {
  name: string;
  firstName: string;
  email: string;
  role: AdminUserRole;
  status: AdminUserStatus;
  goals: string[];
};

/**
 * Account-management methods backed by the Supabase backend (server functions).
 * The admin page only depends on this shape, so the backend could be swapped
 * without touching the UI.
 */
export type UsersApi = {
  users: AdminUser[];
  loading: boolean;
  createUser: (input: AdminUserInput, invite?: boolean) => Promise<void>;
  updateUser: (id: string, patch: Partial<AdminUserInput>) => Promise<void>;
  removeUser: (id: string) => Promise<void>;
  setUserStatus: (id: string, status: AdminUserStatus) => Promise<void>;
};

type Store = {
  conversations: Partial<Record<ConversationKey, ChatMessage[]>>;
  typing: Partial<Record<ConversationKey, boolean>>;
  drafts: Partial<Record<ConversationKey, string>>;
  send: (key: ConversationKey, text: string) => void;
  resetChat: (key: ConversationKey) => void;
  setDraft: (key: ConversationKey, value: string) => void;
  chatFocus: ChatFocus | null;
  requestChatFocus: (key: ConversationKey) => void;
  clearChatFocus: () => void;
  saved: SavedItem[];
  saveItem: (item: Omit<SavedItem, "id" | "savedAt" | "content"> & { content?: string }) => void;
  removeSaved: (id: string) => void;
  grocery: GroceryItem[];
  toggleGrocery: (id: string) => void;
  addGrocery: (name: string, section: string) => void;
  checkAllGrocery: (checked: boolean) => void;
  clearGrocery: () => void;
  providerQuestions: { id: string; text: string }[];
  addProviderQuestion: (text: string) => void;
  removeProviderQuestion: (id: string) => void;
  prefs: Prefs;
  setPrefs: (p: Partial<Prefs>) => void;
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  member: typeof MEMBER;
  usersApi: UsersApi;
};

const Ctx = createContext<Store | null>(null);

function toMember(p: MemberProfile | null): typeof MEMBER {
  if (!p) return MEMBER;
  return {
    name: p.name || MEMBER.name,
    firstName: p.firstName || MEMBER.firstName,
    memberId: p.memberId || MEMBER.memberId,
    memberSince: p.memberSince || MEMBER.memberSince,
    age: p.age ?? MEMBER.age,
    goals: p.goals?.length ? p.goals : MEMBER.goals,
    focusAreas: p.focusAreas?.length ? p.focusAreas : MEMBER.focusAreas,
    favoriteFoods: p.favoriteFoods?.length ? p.favoriteFoods : MEMBER.favoriteFoods,
    dietaryPreference: p.dietaryPreference || MEMBER.dietaryPreference,
    activityLevel: p.activityLevel || MEMBER.activityLevel,
    responseStyle: p.responseStyle || MEMBER.responseStyle,
  };
}

function optimisticLocalUser(input: AdminUserInput): AdminUser {
  const firstName = input.firstName.trim() || input.name.trim().split(" ")[0] || "Member";
  return {
    id: `local-${Date.now()}`,
    name: input.name.trim(),
    firstName,
    email: input.email.trim(),
    memberId: `FS-${Math.floor(10500 + Math.random() * 900)}`,
    role: input.role,
    status: input.status,
    memberSince: new Date().toISOString().slice(0, 10),
    lastActive: new Date().toISOString(),
    goals: input.goals,
  };
}

type FitSlimProviderProps = {
  children: ReactNode;
  profile?: MemberProfile | null;
  accessToken?: string | null;
};

export function FitSlimProvider({
  children,
  profile = null,
  accessToken = null,
}: FitSlimProviderProps) {
  const [conversations, setConversations] = useState<
    Partial<Record<ConversationKey, ChatMessage[]>>
  >({});
  const [typing, setTyping] = useState<Partial<Record<ConversationKey, boolean>>>({});
  const [drafts, setDrafts] = useState<Partial<Record<ConversationKey, string>>>({});
  const [chatFocus, setChatFocus] = useState<ChatFocus | null>(null);
  const [saved, setSaved] = useState<SavedItem[]>(INITIAL_SAVED);
  const savedRef = useRef(saved);
  savedRef.current = saved;
  const [grocery, setGrocery] = useState<GroceryItem[]>(INITIAL_GROCERY);
  const [providerQuestions, setProviderQuestions] = useState<{ id: string; text: string }[]>([]);
  // Tracks slices the user mutated locally so a slow/late member-data load
  // cannot overwrite something they just added/removed/toggled.
  const dirtyRef = useRef<{ saved: boolean; grocery: boolean; providerQuestions: boolean }>({
    saved: false,
    grocery: false,
    providerQuestions: false,
  });
  const markSavedDirty = () => (dirtyRef.current.saved = true);
  const markGroceryDirty = () => (dirtyRef.current.grocery = true);
  const markQuestionsDirty = () => (dirtyRef.current.providerQuestions = true);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [member, setMember] = useState<typeof MEMBER>(() => toMember(profile));
  const conversationsRef = useRef(conversations);
  const uidRef = useRef(profile?.id ?? "");
  conversationsRef.current = conversations;
  uidRef.current = profile?.id ?? "";
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [prefs, setPrefsState] = useState<Prefs>({
    remember: true,
    usePastConversations: true,
    favoriteFoods: MEMBER.favoriteFoods,
    goals: MEMBER.goals,
    activityLevel: MEMBER.activityLevel,
    notifications: true,
    reducedMotion: false,
  });

  useEffect(() => {
    setMember(toMember(profile));
  }, [profile]);

  useEffect(() => {
    if (profile?.role === "admin" && accessToken) {
      setUsersLoading(true);
      listUsersFn({ data: { accessToken } })
        .then((rows) => setUsers(rows as AdminUser[]))
        .catch((error) => {
          const msg = error instanceof Error ? error.message : String(error);
          console.error("[store] failed to load accounts:", error);
          toast.error("Could not load accounts", { description: msg });
        })
        .finally(() => setUsersLoading(false));
    } else {
      setUsers([]);
    }
  }, [profile, accessToken]);
  // Load the member's persisted data when the user changes (or clears on logout).
  const [loadedUserId, setLoadedUserId] = useState<string | null>(null);

  useEffect(() => {
    const uid = profile?.id ?? null;
    if (uid === loadedUserId) return;

    // Reset to defaults first so we never show the previous user's data.
    setSaved(INITIAL_SAVED);
    setGrocery(INITIAL_GROCERY);
    setProviderQuestions([]);
    setPrefsState({
      remember: true,
      usePastConversations: true,
      favoriteFoods: MEMBER.favoriteFoods,
      goals: MEMBER.goals,
      activityLevel: MEMBER.activityLevel,
      notifications: true,
      reducedMotion: false,
    });
    setLoadedUserId(uid);
    // Reset dirty flags at the start of a load so a fresh load hydrates all slices.
    dirtyRef.current = { saved: false, grocery: false, providerQuestions: false };

    if (!uid) return;
    let cancelled = false;
    (async () => {
      try {
        const data = await loadMemberData();
        if (cancelled) return;
        applyLoadedMemberData(data);
      } catch (error) {
        console.error("[store] failed to load member data:", error);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.id]);

  // Hydrate conversations from localStorage for this user. Keeps the seeded welcome
  // only for brand-new users (nothing stored yet).
  useEffect(() => {
    const uid = profile?.id ?? "";
    if (!uid) return;
    const stored = loadStoredConversations(uid);
    if (stored) {
      setConversations(stored);
    } else if (Object.keys(conversations).length === 0) {
      setConversations({ general: seededMessages() });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.id]);

  function applyLoadedMemberData(data: PersistedMemberData) {
    // Skip any slice the user has already changed locally since this load
    // began, so a late-arriving response cannot wipe an item they just added.
    if (!dirtyRef.current.saved && data.saved.length) setSaved(data.saved);
    if (!dirtyRef.current.grocery && data.grocery.length) setGrocery(data.grocery);
    if (!dirtyRef.current.providerQuestions) {
      setProviderQuestions(data.providerQuestions.length ? data.providerQuestions : []);
    }

    if (data.preferences) {
      const p = data.preferences;
      if (typeof p.theme === "string") setTheme(p.theme as ThemeMode);
      if (typeof p.sidebar_collapsed === "boolean") setSidebarCollapsed(p.sidebar_collapsed);
      setPrefsState((cur) => ({
        ...cur,
        remember: p.remember ?? cur.remember,
        usePastConversations: p.use_past_conversations ?? cur.usePastConversations,
        notifications: p.notifications ?? cur.notifications,
        reducedMotion: p.reduced_motion ?? cur.reducedMotion,
      }));
    }
  }
  useEffect(() => {
    const root = document.documentElement;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = theme === "dark" || (theme === "system" && prefersDark);
    root.classList.toggle("dark", dark);
  }, [theme]);

  const send = useCallback(async (key: ConversationKey, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setConversations((c) => ({ ...c, [key]: [...(c[key] ?? []), userMessage(trimmed)] }));
    persistConversations(uidRef.current, {
      ...conversationsRef.current,
      [key]: [...(conversationsRef.current[key] ?? []), userMessage(trimmed)],
    });
    setDrafts((d) => ({ ...d, [key]: "" }));
    setTyping((t) => ({ ...t, [key]: true }));

    try {
      // Build a short history for context (user + assistant up to MAX_HISTORY).
      const history = [...(conversationsRef.current[key] ?? []), userMessage(trimmed)];
      const messages: AiChatMessage[] = history.slice(-12).map((m) => ({
        role: m.role === "ai" ? ("assistant" as const) : ("user" as const),
        content: m.text,
      }));

      const rawResult = await chatWithAi({ data: { messages, section: key } });
      const result = rawResult as unknown as AiResponse;
      const aiMessage: ChatMessage = {
        id: newId(),
        role: "ai",
        createdAt: Date.now(),
        text: result.text,
        ...(result.actions && result.actions.length > 0 ? { actions: result.actions } : {}),
      };
      setConversations((c) => ({
        ...c,
        [key]: [...(c[key] ?? []), aiMessage],
      }));
      persistConversations(uidRef.current, {
        ...conversationsRef.current,
        [key]: [...(conversationsRef.current[key] ?? []), aiMessage],
      });
    } catch (error) {
      console.error("[fitslim-ai] chat failed:", error);
      const fallback = generateReply(trimmed, key);
      const fbMessage: ChatMessage = {
        id: newId(),
        role: "ai",
        createdAt: Date.now(),
        text: fallback.text,
        ...(fallback.actions && fallback.actions.length > 0 ? { actions: fallback.actions } : {}),
      };
      setConversations((c) => ({
        ...c,
        [key]: [...(c[key] ?? []), fbMessage],
      }));
      persistConversations(uidRef.current, {
        ...conversationsRef.current,
        [key]: [...(conversationsRef.current[key] ?? []), fbMessage],
      });
    } finally {
      setTyping((t) => ({ ...t, [key]: false }));
    }
  }, []);

  const resetChat = useCallback((key: ConversationKey) => {
    setConversations((c) => ({ ...c, [key]: [] }));
    persistConversations(uidRef.current, { ...conversationsRef.current, [key]: [] });
  }, []);

  const setDraft = useCallback((key: ConversationKey, value: string) => {
    setDrafts((d) => ({ ...d, [key]: value }));
  }, []);

  const requestChatFocus = useCallback((key: ConversationKey) => {
    setChatFocus({ key, nonce: Date.now() });
  }, []);

  const clearChatFocus = useCallback(() => {
    setChatFocus(null);
  }, []);

  const saveItem = useCallback<Store["saveItem"]>((item) => {
    // If it's already in the list, don't re-insert (title-based dedup).
    if (savedRef.current.some((x) => x.title === item.title)) {
      toast.success("Already saved", { description: `${item.title} is already in Saved.` });
      return;
    }
    // Build the optimistic row OUTSIDE the state updater so the updater stays pure
    // (React can re-invoke updaters; the DB write must happen exactly once).
    const local: SavedItem = {
      ...item,
      content: item.content ?? item.summary ?? "",
      id: newId(),
      savedAt: "Today",
    };
    setSaved((s) => [local, ...s]);
    persistence
      .createSaved(local)
      .then((row) => {
        setSaved((cur) => cur.map((x) => (x.id === local.id ? row : x)));
        toast.success("Saved", { description: `${item.title} was added to Saved.` });
      })
      .catch((error) => {
        console.error("[store] save failed:", error);
        setSaved((cur) => cur.filter((x) => x.id !== local.id));
        toast.error("Could not save", { description: "Please try again." });
      });
  }, []);

  const createUser = useCallback(
    async (input: AdminUserInput, invite?: boolean) => {
      if (!accessToken) {
        toast.error("You must be signed in to create accounts.");
        return;
      }
      try {
        const created = await createUserFn({
          data: {
            accessToken,
            input: {
              name: input.name.trim(),
              firstName: input.firstName.trim() || input.name.trim().split(" ")[0] || "Member",
              email: input.email.trim(),
              role: input.role,
              status: input.status,
              goals: input.goals,
            } satisfies CreateUserInput,
            invite: !!invite,
          },
        });
        toast.success("Account created", { description: `${input.name} was added.` });
        // The server returns the real auth user UUID. Use it for the local row so
        // later operations (status/role/delete) hit Postgres with a valid UUID,
        // not a fabricated `local-…` id.
        const realId = created?.userId;
        const optimistic = optimisticLocalUser(input);
        setUsers((list) => [...list, { ...optimistic, id: realId || optimistic.id }]);
      } catch (error) {
        console.error("[store] create account failed:", error);
        toast.error("Could not create account", {
          description: error instanceof Error ? error.message : "Please try again.",
        });
      }
    },
    [accessToken],
  );

  const updateUser = useCallback(
    async (id: string, patch: Partial<AdminUserInput>) => {
      if (!accessToken) return;
      try {
        await updateUserFn({
          data: {
            accessToken,
            id,
            patch: {
              ...(patch.name !== undefined ? { name: patch.name } : {}),
              ...(patch.firstName !== undefined ? { firstName: patch.firstName } : {}),
              ...(patch.email !== undefined ? { email: patch.email } : {}),
              ...(patch.role !== undefined ? { role: patch.role } : {}),
              ...(patch.status !== undefined ? { status: patch.status } : {}),
              ...(patch.goals !== undefined ? { goals: patch.goals } : {}),
            } satisfies UpdateUserInput,
          },
        });
        setUsers((list) =>
          list.map((u) =>
            u.id === id
              ? {
                  ...u,
                  ...(patch.name !== undefined
                    ? { name: patch.name.trim(), firstName: patch.firstName ?? u.firstName }
                    : {}),
                  ...(patch.email !== undefined ? { email: patch.email.trim() } : {}),
                  ...(patch.role !== undefined ? { role: patch.role } : {}),
                  ...(patch.status !== undefined ? { status: patch.status } : {}),
                  ...(patch.goals !== undefined ? { goals: patch.goals } : {}),
                }
              : u,
          ),
        );
        toast.success("Account updated");
      } catch (error) {
        console.error("[store] update account failed:", error);
        toast.error("Could not update account", {
          description: error instanceof Error ? error.message : "Please try again.",
        });
      }
    },
    [accessToken],
  );

  const removeUser = useCallback(
    async (id: string) => {
      if (!accessToken) return;
      try {
        await removeUserFn({ data: { accessToken, id } });
        setUsers((list) => list.filter((u) => u.id !== id));
        toast.success("Account removed");
      } catch (error) {
        console.error("[store] remove account failed:", error);
        toast.error("Could not remove account", {
          description: error instanceof Error ? error.message : "Please try again.",
        });
      }
    },
    [accessToken],
  );

  const setUserStatus = useCallback(
    async (id: string, status: AdminUserStatus) => {
      if (!accessToken) return;
      try {
        await setUserStatusFn({ data: { accessToken, id, status } });
        setUsers((list) => list.map((u) => (u.id === id ? { ...u, status } : u)));
      } catch (error) {
        console.error("[store] status change failed:", error);
        toast.error("Could not update status", {
          description: error instanceof Error ? error.message : "Please try again.",
        });
      }
    },
    [accessToken],
  );

  const value = useMemo<Store>(
    () => ({
      conversations,
      typing,
      drafts,
      send,
      resetChat,
      setDraft,
      chatFocus,
      requestChatFocus,
      clearChatFocus,
      saved,
      saveItem,
      removeSaved: (id) => {
        setSaved((s) => s.filter((x) => x.id !== id));
        markSavedDirty();
        persistence.deleteSaved(id).catch((error) => {
          console.error("[store] delete saved failed:", error);
        });
        toast("Removed from Saved");
      },
      grocery,
      toggleGrocery: (id) => {
        markGroceryDirty();
        setGrocery((g) => {
          const next = g.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i));
          const item = next.find((i) => i.id === id);
          if (item) {
            persistence.setGroceryChecked(id, item.checked).catch((error) => {
              console.error("[store] toggle grocery failed:", error);
            });
          }
          return next;
        });
      },
      addGrocery: (name, section) => {
        markGroceryDirty();
        const local: GroceryItem = { id: newId(), name, section, checked: false };
        setGrocery((g) => [...g, local]);
        persistence
          .createGrocery(name, section)
          .then((row) => {
            setGrocery((cur) => cur.map((i) => (i.id === local.id ? row : i)));
            toast.success("Item added", { description: name });
          })
          .catch((error) => {
            console.error("[store] add grocery failed:", error);
            setGrocery((cur) => cur.filter((i) => i.id !== local.id));
            toast.error("Couldn't add item", {
              description: error instanceof Error ? error.message : "Please try again.",
            });
          });
      },
      checkAllGrocery: (checked) => {
        markGroceryDirty();
        setGrocery((g) => {
          const next = g.map((i) => ({ ...i, checked }));
          next.forEach((i) => {
            persistence.setGroceryChecked(i.id, checked).catch(() => {});
          });
          return next;
        });
      },
      clearGrocery: () => {
        markGroceryDirty();
        setGrocery((g) => {
          g.forEach((i) => {
            persistence.deleteGrocery(i.id).catch(() => {});
          });
          return [];
        });
        toast("Grocery list cleared");
      },
      providerQuestions,
      addProviderQuestion: (text) => {
        const exists = providerQuestions.some((x) => x.text === text);
        if (exists) {
          toast("Already saved", { description: "That question is already on your list." });
          return;
        }
        markQuestionsDirty();
        const local = { id: newId(), text };
        setProviderQuestions((q) => [...q, local]);
        persistence
          .createProviderQuestion(text)
          .then((row) => {
            setProviderQuestions((cur) => cur.map((x) => (x.id === local.id ? row : x)));
            toast.success("Question saved");
          })
          .catch((error) => {
            console.error("[store] add provider question failed:", error);
            setProviderQuestions((cur) => cur.filter((x) => x.id !== local.id));
            toast.error("Couldn't save question", {
              description: error instanceof Error ? error.message : "Please try again.",
            });
          });
      },
      removeProviderQuestion: (id) => {
        markQuestionsDirty();
        setProviderQuestions((q) => q.filter((x) => x.id !== id));
        persistence.deleteProviderQuestion(id).catch((error) => {
          console.error("[store] delete provider question failed:", error);
        });
      },
      prefs,
      setPrefs: (p) => {
        setPrefsState((cur) => {
          const next = { ...cur, ...p };
          persistence
            .savePreferences({
              remember: next.remember,
              use_past_conversations: next.usePastConversations,
              notifications: next.notifications,
              reduced_motion: next.reducedMotion,
              theme,
            })
            .catch((error) => {
              console.error("[store] save prefs failed:", error);
            });
          return next;
        });
      },
      theme,
      setTheme: (t) => {
        setTheme(t);
        persistence.savePreferences({ theme: t }).catch((error) => {
          console.error("[store] save theme failed:", error);
        });
      },
      sidebarCollapsed,
      toggleSidebar: () =>
        setSidebarCollapsed((v) => {
          const nv = !v;
          persistence.savePreferences({ sidebar_collapsed: nv }).catch(() => {});
          return nv;
        }),
      member,
      usersApi: {
        users,
        loading: usersLoading,
        createUser,
        updateUser,
        removeUser,
        setUserStatus,
      },
    }),
    [
      conversations,
      typing,
      drafts,
      send,
      resetChat,
      setDraft,
      chatFocus,
      requestChatFocus,
      clearChatFocus,
      saved,
      saveItem,
      grocery,
      providerQuestions,
      prefs,
      theme,
      sidebarCollapsed,
      member,
      users,
      usersLoading,
      createUser,
      updateUser,
      removeUser,
      setUserStatus,
      accessToken,
    ],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useFitSlim() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useFitSlim must be used inside FitSlimProvider");
  return ctx;
}
