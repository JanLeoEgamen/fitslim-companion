import { Sparkles } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { Button, type ButtonProps } from "@/components/ui/button";
import { useFitSlim } from "@/lib/fitslim/store";

type AskAiButtonProps = {
  prompt?: string;
  label?: string;
} & Partial<ButtonProps>;

export function AskAiButton({ prompt, label = "Ask FitSlim AI", type, ...rest }: AskAiButtonProps) {
  const { setDraft } = useFitSlim();
  const navigate = useNavigate();

  const handleClick = () => {
    if (prompt) setDraft(prompt);
    navigate({ to: "/chat" });
  };

  return (
    <Button
      type={type ?? "button"}
      onClick={handleClick}
      className="gap-1.5 rounded-[12px] bg-navy text-white hover:bg-deep-navy"
      {...rest}
    >
      <Sparkles className="h-4 w-4 text-teal" aria-hidden="true" />
      {label}
    </Button>
  );
}