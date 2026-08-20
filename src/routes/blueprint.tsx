import { createFileRoute } from "@tanstack/react-router";
import { Activity, BadgeInfo, CloudSun, Droplets, Dumbbell, Moon, Salad, Target, UtensilsCrossed } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageLayout } from "@/components/fitslim/PageLayout";
import { PageHeader } from "@/components/fitslim/PageHeader";
import { AskAiButton } from "@/components/fitslim/AskAiButton";
import { useFitSlim } from "@/lib/fitslim/store";

export const Route = createFileRoute("/blueprint")({
  component: Blueprint,
});

const FOCUS_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Protein: UtensilsCrossed,
  Hydration: Droplets,
  Movement: Dumbbell,
  Sleep: Moon,
  "Healthy routines": Activity,
};

function Blueprint() {
  const { member } = useFitSlim();

  return (
    <PageLayout>
      <PageHeader
        icon={<Target className="h-4.5 w-4.5 text-teal" />}
        title="My FitSlim Blueprint™"
        subtitle="Your personalized wellness roadmap."
      />

      <div className="mb-4 flex items-center gap-2.5 rounded-[16px] border border-teal/20 bg-pale-teal px-4 py-3">
        <BadgeInfo className="h-4.5 w-4.5 shrink-0 text-teal" />
        <p className="text-[13px] leading-relaxed text-navy">
          This is <strong>mock data</strong> for demonstration. Your provider creates and updates your Blueprint™ —
          FitSlim AI helps reinforce educational topics connected to your plan.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="rounded-[20px] border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-navy">About You</h2>
            <Badge className="rounded-full bg-pale-teal text-navy">{member.memberId}</Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {member.name} · Age {member.age} · Member since {member.memberSince}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <MiniStat label="Dietary" value={member.dietaryPreference} />
            <MiniStat label="Activity" value={member.activityLevel} />
            <MiniStat label="Response" value={member.responseStyle} />
          </div>
        </section>

        <section className="rounded-[20px] border border-border bg-card p-6 shadow-soft">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold text-navy">
            <Target className="h-5 w-5 text-teal" /> Primary Goals
          </h2>
          <ul className="mt-4 space-y-2.5">
            {member.goals.map((goal, index) => (
              <li key={goal} className="flex items-start gap-3">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-teal text-xs font-bold text-white">
                  {index + 1}
                </span>
                <span className="text-[15px] font-medium text-foreground">{goal}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-5 rounded-[20px] border border-border bg-card p-6 shadow-soft">
        <h2 className="flex items-center gap-2 font-display text-lg font-bold text-navy">
          <CloudSun className="h-5 w-5 text-teal" /> Focus Areas
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {member.focusAreas.map((area) => {
            const Icon = FOCUS_ICONS[area] ?? Salad;
            return (
              <div key={area} className="flex items-center gap-3 rounded-[16px] border border-border bg-background px-4 py-3.5">
                <span className="grid size-10 place-items-center rounded-[12px] bg-pale-teal">
                  <Icon className="h-5 w-5 text-teal" />
                </span>
                <span className="text-sm font-semibold text-foreground">{area}</span>
              </div>
            );
          })}
        </div>
      </section>

      <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-[20px] border border-teal/20 bg-gradient-to-br from-pale-teal to-card p-6 sm:flex-row sm:items-center">
        <div>
          <h3 className="font-display text-lg font-bold text-navy">Want support for a Blueprint topic?</h3>
          <p className="mt-1 text-sm text-muted-foreground">Ask FitSlim AI for education on any focus area.</p>
        </div>
        <AskAiButton prompt="Help me build healthy routines around my Blueprint goals." />
      </div>
    </PageLayout>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[14px] border border-border bg-background p-3">
      <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-0.5 text-sm font-semibold text-navy">{value}</p>
    </div>
  );
}