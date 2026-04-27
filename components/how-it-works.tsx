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

        <div className="space-y-5">
          <div className="rounded-[1.45rem] border border-border/80 bg-white px-5 py-7 shadow-[0_18px_56px_-46px_rgba(7,52,92,.15)] lg:px-8 lg:py-8">
            <div className="grid gap-5 md:grid-cols-4 md:gap-8">
              {steps.map(({ icon: Icon, title, body }, index) => (
                <article key={title} className="relative rounded-[1.05rem] border border-border/70 bg-[var(--surface-soft)] px-5 py-7 text-center shadow-[0_16px_48px_-42px_rgba(7,52,92,.18)]">
                  {index < steps.length - 1 ? (
                    <span className="pointer-events-none absolute left-[calc(50%+2.8rem)] top-[3.95rem] hidden h-px w-[calc(100%+1.25rem)] bg-accent/70 md:block" aria-hidden="true" />
                  ) : null}

                  <div className="relative z-10 mx-auto grid size-14 place-items-center rounded-full bg-[var(--icon-surface)] text-primary ring-8 ring-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="mt-5 block font-serif text-[1.35rem] leading-none tracking-[-0.04em] text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-serif text-[1.08rem] font-normal tracking-[-0.035em] text-primary">{title}</h3>
                  <p className="mx-auto mt-3 max-w-[22ch] text-[0.78rem] leading-[1.58] text-muted-foreground">{body}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="grid gap-0 overflow-hidden rounded-[1rem] border border-border/80 bg-[var(--surface-soft)] shadow-[0_18px_56px_-48px_rgba(7,52,92,.16)] sm:grid-cols-2">
            <div className="flex items-center justify-center gap-4 px-5 py-4 text-primary">
              <Globe2 className="h-5 w-5" />
              <span className="text-[0.88rem] font-semibold">{t("how.label")}</span>
            </div>
            <div className="flex items-center justify-center gap-4 border-t border-border/80 px-5 py-4 text-primary sm:border-l sm:border-t-0">
              <Video className="h-5 w-5" />
              <span className="text-[0.88rem] font-semibold">{t("how.title")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
