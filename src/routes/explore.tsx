import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Bookmark, GraduationCap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/fitslim/PageLayout";
import { PageHeader } from "@/components/fitslim/PageHeader";
import { AskAiButton } from "@/components/fitslim/AskAiButton";
import { EXPLORE_TOPICS, TOPIC_DETAIL, ACADEMY_LESSONS } from "@/lib/fitslim/data";

export const Route = createFileRoute("/explore")({
  component: Explore,
});

function Explore() {
  const [slug, setSlug] = useState<string | null>(null);
  const topic = slug ? EXPLORE_TOPICS.find((t) => t.slug === slug) : null;
  const detail = slug ? TOPIC_DETAIL[slug] : null;

  if (topic && detail) {
    const lessons = detail.academy
      .map((title) => ACADEMY_LESSONS.find((l) => l.title === title))
      .filter((l): l is (typeof ACADEMY_LESSONS)[number] => Boolean(l));

    return (
      <PageLayout>
        <Button
          variant="ghost"
          size="sm"
          className="mb-3 gap-1.5 rounded-[12px] text-navy hover:bg-pale-teal"
          onClick={() => setSlug(null)}
        >
          <ArrowLeft className="h-4 w-4" /> All topics
        </Button>
        <PageHeader
          icon={<span className="text-2xl leading-none">{topic.icon}</span>}
          title={topic.title}
          subtitle={topic.blurb}
        />

        <div className="grid gap-5 lg:grid-cols-2">
          <section className="rounded-[20px] border border-border bg-card p-5 shadow-soft">
            <h2 className="font-display text-base font-bold text-navy">Popular questions</h2>
            <ul className="mt-3 space-y-2">
              {detail.questions.map((q) => (
                <li key={q}>
                  <AskAiButton prompt={q} label={q} className="h-auto w-full justify-start whitespace-normal rounded-[12px] bg-pale-teal px-3 py-2 text-left text-[13px] font-medium text-navy hover:bg-light-blue" />
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[20px] border border-border bg-card p-5 shadow-soft">
            <h2 className="font-display text-base font-bold text-navy">Recommended prompts</h2>
            <ul className="mt-3 space-y-2">
              {detail.prompts.map((p) => (
                <li key={p}>
                  <AskAiButton prompt={p} label={p} className="h-auto w-full justify-start whitespace-normal rounded-[12px] bg-light-blue px-3 py-2 text-left text-[13px] font-medium text-navy hover:bg-pale-teal" />
                </li>
              ))}
            </ul>
          </section>
        </div>

        {lessons.length > 0 && (
          <section className="mt-5 rounded-[20px] border border-border bg-card p-5 shadow-soft">
            <h2 className="flex items-center gap-2 font-display text-base font-bold text-navy">
              <GraduationCap className="h-5 w-5 text-teal" /> Academy resources
            </h2>
            <ul className="mt-3 space-y-2">
              {lessons.map((lesson) => (
                <li key={lesson.id} className="flex items-center justify-between gap-3 rounded-[14px] border border-border bg-background p-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">{lesson.title}</p>
                    <p className="text-xs text-muted-foreground">{lesson.minutes} min · {lesson.category}</p>
                  </div>
                  <Button asChild size="sm" className="shrink-0 rounded-[12px] bg-navy text-white hover:bg-deep-navy">
                    <Link to="/academy">Open</Link>
                  </Button>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-5 flex items-center gap-3 rounded-[20px] border border-teal/20 bg-pale-teal p-4">
          <Bookmark className="h-5 w-5 shrink-0 text-teal" />
          <p className="text-sm text-navy">
            Save this topic's ideas to your <Link to="/saved" className="font-semibold underline underline-offset-2">Saved</Link> page for easy access.
          </p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageHeader
        icon={<Sparkles className="h-4.5 w-4.5 text-teal" />}
        title="Explore FitSlim AI"
        subtitle="Discover practical support for everyday wellness."
      />
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        {EXPLORE_TOPICS.map((item) => (
          <button
            key={item.slug}
            type="button"
            onClick={() => setSlug(item.slug)}
            className="group flex items-start gap-3.5 rounded-[20px] border border-border bg-card p-5 text-left shadow-soft transition hover:-translate-y-0.5 hover:border-teal/50 hover:shadow-lift"
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-[16px] bg-pale-teal text-2xl" aria-hidden="true">
              {item.icon}
            </span>
            <span className="min-w-0">
              <span className="font-display block text-[16px] font-bold text-navy">{item.title}</span>
              <span className="mt-1 block text-[13px] leading-snug text-muted-foreground">{item.blurb}</span>
            </span>
          </button>
        ))}
      </div>
    </PageLayout>
  );
}