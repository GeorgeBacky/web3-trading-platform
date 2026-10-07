"use client"

import { useId, useState } from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { cn } from "@/lib/utils"

// Sample portfolio values (demo data).
export const portfolioSeries = [
  { date: "Jan 1", value: 45000 },
  { date: "Jan 15", value: 47480 },
  { date: "Feb 1", value: 44120 },
  { date: "Feb 15", value: 46030 },
  { date: "Mar 1", value: 48540 },
  { date: "Mar 15", value: 51210 },
  { date: "Apr 1", value: 49470 },
  { date: "Apr 15", value: 52160 },
  { date: "May 1", value: 54390 },
  { date: "May 15", value: 55870 },
  { date: "Jun 1", value: 58240 },
  { date: "Jun 15", value: 61080 },
]

const ranges = [
  { id: "1w", label: "1W", points: 3 },
  { id: "1m", label: "1M", points: 4 },
  { id: "3m", label: "3M", points: 7 },
  { id: "1y", label: "1Y", points: 12 },
] as const

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })

export function PortfolioArea({
  data,
  height = 300,
  showAxes = true,
}: {
  data: typeof portfolioSeries
  height?: number
  showAxes?: boolean
}) {
  const gradientId = useId().replace(/:/g, "")
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 4, left: showAxes ? 4 : 0, bottom: 0 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity={0.28} />
              <stop offset="100%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
            </linearGradient>
          </defs>
          {showAxes && <CartesianGrid vertical={false} stroke="hsl(var(--border))" strokeDasharray="3 3" />}
          {showAxes && (
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              fontSize={12}
              stroke="hsl(var(--muted-foreground))"
            />
          )}
          {showAxes && (
            <YAxis
              tickLine={false}
              axisLine={false}
              fontSize={12}
              width={56}
              domain={["dataMin - 2000", "dataMax + 1000"]}
              stroke="hsl(var(--muted-foreground))"
              tickFormatter={(v) => `$${Math.round(v / 1000)}k`}
            />
          )}
          {!showAxes && <YAxis hide domain={["dataMin - 2000", "dataMax + 1000"]} />}
          <Tooltip
            cursor={{ stroke: "hsl(var(--muted-foreground))", strokeDasharray: "3 3" }}
            content={({ active, payload, label }) =>
              active && payload?.length ? (
                <div className="rounded-md border bg-popover px-3 py-2 text-sm shadow-sm">
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="font-mono tabular">{usd.format(payload[0].value as number)}</p>
                </div>
              ) : null
            }
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="hsl(var(--chart-1))"
            strokeWidth={2}
            fill={`url(#${gradientId})`}
            activeDot={{ r: 4, strokeWidth: 0, fill: "hsl(var(--chart-1))" }}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export function PerformanceChart() {
  const [range, setRange] = useState<(typeof ranges)[number]["id"]>("1y")
  const points = ranges.find((r) => r.id === range)!.points
  const data = portfolioSeries.slice(-points)
  const first = data[0].value
  const last = data[data.length - 1].value
  const pct = ((last - first) / first) * 100

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-3xl font-medium tracking-tight tabular">{usd.format(last)}</p>
          <p className={cn("mt-1 text-[13px]", pct >= 0 ? "text-gain" : "text-loss")}>
            {pct >= 0 ? "+" : ""}
            {pct.toFixed(1)}% over this period
          </p>
        </div>
        <div className="inline-flex rounded-md border p-0.5" role="group" aria-label="Time range">
          {ranges.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRange(r.id)}
              aria-pressed={range === r.id}
              className={cn(
                "h-8 rounded-sm px-3 text-[13px] font-medium transition-colors",
                range === r.id ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>
      <PortfolioArea data={data} />
    </div>
  )
}
