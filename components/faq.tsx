"use client"

import { useLanguage } from "@/lib/language-context"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQ() {
  const { t } = useLanguage()

  const items = [
    [t("faq.q1"), t("faq.a1")],
    [t("faq.q2"), t("faq.a2")],
    [t("faq.q3"), t("faq.a3")],
    [t("faq.q4"), t("faq.a4")],
    [t("faq.q5"), t("faq.a5")],
    [t("faq.q6"), t("faq.a6")],
    [t("faq.q7"), t("faq.a7")],
    [t("faq.q8"), t("faq.a8")],
    [t("faq.q9"), t("faq.a9")],
  ]

  return (
    <section id="faq" className="bg-background py-10 lg:py-12">
      <div className="section-shell grid gap-5 lg:grid-cols-[160px_1fr] lg:gap-8">
        <aside>
          <div className="label-rule" />
          <h2 className="font-serif text-[1.8rem] font-normal leading-none tracking-[-0.045em] text-primary">{t("faq.label")}</h2>
        </aside>

        <Accordion type="single" collapsible className="grid items-start gap-3 md:grid-cols-2 xl:grid-cols-3">
          {items.map(([question, answer]) => (
            <AccordionItem
              key={question}
              value={question}
              className="overflow-hidden rounded-[0.72rem] border border-border/90 bg-white px-4 shadow-[0_12px_40px_-34px_rgba(7,52,92,.14)] transition-all duration-300 data-[state=open]:bg-[var(--surface-soft)] data-[state=open]:shadow-[0_22px_58px_-42px_rgba(7,52,92,.22)]"
            >
              <AccordionTrigger className="min-h-[60px] py-3 text-left text-[0.76rem] font-semibold leading-snug text-primary hover:no-underline">
                {question}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-[0.76rem] leading-[1.58] text-muted-foreground">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}