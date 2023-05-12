import GlobalPage from '@/components/GlobalPage'
import StepByStep from '@/components/StepByStep'
import Steps from '@/components/Steps/Steps'
import { useData } from '@/context/Context'
import { Grid, Notification } from 'grommet'
import React from 'react'

export default function Home() {
  // TODO: get current step from url query
  const totalSteps = 3
  const [step, setStep] = React.useState(1)
  const { show, title, message, hideMessage } = useData()

  return (
    <GlobalPage>
      <Grid gap="medium">
        <StepByStep step={step} totalSteps={totalSteps} />
        <Steps step={step} onStepChange={setStep} />
      </Grid>
      {show && (
        <Notification
          toast
          title={title}
          message={message}
          status="info" // TODO: change notification status in context
          onClose={hideMessage}
        />
      )}
    </GlobalPage>
  )
}
