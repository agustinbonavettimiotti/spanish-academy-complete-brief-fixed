"use client"

import { useEffect, useMemo, useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, CheckCircle2, Mail } from "lucide-react"

type Currency = "USD" | "EUR"
type ServiceLanguage = "spanish" | "english"
type LessonPlanKey = "starter" | "standard" | "plus" | "premium"
type PaypalPlanKey = LessonPlanKey | "interpretation"

type IntakeForm = {
  service: string
  selectedPlan: string
  paymentMethod: string
  paymentCurrency: Currency
  fullName: string
  email: string
  country: string
  timeZone: string
  phone: string
  level: string
  goal: string
  specificGoal: string
  availabilityByDay: Record<string, string>
  exactTime: string
  lessonPlatform: string
  liveLanguage: string
  liveContext: string
  liveDetails: string
  liveDate: string
  liveTime: string
  liveFormat: string
  message: string
}

const argentinaTimeZone = "America/Argentina/Buenos_Aires"

const countryOptions = [
  { country: "Argentina", timeZones: ["America/Argentina/Buenos_Aires"] },
  { country: "Spain", timeZones: ["Europe/Madrid", "Atlantic/Canary"] },
  {
    country: "United States",
    timeZones: [
      "America/New_York",
      "America/Chicago",
      "America/Denver",
      "America/Los_Angeles",
      "America/Anchorage",
      "Pacific/Honolulu",
    ],
  },
  {
    country: "Mexico",
    timeZones: ["America/Mexico_City", "America/Cancun", "America/Monterrey", "America/Tijuana"],
  },
  { country: "Colombia", timeZones: ["America/Bogota"] },
  { country: "Peru", timeZones: ["America/Lima"] },
  { country: "Chile", timeZones: ["America/Santiago"] },
  { country: "Uruguay", timeZones: ["America/Montevideo"] },
  { country: "Paraguay", timeZones: ["America/Asuncion"] },
  { country: "Bolivia", timeZones: ["America/La_Paz"] },
  {
    country: "Brazil",
    timeZones: ["America/Sao_Paulo", "America/Manaus", "America/Belem", "America/Fortaleza", "America/Recife"],
  },
  { country: "Venezuela", timeZones: ["America/Caracas"] },
  { country: "Ecuador", timeZones: ["America/Guayaquil"] },
  { country: "Panama", timeZones: ["America/Panama"] },
  { country: "Costa Rica", timeZones: ["America/Costa_Rica"] },
  { country: "Dominican Republic", timeZones: ["America/Santo_Domingo"] },
  { country: "Puerto Rico", timeZones: ["America/Puerto_Rico"] },
  {
    country: "Canada",
    timeZones: ["America/Toronto", "America/Vancouver", "America/Edmonton", "America/Winnipeg", "America/Halifax"],
  },
  { country: "United Kingdom", timeZones: ["Europe/London"] },
  { country: "Ireland", timeZones: ["Europe/Dublin"] },
  { country: "France", timeZones: ["Europe/Paris"] },
  { country: "Germany", timeZones: ["Europe/Berlin"] },
  { country: "Italy", timeZones: ["Europe/Rome"] },
  { country: "Portugal", timeZones: ["Europe/Lisbon"] },
  { country: "Netherlands", timeZones: ["Europe/Amsterdam"] },
  { country: "Switzerland", timeZones: ["Europe/Zurich"] },
  {
    country: "Australia",
    timeZones: ["Australia/Sydney", "Australia/Melbourne", "Australia/Brisbane", "Australia/Perth", "Australia/Adelaide"],
  },
  { country: "New Zealand", timeZones: ["Pacific/Auckland"] },
  { country: "Japan", timeZones: ["Asia/Tokyo"] },
  { country: "China", timeZones: ["Asia/Shanghai"] },
  { country: "India", timeZones: ["Asia/Kolkata"] },
  { country: "South Korea", timeZones: ["Asia/Seoul"] },
  { country: "South Africa", timeZones: ["Africa/Johannesburg"] },
  { country: "United Arab Emirates", timeZones: ["Asia/Dubai"] },
  { country: "Israel", timeZones: ["Asia/Jerusalem"] },
  { country: "Turkey", timeZones: ["Europe/Istanbul"] },
  { country: "Other / Not listed", timeZones: [] },
]

const allTimeZones = Array.from(new Set(countryOptions.flatMap((country) => country.timeZones))).sort()

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

const lessonPlans: Record<LessonPlanKey, { name: string; price: string; lessonCount: number }> = {
  starter: {
    name: "Spanish Academy Starter Pack (2 Lessons)",
    price: "65 USD / EUR",
    lessonCount: 2,
  },
  standard: {
    name: "Spanish Academy Standard Pack (4 Lessons)",
    price: "125 USD / EUR",
    lessonCount: 4,
  },
  plus: {
    name: "Spanish Academy Plus Pack (8 Lessons)",
    price: "235 USD / EUR",
    lessonCount: 8,
  },
  premium: {
    name: "Spanish Academy Premium Pack (10 Lessons)",
    price: "280 USD / EUR",
    lessonCount: 10,
  },
}

const paymentMethods = ["PayPal or card"]
const paymentCurrencies: Currency[] = ["USD", "EUR"]
const lessonPlatforms = ["Google Meet", "Zoom"]

const initialForm: IntakeForm = {
  service: "Spanish lessons",
  selectedPlan: "",
  paymentMethod: "PayPal or card",
  paymentCurrency: "USD",
  fullName: "",
  email: "",
  country: "",
  timeZone: "",
  phone: "",
  level: "A1",
  goal: "Travel",
  specificGoal: "",
  availabilityByDay: {},
  exactTime: "",
  lessonPlatform: "Google Meet",
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

function PayPalPaymentButton({
  hostedButtonId,
  onPaymentLinkOpen,
  label,
}: {
  hostedButtonId: string
  onPaymentLinkOpen: () => void
  label: string
}) {
  return (
    <Button
      asChild
      className="interactive-button h-auto min-h-11 w-full rounded-full bg-primary px-4 py-3 text-center text-[0.8rem] font-semibold leading-[1.2] text-white hover:bg-primary/92 sm:px-7 sm:text-[0.84rem]"
    >
      <a
        href={getPayPalPaymentUrl(hostedButtonId)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onPaymentLinkOpen}
        className="flex w-full min-w-0 items-center justify-center gap-2"
      >
        <span className="min-w-0 whitespace-normal break-words">{label}</span>
        <ArrowRight className="h-4 w-4 shrink-0" />
      </a>
    </Button>
  )
}

function parseTime(time: string) {
  const [hours, minutes] = time.split(":").map(Number)
  return { hours, minutes }
}

function getCountryOption(countryName: string) {
  return countryOptions.find((option) => option.country.toLowerCase() === countryName.trim().toLowerCase())
}

function getCleanTimeBlockLabel(label: string) {
  return label.replace(/\s*\([^)]*\)\s*$/g, "").trim()
}

