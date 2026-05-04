"use client"

import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { ArrowRight } from "lucide-react"

const teachers = [
  { name: "Andrea", image: "/images/andrea.jpg" },
  { name: "Agustin", image: "/images/agustin.jpg" },
  { name: "Karen", image: "/images/karen.jpg" },
  { name: "Micaela", image: "/images/micaela.jpg" },
]

export function Teachers() {
  const { t } = useLanguage()

  return (
    <section id="teachers" className="section-pad bg-background">
      <div className="section-shell editorial-section">
        <aside>
          <div className="label-rule" />
          <h2 className="section-label">{t("teachers.title")}</h2>
          <p className="section-note">{t("teachers.body")}</p>
        </aside>

        <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {teachers.map((teacher) => (
              <article key={teacher.name} className="premium-card interactive-card">
                <div className="relative aspect-[1.18] overflow-hidden bg-secondary">
                  <Image
                    src={teacher.image}
                    alt={teacher.name}
                    fill
                    sizes="(min-width: 1024px) 18vw, 50vw"
                    className="object-cover"
                    quality={96}
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-[0.9rem] font-semibold text-primary">{teacher.name}</h3>

                  <dl className="mt-3 grid gap-2 text-[0.72rem] leading-[1.45] text-muted-foreground">
                    <div>
                      <dt className="font-semibold text-primary">{t("teachers.country")}</dt>
                      <dd>Argentina</dd>
                    </div>

                    <div>
                      <dt className="font-semibold text-primary">{t("teachers.native")}</dt>
                      <dd>Español</dd>
                    </div>
                  </dl>
                </div>
              </article>
            ))}
          </div>

          <a href="#contact" className="small-link justify-self-start lg:justify-self-end">
            {t("hero.ctaPrimary")}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}