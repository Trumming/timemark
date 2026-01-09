import { useState, useEffect, useMemo, useCallback } from 'react'
import { calculateProgress, ProgressConfig, ProgressData } from '@/lib/progress'
import { getMotivationalMessage, getMilestoneMessage, Locale } from '@/lib/i18n'

export function useProgress(config: ProgressConfig, locale: Locale) {
  const [, setTick] = useState(0)

  const progressData = useMemo<ProgressData>(() => {
    const data = calculateProgress(config.type, config.birthDate, locale)
    // Add i18n message
    if (!data.message && data.percentage === 0 && config.type === 'lifetime') {
      data.message = getMotivationalMessage(0, locale)
    } else if (!data.message) {
      data.message = getMotivationalMessage(data.percentage, locale)
    }
    return data
  }, [config.type, config.birthDate, locale])

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((tick) => tick + 1)
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  return progressData
}

export function useMilestone(percentage: number, locale: Locale) {
  const [showMilestone, setShowMilestone] = useState(false)
  const [milestoneMessage, setMilestoneMessage] = useState<string | null>(null)
  const [lastMilestone, setLastMilestone] = useState<number>(-1)

  useEffect(() => {
    const currentMilestone = Math.floor(percentage)
    if (currentMilestone !== lastMilestone) {
      const milestone = getMilestoneMessage(percentage, locale)
      if (milestone && milestone !== milestoneMessage) {
        setMilestoneMessage(milestone)
        setShowMilestone(true)
        setLastMilestone(currentMilestone)
        setTimeout(() => setShowMilestone(false), 5000)
      }
    }
  }, [percentage, lastMilestone, milestoneMessage, locale])

  const dismissMilestone = useCallback(() => {
    setShowMilestone(false)
  }, [])

  return { showMilestone, milestoneMessage, dismissMilestone }
}
