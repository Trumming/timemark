import { useState, useEffect, useMemo, useCallback } from 'react'
import { calculateProgress, getMilestoneMessage, ProgressConfig, ProgressData } from '@/lib/progress'

export function useProgress(config: ProgressConfig) {
  const [, setTick] = useState(0)

  const progressData = useMemo<ProgressData>(
    () => calculateProgress(config.type, config.birthDate),
    [config.type, config.birthDate]
  )

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((tick) => tick + 1)
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  return progressData
}

export function useMilestone(percentage: number) {
  const [showMilestone, setShowMilestone] = useState(false)
  const [milestoneMessage, setMilestoneMessage] = useState<string | null>(null)
  const [lastMilestone, setLastMilestone] = useState<number>(-1)

  useEffect(() => {
    const currentMilestone = Math.floor(percentage)
    if (currentMilestone !== lastMilestone) {
      const milestone = getMilestoneMessage(percentage)
      if (milestone && milestone !== milestoneMessage) {
        setMilestoneMessage(milestone)
        setShowMilestone(true)
        setLastMilestone(currentMilestone)
        setTimeout(() => setShowMilestone(false), 5000)
      }
    }
  }, [percentage, lastMilestone, milestoneMessage])

  const dismissMilestone = useCallback(() => {
    setShowMilestone(false)
  }, [])

  return { showMilestone, milestoneMessage, dismissMilestone }
}
