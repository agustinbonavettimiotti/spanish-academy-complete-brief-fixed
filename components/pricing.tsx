"use client"

import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { CalendarClock, Check, Clock } from "lucide-react"

type PriceCard = {
  name: React.ReactNode
  price: string
  cadence: string
  items: string[]
  popular: boolean
}

export function Pricing() {
  const { t, language } = useLanguage()

  const cards: PriceCard[] = [
    {
      name: (
        <>
          Spanish Academy
          <br />
          Starter Pack
          <br />
          <span className="block text-[0.94rem] tracking-[-0.02em] text-primary/80">(2 Lessons)</span>
        </>
      ),
      price: "65",
      cadence: "EUR",
      items: ["2 " + t("pricing.lessons"), t("pricing.duration"), t("pricing.free")],
      popular: false,
    },
    {
      name: (
        <>
          Spanish Academy
          <br />
          Standard Pack
          <br />
          <span className="block text-[0.94rem] tracking-[-0.02em] text-primary/80">(4 Lessons)</span>
        </>
      ),
      price: "125",
      cadence: "EUR",
      items: ["4 " + t("pricing.lessons"), t("pricing.duration"), t("pricing.free")],
      popular: false,
    },
    {
      name: (
        <>
          Spanish Academy
          <br />
          Plus Pack
          <br />
          <span className="block text-[0.94rem] tracking-[-0.02em] text-primary/80">(8 Lessons)</span>
        </>
      ),
      price: "235",
      cadence: "EUR",
      items: ["8 " + t("pricing.lessons"), t("pricing.duration"), t("pricing.free")],
      popular: true,
    },
    {
      name: (
        <>
          Spanish Academy
          <br />
          Premium Pack
          <br />
          <span className="block text-[0.94rem] tracking-[-0.02em] text-primary/80">(10 Lessons)</span>
        </>
      ),
      price: "280",
      cadence: "EUR",
      items: ["10 " + t("pricing.lessons"), t("pricing.duration"), t("pricing.free")],
      popular: false,
    },
  ]

  const planKeys = ["starter", "standard", "plus", "premium"]

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
            <p className="fine-label">{t("pricing.label")}</p>
            <h3 className="mt-2 font-serif text-[1.8rem] font-normal leading-[1.06] tracking-[-0.045em]">
              {t("pricing.title")}
            </h3>
            <p className="mt-3 max-w-[72ch] text-[0.82rem] leading-[1.65] text-muted-foreground">
              {t("pricing.duration")}
            </p>
          </div>

          <div className="mt-12 grid w-full gap-5 overflow-visible md:grid-cols-2 xl:grid-cols-4">
            {cards.map((card, index) => {
              const plan = planKeys[index]

              return (
                <div key={card.price} className="relative overflow-visible pt-7">
                  <article
                    className={`premium-card interactive-card group relative flex min-h-[420px] flex-col !overflow-visible p-6 ${
                      card.popular ? "border-accent/70" : ""
                    }`}
                  >
                    {card.popular && (
                      <div className="absolute left-1/2 top-0 z-50 w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent py-1.5 text-center text-[0.7rem] font-semibold text-white shadow-md transition-transform duration-300 group-hover:scale-[1.05]">
                        {t("pricing.best")}
                      </div>
                    )}

                    <div className="flex h-full flex-1 flex-col pt-2">
                      <h3 className="min-h-[5.95rem] font-serif text-[1.22rem] font-normal leading-[1.06] tracking-[-0.045em] text-primary">
                        {card.name}
                      </h3>

                      <div className="flex min-h-[4.05rem] items-start gap-1">
                        <span className="font-sans tabular-nums text-[2.95rem] font-semibold leading-none tracking-[-0.05em] text-primary">
                          €{card.price}
                        </span>
                        <span className="pt-[1.95rem] text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                          {card.cadence}
                        </span>
                      </div>

                      <ul className="mt-4 min-h-[7.3rem] space-y-2.5">
                        {card.items.map((item) => (
                          <li key={item} className="flex gap-2 text-[0.82rem] leading-[1.45] text-muted-foreground">
                            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                            {item}
                          </li>
                        ))}
                      </ul>

                      <Button
                        asChild
                        className={`mt-auto h-10 rounded-full text-[0.78rem] font-semibold ${
                          card.popular
                            ? "bg-primary text-white hover:bg-primary/92"
                            : "bg-white text-primary ring-1 ring-border hover:bg-secondary"
                        }`}
                      >
                        <a href={`/?plan=${plan}#contact`}>
                          {language === "es" ? "Seleccionar y pagar" : "Select & pay"}
                        </a>
                      </Button>
                    </div>
                  </article>
                </div>
              )
            })}
          </div>

          <article className="rounded-[1.2rem] border border-border/85 bg-white p-5 shadow-[0_18px_56px_-48px_rgba(7,52,92,.16)]">
            <div className="grid gap-4 lg:grid-cols-[1fr_2fr] lg:items-center">
              <div>
                <p className="fine-label">{t("live.label")}</p>

                <h3 className="mt-2 font-serif text-[1.5rem] font-normal leading-[1.08] tracking-[-0.045em] text-primary">
                  {language === "es" ? (
                    <>
                      Interpretación en español
                      <br />
                      en tiempo real | Interpretación en
                      <br />
                      inglés en tiempo real
                    </>
                  ) : (
                    <>
                      {t("live.spanishTitle")} | {t("live.englishTitle")}
                    </>
                  )}
                </h3>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                {[t("pricing.liveNote1"), t("pricing.liveNote2"), t("pricing.liveNote3")].map((item, index) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-[0.85rem] bg-[var(--surface-soft)] p-4 text-[0.78rem] font-semibold leading-[1.45] text-primary ring-1 ring-border/60"
                  >
                    {index === 2 ? (
                      <CalendarClock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    ) : (
                      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    )}
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