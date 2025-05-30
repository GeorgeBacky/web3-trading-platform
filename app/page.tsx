import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import {
  ArrowRight,
  Bot,
  LineChart,
  Wallet,
  Zap,
  TrendingUp,
  Shield,
  Code,
  ChevronRight,
  Star,
  CheckCircle2,
} from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Bot className="h-6 w-6 text-primary" />
            <span>InfluxLabs</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
              How It Works
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register">
              <Button className="gradient-bg hover:opacity-90 transition-opacity">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 hero-pattern relative overflow-hidden">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-4">
                    Web3 Trading Platform
                  </div>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                    <span className="gradient-text">Algorithmic Trading</span> Made Simple
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Deploy, manage, and monitor your cryptocurrency trading bots with our intuitive platform. Seamlessly
                    integrate with QuantConnect algorithms.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/register">
                    <Button size="lg" className="gradient-bg hover:opacity-90 transition-opacity gap-1">
                      Start Trading <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#how-it-works">
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center gap-4 mt-6">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="inline-block h-8 w-8 rounded-full border-2 border-background bg-muted overflow-hidden"
                      >
                        <div className="h-full w-full bg-primary/20"></div>
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">1,200+</span> traders already using InfluxLabs
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[500px] aspect-square">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-sm animate-pulse-slow"></div>
                  <div className="absolute inset-4 rounded-xl border border-primary/20 bg-background/80 backdrop-blur-md shadow-xl overflow-hidden">
                    <div className="p-6 h-full flex flex-col">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                          <Bot className="h-5 w-5 text-primary" />
                          <span className="font-semibold">Trading Dashboard</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          <span className="text-xs text-muted-foreground">Live</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="rounded-lg bg-muted p-4">
                          <div className="text-xs text-muted-foreground mb-1">Portfolio Value</div>
                          <div className="text-xl font-bold">$45,231.89</div>
                          <div className="text-xs text-green-500">+12.5%</div>
                        </div>
                        <div className="rounded-lg bg-muted p-4">
                          <div className="text-xs text-muted-foreground mb-1">Active Bots</div>
                          <div className="text-xl font-bold">3</div>
                          <div className="text-xs text-green-500">All running</div>
                        </div>
                      </div>
                      <div className="flex-1 rounded-lg bg-muted p-4 mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-xs text-muted-foreground">Performance</div>
                          <div className="text-xs text-primary">Last 30 days</div>
                        </div>
                        <div className="h-24 flex items-end gap-1">
                          {[30, 45, 25, 60, 35, 50, 40, 55, 45, 60, 75, 65].map((height, i) => (
                            <div
                              key={i}
                              className="flex-1 bg-primary/20 rounded-t-sm"
                              style={{ height: `${height}%` }}
                            ></div>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1 gradient-bg hover:opacity-90 transition-opacity">
                          <Zap className="h-3 w-3 mr-1" /> New Bot
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <LineChart className="h-3 w-3 mr-1" /> Analytics
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Everything You Need to <span className="gradient-text">Trade Smarter</span>
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Our platform combines powerful trading tools with an intuitive interface to help you maximize your
                  crypto investments.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 mb-4">
                    <Wallet className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Wallet Integration</CardTitle>
                  <CardDescription>Connect with MetaMask, WalletConnect, or use Google Authentication</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Securely manage your assets with our seamless wallet integration. Monitor balances and transactions
                    in real-time.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="#" className="text-primary flex items-center text-sm">
                    Learn more <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardFooter>
              </Card>
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 mb-4">
                    <Bot className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Trading Bots</CardTitle>
                  <CardDescription>Deploy and manage QuantConnect algorithms</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Configure trading pairs, risk parameters, and operational settings with our intuitive interface.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="#" className="text-primary flex items-center text-sm">
                    Learn more <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardFooter>
              </Card>
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 mb-4">
                    <LineChart className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Advanced Analytics</CardTitle>
                  <CardDescription>Track performance with detailed metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Visualize profits, losses, ROI, and other key metrics to optimize your trading strategies.</p>
                </CardContent>
                <CardFooter>
                  <Link href="#" className="text-primary flex items-center text-sm">
                    Learn more <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardFooter>
              </Card>
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 mb-4">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Market Insights</CardTitle>
                  <CardDescription>Real-time data and market analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Stay informed with real-time market data, trends, and insights to make better trading decisions.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="#" className="text-primary flex items-center text-sm">
                    Learn more <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardFooter>
              </Card>
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 mb-4">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Security First</CardTitle>
                  <CardDescription>Enterprise-grade security protocols</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Your assets and data are protected with industry-leading security measures and encryption.</p>
                </CardContent>
                <CardFooter>
                  <Link href="#" className="text-primary flex items-center text-sm">
                    Learn more <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardFooter>
              </Card>
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 mb-4">
                    <Code className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>API Access</CardTitle>
                  <CardDescription>Integrate with your existing systems</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Connect InfluxLabs with your existing tools and systems through our comprehensive API.</p>
                </CardContent>
                <CardFooter>
                  <Link href="#" className="text-primary flex items-center text-sm">
                    Learn more <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">How It Works</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Start Trading in <span className="gradient-text">Three Simple Steps</span>
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Our platform makes algorithmic trading accessible to everyone, regardless of technical expertise.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground text-xl font-bold">
                    1
                  </div>
                  <div className="absolute top-0 right-0 -mr-2 -mt-2 w-6 h-6 rounded-full bg-background flex items-center justify-center">
                    <Wallet className="h-3 w-3 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Connect Your Wallet</h3>
                <p className="text-muted-foreground">
                  Securely connect your crypto wallet to our platform using MetaMask, WalletConnect, or create an
                  account with Google.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground text-xl font-bold">
                    2
                  </div>
                  <div className="absolute top-0 right-0 -mr-2 -mt-2 w-6 h-6 rounded-full bg-background flex items-center justify-center">
                    <Bot className="h-3 w-3 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Choose Your Strategy</h3>
                <p className="text-muted-foreground">
                  Select from our library of pre-built QuantConnect algorithms or customize your own trading strategy.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground text-xl font-bold">
                    3
                  </div>
                  <div className="absolute top-0 right-0 -mr-2 -mt-2 w-6 h-6 rounded-full bg-background flex items-center justify-center">
                    <Zap className="h-3 w-3 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Launch & Monitor</h3>
                <p className="text-muted-foreground">
                  Deploy your trading bot with one click and monitor its performance in real-time through our intuitive
                  dashboard.
                </p>
              </div>
            </div>
            <div className="flex justify-center mt-12">
              <Link href="/register">
                <Button size="lg" className="gradient-bg hover:opacity-90 transition-opacity">
                  Get Started Now
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Testimonials</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Trusted by <span className="gradient-text">Traders Worldwide</span>
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  See what our users have to say about their experience with InfluxLabs.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">"Revolutionized my trading strategy"</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    "InfluxLabs has completely transformed how I approach crypto trading. The automated bots have
                    consistently outperformed my manual trading, and the analytics help me understand why."
                  </p>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-medium">JD</span>
                    </div>
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm text-muted-foreground">Crypto Trader</p>
                    </div>
                  </div>
                </CardFooter>
              </Card>
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">"Finally, trading that fits my schedule"</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    "As a full-time professional, I never had time to actively trade. InfluxLabs's automated bots execute
                    my strategies 24/7, and I just check in when I have time. Game changer!"
                  </p>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-medium">JS</span>
                    </div>
                    <div>
                      <p className="font-medium">Jane Smith</p>
                      <p className="text-sm text-muted-foreground">Software Engineer</p>
                    </div>
                  </div>
                </CardFooter>
              </Card>
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">"The analytics are incredible"</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    "What sets InfluxLabs apart is the depth of analytics. I can see exactly how my bots are performing
                    and make data-driven decisions to optimize my strategies."
                  </p>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-medium">RJ</span>
                    </div>
                    <div>
                      <p className="font-medium">Robert Johnson</p>
                      <p className="text-sm text-muted-foreground">Data Analyst</p>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Pricing</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Simple, Transparent <span className="gradient-text">Pricing</span>
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Choose the plan that fits your trading needs. No hidden fees or surprises.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-3">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Starter</CardTitle>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-3xl font-bold">$29</span>
                    <span className="ml-1 text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {["2 Active Bots", "Basic Analytics", "Email Support", "Standard API Access"].map((feature) => (
                      <li key={feature} className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Get Started</Button>
                </CardFooter>
              </Card>
              <Card className="border-none shadow-xl relative">
                <div className="absolute -top-4 left-0 right-0 mx-auto w-fit px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                  Most Popular
                </div>
                <CardHeader>
                  <CardTitle>Professional</CardTitle>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-3xl font-bold">$79</span>
                    <span className="ml-1 text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      "5 Active Bots",
                      "Advanced Analytics",
                      "Priority Support",
                      "Enhanced API Access",
                      "Custom Strategies",
                      "Performance Reports",
                    ].map((feature) => (
                      <li key={feature} className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full gradient-bg hover:opacity-90 transition-opacity">Get Started</Button>
                </CardFooter>
              </Card>
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-3xl font-bold">$199</span>
                    <span className="ml-1 text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      "Unlimited Active Bots",
                      "Premium Analytics",
                      "24/7 Dedicated Support",
                      "Full API Access",
                      "Custom Strategies",
                      "Performance Reports",
                      "White-label Options",
                      "Team Collaboration",
                    ].map((feature) => (
                      <li key={feature} className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Get Started</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to <span className="gradient-text">Revolutionize</span> Your Trading?
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Join thousands of traders who are already using InfluxLabs to automate their crypto trading strategies.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Link href="/register">
                  <Button size="lg" className="gradient-bg hover:opacity-90 transition-opacity">
                    Get Started for Free
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 font-bold text-xl mb-4">
                <Bot className="h-6 w-6 text-primary" />
                <span>InfluxLabs</span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-xs">
                Empowering traders with algorithmic trading solutions for the cryptocurrency market.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#features" className="text-muted-foreground hover:text-primary">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-muted-foreground hover:text-primary">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    API
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Cookies
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Licenses
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">© 2025 InfluxLabs. All rights reserved.</p>
            <p className="text-sm text-muted-foreground mt-4 md:mt-0">Made with ❤️ for crypto traders worldwide</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

