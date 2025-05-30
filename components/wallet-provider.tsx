"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { toast } from "sonner"

type WalletContextType = {
  address: string | null
  balance: string | null
  isConnected: boolean
  isConnecting: boolean
  connectWallet: (provider: "metamask" | "walletconnect") => Promise<void>
  disconnectWallet: () => void
  connectAsGuest: () => void
}

const WalletContext = createContext<WalletContextType>({
  address: null,
  balance: null,
  isConnected: false,
  isConnecting: false,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  connectAsGuest: () => {},
})

export const useWallet = () => useContext(WalletContext)

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)

  // Check if wallet is already connected on mount
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window !== "undefined" && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: "eth_accounts" })
          if (accounts.length > 0) {
            setAddress(accounts[0])
            setIsConnected(true)

            // Get balance
            const balance = await window.ethereum.request({
              method: "eth_getBalance",
              params: [accounts[0], "latest"],
            })
            setBalance(Number.parseInt(balance, 16) / 1e18 + " ETH")
          }
        } catch (error) {
          console.error("Failed to check wallet connection:", error)
        }
      }
    }

    checkConnection()
  }, [])

  // Listen for account changes
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected their wallet
          disconnectWallet()
        } else {
          setAddress(accounts[0])
          setIsConnected(true)
        }
      }

      window.ethereum.on("accountsChanged", handleAccountsChanged)

      return () => {
        window?.ethereum?.removeListener("accountsChanged", handleAccountsChanged)
      }
    }
  }, [])

  const connectWallet = async (provider: "metamask" | "walletconnect") => {
    setIsConnecting(true)

    try {
      if (provider === "metamask") {
        if (typeof window !== "undefined" && window.ethereum) {
          const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
          setAddress(accounts[0])
          setIsConnected(true)

          // Get balance
          const balance = await window.ethereum.request({
            method: "eth_getBalance",
            params: [accounts[0], "latest"],
          })
          setBalance(Number.parseInt(balance, 16) / 1e18 + " ETH")

          toast.success("Wallet connected successfully")
        } else {
          toast.error("MetaMask is not installed")
        }
      } else if (provider === "walletconnect") {
        // WalletConnect implementation would go here
        toast.info("WalletConnect integration coming soon")
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      toast.error("Failed to connect wallet")
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setAddress(null)
    setBalance(null)
    setIsConnected(false)
    toast.info("Wallet disconnected")
  }

  const connectAsGuest = () => {
    setAddress("0xGuest123456789")
    setBalance("0.00 ETH")
    setIsConnected(true)
  }

  return (
    <WalletContext.Provider
      value={{
        address,
        balance,
        isConnected,
        isConnecting,
        connectWallet,
        disconnectWallet,
        connectAsGuest,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

// Add TypeScript support for window.ethereum
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>
      on: (event: string, callback: (...args: any[]) => void) => void
      removeListener: (event: string, callback: (...args: any[]) => void) => void
    }
  }
}

