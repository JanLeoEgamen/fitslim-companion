import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, UtensilsCrossed } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageLayout } from "@/components/fitslim/PageLayout";
import { PageHeader } from "@/components/fitslim/PageHeader";
import { AskAiButton } from "@/components/fitslim/AskAiButton";
import { RESTAURANT_TYPES, RESTAURANT_PRIORITIES, RESTAURANT_PICKS } from "@/lib/fitslim/data";

export const Route = createFileRoute("/restaurants")({
  component: Restaurants,
});

function Restaurants() {
  const [type, setType] = useState<string>("Fast Food");
  const [priority, setPriority] = useState<string>("Balanced meal");

  const picks = RESTAURANT_PICKS[type] ?? [];

  return (
    <PageLayout>
      <PageHeader
        icon={<UtensilsCrossed className="h-4.5 w-4.5 text-teal" />}
        title="Restaurant Guide"
        subtitle="Ordering strategies for any type of menu."
      />

      <div className="mb-5 grid gap-3 rounded-[20px] border border-border bg-card p-5 shadow-soft sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-navy">Where are you eating?</span>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-full rounded-[12px] border-border bg-background"><SelectValue /></SelectTrigger>
            <SelectContent>
              {RESTAURANT_TYPES.map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-navy">What are you prioritizing?</span>
          <Select value={priority} onValueChange={setPriority}>
            <SelectTrigger className="w-full rounded-[12px] border-border bg-background"><SelectValue /></SelectTrigger>
            <SelectContent>
              {RESTAURANT_PRIORITIES.map((p) => (
                <SelectItem key={p} value={p}>{p}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>
      </div>

      <section className="rounded-[20px] border border-border bg-card p-6 shadow-soft">
        <h2 className="font-display text-lg font-bold text-navy">
          {type} · {priority}
        </h2>
        <p className="mt-1 text-[13px] text-muted-foreground">
          General ideas to help you decide — not medical or dietary prescriptions.
        </p>
        <ul className="mt-4 space-y-2.5">
          {picks.map((pick) => (
            <li key={pick} className="flex items-start gap-3 rounded-[14px] border border-border bg-background px-4 py-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
              <span className="text-sm leading-relaxed text-foreground">{pick}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-[20px] border border-teal/20 bg-gradient-to-br from-pale-teal to-card p-6 sm:flex-row sm:items-center">
        <div>
          <h3 className="font-display text-lg font-bold text-navy">Want more tailored ideas?</h3>
          <p className="mt-1 text-sm text-muted-foreground">Ask FitSlim AI about this restaurant type.</p>
        </div>
        <AskAiButton prompt={`Help me order a ${priority.toLowerCase()} meal at ${type}.`} />
      </div>
    </PageLayout>
  );
}