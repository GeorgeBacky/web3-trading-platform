"use client"

import type React from "react"
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"
import { toast } from "sonner"

/*
  Session + wallet state for the demo app.

  - Wallets are discovered with EIP-6963 (every injected wallet announces itself),
    falling back to window.ethereum for older extensions.
  - The session is persisted in localStorage so a refresh keeps you signed in.
  - connectWallet / signInWithEmail return whether they succeeded, so callers
    only navigate when sign-in actually worked.
*/

type EIP1193Provider = {
  request: (args: { method: string; params?: unknown[] | Record<string, unknown> }) => Promise<any>
  on?: (event: string, listener: (...args: any[]) => void) => void
  removeListener?: (event: string, listener: (...args: any[]) => void) => void
  isMetaMask?: boolean
  providers?: EIP1193Provider[]
}

type EIP6963ProviderDetail = {
  info: { uuid: string; name: string; icon: string; rdns: string }
  provider: EIP1193Provider
}

export type DetectedWallet = {
  id: string
  name: string
  icon: string | null
  provider: EIP1193Provider
}

type AuthMethod = "wallet" | "email" | "guest"

type Session = {
  method: AuthMethod
  address: string | null
  email?: string
  walletId?: string
  walletName?: string
}

type Status = "loading" | "signed-out" | "signed-in"

type WalletContextType = {
  status: Status
  method: AuthMethod | null
  address: string | null
  email: string | null
  walletName: string | null
  balance: string | null
  chainId: number | null
  chainName: string | null
  isConnected: boolean
  isConnecting: boolean
  isGuest: boolean
  wallets: DetectedWallet[]
  connectWallet: (walletId?: string) => Promise<boolean>
  signInWithEmail: (email: string, password: string) => Promise<boolean>
  connectAsGuest: () => void
  disconnectWallet: () => Promise<void>
  refreshBalance: () => Promise<void>
}

const WalletContext = createContext<WalletContextType | null>(null)

export const useWallet = () => {
  const ctx = useContext(WalletContext)
  if (!ctx) throw new Error("useWallet must be used inside <WalletProvider>")
  return ctx
}

const STORAGE_KEY = "tessera.session"
const GUEST_ADDRESS = "0x7a3b9c1e4d2f8a6b0c5d9e3f1a7b4c8d2e6f0a91"
const WEI_PER_ETH = BigInt("1000000000000000000")

const CHAINS: Record<number, { name: string; symbol: string }> = {
  1: { name: "Ethereum", symbol: "ETH" },
  10: { name: "Optimism", symbol: "ETH" },
  56: { name: "BNB Chain", symbol: "BNB" },
  137: { name: "Polygon", symbol: "POL" },
  8453: { name: "Base", symbol: "ETH" },
  42161: { name: "Arbitrum", symbol: "ETH" },
  43114: { name: "Avalanche", symbol: "AVAX" },
  11155111: { name: "Sepolia", symbol: "ETH" },
}

function formatBalance(hexWei: string, chainId: number | null) {
  const wei = BigInt(hexWei)
  const whole = wei / WEI_PER_ETH
  const fraction = (wei % WEI_PER_ETH).toString().padStart(18, "0").slice(0, 4)
  const symbol = (chainId && CHAINS[chainId]?.symbol) || "ETH"
  return `${whole.toString()}.${fraction} ${symbol}`
}

function walletErrorMessage(error: unknown) {
  const code = (error as { code?: number })?.code
  if (code === 4001) return "You declined the request in your wallet."
  if (code === -32002) return "A request is already open in your wallet. Open the extension to finish it."
  if (code === 4100) return "This site is not authorised in your wallet yet."
  return "Could not connect to your wallet. Please try again."
}

function readSession(): Session | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Session) : null
  } catch {
    return null
  }
}

function writeSession(session: Session | null) {
  try {
    if (session) localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
    else localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Storage can be unavailable (private mode). The session then lasts until reload.
  }
}

