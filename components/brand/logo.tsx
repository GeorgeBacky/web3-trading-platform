import Link from "next/link"
import { cn } from "@/lib/utils"

/** Tessera mark: a 2x2 set of tiles, one lit in the brand accent. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("h-6 w-6", className)}>
      <rect x="2" y="2" width="9" height="9" rx="2" className="fill-current" />
      <rect x="13" y="2" width="9" height="9" rx="2" className="fill-brand" />
      <rect x="2" y="13" width="9" height="9" rx="2" className="fill-current opacity-40" />
      <rect x="13" y="13" width="9" height="9" rx="2" className="fill-current" />
    </svg>
  )
}

export function Logo({ href = "/", className }: { href?: string; className?: string }) {
  return (
    <Link
      href={href}
      className={cn("inline-flex items-center gap-2.5 font-semibold tracking-tight text-foreground", className)}
    >
      <LogoMark />
      <span className="text-[17px]">Tessera</span>
    </Link>
  )
}
