"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useWallet } from "@/components/wallet-provider"
import DashboardNav from "@/components/dashboard-nav"
import { UserNav } from "@/components/user-nav"
import { MobileNav } from "@/components/mobile-nav"
import { Bot } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isConnected } = useWallet()
  const router = useRouter()

  // Simple auth check - in a real app, you'd have more robust authentication
  useEffect(() => {
    if (!isConnected) {
      router.push("/login")
    }
  }, [isConnected, router])

  if (!isConnected) {
    return null // Or a loading state
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2 font-bold md:hidden">
          <Bot className="h-6 w-6" />
          <span>InfluxLabs</span>
        </div>
        <div className="hidden md:flex md:items-center md:gap-2 md:font-bold">
          <Bot className="h-6 w-6" />
          <span>InfluxLabs</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <UserNav />
          <MobileNav />
        </div>
      </header>
      <div className="grid flex-1 md:grid-cols-[220px_1fr]">
        <aside className="hidden border-r md:block">
          <DashboardNav />
        </aside>
        <main className="flex flex-col p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

