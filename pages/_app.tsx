import '@/styles/globals.css'
import { Grommet, ThemeType, grommet } from 'grommet'
import { deepMerge } from 'grommet/utils'
import type { AppProps } from 'next/app'

const theme: ThemeType = deepMerge(grommet, {
  global: {
    font: {
      family: 'ZCOOL XiaoWei',
      height: '1.7em',
    },
    colors: {
      brand: '#009933',
      background: {
        dark: '#363636',
        light: '#f9f9f9',
      },
      focus: '#336600',
    },
  },
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Grommet theme={theme} themeMode="light" full="min">
      <Component {...pageProps} />
    </Grommet>
  )
}
