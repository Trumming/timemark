'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LinearProgressProps {
  percentage: number
  primaryColor: string
  backgroundColor: string
  className?: string
}

/**
 * Minimal linear instrument: a thin track, a single accent fill, and
 * monospaced tick marks. No gloss, no particles — the number lives in the hero.
 */
export const LinearProgress = memo(function LinearProgress({
  percentage,
  primaryColor,
  backgroundColor,
  className,
}: LinearProgressProps) {
  return (
    <div className={cn('w-full', className)}>
      <div
        className="relative h-2.5 w-full overflow-hidden rounded-full"
        style={{ backgroundColor }}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: primaryColor }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Tick scale */}
      <div className="mt-3 flex justify-between">
        {[0, 25, 50, 75, 100].map((mark) => (
          <span
            key={mark}
            className="num font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70"
          >
            {mark}
          </span>
        ))}
      </div>
    </div>
  )
})
