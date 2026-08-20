import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Bookmark } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PageLayout } from "@/components/fitslim/PageLayout";
import { PageHeader } from "@/components/fitslim/PageHeader";
import { EmptyState } from "@/components/fitslim/EmptyState";
import { SavedResourceCard } from "@/components/fitslim/SavedResourceCard";
import { useFitSlim } from "@/lib/fitslim/store";

export const Route = createFileRoute("/saved")({
  component: Saved,
});

const CATEGORIES = ["All", "Recipes", "Meal Plans", "Tips", "Academy", "Conversations"] as const;

function Saved() {
  const { saved } = useFitSlim();
  const [tab, setTab] = useState<string>("All");

  const filtered = tab === "All" ? saved : saved.filter((item) => item.category === tab);

  return (
    <PageLayout>
      <PageHeader
        icon={<Bookmark className="h-4.5 w-4.5 text-teal" />}
        title="Saved Resources"
        subtitle="Recipes, meal plans, and helpful answers — all in one place."
      />
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="mb-5 h-auto flex-wrap gap-1 rounded-[16px] bg-muted p-1.5">
          {CATEGORIES.map((cat) => (
            <TabsTrigger key={cat} value={cat} className="rounded-[12px] px-3 py-1.5 text-[13px] data-[state=active]:bg-navy data-[state=active]:text-white">
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={tab} className="mt-0">
          {filtered.length === 0 ? (
            <EmptyState
              icon={<Bookmark className="h-6 w-6" />}
              title="Nothing saved yet"
              description="Save recipes, meal plans, and helpful answers so they're easy to find later."
            />
          ) : (
            <div className="space-y-3">
              {filtered.map((item) => (
                <SavedResourceCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
}