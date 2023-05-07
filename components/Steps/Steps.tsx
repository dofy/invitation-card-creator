import { Box, Markdown } from 'grommet'
import React from 'react'
import StepCard from '../StepCard'
import StepOne from './StepOne'
import { useData } from '@/context/Context'

interface IStepsProps {
  step: number
  totalSteps: number
  onStepChange: (step: number) => void
}

const Steps: React.FC<IStepsProps> = ({ step, totalSteps, onStepChange }) => {
  const { setTitle, setMessage, setShowMessage } = useData()
  return (
    <StepCard
      isFirst={step === 1}
      isLast={step === totalSteps}
      step={step}
      canGoBack={true}
      onPrevious={() => onStepChange(step - 1)}
      onNext={() => onStepChange(step + 1)}
      // onCompleted={() => setShowNotification(true)}
    >
      {/* TODO: step card content */}
      {(() => {
        switch (step) {
          case 1:
            return (
              <StepOne
                onCompleted={() => {
                  setTitle('Success')
                  setMessage('Background Image Uploaded')
                  setShowMessage(true)
                  // onStepChange(2)
                }}
              />
            )
          case 2:
            return <Box>step 2: Set Name Position & Font Size for Preview</Box>
          case 3:
            return <Markdown>**step 3:** Upload `Names-List` file</Markdown>
        }
      })()}
    </StepCard>
  )
}

export default Steps