/** Legacy fallback for wallets that do not support EIP-6963. */
function legacyInjectedWallet(): DetectedWallet | null {
  if (typeof window === "undefined" || !window.ethereum) return null
  const eth = window.ethereum as EIP1193Provider
  const provider = eth.providers?.find((p) => p.isMetaMask) ?? eth
  return {
    id: "injected",
    name: provider.isMetaMask ? "MetaMask" : "Browser wallet",
    icon: null,
    provider,
  }
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<Status>("loading")
  const [session, setSession] = useState<Session | null>(null)
  const [balance, setBalance] = useState<string | null>(null)
  const [chainId, setChainId] = useState<number | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [wallets, setWallets] = useState<DetectedWallet[]>([])
  const [activeProvider, setActiveProvider] = useState<EIP1193Provider | null>(null)

  const walletsRef = useRef<Map<string, DetectedWallet>>(new Map())
  const signingOutRef = useRef(false)

  const commitSession = useCallback((next: Session | null) => {
    writeSession(next)
    setSession(next)
    setStatus(next ? "signed-in" : "signed-out")
    if (!next) {
      setBalance(null)
      setChainId(null)
      setActiveProvider(null)
    }
  }, [])

  const findWallet = useCallback((id?: string) => {
    const all = Array.from(walletsRef.current.values())
    if (id) return walletsRef.current.get(id) ?? null
    return all.find((w) => w.id === "io.metamask") ?? all[0] ?? null
  }, [])

  const loadChainAndBalance = useCallback(async (provider: EIP1193Provider, address: string) => {
    try {
      const chainHex: string = await provider.request({ method: "eth_chainId" })
      const id = Number.parseInt(chainHex, 16)
      setChainId(id)
      const wei: string = await provider.request({ method: "eth_getBalance", params: [address, "latest"] })
      setBalance(formatBalance(wei, id))
    } catch (error) {
      console.error("Failed to read balance:", error)
      setBalance(null)
    }
  }, [])

  // Discover wallets, then restore any saved session.
  useEffect(() => {
    const onAnnounce = (event: Event) => {
      const { info, provider } = (event as CustomEvent<EIP6963ProviderDetail>).detail
      if (walletsRef.current.has(info.rdns)) return
      walletsRef.current.set(info.rdns, { id: info.rdns, name: info.name, icon: info.icon, provider })
      setWallets(Array.from(walletsRef.current.values()))
    }

    window.addEventListener("eip6963:announceProvider", onAnnounce)
    window.dispatchEvent(new Event("eip6963:requestProvider"))

    let cancelled = false

    const restore = async () => {
      const saved = readSession()

      // Email and guest sessions do not depend on a wallet: restore them right away.
      if (saved?.method === "guest") {
        setSession(saved)
        setChainId(1)
        setBalance("1.2500 ETH")
        setStatus("signed-in")
      } else if (saved?.method === "email") {
        setSession(saved)
        setStatus("signed-in")
      }

      // Give extensions a moment to announce themselves.
      await new Promise((resolve) => setTimeout(resolve, 300))
      if (cancelled) return

      if (walletsRef.current.size === 0) {
        const legacy = legacyInjectedWallet()
        if (legacy) {
          walletsRef.current.set(legacy.id, legacy)
          setWallets([legacy])
        }
      }

      if (!saved) {
        setStatus("signed-out")
        return
      }
      if (saved.method !== "wallet") return

      // Wallet session: only keep it if the wallet still exposes an account to us.
      const wallet = findWallet(saved.walletId)
      if (!wallet) {
        commitSession(null)
        return
      }
      try {
        const accounts: string[] = await wallet.provider.request({ method: "eth_accounts" })
        if (cancelled) return
        if (accounts.length === 0) {
          commitSession(null)
          return
        }
        const next = { ...saved, address: accounts[0] }
        writeSession(next)
        setSession(next)
        setActiveProvider(wallet.provider)
        setStatus("signed-in")
        loadChainAndBalance(wallet.provider, accounts[0])
      } catch {
        commitSession(null)
      }
    }

    restore()

    return () => {
      cancelled = true
      window.removeEventListener("eip6963:announceProvider", onAnnounce)
    }
  }, [commitSession, findWallet, loadChainAndBalance])

  // Keep state in sync with the wallet: account switches, network switches, disconnects.
  useEffect(() => {
    if (!activeProvider?.on) return

    const onAccountsChanged = (accounts: string[]) => {
      if (signingOutRef.current) return
      if (accounts.length === 0) {
        commitSession(null)
        toast.info("Wallet disconnected")
        return
      }
      setSession((prev) => {
        if (!prev) return prev
        const next = { ...prev, address: accounts[0] }
        writeSession(next)
        return next
      })
      loadChainAndBalance(activeProvider, accounts[0])
    }

    const onChainChanged = () => {
      const current = readSession()
      if (current?.address) loadChainAndBalance(activeProvider, current.address)
    }

    const onDisconnect = () => {
      if (signingOutRef.current) return
      commitSession(null)
      toast.info("Wallet disconnected")
    }

    activeProvider.on("accountsChanged", onAccountsChanged)
    activeProvider.on("chainChanged", onChainChanged)
    activeProvider.on("disconnect", onDisconnect)

    return () => {
      activeProvider.removeListener?.("accountsChanged", onAccountsChanged)
      activeProvider.removeListener?.("chainChanged", onChainChanged)
      activeProvider.removeListener?.("disconnect", onDisconnect)
    }
  }, [activeProvider, commitSession, loadChainAndBalance])

  const connectWallet = useCallback(
    async (walletId?: string) => {
      const wallet = findWallet(walletId) ?? legacyInjectedWallet()
      if (!wallet) {
        toast.error("No browser wallet found", {
          description: "Install MetaMask or another Ethereum wallet extension, then reload this page.",
        })
        return false
      }

      setIsConnecting(true)
      try {
        const accounts: string[] = await wallet.provider.request({ method: "eth_requestAccounts" })
        if (!accounts?.length) {
          toast.error("Your wallet did not share an account.")
          return false
        }
        commitSession({ method: "wallet", address: accounts[0], walletId: wallet.id, walletName: wallet.name })
        setActiveProvider(wallet.provider)
        await loadChainAndBalance(wallet.provider, accounts[0])
        toast.success(`${wallet.name} connected`)
        return true
      } catch (error) {
        console.error("Failed to connect wallet:", error)
        toast.error(walletErrorMessage(error))
        return false
      } finally {
        setIsConnecting(false)
      }
    },
    [commitSession, findWallet, loadChainAndBalance],
  )

  const signInWithEmail = useCallback(
    async (email: string, password: string) => {
      if (!email || !password) {
        toast.error("Enter your email and password.")
        return false
      }
      setIsConnecting(true)
      // Demo mode: no backend, any credentials are accepted.
      await new Promise((resolve) => setTimeout(resolve, 600))
      commitSession({ method: "email", address: null, email })
      setIsConnecting(false)
      toast.success("Signed in")
      return true
    },
    [commitSession],
  )

  const connectAsGuest = useCallback(() => {
    commitSession({ method: "guest", address: GUEST_ADDRESS })
    setChainId(1)
    setBalance("1.2500 ETH")
  }, [commitSession])

  const disconnectWallet = useCallback(async () => {
    signingOutRef.current = true
    if (activeProvider) {
      // Supported by MetaMask and some others; ignored where unsupported.
      await activeProvider
        .request({ method: "wallet_revokePermissions", params: [{ eth_accounts: {} }] })
        .catch(() => {})
    }
    commitSession(null)
    signingOutRef.current = false
    toast.info("Signed out")
  }, [activeProvider, commitSession])

  const refreshBalance = useCallback(async () => {
    if (activeProvider && session?.address) await loadChainAndBalance(activeProvider, session.address)
  }, [activeProvider, session?.address, loadChainAndBalance])

  return (
    <WalletContext.Provider
      value={{
        status,
        method: session?.method ?? null,
        address: session?.address ?? null,
        email: session?.email ?? null,
        walletName: session?.walletName ?? null,
        balance,
        chainId,
        chainName: chainId ? (CHAINS[chainId]?.name ?? `Chain ${chainId}`) : null,
        isConnected: status === "signed-in",
        isConnecting,
        isGuest: session?.method === "guest",
        wallets,
        connectWallet,
        signInWithEmail,
        connectAsGuest,
        disconnectWallet,
        refreshBalance,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

declare global {
  interface Window {
    ethereum?: EIP1193Provider
  }
}
