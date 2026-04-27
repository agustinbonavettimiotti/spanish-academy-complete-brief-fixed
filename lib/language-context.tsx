"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

type Language = "en" | "es"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    "nav.home": "Home",
    "nav.programs": "Programs",
    "nav.live": "Other Services",
    "nav.pricing": "Plans",
    "nav.teachers": "Teachers",
    "nav.testimonials": "Student Outcomes",
    "nav.faq": "FAQ",
    "nav.contact": "Contact",
    "nav.cta": "Book a free trial lesson",
    "nav.language": "Language",

    "hero.eyebrow": "Spanish Academy",
    "hero.trust": "Native teachers focused on real communication and measurable progress.",
    "hero.headline": "Learn Spanish for what you truly need",
    "hero.subheadline": "Personalized lessons with native teachers",
    "hero.subheadline2": "Tailored to your level, goals, and availability.",
    "hero.supporting":
      "Whether for travel, work, exams, or real communication, every lesson is designed to help you make real progress from day one.",
    "hero.ctaPrimary": "Book a free trial lesson",
    "hero.ctaSecondary": "Our services",
    "hero.panelEyebrow": "Personalized language training",
    "hero.panelTitle": "without standard programs",
    "hero.path1": "Travel and everyday situations",
    "hero.path2": "Professional and corporate environments",
    "hero.path3": "International exams (SIELE, DELE, CELE, Cambridge)",
    "hero.freeLabel": "Free trial",
    "hero.free": "The first lesson is completely free",
    "hero.onlineLabel": "Format",
    "hero.online": "100% online · Google Meet or Zoom",

    "programs.label": "Our services",
    "programs.title": "Personalized language training, without standard programs",
    "programs.body":
      "At Spanish Academy, every program is designed in a fully personalized way, based on the student, their goals, and their real-world context.",
    "programs.primaryTitle": "Spanish and English programs",
    "programs.primaryBody":
      "Online lessons with native teachers focused on real communication and measurable progress.",
    "programs.spanish": "Spanish as a foreign language",
    "programs.english": "English for global communication",
    "programs.mode": "One-to-one or group lessons",
    "programs.levels": "All levels",
    "programs.goalsTitle": "Goal-based language learning",
    "programs.goalsBody": "Each program is adapted to real-life language use:",
    "programs.goal1": "Travel and everyday situations",
    "programs.goal2": "Professional and corporate environments",
    "programs.goal3": "International exams (SIELE, DELE, CELE, Cambridge)",
    "programs.specializedTitle": "Advanced language training by professional field",
    "programs.specializedBody": "Programs designed for specific industries:",
    "programs.specialized1": "IT and technology",
    "programs.specialized2": "Medicine and healthcare",
    "programs.specialized3": "Legal and law",
    "programs.specialized4": "Business, finance and international trade",
    "programs.premiumTitle": "Specialized language solutions",
    "programs.premiumBody": "Tailored services for advanced needs:",
    "programs.premium1": "Academic and professional text correction",
    "programs.premium2": "One-to-one language coaching",
    "programs.premium3": "Programs for embassies and institutions",
    "programs.closingTitle": "A different approach to language learning",
    "programs.closing1": "Every student is unique.",
    "programs.closing2": "Every goal requires a different path.",
    "programs.closing3": "At Spanish Academy, we design that path with you.",

    "live.label": "Other services",
    "live.title": "Live Spanish Assistant",
    "live.body":
      "Get real-time help communicating in Spanish wherever you are. Whether you need support with daily tasks, appointments, paperwork, or speaking with locals, our assistants are here to help you navigate it all with confidence.",
    "live.spanishTitle": "Live Spanish Assistant",
    "live.spanishBody":
      "Get real-time help communicating in Spanish wherever you are. Whether you need support with daily tasks, appointments, paperwork, or speaking with locals, our assistants are here to help you navigate it all with confidence.",
    "live.spanishNote":
      "Our assistants are fully bilingual and have C2-level English proficiency, ensuring clear communication and accurate interpretation at all times.",
    "live.englishTitle": "Live English Assistant",
    "live.englishBody":
      "Get real-time help communicating in English wherever you are. Whether you need support with daily tasks, medical appointments, paperwork, or speaking with other people, our assistants are here to help you handle everything with confidence.",
    "live.englishNote":
      "Our assistants are fully bilingual and have C2-level English proficiency, ensuring clear communication and accurate interpretation at all times.",
    "live.price": "25 USD / EUR per hour",
    "live.minimum": "Minimum booking: 1 hour (60 minutes, not divided)",
    "live.advance":
      "Please indicate the day and time you need the service, with at least 2 hours’ notice.",
    "live.cta": "Contact Spanish Academy",

    "how.label": "100% online",
    "how.title": "Google Meet or Zoom",
    "how.step1.title": "Complete the Student Intake Form",
    "how.step1.body":
      "The Spanish Academy team receives the completed forms through the platform.",
    "how.step2.title": "Profile review",
    "how.step2.body":
      "The team reviews level, goals, country of residence, time zone, and availability.",
    "how.step3.title": "Teacher assignment",
    "how.step3.body":
      "The most suitable teacher is assigned according to the student or client profile.",
    "how.step4.title": "Free first lesson",
    "how.step4.body": "The first lesson is completely free.",
    "how.note":
      "Classes are fully online and take place via Google Meet or Zoom, according to the student’s preference.",

    "pricing.label": "Plans & Rates",
    "pricing.title": "The first lesson is completely free",
    "pricing.body":
      "Classes can be booked individually, in packages, or as a monthly plan.",
    "pricing.free": "The first lesson is completely free",
    "pricing.duration": "All lessons last 60 minutes",
    "pricing.lessons": "Lessons",
    "pricing.single": "Single lesson",
    "pricing.pack4": "4-lesson package",
    "pricing.pack10": "10-lesson package",
    "pricing.monthly": "Monthly plan",
    "pricing.monthlyNote": "2 lessons per week, 8 lessons total",
    "pricing.best": "Best rate",
    "pricing.perLesson": "per lesson",
    "pricing.liveTitle": "Live Spanish Assistant / Live English Assistant",
    "pricing.liveNote1": "Minimum booking: 1 hour (60 minutes, not divided)",
    "pricing.liveNote2": "25 USD / EUR per hour",
    "pricing.liveNote3":
      "Please indicate the day and time required, with at least 2 hours’ notice",

    "teachers.label": "Teaching staff",
    "teachers.title": "Selected members of the teaching staff",
    "teachers.body":
      "Some members of the teaching staff will be shown here. Final photos, names, and complete profiles will be added as the client provides them.",
    "teachers.country": "Country of origin",
    "teachers.native": "Native language",
    "teachers.other": "Other languages",
    "teachers.placeholder": "Profile and photo coming soon",
    "teachers.slot1": "Teaching staff member",
    "teachers.slot2": "Teaching staff member",
    "teachers.slot3": "Teaching staff member",
    "teachers.otherPending": "To be confirmed",

    "testimonials.label": "Student Outcomes",
    "testimonials.title": "A space for verified progress, not generic reviews",
    "testimonials.body": "Verified testimonials and outcomes can be added here once the client provides real material.",
    "testimonials.card1": "Verified student outcome",
    "testimonials.card2": "Verified client outcome",
    "testimonials.card3": "Verified testimonial",

    "faq.label": "FAQ",
    "faq.title": "Frequently asked questions",
    "faq.q1": "Are lessons fully online?",
    "faq.a1": "Yes. Classes are 100% online.",
    "faq.q2": "Is the first lesson free?",
    "faq.a2": "Yes. The first lesson is completely free.",
    "faq.q3": "Do you offer one-to-one and group lessons?",
    "faq.a3": "Yes. Both formats are available.",
    "faq.q4": "Do you prepare students for international exams?",
    "faq.a4": "Yes. Programs can be adapted to SIELE, DELE, CELE, and Cambridge.",
    "faq.q5": "Do you also offer English lessons?",
    "faq.a5": "Yes. English lessons are also available.",
    "faq.q6": "How does live assistance work?",
    "faq.a6":
      "It is charged by the hour and must be requested with at least 2 hours’ notice.",
    "faq.q7": "How are teachers assigned?",
    "faq.a7":
      "According to level, goals, country of residence, time zone, and availability.",
    "faq.q8": "What platforms do you use?",
    "faq.a8": "Google Meet and Zoom.",
    "faq.q9": "How long is each lesson?",
    "faq.a9": "Each lesson lasts 60 minutes.",

    "form.label": "Student Intake Form",
    "form.title": "Start your Spanish lessons",
    "form.subtitle":
      "Fill out this short form and we’ll assign you the most suitable teacher based on your level, goals, and availability.",
    "form.progress": "Step",
    "form.of": "of",
    "form.back": "Back",
    "form.next": "Next",
    "form.submit": "Send request",
    "form.mailHint":
      "Your request will be prepared for email delivery to the academy inbox.",

    "form.service.title": "Choose a service",
    "form.service.spanish": "Spanish lessons",
    "form.service.english": "English lessons",
    "form.service.live": "Live assistance",
    "form.service.note":
      "Choose the service you are interested in so the team can route your request correctly.",

    "form.personal.title": "Personal information",
    "form.personal.subtitle": "Tell us about yourself",
    "form.fullName": "Full name",
    "form.email": "Email",
    "form.country": "Country of residence",
    "form.phone": "Phone number (optional)",
    "form.phoneNote":
      "Your phone number will be treated as confidential information and will be used exclusively for class coordination and service-related communications, only if provided as a contact method.",

    "form.level.titleSpanish": "Spanish level",
    "form.level.titleEnglish": "English level",
    "form.level.subtitleSpanish": "What is your current Spanish level?",
    "form.level.subtitleEnglish": "What is your current English level?",
    "form.level.a1": "A1 – Absolute Beginner",
    "form.level.a2": "A2 – Elementary",
    "form.level.b1": "B1 – Intermediate",
    "form.level.b2": "B2 – Upper Intermediate",
    "form.level.c1": "C1 – Advanced",
    "form.level.c2": "C2 – Proficient",

    "form.goal.title": "Learning goal",
    "form.goal.subtitleSpanish": "Why do you want to learn Spanish?",
    "form.goal.subtitleEnglish": "Why do you want to learn English?",
    "form.goal.personal": "Personal interest / culture",
    "form.goal.travel": "Travel",
    "form.goal.work": "Work / business",
    "form.goal.exams": "Exams",
    "form.goal.academic": "Academic studies",
    "form.goal.specific": "If your goal is more specific, please tell us here:",
    "form.goal.placeholder":
      "e.g. Language proficiency exams (DIELE, SIELE, Cambridge, etc.), job interviews, relocation, medical Spanish, etc.",

    "form.days.title": "Availability (days)",
    "form.days.subtitle": "Which days are you available for classes?",
    "form.day.monday": "Monday",
    "form.day.tuesday": "Tuesday",
    "form.day.wednesday": "Wednesday",
    "form.day.thursday": "Thursday",
    "form.day.friday": "Friday",
    "form.day.saturday": "Saturday",
    "form.day.sunday": "Sunday",

    "form.time.title": "Availability (time)",
    "form.time.subtitle": "What time are you available?",
    "form.time.morning": "Morning (06:00 – 12:00)",
    "form.time.afternoon": "Afternoon (12:00 – 18:00)",
    "form.time.evening": "Evening (18:00 – 23:00)",
    "form.time.flexible": "Flexible",
    "form.time.exact": "If you prefer, you can also specify exact times (optional):",
    "form.time.placeholder": "e.g. Mondays and Wednesdays from 19:00 to 20:30",
    "form.time.note": "This helps us better match you with the right teacher.",

    "form.liveDetails.title": "Live assistance details",
    "form.liveDetails.subtitle": "Tell us what kind of support you need",
    "form.liveLanguage": "Support language",
    "form.liveLanguage.spanish": "Spanish",
    "form.liveLanguage.english": "English",
    "form.liveContext": "Type of situation",
    "form.liveContext.daily": "Daily tasks",
    "form.liveContext.appointments": "Appointments",
    "form.liveContext.paperwork": "Paperwork / administrative matters",
    "form.liveContext.medical": "Medical situation",
    "form.liveContext.other": "Other",
    "form.liveDetailsField": "Situation details",
    "form.liveDetailsPlaceholder": "Briefly describe the situation, context, and what you need help with.",

    "form.liveSchedule.title": "Scheduling",
    "form.liveSchedule.subtitle": "Choose your preferred date and time",
    "form.liveDate": "Requested date",
    "form.liveTime": "Requested time",
    "form.liveFormat": "Preferred format",
    "form.liveFormat.call": "Phone call",
    "form.liveFormat.video": "Video call",
    "form.liveAdvance": "This service must be requested at least 2 hours in advance.",

    "form.message.title": "Optional message",
    "form.message.subtitle": "Anything else we should know?",
    "form.message.placeholder": "Add any relevant detail here.",

    "form.confirmation.title": "Thank you for completing the form!",
    "form.confirmation.body":
      "We’ve received your information and our team is currently reviewing your profile to assign you the most suitable teacher based on your level, goals, and availability.",
    "form.confirmation.note":
      "You will soon be contacted directly by one of our teachers or the Spanish Academy team via your preferred contact method (email or WhatsApp) to coordinate the start of your lessons.",
    "form.confirmation.email": "Open email again",

    "footer.brand": "Personalized language training, without standard programs.",
    "footer.navigation": "Navigation",
    "footer.language": "Language",
    "footer.contact": "Contact",
    "footer.email": "spanishacademy100@gmail.com",
    "footer.whatsapp": "WhatsApp contact will be added soon.",
    "footer.rights": "All rights reserved.",
  },

  es: {
    "nav.home": "Inicio",
    "nav.programs": "Programas",
    "nav.live": "Otros servicios",
    "nav.pricing": "Planes",
    "nav.teachers": "Profesores",
    "nav.testimonials": "Resultados",
    "nav.faq": "FAQ",
    "nav.contact": "Contacto",
    "nav.cta": "Reservar clase gratis",
    "nav.language": "Idioma",

    "hero.eyebrow": "Spanish Academy",
    "hero.trust": "Profesores nativos enfocados en comunicación real y progreso medible.",
    "hero.headline": "Aprendé español para lo que realmente necesitás",
    "hero.subheadline": "Clases personalizadas con profesores nativos",
    "hero.subheadline2": "Adaptadas a tu nivel, objetivos y disponibilidad.",
    "hero.supporting":
      "Viajes, trabajo, exámenes o comunicación real: diseñamos cada clase para que avances de forma concreta desde el primer día.",
    "hero.ctaPrimary": "Reservar clase gratis",
    "hero.ctaSecondary": "Nuestros servicios",
    "hero.panelEyebrow": "Formación lingüística personalizada",
    "hero.panelTitle": "sin programas estándar",
    "hero.path1": "Viajes y vida cotidiana",
    "hero.path2": "Entornos profesionales y corporativos",
    "hero.path3": "Exámenes internacionales (SIELE, DELE, CELE, Cambridge)",
    "hero.freeLabel": "Clase inicial",
    "hero.free": "La primera clase es completamente gratuita",
    "hero.onlineLabel": "Formato",
    "hero.online": "100% virtuales · Meet o Zoom",

    "programs.label": "Nuestros servicios",
    "programs.title": "Formación lingüística personalizada, sin programas estándar",
    "programs.body":
      "En Spanish Academy, diseñamos cada programa de forma personalizada, adaptándolo al alumno, su objetivo y su contexto real.",
    "programs.primaryTitle": "Programas de español e inglés",
    "programs.primaryBody":
      "Clases online con profesores nativos enfocadas en comunicación real y progreso medible.",
    "programs.spanish": "Español como lengua extranjera",
    "programs.english": "Inglés para comunicación global",
    "programs.mode": "Modalidad individual o grupal",
    "programs.levels": "Todos los niveles",
    "programs.goalsTitle": "Aprendizaje basado en objetivos reales",
    "programs.goalsBody": "Cada programa se adapta al uso específico del idioma:",
    "programs.goal1": "Viajes y vida cotidiana",
    "programs.goal2": "Entornos profesionales y corporativos",
    "programs.goal3": "Exámenes internacionales (SIELE, DELE, CELE, Cambridge)",
    "programs.specializedTitle": "Formación lingüística avanzada por área profesional",
    "programs.specializedBody": "Programas diseñados para contextos específicos:",
    "programs.specialized1": "Tecnología e IT",
    "programs.specialized2": "Medicina y ciencias de la salud",
    "programs.specialized3": "Derecho y entornos legales",
    "programs.specialized4": "Negocios, finanzas y comercio internacional",
    "programs.premiumTitle": "Soluciones lingüísticas especializadas",
    "programs.premiumBody": "Servicios personalizados para necesidades avanzadas:",
    "programs.premium1": "Corrección de textos académicos y profesionales",
    "programs.premium2": "Coaching lingüístico individual (one-to-one)",
    "programs.premium3": "Programas para embajadas e instituciones",
    "programs.closingTitle": "Un enfoque diferente del aprendizaje de idiomas",
    "programs.closing1": "Cada estudiante es único.",
    "programs.closing2": "Cada objetivo requiere un camino diferente.",
    "programs.closing3": "En Spanish Academy, diseñamos ese camino contigo.",

    "live.label": "Otros servicios",
    "live.title": "Live Spanish Assistant",
    "live.body":
      "Get real-time help communicating in Spanish wherever you are. Whether you need support with daily tasks, appointments, paperwork, or speaking with locals, our assistants are here to help you navigate it all with confidence.",
    "live.spanishTitle": "Live Spanish Assistant",
    "live.spanishBody":
      "Get real-time help communicating in Spanish wherever you are. Whether you need support with daily tasks, appointments, paperwork, or speaking with locals, our assistants are here to help you navigate it all with confidence.",
    "live.spanishNote":
      "Our assistants are fully bilingual and have C2-level English proficiency, ensuring clear communication and accurate interpretation at all times.",
    "live.englishTitle": "Asistente de inglés en vivo",
    "live.englishBody":
      "Recibí ayuda en tiempo real para comunicarte en inglés estés donde estés. Ya sea que necesites apoyo con tareas cotidianas, citas médicas, trámites o para hablar con otras personas, nuestros asistentes están aquí para ayudarte a resolverlo todo con confianza.",
    "live.englishNote":
      "Nuestros asistentes son completamente bilingües y cuentan con nivel C2 de inglés, lo que garantiza una comunicación clara e interpretación precisa en todo momento.",
    "live.price": "25 USD / EUR la hora",
    "live.minimum":
      "El mínimo para contratar el servicio es abonar por una hora (60 minutos, no se fracciona)",
    "live.advance":
      "Deberían poder programar ese encuentro indicando día y horario con un mínimo de 2 horas de anticipación.",
    "live.cta": "Contactar a Spanish Academy",

    "how.label": "100% virtuales",
    "how.title": "Meet y Zoom",
    "how.step1.title": "Completá el Formulario de Ingreso",
    "how.step1.body":
      "El equipo de Spanish Academy recepta los formularios completados en la plataforma.",
    "how.step2.title": "Revisión de perfil",
    "how.step2.body":
      "El equipo revisa nivel, objetivos, país de residencia, uso horario y disponibilidad.",
    "how.step3.title": "Asignación de profesor",
    "how.step3.body":
      "Se designa el profesor elegido para cada alumno o cliente en virtud de su perfil.",
    "how.step4.title": "Primera clase gratis",
    "how.step4.body": "La primera clase es completamente gratuita.",
    "how.note":
      "Las clases son 100% virtuales y se dictan por Meet y Zoom, según prefiera el alumno o cliente.",

    "pricing.label": "Planes y tarifas",
    "pricing.title": "La primera clase es completamente gratuita",
    "pricing.body":
      "Se pueden contratar clases sueltas, paquetes y también planes mensuales.",
    "pricing.free": "La primera clase es completamente gratuita",
    "pricing.duration": "Todas las clases duran 1 hora (60 minutos)",
    "pricing.lessons": "Clases",
    "pricing.single": "Clase individual",
    "pricing.pack4": "Paquete de 4 clases",
    "pricing.pack10": "Paquete de 10 clases",
    "pricing.monthly": "Plan mensual",
    "pricing.monthlyNote": "2 clases por semana, 8 clases totales",
    "pricing.best": "Mejor tarifa",
    "pricing.perLesson": "por clase",
    "pricing.liveTitle": "Live Spanish Assistant / Asistente de inglés en vivo",
    "pricing.liveNote1": "Tiene un valor de 25 USD / EUR la hora",
    "pricing.liveNote2":
      "El mínimo para contratar el servicio es abonar por una hora (60 minutos, no se fracciona)",
    "pricing.liveNote3": "Día y horario con un mínimo de 2 horas de anticipación",

    "teachers.label": "Staff docente",
    "teachers.title": "Miembros del staff docente",
    "teachers.body":
      "Vamos a mostrar algunos miembros del staff docente. Los perfiles finales se completarán cuando el cliente envíe fotos, nombres y datos.",
    "teachers.country": "País de origen",
    "teachers.native": "Idioma nativo",
    "teachers.other": "Otros idiomas",
    "teachers.placeholder": "Perfil y foto próximamente",
    "teachers.slot1": "Miembro del staff docente",
    "teachers.slot2": "Miembro del staff docente",
    "teachers.slot3": "Miembro del staff docente",
    "teachers.otherPending": "A confirmar",

    "testimonials.label": "Student Outcomes",
    "testimonials.title": "Un espacio para progreso verificado, no reseñas genéricas",
    "testimonials.body": "Los testimonios y resultados verificados pueden agregarse aquí cuando el cliente entregue material real.",
    "testimonials.card1": "Resultado verificado",
    "testimonials.card2": "Resultado de cliente verificado",
    "testimonials.card3": "Testimonio verificado",

    "faq.label": "FAQ",
    "faq.title": "Preguntas frecuentes",
    "faq.q1": "¿Las clases son completamente virtuales?",
    "faq.a1": "Sí. Las clases son 100% virtuales.",
    "faq.q2": "¿La primera clase es gratuita?",
    "faq.a2": "Sí. La primera clase es completamente gratuita.",
    "faq.q3": "¿Ofrecen modalidad individual y grupal?",
    "faq.a3": "Sí. Están disponibles ambos formatos.",
    "faq.q4": "¿Preparan para exámenes internacionales?",
    "faq.a4": "Sí. Los programas pueden adaptarse a SIELE, DELE, CELE y Cambridge.",
    "faq.q5": "¿También ofrecen clases de inglés?",
    "faq.a5": "Sí. También existe la opción de clases de inglés.",
    "faq.q6": "¿Cómo funciona la asistencia en vivo?",
    "faq.a6":
      "Se cobra por hora y debe solicitarse con al menos 2 horas de anticipación.",
    "faq.q7": "¿Cómo se asignan los profesores?",
    "faq.a7":
      "Según nivel, objetivos, país de residencia, uso horario y disponibilidad.",
    "faq.q8": "¿Qué plataformas usan?",
    "faq.a8": "Meet y Zoom.",
    "faq.q9": "¿Cuánto dura cada clase?",
    "faq.a9": "Cada clase dura 1 hora (60 minutos).",

    "form.label": "Formulario de Ingreso de Alumnos",
    "form.title": "Empezá tus clases de español",
    "form.subtitle":
      "Completá este breve formulario y te asignaremos el profesor ideal según tu nivel, objetivos y disponibilidad.",
    "form.progress": "Paso",
    "form.of": "de",
    "form.back": "Volver",
    "form.next": "Siguiente",
    "form.submit": "Enviar solicitud",
    "form.mailHint":
      "Tu solicitud se preparará para enviarse por email a la casilla de la academia.",

    "form.service.title": "Elegí un servicio",
    "form.service.spanish": "Clases de español",
    "form.service.english": "Clases de inglés",
    "form.service.live": "Asistencia en vivo",
    "form.service.note":
      "Elegí el servicio que te interesa para que el equipo pueda derivar correctamente tu solicitud.",

    "form.personal.title": "Datos personales",
    "form.personal.subtitle": "Contanos sobre vos",
    "form.fullName": "Nombre y apellido",
    "form.email": "Email",
    "form.country": "País de residencia",
    "form.phone": "Número de teléfono (opcional)",
    "form.phoneNote":
      "El número de teléfono será tratado como información confidencial y se utilizará exclusivamente para la coordinación de clases y comunicaciones relacionadas con el servicio, únicamente si lo proporcionaste como medio de contacto.",

    "form.level.titleSpanish": "Nivel de español",
    "form.level.titleEnglish": "Nivel de inglés",
    "form.level.subtitleSpanish": "¿Cuál es tu nivel de español?",
    "form.level.subtitleEnglish": "¿Cuál es tu nivel de inglés?",
    "form.level.a1": "A1 – Principiante absoluto",
    "form.level.a2": "A2 – Elemental",
    "form.level.b1": "B1 – Intermedio",
    "form.level.b2": "B2 – Intermedio alto",
    "form.level.c1": "C1 – Avanzado",
    "form.level.c2": "C2 – Dominio completo",

    "form.goal.title": "Objetivo de aprendizaje",
    "form.goal.subtitleSpanish": "¿Para qué querés aprender español?",
    "form.goal.subtitleEnglish": "¿Para qué querés aprender inglés?",
    "form.goal.personal": "Interés personal / cultura",
    "form.goal.travel": "Viajar",
    "form.goal.work": "Trabajo / negocios",
    "form.goal.exams": "Exámenes",
    "form.goal.academic": "Estudio académico",
    "form.goal.specific": "Si tu objetivo es más específico, contanos acá:",
    "form.goal.placeholder":
      "ej: Exámenes de competencia lingüística (DIELE, SIELE, Cambridge, etc.), entrevistas laborales, mudanza, español médico, etc.",

    "form.days.title": "Disponibilidad (días)",
    "form.days.subtitle": "¿Qué días podés tomar clases?",
    "form.day.monday": "Lunes",
    "form.day.tuesday": "Martes",
    "form.day.wednesday": "Miércoles",
    "form.day.thursday": "Jueves",
    "form.day.friday": "Viernes",
    "form.day.saturday": "Sábado",
    "form.day.sunday": "Domingo",

    "form.time.title": "Disponibilidad (horario)",
    "form.time.subtitle": "¿En qué horario estás disponible?",
    "form.time.morning": "Mañana (06:00 – 12:00)",
    "form.time.afternoon": "Tarde (12:00 – 18:00)",
    "form.time.evening": "Noche (18:00 – 23:00)",
    "form.time.flexible": "Flexible",
    "form.time.exact": "Si lo preferís, también podés indicar horarios específicos (opcional):",
    "form.time.placeholder": "ej: Lunes y miércoles de 19:00 a 20:30",
    "form.time.note":
      "Esto nos ayuda a asignarte un profesor más adecuado a tu disponibilidad.",

    "form.liveDetails.title": "Detalles de la asistencia en vivo",
    "form.liveDetails.subtitle": "Contanos qué tipo de apoyo necesitás",
    "form.liveLanguage": "Idioma de asistencia",
    "form.liveLanguage.spanish": "Español",
    "form.liveLanguage.english": "Inglés",
    "form.liveContext": "Tipo de situación",
    "form.liveContext.daily": "Tareas cotidianas",
    "form.liveContext.appointments": "Citas",
    "form.liveContext.paperwork": "Trámites / temas administrativos",
    "form.liveContext.medical": "Situación médica",
    "form.liveContext.other": "Otra",
    "form.liveDetailsField": "Detalles de la situación",
    "form.liveDetailsPlaceholder": "Describí brevemente la situación, el contexto y qué necesitás resolver.",

    "form.liveSchedule.title": "Agendado",
    "form.liveSchedule.subtitle": "Elegí la fecha y el horario preferidos",
    "form.liveDate": "Fecha solicitada",
    "form.liveTime": "Hora solicitada",
    "form.liveFormat": "Formato preferido",
    "form.liveFormat.call": "Llamada",
    "form.liveFormat.video": "Videollamada",
    "form.liveAdvance": "Este servicio debe solicitarse con al menos 2 horas de anticipación.",

    "form.message.title": "Mensaje opcional",
    "form.message.subtitle": "¿Hay algo más que debamos saber?",
    "form.message.placeholder": "Agregá acá cualquier dato relevante.",

    "form.confirmation.title": "¡Gracias por completar el formulario!",
    "form.confirmation.body":
      "Ya recibimos tu información y nuestro equipo está revisando tu perfil para asignarte el profesor ideal según tu nivel, objetivos y disponibilidad.",
    "form.confirmation.note":
      "En breve vas a ser contactado directamente por uno de nuestros profesores o por el equipo de Spanish Academy, a través de tu medio de contacto preferido (email o WhatsApp), para coordinar el inicio de tus clases.",
    "form.confirmation.email": "Abrir correo otra vez",

    "footer.brand": "Formación lingüística personalizada, sin programas estándar.",
    "footer.navigation": "Navegación",
    "footer.language": "Idioma",
    "footer.contact": "Contacto",
    "footer.email": "spanishacademy100@gmail.com",
    "footer.whatsapp": "El número de contacto para WhatsApp se agregará próximamente.",
    "footer.rights": "Todos los derechos reservados.",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = useCallback((key: string) => translations[language][key] || key, [language])

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}