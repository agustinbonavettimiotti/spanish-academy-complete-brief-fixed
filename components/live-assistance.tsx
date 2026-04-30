"use client"

import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { ArrowRight, CalendarClock, Clock, Languages, MessageCircle, Video } from "lucide-react"

export function LiveAssistance() {
  const { t } = useLanguage()

  const services = [
    {
      title: t("live.spanishTitle"),
      body: t("live.spanishBody"),
      note: t("live.spanishNote"),
      icon: MessageCircle,
    },
    {
      title: t("live.englishTitle"),
      body: t("live.englishBody"),
      note: t("live.englishNote"),
      icon: Languages,
    },
  ]

  const details = [
    { icon: Clock, text: t("live.price") },
    { icon: Video, text: t("live.minimum") },
    { icon: CalendarClock, text: t("live.advance") },
  ]

  return (
    <section id="other-services" className="section-pad bg-background">
      <div className="section-shell editorial-section">
        <aside>
          <div className="label-rule" />
          <h2 className="section-label">{t("live.label")}</h2>
          <p className="section-note">{t("live.body")}</p>
        </aside>

        <div className="grid gap-4 lg:grid-cols-[1.1fr_1.55fr]">
          <div className="relative min-h-[360px] overflow-hidden rounded-[1.2rem] border border-border/85 bg-[var(--surface-soft)] shadow-[0_18px_56px_-46px_rgba(7,52,92,.16)]">
            <Image
              src="/images/live-assistance-headset.png"
              alt={t("live.title")}
              fill
              sizes="(min-width: 1024px) 32vw, 100vw"
              className="object-cover"
              quality={98}
            />
            <div className="absolute inset-x-4 bottom-4 rounded-[1rem] border border-white/60 bg-white/82 p-4 text-primary shadow-[0_24px_60px_-44px_rgba(7,52,92,.38)] backdrop-blur-md">
              <p className="fine-label">{t("live.label")}</p>
              <p className="mt-2 font-serif text-[1.45rem] leading-[1.05] tracking-[-0.045em]">
                {t("live.title")}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {services.map(({ title, body, note, icon: Icon }) => (
                <article
                  key={title}
                  className="rounded-[1rem] border border-border/85 bg-white p-6 shadow-[0_18px_56px_-48px_rgba(7,52,92,.16)]"
                >
                  <span className="grid size-12 place-items-center rounded-full bg-[var(--icon-surface)] text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-6 font-serif text-[1.45rem] font-normal leading-[1.04] tracking-[-0.05em] text-primary">
                    {title}
                  </h3>
                  <p className="mt-4 text-[0.82rem] leading-[1.7] text-muted-foreground">{body}</p>
                  <div className="mt-5 h-px w-10 bg-accent" />
                  <p className="mt-4 text-[0.78rem] leading-[1.6] text-[var(--ink-soft)]">{note}</p>
                </article>
              ))}
            </div>

            <div className="rounded-[1rem] border border-border/85 bg-[var(--surface-soft)] p-5 shadow-[0_18px_56px_-48px_rgba(7,52,92,.16)]">
              <div className="grid gap-3 md:grid-cols-3">
                {details.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex gap-3 rounded-[0.8rem] bg-white p-4 text-primary ring-1 ring-border/60">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <p className="text-[0.77rem] font-semibold leading-[1.45]">{text}</p>
                  </div>
                ))}
              </div>

              <Button
                asChild
                className="interactive-button mt-5 h-10 rounded-full bg-primary px-6 text-[0.78rem] font-semibold text-white hover:bg-primary/92"
              >
                <a href="#contact" className="inline-flex items-center gap-2">
                  {t("live.cta")}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}