"use client"

import { ArrowDownToLine, ArrowLeftRight, ArrowUpFromLine, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WalletOverview } from "@/components/wallet-overview"
import { RecentTransactions } from "@/components/recent-transactions"
import { PageHeader } from "@/components/stat-card"
import { useWallet } from "@/components/wallet-provider"
import { shortAddress } from "@/components/user-nav"
import { useRouter } from "next/navigation"

function EmptyHistory({ title, body }: { title: string; body: string }) {
  return (
    <div className="py-10 text-center">
      <p className="font-medium">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
    </div>
  )
}

export default function WalletPage() {
  const { address, walletName, chainName, isGuest, isConnecting, connectWallet, disconnectWallet } = useWallet()
  const router = useRouter()

  const handleDisconnect = async () => {
    await disconnectWallet()
    router.replace("/login")
  }

  return (
    <div>
      <PageHeader title="Wallet" description="Balances, transfers, and connected accounts.">
        <Button variant="outline" size="sm">
          <ArrowDownToLine />
          Deposit
        </Button>
        <Button variant="outline" size="sm">
          <ArrowUpFromLine />
          Withdraw
        </Button>
        <Button variant="brand" size="sm">
          <ArrowLeftRight />
          Swap
        </Button>
      </PageHeader>

      <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr]">
        <Card>
          <CardHeader>
            <CardTitle>Balance</CardTitle>
            <CardDescription>Native balance is live from your wallet; holdings are sample data</CardDescription>
          </CardHeader>
          <CardContent>
            <WalletOverview />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>History</CardTitle>
            <CardDescription>Sample trades and transfers</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="deposits">Deposits</TabsTrigger>
                <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-5">
                <RecentTransactions />
              </TabsContent>
              <TabsContent value="deposits">
                <EmptyHistory title="No deposits yet" body="Deposits you make will be listed here." />
              </TabsContent>
              <TabsContent value="withdrawals">
                <EmptyHistory title="No withdrawals yet" body="Withdrawals you make will be listed here." />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Connected accounts</CardTitle>
        </CardHeader>
        <CardContent>
          {address ? (
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-md border p-4">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-sm bg-secondary">
                  <Wallet className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="font-medium">{isGuest ? "Sample wallet" : (walletName ?? "Wallet")}</p>
                  <p className="font-mono text-sm text-muted-foreground">
                    {shortAddress(address)}
                    {chainName ? ` on ${chainName}` : ""}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={handleDisconnect}>
                Disconnect
              </Button>
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-md border border-dashed p-4">
              <p className="text-sm text-muted-foreground">No wallet is connected to this session.</p>
              <Button variant="outline" size="sm" onClick={() => connectWallet()} disabled={isConnecting}>
                {isConnecting ? "Check your wallet" : "Connect a wallet"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
