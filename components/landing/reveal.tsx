"use client"

import type React from "react"
import { motion } from "motion/react"

const ease = [0.16, 1, 0.3, 1] as const

/** Fades content up once as it enters the viewport. Transforms are skipped under reduced motion (see MotionProvider). */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  as?: "div" | "li" | "section"
}) {
  const Component = motion[as]
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay, ease }}
    >
      {children}
    </Component>
  )
}
