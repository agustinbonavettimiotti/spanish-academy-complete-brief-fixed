"use client"

import { useLanguage } from "@/lib/language-context"
import { CalendarDays, Globe2, Laptop, UserRound, Video } from "lucide-react"

export function HowItWorks() {
  const { t } = useLanguage()

  const steps = [
    { icon: UserRound, title: t("how.step1.title"), body: t("how.step1.body") },
    { icon: CalendarDays, title: t("how.step2.title"), body: t("how.step2.body") },
    { icon: Laptop, title: t("how.step3.title"), body: t("how.step3.body") },
    { icon: Video, title: t("how.step4.title"), body: t("how.step4.body") },
  ]

  return (
    <section id="how" className="section-pad bg-background">
      <div className="section-shell editorial-section">
        <aside>
          <div className="label-rule" />
          <h2 className="section-label">{t("how.title")}</h2>
          <p className="section-note">{t("how.note")}</p>
        </aside>

        <div className="min-w-0 space-y-5">
          <div className="min-w-0 rounded-[1.45rem] border border-border/80 bg-white px-4 py-5 shadow-[0_18px_56px_-46px_rgba(7,52,92,.15)] sm:px-5 sm:py-7 lg:px-8 lg:py-8">
            <div className="grid min-w-0 gap-3 md:grid-cols-4 md:gap-5 lg:gap-8">
              {steps.map(({ icon: Icon, title, body }, index) => (
                <article
                  key={title}
                  className="relative min-w-0 rounded-[1.05rem] border border-border/70 bg-[var(--surface-soft)] px-4 py-4 shadow-[0_16px_48px_-42px_rgba(7,52,92,.18)] sm:px-5 sm:py-5 md:px-4 md:py-7 md:text-center lg:px-5"
                >
                  {index < steps.length - 1 ? (
                    <span
                      className="pointer-events-none absolute left-[calc(50%+2.8rem)] top-[3.95rem] hidden h-px w-[calc(100%+1.25rem)] bg-accent/70 md:block"
                      aria-hidden="true"
                    />
                  ) : null}

                  <div className="relative z-10 flex min-w-0 items-start gap-4 md:block">
                    <div className="grid size-11 shrink-0 place-items-center rounded-full bg-[var(--icon-surface)] text-primary ring-4 ring-white sm:size-12 md:mx-auto md:size-14 md:ring-8">
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>

                    <div className="min-w-0 md:mt-5">
                      <span className="block font-serif text-[1.08rem] leading-none tracking-[-0.04em] text-primary sm:text-[1.18rem] md:text-[1.35rem]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <h3 className="mt-2 break-words font-serif text-[1rem] font-normal leading-[1.12] tracking-[-0.035em] text-primary sm:text-[1.06rem] md:mt-3 md:text-[1.08rem]">
                        {title}
                      </h3>

                      <p className="mt-2 max-w-[34ch] text-[0.76rem] leading-[1.55] text-muted-foreground sm:text-[0.78rem] md:mx-auto md:mt-3 md:max-w-[22ch] md:leading-[1.58]">
                        {body}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="grid min-w-0 gap-0 overflow-hidden rounded-[1rem] border border-border/80 bg-[var(--surface-soft)] shadow-[0_18px_56px_-48px_rgba(7,52,92,.16)] sm:grid-cols-2">
            <div className="flex min-w-0 items-center justify-center gap-4 px-5 py-4 text-primary">
              <Globe2 className="h-5 w-5 shrink-0" />
              <span className="min-w-0 break-words text-center text-[0.84rem] font-semibold sm:text-[0.88rem]">
                {t("how.label")}
              </span>
            </div>

            <div className="flex min-w-0 items-center justify-center gap-4 border-t border-border/80 px-5 py-4 text-primary sm:border-l sm:border-t-0">
              <Video className="h-5 w-5 shrink-0" />
              <span className="min-w-0 break-words text-center text-[0.84rem] font-semibold sm:text-[0.88rem]">
                {t("how.title")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}