import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckSquare, Plus, Printer, ShoppingBasket, Square, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageLayout } from "@/components/fitslim/PageLayout";
import { PageHeader } from "@/components/fitslim/PageHeader";
import { EmptyState } from "@/components/fitslim/EmptyState";
import { useFitSlim } from "@/lib/fitslim/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/grocery-list")({
  component: GroceryList,
});

function GroceryList() {
  const { grocery, toggleGrocery, addGrocery, checkAllGrocery, clearGrocery } = useFitSlim();
  const [name, setName] = useState("");
  const [section, setSection] = useState("Produce");

  const sections = useMemo(() => {
    const seen = new Map<string, typeof grocery>();
    grocery.forEach((item) => {
      const list = seen.get(item.section) ?? [];
      list.push(item);
      seen.set(item.section, list);
    });
    return Array.from(seen.entries());
  }, [grocery]);

  const checked = grocery.filter((item) => item.checked).length;
  const allChecked = grocery.length > 0 && checked === grocery.length;

  const handleAdd = () => {
    if (!name.trim()) return;
    addGrocery(name.trim(), section);
    setName("");
  };

  return (
    <PageLayout>
      <PageHeader
        icon={<ShoppingBasket className="h-4.5 w-4.5 text-teal" />}
        title="Grocery List"
        subtitle="Your planned weekly list, organized by section."
        action={
          grocery.length > 0 ? (
            <span className="text-sm font-semibold text-muted-foreground">
              {checked} / {grocery.length} checked
            </span>
          ) : undefined
        }
      />

      <div className="mb-5 flex flex-col gap-2 rounded-[16px] border border-border bg-card p-4 shadow-soft sm:flex-row">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="Add an item..."
          className="flex-1 rounded-[12px] border-border bg-background"
        />
        <Select value={section} onValueChange={setSection}>
          <SelectTrigger className="w-full rounded-[12px] border-border bg-background sm:w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Proteins">Proteins</SelectItem>
            <SelectItem value="Produce">Produce</SelectItem>
            <SelectItem value="Pantry">Pantry</SelectItem>
          </SelectContent>
        </Select>
        <Button
          onClick={handleAdd}
          disabled={!name.trim()}
          className="gap-1.5 rounded-[12px] bg-teal text-white hover:bg-bright-teal"
        >
          <Plus className="h-4 w-4" /> Add Item
        </Button>
      </div>

      {grocery.length === 0 ? (
        <EmptyState
          icon={<ShoppingBasket className="h-6 w-6" />}
          title="No grocery items yet"
          description="Add items above, or ask FitSlim AI to build your list from a meal plan."
        />
      ) : (
        <div className="space-y-5">
          {sections.map(([sectionName, items]) => (
            <section key={sectionName}>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {sectionName}
              </h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.id}>
                    <label
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-[16px] border border-border bg-card px-4 py-3 shadow-soft transition hover:border-teal/40",
                        item.checked && "opacity-70",
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => toggleGrocery(item.id)}
                        className="size-4.5 accent-teal"
                      />
                      <span
                        className={cn(
                          "flex-1 text-sm",
                          item.checked && "line-through text-muted-foreground",
                        )}
                      >
                        {item.name}
                      </span>
                      {item.checked && <CheckIcon />}
                    </label>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <div className="flex flex-wrap gap-2 pt-1">
            <Button
              variant="outline"
              className="gap-1.5 rounded-[12px] border-teal text-teal hover:bg-pale-teal"
              onClick={() => checkAllGrocery(!allChecked)}
            >
              {allChecked ? <Square className="h-4 w-4" /> : <CheckSquare className="h-4 w-4" />}
              {allChecked ? "Uncheck All" : "Check All"}
            </Button>
            <Button
              variant="outline"
              className="gap-1.5 rounded-[12px] text-navy hover:bg-pale-teal"
              onClick={() => window.print()}
            >
              <Printer className="h-4 w-4" /> Print
            </Button>
            <Button
              variant="ghost"
              className="gap-1.5 rounded-[12px] text-muted-foreground hover:text-destructive"
              onClick={clearGrocery}
            >
              <Trash2 className="h-4 w-4" /> Clear
            </Button>
          </div>
        </div>
      )}
    </PageLayout>
  );
}

function CheckIcon() {
  return <CheckSquare className="h-4 w-4 shrink-0 text-teal" aria-hidden="true" />;
}
