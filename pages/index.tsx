import GlobalPage from '@/components/GlobalPage'
import StepByStep from '@/components/StepByStep'
import Steps from '@/components/Steps/Steps'
import { useData } from '@/context/Context'
import { Grid, Notification } from 'grommet'
import React from 'react'

export default function Home() {
  const totalSteps = 3
  const [step, setStep] = React.useState(1)
  const { title, message, showMessage, setShowMessage } = useData()

  return (
    <GlobalPage>
      <Grid gap="medium">
        <StepByStep step={step} totalSteps={totalSteps} />
        <Steps step={step} totalSteps={totalSteps} onStepChange={setStep} />
      </Grid>
      {showMessage && (
        <Notification
          toast
          title={title}
          message={message}
          status="info" // TODO: change notification status in context
          onClose={() => {
            setShowMessage(false)
          }}
        />
      )}
    </GlobalPage>
  )
}
