import { createFileRoute } from "@tanstack/react-router";
import { SectionChat } from "@/components/fitslim/SectionChat";
import { QUICK_PROMPTS } from "@/lib/fitslim/data";

export const Route = createFileRoute("/chat")({
  component: Chat,
});

function Chat() {
  return (
    <SectionChat
      slug="general"
      title="FitSlim AI™"
      emoji="✨"
      tagline="Your everyday health & wellness companion."
      chatIntro="Ask me about meals, nutrition, hydration, exercise, healthy habits, travel, or questions to discuss with your care team."
      quickPrompts={QUICK_PROMPTS.map((q) => ({ icon: q.icon, label: q.label, prompt: q.prompt }))}
      placeholder="Ask FitSlim AI anything about your wellness journey..."
      fullPage
    />
  );
}