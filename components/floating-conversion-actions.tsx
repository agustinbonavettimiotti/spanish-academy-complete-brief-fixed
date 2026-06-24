"use client"

import { Gift, MessageCircle } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const WHATSAPP_NUMBER = "543517573420"

export function FloatingConversionActions() {
  const { language } = useLanguage()

  const whatsappText =
    language === "es"
      ? "Hola, quiero consultar por las clases de Spanish Academy."
      : "Hi, I would like to ask about Spanish Academy lessons."

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappText)}`

  return (
    <div className="fixed bottom-4 right-4 z-[80] flex max-w-[calc(100vw-2rem)] flex-col items-end gap-2 pb-[env(safe-area-inset-bottom)] sm:bottom-5 sm:right-5">
      <a
        href="/?service=free-trial#contact"
        aria-label={language === "es" ? "Agendar una clase gratis" : "Book a free lesson"}
        className="group inline-flex min-h-11 max-w-[15rem] items-center justify-center gap-2 rounded-full border border-primary/15 bg-white px-4 py-2.5 text-[0.76rem] font-semibold leading-[1.15] text-primary shadow-[0_18px_48px_-28px_rgba(7,52,92,.45)] transition hover:-translate-y-0.5 hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary/25 sm:max-w-none sm:px-5 sm:text-[0.8rem]"
      >
        <Gift className="h-4 w-4 shrink-0 text-accent" />
        <span className="min-w-0">
          {language === "es" ? "Agendá una clase gratis" : "Book a free lesson"}
        </span>
      </a>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={language === "es" ? "Contactar por WhatsApp" : "Contact via WhatsApp"}
        className="group inline-flex min-h-11 max-w-[15rem] items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-[0.76rem] font-semibold leading-[1.15] text-white shadow-[0_18px_48px_-28px_rgba(7,52,92,.45)] transition hover:-translate-y-0.5 hover:bg-primary/92 focus:outline-none focus:ring-2 focus:ring-primary/25 sm:max-w-none sm:px-5 sm:text-[0.8rem]"
      >
        <MessageCircle className="h-4 w-4 shrink-0" />
        <span className="min-w-0">
          {language === "es" ? "WhatsApp" : "WhatsApp"}
        </span>
      </a>
    </div>
  )
}
