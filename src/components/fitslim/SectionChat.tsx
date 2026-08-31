import { useEffect, useRef, useState } from "react";
import { ArrowDown, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatInput } from "./ChatInput";
import { MessageBubble } from "./MessageBubble";
import { QuickPrompts } from "./QuickPrompts";
import { TypingIndicator } from "./TypingIndicator";
import { AiMark } from "./AiMark";
import { useChatScroll } from "./useChatScroll";
import { useFitSlim } from "@/lib/fitslim/store";
import { type ChatMessage } from "@/lib/fitslim/ai";
import { type ConversationKey } from "@/lib/fitslim/sections";

type QuickPromptLike = { label: string; prompt: string; icon: string };

/** Stable empty conversation used when a section has not been started yet. */
const EMPTY_CONVERSATION: ChatMessage[] = [];

/** Newest messages kept fully expanded; older AI answers collapse by default. */
const AUTO_EXPAND_COUNT = 4;

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
  const {
    conversations,
    typing,
    drafts,
    send,
    resetChat,
    setDraft,
    chatFocus,
    clearChatFocus,
    member,
  } = useFitSlim();
  const messages = conversations[slug] ?? EMPTY_CONVERSATION;
  const isTyping = typing[slug] ?? false;
  const draft = drafts[slug] ?? "";

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const {
    ref: scrollRef,
    isNearBottom,
    showJumpToLatest,
    scrollToBottom,
  } = useChatScroll<HTMLDivElement>();

  // Latest viewport state so the auto-scroll effect never uses a stale value.
  const isNearBottomRef = useRef(isNearBottom);
  isNearBottomRef.current = isNearBottom;
  const prevCountRef = useRef<number>(messages.length);

  const isEmpty = messages.length === 0;

  // Per-message collapse overrides keyed by message id (false = force expanded).
  const [collapsedMap, setCollapsedMap] = useState<Record<string, boolean>>({});

  // Smart auto-scroll: only follow new content when the user is already near the
  // bottom or just sent their own message — never yank the reader away from
  // older history they are scrolling through.
  useEffect(() => {
    if (!fullPage) return;
    const el = scrollRef.current;
    if (!el) return;
    const prev = prevCountRef.current;
    prevCountRef.current = messages.length;

    if (messages.length === 0) {
      el.scrollTop = 0;
      return;
    }
    if (prev === 0) {
      scrollToBottom();
      return;
    }
    const appended = messages.slice(prev);
    const lastRole = appended[appended.length - 1]?.role;
    if (isNearBottomRef.current || lastRole === "user") scrollToBottom();
  }, [messages.length, messages, fullPage, scrollToBottom, scrollRef]);

  // Keep the typing indicator in view when the user is already at the bottom.
  useEffect(() => {
    if (fullPage && isTyping && isNearBottomRef.current) scrollToBottom();
  }, [isTyping, fullPage, scrollToBottom]);

  // Embedded chats live inside a scrolling page — keep the input reachable after
  // new content without pulling the user down while they read older messages.
  useEffect(() => {
    if (fullPage || isEmpty) return;
    const rect = inputRef.current?.getBoundingClientRect();
    const viewport = window.innerHeight;
    if (rect && rect.top <= viewport && rect.bottom > viewport) {
      inputRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [messages.length, isTyping, fullPage, isEmpty]);

  // Forget collapse overrides when the conversation is reset.
  useEffect(() => {
    if (messages.length === 0) setCollapsedMap({});
  }, [messages.length]);

  useEffect(() => {
    if (chatFocus && chatFocus.key === slug) {
      wrapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => inputRef.current?.focus(), 360);
      clearChatFocus();
    }
  }, [chatFocus, slug, clearChatFocus]);

  const prompts = quickPrompts?.map((p) => ({ label: p.label, icon: p.icon, prompt: p.prompt }));

  // AI messages older than the newest AUTO_EXPAND_COUNT collapse by default,
  // unless the user has explicitly expanded (or re-collapsed) that message.
  const collapsedOf = (message: ChatMessage, index: number): boolean => {
    if (message.role !== "ai") return false;
    const override = collapsedMap[message.id];
    if (override !== undefined) return override;
    return messages.length - index > AUTO_EXPAND_COUNT;
  };

  const toggleCollapsed = (id: string, currently: boolean) => {
    setCollapsedMap((m) => ({ ...m, [id]: !currently }));
  };
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
        <div className="relative min-h-0 flex-1">
          <div ref={scrollRef} className="h-full min-h-0 overflow-y-auto px-4 py-4 sm:px-6">
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-3">
              {isEmpty ? (
                <div className="flex flex-col items-center justify-center px-2 py-10 text-center fs-fade-in">
                  <div className="mb-4 rounded-3xl bg-pale-teal p-5 shadow-soft">
                    <AiMark size={48} />
                  </div>
                  <h2 className="font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
                    Hi {member.firstName} 👋
                  </h2>
                  <h3 className="mt-1 font-display text-lg font-semibold text-foreground">
                    How can I help you today?
                  </h3>
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
                  {messages.map((message, index) => (
                    <MessageBubble
                      key={message.id}
                      message={message}
                      conversationKey={slug}
                      collapsed={collapsedOf(message, index)}
                      onToggleCollapsed={() =>
                        toggleCollapsed(message.id, collapsedOf(message, index))
                      }
                    />
                  ))}
                  {isTyping && <TypingIndicator />}
                </>
              )}
            </div>
          </div>
          {showJumpToLatest && !isEmpty && (
            <button
              type="button"
              onClick={() => scrollToBottom("smooth")}
              aria-label="Jump to latest message"
              className="fs-fade-in absolute right-4 bottom-4 z-20 flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-2 text-sm font-semibold text-teal shadow-lift transition hover:bg-pale-teal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
            >
              <ArrowDown className="h-4 w-4" />
              Latest
            </button>
          )}
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
    <section
      ref={wrapRef}
      className="scroll-mt-4 overflow-hidden rounded-[20px] border border-border bg-card shadow-soft"
    >
      <div className="flex items-center justify-between gap-2 border-b bg-pale-teal/60 px-4 py-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            className="grid size-9 shrink-0 place-items-center rounded-[12px] bg-pale-teal text-lg"
            aria-hidden="true"
          >
            {emoji}
          </span>
          <div className="min-w-0">
            <h2 className="font-display text-base font-bold leading-tight text-navy">
              {title} assistant
            </h2>
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
            {messages.map((message, index) => (
              <MessageBubble
                key={message.id}
                message={message}
                conversationKey={slug}
                collapsed={collapsedOf(message, index)}
                onToggleCollapsed={() => toggleCollapsed(message.id, collapsedOf(message, index))}
              />
            ))}
            {isTyping && <TypingIndicator />}
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
