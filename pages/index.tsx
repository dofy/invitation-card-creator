import GlobalPage from '@/components/GlobalPage'
import StepByStep from '@/components/StepByStep'
import StepCard from '@/components/StepCard'
import { Grid, Notification } from 'grommet'
import React from 'react'

export default function Home() {
  const totalSteps = 7
  const [step, setStep] = React.useState(3)
  const [showNotification, setShowNotification] = React.useState(false)

  return (
    <GlobalPage>
      <Grid
        rows={[
          'auto', // StepByStep
          'flex', // StepCard
        ]}
        gap="medium"
      >
        <StepByStep step={step} totalSteps={totalSteps} onStep={setStep} />
        <StepCard
          isFirst={step === 1}
          isLast={step === totalSteps}
          step={step}
          canGoBack={true}
          onNext={() => setStep(step + 1)}
          onCompleted={() => setShowNotification(true)}
        >
          content...
        </StepCard>
        {/* <Box>--== STEPS ==--</Box>
        <Box>step 1: Upload Background Image</Box>
        <Box>step 2: Set Name Position & Font Size and Preview</Box>
        <Box>step 3: Upload Names-List file</Box>
        <Box>中文测试，中华人民共和国</Box> */}
      </Grid>
      {showNotification && (
        <Notification
          toast
          title="Notification Title"
          message="Notification Message"
          status="info"
          onClose={() => setShowNotification(false)}
        />
      )}
    </GlobalPage>
  )
}
