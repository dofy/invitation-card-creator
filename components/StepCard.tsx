import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
} from 'grommet'

interface StepCardProps {
  isFirst?: boolean
  isLast?: boolean
  step: number
  description?: string
  canGoBack?: boolean
  onPrevious?: () => void
  canNext?: boolean
  onNext?: () => void
  onCompleted?: () => void
  children: React.ReactNode
  previousLabel?: string
  nextLabel?: string
  completedLabel?: string
}

const StepCard: React.FC<StepCardProps> = ({
  isFirst = false,
  isLast = false,
  step,
  description,
  canGoBack = false,
  onPrevious,
  canNext = false,
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
        {description && <Text as="em"> {description} </Text>}
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
            <Button
              primary
              disabled={!canNext}
              label={nextLabel}
              onClick={onNext}
            />
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
