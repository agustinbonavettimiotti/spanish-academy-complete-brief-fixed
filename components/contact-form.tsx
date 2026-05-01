"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, CheckCircle2, Mail } from "lucide-react"

type Currency = "USD" | "EUR"
type ServiceLanguage = "spanish" | "english"
type LessonPlanKey = "starter" | "standard" | "plus" | "premium"
type PaypalPlanKey = LessonPlanKey | "interpretation"
type DayKey = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday"

type AvailabilityEntry = {
  id: string
  day: DayKey | ""
  startTime: string
}

type IntakeForm = {
  service: string
  selectedPlan: string
  paymentMethod: string
  fullName: string
  email: string
  country: string
  phone: string
  level: string
  goal: string
  specificGoal: string
  availability: AvailabilityEntry[]
  liveLanguage: string
  liveContext: string
  liveDetails: string
  liveDate: string
  liveTime: string
  liveFormat: string
  message: string
}

const paypalButtons: Record<PaypalPlanKey, Record<ServiceLanguage, Record<Currency, string>>> = {
  starter: {
    spanish: {
      USD: "3QFV5JYW939CE",
      EUR: "TUAE2NACC3YUW",
    },
    english: {
      USD: "VBZF4K8GUN8VL",
      EUR: "6JRYPLXQREEPU",
    },
  },
  standard: {
    spanish: {
      USD: "4GJXJZZ4HQA4Y",
      EUR: "NR5J7MMAZCFZJ",
    },
    english: {
      USD: "L253DN7SEFKTN",
      EUR: "MMZSDGUMPHPSS",
    },
  },
  plus: {
    spanish: {
      USD: "JA9T9QBS5GBEY",
      EUR: "MXUW3F869YNW4",
    },
    english: {
      USD: "7ZK6UNL5M2LV4",
      EUR: "MDC9YW8RUFH7G",
    },
  },
  premium: {
    spanish: {
      USD: "2AUFE92GRVYUQ",
      EUR: "22X9HDK7LJFJN",
    },
    english: {
      USD: "ZT2MDTY5JZM9U",
      EUR: "GBLPLUZTSQGQW",
    },
  },
  interpretation: {
    spanish: {
      USD: "6RKY377KHY9G8",
      EUR: "ECEC9KDZ95NGU",
    },
    english: {
      USD: "BBKFGMGSQY8T6",
      EUR: "2AJ7TEFUW2R44",
    },
  },
}

const lessonDurationMinutes = 60

const lessonPlans: Record<
  LessonPlanKey,
  {
    packName: string
    lessons: string
    lessonCount: number
    price: string
  }
> = {
  starter: {
    packName: "Starter Pack",
    lessons: "2 Lessons",
    lessonCount: 2,
    price: "65 USD / EUR",
  },
  standard: {
    packName: "Standard Pack",
    lessons: "4 Lessons",
    lessonCount: 4,
    price: "125 USD / EUR",
  },
  plus: {
    packName: "Plus Pack",
    lessons: "8 Lessons",
    lessonCount: 8,
    price: "235 USD / EUR",
  },
  premium: {
    packName: "Premium Pack",
    lessons: "10 Lessons",
    lessonCount: 10,
    price: "280 USD / EUR",
  },
}

const paymentMethods = ["PayPal or card USD", "PayPal or card EUR"]

const timeOptions = [
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
]

const initialForm: IntakeForm = {
  service: "Spanish lessons",
  selectedPlan: "",
  paymentMethod: "PayPal or card USD",
  fullName: "",
  email: "",
  country: "",
  phone: "",
  level: "A1",
  goal: "Travel",
  specificGoal: "",
  availability: [],
  liveLanguage: "Spanish",
  liveContext: "Daily tasks",
  liveDetails: "",
  liveDate: "",
  liveTime: "",
  liveFormat: "Video call",
  message: "",
}

function getPayPalPaymentUrl(hostedButtonId: string) {
  return `https://www.paypal.com/ncp/payment/${hostedButtonId}`
}

function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number)
  return hours * 60 + minutes
}

function minutesToTime(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
}

function getLessonEndTime(startTime: string) {
  if (!startTime) return ""

  return minutesToTime(timeToMinutes(startTime) + lessonDurationMinutes)
}

function availabilityRowsOverlap(a: AvailabilityEntry, b: AvailabilityEntry) {
  if (!a.day || !b.day || a.day !== b.day) return false
  if (!a.startTime || !b.startTime) return false

  const aStart = timeToMinutes(a.startTime)
  const aEnd = aStart + lessonDurationMinutes
  const bStart = timeToMinutes(b.startTime)
  const bEnd = bStart + lessonDurationMinutes

  return aStart < bEnd && bStart < aEnd
}

