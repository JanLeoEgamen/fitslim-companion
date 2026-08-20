import { createFileRoute, Link } from "@tanstack/react-router";
import { ClipboardList, LifeBuoy, ShieldCheck, TriangleAlert } from "lucide-react";
import { PageLayout } from "@/components/fitslim/PageLayout";
import { PageHeader } from "@/components/fitslim/PageHeader";
import { FAQAccordion } from "@/components/fitslim/FAQAccordion";
import { AskAiButton } from "@/components/fitslim/AskAiButton";

export const Route = createFileRoute("/safety")({
  component: Safety,
});

function Safety() {
  return (
    <PageLayout>
      <PageHeader
        icon={<ShieldCheck className="h-4.5 w-4.5 text-teal" />}
        title="Help &amp; Safety"
        subtitle="How FitSlim AI supports your wellness journey — and where it doesn't."
      />

      <div className="mb-5 flex items-start gap-3 rounded-[20px] border border-destructive/20 bg-destructive/10 p-5">
        <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
        <div>
          <h2 className="font-display text-lg font-bold text-foreground">FitSlim AI is not an emergency service.</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground">
            For urgent or emergency symptoms, seek appropriate medical care through your local emergency resources. The
            app is not a monitoring service — FitSlim AI never receives or responds to live health events.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <section className="rounded-[20px] border border-border bg-card p-5 shadow-soft">
          <h2 className="flex items-center gap-2 font-display text-base font-bold text-navy">
            <LifeBuoy className="h-4.5 w-4.5 text-teal" /> What FitSlim AI can help with
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
            <li className="flex items-start gap-2"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-teal" /> General nutrition and meal education</li>
            <li className="flex items-start gap-2"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-teal" /> Recipes, grocery lists and restaurant ideas</li>
            <li className="flex items-start gap-2"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-teal" /> Hydration, movement, sleep and habit coaching</li>
            <li className="flex items-start gap-2"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-teal" /> Getting ready to talk with your care team</li>
          </ul>
        </section>

        <section className="rounded-[20px] border border-border bg-card p-5 shadow-soft">
          <h2 className="flex items-center gap-2 font-display text-base font-bold text-navy">
            <ShieldCheck className="h-4.5 w-4.5 text-teal" /> Boundaries
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
            <li className="flex items-start gap-2"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-teal" /> FitSlim AI does not diagnose, treat, or replace your provider.</li>
            <li className="flex items-start gap-2"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-teal" /> It cannot prescribe or change any medication.</li>
            <li className="flex items-start gap-2"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-teal" /> It does not interpret labs or personal medical results.</li>
            <li className="flex items-start gap-2"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-teal" /> It never implies your care team has been notified.</li>
          </ul>
        </section>
      </div>

      <section className="mt-5 rounded-[20px] border border-border bg-card p-5 shadow-soft">
        <h2 className="flex items-center gap-2 font-display text-base font-bold text-navy">
          <ClipboardList className="h-4.5 w-4.5 text-teal" /> Ready for your next visit?
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Build a list of questions to bring to your provider.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <AskAiButton label="Prepare Provider Questions" />
          <Link
            to="/provider-questions"
            className="inline-flex items-center gap-1.5 rounded-[12px] border border-teal px-4 py-2 text-sm font-medium text-teal transition hover:bg-pale-teal"
          >
            Open Tool
          </Link>
        </div>
      </section>

      <section className="mt-5">
        <h2 className="mb-3 font-display text-lg font-bold text-navy">Frequently asked questions</h2>
        <FAQAccordion />
      </section>
    </PageLayout>
  );
}