import React from 'react';
import { Box, Diagram } from 'grommet';

interface StepProps {
  step: number;
  totalSteps: number;
}

const StepByStep = ({ step, totalSteps }: StepProps) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <Box direction="row" justify="around" align="center">
      {steps.map((s) => (
        <Box key={s.toString()} width="xxsmall" height="xxsmall" round="full" background={s <= step ? 'brand' : 'light-4'} />
      ))
      }
    </Box>
  );
};

export default StepByStep;