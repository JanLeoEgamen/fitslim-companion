import type { ReactNode } from "react";
import { ShieldCheck } from "lucide-react";
import { PageHeader } from "./PageHeader";
import { PageLayout } from "./PageLayout";
import { SectionChat } from "./SectionChat";
import { useFitSlim } from "@/lib/fitslim/store";
import { type FitSlimSection } from "@/lib/fitslim/sections";

/**
 * Shared layout for every wellness section: header, safety note (where
 * needed), topic quick-action cards, optional extra content, and the
 * section's own embedded chatbot at the bottom.
 */
export function SectionPage({
  section,
  children,
}: {
  section: FitSlimSection;
  children?: ReactNode;
}) {
  const { send, requestChatFocus } = useFitSlim();

  const openTopic = (prompt: string) => {
    send(section.slug, prompt);
    requestChatFocus(section.slug);
  };

  return (
    <PageLayout>
      <PageHeader
        icon={<span className="text-xl leading-none" aria-hidden="true">{section.emoji}</span>}
        title={section.label}
        subtitle={section.tagline}
      />

      {section.safetyNote && (
        <div className="mb-5 flex items-start gap-3 rounded-[16px] border border-teal/20 bg-pale-teal p-4">
          <ShieldCheck className="mt-0.5 h-4.5 w-4.5 shrink-0 text-teal" aria-hidden="true" />
          <p className="text-[13px] leading-relaxed text-navy">{section.safetyNote}</p>
        </div>
      )}

      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {section.topics.map((topic) => (
          <button
            key={topic.label}
            type="button"
            onClick={() => openTopic(topic.prompt)}
            className="group flex items-start gap-3 rounded-[18px] border border-border bg-card p-4 text-left shadow-soft transition hover:-translate-y-0.5 hover:border-teal/50 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-[12px] bg-pale-teal text-xl" aria-hidden="true">
              {topic.emoji}
            </span>
            <span className="min-w-0">
              <span className="font-display block text-sm font-bold text-navy">{topic.label}</span>
              <span className="mt-0.5 flex items-center gap-1 text-[11px] font-medium text-teal">
                Ask FitSlim AI
                <span className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
              </span>
            </span>
          </button>
        ))}
      </div>

      {children}

      <SectionChat
        slug={section.slug}
        title={section.label}
        emoji={section.emoji}
        tagline={section.tagline}
        chatIntro={section.chatIntro}
        quickPrompts={section.quickPrompts.map((p) => ({ icon: p.emoji, label: p.label, prompt: p.prompt }))}
        placeholder={section.placeholder}
      />
    </PageLayout>
  );
}