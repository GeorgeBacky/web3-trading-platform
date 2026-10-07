"use client"

import { motion } from "motion/react"
import { PortfolioArea, portfolioSeries } from "@/components/performance-chart"
import { cn } from "@/lib/utils"

const bots = [
  { name: "BTC Momentum", pair: "BTC/USDT", pnl: 345.67, running: true },
  { name: "ETH Swing", pair: "ETH/USDT", pnl: -23.45, running: false },
  { name: "Multi-Pair DCA", pair: "BTC, ETH, SOL", pnl: 567.89, running: true },
]

/** A live mini version of the dashboard, rendered with the same chart component. */
export function HeroPreview() {
  const first = portfolioSeries[0].value
  const last = portfolioSeries[portfolioSeries.length - 1].value

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <div className="absolute -inset-px -z-10 translate-x-4 translate-y-4 rounded-lg bg-brand/25" aria-hidden="true" />
      <div className="rounded-lg border bg-card p-5 shadow-[0_24px_60px_-28px_hsl(240_10%_6%/0.35)] sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Portfolio</p>
            <p className="mt-1 font-mono text-3xl font-medium tracking-tight tabular">
              ${last.toLocaleString("en-US")}
            </p>
            <p className="mt-1 text-[13px] text-gain">+{(((last - first) / first) * 100).toFixed(1)}% this year</p>
          </div>
          <span className="rounded-sm border px-2 py-1 text-xs text-muted-foreground">Sample data</span>
        </div>

        <div className="-mx-1 mt-4">
          <PortfolioArea data={portfolioSeries} height={150} showAxes={false} />
        </div>

        <ul className="mt-4 divide-y border-t">
          {bots.map((bot) => (
            <li key={bot.name} className="flex items-center justify-between gap-4 py-3 text-sm last:pb-0">
              <div className="min-w-0">
                <p className="truncate font-medium">{bot.name}</p>
                <p className="font-mono text-xs text-muted-foreground">{bot.pair}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className={cn("font-mono tabular", bot.pnl >= 0 ? "text-gain" : "text-loss")}>
                  {bot.pnl >= 0 ? "+" : ""}
                  {bot.pnl.toFixed(2)}
                </span>
                <span
                  className={cn(
                    "w-16 rounded-sm px-2 py-0.5 text-center text-xs",
                    bot.running ? "bg-brand text-brand-foreground" : "bg-secondary text-muted-foreground",
                  )}
                >
                  {bot.running ? "Running" : "Paused"}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}
