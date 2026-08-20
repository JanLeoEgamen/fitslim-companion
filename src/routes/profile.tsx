import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, Heart, Settings, UtensilsCrossed } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/fitslim/PageLayout";
import { PageHeader } from "@/components/fitslim/PageHeader";
import { useFitSlim } from "@/lib/fitslim/store";

export const Route = createFileRoute("/profile")({
  component: Profile,
});

function Profile() {
  const { member } = useFitSlim();

  return (
    <PageLayout>
      <PageHeader
        icon={<Heart className="h-4.5 w-4.5 text-teal" />}
        title="My Profile"
        subtitle="Your wellness profile and preferences."
        action={
          <Button asChild variant="outline" className="rounded-[12px] border-teal text-teal hover:bg-pale-teal">
            <Link to="/settings">
              <Settings className="h-4 w-4" /> Edit Profile
            </Link>
          </Button>
        }
      />

      <div className="mb-5 flex flex-col items-start gap-4 rounded-[20px] border border-border bg-card p-6 shadow-soft sm:flex-row sm:items-center">
        <span className="grid size-16 shrink-0 place-items-center rounded-full bg-gradient-to-br from-navy to-teal font-display text-2xl font-bold text-white">
          {member.firstName[0]}
        </span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-display text-xl font-bold text-navy">{member.name}</h2>
            <Badge className="rounded-full bg-pale-teal text-navy">{member.memberId}</Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">Age {member.age} · Member since {member.memberSince}</p>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="rounded-[20px] border border-border bg-card p-6 shadow-soft">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold text-navy">
            <Heart className="h-5 w-5 text-teal" /> My Goals
          </h2>
          <ul className="mt-3 space-y-2.5">
            {member.goals.map((goal) => (
              <li key={goal} className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-teal" />
                {goal}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-[20px] border border-border bg-card p-6 shadow-soft">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold text-navy">
            <Activity className="h-5 w-5 text-teal" /> Preferences
          </h2>
          <div className="mt-3 space-y-3">
            <ProfileStat label="Dietary preference" value={member.dietaryPreference} />
            <ProfileStat label="Activity level" value={member.activityLevel} />
            <ProfileStat label="Response style" value={member.responseStyle} />
          </div>
        </section>
      </div>

      <section className="mt-5 rounded-[20px] border border-border bg-card p-6 shadow-soft">
        <h2 className="flex items-center gap-2 font-display text-lg font-bold text-navy">
          <UtensilsCrossed className="h-5 w-5 text-teal" /> Favorite Foods
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {member.favoriteFoods.map((food) => (
            <span key={food} className="rounded-full bg-soft-green px-3 py-1.5 text-sm font-medium text-foreground">
              {food}
            </span>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}

function ProfileStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-[14px] border border-border bg-background px-4 py-3">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-semibold text-navy">{value}</span>
    </div>
  );
}