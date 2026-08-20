import type { ReactNode } from "react";

export function PageHeader({
  title,
  subtitle,
  action,
  icon,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
      <div className="min-w-0">
        <div className="flex items-center gap-2.5">
          {icon && <span className="grid size-9 shrink-0 place-items-center rounded-[12px] bg-pale-teal">{icon}</span>}
          <h1 className="font-display text-2xl font-bold tracking-tight text-navy sm:text-[26px]">{title}</h1>
        </div>
        {subtitle && <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}