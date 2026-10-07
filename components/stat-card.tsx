import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type StatCardProps = {
  label: string
  value: string
  change?: string
  trend?: "up" | "down" | "flat"
  icon?: LucideIcon
  className?: string
}

export function StatCard({ label, value, change, trend = "flat", icon: Icon, className }: StatCardProps) {
  return (
    <div className={cn("rounded-lg border bg-card p-5", className)}>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{label}</span>
        {Icon && <Icon className="h-4 w-4" strokeWidth={1.75} />}
      </div>
      <p className="mt-3 font-mono text-[26px] font-medium leading-none tracking-tight tabular">{value}</p>
      {change && (
        <p
          className={cn(
            "mt-2 text-[13px]",
            trend === "up" && "text-gain",
            trend === "down" && "text-loss",
            trend === "flat" && "text-muted-foreground",
          )}
        >
          {change}
        </p>
      )}
    </div>
  )
}

export function PageHeader({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children?: React.ReactNode
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight md:text-[28px]">{title}</h1>
        {description && <p className="mt-1 text-[15px] text-muted-foreground">{description}</p>}
      </div>
      {children && <div className="flex flex-wrap items-center gap-2">{children}</div>}
    </div>
  )
}

export function EmptyPanel({ title, body }: { title: string; body: string }) {
  return (
    <div className="tile-grid grid h-[360px] place-items-center rounded-lg border border-dashed text-center">
      <div className="max-w-sm rounded-md bg-background/90 px-6 py-5">
        <p className="font-medium">{title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{body}</p>
      </div>
    </div>
  )
}
