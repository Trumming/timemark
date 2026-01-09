'use client'

import { memo, useMemo } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ArcProgressProps {
  percentage: number
  primaryColor: string
  backgroundColor: string
  showPercentage: boolean
  size?: number
  strokeWidth?: number
  className?: string
}

export const ArcProgress = memo(function ArcProgress({
  percentage,
  primaryColor,
  backgroundColor,
  showPercentage,
  size = 400,
  strokeWidth = 25,
  className
}: ArcProgressProps) {
  const arcData = useMemo(() => {
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    // 弧形只显示 240 度（即 2/3 圆）
    const arcLength = (circumference * 240) / 360
    const offset = arcLength - (percentage / 100) * arcLength

    // 计算弧形的起始和结束角度
    const startAngle = 150 // 从左下方开始
    const endAngle = 390 // 到右下方结束

    // 将角度转换为坐标
    const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
      const angleInRadians = (angleInDegrees - 180) * Math.PI / 180.0
      return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians)
      }
    }

    // 创建 SVG 路径
    const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
      const start = polarToCartesian(x, y, radius, endAngle)
      const end = polarToCartesian(x, y, radius, startAngle)
      const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"

      return [
        "M",
        start.x,
        start.y,
        "A",
        radius,
        radius,
        0,
        largeArcFlag,
        0,
        end.x,
        end.y
      ].join(" ")
    }

    const bgArcPath = describeArc(size / 2, size / 2, radius, startAngle, endAngle)

    return { arcLength, offset, bgArcPath }
  }, [size, strokeWidth, percentage])

  return (
    <div className={cn('relative', className)} style={{ width: size, height: size * 0.7 }}>
      <svg
        width={size}
        height={size * 0.7}
        className="overflow-visible"
      >
        {/* 背景弧 */}
        <path
          d={arcData.bgArcPath}
          fill="none"
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* 进度弧 */}
        <motion.path
          d={arcData.bgArcPath}
          fill="none"
          stroke={primaryColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={arcData.arcLength}
          initial={{ strokeDashoffset: arcData.arcLength }}
          animate={{ strokeDashoffset: arcData.offset }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </svg>

      {/* 下方内容 */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        {showPercentage && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="text-6xl font-bold" style={{ color: primaryColor }}>
              {percentage.toFixed(1)}%
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
})
