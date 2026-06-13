'use client'

import { useEffect, useRef, useState } from 'react'
import { animate } from 'framer-motion'

/**
 * Animate a number from 0 → `target` once (on mount / when target changes).
 * Used for the hero figure so the percentage "ticks up" like an instrument.
 *
 * `enabled` lets the parent gate the animation (e.g. until config has loaded),
 * and `reduce` short-circuits to the final value for users who prefer no motion.
 */
export function useCountUp(target: number, opts?: { duration?: number; enabled?: boolean; reduce?: boolean }) {
  const { duration = 1.7, enabled = true, reduce = false } = opts ?? {}
  const [value, setValue] = useState(0)
  const ref = useRef(0)

  useEffect(() => {
    if (!enabled) return
    if (reduce) {
      setValue(target)
      ref.current = target
      return
    }
    const controls = animate(ref.current, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        ref.current = v
        setValue(v)
      },
    })
    return () => controls.stop()
  }, [target, duration, enabled, reduce])

  return value
}
