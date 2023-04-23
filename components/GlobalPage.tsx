import GlobalFooter from '@/components/GlobalFooter'
import GlobalHead from '@/components/GlobalHead'
import { Box, Heading, Main, Page, PageContent } from 'grommet'
import { UserAdd } from 'grommet-icons'
import React from 'react'

interface GlobalPageProps {
  children: React.ReactNode
}

const GlobalPage: React.FC<GlobalPageProps> = ({ children }) => {
  return (
    <React.Fragment>
      <GlobalHead />
      <Page>
        <PageContent>
          <Box pad="small">
            <Box gap="small" direction="row" align="baseline">
              <UserAdd size="large" color="brand" />
              <Heading
                margin={{
                  horizontal: 'medium',
                  bottom: 'small',
                  top: 'large',
                }}
                color="brand"
                level={1}
              >
                {process.env.NEXT_PUBLIC_TITLE}
              </Heading>
            </Box>
            <Heading
              color={{
                light: 'dark-3',
                dark: 'light-3',
              }}
              margin={{
                left: 'large',
                vertical: 'small',
              }}
              level={4}
            >
              {process.env.NEXT_PUBLIC_DESC}
            </Heading>
          </Box>
          <Main pad="large">
            {/* page content begin */}
            {children}
            {/* page content end */}
          </Main>
        </PageContent>
        <GlobalFooter />
      </Page>
    </React.Fragment>
  )
}

export default GlobalPage
