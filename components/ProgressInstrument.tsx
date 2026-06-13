'use client'

import { ProgressShape } from '@/lib/progress'
import { useCountUp } from '@/lib/hooks/useCountUp'
import { LinearProgress } from '@/components/ProgressBar/LinearProgress'
import { CircularProgress } from '@/components/ProgressBar/CircularProgress'
import { ArcProgress } from '@/components/ProgressBar/ArcProgress'

interface ProgressInstrumentProps {
  shape: ProgressShape
  percentage: number
  primaryColor: string
  backgroundColor: string
  showPercentage: boolean
  reduceMotion?: boolean
}

/**
 * The hero: a giant typographic percentage (the star) composed with the chosen
 * instrument shape. The number is the focus; the shape is a quiet visualization.
 */
export function ProgressInstrument({
  shape,
  percentage,
  primaryColor,
  backgroundColor,
  showPercentage,
  reduceMotion = false,
}: ProgressInstrumentProps) {
  const value = useCountUp(percentage, { enabled: true, reduce: reduceMotion })
  const label = `${value.toFixed(1)}`

  const Figure = ({ className = '' }: { className?: string }) =>
    showPercentage ? (
      <span
        className={`hero-figure num ${className}`}
        style={{ color: primaryColor }}
      >
        {label}
        <span className="align-top text-[0.32em] tracking-tight" style={{ marginLeft: '0.04em' }}>
          %
        </span>
      </span>
    ) : null

  if (shape === 'circular') {
    return (
      <CircularProgress
        percentage={percentage}
        primaryColor={primaryColor}
        backgroundColor={backgroundColor}
        size={300}
        strokeWidth={2}
      >
        <Figure className="text-7xl md:text-8xl" />
      </CircularProgress>
    )
  }

  if (shape === 'arc') {
    return (
      <ArcProgress
        percentage={percentage}
        primaryColor={primaryColor}
        backgroundColor={backgroundColor}
        size={300}
        strokeWidth={2}
      >
        <Figure className="text-7xl md:text-8xl" />
      </ArcProgress>
    )
  }

  // linear — the number is maximalist, the track a quiet hairline beneath
  return (
    <div className="w-full">
      <div className="text-center">
        <Figure className="block text-[26vw] leading-[0.82] sm:text-[22vw] md:text-[15rem] lg:text-[17rem]" />
      </div>
      <div className="mx-auto mt-10 max-w-2xl">
        <LinearProgress
          percentage={percentage}
          primaryColor={primaryColor}
          backgroundColor={backgroundColor}
        />
      </div>
    </div>
  )
}
