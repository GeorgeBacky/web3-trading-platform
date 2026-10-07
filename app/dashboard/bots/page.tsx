import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BotOverview } from "@/components/bot-overview"
import { PageHeader } from "@/components/stat-card"

const strategies = [
  {
    name: "Momentum",
    body: "Buys strength and exits when the trend fades. Works best on liquid majors.",
    pairs: "BTC, ETH",
  },
  {
    name: "Mean reversion",
    body: "Fades sharp moves away from a moving average and closes on the return.",
    pairs: "ETH, SOL",
  },
  {
    name: "Dollar cost averaging",
    body: "Buys a fixed amount on a schedule to build a long-term position.",
    pairs: "Any pair",
  },
]

export default function BotsPage() {
  return (
    <div>
      <PageHeader title="Trading bots" description="Sample data. Each bot runs one QuantConnect strategy.">
        <Button variant="brand" size="sm">
          <Plus />
          New bot
        </Button>
      </PageHeader>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Running</TabsTrigger>
          <TabsTrigger value="paused">Paused</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <BotOverview />
        </TabsContent>
        <TabsContent value="active" className="mt-4">
          <BotOverview filter="active" />
        </TabsContent>
        <TabsContent value="paused" className="mt-4">
          <BotOverview filter="paused" />
        </TabsContent>
      </Tabs>

      <section className="mt-12">
        <h2 className="text-lg font-semibold tracking-tight">Deploy a strategy</h2>
        <p className="mt-1 text-sm text-muted-foreground">Pre-built QuantConnect algorithms you can launch as a bot.</p>
        <div className="mt-5 grid gap-4 md:grid-cols-[1.3fr_1fr_1fr]">
          {strategies.map((s, i) => (
            <div
              key={s.name}
              className={
                i === 0
                  ? "flex flex-col rounded-lg border border-brand-ink/30 bg-brand/10 p-5"
                  : "flex flex-col rounded-lg border bg-card p-5"
              }
            >
              <p className="font-medium">{s.name}</p>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.body}</p>
              <p className="mt-4 font-mono text-xs text-muted-foreground">{s.pairs}</p>
              <Button variant={i === 0 ? "brand" : "outline"} size="sm" className="mt-4 self-start">
                Deploy
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
