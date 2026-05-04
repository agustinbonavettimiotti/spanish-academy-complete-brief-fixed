"use client"

import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { ArrowDown, CalendarClock, Check, Clock } from "lucide-react"

type PriceCard = {
  name: React.ReactNode
  price: string
  cadence: string
  items: string[]
  popular: boolean
}

export function Pricing() {
  const { t, language } = useLanguage()

  const pricingLabel = language === "es" ? "Planes y precios" : t("pricing.label")

  const pricingIntro =
    language === "es"
      ? "Planes flexibles adaptados a tus objetivos y disponibilidad. Todo lo que necesitás para empezar son 2 clases con un profesor nativo certificado."
      : "Flexible plans tailored to your goals and schedule. All you need to get started is 2 lessons with a certified native-speaking teacher."

  const lessonSubtitle = (count: number) =>
    language === "es" ? `(${count} clases)` : `(${count} Lessons)`

  const cards: PriceCard[] = [
    {
      name: (
        <>
          Spanish Academy
          <br />
          Starter Pack
          <br />
          <span className="block text-[0.9rem] tracking-[-0.02em] text-primary/80 sm:text-[0.94rem]">
            {lessonSubtitle(2)}
          </span>
        </>
      ),
      price: "65",
      cadence: "EUR",
      items: ["2 " + t("pricing.lessons"), t("pricing.duration")],
      popular: false,
    },
    {
      name: (
        <>
          Spanish Academy
          <br />
          Standard Pack
          <br />
          <span className="block text-[0.9rem] tracking-[-0.02em] text-primary/80 sm:text-[0.94rem]">
            {lessonSubtitle(4)}
          </span>
        </>
      ),
      price: "125",
      cadence: "EUR",
      items: ["4 " + t("pricing.lessons"), t("pricing.duration")],
      popular: false,
    },
    {
      name: (
        <>
          Spanish Academy
          <br />
          Plus Pack
          <br />
          <span className="block text-[0.9rem] tracking-[-0.02em] text-primary/80 sm:text-[0.94rem]">
            {lessonSubtitle(8)}
          </span>
        </>
      ),
      price: "235",
      cadence: "EUR",
      items: ["8 " + t("pricing.lessons"), t("pricing.duration")],
      popular: false,
    },
    {
      name: (
        <>
          Spanish Academy
          <br />
          Premium Pack
          <br />
          <span className="block text-[0.9rem] tracking-[-0.02em] text-primary/80 sm:text-[0.94rem]">
            {lessonSubtitle(10)}
          </span>
        </>
      ),
      price: "280",
      cadence: "EUR",
      items: ["10 " + t("pricing.lessons"), t("pricing.duration")],
      popular: true,
    },
  ]

  const planKeys = ["starter", "standard", "plus", "premium"]

  return (
    <section id="pricing" className="section-pad bg-background">
      <div className="section-shell editorial-section">
        <aside>
          <div className="label-rule" />
          <h2 className="section-label">{pricingLabel}</h2>
          <p className="section-note">{pricingIntro}</p>
        </aside>

        <div className="min-w-0 space-y-5">
          <div className="min-w-0 rounded-[1.2rem] border border-border/85 bg-[var(--surface-soft)] p-5 text-primary shadow-[0_18px_56px_-48px_rgba(7,52,92,.16)]">
            <p className="fine-label">{pricingLabel}</p>

            <h3 className="mt-2 font-serif text-[1.55rem] font-normal leading-[1.06] tracking-[-0.045em] sm:text-[1.8rem]">
              {t("pricing.title")}
            </h3>

            <p className="mt-3 max-w-[72ch] text-[0.82rem] leading-[1.65] text-muted-foreground">
              {t("pricing.duration")}
            </p>
          </div>

          <div className="grid w-full min-w-0 gap-4 overflow-visible pt-4 md:grid-cols-2 md:gap-5 md:pt-8 xl:grid-cols-4">
            {cards.map((card, index) => {
              const plan = planKeys[index]

              return (
                <div key={card.price} className="relative min-w-0 overflow-visible pt-0 md:pt-7">
                  <article
                    className={`premium-card interactive-card group relative flex min-w-0 flex-col !overflow-visible p-5 sm:p-6 md:min-h-[390px] ${
                      card.popular ? "border-accent/70" : ""
                    }`}
                  >
                    {card.popular && (
                      <div className="absolute left-1/2 top-0 z-50 w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent py-1.5 text-center text-[0.7rem] font-semibold text-white shadow-md transition-transform duration-300 group-hover:scale-[1.05]">
                        {t("pricing.best")}
                      </div>
                    )}

                    <div className="flex h-full min-w-0 flex-1 flex-col pt-2">
                      <h3 className="min-h-0 break-words font-serif text-[1.12rem] font-normal leading-[1.06] tracking-[-0.045em] text-primary md:min-h-[5.95rem] md:text-[1.22rem]">
                        {card.name}
                      </h3>

                      <div className="mt-5 flex min-h-0 items-start gap-1 md:min-h-[4.05rem]">
                        <span className="font-sans tabular-nums text-[2.6rem] font-semibold leading-none tracking-[-0.05em] text-primary sm:text-[2.95rem]">
                          €{card.price}
                        </span>

                        <span className="pt-[1.7rem] text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground sm:pt-[1.95rem] sm:text-[0.7rem]">
                          {card.cadence}
                        </span>
                      </div>

                      <ul className="mt-4 min-h-0 space-y-2.5 md:min-h-[5.4rem]">
                        {card.items.map((item) => (
                          <li key={item} className="flex gap-2 text-[0.82rem] leading-[1.45] text-muted-foreground">
                            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                            <span className="min-w-0 break-words">{item}</span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        asChild
                        className={`mt-6 h-10 w-full rounded-full text-[0.78rem] font-semibold md:mt-auto ${
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

          <article className="min-w-0 rounded-[1.2rem] border border-border/85 bg-white p-5 shadow-[0_18px_56px_-48px_rgba(7,52,92,.16)]">
            <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:items-center">
              <div className="min-w-0">
                <p className="fine-label">{t("live.label")}</p>

                <h3 className="mt-2 break-words font-serif text-[1.35rem] font-normal leading-[1.08] tracking-[-0.045em] text-primary sm:text-[1.5rem]">
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

              <div className="grid min-w-0 gap-3 md:grid-cols-3">
                {[t("pricing.liveNote1"), t("pricing.liveNote2"), t("pricing.liveNote3")].map((item, index) => (
                  <div
                    key={item}
                    className="flex min-w-0 flex-col gap-3 rounded-[0.85rem] bg-[var(--surface-soft)] p-4 text-[0.78rem] font-semibold leading-[1.45] text-primary ring-1 ring-border/60 md:min-h-[9.25rem]"
                  >
                    <div className="flex min-w-0 gap-3">
                      {index === 2 ? (
                        <CalendarClock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      ) : (
                        <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      )}

                      <span className="min-w-0 break-words">{item}</span>
                    </div>

                    {index === 0 ? (
                      <Button
                        asChild
                        className="mt-2 h-9 w-full rounded-full bg-primary px-5 text-[0.74rem] font-semibold text-white hover:bg-primary/92 md:mt-auto"
                      >
                        <a href="#other-services" className="inline-flex items-center justify-center gap-2">
                          {language === "es" ? "Elegir servicio" : "Choose service"}
                          <ArrowDown className="h-4 w-4 shrink-0" />
                        </a>
                      </Button>
                    ) : null}
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