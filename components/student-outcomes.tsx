"use client"

import { useLanguage } from "@/lib/language-context"
import { BadgeCheck, BriefcaseBusiness, Globe2, GraduationCap } from "lucide-react"

const content = {
  en: {
    label: "Student Outcomes",
    cards: [
      { icon: BadgeCheck, title: "Confident Communication", body: "Express yourself naturally in everyday situations." },
      { icon: GraduationCap, title: "Academic Success", body: "Strengthen skills for studies and exams." },
      { icon: BriefcaseBusiness, title: "Career Growth", body: "Communicate with clarity in professional settings." },
      { icon: Globe2, title: "Cultural Connection", body: "Understand and connect with Spanish-speaking cultures." },
    ],
  },
  es: {
    label: "Student Outcomes",
    cards: [
      { icon: BadgeCheck, title: "Comunicación segura", body: "Expresate naturalmente en situaciones cotidianas." },
      { icon: GraduationCap, title: "Éxito académico", body: "Fortalecé habilidades para estudios y exámenes." },
      { icon: BriefcaseBusiness, title: "Crecimiento profesional", body: "Comunicate con claridad en contextos laborales." },
      { icon: Globe2, title: "Conexión cultural", body: "Entendé y conectá con culturas hispanohablantes." },
    ],
  },
} as const

export function StudentOutcomes() {
  const { language } = useLanguage()
  const copy = content[language]

  return (
    <section id="outcomes" className="section-pad bg-background pt-8">
      <div className="section-shell editorial-section">
        <aside>
          <div className="label-rule" />
          <h2 className="section-label">{copy.label}</h2>
        </aside>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {copy.cards.map(({ icon: Icon, title, body }) => (
            <article key={title} className="premium-card interactive-card p-5">
              <Icon className="h-4 w-4 text-accent" />
              <h3 className="mt-4 max-w-[12ch] font-serif text-[1.18rem] font-normal leading-[1.06] tracking-[-0.04em] text-primary">{title}</h3>
              <p className="mt-3 text-[0.8rem] leading-[1.58] text-muted-foreground">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
