import { HeartPulse, ShieldAlert, TriangleAlert } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SAFETY_COPY = {
  general: {
    tint: "bg-light-blue",
    dot: "bg-cobalt",
    icon: HeartPulse,
    title: "Some questions are best answered by your care team.",
  },
  glp1: {
    tint: "bg-light-blue",
    dot: "bg-cobalt",
    icon: ShieldAlert,
    title: "Medication decisions belong to your provider — I'm here for nutrition education.",
  },
  urgent: {
    tint: "bg-destructive/10",
    dot: "bg-destructive",
    icon: TriangleAlert,
    title: "FitSlim AI is not an emergency service.",
  },
} as const;

export type SafetyKind = keyof typeof SAFETY_COPY;

export function SafetyBanner({ kind }: { kind: SafetyKind }) {
  const cfg = SAFETY_COPY[kind];
  return (
    <div
      className={cn("fs-fade-in my-2.5 rounded-[16px] border border-teal/20 px-4 py-3", cfg.tint)}
    >
      <div className="flex items-start gap-2.5">
        <cfg.icon className="mt-0.5 h-4 w-4 shrink-0 text-navy" />
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-navy">{cfg.title}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {kind === "urgent"
              ? "For urgent or emergency symptoms, seek appropriate medical care through your local emergency resources."
              : "FitSlim AI provides educational support and does not replace your provider, diagnose, treat, or change medications."}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="outline"
              className="rounded-[12px] border-navy bg-background text-navy hover:bg-pale-teal"
              asChild
            >
              <Link to="/safety">See Safety Information</Link>
            </Button>
            {kind === "urgent" ? (
              <Button
                size="sm"
                className="rounded-[12px] bg-teal text-white hover:bg-bright-teal"
                asChild
              >
                <Link to="/provider-questions">Contact My Care Team</Link>
              </Button>
            ) : (
              <Button
                size="sm"
                className="rounded-[12px] bg-teal text-white hover:bg-bright-teal"
                asChild
              >
                <Link to="/provider-questions">Talk to My Provider</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
