"use client"

import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const copy = {
  en: {
    items: [
      { label: "Programs", href: "#programs", id: "programs" },
      { label: "How It Works", href: "#how", id: "how" },
      { label: "Plans & Rates", href: "#pricing", id: "pricing" },
      { label: "Other Services", href: "#other-services", id: "other-services" },
      { label: "Teaching Staff", href: "#teachers", id: "teachers" },
      { label: "FAQ", href: "#faq", id: "faq" },
    ],
    cta: "Book a free trial lesson",
    home: "Spanish Academy home",
    open: "Open menu",
    close: "Close menu",
  },
  es: {
    items: [
      { label: "Programas", href: "#programs", id: "programs" },
      { label: "Cómo funciona", href: "#how", id: "how" },
      { label: "Planes y tarifas", href: "#pricing", id: "pricing" },
      { label: "Otros servicios", href: "#other-services", id: "other-services" },
      { label: "Staff docente", href: "#teachers", id: "teachers" },
      { label: "FAQ", href: "#faq", id: "faq" },
    ],
    cta: "Reservar clase gratis",
    home: "Inicio Spanish Academy",
    open: "Abrir menú",
    close: "Cerrar menú",
  },
} as const

export function Navigation() {
  const { language, setLanguage } = useLanguage()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState("home")
  const t = copy[language]
  const items = useMemo(() => t.items, [t.items])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const sections = [
      document.getElementById("home"),
      ...items.map((item) => document.getElementById(item.id)),
    ].filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target.id) setActive(visible[0].target.id)
      },
      { rootMargin: "-18% 0px -68% 0px", threshold: [0.14, 0.28, 0.48] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [items])

  const languageSwitch = (
    <div className="inline-flex items-center rounded-full border border-border/70 bg-white p-0.5">
      {(["en", "es"] as const).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLanguage(lang)}
          className={`rounded-full px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.14em] ${
            language === lang
              ? "bg-primary text-white"
              : "text-muted-foreground hover:text-primary"
          }`}
        >
          {lang}
        </button>
      ))}
    </div>
  )

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b ${
        scrolled
          ? "border-border/80 bg-white/92 shadow-[0_14px_46px_-38px_rgba(7,52,92,.18)] backdrop-blur-xl"
          : "border-transparent bg-white/76 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-[58px] max-w-[1260px] items-center justify-between px-5 sm:px-6 lg:px-8 xl:px-10">
        <a
          href="#home"
          aria-label={t.home}
          className="flex shrink-0 items-center gap-0"
          onClick={() => setOpen(false)}
        >
          <span className="relative h-16 w-16 shrink-0">
            <Image
              src="/images/logo_academy_final.png"
              alt="Spanish Academy"
              fill
              sizes="64px"
              priority
              className="object-contain"
            />
          </span>

          <span className="hidden text-left leading-none sm:block">
            <span className="block text-[1.04rem] font-extrabold tracking-[-0.025em] text-primary">
              Spanish
            </span>
            <span className="mt-1 block text-[0.58rem] font-semibold uppercase tracking-[0.25em] text-primary/64">
              Academy
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-5 lg:flex">
          {items.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`text-[0.76rem] font-semibold ${
                active === item.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {languageSwitch}

          <Button
            asChild
            className="interactive-button h-9 rounded-full bg-primary px-5 text-[0.76rem] font-semibold text-white hover:bg-primary/92"
          >
            <a href="#contact">{t.cta}</a>
          </Button>
        </div>

        <button
          type="button"
          className="grid size-9 place-items-center rounded-full border border-border bg-white text-primary lg:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? t.close : t.open}
        >
          {open ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-white p-3 lg:hidden">
          <div className="mb-3 flex items-center justify-between rounded-2xl bg-[var(--surface-soft)] px-4 py-3">
            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Language
            </span>
            {languageSwitch}
          </div>

          <div className="grid gap-1.5">
            {items.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground hover:bg-secondary hover:text-primary"
              >
                {item.label}
              </a>
            ))}
          </div>

          <Button
            asChild
            className="mt-3 h-11 w-full rounded-full bg-primary text-white hover:bg-primary/92"
          >
            <a href="#contact" onClick={() => setOpen(false)}>
              {t.cta}
            </a>
          </Button>
        </div>
      )}
    </nav>
  )
}