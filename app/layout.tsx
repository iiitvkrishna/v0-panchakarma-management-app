import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider" // Assuming this component exists or will be created
import "./globals.css"

export const metadata: Metadata = {
  title: "HIPAA Appointment Booking - Doctor & Patient Portal",
  description:
    "A HIPAA-styled appointment booking micro-site for doctors and patients to manage appointments securely.",
  generator: "v0.app",
  keywords: ["HIPAA", "appointment booking", "doctor", "patient", "medical", "healthcare", "scheduling"],
  authors: [{ name: "v0.app" }],
  openGraph: {
    title: "HIPAA Appointment Booking",
    description: "Secure and efficient appointment scheduling for healthcare professionals.",
    url: "https://your-app-url.com", // Replace with actual URL
    siteName: "HIPAA Appointment Booking",
    images: [
      {
        url: "https://your-app-url.com/og-image.jpg", // Replace with actual OG image
        width: 1200,
        height: 630,
        alt: "HIPAA Appointment Booking",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HIPAA Appointment Booking",
    description: "Secure and efficient appointment scheduling for healthcare professionals.",
    creator: "@v0_app",
    images: ["https://your-app-url.com/twitter-image.jpg"], // Replace with actual Twitter image
  },
  manifest: "/manifest.json",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Suspense fallback={null}>{children}</Suspense>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