function PayPalPaymentButton({
  hostedButtonId,
  onPaymentStarted,
}: {
  hostedButtonId: string
  onPaymentStarted: () => void
}) {
  return (
    <Button
      asChild
      className="interactive-button h-11 w-full rounded-full bg-primary px-7 text-[0.84rem] font-semibold text-white hover:bg-primary/92"
    >
      <a
        href={getPayPalPaymentUrl(hostedButtonId)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onPaymentStarted}
      >
        Pay with PayPal or credit/debit card
        <ArrowRight className="ml-2 h-4 w-4" />
      </a>
    </Button>
  )
}

function PaymentConfirmationControl({
  paymentStarted,
  paymentConfirmed,
  onChange,
}: {
  paymentStarted: boolean
  paymentConfirmed: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <label
      className={`mt-4 flex items-start gap-3 rounded-[0.85rem] p-3 text-[0.76rem] leading-[1.5] text-primary ring-1 ring-border/70 ${
        paymentStarted
          ? "cursor-pointer bg-[var(--surface-soft)]"
          : "cursor-not-allowed bg-[var(--surface-soft)] opacity-55"
      }`}
    >
      <input
        type="checkbox"
        disabled={!paymentStarted}
        checked={paymentConfirmed}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1"
      />
      <span>I have completed the payment and want to send my request details to Spanish Academy.</span>
    </label>
  )
}

