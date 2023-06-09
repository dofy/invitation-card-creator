import { Anchor, Footer, Text } from 'grommet'
import React from 'react'
import * as package_json from '../package.json'

const GlobalFooter: React.FC = () => {
  const year = new Date().getFullYear()
  const { version } = package_json
  return (
    <Footer background="light-3" justify="between" pad="large">
      <Text color="dark-3" size="small">
        {`copyright (c) ${process.env.NEXT_PUBLIC_SINCE}~${year} powered by `}
        <Anchor label="yahaha.net" href={'https://yahaha.net'} />
      </Text>
      <Text color="dark-6" size="small" weight="bold">
        {`( version ${version} )`}
      </Text>
    </Footer>
  )
}

export default GlobalFooter
