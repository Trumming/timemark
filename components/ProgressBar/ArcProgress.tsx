'use client'

import { memo, useMemo, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ArcProgressProps {
  percentage: number
  primaryColor: string
  backgroundColor: string
  size?: number
  strokeWidth?: number
  children?: ReactNode
  className?: string
}

/**
 * Minimal gauge arc (240°). Center content (the hero number) passed as children.
 */
export const ArcProgress = memo(function ArcProgress({
  percentage,
  primaryColor,
  backgroundColor,
  size = 260,
  strokeWidth = 3,
  children,
  className,
}: ArcProgressProps) {
  const { arcLength, offset, bgArcPath } = useMemo(() => {
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const len = (circumference * 240) / 360
    const startAngle = 150
    const endAngle = 390

    const polarToCartesian = (
      centerX: number,
      centerY: number,
      r: number,
      angleInDegrees: number
    ) => {
      const angleInRadians = ((angleInDegrees - 180) * Math.PI) / 180.0
      return {
        x: centerX + r * Math.cos(angleInRadians),
        y: centerY + r * Math.sin(angleInRadians),
      }
    }

    const describeArc = (
      x: number,
      y: number,
      r: number,
      a0: number,
      a1: number
    ) => {
      const start = polarToCartesian(x, y, r, a1)
      const end = polarToCartesian(x, y, r, a0)
      const largeArcFlag = a1 - a0 <= 180 ? '0' : '1'
      return ['M', start.x, start.y, 'A', r, r, 0, largeArcFlag, 0, end.x, end.y].join(
        ' '
      )
    }

    return {
      arcLength: len,
      offset: len - (percentage / 100) * len,
      bgArcPath: describeArc(size / 2, size / 2, radius, startAngle, endAngle),
    }
  }, [size, strokeWidth, percentage])

  return (
    <div
      className={cn('relative mx-auto', className)}
      style={{ width: size, height: size }}
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <svg width={size} height={size} className="overflow-visible">
        <path
          d={bgArcPath}
          fill="none"
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <motion.path
          d={bgArcPath}
          fill="none"
          stroke={primaryColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={arcLength}
          initial={{ strokeDashoffset: arcLength }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>

      {children && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pb-6">
          {children}
        </div>
      )}
    </div>
  )
})
