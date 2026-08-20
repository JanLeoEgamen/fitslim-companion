import { AiMark } from "./AiMark";

export function TypingIndicator() {
  return (
    <div className="fs-fade-in flex items-end gap-2" role="status" aria-label="FitSlim AI is typing">
      <AiMark size={30} />
      <div className="max-w-[260px] rounded-[18px] rounded-b-sm border bg-card px-4 py-3 shadow-soft">
        <span className="flex h-4 items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-teal"
              style={{ animation: "fs-dot 1.2s ease-in-out infinite", animationDelay: i * 0.15 + "s" }}
            />
          ))}
        </span>
      </div>
    </div>
  );
}