function formatPrice(price: string, currency: Currency) {
  return price.replace("USD / EUR", currency)
}

function getTimeZoneOffsetMs(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date)

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]))
  const zonedAsUtc = Date.UTC(
    Number(values.year),
    Number(values.month) - 1,
    Number(values.day),
    Number(values.hour),
    Number(values.minute),
    Number(values.second),
  )

  return zonedAsUtc - date.getTime()
}

function zonedTimeToUtc(year: number, month: number, day: number, time: string, timeZone: string) {
  const { hours, minutes } = parseTime(time)
  const utcGuess = Date.UTC(year, month - 1, day, hours, minutes, 0)
  const firstOffset = getTimeZoneOffsetMs(new Date(utcGuess), timeZone)
  const firstUtc = new Date(utcGuess - firstOffset)
  const secondOffset = getTimeZoneOffsetMs(firstUtc, timeZone)

  return new Date(utcGuess - secondOffset)
}

function getZonedCalendarParts(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date)

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]))
  const weekdayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  }

  return {
    year: Number(values.year),
    month: Number(values.month),
    day: Number(values.day),
    weekdayIndex: weekdayMap[values.weekday] ?? 0,
  }
}

function addDaysToCalendarDate(year: number, month: number, day: number, daysToAdd: number) {
  const date = new Date(Date.UTC(year, month - 1, day + daysToAdd))

  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
  }
}

function formatDateTimeInTimeZone(date: Date, timeZone: string, language: "en" | "es") {
  const locale = language === "es" ? "es-AR" : "en-US"
  const parts = new Intl.DateTimeFormat(locale, {
    timeZone,
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date)

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]))

  return {
    weekday: values.weekday,
    time: `${values.hour}:${values.minute}`,
  }
}

function formatArgentinaRangeFromStudentLocalTime({
  dayIndex,
  startTime,
  endTime,
  studentTimeZone,
  language,
}: {
  dayIndex: number
  startTime: string
  endTime: string
  studentTimeZone: string
  language: "en" | "es"
}) {
  const todayInStudentZone = getZonedCalendarParts(new Date(), studentTimeZone)
  const daysUntilTarget = (dayIndex - todayInStudentZone.weekdayIndex + 7) % 7
  const targetDate = addDaysToCalendarDate(
    todayInStudentZone.year,
    todayInStudentZone.month,
    todayInStudentZone.day,
    daysUntilTarget,
  )

  const startUtc = zonedTimeToUtc(targetDate.year, targetDate.month, targetDate.day, startTime, studentTimeZone)
  const endUtc = zonedTimeToUtc(targetDate.year, targetDate.month, targetDate.day, endTime, studentTimeZone)

  const startArgentina = formatDateTimeInTimeZone(startUtc, argentinaTimeZone, language)
  const endArgentina = formatDateTimeInTimeZone(endUtc, argentinaTimeZone, language)

  if (startArgentina.weekday === endArgentina.weekday) {
    return `${startArgentina.weekday} ${startArgentina.time}–${endArgentina.time}`
  }

  return `${startArgentina.weekday} ${startArgentina.time}–${endArgentina.weekday} ${endArgentina.time}`
}

