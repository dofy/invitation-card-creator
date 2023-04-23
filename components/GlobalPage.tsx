import GlobalFooter from '@/components/GlobalFooter'
import GlobalHead from '@/components/GlobalHead'
import { Main, Page, PageContent } from 'grommet'
import { UserAdd } from 'grommet-icons'
import React from 'react'
import GlobalPageHeader from './GlobalPageHeader'

interface GlobalPageProps {
  children: React.ReactNode
}

const GlobalPage: React.FC<GlobalPageProps> = ({ children }) => {
  return (
    <React.Fragment>
      <GlobalHead />
      <Page>
        <PageContent>
          <GlobalPageHeader
            icon={<UserAdd size="large" color="brand" />}
            title={process.env.NEXT_PUBLIC_TITLE}
            subTitle={process.env.NEXT_PUBLIC_DESC}
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
