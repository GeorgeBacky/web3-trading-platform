"use client"

import type React from "react"
import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useWallet } from "@/components/wallet-provider"
import DashboardNav from "@/components/dashboard-nav"
import { UserNav } from "@/components/user-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { Logo } from "@/components/brand/logo"

function NetworkBadge() {
  const { chainName, isGuest, method } = useWallet()
  const label = isGuest ? "Sample data" : method === "email" ? "No wallet linked" : chainName
  if (!label) return null
  return (
    <span className="hidden h-9 items-center rounded-md border px-3 text-[13px] text-muted-foreground sm:inline-flex">
      {label}
    </span>
  )
}

function ShellSkeleton() {
  return (
    <div className="grid min-h-[100dvh] md:grid-cols-[240px_1fr]" aria-busy="true" aria-label="Loading dashboard">
      <aside className="hidden border-r bg-sidebar p-4 md:block">
        <div className="h-7 w-28 animate-pulse rounded-sm bg-muted" />
        <div className="mt-10 space-y-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 animate-pulse rounded-md bg-muted/70" />
          ))}
        </div>
      </aside>
      <div className="p-4 md:p-8">
        <div className="h-8 w-40 animate-pulse rounded-sm bg-muted" />
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-28 animate-pulse rounded-lg bg-muted/70" />
          ))}
        </div>
        <div className="mt-4 h-80 animate-pulse rounded-lg bg-muted/70" />
      </div>
    </div>
  )
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { status } = useWallet()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (status === "signed-out") router.replace(`/login?next=${encodeURIComponent(pathname)}`)
  }, [status, pathname, router])

  if (status !== "signed-in") return <ShellSkeleton />

  return (
    <div className="grid min-h-[100dvh] md:grid-cols-[240px_1fr]">
      <aside className="sticky top-0 hidden h-[100dvh] flex-col border-r bg-sidebar p-4 md:flex">
        <div className="px-2 py-1">
          <Logo href="/dashboard" />
        </div>
        <div className="mt-10">
          <DashboardNav />
        </div>
      </aside>

      <div className="flex min-w-0 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-background/85 px-4 backdrop-blur-md md:px-8">
          <MobileNav />
          <div className="md:hidden">
            <Logo href="/dashboard" />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <NetworkBadge />
            <ThemeToggle />
            <UserNav />
          </div>
        </header>
        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">
          <div className="mx-auto w-full max-w-[1280px]">{children}</div>
        </main>
      </div>
    </div>
  )
}