export function ContactForm() {
  const { language, t } = useLanguage()
  const [form, setForm] = useState<IntakeForm>(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [paymentStarted, setPaymentStarted] = useState(false)
  const [paymentConfirmed, setPaymentConfirmed] = useState(false)
  const contactSectionRef = useRef<HTMLElement | null>(null)
  const nextAvailabilityId = useRef(1)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const plan = params.get("plan")

    if (plan && plan in lessonPlans) {
      setForm((current) => ({
        ...current,
        service: t("form.service.spanish"),
        selectedPlan: plan,
      }))
    }
  }, [t])

  useEffect(() => {
    setPaymentStarted(false)
    setPaymentConfirmed(false)
  }, [form.service, form.selectedPlan, form.paymentMethod, form.liveLanguage])

  const selectedPlanData =
    form.selectedPlan && form.selectedPlan in lessonPlans
      ? lessonPlans[form.selectedPlan as LessonPlanKey]
      : null

  const isLive =
    form.service === t("form.service.live") ||
    form.service === "Real-time interpretation" ||
    form.service.toLowerCase().includes("interpret")

  useEffect(() => {
    if (isLive || !selectedPlanData) return

    const requiredCount = selectedPlanData.lessonCount

    setForm((current) => {
      if (current.availability.length === requiredCount) return current

      const existingAvailability = current.availability.slice(0, requiredCount)

      while (existingAvailability.length < requiredCount) {
        existingAvailability.push({
          id: `availability-${nextAvailabilityId.current++}`,
          day: "",
          startTime: "",
        })
      }

      return {
        ...current,
        availability: existingAvailability,
      }
    })
  }, [isLive, selectedPlanData])

  const services = useMemo(
    () => [t("form.service.spanish"), t("form.service.english"), t("form.service.live")],
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

  const dayOptions: { key: DayKey; label: string }[] = [
    { key: "monday", label: t("form.day.monday") },
    { key: "tuesday", label: t("form.day.tuesday") },
    { key: "wednesday", label: t("form.day.wednesday") },
    { key: "thursday", label: t("form.day.thursday") },
    { key: "friday", label: t("form.day.friday") },
    { key: "saturday", label: t("form.day.saturday") },
    { key: "sunday", label: t("form.day.sunday") },
  ]

  const liveContexts = [
    t("form.liveContext.daily"),
    t("form.liveContext.appointments"),
    t("form.liveContext.paperwork"),
    t("form.liveContext.medical"),
    t("form.liveContext.other"),
  ]

  const planOptions: {
    key: LessonPlanKey
    packName: string
    lessons: string
    price: string
  }[] = [
    {
      key: "starter",
      packName: "Starter Pack",
      lessons: "2 Lessons",
      price: "65 USD / EUR",
    },
    {
      key: "standard",
      packName: "Standard Pack",
      lessons: "4 Lessons",
      price: "125 USD / EUR",
    },
    {
      key: "plus",
      packName: "Plus Pack",
      lessons: "8 Lessons",
      price: "235 USD / EUR",
    },
    {
      key: "premium",
      packName: "Premium Pack",
      lessons: "10 Lessons",
      price: "280 USD / EUR",
    },
  ]

  const update = <K extends keyof IntakeForm>(key: K, value: IntakeForm[K]) => {
    setForm((current) => ({ ...current, [key]: value }))
  }

  const updateAvailability = (id: string, patch: Partial<AvailabilityEntry>) => {
    setForm((current) => ({
      ...current,
      availability: current.availability.map((entry) => (entry.id === id ? { ...entry, ...patch } : entry)),
    }))
  }

  const getDayLabel = (day: DayKey | "") => {
    if (!day) return ""
    return dayOptions.find((option) => option.key === day)?.label || day
  }

  const completedAvailability = form.availability.filter((entry) => entry.day && entry.startTime)

  const availabilityError = (() => {
    if (isLive || !selectedPlanData) return null

    if (form.availability.length !== selectedPlanData.lessonCount) {
      return language === "es"
        ? `Este paquete requiere ${selectedPlanData.lessonCount} horarios de clase.`
        : `This package requires ${selectedPlanData.lessonCount} lesson slots.`
    }

    for (let index = 0; index < form.availability.length; index++) {
      const entry = form.availability[index]

      if (!entry.day || !entry.startTime) {
        return language === "es"
          ? `Completá día y horario para la clase ${index + 1}.`
          : `Complete day and start time for lesson ${index + 1}.`
      }
    }

    for (let i = 0; i < completedAvailability.length; i++) {
      for (let j = i + 1; j < completedAvailability.length; j++) {
        if (availabilityRowsOverlap(completedAvailability[i], completedAvailability[j])) {
          const dayLabel = getDayLabel(completedAvailability[i].day)

          return language === "es"
            ? `Hay clases superpuestas para ${dayLabel}. Ajustá uno de los horarios.`
            : `There are overlapping lesson times for ${dayLabel}. Please adjust one of them.`
        }
      }
    }

    return null
  })()

  const availabilitySummary = completedAvailability
    .map((entry, index) => {
      const dayLabel = getDayLabel(entry.day)
      const endTime = getLessonEndTime(entry.startTime)

      return `Lesson ${index + 1}: ${dayLabel} ${entry.startTime}–${endTime}`
    })
    .join("; ")

  const isEnglishLesson = form.service === t("form.service.english") || form.service === "English lessons"

  const selectedServiceLabel = form.service

  const getLessonProductName = (planKey: LessonPlanKey) => {
    const plan = lessonPlans[planKey]
    return `${selectedServiceLabel} — ${plan.packName} (${plan.lessons})`
  }

  const paymentCurrency: Currency = form.paymentMethod.includes("EUR") ? "EUR" : "USD"

  const serviceLanguage: ServiceLanguage = isLive
    ? form.liveLanguage === t("form.liveLanguage.english") || form.liveLanguage === "English"
      ? "english"
      : "spanish"
    : isEnglishLesson
      ? "english"
      : "spanish"

  const paypalPlanKey: PaypalPlanKey | null = isLive
    ? "interpretation"
    : form.selectedPlan && form.selectedPlan in lessonPlans
      ? (form.selectedPlan as LessonPlanKey)
      : null

  const paypalHostedButtonId =
    paypalPlanKey && paypalButtons[paypalPlanKey]?.[serviceLanguage]?.[paymentCurrency]
      ? paypalButtons[paypalPlanKey][serviceLanguage][paymentCurrency]
      : null

  const paymentSummary = isLive
    ? {
        name:
          serviceLanguage === "english"
            ? "Spanish Academy Real-Time English Interpretation"
            : "Spanish Academy Real-Time Spanish Interpretation",
        price: "25 USD / EUR per hour",
      }
    : selectedPlanData && form.selectedPlan in lessonPlans
      ? {
          name: getLessonProductName(form.selectedPlan as LessonPlanKey),
          price: selectedPlanData.price,
        }
      : null

  const lessonScheduleIsComplete =
    isLive ||
    Boolean(
      selectedPlanData &&
        !availabilityError &&
        completedAvailability.length === selectedPlanData.lessonCount &&
        form.availability.length === selectedPlanData.lessonCount,
    )

  const canSendRequest = Boolean(paymentSummary && paymentConfirmed && lessonScheduleIsComplete)

  const mailBody = [
    `Service: ${form.service}`,
    paymentSummary ? `Selected product: ${paymentSummary.name}` : null,
    paymentSummary ? `Price: ${paymentSummary.price}` : null,
    paymentSummary ? `Payment method: ${form.paymentMethod}` : null,
    `Payment confirmation: ${paymentConfirmed ? "Confirmed by student" : "Not confirmed"}`,
    `Full name: ${form.fullName}`,
    `Email: ${form.email}`,
    `Country of residence: ${form.country}`,
    `Phone number: ${form.phone || "Not provided"}`,
    `Level: ${form.level}`,
    `Learning goal: ${form.goal}`,
    `Specific goal: ${form.specificGoal || "Not provided"}`,
    !isLive ? `Preferred lesson schedule: ${availabilitySummary || "Not provided"}` : null,
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

  const mailHref = `mailto:info@spanishglobalacademy.com?subject=${encodeURIComponent(
    language === "es" ? "SPANISH ACADEMY – FORMULARIO DE INGRESO" : "SPANISH ACADEMY – STUDENT INTAKE FORM",
  )}&body=${encodeURIComponent(mailBody)}`

  const clickablePaymentSummary =
    paymentSummary && paypalHostedButtonId ? (
      <a
        href={getPayPalPaymentUrl(paypalHostedButtonId)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          setPaymentStarted(true)
          setPaymentConfirmed(false)
        }}
        className="block rounded-[0.85rem] bg-white p-4 ring-1 ring-border/70 transition hover:bg-[var(--surface-soft)] hover:ring-primary/30"
      >
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-accent">Selected product</p>

        <p className="mt-2 font-serif text-[1.25rem] leading-[1.08] tracking-[-0.04em] text-primary">
          {paymentSummary.name}
        </p>

        <p className="mt-3 text-[0.82rem] font-semibold text-muted-foreground">
          Price: {paymentSummary.price}
        </p>

        {!isLive && (
          <p className="mt-2 text-[0.74rem] leading-[1.5] text-muted-foreground">
            Service: {selectedServiceLabel}
          </p>
        )}
      </a>
    ) : paymentSummary ? (
      <div className="rounded-[0.85rem] bg-white p-4 ring-1 ring-border/70">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-accent">Selected product</p>

        <p className="mt-2 font-serif text-[1.25rem] leading-[1.08] tracking-[-0.04em] text-primary">
          {paymentSummary.name}
        </p>

        <p className="mt-3 text-[0.82rem] font-semibold text-muted-foreground">
          Price: {paymentSummary.price}
        </p>

        {!isLive && (
          <p className="mt-2 text-[0.74rem] leading-[1.5] text-muted-foreground">
            Service: {selectedServiceLabel}
          </p>
        )}
      </div>
    ) : null

  return (
    <section id="contact" ref={contactSectionRef} className="section-pad bg-background">
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
                <h3 className="font-serif text-[1.65rem] leading-[1.05] tracking-[-0.045em]">
                  {language === "es" ? "Solicitud enviada correctamente" : "Request sent successfully"}
                </h3>
                <p className="mt-3 max-w-[72ch] text-[0.84rem] leading-[1.7] text-muted-foreground">
                  {language === "es"
                    ? "Gracias. Recibimos tu confirmación de pago y los detalles de tu solicitud. Nuestro equipo se pondrá en contacto para coordinar los próximos pasos."
                    : "Thank you. We received your payment confirmation and request details. Our team will contact you shortly to coordinate the next steps."}
                </p>
                <p className="mt-3 max-w-[72ch] text-[0.84rem] leading-[1.7] text-muted-foreground">
                  {language === "es"
                    ? "Si tu aplicación de correo no se abrió automáticamente, podés volver a enviar los detalles desde el botón inferior."
                    : "If your email app did not open automatically, you can send the details again using the button below."}
                </p>
              </div>

              <Button
                asChild
                className="h-10 w-fit rounded-full bg-primary px-6 text-[0.78rem] font-semibold text-white hover:bg-primary/92"
              >
                <a href={mailHref}>{language === "es" ? "Enviar detalles nuevamente" : "Send details again"}</a>
              </Button>
            </div>
          ) : (
            <form
              onSubmit={(event) => {
                event.preventDefault()

                if (!canSendRequest) {
                  return
                }

                setSubmitted(true)

                window.history.replaceState(null, "", "#contact")

                requestAnimationFrame(() => {
                  contactSectionRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  })
                })

                setTimeout(() => {
                  window.location.href = mailHref
                }, 250)
              }}
              className="space-y-6"
            >
              <section className="rounded-[1rem] bg-[var(--surface-soft)] p-5 ring-1 ring-border/70">
                <div className="mb-4">
                  <p className="fine-label">01</p>
                  <h3 className="mt-1 font-serif text-[1.35rem] leading-[1.08] tracking-[-0.04em] text-primary">
                    {t("form.service.title")}
                  </h3>
                  <p className="mt-2 text-[0.78rem] leading-[1.55] text-muted-foreground">
                    {t("form.service.note")}
                  </p>
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                  {services.map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() =>
                        setForm((current) => ({
                          ...current,
                          service,
                          selectedPlan: service === t("form.service.live") ? "" : current.selectedPlan,
                        }))
                      }
                      className={`rounded-[0.85rem] border px-4 py-3 text-left text-[0.8rem] font-semibold ${
                        form.service === service
                          ? "border-primary bg-primary text-white"
                          : "border-border bg-white text-primary hover:border-primary/40"
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </section>

              <section className="grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <p className="fine-label">02</p>
                  <h3 className="mt-1 font-serif text-[1.35rem] leading-[1.08] tracking-[-0.04em] text-primary">
                    {t("form.personal.title")}
                  </h3>
                  <p className="mt-2 text-[0.78rem] text-muted-foreground">
                    {t("form.personal.subtitle")}
                  </p>
                </div>

                <label className="grid gap-2 text-[0.72rem] font-semibold text-primary">
                  {t("form.fullName")}
                  <Input
                    required
                    value={form.fullName}
                    onChange={(event) => update("fullName", event.target.value)}
                    className="h-10 rounded-md border-border bg-white text-[0.82rem]"
                  />
                </label>

                <label className="grid gap-2 text-[0.72rem] font-semibold text-primary">
                  {t("form.email")}
                  <Input
                    required
                    type="email"
                    value={form.email}
                    onChange={(event) => update("email", event.target.value)}
                    className="h-10 rounded-md border-border bg-white text-[0.82rem]"
                  />
                </label>

                <label className="grid gap-2 text-[0.72rem] font-semibold text-primary">
                  {t("form.country")}
                  <Input
                    required
                    value={form.country}
                    onChange={(event) => update("country", event.target.value)}
                    className="h-10 rounded-md border-border bg-white text-[0.82rem]"
                  />
                </label>

                <label className="grid gap-2 text-[0.72rem] font-semibold text-primary">
                  {t("form.phone")}
                  <Input
                    value={form.phone}
                    onChange={(event) => update("phone", event.target.value)}
                    className="h-10 rounded-md border-border bg-white text-[0.82rem]"
                  />
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
                        {isEnglishLesson ? t("form.level.titleEnglish") : t("form.level.titleSpanish")}
                      </h3>
                    </div>

                    <label className="grid gap-2 text-[0.72rem] font-semibold text-primary">
                      {isEnglishLesson ? t("form.level.subtitleEnglish") : t("form.level.subtitleSpanish")}

                      <select
                        value={form.level}
                        onChange={(event) => update("level", event.target.value)}
                        className="h-10 rounded-md border border-border bg-white px-3 text-[0.82rem] text-primary outline-none"
                      >
                        {levels.map((level) => (
                          <option key={level}>{level}</option>
                        ))}
                      </select>
                    </label>

                    <label className="grid gap-2 text-[0.72rem] font-semibold text-primary">
                      {isEnglishLesson ? t("form.goal.subtitleEnglish") : t("form.goal.subtitleSpanish")}

                      <select
                        value={form.goal}
                        onChange={(event) => update("goal", event.target.value)}
                        className="h-10 rounded-md border border-border bg-white px-3 text-[0.82rem] text-primary outline-none"
                      >
                        {goals.map((goal) => (
                          <option key={goal}>{goal}</option>
                        ))}
                      </select>
                    </label>

                    <label className="grid gap-2 text-[0.72rem] font-semibold text-primary md:col-span-2">
                      {t("form.goal.specific")}
                      <Textarea
                        value={form.specificGoal}
                        onChange={(event) => update("specificGoal", event.target.value)}
                        placeholder={t("form.goal.placeholder")}
                        className="min-h-24 rounded-md border-border bg-white text-[0.82rem]"
                      />
                    </label>
                  </section>

                  <section className="grid gap-4">
                    <div>
                      <p className="fine-label">04</p>
                      <h3 className="mt-1 font-serif text-[1.35rem] leading-[1.08] tracking-[-0.04em] text-primary">
                        {language === "es" ? "Horarios tentativos de clase" : "Tentative lesson schedule"}
                      </h3>
                      <p className="mt-2 max-w-[72ch] text-[0.78rem] leading-[1.55] text-muted-foreground">
                        {selectedPlanData
                          ? language === "es"
                            ? `Este paquete incluye ${selectedPlanData.lessonCount} clases. Elegí un día y horario tentativo para cada clase. Cada clase dura 60 minutos.`
                            : `This package includes ${selectedPlanData.lessonCount} lessons. Select a tentative day and start time for each lesson. Each lesson lasts 60 minutes.`
                          : language === "es"
                            ? "Seleccioná un paquete para completar los horarios tentativos de clase."
                            : "Select a package to complete the tentative lesson schedule."}
                      </p>
                    </div>

                    {selectedPlanData ? (
                      <div className="grid gap-3">
                        {form.availability.map((entry, index) => (
                          <div
                            key={entry.id}
                            className="grid gap-3 rounded-[0.95rem] bg-[var(--surface-soft)] p-4 ring-1 ring-border/70 md:grid-cols-[0.55fr_1fr_0.9fr_0.9fr]"
                          >
                            <div className="grid gap-2 text-[0.72rem] font-semibold text-primary">
                              {language === "es" ? "Clase" : "Lesson"}
                              <div className="flex h-10 items-center rounded-md border border-border bg-white px-3 text-[0.82rem] text-primary">
                                {index + 1}
                              </div>
                            </div>

                            <label className="grid gap-2 text-[0.72rem] font-semibold text-primary">
                              {language === "es" ? "Día" : "Day"}
                              <select
                                value={entry.day}
                                onChange={(event) =>
                                  updateAvailability(entry.id, {
                                    day: event.target.value as DayKey | "",
                                  })
                                }
                                className="h-10 rounded-md border border-border bg-white px-3 text-[0.82rem] text-primary outline-none"
                              >
                                <option value="">{language === "es" ? "Seleccionar día" : "Select day"}</option>
                                {dayOptions.map((day) => (
                                  <option key={day.key} value={day.key}>
                                    {day.label}
                                  </option>
                                ))}
                              </select>
                            </label>

                            <label className="grid gap-2 text-[0.72rem] font-semibold text-primary">
                              {language === "es" ? "Inicio" : "Start"}
                              <select
                                value={entry.startTime}
                                onChange={(event) =>
                                  updateAvailability(entry.id, {
                                    startTime: event.target.value,
                                  })
                                }
                                className="h-10 rounded-md border border-border bg-white px-3 text-[0.82rem] text-primary outline-none"
                              >
                                <option value="">{language === "es" ? "Seleccionar hora" : "Select time"}</option>
                                {timeOptions.map((time) => (
                                  <option key={time} value={time}>
                                    {time}
                                  </option>
                                ))}
                              </select>
                            </label>

                            <div className="grid gap-2 text-[0.72rem] font-semibold text-primary">
                              {language === "es" ? "Fin" : "End"}
                              <div className="flex h-10 items-center rounded-md border border-border bg-white px-3 text-[0.82rem] text-primary">
                                {entry.startTime ? getLessonEndTime(entry.startTime) : "—"}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="rounded-[0.85rem] bg-[var(--surface-soft)] p-3 text-[0.74rem] leading-[1.55] text-muted-foreground ring-1 ring-border/70">
                        {language === "es"
                          ? "Primero elegí un paquete en la sección de pago para que el formulario genere la cantidad correcta de clases."
                          : "First choose a package in the payment section so the form can generate the correct number of lesson slots."}
                      </p>
                    )}

                    {availabilityError && (
                      <p className="rounded-[0.85rem] bg-white p-3 text-[0.74rem] font-semibold leading-[1.5] text-accent ring-1 ring-border/70">
                        {availabilityError}
                      </p>
                    )}
                  </section>
                </>
              ) : (
                <section className="grid gap-4 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <p className="fine-label">03</p>
                    <h3 className="mt-1 font-serif text-[1.35rem] leading-[1.08] tracking-[-0.04em] text-primary">
                      {t("form.liveDetails.title")}
                    </h3>
                    <p className="mt-2 text-[0.78rem] text-muted-foreground">
                      {t("form.liveDetails.subtitle")}
                    </p>
                  </div>

                  <label className="grid gap-2 text-[0.72rem] font-semibold text-primary">
                    {t("form.liveLanguage")}
                    <select
                      value={form.liveLanguage}
                      onChange={(event) => update("liveLanguage", event.target.value)}
                      className="h-10 rounded-md border border-border bg-white px-3 text-[0.82rem] text-primary outline-none"
                    >
                      <option>{t("form.liveLanguage.spanish")}</option>
                      <option>{t("form.liveLanguage.english")}</option>
                    </select>
                  </label>

                  <label className="grid gap-2 text-[0.72rem] font-semibold text-primary">
                    {t("form.liveContext")}
                    <select
                      value={form.liveContext}
                      onChange={(event) => update("liveContext", event.target.value)}
                      className="h-10 rounded-md border border-border bg-white px-3 text-[0.82rem] text-primary outline-none"
                    >
                      {liveContexts.map((context) => (
                        <option key={context}>{context}</option>
                      ))}
                    </select>
                  </label>

                  <label className="grid gap-2 text-[0.72rem] font-semibold text-primary md:col-span-2">
                    {t("form.liveDetailsField")}
                    <Textarea
                      value={form.liveDetails}
                      onChange={(event) => update("liveDetails", event.target.value)}
                      placeholder={t("form.liveDetailsPlaceholder")}
                      className="min-h-24 rounded-md border-border bg-white text-[0.82rem]"
                    />
                  </label>

                  <div className="md:col-span-2">
                    <p className="fine-label">04</p>
                    <h3 className="mt-1 font-serif text-[1.35rem] leading-[1.08] tracking-[-0.04em] text-primary">
                      {t("form.liveSchedule.title")}
                    </h3>
                    <p className="mt-2 text-[0.78rem] text-muted-foreground">
                      {t("form.liveSchedule.subtitle")}
                    </p>
                  </div>

                  <label className="grid gap-2 text-[0.72rem] font-semibold text-primary">
                    {t("form.liveDate")}
                    <Input
                      type="date"
                      value={form.liveDate}
                      onChange={(event) => update("liveDate", event.target.value)}
                      className="h-10 rounded-md border-border bg-white text-[0.82rem]"
                    />
                  </label>

                  <label className="grid gap-2 text-[0.72rem] font-semibold text-primary">
                    {t("form.liveTime")}
                    <Input
                      type="time"
                      value={form.liveTime}
                      onChange={(event) => update("liveTime", event.target.value)}
                      className="h-10 rounded-md border-border bg-white text-[0.82rem]"
                    />
                  </label>

                  <label className="grid gap-2 text-[0.72rem] font-semibold text-primary">
                    {t("form.liveFormat")}
                    <select
                      value={form.liveFormat}
                      onChange={(event) => update("liveFormat", event.target.value)}
                      className="h-10 rounded-md border border-border bg-white px-3 text-[0.82rem] text-primary outline-none"
                    >
                      <option>{t("form.liveFormat.call")}</option>
                      <option>{t("form.liveFormat.video")}</option>
                    </select>
                  </label>

                  <p className="rounded-[0.85rem] bg-[var(--surface-soft)] p-3 text-[0.72rem] leading-[1.55] text-muted-foreground ring-1 ring-border/70">
                    Please indicate the requested day, approximate time range, and a brief description of the situation
                    that requires interpretation (e.g. medical appointment, bank procedure, business meeting, legal
                    consultation).
                  </p>
                </section>
              )}

              {!isLive ? (
                <section className="rounded-[1rem] bg-[var(--surface-soft)] p-5 ring-1 ring-border/70">
                  <p className="fine-label">06</p>

                  <h3 className="mt-1 font-serif text-[1.35rem] leading-[1.08] tracking-[-0.04em] text-primary">
                    {language === "es" ? "Elegí un paquete y método de pago" : "Choose a package & payment"}
                  </h3>

                  <p className="mt-2 text-[0.78rem] text-muted-foreground">
                    {language === "es"
                      ? "Podés cambiar tu paquete aquí antes de completar el pago."
                      : "You can change your package here before completing the payment."}
                  </p>

                  <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                    {planOptions.map((plan) => {
                      const active = form.selectedPlan === plan.key

                      return (
                        <button
                          key={plan.key}
                          type="button"
                          onClick={() => update("selectedPlan", plan.key)}
                          className={`rounded-[0.95rem] border p-4 text-left transition ${
                            active
                              ? "border-primary bg-primary text-white"
                              : "border-border bg-white text-primary hover:border-primary/40"
                          }`}
                        >
                          <p
                            className={`text-[0.72rem] font-semibold uppercase tracking-[0.14em] ${
                              active ? "text-white/80" : "text-accent"
                            }`}
                          >
                            Package
                          </p>

                          <p className="mt-2 font-serif text-[1.1rem] leading-[1.05] tracking-[-0.035em]">
                            {selectedServiceLabel}
                            <br />
                            {plan.packName}
                          </p>

                          <p className={`mt-1 text-[0.8rem] ${active ? "text-white/80" : "text-muted-foreground"}`}>
                            ({plan.lessons})
                          </p>

                          <p className={`mt-4 text-[0.9rem] font-semibold ${active ? "text-white" : "text-primary"}`}>
                            {plan.price}
                          </p>
                        </button>
                      )
                    })}
                  </div>

                  {paymentSummary && selectedPlanData ? (
                    <>
                      <div className="mt-5 grid gap-3 md:grid-cols-[1.1fr_0.9fr]">
                        {clickablePaymentSummary}

                        <label className="grid gap-2 rounded-[0.85rem] bg-white p-4 text-[0.72rem] font-semibold text-primary ring-1 ring-border/70">
                          Payment method
                          <select
                            value={form.paymentMethod}
                            onChange={(event) => update("paymentMethod", event.target.value)}
                            className="h-10 rounded-md border border-border bg-white px-3 text-[0.82rem] text-primary outline-none"
                          >
                            {paymentMethods.map((method) => (
                              <option key={method}>{method}</option>
                            ))}
                          </select>
                        </label>
                      </div>

                      {paypalHostedButtonId && (
                        <div className="mt-5 rounded-[0.85rem] bg-white p-4 ring-1 ring-border/70">
                          <p className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-accent">
                            Secure payment
                          </p>

                          <PayPalPaymentButton
                            hostedButtonId={paypalHostedButtonId}
                            onPaymentStarted={() => {
                              setPaymentStarted(true)
                              setPaymentConfirmed(false)
                            }}
                          />

                          <p className="mt-3 text-[0.72rem] leading-[1.55] text-muted-foreground">
                            You can pay with PayPal or with a credit/debit card, depending on PayPal availability in your
                            country.
                          </p>

                          <PaymentConfirmationControl
                            paymentStarted={paymentStarted}
                            paymentConfirmed={paymentConfirmed}
                            onChange={setPaymentConfirmed}
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="mt-5 rounded-[0.85rem] bg-white p-4 text-[0.76rem] leading-[1.55] text-muted-foreground ring-1 ring-border/70">
                      Select a package to display the payment option.
                    </p>
                  )}
                </section>
              ) : (
                paymentSummary && (
                  <section className="rounded-[1rem] bg-[var(--surface-soft)] p-5 ring-1 ring-border/70">
                    <p className="fine-label">05</p>

                    <h3 className="mt-1 font-serif text-[1.35rem] leading-[1.08] tracking-[-0.04em] text-primary">
                      Selected service & payment
                    </h3>

                    <div className="mt-4 grid gap-3 md:grid-cols-[1.1fr_0.9fr]">
                      {clickablePaymentSummary}

                      <label className="grid gap-2 rounded-[0.85rem] bg-white p-4 text-[0.72rem] font-semibold text-primary ring-1 ring-border/70">
                        Payment method
                        <select
                          value={form.paymentMethod}
                          onChange={(event) => update("paymentMethod", event.target.value)}
                          className="h-10 rounded-md border border-border bg-white px-3 text-[0.82rem] text-primary outline-none"
                        >
                          {paymentMethods.map((method) => (
                            <option key={method}>{method}</option>
                          ))}
                        </select>
                      </label>
                    </div>

                    {paypalHostedButtonId && (
                      <div className="mt-5 rounded-[0.85rem] bg-white p-4 ring-1 ring-border/70">
                        <p className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-accent">
                          Secure payment
                        </p>

                        <PayPalPaymentButton
                          hostedButtonId={paypalHostedButtonId}
                          onPaymentStarted={() => {
                            setPaymentStarted(true)
                            setPaymentConfirmed(false)
                          }}
                        />

                        <p className="mt-3 text-[0.72rem] leading-[1.55] text-muted-foreground">
                          You can pay with PayPal or with a credit/debit card, depending on PayPal availability in your
                          country.
                        </p>

                        <PaymentConfirmationControl
                          paymentStarted={paymentStarted}
                          paymentConfirmed={paymentConfirmed}
                          onChange={setPaymentConfirmed}
                        />
                      </div>
                    )}
                  </section>
                )
              )}

              <section className="grid gap-4">
                <div>
                  <p className="fine-label">{isLive ? "06" : "07"}</p>

                  <h3 className="mt-1 font-serif text-[1.35rem] leading-[1.08] tracking-[-0.04em] text-primary">
                    {t("form.message.title")}
                  </h3>

                  <p className="mt-2 text-[0.78rem] text-muted-foreground">
                    {t("form.message.subtitle")}
                  </p>
                </div>

                <Textarea
                  value={form.message}
                  onChange={(event) => update("message", event.target.value)}
                  placeholder={t("form.message.placeholder")}
                  className="min-h-24 rounded-md border-border bg-white text-[0.82rem]"
                />
              </section>

              <Button
                type="submit"
                disabled={!canSendRequest}
                className="interactive-button h-11 rounded-full bg-primary px-7 text-[0.84rem] font-semibold text-white hover:bg-primary/92 disabled:pointer-events-none disabled:opacity-45"
              >
                <Mail className="mr-2 h-4 w-4" />
                {availabilityError
                  ? language === "es"
                    ? "Corregí los horarios"
                    : "Fix lesson schedule"
                  : !paymentSummary
                    ? language === "es"
                      ? "Seleccioná un paquete primero"
                      : "Select a package first"
                    : !paymentConfirmed
                      ? language === "es"
                        ? "Completá el pago primero"
                        : "Complete payment first"
                      : language === "es"
                        ? "Confirmar y enviar solicitud"
                        : "Confirm & send request"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}