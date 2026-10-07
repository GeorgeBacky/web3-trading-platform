"use client"

import { useEffect, useId, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Area, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { cn } from "@/lib/utils"

/*
  Interactive sample backtest. All numbers are generated from a fixed seed so the
  server and client render the same thing; nothing here is real performance.
*/

function seeded(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

const WEEKS = 52
const START = 10000
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

/** A random walk pinned to end exactly at the target return. */
function curve(seed: number, target: number, vol: number) {
  const rand = seeded(seed)
  const noise = [0]
  for (let i = 1; i <= WEEKS; i++) noise.push(noise[i - 1] + (rand() - 0.5) * vol)
  return noise.map((n, i) => {
    const bridge = n - (noise[WEEKS] * i) / WEEKS
    return Math.round(START * (1 + (target * i) / WEEKS + bridge))
  })
}

const hold = curve(7, 0.189, 0.11)

const strategies = [
  {
    id: "momentum",
    name: "Momentum",
    summary: "Rides strong trends on BTC and ETH, exits when they fade.",
    ret: 0.482,
    drawdown: -14.1,
    winRate: 54,
    trades: 212,
    series: curve(11, 0.482, 0.09),
  },
  {
    id: "mean-reversion",
    name: "Mean reversion",
    summary: "Fades sharp moves away from the average on ETH and SOL.",
    ret: 0.316,
    drawdown: -9.8,
    winRate: 63,
    trades: 341,
    series: curve(23, 0.316, 0.06),
  },
  {
    id: "dca",
    name: "Dollar cost averaging",
    summary: "Buys a fixed amount every week, whatever the price.",
    ret: 0.224,
    drawdown: -18.7,
    winRate: 71,
    trades: 52,
    series: curve(37, 0.224, 0.1),
  },
]

type Fill = { id: number; side: "Buy" | "Sell"; asset: string; size: string; price: string; bot: string }

const assets = [
  { sym: "BTC", price: 67412, size: [0.01, 0.12], bot: "BTC Momentum" },
  { sym: "ETH", price: 3104, size: [0.2, 2.4], bot: "ETH Swing" },
  { sym: "SOL", price: 152, size: [4, 40], bot: "Multi-Pair DCA" },
]

function makeFill(rand: () => number, id: number): Fill {
  const a = assets[Math.floor(rand() * assets.length)]
  const size = a.size[0] + rand() * (a.size[1] - a.size[0])
  const price = a.price * (1 + (rand() - 0.5) * 0.01)
  return {
    id,
    side: rand() > 0.45 ? "Buy" : "Sell",
    asset: a.sym,
    size: size.toFixed(a.sym === "SOL" ? 1 : 3),
    price: price.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 }),
    bot: a.bot,
  }
}

