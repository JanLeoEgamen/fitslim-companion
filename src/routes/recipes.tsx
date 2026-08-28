import { createFileRoute } from "@tanstack/react-router";
import { Clock, UtensilsCrossed } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionPage } from "@/components/fitslim/SectionPage";
import { useFitSlim } from "@/lib/fitslim/store";
import { SECTIONS_BY_SLUG } from "@/lib/fitslim/sections";
import { RECIPES } from "@/lib/fitslim/data";

export const Route = createFileRoute("/recipes")({
  component: Recipes,
});

function Recipes() {
  const { saveItem, addGrocery } = useFitSlim();

  return (
    <SectionPage section={SECTIONS_BY_SLUG.recipes}>
      <div className="mb-6">
        <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-navy">
          <UtensilsCrossed className="h-5 w-5 text-teal" aria-hidden="true" />
          Quick recipes to try
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {RECIPES.map((recipe) => (
            <article
              key={recipe.id}
              className="flex flex-col rounded-[20px] border border-border bg-card p-5 shadow-soft"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-pale-teal px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-teal">
                  {recipe.tag}
                </span>
                <Badge variant="outline" className="gap-1 rounded-full text-muted-foreground">
                  <Clock className="h-3 w-3" /> {recipe.minutes} min
                </Badge>
              </div>
              <h3 className="mt-2.5 font-display text-lg font-bold text-navy">{recipe.title}</h3>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Ingredients
              </p>
              <ul className="mt-1 flex flex-wrap gap-1.5">
                {recipe.ingredients.map((ing) => (
                  <li
                    key={ing}
                    className="rounded-full bg-soft-green px-2.5 py-1 text-xs text-foreground"
                  >
                    {ing}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Steps
              </p>
              <ol className="mt-1 flex-1 space-y-1">
                {recipe.steps.map((step, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-[13px] leading-snug text-muted-foreground"
                  >
                    <span className="mt-0.5 grid size-4.5 shrink-0 place-items-center rounded-full bg-pale-teal text-[10px] font-bold text-navy">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  size="sm"
                  className="rounded-[12px] bg-teal text-white hover:bg-bright-teal"
                  onClick={() =>
                    saveItem({
                      title: recipe.title,
                      category: "Recipes",
                      summary: `${recipe.minutes}-minute ${recipe.tag.toLowerCase()} recipe.`,
                    })
                  }
                >
                  Save Recipe
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-[12px] border-teal text-teal hover:bg-pale-teal"
                  onClick={() => recipe.ingredients.forEach((name) => addGrocery(name, "Produce"))}
                >
                  Add to Grocery
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SectionPage>
  );
}
