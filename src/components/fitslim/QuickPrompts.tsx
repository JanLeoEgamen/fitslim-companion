import { QUICK_PROMPTS } from "@/lib/fitslim/data";

export function QuickPrompts({
  onPick,
  className,
}: {
  onPick: (prompt: string) => void;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Suggested to get you started
      </p>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {QUICK_PROMPTS.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => onPick(item.prompt)}
            className="group flex min-h-[54px] items-center gap-3 rounded-[16px] border border-border bg-card px-3.5 py-2.5 text-left shadow-soft transition hover:-translate-y-0.5 hover:border-teal/50 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
          >
            <span aria-hidden="true" className="text-xl leading-none">
              {item.icon}
            </span>
            <span className="text-[13px] font-medium leading-snug text-foreground">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}