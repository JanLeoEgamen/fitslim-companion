import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, UtensilsCrossed } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SectionPage } from "@/components/fitslim/SectionPage";
import { SECTIONS_BY_SLUG } from "@/lib/fitslim/sections";
import { RESTAURANT_PICKS, RESTAURANT_PRIORITIES, RESTAURANT_TYPES } from "@/lib/fitslim/data";

export const Route = createFileRoute("/restaurants")({
  component: Restaurants,
});

function Restaurants() {
  const [type, setType] = useState<string>("Fast Food");
  const [priority, setPriority] = useState<string>("Balanced meal");

  const picks = RESTAURANT_PICKS[type] ?? [];

  return (
    <SectionPage section={SECTIONS_BY_SLUG.restaurants}>
      <div className="mb-6">
        <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-navy">
          <UtensilsCrossed className="h-5 w-5 text-teal" aria-hidden="true" />
          Restaurant quick guide
        </h2>
        <div className="mb-4 grid gap-3 rounded-[20px] border border-border bg-card p-5 shadow-soft sm:grid-cols-2">
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
          <h3 className="font-display text-lg font-bold text-navy">
            {type} · {priority}
          </h3>
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
      </div>
    </SectionPage>
  );
}