import { useEffect, useRef, useState, type KeyboardEvent, type Ref } from "react";
import { Mic, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ChatInput({
  draft,
  setDraft,
  onSend,
  disabled,
  variant = "page",
  placeholder = "Ask FitSlim AI anything about your wellness journey...",
  inputRef,
}: {
  draft: string;
  setDraft: (v: string) => void;
  onSend: (text: string) => void;
  disabled?: boolean;
  variant?: "page" | "embedded";
  placeholder?: string;
  inputRef?: Ref<HTMLTextAreaElement>;
}) {
  const [microphoneActive, setMicrophoneActive] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const submit = () => {
    const value = draft.trim();
    if (!value) return;
    onSend(value);
    setDraft("");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  };

  const stopListening = () => {
    const rec = recognitionRef.current;
    if (rec) {
      rec.onresult = null;
      rec.onerror = null;
      rec.onend = null;
      rec.stop();
      recognitionRef.current = null;
    }
    setMicrophoneActive(false);
  };

  const toggleMic = () => {
    if (microphoneActive) {
      stopListening();
      return;
    }

    const SpeechRecognitionCtor = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!SpeechRecognitionCtor) {
      toast.error("Voice input isn't supported", {
        description: "Try Google Chrome, Microsoft Edge, or Safari.",
      });
      return;
    }

    const rec = new SpeechRecognitionCtor();
    rec.lang = "en-US";
    rec.continuous = true;
    rec.interimResults = true;
    rec.maxAlternatives = 1;

    let finalTranscript = "";
    rec.onresult = (event) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (!result) continue;
        const transcript = result[0]?.transcript ?? "";
        if (result.isFinal) finalTranscript += transcript;
        else interim += transcript;
      }
      setDraft((finalTranscript + interim).trimStart());
    };
    rec.onerror = () => {
      stopListening();
      toast.error("Couldn't start voice input", {
        description: "Microphone permission may be needed.",
      });
    };
    rec.onend = () => {
      recognitionRef.current = null;
      setMicrophoneActive(false);
    };

    try {
      rec.start();
      recognitionRef.current = rec;
      setMicrophoneActive(true);
    } catch {
      toast.error("Couldn't start voice input", {
        description: "Microphone permission may be needed.",
      });
    }
  };

  // Abort any in-flight recognition session when the chat input unmounts.
  useEffect(() => {
    return () => {
      const rec = recognitionRef.current;
      if (rec) {
        rec.onresult = null;
        rec.onerror = null;
        rec.onend = null;
        rec.abort();
        recognitionRef.current = null;
      }
    };
  }, []);

  const embedded = variant === "embedded";

  return (
    <div className={cn(!embedded && "border-t bg-background/95 backdrop-blur")}>
      <div
        className={cn(
          "mx-auto flex w-full gap-1",
          embedded ? "flex-col" : "max-w-3xl flex-col px-4 py-3",
        )}
      >
        <div className="flex items-end gap-2 rounded-[20px] border border-border bg-card px-2.5 py-2 shadow-soft focus-within:border-teal/60">
          <textarea
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={1}
            aria-label="Message FitSlim AI"
            className="max-h-32 min-h-[40px] flex-1 resize-none bg-transparent py-2 text-[15px] placeholder:text-muted-foreground/70 focus:outline-none"
            style={{ lineHeight: "1.4" }}
          />

          {!embedded && (
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "rounded-full",
                microphoneActive
                  ? "bg-teal/20 text-teal"
                  : "text-muted-foreground hover:bg-pale-teal hover:text-navy",
              )}
              aria-label={microphoneActive ? "Stop voice input" : "Start voice input"}
              onClick={toggleMic}
            >
              <Mic className="h-5 w-5" />
            </Button>
          )}

          <Button
            size="icon"
            onClick={submit}
            disabled={disabled || !draft.trim()}
            className="rounded-full bg-teal text-white shadow-soft hover:bg-bright-teal disabled:opacity-40 disabled:shadow-none"
            aria-label="Send message"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
        <p className="px-1 text-center text-[11px] leading-snug text-muted-foreground/70">
          FitSlim AI provides educational support and does not replace your healthcare provider.
        </p>
      </div>
    </div>
  );
}
