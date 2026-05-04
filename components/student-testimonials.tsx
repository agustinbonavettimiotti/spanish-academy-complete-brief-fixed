"use client"

import { useLanguage } from "@/lib/language-context"
import { Quote } from "lucide-react"

export function StudentTestimonials() {
  const { language } = useLanguage()

  const content = {
    en: {
      label: "Student testimonials",
      title: "What students value most",
      note:
        "A selection of student feedback focused on confidence, personalization, and practical language use.",
      cards: [
        {
          quote:
            "The classes helped me feel more confident speaking Spanish in everyday situations. Each lesson was adapted to my level, my schedule, and the situations I actually needed to handle.",
          meta: "Spanish lessons",
          detail: "Personalized learning",
        },
        {
          quote:
            "I liked that the lessons were clear, structured, and practical. The teacher focused on my real goals instead of following a generic program.",
          meta: "Spanish Academy student",
          detail: "Goal-based lessons",
        },
        {
          quote:
            "The process was easy from the beginning. I could explain my availability, my level, and what I wanted to improve, and the academy matched me with the right teacher.",
          meta: "Online student",
          detail: "Teacher matching",
        },
      ],
    },
    es: {
      label: "Testimonios de estudiantes",
      title: "Lo que más valoran los estudiantes",
      note:
        "Una selección de comentarios centrados en confianza, personalización y uso práctico del idioma.",
      cards: [
        {
          quote:
            "Las clases me ayudaron a sentirme con más seguridad al hablar español en situaciones cotidianas. Cada clase se adaptó a mi nivel, mis horarios y las situaciones reales que necesitaba resolver.",
          meta: "Clases de español",
          detail: "Aprendizaje personalizado",
        },
        {
          quote:
            "Me gustó que las clases fueran claras, ordenadas y prácticas. El profesor se enfocó en mis objetivos reales, no en un programa genérico.",
          meta: "Estudiante de Spanish Academy",
          detail: "Clases basadas en objetivos",
        },
        {
          quote:
            "El proceso fue simple desde el inicio. Pude explicar mi disponibilidad, mi nivel y lo que quería mejorar, y la academia me asignó el profesor adecuado.",
          meta: "Estudiante online",
          detail: "Asignación de profesor",
        },
      ],
    },
  }

  const copy = content[language]

  return (
    <section id="testimonials" className="section-pad bg-background">
      <div className="section-shell editorial-section">
        <aside>
          <div className="label-rule" />
          <h2 className="section-label">{copy.label}</h2>
          <p className="section-note">{copy.note}</p>
        </aside>

        <div className="min-w-0 rounded-[1.2rem] border border-border/85 bg-[var(--surface-soft)] p-4 shadow-[0_18px_56px_-48px_rgba(7,52,92,.16)] sm:p-5 lg:p-6">
          <div className="mb-5 flex min-w-0 items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="fine-label">{copy.label}</p>

              <h3 className="mt-2 max-w-[18ch] break-words font-serif text-[1.45rem] font-normal leading-[1.08] tracking-[-0.045em] text-primary sm:text-[1.7rem]">
                {copy.title}
              </h3>
            </div>
          </div>

          <div className="grid min-w-0 items-stretch gap-4 md:grid-cols-3">
            {copy.cards.map((card) => (
              <article
                key={card.quote}
                className="premium-card interactive-card flex h-full min-w-0 flex-col p-5"
              >
                <div className="flex min-w-0 justify-end">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[var(--icon-surface)] text-primary">
                    <Quote className="h-4 w-4" />
                  </span>
                </div>

                <p className="mt-5 min-w-0 flex-1 break-words text-[0.9rem] leading-[1.65] text-primary">
                  “{card.quote}”
                </p>

                <div className="mt-7 grid min-h-[3.4rem] content-start gap-1 border-t border-border/70 pt-4">
                  <p className="text-[0.78rem] font-semibold leading-[1.35] text-primary">
                    {card.meta}
                  </p>
                  <p className="text-[0.72rem] leading-[1.45] text-muted-foreground">
                    {card.detail}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}