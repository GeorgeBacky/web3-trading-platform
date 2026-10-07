"use client"

import { useState } from "react"
import { Bot, Pause, Play, Settings } from "lucide-react"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

type BotStatus = "active" | "paused" | "stopped"

type TradingBot = {
  id: string
  name: string
  algorithm: string
  status: BotStatus
  profit: number
  trades: number
  pairs: string[]
}

// Sample bots (demo data).
const initialBots: TradingBot[] = [
  {
    id: "bot-1",
    name: "BTC Momentum",
    algorithm: "Momentum",
    status: "active",
    profit: 345.67,
    trades: 28,
    pairs: ["BTC/USDT"],
  },
  {
    id: "bot-2",
    name: "ETH Swing",
    algorithm: "Swing trading",
    status: "paused",
    profit: -23.45,
    trades: 12,
    pairs: ["ETH/USDT"],
  },
  {
    id: "bot-3",
    name: "Multi-Pair DCA",
    algorithm: "Dollar cost averaging",
    status: "stopped",
    profit: 567.89,
    trades: 45,
    pairs: ["BTC/USDT", "ETH/USDT", "SOL/USDT"],
  },
]

const statusLabel: Record<BotStatus, string> = { active: "Running", paused: "Paused", stopped: "Stopped" }

export function BotOverview({ filter = "all" }: { filter?: "all" | BotStatus }) {
  const [bots, setBots] = useState<TradingBot[]>(initialBots)

  const toggle = (id: string) => {
    setBots((list) =>
      list.map((bot) => {
        if (bot.id !== id) return bot
        const status: BotStatus = bot.status === "active" ? "paused" : "active"
        toast.success(`${bot.name} ${status === "active" ? "started" : "paused"}`)
        return { ...bot, status }
      }),
    )
  }

  const visible = filter === "all" ? bots : bots.filter((b) => b.status === filter)

  if (visible.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center">
        <Bot className="mx-auto h-6 w-6 text-muted-foreground" strokeWidth={1.75} />
        <p className="mt-3 font-medium">No {filter} bots</p>
        <p className="mt-1 text-sm text-muted-foreground">Bots you {filter === "paused" ? "pause" : "start"} will show up here.</p>
      </div>
    )
  }

  return (
    <ul className="grid gap-3">
      {visible.map((bot) => (
        <li key={bot.id} className="rounded-lg border bg-card p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="truncate font-medium">{bot.name}</p>
                <Badge
                  variant="outline"
                  className={cn(
                    bot.status === "active" && "border-brand-ink/40 text-brand-ink",
                    bot.status !== "active" && "text-muted-foreground",
                  )}
                >
                  {statusLabel[bot.status]}
                </Badge>
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground">{bot.algorithm}</p>
            </div>
            <div className="flex items-center gap-1">
              <Switch
                checked={bot.status === "active"}
                onCheckedChange={() => toggle(bot.id)}
                aria-label={`${bot.status === "active" ? "Pause" : "Start"} ${bot.name}`}
              />
              <Button variant="ghost" size="icon" className="h-8 w-8" aria-label={`${bot.name} settings`}>
                <Settings strokeWidth={1.75} />
              </Button>
            </div>
          </div>

          <dl className="mt-4 grid grid-cols-3 gap-4 text-sm">
            <div>
              <dt className="text-xs text-muted-foreground">Profit</dt>
              <dd className={cn("mt-0.5 font-mono tabular", bot.profit >= 0 ? "text-gain" : "text-loss")}>
                {bot.profit >= 0 ? "+" : ""}
                {bot.profit.toFixed(2)}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Trades</dt>
              <dd className="mt-0.5 font-mono tabular">{bot.trades}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Pairs</dt>
              <dd className="mt-0.5 truncate font-mono text-[13px]">{bot.pairs.join(", ")}</dd>
            </div>
          </dl>

          <div className="mt-4 flex gap-2">
            <Button variant="outline" size="sm" className="flex-1" onClick={() => toggle(bot.id)}>
              {bot.status === "active" ? <Pause /> : <Play />}
              {bot.status === "active" ? "Pause" : "Start"}
            </Button>
            <Button variant="ghost" size="sm" className="flex-1">
              View trades
            </Button>
          </div>
        </li>
      ))}
    </ul>
  )
}
