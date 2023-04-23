import GlobalFooter from '@/components/GlobalFooter'
import GlobalHead from '@/components/GlobalHead'
import StepByStep from '@/components/StepByStep'
import { Box, Main, Page, PageContent, PageHeader } from 'grommet'
import React from 'react'

export default function Home() {
  const [step, setStep] = React.useState(3)

  return (
    <React.Fragment>
      <GlobalHead />
      <Page>
        <PageContent>
          <PageHeader title={process.env.NEXT_PUBLIC_TITLE} subtitle={process.env.NEXT_PUBLIC_DESC} />
          <Main>
            <Box>
              <Box>
                <StepByStep step={step} totalSteps={5} />
              </Box>
              <Box>--== STEPS ==--</Box>
              <Box>step 1: Upload Background Image</Box>
              <Box>step 2: Set Name Position & Font Size and Preview</Box>
              <Box>step 3: Upload Names-List file</Box>
              <Box>中文测试，中华人民共和国</Box>
            </Box>
          </Main>
        </PageContent>
        <GlobalFooter />
      </Page>
    </React.Fragment>
  )
}
