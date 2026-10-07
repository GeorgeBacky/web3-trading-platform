import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { WalletProvider } from "@/components/wallet-provider"
import { Toaster } from "@/components/ui/sonner"
import { MotionProvider } from "@/components/motion-provider"
import { Geist, Geist_Mono } from "next/font/google"
import type { Metadata, Viewport } from "next"
import "./globals.css"

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" })

export const metadata: Metadata = {
  title: "Tessera - Automated crypto trading",
  description: "Deploy QuantConnect strategies as trading bots, connect your wallet, and track every trade in one place.",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f6f8" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0c0e" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <MotionProvider>
            <WalletProvider>
              {children}
              <Toaster position="bottom-right" />
            </WalletProvider>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
