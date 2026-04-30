"use client"

import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { ArrowRight, Briefcase, Building2, Check, GraduationCap, HeartPulse, Languages, Map, MessageCircle, Scale, Stethoscope } from "lucide-react"

export function Programs() {
  const { language, t } = useLanguage()

  const featured = [
    {
      title: t("programs.spanish"),
      body: "Travel and daily situations.",
      image: "/images/mujer1.png",
      icon: MessageCircle,
    },
    {
      title: t("programs.english"),
      body: t("programs.mode"),
      image: "/images/hombre1.png",
      icon: Languages,
    },
    {
      title: "Get ready for your international Spanish certification",
      body: "Prepare for your international Spanish test: DELE, SIELE, CELE and more.",
      image: "/images/travel-culture.png",
      icon: Map,
    },
  ]

  const blocks = [
    {
      title: t("programs.primaryTitle"),
      body: t("programs.primaryBody"),
      icon: GraduationCap,
      items: [t("programs.spanish"), t("programs.english"), t("programs.mode"), t("programs.levels")],
    },
    {
      title: t("programs.goalsTitle"),
      body: t("programs.goalsBody"),
      icon: Map,
      items: [t("programs.goal1"), t("programs.goal2"), t("programs.goal3")],
    },
    {
      title: t("programs.specializedTitle"),
      body: t("programs.specializedBody"),
      icon: Briefcase,
      items: [t("programs.specialized1"), t("programs.specialized2"), t("programs.specialized3"), t("programs.specialized4")],
    },
    {
      title: t("programs.premiumTitle"),
      body: t("programs.premiumBody"),
      icon: Building2,
      items: [t("programs.premium1"), t("programs.premium2"), t("programs.premium3")],
    },
  ]

  const fieldIcons = [Stethoscope, Scale, HeartPulse]

  return (
    <section id="programs" className="section-pad bg-background">
      <div className="section-shell editorial-section">
        <aside>
          <div className="label-rule" />

          <h2 className="section-label">
            {language === "es" ? (
              <>
                Nuestros
                <br />
                servicios
              </>
            ) : (
              t("programs.label")
            )}
          </h2>

          <p className="section-note">{t("programs.body")}</p>
          <a href="#contact" className="small-link mt-5">
            {t("hero.ctaPrimary")}
            <ArrowRight className="h-4 w-4" />
          </a>
        </aside>

        <div className="space-y-5">
          <div>
            <h3 className="section-title max-w-[760px]">
              {language === "es" ? (
                <>
                  Formación personalizada,
                  <br />
                  sin programas estándar
                </>
              ) : (
                <>
                  Personalized language training,
                  <br />
                  without standard programs
                </>
              )}
            </h3>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {featured.map(({ title, body, image, icon: Icon }, index) => (
              <article
                key={title}
                className="premium-card interactive-card group grid overflow-hidden bg-[var(--surface-soft)] sm:grid-cols-[0.54fr_0.46fr] lg:grid-cols-1"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="relative min-h-[235px] overflow-hidden bg-secondary lg:aspect-[1.12] lg:min-h-0">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(min-width: 1024px) 29vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                    quality={98}
                  />
                </div>

                <div className="flex min-h-[235px] flex-col p-6 lg:min-h-[245px]">
                  <span className="grid size-12 place-items-center rounded-full bg-white text-primary ring-1 ring-border/80 shadow-[0_18px_40px_-32px_rgba(7,52,92,.22)]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-8 font-serif text-[1.35rem] font-normal leading-[1.02] tracking-[-0.045em] text-primary sm:text-[1.5rem]">
                    {title}
                  </h3>
                  <div className="mt-4 h-px w-9 bg-accent" />
                  <p className="mt-5 text-[0.82rem] leading-[1.66] text-muted-foreground">{body}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {blocks.map(({ title, body, icon: Icon, items }) => (
              <article key={title} className="rounded-[1rem] border border-border/85 bg-white p-5 shadow-[0_18px_56px_-48px_rgba(7,52,92,.16)]">
                <div className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[var(--icon-surface)] text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-serif text-[1.18rem] font-normal leading-[1.1] tracking-[-0.04em] text-primary">{title}</h3>
                    <p className="mt-2 text-[0.78rem] leading-[1.65] text-muted-foreground">{body}</p>
                  </div>
                </div>
                <ul className="mt-5 grid gap-2">
                  {items.map((item, index) => {
                    const ExtraIcon = fieldIcons[index % fieldIcons.length]
                    return (
                      <li key={item} className="flex items-start gap-2 text-[0.8rem] leading-[1.5] text-muted-foreground">
                        {title === t("programs.specializedTitle") ? <ExtraIcon className="mt-0.5 h-3.5 w-3.5 text-accent" /> : <Check className="mt-0.5 h-3.5 w-3.5 text-accent" />}
                        <span>{item}</span>
                      </li>
                    )
                  })}
                </ul>
              </article>
            ))}
          </div>

          <div className="rounded-[1rem] border border-border/85 bg-[var(--surface-soft)] px-6 py-7 text-primary shadow-[0_18px_56px_-48px_rgba(7,52,92,.16)]">
            <p className="fine-label">{t("programs.closingTitle")}</p>

            <div className="mt-5 grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
              <div className="space-y-1 font-serif text-[1.65rem] leading-[1.03] tracking-[-0.045em] text-primary sm:text-[1.9rem]">
                <p>{t("programs.closing1")}</p>
                <p>{t("programs.closing2")}</p>
              </div>

              <p className="max-w-[34rem] font-serif text-[1.28rem] leading-[1.16] tracking-[-0.035em] text-primary/88 lg:justify-self-end lg:text-right">
                {t("programs.closing3")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}