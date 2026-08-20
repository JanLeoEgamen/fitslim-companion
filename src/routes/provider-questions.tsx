import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, ClipboardList, Plus, Sparkles, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PageLayout } from "@/components/fitslim/PageLayout";
import { PageHeader } from "@/components/fitslim/PageHeader";
import { EmptyState } from "@/components/fitslim/EmptyState";
import { AskAiButton } from "@/components/fitslim/AskAiButton";
import { useFitSlim } from "@/lib/fitslim/store";
import { PROVIDER_QUESTION_SUGGESTIONS } from "@/lib/fitslim/data";

export const Route = createFileRoute("/provider-questions")({
  component: ProviderQuestions,
});

function ProviderQuestions() {
  const { providerQuestions, addProviderQuestion, removeProviderQuestion } = useFitSlim();
  const [custom, setCustom] = useState("");

  const submitCustom = () => {
    if (!custom.trim()) return;
    addProviderQuestion(custom.trim());
    setCustom("");
  };

  return (
    <PageLayout>
      <PageHeader
        icon={<ClipboardList className="h-4.5 w-4.5 text-teal" />}
        title="Questions for My Provider"
        subtitle="Prepare the questions you want to discuss at your next visit."
      />

      <section className="rounded-[20px] border border-border bg-card p-5 shadow-soft">
        <h2 className="flex items-center gap-2 font-display text-base font-bold text-navy">
          <Sparkles className="h-4.5 w-4.5 text-teal" /> Suggested questions
        </h2>
        <p className="mt-1 text-[13px] text-muted-foreground">Here are a few you may want to discuss:</p>
        <ul className="mt-3 space-y-2">
          {PROVIDER_QUESTION_SUGGESTIONS.map((q) => (
            <li key={q} className="flex items-center justify-between gap-3 rounded-[14px] border border-border bg-background px-4 py-3">
              <span className="text-sm text-foreground">{q}</span>
              <Button
                size="icon"
                variant="ghost"
                className="size-8 shrink-0 rounded-full text-teal hover:bg-pale-teal"
                onClick={() => addProviderQuestion(q)}
                aria-label={`Save question: ${q}`}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>

        <div className="mt-5 border-t pt-4">
          <label htmlFor="custom-q" className="text-sm font-semibold text-navy">Add your own question</label>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row">
            <Textarea
              id="custom-q"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder="What should I ask at my next visit?"
              rows={2}
              className="flex-1 rounded-[14px] border-border bg-background shadow-soft"
            />
            <Button
              type="button"
              onClick={submitCustom}
              disabled={!custom.trim()}
              className="gap-1.5 rounded-[12px] bg-navy text-white hover:bg-deep-navy sm:self-start"
            >
              <Plus className="h-4 w-4" /> Add
            </Button>
          </div>
        </div>
      </section>

      <section className="mt-5">
        <h2 className="mb-2 flex items-center gap-2 font-display text-lg font-bold text-navy">
          <CheckCircle2 className="h-5 w-5 text-teal" /> Saved Questions
          <span className="text-sm font-normal text-muted-foreground">({providerQuestions.length})</span>
        </h2>
        {providerQuestions.length === 0 ? (
          <EmptyState
            icon={<ClipboardList className="h-6 w-6" />}
            title="No saved questions yet"
            description="Save suggested questions or add your own to bring to your provider."
          />
        ) : (
          <ul className="space-y-2.5">
            {providerQuestions.map((q) => (
              <li key={q.id} className="flex items-center justify-between gap-3 rounded-[16px] border border-border bg-card px-4 py-3.5 shadow-soft">
                <span className="text-sm text-foreground">{q.text}</span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="size-8 shrink-0 rounded-full text-muted-foreground hover:text-destructive"
                  onClick={() => removeProviderQuestion(q.id)}
                  aria-label={`Remove question`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        )}
        {providerQuestions.length > 0 && (
          <div className="mt-4">
            <AskAiButton label="Ask FitSlim AI" prompt="Help me prepare questions for my next provider visit." />
          </div>
        )}
      </section>
    </PageLayout>
  );
}