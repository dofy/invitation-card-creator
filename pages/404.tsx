import GlobalPage from '@/components/GlobalPage'
import { Box, Button, Heading, Text } from 'grommet'

const Page: React.FC = () => {
  return (
    <GlobalPage>
      <Box align="center">
        <Heading>404</Heading>
        <Text>Page Not Found.</Text>
        <Box pad="large">
          <Button primary label="Go Back" onClick={() => history.back()} />
        </Box>
      </Box>
    </GlobalPage>
  )
}

export default Page
