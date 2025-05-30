"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { ArrowUpDown, Bot, Play, Settings, CircleStopIcon as Stop } from "lucide-react"
import { toast } from "sonner"

type TradingBot = {
  id: string
  name: string
  algorithm: string
  status: "active" | "paused" | "stopped"
  profit: number
  trades: number
  pairs: string[]
}

const bots: TradingBot[] = [
  {
    id: "bot-1",
    name: "BTC Momentum",
    algorithm: "Momentum Strategy",
    status: "active",
    profit: 345.67,
    trades: 28,
    pairs: ["BTC/USDT"],
  },
  {
    id: "bot-2",
    name: "ETH Swing",
    algorithm: "Swing Trading",
    status: "paused",
    profit: -23.45,
    trades: 12,
    pairs: ["ETH/USDT"],
  },
  {
    id: "bot-3",
    name: "Multi-Pair DCA",
    algorithm: "Dollar Cost Averaging",
    status: "stopped",
    profit: 567.89,
    trades: 45,
    pairs: ["BTC/USDT", "ETH/USDT", "SOL/USDT"],
  },
]

export function BotOverview() {
  const [tradingBots, setTradingBots] = useState<TradingBot[]>(bots)

  const toggleBotStatus = (botId: string) => {
    setTradingBots((bots) =>
      bots.map((bot) => {
        if (bot.id === botId) {
          const newStatus = bot.status === "active" ? "paused" : "active"
          toast.success(`Bot ${bot.name} ${newStatus === "active" ? "activated" : "paused"}`)
          return { ...bot, status: newStatus }
        }
        return bot
      }),
    )
  }

  return (
    <div className="space-y-4">
      {tradingBots.map((bot) => (
        <Card key={bot.id}>
          <CardContent className="p-4">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot className="h-4 w-4" />
                  <span className="font-medium">{bot.name}</span>
                  <Badge
                    variant={bot.status === "active" ? "default" : bot.status === "paused" ? "outline" : "secondary"}
                  >
                    {bot.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={bot.status === "active"} onCheckedChange={() => toggleBotStatus(bot.id)} />
                  <Button variant="ghost" size="icon">
                    <Settings className="h-4 w-4" />
                    <span className="sr-only">Bot settings</span>
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Algorithm</p>
                  <p>{bot.algorithm}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Profit</p>
                  <p className={bot.profit >= 0 ? "text-green-500" : "text-red-500"}>
                    {bot.profit >= 0 ? "+" : ""}
                    {bot.profit.toFixed(2)} USDT
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Trades</p>
                  <p>{bot.trades}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {bot.pairs.map((pair) => (
                  <Badge key={pair} variant="outline" className="text-xs">
                    {pair}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2 mt-2">
                {bot.status === "active" ? (
                  <Button variant="outline" size="sm" className="w-full" onClick={() => toggleBotStatus(bot.id)}>
                    <Stop className="mr-2 h-3 w-3" />
                    Pause Bot
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" className="w-full" onClick={() => toggleBotStatus(bot.id)}>
                    <Play className="mr-2 h-3 w-3" />
                    Start Bot
                  </Button>
                )}
                <Button variant="outline" size="sm" className="w-full">
                  <ArrowUpDown className="mr-2 h-3 w-3" />
                  View Trades
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button className="w-full">
        <Bot className="mr-2 h-4 w-4" />
        Create New Bot
      </Button>
    </div>
  )
}

