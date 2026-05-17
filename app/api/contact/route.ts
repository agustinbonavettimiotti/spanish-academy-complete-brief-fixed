import { NextResponse } from "next/server"

const CONTACT_EMAIL = process.env.CONTACT_TO_EMAIL || "info@spanishglobalacademy.com"
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "Spanish Academy <noreply@spanishglobalacademy.com>"

type ContactRequestBody = {
  subject?: string
  message?: string
  replyTo?: string
  fullName?: string
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactRequestBody
    const subject = body.subject?.trim()
    const message = body.message?.trim()
    const replyTo = body.replyTo?.trim()
    const fullName = body.fullName?.trim()

    if (!subject || !message || !replyTo || !fullName || !isValidEmail(replyTo)) {
      return NextResponse.json({ error: "Invalid contact form payload." }, { status: 400 })
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: "Missing RESEND_API_KEY." }, { status: 500 })
    }

    const emailText = `New Spanish Academy request from ${fullName}\nReply to: ${replyTo}\n\n${message}`

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [CONTACT_EMAIL],
        reply_to: replyTo,
        subject,
        text: emailText,
        html: `<pre style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; white-space: pre-wrap; line-height: 1.5;">${escapeHtml(emailText)}</pre>`,
      }),
    })

    if (!response.ok) {
      const details = await response.text()
      return NextResponse.json({ error: "Email delivery failed.", details }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "Unexpected server error." }, { status: 500 })
  }
}
