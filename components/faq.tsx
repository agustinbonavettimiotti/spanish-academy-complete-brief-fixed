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
    <section id="faq" className="bg-background py-7 sm:py-9 lg:py-10">
      <div className="section-shell grid min-w-0 gap-5 lg:grid-cols-[minmax(160px,220px)_minmax(0,1fr)] lg:gap-8">
        <aside className="min-w-0">
          <div className="label-rule" />
          <h2 className="section-label">{t("faq.label")}</h2>
        </aside>

        <Accordion
          type="single"
          collapsible
          className="grid min-w-0 items-start gap-3 sm:grid-cols-2 xl:grid-cols-3"
        >
          {items.map(([question, answer], index) => (
            <AccordionItem
              key={`${question}-${index}`}
              value={`faq-${index}`}
              className="min-w-0 overflow-hidden rounded-[0.72rem] border border-border/90 bg-white px-4 shadow-[0_12px_40px_-34px_rgba(7,52,92,.14)] transition-all duration-300 data-[state=open]:shadow-[0_22px_58px_-42px_rgba(7,52,92,.22)]"
            >
              <AccordionTrigger className="min-h-[58px] py-3 text-left text-[0.76rem] font-semibold leading-snug text-primary hover:no-underline [&>svg]:h-4 [&>svg]:w-4 [&>svg]:shrink-0 [&>svg]:text-muted-foreground">
                <span className="min-w-0 break-words pr-2">{question}</span>
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