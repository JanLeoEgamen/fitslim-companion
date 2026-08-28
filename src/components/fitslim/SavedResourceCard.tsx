import { Bookmark, Calendar, Eye, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Markdown } from "./Markdown";
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
  const fullText = item.content || item.summary;

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
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="sm"
              variant="outline"
              className="gap-1 rounded-[12px] border-teal text-teal hover:bg-pale-teal"
            >
              <Eye className="h-3.5 w-3.5" /> Open
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl rounded-[20px]">
            <DialogHeader>
              <DialogTitle className="font-display text-lg font-bold text-navy">
                {item.title}
              </DialogTitle>
              <DialogDescription>
                {item.category} · Saved {item.savedAt}
              </DialogDescription>
            </DialogHeader>
            <div className="max-h-[60vh] overflow-y-auto rounded-[14px] border border-border bg-background p-4">
              <Markdown text={fullText} />
            </div>
          </DialogContent>
        </Dialog>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              className="rounded-[12px] text-muted-foreground hover:text-destructive"
              aria-label={`Remove ${item.title}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="rounded-[20px]">
            <AlertDialogHeader>
              <AlertDialogTitle>Remove from Saved?</AlertDialogTitle>
              <AlertDialogDescription>
                "{item.title}" will be removed from your Saved resources. This can't be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="rounded-[12px]">Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => removeSaved(item.id)}
                className="gap-1.5 rounded-[12px] bg-destructive text-white hover:bg-destructive/90"
              >
                <Trash2 className="h-4 w-4" /> Remove
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
