"use client"

import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { CalendarClock, Check, Clock } from "lucide-react"

type PriceCard = {
  name: string
  price: string
  cadence: string
  items: string[]
  popular: boolean
}

export function Pricing() {
  const { t } = useLanguage()

  const cards: PriceCard[] = [
    {
      name: t("pricing.single"),
      price: "30",
      cadence: "USD / EUR",
      items: [t("pricing.duration"), t("pricing.free"), t("pricing.lessons")],
      popular: false,
    },
    {
      name: t("pricing.pack4"),
      price: "104",
      cadence: "USD / EUR",
      items: ["4 " + t("pricing.lessons"), t("pricing.duration"), t("pricing.free")],
      popular: false,
    },
    {
      name: t("pricing.pack10"),
      price: "200",
      cadence: "USD / EUR",
      items: ["10 " + t("pricing.lessons"), t("pricing.best"), t("pricing.duration")],
      popular: true,
    },
    {
      name: t("pricing.monthly"),
      price: "184",
      cadence: "USD / EUR",
      items: [t("pricing.monthlyNote"), t("pricing.duration"), t("pricing.free")],
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="section-pad bg-background">
      <div className="section-shell editorial-section">
        <aside>
          <div className="label-rule" />
          <h2 className="section-label">{t("pricing.label")}</h2>
          <p className="section-note">{t("pricing.body")}</p>
        </aside>

        <div className="space-y-5">
          <div className="rounded-[1.2rem] border border-border/85 bg-[var(--surface-soft)] p-5 text-primary shadow-[0_18px_56px_-48px_rgba(7,52,92,.16)]">
            <p className="fine-label">{t("pricing.free")}</p>
            <h3 className="mt-2 font-serif text-[1.8rem] font-normal leading-[1.06] tracking-[-0.045em]">{t("pricing.title")}</h3>
            <p className="mt-3 max-w-[72ch] text-[0.82rem] leading-[1.65] text-muted-foreground">{t("pricing.duration")}</p>
          </div>

          <div className="grid w-full gap-5 md:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => (
              <article key={card.name} className={`premium-card interactive-card relative flex min-h-[295px] flex-col p-6 ${card.popular ? "border-accent/70" : ""}`}>
                {card.popular ? (
                  <div className="absolute inset-x-0 top-0 rounded-t-[1.05rem] bg-accent py-1.5 text-center text-[0.7rem] font-semibold text-white">
                    {t("pricing.best")}
                  </div>
                ) : null}
                <div className={card.popular ? "pt-5" : ""}>
                  <h3 className="font-serif text-[1.15rem] font-normal tracking-[-0.035em] text-primary">{card.name}</h3>
                  <div className="mt-3 flex items-end gap-1">
                    <span className="font-serif text-[2.45rem] leading-none tracking-[-0.04em] text-primary">{card.price}</span>
                    <span className="pb-1 text-[0.72rem] font-semibold text-muted-foreground">{card.cadence}</span>
                  </div>
                  <ul className="mt-6 space-y-2.5">
                    {card.items.map((item) => (
                      <li key={item} className="flex gap-2 text-[0.82rem] leading-[1.45] text-muted-foreground">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button asChild className={`mt-auto h-10 rounded-full text-[0.78rem] font-semibold ${card.popular ? "bg-primary text-white hover:bg-primary/92" : "bg-white text-primary ring-1 ring-border hover:bg-secondary"}`}>
                  <a href="#contact">{t("hero.ctaPrimary")}</a>
                </Button>
              </article>
            ))}
          </div>

          <article className="rounded-[1.2rem] border border-border/85 bg-white p-5 shadow-[0_18px_56px_-48px_rgba(7,52,92,.16)]">
            <div className="grid gap-4 lg:grid-cols-[1fr_2fr] lg:items-center">
              <div>
                <p className="fine-label">{t("live.label")}</p>
                <h3 className="mt-2 font-serif text-[1.45rem] font-normal leading-[1.06] tracking-[-0.045em] text-primary">{t("pricing.liveTitle")}</h3>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {[t("pricing.liveNote1"), t("pricing.liveNote2"), t("pricing.liveNote3")].map((item, index) => (
                  <div key={item} className="flex gap-3 rounded-[0.85rem] bg-[var(--surface-soft)] p-4 text-[0.78rem] font-semibold leading-[1.45] text-primary ring-1 ring-border/60">
                    {index === 2 ? <CalendarClock className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> : <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />}
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
