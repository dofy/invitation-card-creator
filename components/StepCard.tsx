import { Card } from 'grommet'

interface StepCardProps {
  isFirst: boolean
  isLast: boolean
  step: number
  onCompleted?: () => void
  children: React.ReactNode
}

const StepCard: React.FC<StepCardProps> = ({
  isFirst,
  isLast,
  step,
  children,
  onCompleted,
}) => {
  return <Card>{children}</Card>
}

export default StepCard