function LiveFills() {
  const [fills, setFills] = useState<Fill[]>(() => {
    const rand = seeded(99)
    return Array.from({ length: 7 }, (_, i) => makeFill(rand, 7 - i))
  })

  useEffect(() => {
    const rand = seeded(Date.now())
    let id = 8
    const timer = setInterval(() => {
      setFills((list) => [makeFill(rand, id++), ...list].slice(0, 7))
    }, 2400)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex h-full flex-col rounded-lg border bg-card p-6">
      <div className="flex items-center justify-between">
        <p className="font-medium">Bot fills</p>
        <span className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full rounded-full bg-gain opacity-60 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gain" />
          </span>
          Simulated feed
        </span>
      </div>
      <ul className="mt-5 flex-1 space-y-2 overflow-hidden" aria-live="off">
        <AnimatePresence initial={false}>
          {fills.map((f) => (
            <motion.li
              key={f.id}
              layout
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="flex items-center justify-between gap-3 rounded-md bg-secondary/60 px-3 py-2.5 text-sm"
            >
              <span className="flex min-w-0 items-center gap-3">
                <span
                  className={cn(
                    "w-10 shrink-0 rounded-sm py-0.5 text-center text-xs font-medium",
                    f.side === "Buy" ? "bg-gain/15 text-gain" : "bg-loss/15 text-loss",
                  )}
                >
                  {f.side}
                </span>
                <span className="truncate text-muted-foreground">{f.bot}</span>
              </span>
              <span className="shrink-0 font-mono text-[13px] tabular">
                {f.size} {f.asset} <span className="text-muted-foreground">@ {f.price}</span>
              </span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <dl className="mt-5 grid grid-cols-2 gap-4 border-t pt-5">
        <div>
          <dt className="text-xs text-muted-foreground">Fills today</dt>
          <dd className="mt-1 font-mono text-xl font-medium tabular">38</dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">Net today</dt>
          <dd className="mt-1 font-mono text-xl font-medium text-gain tabular">+412.36</dd>
        </div>
      </dl>
    </div>
  )
}

export function StrategyExplorer() {
  const [activeId, setActiveId] = useState(strategies[0].id)
  const active = strategies.find((s) => s.id === activeId)!
  const gradientId = useId().replace(/:/g, "")
  const reduce = useReducedMotion()
  const data = active.series.map((v, i) => ({
    label: months[Math.min(11, Math.floor((i / WEEKS) * 12))],
    strategy: v,
    hold: hold[i],
  }))
  const edge = (active.ret - 0.189) * 100

  return (
    <div className="grid gap-4 lg:grid-cols-[1.7fr_1fr]">
      <div className="rounded-lg border bg-card p-6 md:p-8">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Strategy">
          {strategies.map((s) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={s.id === activeId}
              onClick={() => setActiveId(s.id)}
              className={cn(
                "h-9 rounded-md px-4 text-sm font-medium transition-[background-color,color,transform] duration-150 active:scale-[0.98]",
                s.id === activeId
                  ? "bg-brand text-brand-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground",
              )}
            >
              {s.name}
            </button>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={active.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="font-mono text-5xl font-medium tracking-tight text-gain tabular md:text-6xl"
              >
                +{(active.ret * 100).toFixed(1)}%
              </motion.p>
            </AnimatePresence>
            <p className="mt-2 text-sm text-muted-foreground">
              12-month sample backtest, <span className="text-foreground">{edge.toFixed(1)} pts</span> ahead of holding
            </p>
          </div>
          <div className="flex items-center gap-5 text-xs text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="h-0.5 w-5 rounded-full bg-[hsl(var(--chart-1))]" />
              {active.name}
            </span>
            <span className="flex items-center gap-2">
              <span className="h-0 w-5 border-t-2 border-dashed border-muted-foreground" />
              Buy and hold
            </span>
          </div>
        </div>

        <div className="mt-6 h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                interval={8}
                padding={{ left: 14, right: 14 }}
                fontSize={12}
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis hide domain={["dataMin - 400", "dataMax + 400"]} />
              <Tooltip
                cursor={{ stroke: "hsl(var(--muted-foreground))", strokeDasharray: "3 3" }}
                content={({ active: on, payload }) =>
                  on && payload?.length ? (
                    <div className="rounded-md border bg-popover px-3 py-2 text-xs shadow-sm">
                      <p className="font-mono tabular">Strategy ${Number(payload[0].payload.strategy).toLocaleString()}</p>
                      <p className="font-mono text-muted-foreground tabular">
                        Hold ${Number(payload[0].payload.hold).toLocaleString()}
                      </p>
                    </div>
                  ) : null
                }
              />
              <Line
                type="monotone"
                dataKey="hold"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                dot={false}
                isAnimationActive={false}
              />
              <Area
                key={active.id}
                type="monotone"
                dataKey="strategy"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                fill={`url(#${gradientId})`}
                isAnimationActive={!reduce}
                animationDuration={700}
                animationEasing="ease-out"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <dl className="mt-6 grid grid-cols-3 gap-4 border-t pt-6">
          {[
            ["Max drawdown", `${active.drawdown.toFixed(1)}%`],
            ["Win rate", `${active.winRate}%`],
            ["Trades", String(active.trades)],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs text-muted-foreground">{label}</dt>
              <dd className="mt-1 font-mono text-xl font-medium tabular">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-sm text-muted-foreground">{active.summary}</p>
      </div>

      <LiveFills />
    </div>
  )
}
