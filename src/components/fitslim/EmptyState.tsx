import type { ReactNode } from "react";

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="fs-fade-in flex flex-col items-center justify-center rounded-[20px] border border-dashed border-border bg-card/60 px-6 py-12 text-center">
      <span className="mb-3 grid size-14 place-items-center rounded-2xl bg-pale-teal text-teal" aria-hidden="true">
        {icon}
      </span>
      <h3 className="font-display text-lg font-semibold text-navy">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-muted-foreground">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}