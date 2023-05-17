import GlobalPage from '@/components/GlobalPage'
import StepByStep from '@/components/StepByStep'
import Steps from '@/components/Steps'
import { useData } from '@/context/Context'
import { Grid, Notification } from 'grommet'
import { useRouter } from 'next/router'

export default function Home() {
  const { show, title, message, hideMessage } = useData()

  const router = useRouter()
  const { step } = router.query
  const totalSteps = 4

  const currentStep = step ? parseInt(step as string) : 1

  return (
    <GlobalPage>
      <Grid gap="medium">
        <StepByStep step={currentStep} totalSteps={totalSteps} />
        <Steps step={currentStep} />
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
