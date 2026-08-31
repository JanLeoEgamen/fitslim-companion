import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ChevronRight, Clock, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/fitslim/PageLayout";
import { PageHeader } from "@/components/fitslim/PageHeader";
import { EmptyState } from "@/components/fitslim/EmptyState";
import { useFitSlim } from "@/lib/fitslim/store";
import { SECTIONS, type ConversationKey } from "@/lib/fitslim/sections";

export const Route = createFileRoute("/history")({
  component: History,
});

type HistoryEntry = {
  id: string;
  key: ConversationKey;
  path: string;
  label: string;
  title: string;
  preview: string;
  lastAt: number;
  group: string;
};

const KEY_META: Record<string, { label: string; path: string }> = {
  general: { label: "General Chat", path: "/chat" },
};
for (const s of SECTIONS) {
  KEY_META[s.slug] = { label: s.label, path: s.path };
}

function truncate(text: string, max = 80): string {
  const clean = (text ?? "").replace(/\s+/g, " ").trim();
  return clean.length > max ? `${clean.slice(0, max).trim()}…` : clean;
}

function groupLabel(ts: number): string {
  if (!ts) return "Earlier";
  const d = new Date(ts);
  const today = new Date();
  const startToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  const startYesterday = startToday - 86_400_000;
  if (ts >= startToday) return "Today";
  if (ts >= startYesterday) return "Yesterday";
  return "Earlier";
}

function History() {
  const { conversations, requestChatFocus } = useFitSlim();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const entries: HistoryEntry[] = Object.entries(conversations)
    .flatMap(([key, msgs]) => {
      if (!msgs || msgs.length === 0) return [];
      const k = key as ConversationKey;
      const meta = KEY_META[k] ?? { label: k, path: "/chat" };
      const firstUser = msgs.find((m) => m.role === "user");
      const lastUser = [...msgs].reverse().find((m) => m.role === "user");
      const last = msgs[msgs.length - 1];
      const lastAt = last?.createdAt ?? 0;
      return [
        {
          id: k,
          key: k,
          path: meta.path,
          label: meta.label,
          // Title/preview reflect the LATEST activity, not the first (seed) message,
          // so a freshly sent prompt shows up immediately.
          title: truncate(lastUser?.text ?? firstUser?.text ?? meta.label),
          preview: truncate(last?.text ?? ""),
          lastAt,
          group: groupLabel(lastAt),
        },
      ];
    })
    .sort((a, b) => b.lastAt - a.lastAt);

  const q = query.trim().toLowerCase();
  const grouped = entries.filter(
    (e) =>
      e.title.toLowerCase().includes(q) ||
      e.preview.toLowerCase().includes(q) ||
      e.label.toLowerCase().includes(q),
  );

  const openConversation = (entry: HistoryEntry) => {
    navigate({ to: entry.path });
    requestChatFocus(entry.key);
  };

  const groups = Array.from(new Set(grouped.map((e) => e.group))).map((g) => ({
    group: g,
    items: grouped.filter((e) => e.group === g),
  }));

  return (
    <PageLayout>
      <PageHeader
        icon={<Clock className="h-4.5 w-4.5 text-teal" />}
        title="Your Conversations"
        subtitle="Pick up where you left off."
      />

      <div className="relative mb-5 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search conversations..."
          className="rounded-[14px] border-border bg-card py-2.5 pl-9 shadow-soft"
        />
      </div>

      {grouped.length === 0 ? (
        <EmptyState
          icon={<Clock className="h-6 w-6" />}
          title={entries.length === 0 ? "No conversations yet" : "No conversations found"}
          description={
            entries.length === 0
              ? "Start chatting with FitSlim AI and your conversations will appear here."
              : "Try a different search, or start a new conversation in Chat."
          }
        />
      ) : (
        <div className="space-y-6">
          {groups.map((group) => (
            <section key={group.group}>
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {group.group}
              </h2>
              <div className="space-y-2.5">
                {group.items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-[18px] border border-border bg-card p-4 shadow-soft transition hover:border-teal/40"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="rounded-full bg-pale-teal px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-teal">
                            {item.label}
                          </span>
                        </div>
                        <p className="mt-1.5 truncate text-sm font-semibold text-navy">
                          {item.title}
                        </p>
                        <p className="mt-0.5 truncate text-[13px] text-muted-foreground">
                          {item.preview}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="shrink-0 gap-1 rounded-[12px] border-teal text-teal hover:bg-pale-teal"
                        onClick={() => openConversation(item)}
                      >
                        Open <ChevronRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </PageLayout>
  );
}
