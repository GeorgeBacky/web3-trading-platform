"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Bot, ArrowLeft, Mail, Lock } from "lucide-react"
import Link from "next/link"
import { useWallet } from "@/components/wallet-provider"
import { toast } from "sonner"

export default function LoginPage() {
  const router = useRouter()
  const { connectWallet, isConnecting, connectAsGuest } = useWallet()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleGuestLogin = () => {
    connectAsGuest()
    toast.success("Logged in as guest")
    router.push("/dashboard")
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, you would validate credentials with your backend
      if (email && password) {
        toast.success("Logged in successfully")
        router.push("/dashboard")
      } else {
        toast.error("Please enter both email and password")
      }
    } catch (error) {
      toast.error("Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const handleWalletLogin = async (provider: "metamask" | "walletconnect") => {
    try {
      await connectWallet(provider)
      router.push("/dashboard")
    } catch (error) {
      console.error("Wallet login failed:", error)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8">
        <Button variant="ghost" className="gap-1">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </Link>

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <div className="flex justify-center">
            <Bot className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Sign in to your account to continue</p>
        </div>

        <Tabs defaultValue="wallet" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="wallet">Wallet</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
          </TabsList>

          <TabsContent value="wallet">
            <Card>
              <CardHeader>
                <CardTitle>Wallet Login</CardTitle>
                <CardDescription>Connect with your Web3 wallet</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" onClick={() => handleWalletLogin("metamask")} disabled={isConnecting}>
                  {isConnecting ? "Connecting..." : "Connect MetaMask"}
                </Button>
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => handleWalletLogin("walletconnect")}
                  disabled={isConnecting}
                >
                  {isConnecting ? "Connecting..." : "Connect WalletConnect"}
                </Button>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or</span>
                  </div>
                </div>
                <Button
                  className="w-full"
                  variant="secondary"
                  onClick={handleGuestLogin}
                >
                  Continue as Guest
                </Button>
              </CardContent>
              <CardFooter>
                <div className="text-center text-sm text-muted-foreground w-full">
                  By connecting your wallet, you agree to our{" "}
                  <Link href="#" className="underline underline-offset-4 hover:text-primary">
                    Terms of Service
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="email">
            <Card>
              <CardHeader>
                <CardTitle>Email Login</CardTitle>
                <CardDescription>Sign in with your email and password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        placeholder="name@example.com"
                        type="email"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link href="#" className="text-xs text-muted-foreground underline-offset-4 hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        className="pl-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full" onClick={() => toast.info("Google login coming soon")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M17.13 17.21c-.95.3-1.95.45-3.13.45-5.52 0-10-4.48-10-10s4.48-10 10-10c5.52 0 10 4.48 10 10 0 2.05-.62 3.94-1.67 5.52"></path>
                    <path d="M15.75 14.25l2.54 2.54C18.29 16.79 19 15 19 13"></path>
                  </svg>
                  Google
                </Button>
                <Button
                  className="w-full"
                  variant="secondary"
                  onClick={handleGuestLogin}
                >
                  Continue as Guest
                </Button>
              </CardContent>
              <CardFooter>
                <div className="text-center text-sm text-muted-foreground w-full">
                  Don&apos;t have an account?{" "}
                  <Link href="/register" className="underline underline-offset-4 hover:text-primary">
                    Sign up
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

