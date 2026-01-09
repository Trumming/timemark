'use client'

import * as React from "react"
import { cn } from "@/lib/utils"

interface SliderProps {
  value?: number
  onChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
  className?: string
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ value = 50, onChange, min = 0, max = 100, step = 1, className }, ref) => {
    return (
      <input
        type="range"
        ref={ref}
        value={value}
        onChange={(e) => onChange?.(Number(e.target.value))}
        min={min}
        max={max}
        step={step}
        className={cn(
          "w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer",
          "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary",
          "[&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer",
          className
        )}
      />
    )
  }
)
Slider.displayName = "Slider"

export { Slider }
