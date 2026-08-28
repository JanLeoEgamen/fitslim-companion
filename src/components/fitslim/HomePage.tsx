import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bookmark,
  Check,
  MessageCircle,
  ShoppingBasket,
  Sparkles,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PageLayout } from "./PageLayout";
import { useFitSlim } from "@/lib/fitslim/store";
import { SECTIONS } from "@/lib/fitslim/sections";
import { cn } from "@/lib/utils";

const QUICK_ACTIONS = [
  { label: "Ask FitSlim AI", to: "/chat", icon: MessageCircle },
  { label: "Grocery List", to: "/grocery-list", icon: ShoppingBasket },
  { label: "Saved", to: "/saved", icon: Bookmark },
  { label: "My Blueprint", to: "/blueprint", icon: Target },
] as const;

export function HomePage() {
  const { member, focus, toggleFocus, send, requestChatFocus } = useFitSlim();

  const done = focus.filter((item) => item.done).length;
  const total = focus.length;
  const pct = Math.round((done / total) * 100);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const askSection = (slug: (typeof SECTIONS)[number]["slug"]) => {
    const section = SECTIONS.find((s) => s.slug === slug);
    if (!section) return;
    const prompt = section.quickPrompts[0]?.prompt ?? section.description;
    send(section.slug, prompt);
    requestChatFocus(section.slug);
  };

  return (
    <PageLayout>
      {/* Greeting */}
      <div className="fs-fade-in mb-6 rounded-[24px] bg-gradient-to-br from-pale-teal via-soft-green to-card p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-teal">
          Your wellness hub
        </p>
        <h1 className="font-display mt-1 text-2xl font-bold tracking-tight text-navy sm:text-3xl">
          {greeting}, {member.firstName} 👋
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Pick a section below to explore, or ask FitSlim AI anything — every section has its own
          assistant, and your care team stays one tap away.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {QUICK_ACTIONS.map((action) => (
            <Button
              key={action.to}
              asChild
              size="sm"
              variant="outline"
              className="gap-1.5 rounded-[12px] border-border bg-card text-navy hover:border-teal/50 hover:bg-pale-teal"
            >
              <Link to={action.to}>
                <action.icon className="h-4 w-4 text-teal" aria-hidden="true" />
                {action.label}
              </Link>
            </Button>
          ))}
        </div>
      </div>

      {/* Today's focus */}
      <section className="mb-6 rounded-[20px] border border-border bg-card p-5 shadow-soft">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-display text-base font-bold text-navy">Today's Focus</h2>
          <span className="text-xs font-semibold text-muted-foreground">
            {done} / {total} · {pct}%
          </span>
        </div>
        <Progress
          value={pct}
          className="mt-2 h-2 bg-soft-green"
          aria-label="Today's focus progress"
        />
        <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {focus.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => toggleFocus(item.id)}
                className={cn(
                  "flex w-full items-center gap-2 rounded-[14px] border px-3 py-2.5 text-left transition",
                  item.done
                    ? "border-teal/30 bg-pale-teal/60"
                    : "border-border bg-background hover:border-teal/40",
                )}
                aria-label={
                  item.done ? `Mark ${item.title} as not done` : `Mark ${item.title} as done`
                }
              >
                <span
                  className={cn(
                    "grid size-5 shrink-0 place-items-center rounded-full border",
                    item.done
                      ? "border-teal bg-teal text-white"
                      : "border-teal/40 text-transparent",
                  )}
                  aria-hidden="true"
                >
                  <Check className="h-3 w-3" />
                </span>
                <span className="min-w-0 leading-tight">
                  <span
                    className={cn(
                      "block text-[13px] font-semibold",
                      item.done ? "text-muted-foreground" : "text-navy",
                    )}
                  >
                    {item.icon} {item.title}
                  </span>
                  <span className="block truncate text-[11px] text-muted-foreground">
                    {item.copy}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>
      {/* Section trailers */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="font-display text-lg font-bold tracking-tight text-navy">
          Explore every section
        </h2>
        <p className="hidden text-xs text-muted-foreground sm:block">
          Each with its own FitSlim AI assistant
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {SECTIONS.map((section) => (
          <article
            key={section.slug}
            className="group flex flex-col rounded-[20px] border border-border bg-card p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-teal/40 hover:shadow-lift"
          >
            <div className="flex items-start justify-between gap-3">
              <span
                className="grid size-12 shrink-0 place-items-center rounded-[16px] bg-pale-teal text-2xl"
                aria-hidden="true"
              >
                {section.emoji}
              </span>
              <Link
                to={section.path}
                className="inline-flex items-center gap-1 rounded-full bg-soft-green px-2.5 py-1 text-[11px] font-semibold text-navy transition hover:bg-pale-teal"
              >
                Open <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </Link>
            </div>
            <h3 className="font-display mt-3 text-[17px] font-bold text-navy">{section.label}</h3>
            <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
              {section.tagline}
            </p>
            <ul className="mt-3 flex-1 space-y-1.5">
              {section.preview.slice(0, 2).map((line) => (
                <li key={line} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <span
                    className="mt-1.5 size-1.5 shrink-0 rounded-full bg-teal"
                    aria-hidden="true"
                  />
                  {line}
                </li>
              ))}
            </ul>
            <Button
              size="sm"
              variant="outline"
              className="mt-4 gap-1.5 rounded-[12px] border-teal text-teal hover:bg-pale-teal"
              onClick={() => askSection(section.slug)}
            >
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Ask the {section.shortLabel} assistant
            </Button>
          </article>
        ))}
      </div>

      <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-[20px] border border-teal/20 bg-gradient-to-br from-pale-teal to-card p-6 sm:flex-row sm:items-center">
        <div>
          <h3 className="font-display text-lg font-bold text-navy">Not sure where to start?</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Ask the general assistant anything — it can point you to the right section.
          </p>
        </div>
        <Button asChild className="gap-1.5 rounded-[12px] bg-teal text-white hover:bg-bright-teal">
          <Link to="/chat">
            <MessageCircle className="h-4 w-4 text-teal" aria-hidden="true" /> Open Chat
          </Link>
        </Button>
      </div>
    </PageLayout>
  );
}
