import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageLayout({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("h-full overflow-y-auto", className)}>
      <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6">{children}</div>
    </div>
  );
}