import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, PlayCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { PageLayout } from "@/components/fitslim/PageLayout";
import { PageHeader } from "@/components/fitslim/PageHeader";
import { AskAiButton } from "@/components/fitslim/AskAiButton";
import { ACADEMY_CATEGORIES, ACADEMY_LESSONS } from "@/lib/fitslim/data";

export const Route = createFileRoute("/academy")({
  component: Academy,
});

function Academy() {
  return (
    <PageLayout>
      <PageHeader
        icon={<GraduationCap className="h-4.5 w-4.5 text-teal" />}
        title="FitSlim Academy™"
        subtitle="Learn the skills that make healthy habits easier."
      />

      <div className="mb-5 flex flex-wrap gap-2">
        {ACADEMY_CATEGORIES.map((cat) => (
          <span key={cat} className="rounded-full bg-pale-teal px-3 py-1.5 text-xs font-medium text-navy">
            {cat}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {ACADEMY_LESSONS.map((lesson) => (
          <article key={lesson.id} className="flex flex-col rounded-[20px] border border-border bg-card p-5 shadow-soft">
            <div className="flex items-start justify-between gap-2">
              <span className="rounded-full bg-pale-teal px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-teal">
                {lesson.category}
              </span>
              <span className="text-xs text-muted-foreground">{lesson.minutes} min</span>
            </div>
            <h2 className="mt-2.5 font-display text-[17px] font-bold text-navy">{lesson.title}</h2>

            <div className="mt-3">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span>{lesson.progress}% complete</span>
              </div>
              <Progress value={lesson.progress} className="mt-1.5 h-2 bg-soft-green" aria-label={`${lesson.title} progress`} />
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button className="inline-flex items-center gap-1.5 rounded-[12px] bg-navy px-3.5 py-2 text-sm font-medium text-white hover:bg-deep-navy">
                <PlayCircle className="h-4 w-4 text-teal" />
                {lesson.progress === 0 ? "Start Lesson" : "Continue Lesson"}
              </button>
              <AskAiButton prompt={lesson.followUp} label="Ask FitSlim AI" />
            </div>
            {lesson.followUp && <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{lesson.followUp}</p>}
          </article>
        ))}
      </div>
    </PageLayout>
  );
}