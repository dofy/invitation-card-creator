import { Box } from 'grommet'
import React from 'react'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'

interface IStepsProps {
  step: number
}

const Steps: React.FC<IStepsProps> = ({ step }) => {
  switch (step) {
    case 1:
      return <Step1 />
    case 2:
      return <Step2 />
    case 3:
      return <Step3 />
    case 4:
      return <Step4 />
    default:
      return <Box>No Content ...</Box>
  }
}

export default Steps
