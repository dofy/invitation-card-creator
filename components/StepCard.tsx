import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
} from 'grommet'

interface StepCardProps {
  isFirst?: boolean
  isLast?: boolean
  step: number
  canGoBack?: boolean
  onPrevious?: () => void
  onNext?: () => void
  onCompleted?: () => void
  children: React.ReactNode
  previousLabel?: string
  nextLabel?: string
  completedLabel?: string
}

const StepCard: React.FC<StepCardProps> = ({
  isFirst=false,
  isLast=false,
  step,
  canGoBack = false,
  onPrevious,
  onNext,
  onCompleted,
  children,
  previousLabel = 'Previous',
  nextLabel = 'Next',
  completedLabel = 'Completed',
}) => {
  return (
    <Card>
      <CardHeader
        pad={{ horizontal: 'large', vertical: 'none' }}
        background={{ dark: 'dark-3', light: 'light-5' }}
      >
        <Heading level={3}>{`STEP ${step} :`}</Heading>
      </CardHeader>
      <CardBody pad="medium">{children}</CardBody>
      {(onPrevious || onNext || (isLast && onCompleted)) && (
        <CardFooter
          pad="medium"
          background={{ dark: 'dark-6', light: 'light-3' }}
        >
          {canGoBack && onPrevious ? (
            <Button
              label={previousLabel}
              disabled={isFirst}
              onClick={onPrevious}
            />
          ) : (
            <></>
          )}
          {!isLast && onNext && (
            <Button primary label={nextLabel} onClick={onNext} />
          )}
          {isLast && onCompleted && (
            <Button primary label={completedLabel} onClick={onCompleted} />
          )}
        </CardFooter>
      )}
    </Card>
  )
}

export default StepCard
