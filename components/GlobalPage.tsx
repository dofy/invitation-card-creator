import GlobalFooter from '@/components/GlobalFooter'
import GlobalHead from '@/components/GlobalHead'
import { Main, Page, PageContent, PageHeader } from 'grommet'
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
          <PageHeader
            title={process.env.NEXT_PUBLIC_TITLE}
            subtitle={process.env.NEXT_PUBLIC_DESC}
          />
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
