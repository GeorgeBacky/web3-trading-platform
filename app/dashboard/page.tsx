import Link from "next/link"
import { Activity, ArrowRight, Bot, Download, TrendingUp, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { WalletOverview } from "@/components/wallet-overview"
import { BotOverview } from "@/components/bot-overview"
import { RecentTransactions } from "@/components/recent-transactions"
import { PerformanceChart } from "@/components/performance-chart"
import { PageHeader, StatCard } from "@/components/stat-card"

export default function DashboardPage() {
  return (
    <div>
      <PageHeader title="Overview" description="Sample data. Your bots, balances, and recent trades.">
        <Button variant="outline" size="sm">
          <Download />
          Export
        </Button>
        <Button variant="brand" size="sm" asChild>
          <Link href="/dashboard/bots">
            <Bot />
            New bot
          </Link>
        </Button>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total balance" value="$45,231.89" change="+20.1% vs last month" trend="up" icon={Wallet} />
        <StatCard label="Active bots" value="3" change="+2 since last week" trend="flat" icon={Bot} />
        <StatCard label="Total profit" value="$12,234.59" change="+19.0% vs last month" trend="up" icon={TrendingUp} />
        <StatCard label="Trades" value="573" change="+201 this month" trend="flat" icon={Activity} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Portfolio value</CardTitle>
          </CardHeader>
          <CardContent>
            <PerformanceChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <div className="space-y-1.5">
              <CardTitle>Recent trades</CardTitle>
              <CardDescription>Latest fills across all bots</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/wallet">
                All
                <ArrowRight />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <RecentTransactions />
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1.6fr]">
        <Card>
          <CardHeader>
            <CardTitle>Wallet</CardTitle>
            <CardDescription>Connected account and holdings</CardDescription>
          </CardHeader>
          <CardContent>
            <WalletOverview />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Bots</CardTitle>
            <CardDescription>Start, pause, and check each strategy</CardDescription>
          </CardHeader>
          <CardContent>
            <BotOverview />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
