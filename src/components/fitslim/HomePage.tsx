import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bookmark,
  MessageCircle,
  ShoppingBasket,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageLayout } from "./PageLayout";
import { useFitSlim } from "@/lib/fitslim/store";
import { SECTIONS } from "@/lib/fitslim/sections";

const QUICK_ACTIONS = [
  { label: "Ask FitSlim AI", to: "/chat", icon: MessageCircle },
  { label: "Grocery List", to: "/grocery-list", icon: ShoppingBasket },
  { label: "Saved", to: "/saved", icon: Bookmark },
] as const;

export function HomePage() {
  const { member, send, requestChatFocus } = useFitSlim();

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
