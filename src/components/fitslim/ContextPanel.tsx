import { Link } from "@tanstack/react-router";
import { Bookmark, Check, ChevronRight, Lightbulb, Settings, SlidersHorizontal, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useFitSlim } from "@/lib/fitslim/store";
import { cn } from "@/lib/utils";

export function ContextPanel() {
  const { focus, toggleFocus, member, saved } = useFitSlim();

  const done = focus.filter((item) => item.done).length;
  const total = focus.length;
  const pct = Math.round((done / total) * 100);

  return (
    <div className="flex h-full flex-col gap-3.5 overflow-y-auto px-4">
      <section className="rounded-[20px] border border-border bg-card p-4 shadow-soft">
        <div className="flex items-baseline justify-between">
          <h3 className="font-display text-[15px] font-bold text-navy">Today's Focus</h3>
          <span className="text-xs font-semibold text-muted-foreground">{done} / {total}</span>
        </div>
        <p className="mt-1 text-xs font-medium text-teal">Build consistency — {pct}%</p>
        <Progress value={pct} className="mt-2 h-2 bg-soft-green" aria-label="Today's focus progress" />
        <ul className="mt-3 space-y-2">
          {focus.map((item) => (
            <li key={item.id} className="flex items-center gap-2.5">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleFocus(item.id)}
                className={cn(
                  "size-6.5 shrink-0 rounded-full",
                  item.done ? "bg-teal text-white" : "border border-teal/40 bg-card text-transparent hover:bg-pale-teal",
                )}
                aria-label={item.done ? `Mark ${item.title} as not done` : `Mark ${item.title} as done`}
              >
                <Check className="h-4 w-4" />
              </Button>
              <span className={cn("flex-1 text-[13px] leading-tight", item.done && "text-muted-foreground")}>
                <span className="block font-medium text-foreground">{item.icon} {item.title}</span>
                <span className="block truncate text-[11px] text-muted-foreground">{item.copy}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <div className="rounded-[20px] border border-border bg-card p-4 shadow-soft">
        <div className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-[12px] bg-gradient-to-br from-navy to-teal">
            <Target className="h-4.5 w-4.5 text-white" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h3 className="font-display text-[15px] font-bold text-navy">My FitSlim Blueprint™</h3>
            <p className="text-[11px] text-muted-foreground">Your personalized wellness roadmap</p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {member.goals.map((goal) => (
            <span key={goal} className="rounded-full bg-pale-teal px-2.5 py-1 text-[11px] font-medium text-navy">
              {goal}
            </span>
          ))}
        </div>
        <Button asChild variant="outline" size="sm" className="mt-3 w-full rounded-[12px] border-teal text-teal hover:bg-pale-teal">
          <Link to="/blueprint">Open My Blueprint</Link>
        </Button>
      </div>

      <div className="rounded-[20px] border border-border bg-card p-4 shadow-soft">
        <div className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-[12px] bg-pale-teal">
            <Lightbulb className="h-4.5 w-4.5 text-teal" aria-hidden="true" />
          </span>
          <h3 className="font-display text-[15px] font-semibold text-navy">FitSlim AI remembers what helps you.</h3>
        </div>
        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
          You usually prefer quick meals and simple grocery lists.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button asChild variant="outline" size="sm" className="gap-1 rounded-[12px] border-teal text-teal hover:bg-pale-teal">
            <Link to="/settings">
              <SlidersHorizontal className="h-3.5 w-3.5" /> Edit Preferences
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="rounded-[12px] text-navy hover:bg-pale-teal">
            <Link to="/settings">Manage AI Memory</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}