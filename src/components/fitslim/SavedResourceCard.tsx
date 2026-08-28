import { Bookmark, Calendar, ExternalLink, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFitSlim } from "@/lib/fitslim/store";
import type { SavedItem } from "@/lib/fitslim/data";

const CATEGORY_TINT: Record<string, string> = {
  Recipes: "bg-pale-teal text-navy",
  "Meal Plans": "bg-soft-green text-navy",
  Tips: "bg-light-blue text-navy",
  Conversations: "bg-purple/10 text-purple",
};

export function SavedResourceCard({ item }: { item: SavedItem }) {
  const { removeSaved } = useFitSlim();
  const tint = CATEGORY_TINT[item.category] ?? "bg-pale-teal text-navy";

  return (
    <div className="fs-fade-in flex flex-col gap-3 rounded-[20px] border border-border bg-card p-4 shadow-soft sm:flex-row sm:items-center">
      <span className="grid size-11 shrink-0 place-items-center rounded-[14px] bg-gradient-to-br from-navy to-teal">
        <Bookmark className="h-5 w-5 text-white" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="font-display text-[15px] font-semibold text-navy">{item.title}</h3>
        <p className="mt-0.5 text-[13px] leading-snug text-muted-foreground">{item.summary}</p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Badge className={`rounded-full px-2.5 ${tint}`}>{item.category}</Badge>
          <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
            <Calendar className="h-3 w-3" /> Saved {item.savedAt}
          </span>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          className="gap-1 rounded-[12px] border-teal text-teal hover:bg-pale-teal"
        >
          <ExternalLink className="h-3.5 w-3.5" /> Open
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="rounded-[12px] text-muted-foreground hover:text-destructive"
          onClick={() => removeSaved(item.id)}
          aria-label={`Remove ${item.title}`}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
