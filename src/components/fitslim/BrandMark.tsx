import { cn } from "@/lib/utils";
import { AiMark } from "./AiMark";

export function BrandMark({
  className,
  subtitle = "Powered by FitSlim USA",
}: {
  className?: string;
  subtitle?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="grid size-10 place-items-center rounded-[14px] shadow-soft" aria-hidden="true">
        <AiMark size={30} />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-bold tracking-tight text-navy">FitSlim AI™</span>
        <span className="text-[11px] leading-tight text-muted-foreground">{subtitle}</span>
      </span>
    </span>
  );
}