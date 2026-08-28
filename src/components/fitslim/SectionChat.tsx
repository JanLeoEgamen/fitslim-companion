import { useEffect, useRef } from "react";
import { RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatInput } from "./ChatInput";
import { MessageBubble } from "./MessageBubble";
import { QuickPrompts } from "./QuickPrompts";
import { TypingIndicator } from "./TypingIndicator";
import { AiMark } from "./AiMark";
import { useFitSlim } from "@/lib/fitslim/store";
import { type ConversationKey } from "@/lib/fitslim/sections";

type QuickPromptLike = { label: string; prompt: string; icon: string };

export function SectionChat({
  slug,
  title,
  emoji,
  tagline,
  chatIntro,
  quickPrompts,
  placeholder = "Ask FitSlim AI anything about your wellness journey...",
  fullPage = false,
}: {
  slug: ConversationKey;
  title: string;
  emoji: string;
  tagline: string;
  chatIntro?: string;
  quickPrompts?: QuickPromptLike[];
  placeholder?: string;
  fullPage?: boolean;
}) {
  const { conversations, typing, drafts, send, resetChat, setDraft, chatFocus, clearChatFocus, member } = useFitSlim();
  const messages = conversations[slug] ?? [];
  const isTyping = typing[slug] ?? false;
  const draft = drafts[slug] ?? "";

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [messages.length, isTyping]);

  useEffect(() => {
    if (chatFocus && chatFocus.key === slug) {
      wrapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => inputRef.current?.focus(), 360);
      clearChatFocus();
    }
  }, [chatFocus, slug, clearChatFocus]);

  const isEmpty = messages.length === 0;
  const prompts = quickPrompts?.map((p) => ({ label: p.label, icon: p.icon, prompt: p.prompt }));
if (fullPage) {
    return (
      <div className="fs-surface flex h-full min-h-0 flex-col overflow-hidden">
        <header className="flex shrink-0 items-center justify-between gap-3 border-b bg-background/95 px-4 py-3 backdrop-blur sm:px-6">
          <div className="min-w-0">
            <h1 className="font-display text-lg font-bold tracking-tight text-navy">{title}</h1>
            <p className="truncate text-xs text-muted-foreground">{tagline}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-soft-green px-2.5 py-1 text-xs font-medium text-navy">
              <Sparkles className="h-3.5 w-3.5 text-teal" aria-hidden="true" />
              Educational Support
            </span>
            {messages.length > 0 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => resetChat(slug)}
                aria-label="Reset chat"
                className="rounded-full text-muted-foreground hover:bg-pale-teal hover:text-navy"
              >
                <RotateCcw className="h-5 w-5" />
              </Button>
            )}
          </div>
        </header>
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
                  {chatIntro ?? tagline}
                </p>
                {prompts && (
                  <div className="mt-6 w-full max-w-2xl">
                    <QuickPrompts onPick={(p) => send(slug, p)} items={prompts} />
                  </div>
                )}
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <MessageBubble key={message.id} message={message} conversationKey={slug} />
                ))}
                {isTyping && <TypingIndicator />}
                <div ref={bottomRef} className="h-px" />
              </>
            )}
          </div>
        </div>
        <div className="shrink-0">
          <ChatInput
            draft={draft}
            setDraft={(v) => setDraft(slug, v)}
            onSend={(t) => send(slug, t)}
            disabled={isTyping}
            placeholder={placeholder}
            inputRef={inputRef}
          />
        </div>
      </div>
    );
  }

  return (
    <section ref={wrapRef} className="scroll-mt-4 overflow-hidden rounded-[20px] border border-border bg-card shadow-soft">
      <div className="flex items-center justify-between gap-2 border-b bg-pale-teal/60 px-4 py-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="grid size-9 shrink-0 place-items-center rounded-[12px] bg-pale-teal text-lg" aria-hidden="true">
            {emoji}
          </span>
          <div className="min-w-0">
            <h2 className="font-display text-base font-bold leading-tight text-navy">{title} assistant</h2>
            <p className="truncate text-xs text-muted-foreground">{chatIntro ?? tagline}</p>
          </div>
        </div>
        {messages.length > 0 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => resetChat(slug)}
            aria-label="Reset chat"
            className="rounded-full text-muted-foreground hover:bg-pale-teal hover:text-navy"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-3 px-4 py-4">
        {isEmpty ? (
          <div className="fs-fade-in text-center">
            <p className="mx-auto max-w-md text-sm leading-relaxed text-muted-foreground">
              Ask me anything about {title} — tap a suggestion or type below.
            </p>
            {prompts && (
              <div className="mt-4">
                <QuickPrompts onPick={(p) => send(slug, p)} items={prompts} />
              </div>
            )}
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} conversationKey={slug} />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={bottomRef} className="h-px" />
          </>
        )}
      </div>
      <div className="border-t bg-background/60 px-4 py-3">
        <ChatInput
          variant="embedded"
          draft={draft}
          setDraft={(v) => setDraft(slug, v)}
          onSend={(t) => send(slug, t)}
          disabled={isTyping}
          placeholder={placeholder}
          inputRef={inputRef}
        />
      </div>
    </section>
  );
}