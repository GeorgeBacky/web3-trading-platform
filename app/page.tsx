import Image from "next/image"
import Link from "next/link"
import { ArrowRight, KeyRound, Link2, LockKeyhole, Rocket, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/brand/logo"
import { SiteHeader } from "@/components/landing/site-header"
import { HeroCopy } from "@/components/landing/hero-copy"
import { HeroPreview } from "@/components/landing/hero-preview"
import { Reveal } from "@/components/landing/reveal"
import { StrategyExplorer } from "@/components/landing/strategy-explorer"
import { cn } from "@/lib/utils"

const networks = [
  { slug: "ethereum", name: "Ethereum" },
  { slug: "bitcoin", name: "Bitcoin" },
  { slug: "solana", name: "Solana" },
  { slug: "polygon", name: "Polygon" },
  { slug: "optimism", name: "Optimism" },
  { slug: "chainlink", name: "Chainlink" },
  { slug: "tether", name: "Tether" },
  { slug: "binance", name: "Binance" },
  { slug: "walletconnect", name: "WalletConnect" },
]

const steps = [
  {
    icon: Link2,
    title: "Connect",
    body: "Sign in with MetaMask or any browser wallet. Your keys stay in the extension.",
  },
  {
    icon: SlidersHorizontal,
    title: "Choose",
    body: "Pick a pre-built QuantConnect algorithm or bring your own, then set pairs and risk limits.",
  },
  {
    icon: Rocket,
    title: "Launch",
    body: "Start the bot and follow each fill, balance change, and return figure as it happens.",
  },
]



function SectionHeading({ eyebrow, title, body }: { eyebrow?: string; title: string; body?: string }) {
  return (
    <div className="max-w-2xl">
      {eyebrow && <p className="mb-4 text-sm font-medium text-brand-ink">{eyebrow}</p>}
      <h2 className="text-3xl font-semibold leading-[1.08] tracking-tight md:text-[2.75rem]">{title}</h2>
      {body && <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-muted-foreground">{body}</p>}
    </div>
  )
}


export default function Home() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="tile-grid absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 pb-20 pt-14 sm:px-6 md:pt-20 lg:min-h-[calc(100dvh-4rem)] lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-8 lg:pb-24">
            <HeroCopy />
            <HeroPreview />
          </div>
        </section>

        {/* Networks and assets */}
        <section className="border-y bg-secondary/40 py-8" aria-label="Supported networks and assets">
          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
            <div className="animate-marquee flex w-max gap-16 pr-16">
              {[...networks, ...networks].map((n, i) => (
                <span
                  key={`${n.slug}-${i}`}
                  role="img"
                  aria-label={i < networks.length ? n.name : undefined}
                  aria-hidden={i >= networks.length ? true : undefined}
                  className="mask-logo block h-7 w-7 text-muted-foreground"
                  style={{ ["--logo" as string]: `url(https://cdn.simpleicons.org/${n.slug})` }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="scroll-mt-16 py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <SectionHeading eyebrow="Features" title="One place to run, watch, and tune your bots." />
            </Reveal>

            <div className="mt-14 grid gap-4 md:grid-cols-6">
              <Reveal className="flex min-h-[260px] flex-col justify-between rounded-lg bg-brand p-7 text-brand-foreground md:col-span-2">
                <KeyRound className="h-7 w-7" strokeWidth={1.5} />
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">Wallet sign-in</h3>
                  <p className="mt-2 text-[15px] leading-relaxed opacity-80">
                    MetaMask and any browser wallet that supports EIP-6963. No passwords to leak.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.06} className="tile-grid relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-lg border p-7 md:col-span-4">
                <div className="flex flex-wrap gap-2">
                  {["Momentum", "Mean reversion", "Dollar cost averaging", "Breakout", "Grid", "Your own algorithm"].map(
                    (s, i) => (
                      <span
                        key={s}
                        className={cn(
                          "rounded-sm border bg-background px-3 py-1.5 font-mono text-[13px]",
                          i === 5 && "border-dashed text-muted-foreground",
                        )}
                      >
                        {s}
                      </span>
                    ),
                  )}
                </div>
                <div className="mt-10 max-w-md rounded-md bg-background/90 py-1">
                  <h3 className="text-xl font-semibold tracking-tight">QuantConnect trading bots</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                    Turn any QuantConnect algorithm into a bot. Set pairs, position size, and limits per strategy.
                  </p>
                </div>
              </Reveal>

              <Reveal className="flex min-h-[240px] flex-col justify-between rounded-lg border bg-card p-7 md:col-span-3">
                <dl className="grid grid-cols-3 gap-4">
                  {[
                    ["Return", "+24.5%"],
                    ["Win rate", "68%"],
                    ["Profit factor", "1.85"],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-xs text-muted-foreground">{k}</dt>
                      <dd className="mt-1 font-mono text-2xl font-medium tracking-tight tabular">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div>
                  <h3 className="mt-8 text-xl font-semibold tracking-tight">Analytics that answer questions</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                    Profit, drawdown, and win rate for each bot. Figures above are sample data.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.06} className="flex min-h-[240px] flex-col justify-between rounded-lg border bg-card p-7 md:col-span-3">
                <ul className="space-y-2 font-mono text-sm tabular">
                  {[
                    ["BTC", "67,412.08", "+1.8%"],
                    ["ETH", "3,104.55", "+2.4%"],
                    ["SOL", "151.92", "-0.7%"],
                  ].map(([sym, price, chg]) => (
                    <li key={sym} className="flex items-center justify-between">
                      <span>{sym}</span>
                      <span className="text-muted-foreground">{price}</span>
                      <span className={chg.startsWith("-") ? "text-loss" : "text-gain"}>{chg}</span>
                    </li>
                  ))}
                </ul>
                <div>
                  <h3 className="mt-8 text-xl font-semibold tracking-tight">Market context</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                    Prices and trends next to your positions, so you can see why a bot acted. Prices shown are samples.
                  </p>
                </div>
              </Reveal>

              <Reveal className="flex min-h-[220px] flex-col justify-between rounded-lg bg-secondary p-7 md:col-span-4">
                <LockKeyhole className="h-7 w-7 text-brand-ink" strokeWidth={1.5} />
                <div className="max-w-lg">
                  <h3 className="text-xl font-semibold tracking-tight">Security first</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                    Your keys stay in your wallet. Exchange API secrets are stored encrypted and never shown again.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.06} className="flex min-h-[220px] flex-col justify-between rounded-lg border bg-card p-7 md:col-span-2">
                <code className="block rounded-sm bg-secondary px-3 py-2 font-mono text-[13px]">GET /v1/bots</code>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">API access</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                    Pull bots, trades, and balances into your own tools.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="scroll-mt-16 border-t bg-secondary/30 py-24 md:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:gap-24 lg:px-8">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading
                title="From wallet to running bot in three moves."
                body="No servers to manage. Tessera hosts the bot and keeps the record."
              />
            </div>
            <ol className="grid gap-4">
              {steps.map((step, i) => (
                <Reveal as="li" key={step.title} delay={i * 0.06} className="flex gap-5 rounded-lg border bg-background p-6 md:p-8">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-brand text-brand-foreground">
                    <step.icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">{step.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{step.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* Product */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold leading-[1.08] tracking-tight md:text-[2.75rem]">
                Every bot and balance on one screen.
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="mt-14">
              <div className="overflow-hidden rounded-lg border bg-card p-1.5 shadow-[0_40px_80px_-40px_hsl(240_10%_6%/0.45)]">
                <Image
                  src="/product/dashboard-light.png"
                  alt="Tessera dashboard showing portfolio value, recent trades, wallet balance, and running bots"
                  width={2560}
                  height={1600}
                  className="rounded-md dark:hidden"
                />
                <Image
                  src="/product/dashboard-dark.png"
                  alt="Tessera dashboard showing portfolio value, recent trades, wallet balance, and running bots"
                  width={2560}
                  height={1600}
                  className="hidden rounded-md dark:block"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Strategy explorer */}
        <section id="strategies" className="scroll-mt-16 border-t bg-secondary/30 py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <SectionHeading
                eyebrow="Strategies"
                title="Pick a strategy. Watch it work."
                body="Compare each algorithm against simply holding, over the same twelve months of sample data."
              />
            </Reveal>
            <Reveal delay={0.08} className="mt-14">
              <StrategyExplorer />
            </Reveal>
          </div>
        </section>


        {/* Closing call to action */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="tile-grid relative overflow-hidden rounded-lg border p-8 md:p-16">
              <div className="grid items-end gap-10 md:grid-cols-[1.5fr_auto]">
                <h2 className="max-w-2xl text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
                  Put your first strategy to work today.
                </h2>
                <Button variant="brand" size="lg" asChild>
                  <Link href="/login">
                    Start trading
                    <ArrowRight />
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr_1fr] lg:px-8">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Automated crypto trading with QuantConnect strategies and wallet sign-in.
            </p>
          </div>
          {[
            { title: "Product", links: [["Features", "#features"], ["How it works", "#how-it-works"], ["Dashboard", "/dashboard"]] },
            { title: "Company", links: [["About", "#"], ["Blog", "#"], ["Careers", "#"]] },
            { title: "Legal", links: [["Privacy", "#"], ["Terms", "#"], ["Cookies", "#"]] },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-sm font-medium">{col.title}</p>
              <ul className="mt-4 space-y-3">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t">
          <p className="mx-auto max-w-7xl px-4 py-6 text-sm text-muted-foreground sm:px-6 lg:px-8">
            © 2026 Tessera. Trading crypto carries risk. Past performance does not guarantee future results.
          </p>
        </div>
      </footer>
    </div>
  )
}
