"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Copy, LogOut, Settings, Wallet } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useWallet } from "@/components/wallet-provider"

export function shortAddress(address: string) {
  return `${address.slice(0, 6)}…${address.slice(-4)}`
}

export function AccountLabel() {
  const { method, address, email, isGuest } = useWallet()
  if (isGuest) return <>Guest</>
  if (method === "email") return <>{email}</>
  return <>{address ? shortAddress(address) : "Not connected"}</>
}

export function UserNav() {
  const { address, balance, walletName, method, isGuest, disconnectWallet } = useWallet()
  const router = useRouter()

  const handleLogout = async () => {
    await disconnectWallet()
    router.replace("/")
  }

  const copyAddress = () => {
    if (!address) return
    navigator.clipboard.writeText(address)
    toast.success("Address copied")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-9 gap-2 px-3 font-mono text-[13px] tabular">
          <span className="grid h-5 w-5 place-items-center rounded-sm bg-brand text-[10px] font-sans font-bold text-brand-foreground">
            {isGuest ? "G" : method === "email" ? "@" : "W"}
          </span>
          <span className="max-w-[140px] truncate">
            <AccountLabel />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end">
        <DropdownMenuLabel className="font-normal">
          <p className="text-sm font-medium">
            {isGuest ? "Guest session" : method === "email" ? "Email account" : (walletName ?? "Wallet")}
          </p>
          <p className="mt-1 truncate font-mono text-xs text-muted-foreground">
            <AccountLabel />
          </p>
          {balance && <p className="mt-2 font-mono text-sm tabular">{balance}</p>}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {address && (
            <DropdownMenuItem onSelect={copyAddress}>
              <Copy className="h-4 w-4" strokeWidth={1.75} />
              Copy address
            </DropdownMenuItem>
          )}
          <DropdownMenuItem asChild>
            <Link href="/dashboard/wallet">
              <Wallet className="h-4 w-4" strokeWidth={1.75} />
              Wallet
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/settings">
              <Settings className="h-4 w-4" strokeWidth={1.75} />
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={handleLogout}>
          <LogOut className="h-4 w-4" strokeWidth={1.75} />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
