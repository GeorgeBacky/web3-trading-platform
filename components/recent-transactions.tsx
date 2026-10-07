import { ArrowDownLeft, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

type Transaction = {
  id: string
  type: "buy" | "sell"
  pair: string
  amount: number
  price: number
  date: string
}

// Sample trades (demo data).
const transactions: Transaction[] = [
  { id: "tx-1", type: "buy", pair: "BTC/USDT", amount: 0.05, price: 42350.67, date: "2025-03-28T14:32:00Z" },
  { id: "tx-2", type: "sell", pair: "ETH/USDT", amount: 1.2, price: 2780.45, date: "2025-03-28T12:15:00Z" },
  { id: "tx-3", type: "buy", pair: "SOL/USDT", amount: 15, price: 145.78, date: "2025-03-27T23:45:00Z" },
  { id: "tx-4", type: "sell", pair: "BTC/USDT", amount: 0.02, price: 42150.32, date: "2025-03-27T18:22:00Z" },
  { id: "tx-5", type: "buy", pair: "ETH/USDT", amount: 0.5, price: 2795.12, date: "2025-03-27T10:05:00Z" },
]

const dateFormat = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
const num = new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export function RecentTransactions() {
  return (
    <ul className="divide-y">
      {transactions.map((tx) => {
        const buy = tx.type === "buy"
        const asset = tx.pair.split("/")[0]
        return (
          <li key={tx.id} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
            <div className="flex min-w-0 items-center gap-3">
              <span
                className={cn(
                  "grid h-8 w-8 shrink-0 place-items-center rounded-sm",
                  buy ? "bg-gain/10 text-gain" : "bg-loss/10 text-loss",
                )}
              >
                {buy ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  {buy ? "Bought" : "Sold"} <span className="font-mono tabular">{tx.amount}</span> {asset}
                </p>
                <p className="text-xs text-muted-foreground">{dateFormat.format(new Date(tx.date))}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-mono text-sm tabular">
                {buy ? "-" : "+"}
                {num.format(tx.amount * tx.price)}
              </p>
              <p className="font-mono text-xs text-muted-foreground tabular">@ {num.format(tx.price)}</p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
