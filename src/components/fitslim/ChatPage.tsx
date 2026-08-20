import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { BadgeCheck, Ellipsis, RotateCcw, ShieldCheck, SlidersHorizontal, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChatInput } from "./ChatInput";
import { MessageBubble } from "./MessageBubble";
import { QuickPrompts } from "./QuickPrompts";
import { TypingIndicator } from "./TypingIndicator";
import { AiMark } from "./AiMark";
import { useFitSlim } from "@/lib/fitslim/store";

export function ChatPage() {
  const { messages, isTyping, send, resetChat, draft, setDraft, member } = useFitSlim();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [messages.length, isTyping]);

  const isEmpty = messages.length === 0;

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Header */}
      <header className="flex shrink-0 items-center justify-between gap-3 border-b bg-background/95 px-4 py-3 backdrop-blur sm:px-6">
        <div className="min-w-0">
          <h1 className="font-display text-lg font-bold tracking-tight text-navy">FitSlim AI™</h1>
          <p className="truncate text-xs text-muted-foreground">Your everyday health &amp; wellness companion.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-soft-green px-2.5 py-1 text-xs font-medium text-navy">
            <BadgeCheck className="h-3.5 w-3.5 text-green" aria-hidden="true" />
            Educational Support
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:bg-pale-teal hover:text-navy" aria-label="Chat options">
                <Ellipsis className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-[14px]">
              <DropdownMenuLabel className="text-xs text-muted-foreground">Chat options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="rounded-[10px]" onSelect={resetChat}>
                <RotateCcw className="h-4 w-4 text-teal" /> Reset chat
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-[10px]" asChild>
                <Link to="/settings">
                  <SlidersHorizontal className="h-4 w-4 text-teal" /> Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-[10px]" asChild>
                <Link to="/safety">
                  <ShieldCheck className="h-4 w-4 text-teal" /> Help &amp; Safety
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Messages */}
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-3">
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center px-2 py-10 text-center fs-fade-in">
              <div className="mb-4 rounded-3xl bg-pale-teal p-5 shadow-soft">
                <AiMark size={48} />
              </div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
                Hi {member.firstName} 👋
              </h2>
              <h3 className="mt-1 font-display text-lg font-semibold text-foreground">How can I help you today?</h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                Ask me about meals, nutrition, hydration, exercise, healthy habits, travel, or questions to discuss with
                your care team.
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-soft-green px-3 py-1.5 text-xs font-medium text-navy">
                <Sparkles className="h-3.5 w-3.5 text-teal" />
                Educational support — I don't diagnose or prescribe.
              </div>
            </div>
          ) : null}

          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}

          {isTyping && <TypingIndicator />}
          <div ref={bottomRef} className="h-px" />
        </div>
      </div>

      {/* Quick prompts + input */}
      <div className="shrink-0">
        {isEmpty && (
          <div className="mx-auto w-full max-w-3xl px-4 pb-3 sm:px-6">
            <QuickPrompts onPick={send} />
          </div>
        )}
        <ChatInput draft={draft} setDraft={setDraft} onSend={send} disabled={isTyping} />
      </div>
    </div>
  );
}