export function ContactForm() {
  const { language, t } = useLanguage()
  const [form, setForm] = useState<IntakeForm>(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false)
  const [paymentConfirmed, setPaymentConfirmed] = useState(false)
  const [paymentLinkOpened, setPaymentLinkOpened] = useState(false)

  const paymentCopy = {
    packageTitle: language === "es" ? "Elegí un paquete y pago" : "Choose a package & payment",
    packageSubtitle:
      language === "es"
        ? "Podés cambiar tu paquete de clases antes de completar el pago."
        : "You can change your lesson package here before completing the payment.",
    packageLabel: language === "es" ? "Paquete" : "Package",
    selectedServiceTitle: language === "es" ? "Servicio seleccionado y pago" : "Selected service & payment",
    selectedProduct: language === "es" ? "Producto seleccionado" : "Selected product",
    price: language === "es" ? "Precio" : "Price",
    service: language === "es" ? "Servicio" : "Service",
    paymentMethod: language === "es" ? "Método de pago" : "Payment method",
    securePayment: language === "es" ? "Pago seguro" : "Secure payment",
    paymentButton:
      language === "es" ? "Pagar con PayPal o tarjeta de crédito/débito" : "Pay with PayPal or credit/debit card",
    paymentNote:
      language === "es"
        ? "Podés pagar con PayPal o con tarjeta de crédito/débito, según la disponibilidad de PayPal en tu país."
        : "You can pay with PayPal or with a credit/debit card, depending on PayPal availability in your country.",
    paymentConfirmation:
      language === "es"
        ? "Confirmo que ya completé el pago y quiero enviar mis datos a Spanish Academy."
        : "I have completed the payment and want to send my request details to Spanish Academy.",
    paymentLinkFirst:
      language === "es"
        ? "Primero abrí el link de pago. Después vas a poder confirmar el pago y enviar el formulario."
        : "Open the payment link first. Then you’ll be able to confirm payment and send the form.",
    selectPackage:
      language === "es"
        ? "Seleccioná un paquete de clases para mostrar la opción de pago."
        : "Select a lesson package to display the payment option.",
    liveHelp:
      language === "es"
        ? "Indicá el día solicitado, la franja horaria aproximada y una breve descripción de la situación que requiere interpretación."
        : "Please indicate the requested day, approximate time range, and a brief description of the situation that requires interpretation.",
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const plan = params.get("plan")
    const service = params.get("service")

    if (plan && plan in lessonPlans) {
      setForm((current) => ({
        ...current,
        service: t("form.service.spanish"),
        selectedPlan: plan,
      }))
    }

    if (service === "real-time-spanish-interpretation") {
      setForm((current) => ({
        ...current,
        service: t("form.service.live"),
        selectedPlan: "",
        liveLanguage: t("form.liveLanguage.spanish"),
      }))
    }

    if (service === "real-time-english-interpretation") {
      setForm((current) => ({
        ...current,
        service: t("form.service.live"),
        selectedPlan: "",
        liveLanguage: t("form.liveLanguage.english"),
      }))
    }
  }, [t])

  const selectedPlanData =
    form.selectedPlan && form.selectedPlan in lessonPlans
      ? lessonPlans[form.selectedPlan as LessonPlanKey]
      : null

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

  const days = [
    { key: "monday", label: t("form.day.monday"), dayIndex: 1 },
    { key: "tuesday", label: t("form.day.tuesday"), dayIndex: 2 },
    { key: "wednesday", label: t("form.day.wednesday"), dayIndex: 3 },
    { key: "thursday", label: t("form.day.thursday"), dayIndex: 4 },
    { key: "friday", label: t("form.day.friday"), dayIndex: 5 },
    { key: "saturday", label: t("form.day.saturday"), dayIndex: 6 },
    { key: "sunday", label: t("form.day.sunday"), dayIndex: 0 },
  ]

  const timeBlocks = [
    { key: "morning", label: t("form.time.morning"), startTime: "06:00", endTime: "12:00" },
    { key: "afternoon", label: t("form.time.afternoon"), startTime: "12:00", endTime: "18:00" },
    { key: "evening", label: t("form.time.evening"), startTime: "18:00", endTime: "23:00" },
    { key: "flexible", label: t("form.time.flexible"), startTime: null, endTime: null },
  ]

  const selectedCountry = getCountryOption(form.country)

  const filteredCountryOptions = useMemo(() => {
    const query = form.country.trim().toLowerCase()

    if (!query) {
      return countryOptions
    }

    return countryOptions.filter((option) => option.country.toLowerCase().includes(query))
  }, [form.country])

  const visibleTimeZones = !form.country
    ? []
    : selectedCountry?.country === "Other / Not listed"
      ? allTimeZones
      : selectedCountry?.timeZones.length
        ? selectedCountry.timeZones
        : allTimeZones

  const liveContexts = [
    t("form.liveContext.daily"),
    t("form.liveContext.appointments"),
    t("form.liveContext.paperwork"),
    t("form.liveContext.medical"),
    t("form.liveContext.other"),
  ]

  const planOptions: {
    key: LessonPlanKey
    title: string
    subtitle: string
    price: string
  }[] = [
    {
      key: "starter",
      title: "Spanish Academy Starter Pack",
      subtitle: "(2 Lessons)",
      price: "65 USD / EUR",
    },
    {
      key: "standard",
      title: "Spanish Academy Standard Pack",
      subtitle: "(4 Lessons)",
      price: "125 USD / EUR",
    },
    {
      key: "plus",
      title: "Spanish Academy Plus Pack",
      subtitle: "(8 Lessons)",
      price: "235 USD / EUR",
    },
    {
      key: "premium",
      title: "Spanish Academy Premium Pack",
      subtitle: "(10 Lessons)",
      price: "280 USD / EUR",
    },
  ]

  const selectedDayRows = days.filter((day) => Object.prototype.hasOwnProperty.call(form.availabilityByDay, day.key))
  const selectedDayLimit = selectedPlanData ? Math.min(selectedPlanData.lessonCount, days.length) : days.length
  const selectedDayCount = selectedDayRows.length

  const update = <K extends keyof IntakeForm>(key: K, value: IntakeForm[K]) => {
    setForm((current) => ({ ...current, [key]: value }))
  }

  const resetPaymentConfirmation = () => {
    setPaymentConfirmed(false)
    setPaymentLinkOpened(false)
  }

  const updateCountry = (countryName: string) => {
    const country = getCountryOption(countryName)

    setForm((current) => {
      if (!countryName.trim()) {
        return {
          ...current,
          country: "",
          timeZone: "",
        }
      }

      if (!country) {
        return {
          ...current,
          country: countryName,
          timeZone: "",
        }
      }

      const nextTimeZone =
        country.country === "Other / Not listed"
          ? ""
          : country.timeZones.includes(current.timeZone)
            ? current.timeZone
            : country.timeZones[0] || ""

      return {
        ...current,
        country: country.country,
        timeZone: nextTimeZone,
      }
    })
  }

  const toggleAvailabilityDay = (dayKey: string) => {
    setForm((current) => {
      const isSelected = Object.prototype.hasOwnProperty.call(current.availabilityByDay, dayKey)
      const currentSelectedCount = Object.keys(current.availabilityByDay).length
      const nextAvailabilityByDay = { ...current.availabilityByDay }

      if (isSelected) {
        delete nextAvailabilityByDay[dayKey]
      } else {
        if (currentSelectedCount >= selectedDayLimit) {
          return current
        }

        nextAvailabilityByDay[dayKey] = ""
      }

      return {
        ...current,
        availabilityByDay: nextAvailabilityByDay,
      }
    })
  }

  const updateAvailabilityBlock = (dayKey: string, blockKey: string) => {
    setForm((current) => ({
      ...current,
      availabilityByDay: {
        ...current.availabilityByDay,
        [dayKey]: blockKey,
      },
    }))
  }

  const selectPlan = (planKey: LessonPlanKey) => {
    resetPaymentConfirmation()

    setForm((current) => {
      const nextLimit = Math.min(lessonPlans[planKey].lessonCount, days.length)
      const trimmedAvailabilityByDay = Object.fromEntries(
        days
          .filter((day) => Object.prototype.hasOwnProperty.call(current.availabilityByDay, day.key))
          .slice(0, nextLimit)
          .map((day) => [day.key, current.availabilityByDay[day.key]]),
      )

      return {
        ...current,
        selectedPlan: planKey,
        availabilityByDay: trimmedAvailabilityByDay,
      }
    })
  }

  const isLive =
    form.service === t("form.service.live") ||
    form.service === "Real-time interpretation" ||
    form.service.toLowerCase().includes("interpret")

  const isEnglishLesson = form.service === t("form.service.english") || form.service === "English lessons"

  const paymentCurrency: Currency = form.paymentCurrency

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
    : selectedPlanData

  const selectedAvailabilityRows = selectedDayRows.map((day) => {
    const selectedBlockKey = form.availabilityByDay[day.key]
    const block = timeBlocks.find((timeBlock) => timeBlock.key === selectedBlockKey) || null

    return {
      day,
      block,
    }
  })

  const availableDaysText = isLive
    ? form.liveDate || "Not provided"
    : selectedDayRows.length
      ? selectedDayRows.map((day) => day.label).join(", ")
      : "Not provided"

  const availableTimeText = isLive
    ? form.liveTime || "Not provided"
    : selectedAvailabilityRows.length
      ? selectedAvailabilityRows
          .map(({ day, block }) => {
            if (!block) return `${day.label} — Time not selected`

            const blockLabel = getCleanTimeBlockLabel(block.label)

            if (block.startTime && block.endTime) {
              return `${day.label} — ${blockLabel} (${block.startTime}–${block.endTime})`
            }

            return `${day.label} — ${blockLabel}`
          })
          .join("; ")
      : "Not provided"

  const argentinaTimeText = (() => {
    if (isLive) {
      if (!form.liveDate || !form.liveTime || !form.timeZone) return "Not provided"

      const [year, month, day] = form.liveDate.split("-").map(Number)
      const liveUtc = zonedTimeToUtc(year, month, day, form.liveTime, form.timeZone)
      const argentinaTime = formatDateTimeInTimeZone(liveUtc, argentinaTimeZone, language)

      return `${argentinaTime.weekday} ${argentinaTime.time}`
    }

    if (!selectedAvailabilityRows.length || !form.timeZone) return "Not provided"

    return selectedAvailabilityRows
      .map(({ day, block }) => {
        if (!block) return `${day.label} — Time not selected`

        const blockLabel = getCleanTimeBlockLabel(block.label)

        if (block.startTime && block.endTime) {
          const argentinaRange = formatArgentinaRangeFromStudentLocalTime({
            dayIndex: day.dayIndex,
            startTime: block.startTime,
            endTime: block.endTime,
            studentTimeZone: form.timeZone,
            language,
          })

          return `${day.label} — ${blockLabel}: ${argentinaRange}`
        }

        return `${day.label} — ${blockLabel}`
      })
      .join("; ")
  })()

  const mailBody = [
    `Service: ${form.service}`,
    paymentSummary ? `Selected product: ${paymentSummary.name}` : null,
    paymentSummary ? `Price: ${formatPrice(paymentSummary.price, form.paymentCurrency)}` : null,
    `Currency: ${form.paymentCurrency}`,
    `Payment method: ${form.paymentMethod}`,
    `Full name: ${form.fullName}`,
    `Email: ${form.email}`,
    `Country of residence: ${form.country || "Not provided"}`,
    `Phone number: ${form.phone || "Not provided"}`,
    `Level: ${isLive ? "Not applicable" : form.level}`,
    `Learning goal: ${isLive ? form.liveContext : form.goal}`,
    `Specific goal: ${isLive ? form.liveDetails || "Not provided" : form.specificGoal || "Not provided"}`,
    `Available days: ${availableDaysText}`,
    `Available time: ${availableTimeText}`,
    `Exact times: ${isLive ? form.liveFormat || "Not provided" : form.exactTime || "Not provided"}`,
    `Optional message: ${form.message || "Not provided"}`,
    `ARG: ${argentinaTimeText}`,
  ]
    .filter((item): item is string => item !== null)
    .join("\n")

  const mailHref = `mailto:info@spanishglobalacademy.com?subject=${encodeURIComponent(
    "SPANISH ACADEMY – STUDENT INTAKE FORM",
  )}&body=${encodeURIComponent(mailBody)}`

  const canSubmit = Boolean(paymentSummary) && paymentConfirmed

  return (
    <section id="contact" className="section-pad bg-background">
      <div className="section-shell editorial-section">
        <aside>
          <div className="label-rule" />

          <h2 className="section-label">
            {language === "en" ? (
              <>
                Student
                <br />
                Intake
                <br />
                Form
              </>
            ) : (
              t("form.label")
            )}
          </h2>

          <div className="max-w-[14rem]">
            <p className="section-note">{t("form.subtitle")}</p>

            <p className="mt-4 rounded-[0.85rem] bg-[var(--surface-soft)] p-3 text-[0.72rem] leading-[1.55] text-muted-foreground ring-1 ring-border/70">
              {t("form.mailHint")}
            </p>
          </div>
        </aside>

        <div className="min-w-0 overflow-hidden rounded-[1.2rem] border border-border/85 bg-white p-4 shadow-[0_18px_56px_-46px_rgba(7,52,92,.15)] sm:p-5 lg:p-7">
          {submitted ? (
            <div className="grid min-w-0 gap-5 rounded-[1rem] bg-[var(--surface-soft)] p-5 text-primary ring-1 ring-border/70 sm:p-6">
              <CheckCircle2 className="h-9 w-9 text-accent" />

              <div className="min-w-0">
                <h3 className="break-words font-serif text-[1.45rem] leading-[1.05] tracking-[-0.045em] sm:text-[1.65rem]">
                  {t("form.confirmation.title")}
                </h3>
                <p className="mt-3 max-w-[72ch] text-[0.84rem] leading-[1.7] text-muted-foreground">
                  {t("form.confirmation.body")}
                </p>
                <p className="mt-3 max-w-[72ch] text-[0.84rem] leading-[1.7] text-muted-foreground">
                  {t("form.confirmation.note")}
                </p>
              </div>

              <Button
                asChild
                className="h-10 w-full rounded-full bg-primary px-6 text-[0.78rem] font-semibold text-white hover:bg-primary/92 sm:w-fit"
              >
                <a href={mailHref}>{t("form.confirmation.email")}</a>
              </Button>
            </div>
          ) : (
            <form
              onSubmit={(event) => {
                event.preventDefault()

                if (!canSubmit) {
                  return
                }

                setSubmitted(true)
                window.location.href = mailHref
              }}
              className="min-w-0 space-y-6"
            >
              <section className="min-w-0 rounded-[1rem] bg-[var(--surface-soft)] p-4 ring-1 ring-border/70 sm:p-5">
                <div className="mb-4 min-w-0">
                  <p className="fine-label">01</p>
                  <h3 className="mt-1 break-words font-serif text-[1.25rem] leading-[1.08] tracking-[-0.04em] text-primary sm:text-[1.35rem]">
                    {t("form.service.title")}
                  </h3>
                  <p className="mt-2 text-[0.78rem] leading-[1.55] text-muted-foreground">
                    {t("form.service.note")}
                  </p>
                </div>

                <div className="grid min-w-0 gap-3 md:grid-cols-3">
                  {services.map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => {
                        resetPaymentConfirmation()

                        setForm((current) => ({
                          ...current,
                          service,
                          selectedPlan: service === t("form.service.live") ? "" : current.selectedPlan,
                        }))
                      }}
                      className={`min-w-0 rounded-[0.85rem] border px-4 py-3 text-left text-[0.8rem] font-semibold ${
                        form.service === service
                          ? "border-primary bg-primary text-white"
                          : "border-border bg-white text-primary hover:border-primary/40"
                      }`}
                    >
                      <span className="block break-words">{service}</span>
                    </button>
                  ))}
                </div>
              </section>

              <section className="grid min-w-0 gap-4 md:grid-cols-2">
                <div className="min-w-0 md:col-span-2">
                  <p className="fine-label">02</p>
                  <h3 className="mt-1 break-words font-serif text-[1.25rem] leading-[1.08] tracking-[-0.04em] text-primary sm:text-[1.35rem]">
                    {t("form.personal.title")}
                  </h3>
                  <p className="mt-2 text-[0.78rem] text-muted-foreground">
                    {t("form.personal.subtitle")}
                  </p>
                </div>

                <label className="grid min-w-0 gap-2 text-[0.72rem] font-semibold text-primary">
                  {t("form.fullName")}
                  <Input
                    required
                    value={form.fullName}
                    onChange={(event) => update("fullName", event.target.value)}
                    className="h-10 min-w-0 rounded-md border-border bg-white text-[0.82rem]"
                  />
                </label>

                <label className="grid min-w-0 gap-2 text-[0.72rem] font-semibold text-primary">
                  {t("form.email")}
                  <Input
                    required
                    type="email"
                    value={form.email}
                    onChange={(event) => update("email", event.target.value)}
                    className="h-10 min-w-0 rounded-md border-border bg-white text-[0.82rem]"
                  />
                </label>

                <div
                  className="relative grid min-w-0 gap-2 text-[0.72rem] font-semibold text-primary"
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                      setCountryDropdownOpen(false)
                    }
                  }}
                >
                  <span>{t("form.country")}</span>

                  <Input
                    required
                    value={form.country}
                    onFocus={() => setCountryDropdownOpen(true)}
                    onChange={(event) => {
                      updateCountry(event.target.value)
                      setCountryDropdownOpen(true)
                    }}
                    placeholder={language === "es" ? "Buscar o seleccionar país" : "Search or select country"}
                    className="h-10 min-w-0 rounded-md border-border bg-white text-[0.82rem]"
                  />

                  {countryDropdownOpen ? (
                    <div className="absolute left-0 right-0 top-[calc(100%+0.45rem)] z-50 max-h-64 overflow-y-auto rounded-[0.85rem] border border-border/85 bg-white p-1 shadow-[0_18px_50px_-28px_rgba(7,52,92,.28)]">
                      {filteredCountryOptions.length > 0 ? (
                        filteredCountryOptions.map((option) => (
                          <button
                            key={option.country}
                            type="button"
                            onMouseDown={(event) => event.preventDefault()}
                            onClick={() => {
                              updateCountry(option.country)
                              setCountryDropdownOpen(false)
                            }}
                            className={`flex w-full min-w-0 items-center justify-between gap-3 rounded-[0.65rem] px-3 py-2 text-left text-[0.8rem] font-semibold transition ${
                              form.country === option.country
                                ? "bg-primary text-white"
                                : "text-primary hover:bg-[var(--surface-soft)]"
                            }`}
                          >
                            <span className="min-w-0 break-words">{option.country}</span>
                            {option.timeZones.length > 0 ? (
                              <span
                                className={`shrink-0 text-[0.66rem] font-medium ${
                                  form.country === option.country ? "text-white/75" : "text-muted-foreground"
                                }`}
                              >
                                {option.timeZones[0]}
                              </span>
                            ) : null}
                          </button>
                        ))
                      ) : (
                        <p className="px-3 py-2 text-[0.78rem] font-normal text-muted-foreground">
                          {language === "es" ? "No se encontraron países." : "No countries found."}
                        </p>
                      )}
                    </div>
                  ) : null}
                </div>

                <label className="grid min-w-0 gap-2 text-[0.72rem] font-semibold text-primary">
                  {language === "es" ? "Zona horaria" : "Time zone"}
                  <select
                    required
                    disabled={!form.country}
                    value={form.timeZone}
                    onChange={(event) => update("timeZone", event.target.value)}
                    className="h-10 min-w-0 rounded-md border border-border bg-white px-3 text-[0.82rem] text-primary outline-none disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <option value="">
                      {!form.country
                        ? language === "es"
                          ? "Primero seleccioná un país"
                          : "Select country first"
                        : language === "es"
                          ? "Seleccionar zona horaria"
                          : "Select time zone"}
                    </option>

                    {visibleTimeZones.map((timeZone) => (
                      <option key={timeZone} value={timeZone}>
                        {timeZone}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="grid min-w-0 gap-2 text-[0.72rem] font-semibold text-primary">
                  {t("form.phone")}
                  <Input
                    value={form.phone}
                    onChange={(event) => update("phone", event.target.value)}
                    className="h-10 min-w-0 rounded-md border-border bg-white text-[0.82rem]"
                  />
                </label>

                <p className="min-w-0 rounded-[0.85rem] bg-[var(--surface-soft)] p-3 text-[0.72rem] leading-[1.55] text-muted-foreground ring-1 ring-border/70 md:col-span-2">
                  {language === "es"
                    ? "Los días y horarios seleccionados se interpretan según la zona horaria del alumno y se enviarán también convertidos a la hora de Argentina."
                    : "Selected days and times are interpreted in the student's selected time zone and will also be sent converted to Argentina time."}
                </p>

                <p className="min-w-0 rounded-[0.85rem] bg-[var(--surface-soft)] p-3 text-[0.72rem] leading-[1.55] text-muted-foreground ring-1 ring-border/70 md:col-span-2">
                  {t("form.phoneNote")}
                </p>
              </section>

              {!isLive ? (
                <>
                  <section className="grid min-w-0 gap-4 md:grid-cols-2">
                    <div className="min-w-0 md:col-span-2">
                      <p className="fine-label">03</p>
                      <h3 className="mt-1 break-words font-serif text-[1.25rem] leading-[1.08] tracking-[-0.04em] text-primary sm:text-[1.35rem]">
                        {isEnglishLesson ? t("form.level.titleEnglish") : t("form.level.titleSpanish")}
                      </h3>
                    </div>

                    <label className="grid min-w-0 gap-2 text-[0.72rem] font-semibold text-primary">
                      {isEnglishLesson ? t("form.level.subtitleEnglish") : t("form.level.subtitleSpanish")}

                      <select
                        value={form.level}
                        onChange={(event) => update("level", event.target.value)}
                        className="h-10 min-w-0 rounded-md border border-border bg-white px-3 text-[0.82rem] text-primary outline-none"
                      >
                        {levels.map((level) => (
                          <option key={level}>{level}</option>
                        ))}
                      </select>
                    </label>

                    <label className="grid min-w-0 gap-2 text-[0.72rem] font-semibold text-primary">
                      {isEnglishLesson ? t("form.goal.subtitleEnglish") : t("form.goal.subtitleSpanish")}

                      <select
                        value={form.goal}
                        onChange={(event) => update("goal", event.target.value)}
                        className="h-10 min-w-0 rounded-md border border-border bg-white px-3 text-[0.82rem] text-primary outline-none"
                      >
                        {goals.map((goal) => (
                          <option key={goal}>{goal}</option>
                        ))}
                      </select>
                    </label>

                    <label className="grid min-w-0 gap-2 text-[0.72rem] font-semibold text-primary md:col-span-2">
                      {t("form.goal.specific")}
                      <Textarea
                        value={form.specificGoal}
                        onChange={(event) => update("specificGoal", event.target.value)}
                        placeholder={t("form.goal.placeholder")}
                        className="min-h-24 min-w-0 rounded-md border-border bg-white text-[0.82rem]"
                      />
                    </label>
                  </section>

                  <section className="grid min-w-0 gap-4 md:grid-cols-2">
                    <div className="min-w-0">
                      <p className="fine-label">04</p>
                      <h3 className="mt-1 break-words font-serif text-[1.25rem] leading-[1.08] tracking-[-0.04em] text-primary sm:text-[1.35rem]">
                        {t("form.days.title")}
                      </h3>
                      <p className="mt-2 text-[0.78rem] text-muted-foreground">
                        {t("form.days.subtitle")}
                      </p>

                      {selectedPlanData ? (
                        <p className="mt-2 text-[0.72rem] leading-[1.45] text-muted-foreground">
                          {language === "es"
                            ? `Podés seleccionar hasta ${selectedDayLimit} día${selectedDayLimit === 1 ? "" : "s"} para este paquete.`
                            : `You can select up to ${selectedDayLimit} day${selectedDayLimit === 1 ? "" : "s"} for this package.`}
                        </p>
                      ) : null}

                      <div className="mt-4 grid min-w-0 grid-cols-2 gap-2">
                        {days.map((day) => {
                          const isSelected = Object.prototype.hasOwnProperty.call(form.availabilityByDay, day.key)
                          const isDisabled = !isSelected && selectedDayCount >= selectedDayLimit

                          return (
                            <button
                              key={day.key}
                              type="button"
                              disabled={isDisabled}
                              onClick={() => toggleAvailabilityDay(day.key)}
                              className={`min-w-0 rounded-full border px-3 py-2 text-[0.74rem] font-semibold ${
                                isSelected
                                  ? "border-primary bg-primary text-white"
                                  : "border-border bg-white text-muted-foreground hover:text-primary"
                              } ${isDisabled ? "cursor-not-allowed opacity-45 hover:text-muted-foreground" : ""}`}
                            >
                              <span className="block truncate">{day.label}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div className="min-w-0">
                      <p className="fine-label">05</p>
                      <h3 className="mt-1 break-words font-serif text-[1.25rem] leading-[1.08] tracking-[-0.04em] text-primary sm:text-[1.35rem]">
                        {t("form.time.title")}
                      </h3>
                      <p className="mt-2 text-[0.78rem] text-muted-foreground">
                        {t("form.time.subtitle")}
                      </p>

                      <div className="mt-4 grid min-w-0 gap-2">
                        {selectedDayRows.length > 0 ? (
                          selectedDayRows.map((day) => (
                            <label key={day.key} className="grid min-w-0 gap-1.5 text-[0.72rem] font-semibold text-primary">
                              {day.label}
                              <select
                                value={form.availabilityByDay[day.key] || ""}
                                onChange={(event) => updateAvailabilityBlock(day.key, event.target.value)}
                                className="h-10 min-w-0 rounded-md border border-border bg-white px-3 text-[0.82rem] text-primary outline-none"
                              >
                                <option value="">
                                  {language === "es" ? "Seleccionar horario" : "Select time"}
                                </option>
                                {timeBlocks.map((block) => (
                                  <option key={`${day.key}-${block.key}`} value={block.key}>
                                    {block.label}
                                  </option>
                                ))}
                              </select>
                            </label>
                          ))
                        ) : (
                          <div className="grid min-w-0 gap-1.5">
                            <span className="select-none text-[0.72rem] font-semibold text-primary opacity-0">
                              {language === "es" ? "Día" : "Day"}
                            </span>

                            <p className="rounded-[0.85rem] bg-white p-3 text-[0.74rem] leading-[1.55] text-muted-foreground ring-1 ring-border/70">
                              {language === "es"
                                ? "Primero seleccioná uno o más días."
                                : "Select one or more days first."}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <label className="grid min-w-0 gap-2 text-[0.72rem] font-semibold text-primary md:col-span-2">
                      {t("form.time.exact")}
                      <Input
                        value={form.exactTime}
                        onChange={(event) => update("exactTime", event.target.value)}
                        placeholder={t("form.time.placeholder")}
                        className="h-10 min-w-0 rounded-md border-border bg-white text-[0.82rem]"
                      />
                      <span className="text-[0.7rem] font-normal leading-[1.45] text-muted-foreground">
                        {t("form.time.note")}
                      </span>
                    </label>

                    <label className="grid min-w-0 gap-2 text-[0.72rem] font-semibold text-primary md:col-span-2">
                      {language === "es" ? "Plataforma preferida" : "Preferred platform"}
                      <select
                        value={form.lessonPlatform}
                        onChange={(event) => update("lessonPlatform", event.target.value)}
                        className="h-10 min-w-0 rounded-md border border-border bg-white px-3 text-[0.82rem] text-primary outline-none"
                      >
                        {lessonPlatforms.map((platform) => (
                          <option key={platform} value={platform}>
                            {platform}
                          </option>
                        ))}
                      </select>
                    </label>
                  </section>
                </>
              ) : (
                <section className="grid min-w-0 gap-4 md:grid-cols-2">
                  <div className="min-w-0 md:col-span-2">
                    <p className="fine-label">03</p>
                    <h3 className="mt-1 break-words font-serif text-[1.25rem] leading-[1.08] tracking-[-0.04em] text-primary sm:text-[1.35rem]">
                      {t("form.liveDetails.title")}
                    </h3>
                    <p className="mt-2 text-[0.78rem] text-muted-foreground">
                      {t("form.liveDetails.subtitle")}
                    </p>
                  </div>

                  <label className="grid min-w-0 gap-2 text-[0.72rem] font-semibold text-primary">
                    {t("form.liveLanguage")}
                    <select
                      value={form.liveLanguage}
                      onChange={(event) => {
                        resetPaymentConfirmation()
                        update("liveLanguage", event.target.value)
                      }}
                      className="h-10 min-w-0 rounded-md border border-border bg-white px-3 text-[0.82rem] text-primary outline-none"
                    >
                      <option>{t("form.liveLanguage.spanish")}</option>
                      <option>{t("form.liveLanguage.english")}</option>
                    </select>
                  </label>

                  <label className="grid min-w-0 gap-2 text-[0.72rem] font-semibold text-primary">
                    {t("form.liveContext")}
                    <select
                      value={form.liveContext}
                      onChange={(event) => update("liveContext", event.target.value)}
                      className="h-10 min-w-0 rounded-md border border-border bg-white px-3 text-[0.82rem] text-primary outline-none"
                    >
                      {liveContexts.map((context) => (
                        <option key={context}>{context}</option>
                      ))}
                    </select>
                  </label>

                  <label className="grid min-w-0 gap-2 text-[0.72rem] font-semibold text-primary md:col-span-2">
                    {t("form.liveDetailsField")}
                    <Textarea
                      value={form.liveDetails}
                      onChange={(event) => update("liveDetails", event.target.value)}
                      placeholder={t("form.liveDetailsPlaceholder")}
                      className="min-h-24 min-w-0 rounded-md border-border bg-white text-[0.82rem]"
                    />
                  </label>

                  <div className="min-w-0 md:col-span-2">
                    <p className="fine-label">04</p>
                    <h3 className="mt-1 break-words font-serif text-[1.25rem] leading-[1.08] tracking-[-0.04em] text-primary sm:text-[1.35rem]">
                      {t("form.liveSchedule.title")}
                    </h3>
                    <p className="mt-2 text-[0.78rem] text-muted-foreground">
                      {t("form.liveSchedule.subtitle")}
                    </p>
                  </div>

                  <label className="grid min-w-0 gap-2 text-[0.72rem] font-semibold text-primary">
                    {t("form.liveDate")}
                    <Input
                      type="date"
                      value={form.liveDate}
                      onChange={(event) => update("liveDate", event.target.value)}
                      className="h-10 min-w-0 rounded-md border-border bg-white text-[0.82rem]"
                    />
                  </label>

                  <label className="grid min-w-0 gap-2 text-[0.72rem] font-semibold text-primary">
                    {t("form.liveTime")}
                    <Input
                      type="time"
                      value={form.liveTime}
                      onChange={(event) => update("liveTime", event.target.value)}
                      className="h-10 min-w-0 rounded-md border-border bg-white text-[0.82rem]"
                    />
                  </label>

                  <label className="grid min-w-0 gap-2 text-[0.72rem] font-semibold text-primary">
                    {t("form.liveFormat")}
                    <select
                      value={form.liveFormat}
                      onChange={(event) => update("liveFormat", event.target.value)}
                      className="h-10 min-w-0 rounded-md border border-border bg-white px-3 text-[0.82rem] text-primary outline-none"
                    >
                      <option>{t("form.liveFormat.call")}</option>
                      <option>{t("form.liveFormat.video")}</option>
                    </select>
                  </label>

                  <p className="min-w-0 rounded-[0.85rem] bg-[var(--surface-soft)] p-3 text-[0.72rem] leading-[1.55] text-muted-foreground ring-1 ring-border/70">
                    {paymentCopy.liveHelp}
                  </p>
                </section>
              )}

              {!isLive ? (
                <section className="min-w-0 rounded-[1rem] bg-[var(--surface-soft)] p-4 ring-1 ring-border/70 sm:p-5">
                  <p className="fine-label">06</p>

                  <h3 className="mt-1 break-words font-serif text-[1.25rem] leading-[1.08] tracking-[-0.04em] text-primary sm:text-[1.35rem]">
                    {paymentCopy.packageTitle}
                  </h3>

                  <p className="mt-2 text-[0.78rem] text-muted-foreground">
                    {paymentCopy.packageSubtitle}
                  </p>

                  <div className="mt-4 grid min-w-0 gap-3 md:grid-cols-2 xl:grid-cols-4">
                    {planOptions.map((plan) => {
                      const active = form.selectedPlan === plan.key

                      return (
                        <button
                          key={plan.key}
                          type="button"
                          onClick={() => selectPlan(plan.key)}
                          className={`min-w-0 rounded-[0.95rem] border p-4 text-left transition ${
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
                            {paymentCopy.packageLabel}
                          </p>

                          <p className="mt-2 break-words font-serif text-[1.1rem] leading-[1.05] tracking-[-0.035em]">
                            {plan.title}
                          </p>

                          <p className={`mt-1 text-[0.8rem] ${active ? "text-white/80" : "text-muted-foreground"}`}>
                            {plan.subtitle}
                          </p>

                          <p className={`mt-4 text-[0.9rem] font-semibold ${active ? "text-white" : "text-primary"}`}>
                            {formatPrice(plan.price, form.paymentCurrency)}
                          </p>
                        </button>
                      )
                    })}
                  </div>

                  {selectedPlanData ? (
                    <>
                      <div className="mt-5 grid min-w-0 gap-3 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
                        <div className="min-w-0 rounded-[0.85rem] bg-white p-4 ring-1 ring-border/70">
                          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-accent">
                            {paymentCopy.selectedProduct}
                          </p>

                          <p className="mt-2 max-w-full break-words font-serif text-[1.12rem] leading-[1.08] tracking-[-0.04em] text-primary sm:text-[1.25rem]">
                            {selectedPlanData.name}
                          </p>

                          <p className="mt-3 break-words text-[0.82rem] font-semibold text-muted-foreground">
                            {paymentCopy.price}: {formatPrice(selectedPlanData.price, form.paymentCurrency)}
                          </p>

                          <p className="mt-2 break-words text-[0.74rem] leading-[1.5] text-muted-foreground">
                            {paymentCopy.service}: {form.service}
                          </p>
                        </div>

                        <div className="grid min-w-0 gap-3 rounded-[0.85rem] bg-white p-4 ring-1 ring-border/70">
                          <label className="grid min-w-0 gap-2 text-[0.72rem] font-semibold text-primary">
                            {paymentCopy.paymentMethod}
                            <select
                              value={form.paymentMethod}
                              onChange={(event) => {
                                resetPaymentConfirmation()
                                update("paymentMethod", event.target.value)
                              }}
                              className="h-10 min-w-0 rounded-md border border-border bg-white px-3 text-[0.82rem] text-primary outline-none"
                            >
                              {paymentMethods.map((method) => (
                                <option key={method} value={method}>
                                  {method}
                                </option>
                              ))}
                            </select>
                          </label>

                          <label className="grid min-w-0 gap-2 text-[0.72rem] font-semibold text-primary">
                            {language === "es" ? "Moneda" : "Currency"}
                            <select
                              value={form.paymentCurrency}
                              onChange={(event) => {
                                resetPaymentConfirmation()
                                update("paymentCurrency", event.target.value as Currency)
                              }}
                              className="h-10 min-w-0 rounded-md border border-border bg-white px-3 text-[0.82rem] text-primary outline-none"
                            >
                              {paymentCurrencies.map((currency) => (
                                <option key={currency} value={currency}>
                                  {currency}
                                </option>
                              ))}
                            </select>
                          </label>
                        </div>
                      </div>

                      {paypalHostedButtonId && (
                        <div className="mt-5 min-w-0 rounded-[0.85rem] bg-white p-4 ring-1 ring-border/70">
                          <p className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-accent">
                            {paymentCopy.securePayment}
                          </p>

                          <PayPalPaymentButton
                            hostedButtonId={paypalHostedButtonId}
                            label={paymentCopy.paymentButton}
                            onPaymentLinkOpen={() => setPaymentLinkOpened(true)}
                          />

                          <p className="mt-3 text-[0.72rem] leading-[1.55] text-muted-foreground">
                            {paymentCopy.paymentNote}
                          </p>

                          <label
                            className={`mt-4 flex min-w-0 gap-3 rounded-[0.85rem] bg-[var(--surface-soft)] p-4 text-[0.78rem] font-semibold leading-[1.5] text-primary ring-1 ring-border/70 ${
                              !paymentLinkOpened ? "opacity-55" : ""
                            }`}
                          >
                            <input
                              type="checkbox"
                              disabled={!paymentLinkOpened}
                              checked={paymentConfirmed}
                              onChange={(event) => setPaymentConfirmed(event.target.checked)}
                              className="mt-1 h-4 w-4 shrink-0 accent-primary disabled:cursor-not-allowed disabled:opacity-45"
                            />
                            <span className="min-w-0 break-words">{paymentCopy.paymentConfirmation}</span>
                          </label>

                          {!paymentLinkOpened ? (
                            <p className="mt-2 text-[0.7rem] leading-[1.45] text-muted-foreground">
                              {paymentCopy.paymentLinkFirst}
                            </p>
                          ) : null}
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="mt-5 rounded-[0.85rem] bg-white p-4 text-[0.76rem] leading-[1.55] text-muted-foreground ring-1 ring-border/70">
                      {paymentCopy.selectPackage}
                    </p>
                  )}
                </section>
              ) : (
                paymentSummary && (
                  <section className="min-w-0 rounded-[1rem] bg-[var(--surface-soft)] p-4 ring-1 ring-border/70 sm:p-5">
                    <p className="fine-label">05</p>

                    <h3 className="mt-1 break-words font-serif text-[1.25rem] leading-[1.08] tracking-[-0.04em] text-primary sm:text-[1.35rem]">
                      {paymentCopy.selectedServiceTitle}
                    </h3>

                    <div className="mt-4 grid min-w-0 gap-3 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
                      <div className="min-w-0 rounded-[0.85rem] bg-white p-4 ring-1 ring-border/70">
                        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-accent">
                          {paymentCopy.selectedProduct}
                        </p>

                        <p className="mt-2 max-w-full break-words font-serif text-[1.12rem] leading-[1.08] tracking-[-0.04em] text-primary sm:text-[1.25rem]">
                          {paymentSummary.name}
                        </p>

                        <p className="mt-3 break-words text-[0.82rem] font-semibold text-muted-foreground">
                          {paymentCopy.price}: {formatPrice(paymentSummary.price, form.paymentCurrency)}
                        </p>
                      </div>

                      <div className="grid min-w-0 gap-3 rounded-[0.85rem] bg-white p-4 ring-1 ring-border/70">
                        <label className="grid min-w-0 gap-2 text-[0.72rem] font-semibold text-primary">
                          {paymentCopy.paymentMethod}
                          <select
                            value={form.paymentMethod}
                            onChange={(event) => {
                              resetPaymentConfirmation()
                              update("paymentMethod", event.target.value)
                            }}
                            className="h-10 min-w-0 rounded-md border border-border bg-white px-3 text-[0.82rem] text-primary outline-none"
                          >
                            {paymentMethods.map((method) => (
                              <option key={method} value={method}>
                                {method}
                              </option>
                            ))}
                          </select>
                        </label>

                        <label className="grid min-w-0 gap-2 text-[0.72rem] font-semibold text-primary">
                          {language === "es" ? "Moneda" : "Currency"}
                          <select
                            value={form.paymentCurrency}
                            onChange={(event) => {
                              resetPaymentConfirmation()
                              update("paymentCurrency", event.target.value as Currency)
                            }}
                            className="h-10 min-w-0 rounded-md border border-border bg-white px-3 text-[0.82rem] text-primary outline-none"
                          >
                            {paymentCurrencies.map((currency) => (
                              <option key={currency} value={currency}>
                                {currency}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>
                    </div>

                    {paypalHostedButtonId && (
                      <div className="mt-5 min-w-0 rounded-[0.85rem] bg-white p-4 ring-1 ring-border/70">
                        <p className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-accent">
                          {paymentCopy.securePayment}
                        </p>

                        <PayPalPaymentButton
                          hostedButtonId={paypalHostedButtonId}
                          label={paymentCopy.paymentButton}
                          onPaymentLinkOpen={() => setPaymentLinkOpened(true)}
                        />

                        <p className="mt-3 text-[0.72rem] leading-[1.55] text-muted-foreground">
                          {paymentCopy.paymentNote}
                        </p>

                        <label
                          className={`mt-4 flex min-w-0 gap-3 rounded-[0.85rem] bg-[var(--surface-soft)] p-4 text-[0.78rem] font-semibold leading-[1.5] text-primary ring-1 ring-border/70 ${
                            !paymentLinkOpened ? "opacity-55" : ""
                          }`}
                        >
                          <input
                            type="checkbox"
                            disabled={!paymentLinkOpened}
                            checked={paymentConfirmed}
                            onChange={(event) => setPaymentConfirmed(event.target.checked)}
                            className="mt-1 h-4 w-4 shrink-0 accent-primary disabled:cursor-not-allowed disabled:opacity-45"
                          />
                          <span className="min-w-0 break-words">{paymentCopy.paymentConfirmation}</span>
                        </label>

                        {!paymentLinkOpened ? (
                          <p className="mt-2 text-[0.7rem] leading-[1.45] text-muted-foreground">
                            {paymentCopy.paymentLinkFirst}
                          </p>
                        ) : null}
                      </div>
                    )}
                  </section>
                )
              )}

              <section className="grid min-w-0 gap-4">
                <div className="min-w-0">
                  <p className="fine-label">{isLive ? "06" : "07"}</p>

                  <h3 className="mt-1 break-words font-serif text-[1.25rem] leading-[1.08] tracking-[-0.04em] text-primary sm:text-[1.35rem]">
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
                  className="min-h-24 min-w-0 rounded-md border-border bg-white text-[0.82rem]"
                />
              </section>

              <Button
                type="submit"
                disabled={!canSubmit}
                className={`interactive-button h-11 w-full rounded-full bg-primary px-6 text-[0.84rem] font-semibold text-white hover:bg-primary/92 sm:w-fit sm:px-7 ${
                  !canSubmit ? "cursor-not-allowed opacity-45 hover:bg-primary" : ""
                }`}
              >
                <Mail className="mr-2 h-4 w-4" />
                {t("form.submit")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              {!paymentConfirmed ? (
                <p className="text-[0.72rem] leading-[1.5] text-muted-foreground">
                  {language === "es"
                    ? "Para enviar la solicitud, primero completá el pago y marcá la confirmación."
                    : "To send the request, complete the payment first and check the confirmation box."}
                </p>
              ) : null}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}