import { differenceInDays, startOfYear, endOfYear, startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns'
import { Locale } from './i18n'

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

export function calculateProgress(
  type: ProgressType,
  birthDate?: string,
  locale: Locale = 'zh'
): ProgressData {
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
          message: '' // Will be filled by component with i18n
        }
      }
      start = new Date(birthDate)
      // Assume 80-year life expectancy
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

  // Message will be handled by component with i18n
  return {
    percentage: Number(percentage.toFixed(2)),
    daysPassed,
    daysTotal: totalDays,
    daysRemaining: Math.max(0, daysRemaining),
    message: '' // Filled by component
  }
}
