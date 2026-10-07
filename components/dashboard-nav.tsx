"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bot, LayoutGrid, LineChart, Settings, Wallet } from "lucide-react"
import { cn } from "@/lib/utils"

export const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutGrid },
  { name: "Trading Bots", href: "/dashboard/bots", icon: Bot },
  { name: "Wallet", href: "/dashboard/wallet", icon: Wallet },
  { name: "Analytics", href: "/dashboard/analytics", icon: LineChart },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export default function DashboardNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <nav className="grid gap-1" aria-label="Dashboard">
      {navItems.map((item) => {
        const active = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative flex h-10 items-center gap-3 rounded-md px-3 text-sm transition-colors",
              active
                ? "bg-sidebar-accent font-medium text-foreground"
                : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground",
            )}
          >
            {active && <span className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-brand" aria-hidden="true" />}
            <item.icon className="h-4 w-4" strokeWidth={1.75} />
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
}
