import type { ReactNode } from "react";
import { Check, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export { HeroVisual } from "@/components/fitslim/HeroVisual";

export function AlertBanner({
  tone,
  title,
  children,
  className,
}: {
  tone: "info" | "urgent" | "success";
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[20px] border p-5",
        tone === "urgent" ? "border-destructive/25 bg-destructive/10" : "border-teal/25 bg-light-blue/40",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        {tone === "urgent" ? (
          <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
        ) : (
          <Check className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
        )}
        <div>
          <p className="font-display text-base font-bold text-navy">{title}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{children}</p>
        </div>
      </div>
    </div>
  );
}