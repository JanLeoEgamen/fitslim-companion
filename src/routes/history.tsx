import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Clock, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PageLayout } from "@/components/fitslim/PageLayout";
import { PageHeader } from "@/components/fitslim/PageHeader";
import { EmptyState } from "@/components/fitslim/EmptyState";
import { AskAiButton } from "@/components/fitslim/AskAiButton";
import { CONVERSATION_HISTORY } from "@/lib/fitslim/data";

export const Route = createFileRoute("/history")({
  component: History,
});

function History() {
  const [query, setQuery] = useState("");

  const filtered = CONVERSATION_HISTORY.map((group) => ({
    ...group,
    items: group.items.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.preview.toLowerCase().includes(query.toLowerCase()),
    ),
  })).filter((group) => group.items.length > 0);

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

      {filtered.length === 0 ? (
        <EmptyState
          icon={<Clock className="h-6 w-6" />}
          title="No conversations found"
          description="Try a different search, or start a new conversation in Chat."
        />
      ) : (
        <div className="space-y-6">
          {filtered.map((group) => (
            <section key={group.group}>
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{group.group}</h2>
              <div className="space-y-2.5">
                {group.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 rounded-[18px] border border-border bg-card p-4 shadow-soft transition hover:border-teal/40"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-navy">{item.title}</p>
                      <p className="mt-0.5 truncate text-[13px] text-muted-foreground">{item.preview}</p>
                    </div>
                    <AskAiButton prompt={item.prompt} label="Open" className="shrink-0" />
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