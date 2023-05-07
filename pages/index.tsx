import GlobalPage from '@/components/GlobalPage'
import StepByStep from '@/components/StepByStep'
import Steps from '@/components/Steps/Steps'
import { Grid } from 'grommet'
import React from 'react'

export default function Home() {
  const totalSteps = 3
  const [step, setStep] = React.useState(1)

  return (
    <GlobalPage>
      <Grid gap="medium">
        <StepByStep step={step} totalSteps={totalSteps} />
        <Steps step={step} totalSteps={totalSteps} onStepChange={setStep} />
      </Grid>
    </GlobalPage>
  )
}
