"use client"

import { useWallet } from "@/components/wallet-provider"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, ExternalLink } from "lucide-react"
import { toast } from "sonner"

export function WalletOverview() {
  const { address, balance } = useWallet()

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      toast.success("Address copied to clipboard")
    }
  }

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Connected Wallet</p>
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">{address ? truncateAddress(address) : "Not connected"}</p>
                {address && (
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={copyAddress}>
                    <Copy className="h-3 w-3" />
                    <span className="sr-only">Copy address</span>
                  </Button>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">Balance</p>
              <p className="text-sm text-muted-foreground">{balance || "0 ETH"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm font-medium">ETH</p>
              <p className="text-lg font-bold">2.45</p>
              <p className="text-xs text-muted-foreground">$4,521.32</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm font-medium">USDT</p>
              <p className="text-lg font-bold">12,500</p>
              <p className="text-xs text-muted-foreground">$12,500.00</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm font-medium">BTC</p>
              <p className="text-lg font-bold">0.35</p>
              <p className="text-xs text-muted-foreground">$21,350.00</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm font-medium">Other</p>
              <p className="text-lg font-bold">-</p>
              <p className="text-xs text-muted-foreground">$6,860.57</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Button variant="outline" className="w-full" size="sm">
        <ExternalLink className="mr-2 h-4 w-4" />
        View on Etherscan
      </Button>
    </div>
  )
}

