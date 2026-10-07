"use client"

import type React from "react"
import { MotionConfig } from "motion/react"

/** Motion respects the visitor's reduced-motion setting everywhere (transforms are skipped). */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
