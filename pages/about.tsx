import GlobalPage from '@/components/GlobalPage'
import { Box, Button, Header } from 'grommet'
import React from 'react'

interface IPageProps {}

const Page: React.FC<IPageProps> = (props) => {
  return (
    <GlobalPage>
      <Header>About</Header>
      <Box pad="medium">
        <Button label="Click me" onClick={() => alert('Clicked!')} />
      </Box>
    </GlobalPage>
  )
}

export default Page
