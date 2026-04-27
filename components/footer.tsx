"use client"

import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { Mail, MessageCircle } from "lucide-react"

const footerLinks = {
  en: [
    { label: "Programs", href: "#programs" },
    { label: "Plans", href: "#pricing" },
    { label: "Other Services", href: "#other-services" },
    { label: "Teachers", href: "#teachers" },
    { label: "FAQ", href: "#faq" },
  ],
  es: [
    { label: "Programas", href: "#programs" },
    { label: "Planes", href: "#pricing" },
    { label: "Otros servicios", href: "#other-services" },
    { label: "Profesores", href: "#teachers" },
    { label: "FAQ", href: "#faq" },
  ],
} as const

export function Footer() {
  const { language, setLanguage, t } = useLanguage()
  const links = footerLinks[language]

  return (
    <footer className="border-t border-border/70 bg-background py-10 lg:py-12">
      <div className="section-shell">
        <div className="grid gap-9 lg:grid-cols-[1.4fr_1fr_1fr_1.35fr] lg:gap-10">
          <div>
            <a href="#home" className="group inline-flex items-center gap-0" aria-label="Spanish Academy home">
              <span className="relative block h-16 w-16 shrink-0">
                <Image
                  src="/images/logo_academy_final.png"
                  alt="Spanish Academy"
                  fill
                  sizes="64px"
                  className="object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </span>
              <span className="leading-none text-primary">
                <span className="block text-[1.04rem] font-extrabold tracking-[-0.025em]">
                  Spanish
                </span>
                <span className="mt-1 block text-[0.58rem] font-semibold uppercase tracking-[0.25em] text-primary/64">
                  Academy
                </span>
              </span>
            </a>
            <p className="mt-5 max-w-[25ch] text-[0.78rem] leading-[1.62] text-muted-foreground">{t("footer.brand")}</p>
          </div>

          <div>
            <h4 className="text-[0.78rem] font-semibold text-primary">{t("footer.navigation")}</h4>
            <ul className="mt-4 grid gap-2.5">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-[0.76rem] leading-none text-muted-foreground transition-colors hover:text-primary">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[0.78rem] font-semibold text-primary">{t("footer.language")}</h4>
            <div className="mt-4 inline-flex items-center rounded-full border border-border/70 bg-white p-0.5">
              {(["en", "es"] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLanguage(lang)}
                  className={`rounded-full px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.14em] ${language === lang ? "bg-primary text-white" : "text-muted-foreground hover:text-primary"}`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[0.78rem] font-semibold text-primary">{t("footer.contact")}</h4>
            <div className="mt-4 grid gap-3">
              <a href={`mailto:${t("footer.email")}`} className="flex items-center gap-3 rounded-[0.85rem] bg-[var(--surface-soft)] px-4 py-3 text-[0.78rem] font-semibold text-primary ring-1 ring-border/70 hover:bg-white">
                <Mail className="h-4 w-4 text-accent" />
                {t("footer.email")}
              </a>
              <div className="flex items-center gap-3 rounded-[0.85rem] bg-[var(--surface-soft)] px-4 py-3 text-[0.78rem] font-semibold text-primary ring-1 ring-border/70">
                <MessageCircle className="h-4 w-4 text-accent" />
                {t("footer.whatsapp")}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border/70 pt-5 text-[0.72rem] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Spanish Academy. {t("footer.rights")}</p>
          <p>Spanish Academy · Online language training</p>
        </div>
      </div>
    </footer>
  )
}