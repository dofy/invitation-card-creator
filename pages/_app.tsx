import '@/styles/globals.css'
import { Grommet, ThemeType, grommet } from 'grommet'
import { deepMerge } from 'grommet/utils'
import type { AppProps } from 'next/app'

const theme: ThemeType = deepMerge(grommet, {
  global: {
    font: {
      family: "ZCOOL XiaoWei",
      height: "1.7em",
    },
  }
})

export default function App({ Component, pageProps }: AppProps) {
  return (<Grommet theme={theme} themeMode='dark' full>
    <Component {...pageProps} />
  </Grommet>)
}
