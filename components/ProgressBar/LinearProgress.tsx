'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LinearProgressProps {
  percentage: number
  primaryColor: string
  backgroundColor: string
  showPercentage: boolean
  className?: string
}

export const LinearProgress = memo(function LinearProgress({
  percentage,
  primaryColor,
  backgroundColor,
  showPercentage,
  className
}: LinearProgressProps) {
  return (
    <div className={cn('w-full max-w-2xl mx-auto', className)}>
      <div
        className="h-8 rounded-full overflow-hidden relative"
        style={{ backgroundColor }}
      >
        <motion.div
          className="h-full rounded-full relative overflow-hidden"
          style={{ backgroundColor: primaryColor }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {/* 添加光泽效果 */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />

          {/* 添加粒子效果 */}
          {percentage > 0 && (
            <motion.div
              className="absolute inset-0"
              animate={{
                backgroundPosition: ['0% 0%', '100% 0%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                backgroundImage: `linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)`,
                backgroundSize: '200% 100%',
              }}
            />
          )}
        </motion.div>

        {/* 百分比文字 */}
        {showPercentage && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold text-white drop-shadow-lg mix-blend-difference">
              {percentage}%
            </span>
          </div>
        )}
      </div>

      {/* 刻度线 */}
      <div className="flex justify-between mt-2 px-1">
        {[0, 25, 50, 75, 100].map((mark) => (
          <div key={mark} className="relative">
            <div className="w-px h-2 bg-muted-foreground/30" />
            <span className="text-xs text-muted-foreground/60 absolute top-3 left-1/2 -translate-x-1/2">
              {mark}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
})
