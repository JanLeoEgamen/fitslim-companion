import { Bookmark, ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { AiMark } from "./AiMark";
import { Markdown } from "./Markdown";
import { RecipeCard } from "./RecipeCard";
import { SafetyBanner, type SafetyKind } from "./SafetyBanner";
import { Button } from "@/components/ui/button";
import { useFitSlim } from "@/lib/fitslim/store";
import { NAV_LABELS, type KnownPath } from "@/lib/fitslim/nav";
import type { ChatMessage } from "@/lib/fitslim/ai";
import { cn } from "@/lib/utils";

export function SafeLink({ to }: { to: KnownPath | string }) {
  const label = NAV_LABELS[to as KnownPath] || "Open";
  return (
    <Button
      size="sm"
      variant="outline"
      className="gap-1 rounded-[12px] border-teal text-teal hover:bg-pale-teal"
      asChild
    >
      <Link to={to as KnownPath}>
        {label}
        <ChevronRight className="h-3.5 w-3.5" />
      </Link>
    </Button>
  );
}

export function MessageBubble({ message }: { message: ChatMessage }) {
  const { send, saveItem } = useFitSlim();
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="fs-fade-in flex justify-end">
        <div
          className="max-w-[82%] rounded-[20px] rounded-br-md bg-navy px-4 py-3 text-[15px] leading-relaxed text-white shadow-soft sm:max-w-[72%]"
          aria-label="You"
        >
          {message.text}
        </div>
      </div>
    );
  }

  return (
    <div className="fs-fade-in flex items-start gap-2.5">
      <AiMark size={32} className="mt-1" />
      <div className="max-w-[88%] min-w-0 flex-1 sm:max-w-[78%]">
        <div className="rounded-[20px] rounded-tl-md border border-border bg-card px-4 py-3 shadow-soft">
          {message.safety && <SafetyBanner kind={message.safety as SafetyKind} />}
          <Markdown text={message.text} />
          {message.recipe && <RecipeCard recipe={message.recipe} />}
          {message.actions && message.actions.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {message.actions.map((action, index) => {
                if (action.to) return <SafeLink key={index} to={action.to} />;
                if (action.save) {
                  const saveValue = action.save;
                  return (
                    <Button
                      key={index}
                      size="sm"
                      variant="outline"
                      className="gap-1 rounded-[12px] border-teal text-teal hover:bg-pale-teal"
                      onClick={() => saveItem(saveValue)}
                    >
                      <Bookmark className="h-3.5 w-3.5" />
                      {action.label}
                    </Button>
                  );
                }
                return (
                  <Button
                    key={index}
                    size="sm"
                    className="rounded-[12px] bg-navy text-white hover:bg-deep-navy"
                    onClick={() => action.prompt && send(action.prompt)}
                  >
                    {action.label}
                  </Button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}