import { Fragment, type ReactNode } from "react";

type ListType = "bullet" | "number";

function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") && part.length > 4 ? (
          <strong key={i} className="font-semibold">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

export function Markdown({ text }: { text: string }) {
  const lines = text.split("\n");
  const blocks: ReactNode[] = [];
  let list: { type: ListType; items: string[] } | null = null;

  const flushList = (key: number) => {
    if (!list) return;
    const cls = list.type === "bullet" ? "list-disc marker:text-teal" : "list-decimal marker:text-navy";
    blocks.push(
      <ul key={key} className={"my-1.5 space-y-1 ps-5 " + cls}>
        {list.items.map((item, i) => (
          <li key={i} className="leading-relaxed">
            <Inline text={item} />
          </li>
        ))}
      </ul>,
    );
    list = null;
  };

  lines.forEach((raw, idx) => {
    const line = raw.trimEnd();
    const heading = line.match(/^#{1,3}\s+(.*)$/);
    const bullet = line.match(/^[-*•]\s+(.*)$/);
    const number = line.match(/^\d+\.\s+(.*)$/);

    if (heading) {
      flushList(idx);
      blocks.push(
        <h4 key={"h" + idx} className="font-display mt-2 mb-1 text-[15px] font-bold text-navy">
          <Inline text={heading[1] ?? ""} />
        </h4>,
      );
    } else if (bullet) {
      if (!list || list.type !== "bullet") {
        flushList(idx);
        list = { type: "bullet", items: [] };
      }
      list.items.push(bullet[1]?.trim() ?? "");
    } else if (number) {
      if (!list || list.type !== "number") {
        flushList(idx);
        list = { type: "number", items: [] };
      }
      list.items.push(number[1]?.trim() ?? "");
    } else if (!line.trim()) {
      flushList(idx);
    } else {
      flushList(idx);
      blocks.push(
        <p key={"p" + idx} className="mt-1.5 leading-relaxed">
          <Inline text={line} />
        </p>,
      );
    }
  });
  flushList(lines.length + 1);
  return <div className="text-[15px] leading-relaxed">{blocks}</div>;
}