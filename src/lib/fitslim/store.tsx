import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import {
  INITIAL_GROCERY,
  INITIAL_SAVED,
  MEMBER,
  TODAY_FOCUS,
  type GroceryItem,
  type SavedItem,
} from "./data";
import { generateReply, newId, userMessage, type ChatMessage } from "./ai";

export type ThemeMode = "light" | "dark" | "system";

const seededMessages = (): ChatMessage[] => {
  const t = Date.now();
  return [
    { id: "seed1", role: "user", createdAt: t - 5000, text: "Can you help me plan a high-protein breakfast?" },
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
        { label: "Save Recipe", save: { title: "5-Minute Greek Yogurt Power Bowl", category: "Recipes", summary: "Quick high-protein breakfast bowl." } },
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
  responseStyle: string;
  favoriteFoods: string[];
  goals: string[];
  activityLevel: string;
  notifications: boolean;
  reducedMotion: boolean;
};

type Store = {
  messages: ChatMessage[];
  isTyping: boolean;
  send: (text: string) => void;
  resetChat: () => void;
  draft: string;
  setDraft: (v: string) => void;
  saved: SavedItem[];
  saveItem: (item: Omit<SavedItem, "id" | "savedAt">) => void;
  removeSaved: (id: string) => void;
  grocery: GroceryItem[];
  toggleGrocery: (id: string) => void;
  addGrocery: (name: string, section: string) => void;
  checkAllGrocery: (checked: boolean) => void;
  clearGrocery: () => void;
  providerQuestions: { id: string; text: string }[];
  addProviderQuestion: (text: string) => void;
  removeProviderQuestion: (id: string) => void;
  focus: typeof TODAY_FOCUS;
  toggleFocus: (id: string) => void;
  prefs: Prefs;
  setPrefs: (p: Partial<Prefs>) => void;
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  panelOpen: boolean;
  togglePanel: () => void;
  member: typeof MEMBER;
};

const Ctx = createContext<Store | null>(null);

export function FitSlimProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>(seededMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [draft, setDraft] = useState("");
  const [saved, setSaved] = useState<SavedItem[]>(INITIAL_SAVED);
  const [grocery, setGrocery] = useState<GroceryItem[]>(INITIAL_GROCERY);
  const [providerQuestions, setProviderQuestions] = useState<{ id: string; text: string }[]>([]);
  const [focus, setFocus] = useState(TODAY_FOCUS);
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [panelOpen, setPanelOpen] = useState(true);
  const [prefs, setPrefsState] = useState<Prefs>({
    remember: true,
    usePastConversations: true,
    responseStyle: MEMBER.responseStyle,
    favoriteFoods: MEMBER.favoriteFoods,
    goals: MEMBER.goals,
    activityLevel: MEMBER.activityLevel,
    notifications: true,
    reducedMotion: false,
  });

  useEffect(() => {
    const root = document.documentElement;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = theme === "dark" || (theme === "system" && prefersDark);
    root.classList.toggle("dark", dark);
  }, [theme]);

  const send = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((m) => [...m, userMessage(trimmed)]);
    setDraft("");
    setIsTyping(true);
    window.setTimeout(() => {
      setMessages((m) => [...m, generateReply(trimmed)]);
      setIsTyping(false);
    }, 1100);
  }, []);

  const saveItem = useCallback<Store["saveItem"]>((item) => {
    setSaved((s) => {
      if (s.some((x) => x.title === item.title)) return s;
      return [{ ...item, id: newId(), savedAt: "Today" }, ...s];
    });
    toast.success("Saved", { description: `${item.title} was added to Saved.` });
  }, []);

  const value = useMemo<Store>(
    () => ({
      messages,
      isTyping,
      send,
      resetChat: () => setMessages([]),
      draft,
      setDraft,
      saved,
      saveItem,
      removeSaved: (id) => {
        setSaved((s) => s.filter((x) => x.id !== id));
        toast("Removed from Saved");
      },
      grocery,
      toggleGrocery: (id) => setGrocery((g) => g.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i))),
      addGrocery: (name, section) => {
        setGrocery((g) => [...g, { id: newId(), name, section, checked: false }]);
        toast.success("Item added", { description: name });
      },
      checkAllGrocery: (checked) => setGrocery((g) => g.map((i) => ({ ...i, checked }))),
      clearGrocery: () => {
        setGrocery([]);
        toast("Grocery list cleared");
      },
      providerQuestions,
      addProviderQuestion: (text) => {
        setProviderQuestions((q) => (q.some((x) => x.text === text) ? q : [...q, { id: newId(), text }]));
        toast.success("Question saved");
      },
      removeProviderQuestion: (id) => setProviderQuestions((q) => q.filter((x) => x.id !== id)),
      focus,
      toggleFocus: (id) => setFocus((f) => f.map((i) => (i.id === id ? { ...i, done: !i.done } : i))),
      prefs,
      setPrefs: (p) => setPrefsState((cur) => ({ ...cur, ...p })),
      theme,
      setTheme,
      sidebarCollapsed,
      toggleSidebar: () => setSidebarCollapsed((v) => !v),
      panelOpen,
      togglePanel: () => setPanelOpen((v) => !v),
      member: MEMBER,
    }),
    [messages, isTyping, send, draft, saved, saveItem, grocery, providerQuestions, focus, prefs, theme, sidebarCollapsed, panelOpen],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useFitSlim() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useFitSlim must be used inside FitSlimProvider");
  return ctx;
}