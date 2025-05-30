import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bot, Plus } from "lucide-react"
import { BotOverview } from "@/components/bot-overview"

export default function BotsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Trading Bots</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Bot
        </Button>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="paused">Paused</TabsTrigger>
          <TabsTrigger value="all">All Bots</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <BotOverview />
        </TabsContent>

        <TabsContent value="paused" className="space-y-4">
          <BotOverview />
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <BotOverview />
        </TabsContent>
      </Tabs>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>QuantConnect Algorithms</CardTitle>
          <CardDescription>Deploy pre-built algorithms from QuantConnect</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col items-center gap-2 text-center">
                <Bot className="h-10 w-10 text-primary" />
                <h3 className="font-medium">Momentum Strategy</h3>
                <p className="text-sm text-muted-foreground">
                  Capitalize on market trends with this momentum-based algorithm
                </p>
                <Button variant="outline" className="w-full mt-2">
                  Deploy
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col items-center gap-2 text-center">
                <Bot className="h-10 w-10 text-primary" />
                <h3 className="font-medium">Mean Reversion</h3>
                <p className="text-sm text-muted-foreground">
                  Trade price reversals with this mean reversion algorithm
                </p>
                <Button variant="outline" className="w-full mt-2">
                  Deploy
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col items-center gap-2 text-center">
                <Bot className="h-10 w-10 text-primary" />
                <h3 className="font-medium">Dollar Cost Averaging</h3>
                <p className="text-sm text-muted-foreground">Automated DCA strategy for long-term portfolio building</p>
                <Button variant="outline" className="w-full mt-2">
                  Deploy
                </Button>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}

