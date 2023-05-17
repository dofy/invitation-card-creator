import { Markdown } from 'grommet'
import React from 'react'
import StepCard from '../StepCard'

const Step3: React.FC = () => {
  return (
    <StepCard
      step={3}
      canGoBack={true}
      // onCompleted={() => setShowNotification(true)}
    >
      <Markdown>**step 3:** Upload `Names-List` file</Markdown>
    </StepCard>
  )
}

export default Step3
