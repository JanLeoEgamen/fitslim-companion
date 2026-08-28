import { Bookmark, Check, Clock, ListChecks, UtensilsCrossed } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SaveConfirmDialog } from "./SaveConfirmDialog";
import { useFitSlim } from "@/lib/fitslim/store";
import type { RecipeCardData } from "@/lib/fitslim/ai";

export function RecipeCard({ recipe }: { recipe: RecipeCardData }) {
  const { saveItem, addGrocery, saved } = useFitSlim();
  const isSaved = saved.some((x) => x.title === recipe.title);
  const saveValue = {
    title: recipe.title,
    category: "Recipes" as const,
    summary: `${recipe.minutes}-minute recipe with ${recipe.ingredients.length} everyday ingredients.`,
    content: recipe.ingredients.join(", "),
  };

  return (
    <div className="fs-card my-2.5 overflow-hidden" data-testid="recipe-card">
      <div className="flex items-center justify-between gap-2 border-b bg-gradient-to-r from-pale-teal to-card px-4 py-3">
        <p className="font-display text-[15px] font-semibold text-navy">{recipe.title}</p>
        <Badge variant="secondary" className="shrink-0 gap-1 rounded-full px-2.5">
          <Clock className="h-3 w-3" />
          {recipe.minutes} min
        </Badge>
      </div>
      <div className="space-y-3 px-4 py-3">
        {recipe.ingredients.length > 0 && (
          <div>
            <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-teal">
              <ListChecks className="h-3.5 w-3.5" />
              Ingredients
            </p>
            <ul className="ps-5 text-sm text-muted-foreground">
              {recipe.ingredients.map((item, i) => (
                <li key={i} className="list-disc leading-relaxed marker:text-teal">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
        {recipe.steps.length > 0 && (
          <div>
            <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-teal">
              <UtensilsCrossed className="h-3.5 w-3.5" />
              Steps
            </p>
            <ol className="space-y-1 ps-5 text-sm text-muted-foreground">
              {recipe.steps.map((step, i) => (
                <li
                  key={i}
                  className="list-decimal leading-relaxed marker:font-semibold marker:text-navy"
                >
                  {step}
                </li>
              ))}
            </ol>
          </div>
        )}
        <div className="flex flex-wrap gap-2 pt-1">
          {isSaved ? (
            <Button
              size="sm"
              disabled
              className="gap-1 rounded-[12px] border border-teal/40 bg-pale-teal text-navy"
            >
              <Check className="h-3.5 w-3.5 text-teal" /> Saved
            </Button>
          ) : (
            <SaveConfirmDialog onConfirm={() => saveItem(saveValue)} title={recipe.title}>
              <Button
                size="sm"
                className="gap-1 rounded-[12px] bg-teal text-white hover:bg-bright-teal"
              >
                <Bookmark className="h-3.5 w-3.5" /> Save Recipe
              </Button>
            </SaveConfirmDialog>
          )}
          <Button
            size="sm"
            variant="outline"
            className="rounded-[12px] border-teal text-teal hover:bg-pale-teal"
            onClick={() => {
              recipe.ingredients.forEach((name) => addGrocery(name, "Produce"));
            }}
          >
            Add to Grocery
          </Button>
        </div>
      </div>
    </div>
  );
}
