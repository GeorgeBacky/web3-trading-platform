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

function ContractAddressButton() {
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
    <Button
      variant="outline"
      size="lg"
      onClick={copy}
      aria-label={`Copy contract address ${CONTRACT_ADDRESS}`}
      title={CONTRACT_ADDRESS}
    >
      <span className="text-muted-foreground">CA:</span>
      <span className="font-mono">
        {CONTRACT_ADDRESS.slice(0, 6)}…{CONTRACT_ADDRESS.slice(-4)}
      </span>
      {copied ? <Check className="text-gain" /> : <Copy />}
    </Button>
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
        <ContractAddressButton />
      </motion.div>
    </div>
  )
}
