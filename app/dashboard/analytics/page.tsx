import { Gauge, Percent, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PerformanceChart } from "@/components/performance-chart"
import { EmptyPanel, PageHeader, StatCard } from "@/components/stat-card"

export default function AnalyticsPage() {
  return (
    <div>
      <PageHeader title="Analytics" description="Sample data. How your portfolio and bots are performing." />

      <Tabs defaultValue="performance">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="bots">Bots</TabsTrigger>
          <TabsTrigger value="markets">Markets</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="mt-4 space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard label="Total return" value="+24.5%" change="+5.2 pts vs last month" trend="up" icon={TrendingUp} />
            <StatCard label="Win rate" value="68%" change="+3 pts vs last month" trend="up" icon={Percent} />
            <StatCard label="Profit factor" value="1.85" change="+0.20 vs last month" trend="up" icon={Gauge} />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Portfolio value</CardTitle>
              <CardDescription>All bots combined</CardDescription>
            </CardHeader>
            <CardContent>
              <PerformanceChart />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bots" className="mt-4">
          <EmptyPanel
            title="Bot comparison is not connected yet"
            body="Per-bot analytics will appear here once an analytics provider is linked."
          />
        </TabsContent>

        <TabsContent value="markets" className="mt-4">
          <EmptyPanel
            title="Market data is not connected yet"
            body="Live prices and depth will appear here once a market data provider is linked."
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
