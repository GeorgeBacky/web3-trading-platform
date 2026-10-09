"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, Check, Copy } from "lucide-react"
import { motion } from "motion/react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

const ease = [0.16, 1, 0.3, 1] as const

// TODO: replace with the real token contract address
const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000"

function ContractAddress() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(t)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS)
      setCopied(true)
      toast.success("Contract address copied")
    } catch {
      toast.error("Could not copy the address")
    }
  }

  return (
    <div className="inline-flex max-w-full items-center gap-3 rounded-lg border bg-background/80 py-1.5 pl-1.5 pr-1.5 backdrop-blur">
      <span className="shrink-0 rounded-md bg-brand px-2 py-1 text-xs font-semibold tracking-wide text-brand-foreground">
        CA
      </span>
      <code className="min-w-0 break-all font-mono text-[13px] text-foreground/90 sm:text-sm">{CONTRACT_ADDRESS}</code>
      <Button
        variant="ghost"
        size="icon"
        onClick={copy}
        aria-label="Copy contract address"
        title="Copy contract address"
        className="h-8 w-8 shrink-0"
      >
        {copied ? <Check className="text-gain" /> : <Copy />}
      </Button>
    </div>
  )
}

export function HeroCopy() {
  const item = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
  })

  return (
    <div className="max-w-xl">
      <motion.h1
        {...item(0)}
        className="text-[2.6rem] font-semibold leading-[1.04] tracking-tighter sm:text-[3.25rem] lg:text-[3.5rem]"
      >
        Your strategy, trading around the clock.
      </motion.h1>
      <motion.p {...item(0.08)} className="mt-6 max-w-[46ch] text-lg leading-relaxed text-muted-foreground">
        Deploy QuantConnect algorithms as bots, connect your wallet, and review every trade from one dashboard.
      </motion.p>
      <motion.div {...item(0.16)} className="mt-9 flex flex-wrap gap-3">
        <Button variant="brand" size="lg" asChild>
          <Link href="/login">
            Start trading
            <ArrowRight />
          </Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="#how-it-works">See how it works</Link>
        </Button>
      </motion.div>
      <motion.div {...item(0.24)} className="mt-6">
        <ContractAddress />
      </motion.div>
    </div>
  )
}
