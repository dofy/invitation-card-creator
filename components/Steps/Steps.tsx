import { useData } from '@/context/Context'
import { Box, Markdown } from 'grommet'
import React from 'react'
import StepCard from '../StepCard'
import StepOne from './StepOne'
import StepTwo from './StepTwo'

interface IStepsProps {
  step: number
  onStepChange: (step: number) => void
}

const Steps: React.FC<IStepsProps> = ({ step, onStepChange }) => {
  const { showMessage } = useData()

  switch (step) {
    case 1:
      return (
        <StepCard isFirst={true} step={step}>
          <StepOne
            onCompleted={() => {
              showMessage('Success', 'Background Image Uploaded')
              onStepChange(++step)
            }}
          />
        </StepCard>
      )
    case 2:
      return (
        <StepCard
          step={step}
          canGoBack={true}
          onPrevious={() => onStepChange(step - 1)}
          onNext={() => onStepChange(step + 1)}
        >
          <StepTwo
            onCompleted={() => {
              onStepChange(++step)
            }}
          />
        </StepCard>
      )
    case 3:
      return (
        <StepCard
          step={step}
          canGoBack={true}
          onPrevious={() => onStepChange(step - 1)}
          onNext={() => onStepChange(step + 1)}
          // onCompleted={() => setShowNotification(true)}
        >
          <Markdown>**step 3:** Upload `Names-List` file</Markdown>
        </StepCard>
      )
    default:
      return <Box>No Content ...</Box>
  }
}

export default Steps
