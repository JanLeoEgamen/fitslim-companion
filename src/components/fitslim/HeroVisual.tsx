import { cn } from "@/lib/utils";
import { AiMark } from "./AiMark";

export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[520px]" aria-hidden="true">
      <div className="absolute -inset-4 rounded-[38px] bg-gradient-to-br from-pale-teal to-light-blue blur-2xl" />
      <div className="relative flex flex-col gap-5 p-4">
        {/* Main chat card */}
        <div className="rounded-[22px] border border-border bg-card p-5 shadow-lift">
          <div className="flex items-center gap-2.5">
            <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-navy to-teal">
              <AiMark size={26} />
            </span>
            <div>
              <p className="text-sm font-bold text-navy">FitSlim AI</p>
              <p className="text-[11px] text-muted-foreground">Educational support · Sent just now</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-foreground">
            Here's a simple option for a balanced dinner — <strong>Sheet-Pan Salmon &amp; Broccoli</strong>. Reheats
            well too.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-[12px] bg-navy px-3 py-1.5 text-xs font-semibold text-white">Save Recipe</span>
            <span className="rounded-[12px] border border-teal px-3 py-1.5 text-xs font-semibold text-teal">Add to Grocery</span>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="rounded-[16px] rounded-tr-md bg-navy px-4 py-3 shadow-soft">
            <p className="text-[13px] text-white">Can you share a healthy dinner idea?</p>
          </div>
        </div>

        {/* Floating chips */}
        <div className="grid grid-cols-3 gap-3">
          {["Post-workout snack", "Airport meal", "Protein breakfast"].map((chip) => (
            <div
              key={chip}
              className="rounded-[14px] border border-teal/25 bg-pale-teal px-3 py-2 text-[11px] font-medium text-navy shadow-soft"
            >
              {chip}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}