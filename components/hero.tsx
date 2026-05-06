"use client"

import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { ArrowRight, CreditCard, Video } from "lucide-react"

export function Hero() {
  const { t, language } = useLanguage()

  return (
    <section id="home" className="relative isolate overflow-hidden bg-background pt-[58px]">
      <div className="relative min-h-[560px] overflow-hidden lg:min-h-[620px] xl:min-h-[660px]">
        <Image
          src="/images/hero-clean-no-text.png"
          alt="Spanish Academy online language lesson"
          fill
          priority
          sizes="100vw"
          quality={100}
          className="object-cover object-center animate-slow-pan"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-white/0" />
        <div className="absolute inset-y-0 left-0 right-[62%] hidden bg-white/18 lg:block" />

        <div className="section-shell relative z-10 flex min-h-[560px] items-center py-14 lg:min-h-[620px] xl:min-h-[660px]">
          <div className="max-w-[560px] animate-reveal-up">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/80 bg-white/72 px-3.5 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary shadow-[0_18px_44px_-36px_rgba(7,52,92,.24)] backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {t("hero.eyebrow")}
            </div>

            <h1 className="max-w-[660px] font-serif text-[2.85rem] font-normal leading-[0.96] tracking-[-0.055em] text-primary sm:text-[3.85rem] lg:max-w-[700px] lg:text-[4.45rem] xl:max-w-[720px] xl:text-[4.85rem]">
              {t("hero.headline")}
            </h1>

            <div className="mt-6 max-w-[33rem] space-y-2 text-[1.08rem] leading-[1.58] text-[var(--ink-soft)] sm:text-[1.22rem]">
              <p className="font-semibold text-primary">{t("hero.subheadline")}</p>
              {t("hero.subheadline2") && <p>{t("hero.subheadline2")}</p>}
            </div>

            <p className="mt-5 max-w-[34rem] text-[0.95rem] leading-[1.75] text-muted-foreground sm:text-[1.03rem]">
              {t("hero.supporting")}
            </p>

            <div className="mt-8 grid max-w-[520px] gap-3">
              <div className="flex items-center gap-3 rounded-[1rem] border border-border/80 bg-white/78 px-4 py-3 text-primary shadow-[0_18px_48px_-42px_rgba(7,52,92,.24)] backdrop-blur-md">
                <Video className="h-4.5 w-4.5 text-accent" />
                <div>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-accent">
                    {t("hero.onlineLabel")}
                  </p>
                  <p className="text-[0.82rem] font-semibold leading-snug">{t("hero.online")}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-[1rem] border border-border/80 bg-white/78 px-4 py-3 text-primary shadow-[0_18px_48px_-42px_rgba(7,52,92,.24)] backdrop-blur-md">
                <CreditCard className="h-4.5 w-4.5 shrink-0 text-accent" />
                <div>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-accent">
                    {language === "es" ? "Pagos" : "Payments"}
                  </p>

                  {language === "es" ? (
                    <p className="text-[0.82rem] font-semibold leading-snug">
                      Todos nuestros servicios se pueden abonar con PayPal Apple Pay tarjeta de débito/crédito y Binance (USDT)
                    </p>
                  ) : (
                    <p className="text-[0.82rem] font-semibold leading-snug">
                      All our services are payable via PayPal Apple Pay debit/credit card and Binance (USDT)
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                className="interactive-button h-11 rounded-full bg-primary px-7 text-[0.84rem] font-semibold text-white hover:bg-primary/92"
              >
                <a href="#pricing">{t("hero.ctaPrimary")}</a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="interactive-button h-11 rounded-full border-border bg-white/78 px-7 text-[0.84rem] font-semibold text-primary hover:bg-white"
              >
                <a href="#programs" className="inline-flex items-center gap-2">
                  {t("hero.ctaSecondary")}
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