import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowDownUp, ArrowUpRight, Download, Upload, Wallet } from "lucide-react"
import { WalletOverview } from "@/components/wallet-overview"
import { RecentTransactions } from "@/components/recent-transactions"

export default function WalletPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Wallet</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Deposit
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Withdraw
          </Button>
          <Button size="sm">
            <ArrowDownUp className="mr-2 h-4 w-4" />
            Swap
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Wallet Overview</CardTitle>
            <CardDescription>Your connected wallets and balances</CardDescription>
          </CardHeader>
          <CardContent>
            <WalletOverview />
          </CardContent>
        </Card>

        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>Your recent transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="deposits">Deposits</TabsTrigger>
                <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
                <TabsTrigger value="trades">Trades</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <RecentTransactions />
              </TabsContent>

              <TabsContent value="deposits">
                <div className="flex items-center justify-center py-8">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <ArrowUpRight className="h-8 w-8 text-muted-foreground" />
                    <h3 className="font-medium">No recent deposits</h3>
                    <p className="text-sm text-muted-foreground">Deposit funds to start trading</p>
                    <Button className="mt-2">
                      <Download className="mr-2 h-4 w-4" />
                      Deposit
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="withdrawals">
                <div className="flex items-center justify-center py-8">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <ArrowUpRight className="h-8 w-8 text-muted-foreground" />
                    <h3 className="font-medium">No recent withdrawals</h3>
                    <p className="text-sm text-muted-foreground">Your withdrawal history will appear here</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="trades">
                <RecentTransactions />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Connected Wallets</CardTitle>
          <CardDescription>Manage your connected wallets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between border p-4 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="rounded-full p-2 bg-primary/10">
                  <Wallet className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">MetaMask</p>
                  <p className="text-sm text-muted-foreground">0x1a2b...3c4d</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Disconnect
              </Button>
            </div>

            <Button variant="outline" className="w-full">
              <Wallet className="mr-2 h-4 w-4" />
              Connect Another Wallet
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

