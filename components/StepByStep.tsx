import { Box, Diagram, Stack, Text } from 'grommet'

interface StepProps {
  step: number
  totalSteps: number
  onStep?: (step: number) => void
}

const StepByStep = ({ step, totalSteps, onStep }: StepProps) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1)

  return (
    <Stack guidingChild="last" margin="small">
      <Diagram
        connections={steps.map((s) => {
          const done = s < step
          return {
            fromTarget: `step-${s}`,
            toTarget: `step-${s + 1}`,
            color: done ? 'brand' : 'light-4',
            thickness: done ? 'xsmall' : 'xxsmall',
          }
        })}
      />
      <Box direction="row" justify="around" align="center">
        {steps.map((s) => {
          const done = s <= step
          return (
            <Box
              id={`step-${s}`}
              key={s.toString()}
              width="xxsmall"
              height="xxsmall"
              round="full"
              align="center"
              justify="center"
              background={done ? 'brand' : 'light-4'}
              onClick={() => onStep && onStep(s)}
            >
              <Text size="large">{s}</Text>
            </Box>
          )
        })}
      </Box>
    </Stack>
  )
}

export default StepByStep
