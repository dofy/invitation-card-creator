import GlobalFooter from '@/components/GlobalFooter'
import GlobalHead from '@/components/GlobalHead'
import { Box, Main, Page, PageContent, PageHeader, Text } from 'grommet'
import React from 'react'

export default function Home() {
  return (
    <React.Fragment>
      <GlobalHead />
      <Page>
        <PageContent>
          <PageHeader title={process.env.NEXT_PUBLIC_TITLE} subtitle={process.env.NEXT_PUBLIC_DESC} />
          <Main>
            <Box>
              <Box>--== STEPS ==--</Box>
              <Box>step 1: Upload Background Image</Box>
              <Box>step 2: Set Name Position & Font Size and Preview</Box>
              <Box>step 3: Upload Names-List file</Box>
            </Box>
          </Main>
        </PageContent>
        <GlobalFooter />
      </Page>
    </React.Fragment>
  )
}
