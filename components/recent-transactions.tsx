import { ArrowDownLeft, ArrowUpRight } from "lucide-react"

type Transaction = {
  id: string
  type: "buy" | "sell"
  pair: string
  amount: number
  price: number
  date: string
  status: "completed" | "pending" | "failed"
}

const transactions: Transaction[] = [
  {
    id: "tx-1",
    type: "buy",
    pair: "BTC/USDT",
    amount: 0.05,
    price: 42350.67,
    date: "2025-03-28T14:32:00Z",
    status: "completed",
  },
  {
    id: "tx-2",
    type: "sell",
    pair: "ETH/USDT",
    amount: 1.2,
    price: 2780.45,
    date: "2025-03-28T12:15:00Z",
    status: "completed",
  },
  {
    id: "tx-3",
    type: "buy",
    pair: "SOL/USDT",
    amount: 15,
    price: 145.78,
    date: "2025-03-27T23:45:00Z",
    status: "completed",
  },
  {
    id: "tx-4",
    type: "sell",
    pair: "BTC/USDT",
    amount: 0.02,
    price: 42150.32,
    date: "2025-03-27T18:22:00Z",
    status: "completed",
  },
  {
    id: "tx-5",
    type: "buy",
    pair: "ETH/USDT",
    amount: 0.5,
    price: 2795.12,
    date: "2025-03-27T10:05:00Z",
    status: "completed",
  },
]

export function RecentTransactions() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="space-y-4">
      {transactions.map((tx) => (
        <div key={tx.id} className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`rounded-full p-2 ${tx.type === "buy" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"} dark:bg-background`}
            >
              {tx.type === "buy" ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
            </div>
            <div>
              <p className="text-sm font-medium">
                {tx.type === "buy" ? "Bought" : "Sold"} {tx.amount} {tx.pair.split("/")[0]}
              </p>
              <p className="text-xs text-muted-foreground">{formatDate(tx.date)}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">
              {tx.type === "buy" ? "-" : "+"}
              {(tx.amount * tx.price).toFixed(2)} USDT
            </p>
            <p className="text-xs text-muted-foreground">Price: {tx.price.toFixed(2)} USDT</p>
          </div>
        </div>
      ))}
    </div>
  )
}

