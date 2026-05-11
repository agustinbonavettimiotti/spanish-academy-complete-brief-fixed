import type { Metadata, Viewport } from "next"
import type { ReactNode } from "react"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Spanish Academy | Personalized Language Training",
  description: "Personalized Spanish and English lessons with native teachers, plus live language assistance for real-world communication.",
  keywords: ["Spanish Academy", "Spanish lessons", "learn Spanish online", "native Spanish teachers", "English lessons", "language training", "live language assistance"],
  openGraph: {
    title: "Spanish Academy | Personalized Language Training",
    description: "Personalized Spanish and English lessons with native teachers, plus live language assistance for real-world communication.",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#fcf8f2",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased"> 
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18156371861"></script>

  <script
    dangerouslySetInnerHTML={{
      __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'AW-18156371861');
      `,
    }}
  />
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
