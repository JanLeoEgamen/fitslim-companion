import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQS } from "@/lib/fitslim/data";

export function FAQAccordion() {
  return (
    <Accordion type="single" collapsible className="space-y-2">
      {FAQS.map((faq, index) => (
        <AccordionItem
          key={index}
          value={`faq-${index}`}
          className="rounded-[16px] border border-border bg-card px-1 shadow-soft"
        >
          <AccordionTrigger className="px-3 text-left text-sm font-semibold text-navy hover:no-underline">
            {faq.q}
          </AccordionTrigger>
          <AccordionContent className="px-3 text-sm leading-relaxed text-muted-foreground">{faq.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}