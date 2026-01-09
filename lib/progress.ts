import { differenceInDays, startOfYear, endOfYear, startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns'

export type ProgressType = 'year' | 'month' | 'week' | 'lifetime'
export type ProgressShape = 'linear' | 'circular' | 'arc'

export interface ProgressConfig {
  type: ProgressType
  shape: ProgressShape
  primaryColor: string
  backgroundColor: string
  showPercentage: boolean
  showDaysRemaining: boolean
  birthDate?: string
}

export interface ProgressData {
  percentage: number
  daysPassed: number
  daysTotal: number
  daysRemaining: number
  message: string
}

export function calculateProgress(type: ProgressType, birthDate?: string): ProgressData {
  const now = new Date()
  let start: Date
  let end: Date
  let totalDays: number

  switch (type) {
    case 'year':
      start = startOfYear(now)
      end = endOfYear(now)
      totalDays = differenceInDays(end, start) + 1
      break
    case 'month':
      start = startOfMonth(now)
      end = endOfMonth(now)
      totalDays = differenceInDays(end, start) + 1
      break
    case 'week':
      start = startOfWeek(now, { weekStartsOn: 1 })
      end = endOfWeek(now, { weekStartsOn: 1 })
      totalDays = 7
      break
    case 'lifetime':
      if (!birthDate) {
        return {
          percentage: 0,
          daysPassed: 0,
          daysTotal: 0,
          daysRemaining: 0,
          message: '请设置出生日期'
        }
      }
      start = new Date(birthDate)
      // 假设预期寿命为80年
      const lifeExpectancy = new Date(start)
      lifeExpectancy.setFullYear(lifeExpectancy.getFullYear() + 80)
      end = lifeExpectancy
      totalDays = differenceInDays(end, start) + 1
      break
    default:
      start = startOfYear(now)
      end = endOfYear(now)
      totalDays = differenceInDays(end, start) + 1
  }

  const daysPassed = differenceInDays(now, start) + 1
  const daysRemaining = totalDays - daysPassed
  const percentage = Math.min(100, Math.max(0, (daysPassed / totalDays) * 100))

  const message = getMotivationalMessage(percentage, type)

  return {
    percentage: Number(percentage.toFixed(2)),
    daysPassed,
    daysTotal: totalDays,
    daysRemaining: Math.max(0, daysRemaining),
    message
  }
}

function getMotivationalMessage(percentage: number, type: ProgressType): string {
  const year = new Date().getFullYear()

  if (percentage === 0) {
    return type === 'year' ? `${year}年刚刚开始，全新的一年！` : '新的周期，新的开始！'
  }

  if (percentage < 10) {
    return '起步阶段，保持动力！'
  }

  if (percentage < 25) {
    return '良好的开始，继续前进！'
  }

  if (percentage < 50) {
    return '已过四分之一，稳步推进！'
  }

  if (percentage < 75) {
    return type === 'year' ? `上半年已过，${year}年过半！` : '已过半，加油！'
  }

  if (percentage < 90) {
    return '冲刺阶段，最后冲刺！'
  }

  if (percentage < 100) {
    return '即将完成，最后坚持！'
  }

  return type === 'year' ? `${year}年已结束，感谢这一年！` : '周期结束，新的开始！'
}

export function getMilestoneMessage(percentage: number): string | null {
  const milestones = [1, 10, 25, 50, 75, 90, 99, 100]

  for (const milestone of milestones) {
    if (Math.abs(percentage - milestone) < 0.5) {
      switch (milestone) {
        case 1:
          return '🎉 进度开始！'
        case 10:
          return '💪 已达10%，继续保持！'
        case 25:
          return '🌟 已达四分之一！'
        case 50:
          return '🎯 已过半程！'
        case 75:
          return '🚀 四分之三完成！'
        case 90:
          return '🏆 冲刺阶段！'
        case 99:
          return '🌈 即将完成！'
        case 100:
          return '🎊 圆满完成！'
        default:
          return null
      }
    }
  }

  return null
}
