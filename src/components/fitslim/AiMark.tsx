import { cn } from "@/lib/utils";

export function AiMark({ className, size = 32 }: { className?: string; size?: number }) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-flex shrink-0 items-center justify-center rounded-full", className)}
      style={{
        width: size,
        height: size,
        background: "linear-gradient(140deg, var(--navy) 0%, var(--dark-teal) 55%, var(--teal) 100%)",
      }}
    >
      <svg width={size * 0.56} height={size * 0.56} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3.2" fill="white" />
        <path d="M12 1.8c5.6 0 10.2 4.6 10.2 10.2" stroke="white" strokeOpacity="0.9" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M12 22.2C6.4 22.2 1.8 17.6 1.8 12" stroke="white" strokeOpacity="0.55" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M18.6 12A6.6 6.6 0 0 1 12 18.6" stroke="white" strokeOpacity="0.75" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </span>
  );
}