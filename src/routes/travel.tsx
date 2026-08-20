import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Droplets, Footprints, Plane, UtensilsCrossed } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageLayout } from "@/components/fitslim/PageLayout";
import { PageHeader } from "@/components/fitslim/PageHeader";
import { AskAiButton } from "@/components/fitslim/AskAiButton";
import { TRAVEL_TIPS } from "@/lib/fitslim/data";

export const Route = createFileRoute("/travel")({
  component: Travel,
});

function Travel() {
  const [destination, setDestination] = useState("Denver");
  const [duration, setDuration] = useState("4 days");
  const [dining, setDining] = useState("Mix of restaurants and groceries");

  const ready = Boolean(destination.trim());

  return (
    <PageLayout>
      <PageHeader
        icon={<Plane className="h-4.5 w-4.5 text-teal" />}
        title="Travel Companion"
        subtitle="Stay steady on the road, in airports and hotels."
      />

      <div className="mb-5 grid gap-3 rounded-[20px] border border-border bg-card p-5 shadow-soft sm:grid-cols-3">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-navy">Destination</span>
          <Input value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="e.g. Denver" className="rounded-[12px] border-border bg-background" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-navy">Trip duration</span>
          <Select value={duration} onValueChange={setDuration}>
            <SelectTrigger className="w-full rounded-[12px] border-border bg-background"><SelectValue /></SelectTrigger>
            <SelectContent>
              {["1 day", "2 days", "3 days", "4 days", "5 days", "1 week"].map((d) => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-navy">Dining situation</span>
          <Select value={dining} onValueChange={setDining}>
            <SelectTrigger className="w-full rounded-[12px] border-border bg-background"><SelectValue /></SelectTrigger>
            <SelectContent>
              {["Mix of restaurants and groceries", "Mostly restaurants", "Hotel kitchen", "Airport-heavy"].map((d) => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>
      </div>

      {ready ? (
        <div className="grid gap-4 md:grid-cols-2">
          <TipSection icon={<UtensilsCrossed className="h-5 w-5" />} title={`Food strategies for ${destination}`} items={TRAVEL_TIPS.food} />
          <TipSection icon={<Droplets className="h-5 w-5" />} title="Hydration reminders" items={TRAVEL_TIPS.hydration} />
          <TipSection icon={<Footprints className="h-5 w-5" />} title="Movement ideas" items={TRAVEL_TIPS.movement} />
          <TipSection icon={<UtensilsCrossed className="h-5 w-5" />} title="Simple snack ideas" items={TRAVEL_TIPS.snacks} />
        </div>
      ) : (
        <p className="rounded-[16px] border border-dashed border-border bg-card/60 p-6 text-center text-sm text-muted-foreground">
          Enter a destination to see strategies.
        </p>
      )}

      <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-[20px] border border-teal/20 bg-gradient-to-br from-pale-teal to-card p-6 sm:flex-row sm:items-center">
        <div>
          <h3 className="font-display text-lg font-bold text-navy">Plan your {duration} trip</h3>
          <p className="mt-1 text-sm text-muted-foreground">Ask FitSlim AI for a full travel plan.</p>
        </div>
        <AskAiButton prompt={`Plan a ${duration} trip to ${destination} with a ${dining.toLowerCase()} approach.`} />
      </div>
    </PageLayout>
  );
}

function TipSection({ icon, title, items }: { icon: React.ReactNode; title: string; items: string[] }) {
  return (
    <section className="rounded-[20px] border border-border bg-card p-5 shadow-soft">
      <h2 className="flex items-center gap-2 font-display text-base font-bold text-navy">
        <span className="grid size-9 place-items-center rounded-[12px] bg-pale-teal text-teal">{icon}</span>
        {title}
      </h2>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-foreground">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-teal" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}