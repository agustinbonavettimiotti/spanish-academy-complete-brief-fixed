"use client"

import { useMemo, useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, CheckCircle2, Mail } from "lucide-react"

type IntakeForm = {
  service: string
  fullName: string
  email: string
  country: string
  phone: string
  level: string
  goal: string
  specificGoal: string
  days: string[]
  timeBlocks: string[]
  exactTime: string
  liveLanguage: string
  liveContext: string
  liveDetails: string
  liveDate: string
  liveTime: string
  liveFormat: string
  message: string
}

const initialForm: IntakeForm = {
  service: "Spanish lessons",
  fullName: "",
  email: "",
  country: "",
  phone: "",
  level: "A1",
  goal: "Travel",
  specificGoal: "",
  days: [],
  timeBlocks: [],
  exactTime: "",
  liveLanguage: "Spanish",
  liveContext: "Daily tasks",
  liveDetails: "",
  liveDate: "",
  liveTime: "",
  liveFormat: "Video call",
  message: "",
}

export function ContactForm() {
  const { language, t } = useLanguage()
  const [form, setForm] = useState<IntakeForm>(initialForm)
  const [submitted, setSubmitted] = useState(false)

  const services = useMemo(
    () => [
      t("form.service.spanish"),
      t("form.service.english"),
      t("form.service.live"),
    ],
    [t],
  )

  const levels = [
    t("form.level.a1"),
    t("form.level.a2"),
    t("form.level.b1"),
    t("form.level.b2"),
    t("form.level.c1"),
    t("form.level.c2"),
  ]

  const goals = [
    t("form.goal.personal"),
    t("form.goal.travel"),
    t("form.goal.work"),
    t("form.goal.exams"),
    t("form.goal.academic"),
  ]

  const days = [
    t("form.day.monday"),
    t("form.day.tuesday"),
    t("form.day.wednesday"),
    t("form.day.thursday"),
    t("form.day.friday"),
    t("form.day.saturday"),
    t("form.day.sunday"),
  ]

  const timeBlocks = [
    t("form.time.morning"),
    t("form.time.afternoon"),
    t("form.time.evening"),
    t("form.time.flexible"),
  ]

  const liveContexts = [
    t("form.liveContext.daily"),
    t("form.liveContext.appointments"),
    t("form.liveContext.paperwork"),
    t("form.liveContext.medical"),
    t("form.liveContext.other"),
  ]

  const update = <K extends keyof IntakeForm>(key: K, value: IntakeForm[K]) => {
    setForm((current) => ({ ...current, [key]: value }))
  }

  const toggleArrayValue = (key: "days" | "timeBlocks", value: string) => {
    setForm((current) => {
      const exists = current[key].includes(value)
      return {
        ...current,
        [key]: exists ? current[key].filter((item) => item !== value) : [...current[key], value],
      }
    })
  }

  const isLive = form.service === t("form.service.live")

  const mailBody = [
    `Service: ${form.service}`,
    `Full name: ${form.fullName}`,
    `Email: ${form.email}`,
    `Country of residence: ${form.country}`,
    `Phone number: ${form.phone || "Not provided"}`,
    `Level: ${form.level}`,
    `Learning goal: ${form.goal}`,
    `Specific goal: ${form.specificGoal || "Not provided"}`,
    `Available days: ${form.days.join(", ") || "Not provided"}`,
    `Available time: ${form.timeBlocks.join(", ") || "Not provided"}`,
    `Exact times: ${form.exactTime || "Not provided"}`,
    isLive ? `Live support language: ${form.liveLanguage}` : null,
    isLive ? `Live context: ${form.liveContext}` : null,
    isLive ? `Live details: ${form.liveDetails || "Not provided"}` : null,
    isLive ? `Requested date: ${form.liveDate || "Not provided"}` : null,
    isLive ? `Requested time: ${form.liveTime || "Not provided"}` : null,
    isLive ? `Preferred format: ${form.liveFormat}` : null,
    `Optional message: ${form.message || "Not provided"}`,
  ]
    .filter(Boolean)
    .join("\n")

  const mailHref = `mailto:spanishacademy100@gmail.com?subject=${encodeURIComponent(
    language === "es" ? "SPANISH ACADEMY – FORMULARIO DE INGRESO" : "SPANISH ACADEMY – STUDENT INTAKE FORM",
  )}&body=${encodeURIComponent(mailBody)}`

  return (
    <section id="contact" className="section-pad bg-background">
      <div className="section-shell editorial-section">
        <aside>
          <div className="label-rule" />
          <h2 className="section-label">{t("form.label")}</h2>
          <p className="section-note">{t("form.subtitle")}</p>
          <p className="mt-4 rounded-[0.85rem] bg-[var(--surface-soft)] p-3 text-[0.72rem] leading-[1.55] text-muted-foreground ring-1 ring-border/70">
            {t("form.mailHint")}
          </p>
        </aside>

        <div className="rounded-[1.2rem] border border-border/85 bg-white p-5 shadow-[0_18px_56px_-46px_rgba(7,52,92,.15)] lg:p-7">
          {submitted ? (
            <div className="grid gap-5 rounded-[1rem] bg-[var(--surface-soft)] p-6 text-primary ring-1 ring-border/70">
              <CheckCircle2 className="h-9 w-9 text-accent" />
              <div>
                <h3 className="font-serif text-[1.65rem] leading-[1.05] tracking-[-0.045em]">{t("form.confirmation.title")}</h3>
                <p className="mt-3 max-w-[72ch] text-[0.84rem] leading-[1.7] text-muted-foreground">{t("form.confirmation.body")}</p>
                <p className="mt-3 max-w-[72ch] text-[0.84rem] leading-[1.7] text-muted-foreground">{t("form.confirmation.note")}</p>
              </div>
              <Button asChild className="h-10 w-fit rounded-full bg-primary px-6 text-[0.78rem] font-semibold text-white hover:bg-primary/92">
                <a href={mailHref}>{t("form.confirmation.email")}</a>
              </Button>
            </div>
          ) : (
            <form
              onSubmit={(event) => {
                event.preventDefault()
                setSubmitted(true)
                window.location.href = mailHref
              }}
              className="space-y-6"
            >
              <section className="rounded-[1rem] bg-[var(--surface-soft)] p-5 ring-1 ring-border/70">
                <div className="mb-4">
                  <p className="fine-label">01</p>
                  <h3 className="mt-1 font-serif text-[1.35rem] leading-[1.08] tracking-[-0.04em] text-primary">{t("form.service.title")}</h3>
                  <p className="mt-2 text-[0.78rem] leading-[1.55] text-muted-foreground">{t("form.service.note")}</p>
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                  {services.map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => update("service", service)}
                      className={`rounded-[0.85rem] border px-4 py-3 text-left text-[0.8rem] font-semibold ${form.service === service ? "border-primary bg-primary text-white" : "border-border bg-white text-primary hover:border-primary/40"}`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </section>

              <section className="grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <p className="fine-label">02</p>
                  <h3 className="mt-1 font-serif text-[1.35rem] leading-[1.08] tracking-[-0.04em] text-primary">{t("form.personal.title")}</h3>
                  <p className="mt-2 text-[0.78rem] text-muted-foreground">{t("form.personal.subtitle")}</p>
                </div>
                <label className="grid gap-2 text-[0.72rem] font-semibold text-primary">
                  {t("form.fullName")}
                  <Input required value={form.fullName} onChange={(event) => update("fullName", event.target.value)} className="h-10 rounded-md border-border bg-white text-[0.82rem]" />
                </label>
                <label className="grid gap-2 text-[0.72rem] font-semibold text-primary">
                  {t("form.email")}
                  <Input required type="email" value={form.email} onChange={(event) => update("email", event.target.value)} className="h-10 rounded-md border-border bg-white text-[0.82rem]" />
                </label>
                <label className="grid gap-2 text-[0.72rem] font-semibold text-primary">
                  {t("form.country")}
                  <Input required value={form.country} onChange={(event) => update("country", event.target.value)} className="h-10 rounded-md border-border bg-white text-[0.82rem]" />
                </label>
                <label className="grid gap-2 text-[0.72rem] font-semibold text-primary">
                  {t("form.phone")}
                  <Input value={form.phone} onChange={(event) => update("phone", event.target.value)} className="h-10 rounded-md border-border bg-white text-[0.82rem]" />
                </label>
                <p className="md:col-span-2 rounded-[0.85rem] bg-[var(--surface-soft)] p-3 text-[0.72rem] leading-[1.55] text-muted-foreground ring-1 ring-border/70">
                  {t("form.phoneNote")}
                </p>
              </section>

              {!isLive ? (
                <>
                  <section className="grid gap-4 md:grid-cols-2">
                    <div className="md:col-span-2">
                      <p className="fine-label">03</p>
                      <h3 className="mt-1 font-serif text-[1.35rem] leading-[1.08] tracking-[-0.04em] text-primary">
                        {form.service === t("form.service.english") ? t("form.level.titleEnglish") : t("form.level.titleSpanish")}
                      </h3>
                    </div>
                    <label className="grid gap-2 text-[0.72rem] font-semibold text-primary">
                      {form.service === t("form.service.english") ? t("form.level.subtitleEnglish") : t("form.level.subtitleSpanish")}
                      <select value={form.level} onChange={(event) => update("level", event.target.value)} className="h-10 rounded-md border border-border bg-white px-3 text-[0.82rem] text-primary outline-none">
                        {levels.map((level) => <option key={level}>{level}</option>)}
                      </select>
                    </label>
                    <label className="grid gap-2 text-[0.72rem] font-semibold text-primary">
                      {form.service === t("form.service.english") ? t("form.goal.subtitleEnglish") : t("form.goal.subtitleSpanish")}
                      <select value={form.goal} onChange={(event) => update("goal", event.target.value)} className="h-10 rounded-md border border-border bg-white px-3 text-[0.82rem] text-primary outline-none">
                        {goals.map((goal) => <option key={goal}>{goal}</option>)}
                      </select>
                    </label>
                    <label className="grid gap-2 text-[0.72rem] font-semibold text-primary md:col-span-2">
                      {t("form.goal.specific")}
                      <Textarea value={form.specificGoal} onChange={(event) => update("specificGoal", event.target.value)} placeholder={t("form.goal.placeholder")} className="min-h-24 rounded-md border-border bg-white text-[0.82rem]" />
                    </label>
                  </section>

                  <section className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="fine-label">04</p>
                      <h3 className="mt-1 font-serif text-[1.35rem] leading-[1.08] tracking-[-0.04em] text-primary">{t("form.days.title")}</h3>
                      <p className="mt-2 text-[0.78rem] text-muted-foreground">{t("form.days.subtitle")}</p>
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        {days.map((day) => (
                          <button key={day} type="button" onClick={() => toggleArrayValue("days", day)} className={`rounded-full border px-3 py-2 text-[0.74rem] font-semibold ${form.days.includes(day) ? "border-primary bg-primary text-white" : "border-border bg-white text-muted-foreground hover:text-primary"}`}>
                            {day}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="fine-label">05</p>
                      <h3 className="mt-1 font-serif text-[1.35rem] leading-[1.08] tracking-[-0.04em] text-primary">{t("form.time.title")}</h3>
                      <p className="mt-2 text-[0.78rem] text-muted-foreground">{t("form.time.subtitle")}</p>
                      <div className="mt-4 grid gap-2">
                        {timeBlocks.map((block) => (
                          <button key={block} type="button" onClick={() => toggleArrayValue("timeBlocks", block)} className={`rounded-full border px-3 py-2 text-left text-[0.74rem] font-semibold ${form.timeBlocks.includes(block) ? "border-primary bg-primary text-white" : "border-border bg-white text-muted-foreground hover:text-primary"}`}>
                            {block}
                          </button>
                        ))}
                      </div>
                    </div>
                    <label className="grid gap-2 text-[0.72rem] font-semibold text-primary md:col-span-2">
                      {t("form.time.exact")}
                      <Input value={form.exactTime} onChange={(event) => update("exactTime", event.target.value)} placeholder={t("form.time.placeholder")} className="h-10 rounded-md border-border bg-white text-[0.82rem]" />
                      <span className="text-[0.7rem] font-normal leading-[1.45] text-muted-foreground">{t("form.time.note")}</span>
                    </label>
                  </section>
                </>
              ) : (
                <section className="grid gap-4 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <p className="fine-label">03</p>
                    <h3 className="mt-1 font-serif text-[1.35rem] leading-[1.08] tracking-[-0.04em] text-primary">{t("form.liveDetails.title")}</h3>
                    <p className="mt-2 text-[0.78rem] text-muted-foreground">{t("form.liveDetails.subtitle")}</p>
                  </div>
                  <label className="grid gap-2 text-[0.72rem] font-semibold text-primary">
                    {t("form.liveLanguage")}
                    <select value={form.liveLanguage} onChange={(event) => update("liveLanguage", event.target.value)} className="h-10 rounded-md border border-border bg-white px-3 text-[0.82rem] text-primary outline-none">
                      <option>{t("form.liveLanguage.spanish")}</option>
                      <option>{t("form.liveLanguage.english")}</option>
                    </select>
                  </label>
                  <label className="grid gap-2 text-[0.72rem] font-semibold text-primary">
                    {t("form.liveContext")}
                    <select value={form.liveContext} onChange={(event) => update("liveContext", event.target.value)} className="h-10 rounded-md border border-border bg-white px-3 text-[0.82rem] text-primary outline-none">
                      {liveContexts.map((context) => <option key={context}>{context}</option>)}
                    </select>
                  </label>
                  <label className="grid gap-2 text-[0.72rem] font-semibold text-primary md:col-span-2">
                    {t("form.liveDetailsField")}
                    <Textarea value={form.liveDetails} onChange={(event) => update("liveDetails", event.target.value)} placeholder={t("form.liveDetailsPlaceholder")} className="min-h-24 rounded-md border-border bg-white text-[0.82rem]" />
                  </label>
                  <div className="md:col-span-2">
                    <p className="fine-label">04</p>
                    <h3 className="mt-1 font-serif text-[1.35rem] leading-[1.08] tracking-[-0.04em] text-primary">{t("form.liveSchedule.title")}</h3>
                    <p className="mt-2 text-[0.78rem] text-muted-foreground">{t("form.liveSchedule.subtitle")}</p>
                  </div>
                  <label className="grid gap-2 text-[0.72rem] font-semibold text-primary">
                    {t("form.liveDate")}
                    <Input type="date" value={form.liveDate} onChange={(event) => update("liveDate", event.target.value)} className="h-10 rounded-md border-border bg-white text-[0.82rem]" />
                  </label>
                  <label className="grid gap-2 text-[0.72rem] font-semibold text-primary">
                    {t("form.liveTime")}
                    <Input type="time" value={form.liveTime} onChange={(event) => update("liveTime", event.target.value)} className="h-10 rounded-md border-border bg-white text-[0.82rem]" />
                  </label>
                  <label className="grid gap-2 text-[0.72rem] font-semibold text-primary">
                    {t("form.liveFormat")}
                    <select value={form.liveFormat} onChange={(event) => update("liveFormat", event.target.value)} className="h-10 rounded-md border border-border bg-white px-3 text-[0.82rem] text-primary outline-none">
                      <option>{t("form.liveFormat.call")}</option>
                      <option>{t("form.liveFormat.video")}</option>
                    </select>
                  </label>
                  <p className="rounded-[0.85rem] bg-[var(--surface-soft)] p-3 text-[0.72rem] leading-[1.55] text-muted-foreground ring-1 ring-border/70">
                    {t("form.liveAdvance")}
                  </p>
                </section>
              )}

              <section className="grid gap-4">
                <div>
                  <p className="fine-label">06</p>
                  <h3 className="mt-1 font-serif text-[1.35rem] leading-[1.08] tracking-[-0.04em] text-primary">{t("form.message.title")}</h3>
                  <p className="mt-2 text-[0.78rem] text-muted-foreground">{t("form.message.subtitle")}</p>
                </div>
                <Textarea value={form.message} onChange={(event) => update("message", event.target.value)} placeholder={t("form.message.placeholder")} className="min-h-24 rounded-md border-border bg-white text-[0.82rem]" />
              </section>

              <Button type="submit" className="interactive-button h-11 rounded-full bg-primary px-7 text-[0.84rem] font-semibold text-white hover:bg-primary/92">
                <Mail className="mr-2 h-4 w-4" />
                {t("form.submit")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
