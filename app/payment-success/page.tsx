export default function PaymentSuccess() {
  return (
    <main className="min-h-screen bg-background px-6 py-24 text-primary">
      <section className="mx-auto max-w-[560px] rounded-[1.2rem] border border-border bg-white p-8 text-center shadow-[0_18px_56px_-46px_rgba(7,52,92,.15)]">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-accent">
          Payment confirmed
        </p>

        <h1 className="mt-4 font-serif text-[2.4rem] leading-none tracking-[-0.04em]">
          Thank you for your payment
        </h1>

        <p className="mt-4 text-[0.92rem] leading-7 text-muted-foreground">
          We received your payment. Our team will contact you shortly to coordinate the next steps.
        </p>

        <a
          href="https://wa.me/549XXXXXXXXXX?text=Hi%20Spanish%20Academy,%20I%20just%20completed%20my%20payment."
          className="mt-7 inline-flex h-11 items-center justify-center rounded-full bg-primary px-7 text-[0.84rem] font-semibold text-white hover:bg-primary/92"
        >
          Contact us on WhatsApp
        </a>
      </section>
    </main>
  )
}