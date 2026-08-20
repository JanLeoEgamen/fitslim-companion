import { useState, type KeyboardEvent } from "react";
import { Camera, ListPlus, Mic, Plus, Send, Upload, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function ChatInput({
  draft,
  setDraft,
  onSend,
  disabled,
}: {
  draft: string;
  setDraft: (v: string) => void;
  onSend: (text: string) => void;
  disabled?: boolean;
}) {
  const [microphoneActive, setMicrophoneActive] = useState(false);

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

  return (
    <div className="border-t bg-background/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-1 px-4 py-3">
        <div className="flex items-end gap-2 rounded-[20px] border border-border bg-card px-2.5 py-2 shadow-soft focus-within:border-teal/60">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-muted-foreground hover:bg-pale-teal hover:text-navy"
                aria-label="Add attachment"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-52 rounded-[14px]">
              <DropdownMenuLabel className="text-xs text-muted-foreground">Attach</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="rounded-[10px]">
                <Upload className="h-4 w-4 text-teal" />
                Upload
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-[10px]">
                <ListPlus className="h-4 w-4 text-teal" />
                Saved foods
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-[10px]">
                <UtensilsCrossed className="h-4 w-4 text-teal" />
                Recipe
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-[10px]">
                <Camera className="h-4 w-4 text-teal" />
                Camera
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask FitSlim AI anything about your wellness journey..."
            rows={1}
            aria-label="Message FitSlim AI"
            className="max-h-32 min-h-[40px] flex-1 resize-none bg-transparent py-2 text-[15px] placeholder:text-muted-foreground/70 focus:outline-none"
            style={{ lineHeight: "1.4" }}
          />

          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-full",
              microphoneActive ? "bg-teal/20 text-teal" : "text-muted-foreground hover:bg-pale-teal hover:text-navy",
            )}
            aria-label="Use microphone"
            onClick={() => setMicrophoneActive((v) => !v)}
          >
            <Mic className="h-5 w-5" />
          </Button>

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