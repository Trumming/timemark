import { LinearProgress } from './LinearProgress'
import { CircularProgress } from './CircularProgress'
import { ArcProgress } from './ArcProgress'
import { ProgressShape } from '@/lib/progress'

interface ProgressBarProps {
  shape: ProgressShape
  percentage: number
  primaryColor: string
  backgroundColor: string
  showPercentage: boolean
}

export function ProgressBar({ shape, ...props }: ProgressBarProps) {
  switch (shape) {
    case 'linear':
      return <LinearProgress {...props} />
    case 'circular':
      return <CircularProgress {...props} />
    case 'arc':
      return <ArcProgress {...props} />
    default:
      return <LinearProgress {...props} />
  }
}
