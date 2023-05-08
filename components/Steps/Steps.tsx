import { useData } from '@/context/Context'
import { Markdown } from 'grommet'
import React from 'react'
import StepCard from '../StepCard'
import StepOne from './StepOne'
import StepTwo from './StepTwo'

interface IStepsProps {
  step: number
  totalSteps: number
  onStepChange: (step: number) => void
}

const Steps: React.FC<IStepsProps> = ({ step, totalSteps, onStepChange }) => {
  const { showMessage } = useData()
  return (
    <StepCard
      isFirst={step === 1}
      isLast={step === totalSteps}
      step={step}
      canGoBack={true}
      onPrevious={() => onStepChange(step - 1)}
      // onNext={() => onStepChange(step + 1)}
      // onCompleted={() => setShowNotification(true)}
    >
      {/* TODO: step card content */}
      {(() => {
        switch (step) {
          case 1:
            return (
              <StepOne
                onCompleted={() => {
                  showMessage('Success', 'Background Image Uploaded')
                  onStepChange(++step)
                }}
              />
            )
          case 2:
            return (
              <StepTwo
                onCompleted={() => {
                  onStepChange(++step)
                }}
              />
            )
          case 3:
            return <Markdown>**step 3:** Upload `Names-List` file</Markdown>
        }
      })()}
    </StepCard>
  )
}

export default Steps
