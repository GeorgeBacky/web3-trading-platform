"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { useWallet } from "@/components/wallet-provider"
import { shortAddress } from "@/components/user-nav"
import { PageHeader } from "@/components/stat-card"

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { address, email, walletName, isGuest, isConnecting, connectWallet, disconnectWallet } = useWallet()

  const handleSave = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast.success("Settings saved successfully")
    }, 1000)
  }

  return (
    <div>
      <PageHeader title="Settings" description="Account, trading defaults, notifications, and API keys." />

      <Tabs defaultValue="account" className="max-w-3xl space-y-4">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="trading">Trading</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Update your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue={isGuest ? "Guest" : ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={email ?? ""} />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save changes"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Connected Wallets</CardTitle>
              <CardDescription>Manage your connected wallets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {address ? (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{isGuest ? "Sample wallet" : (walletName ?? "Wallet")}</p>
                    <p className="font-mono text-sm text-muted-foreground">{shortAddress(address)}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => disconnectWallet()}>
                    Disconnect
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm text-muted-foreground">No wallet is connected.</p>
                  <Button variant="outline" size="sm" onClick={() => connectWallet()} disabled={isConnecting}>
                    Connect a wallet
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Delete Account</CardTitle>
              <CardDescription>Permanently delete your account and all data</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This action cannot be undone. All your data will be permanently deleted.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="destructive" onClick={() => toast.error("This feature is disabled in the demo")}>
                Delete account
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="trading" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Trading Preferences</CardTitle>
              <CardDescription>Configure your trading settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Default Trading Pair</Label>
                  <p className="text-sm text-muted-foreground">Set your default trading pair</p>
                </div>
                <div className="w-[180px]">
                  <Input defaultValue="BTC/USDT" />
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Risk Level</Label>
                  <p className="text-sm text-muted-foreground">Set your default risk level for new bots</p>
                </div>
                <div className="w-[180px]">
                  <Input defaultValue="Medium" />
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-Start Bots</Label>
                  <p className="text-sm text-muted-foreground">Automatically start bots after creation</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Trade Notifications</Label>
                  <p className="text-sm text-muted-foreground">Get notified when a trade is executed</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Bot Status Changes</Label>
                  <p className="text-sm text-muted-foreground">Get notified when a bot changes status</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage your API keys for external services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="quantconnect-api">QuantConnect API Key</Label>
                <Input id="quantconnect-api" type="password" placeholder="Not set" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantconnect-secret">QuantConnect Secret Key</Label>
                <Input id="quantconnect-secret" type="password" placeholder="Not set" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

