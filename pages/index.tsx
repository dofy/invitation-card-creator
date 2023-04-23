import GlobalPage from '@/components/GlobalPage'
import StepByStep from '@/components/StepByStep'
import StepCard from '@/components/StepCard'
import { Box, Grid, Markdown, Notification } from 'grommet'
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
          {/* TODO: step card content */}
          {(() => {
            switch (step) {
              case 1:
                return <Box>step 1: Upload Background Image</Box>
              case 2:
                return (
                  <Box>step 2: Set Name Position & Font Size for Preview</Box>
                )
              case 3:
                return <Markdown>**step 3:** Upload `Names-List` file</Markdown>
              case 4:
                return (
                  <Box>step 4: Set Name Position & Font Size and Preview</Box>
                )
              case 5:
                return <Box>step 5: Upload Names-List file</Box>
              case 6:
                return (
                  <Box>step 6: Set Name Position & Font Size and Preview</Box>
                )
              case 7:
                return <Box>step 7: Upload Names-List file</Box>
            }
          })()}
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
