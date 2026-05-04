"use client"

import { LanguageProvider } from "@/lib/language-context"
import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { Programs } from "@/components/programs"
import { HowItWorks } from "@/components/how-it-works"
import { Pricing } from "@/components/pricing"
import { LiveAssistance } from "@/components/live-assistance"
import { Teachers } from "@/components/teachers"
import { ContactForm } from "@/components/contact-form"
import { FAQ } from "@/components/faq"
import { StudentOutcomes } from "@/components/student-outcomes"
import { StudentTestimonials } from "@/components/student-testimonials"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />

        <main>
          <Hero />
          <Programs />
          <HowItWorks />
          <Pricing />
          <LiveAssistance />
          <Teachers />
          <StudentOutcomes />
          <ContactForm />
          <FAQ />
          <StudentTestimonials />
        </main>

        <Footer />
      </div>
    </LanguageProvider>
  )
}