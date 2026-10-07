"use client"

import { Copy, ExternalLink, RefreshCw } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/components/wallet-provider"
import { shortAddress } from "@/components/user-nav"

// Sample holdings (demo data).
const holdings = [
  { symbol: "ETH", amount: "2.45", usd: "$4,521.32" },
  { symbol: "USDT", amount: "12,500", usd: "$12,500.00" },
  { symbol: "BTC", amount: "0.35", usd: "$21,350.00" },
  { symbol: "Other", amount: "6 assets", usd: "$6,860.57" },
]

const explorers: Record<number, string> = {
  1: "https://etherscan.io",
  10: "https://optimistic.etherscan.io",
  56: "https://bscscan.com",
  137: "https://polygonscan.com",
  8453: "https://basescan.org",
  42161: "https://arbiscan.io",
  43114: "https://snowtrace.io",
  11155111: "https://sepolia.etherscan.io",
}

export function WalletOverview() {
  const { address, balance, chainId, chainName, walletName, method, isGuest, isConnecting, refreshBalance, connectWallet } =
    useWallet()

  const copyAddress = () => {
    if (!address) return
    navigator.clipboard.writeText(address)
    toast.success("Address copied")
  }

  const explorer = chainId ? explorers[chainId] : undefined

  return (
    <div className="space-y-4">
      {address ? (
        <div className="rounded-lg bg-secondary p-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{isGuest ? "Sample wallet" : (walletName ?? "Wallet")}</span>
            <span>{chainName}</span>
          </div>
          <div className="mt-3 flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-2xl font-medium tracking-tight tabular">{balance ?? "..."}</p>
              <div className="mt-1 flex items-center gap-1">
                <span className="font-mono text-sm text-muted-foreground">{shortAddress(address)}</span>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={copyAddress} aria-label="Copy address">
                  <Copy className="!size-3.5" />
                </Button>
              </div>
            </div>
            {!isGuest && (
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={refreshBalance} aria-label="Refresh balance">
                <RefreshCw strokeWidth={1.75} />
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-dashed p-4">
          <p className="font-medium">No wallet linked</p>
          <p className="mt-1 text-sm text-muted-foreground">
            You signed in with {method === "email" ? "email" : "an account"}. Connect a wallet to see your on-chain
            balance.
          </p>
          <Button variant="outline" size="sm" className="mt-3" onClick={() => connectWallet()} disabled={isConnecting}>
            {isConnecting ? "Check your wallet" : "Connect a wallet"}
          </Button>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        {holdings.map((h) => (
          <div key={h.symbol} className="rounded-md border p-3">
            <p className="text-xs text-muted-foreground">{h.symbol}</p>
            <p className="mt-1 font-mono text-lg font-medium tabular">{h.amount}</p>
            <p className="font-mono text-xs text-muted-foreground tabular">{h.usd}</p>
          </div>
        ))}
      </div>

      {address && explorer && !isGuest && (
        <Button variant="outline" className="w-full" size="sm" asChild>
          <a href={`${explorer}/address/${address}`} target="_blank" rel="noreferrer">
            <ExternalLink />
            View on explorer
          </a>
        </Button>
      )}
    </div>
  )
}
