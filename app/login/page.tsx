"use client"

import type React from "react"
import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, ArrowRight, Loader2, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Logo, LogoMark } from "@/components/brand/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { useWallet } from "@/components/wallet-provider"
import { toast } from "sonner"

function safeNext(next: string | null) {
  return next && next.startsWith("/dashboard") ? next : "/dashboard"
}

function LoginForm() {
  const router = useRouter()
  const params = useSearchParams()
  const destination = safeNext(params.get("next"))
  const { status, wallets, isConnecting, connectWallet, signInWithEmail, connectAsGuest } = useWallet()

  const [pendingWallet, setPendingWallet] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [formError, setFormError] = useState<string | null>(null)

  // Already signed in (or just signed in): go straight to the app.
  useEffect(() => {
    if (status === "signed-in") router.replace(destination)
  }, [status, destination, router])

  const handleWallet = async (walletId: string) => {
    setPendingWallet(walletId)
    const ok = await connectWallet(walletId)
    setPendingWallet(null)
    if (ok) router.replace(destination)
  }

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setFormError("Enter a valid email address.")
      return
    }
    if (password.length < 6) {
      setFormError("Password must be at least 6 characters.")
      return
    }
    const ok = await signInWithEmail(email, password)
    if (ok) router.replace(destination)
  }

  const handleGuest = () => {
    connectAsGuest()
    toast.success("Exploring as a guest with sample data")
    router.replace(destination)
  }

  const detecting = status === "loading"

  return (
    <div className="w-full max-w-[400px]">
      <div className="mb-8 lg:hidden">
        <Logo />
      </div>
      <h1 className="text-3xl font-semibold tracking-tight">Sign in</h1>
      <p className="mt-2 text-[15px] text-muted-foreground">Connect a wallet or use your email to open the dashboard.</p>

      <Tabs defaultValue="wallet" className="mt-8">
        <TabsList className="grid h-11 w-full grid-cols-2">
          <TabsTrigger value="wallet" className="h-9">
            Wallet
          </TabsTrigger>
          <TabsTrigger value="email" className="h-9">
            Email
          </TabsTrigger>
        </TabsList>

        <TabsContent value="wallet" className="mt-6 space-y-3">
          {detecting ? (
            <div className="space-y-3" aria-label="Looking for wallets">
              {[0, 1].map((i) => (
                <div key={i} className="h-14 animate-pulse rounded-md bg-muted" />
              ))}
            </div>
          ) : wallets.length > 0 ? (
            wallets.map((wallet) => (
              <button
                key={wallet.id}
                type="button"
                onClick={() => handleWallet(wallet.id)}
                disabled={isConnecting}
                className="group flex h-14 w-full items-center gap-3 rounded-md border bg-card px-4 text-left transition-[border-color,transform] duration-150 hover:border-foreground/30 active:scale-[0.99] disabled:opacity-60"
              >
                {wallet.icon ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={wallet.icon} alt="" className="h-7 w-7 rounded-sm" />
                ) : (
                  <span className="grid h-7 w-7 place-items-center rounded-sm bg-muted">
                    <Wallet className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                )}
                <span className="flex-1 font-medium">{wallet.name}</span>
                {pendingWallet === wallet.id ? (
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Check your wallet
                  </span>
                ) : (
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                )}
              </button>
            ))
          ) : (
            <div className="rounded-md border border-dashed p-5">
              <p className="font-medium">No browser wallet found</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Install a wallet extension such as MetaMask, then reload this page.
              </p>
              <Button variant="outline" size="sm" className="mt-4" asChild>
                <a href="https://metamask.io/download/" target="_blank" rel="noreferrer">
                  Get MetaMask
                </a>
              </Button>
            </div>
          )}

          <div className="flex h-14 w-full items-center gap-3 rounded-md border border-dashed px-4 text-muted-foreground">
            <span className="grid h-7 w-7 place-items-center rounded-sm bg-muted">
              <span
                className="mask-logo h-4 w-4"
                style={{ ["--logo" as string]: "url(https://cdn.simpleicons.org/walletconnect)" }}
              />
            </span>
            <span className="flex-1">WalletConnect</span>
            <span className="text-xs">Coming soon</span>
          </div>
        </TabsContent>

        <TabsContent value="email" className="mt-6">
          <form onSubmit={handleEmail} className="space-y-5" noValidate>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                className="h-11"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!formError}
                aria-describedby={formError ? "form-error" : undefined}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                className="h-11"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={!!formError}
                aria-describedby={formError ? "form-error" : "password-help"}
              />
              {formError ? (
                <p id="form-error" className="text-sm text-destructive">
                  {formError}
                </p>
              ) : (
                <p id="password-help" className="text-sm text-muted-foreground">
                  Demo mode accepts any email and a password of 6+ characters.
                </p>
              )}
            </div>
            <Button type="submit" variant="brand" size="lg" className="w-full" disabled={isConnecting}>
              {isConnecting ? <Loader2 className="animate-spin" /> : null}
              {isConnecting ? "Signing in" : "Sign in"}
            </Button>
          </form>
        </TabsContent>
      </Tabs>

      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or
        <span className="h-px flex-1 bg-border" />
      </div>

      <Button variant="outline" size="lg" className="w-full" onClick={handleGuest} disabled={isConnecting}>
        Explore with sample data
      </Button>

      <p className="mt-8 text-sm text-muted-foreground">
        By continuing you agree to the{" "}
        <Link href="#" className="text-foreground underline underline-offset-4">
          Terms of Service
        </Link>
        .
      </p>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="grid min-h-[100dvh] lg:grid-cols-[1.1fr_1fr]">
      <aside className="tile-grid relative hidden flex-col justify-between border-r p-10 lg:flex">
        <Logo />
        <div className="max-w-md">
          <LogoMark className="h-12 w-12" />
          <p className="mt-8 text-4xl font-semibold leading-[1.1] tracking-tight">
            Every bot, every trade, one ledger you can read.
          </p>
          <p className="mt-4 text-muted-foreground">
            Sign in to start, pause, and review your strategies from anywhere.
          </p>
        </div>
      </aside>

      <main className="relative flex flex-col px-4 py-6 sm:px-8">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" asChild className="-ml-2">
            <Link href="/">
              <ArrowLeft />
              Back
            </Link>
          </Button>
          <ThemeToggle />
        </div>
        <div className="flex flex-1 items-center justify-center py-10">
          <Suspense fallback={<div className="h-[480px] w-full max-w-[400px] animate-pulse rounded-lg bg-muted" />}>
            <LoginForm />
          </Suspense>
        </div>
      </main>
    </div>
  )
}
