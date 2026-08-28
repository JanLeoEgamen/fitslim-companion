import { Sparkles } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { Button, type ButtonProps } from "@/components/ui/button";
import { useFitSlim } from "@/lib/fitslim/store";
import { SECTIONS_BY_SLUG, type SectionSlug } from "@/lib/fitslim/sections";

type AskAiButtonProps = {
  prompt?: string;
  label?: string;
  /** When provided, sends the prompt straight into that section's own chatbot. */
  section?: SectionSlug;
} & Partial<ButtonProps>;

export function AskAiButton({
  prompt,
  label = "Ask FitSlim AI",
  type,
  section,
  ...rest
}: AskAiButtonProps) {
  const { setDraft, send, requestChatFocus } = useFitSlim();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!prompt) return;
    if (section) {
      send(section, prompt);
      requestChatFocus(section);
      navigate({ to: SECTIONS_BY_SLUG[section].path });
    } else {
      setDraft("general", prompt);
      navigate({ to: "/chat" });
    }
  };

  return (
    <Button
      type={type ?? "button"}
      onClick={handleClick}
      className="gap-1.5 rounded-[12px] bg-teal text-white hover:bg-bright-teal"
      {...rest}
    >
      <Sparkles className="h-4 w-4 text-teal" aria-hidden="true" />
      {label}
    </Button>
  );
}
