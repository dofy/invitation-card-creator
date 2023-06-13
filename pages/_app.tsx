import { DataProvider } from '@/context/Context'
import '@/styles/globals.css'
import { Grommet, ThemeType, grommet } from 'grommet'
import { deepMerge } from 'grommet/utils'
import type { AppProps } from 'next/app'
import React from 'react'

const theme: ThemeType = deepMerge(grommet, {
  global: {
    font: {
      height: '1.7em',
    },
    colors: {
      brand: '#339966',
      text: {
        dark: '#f9f9f9',
        light: '#339933',
      },
      background: {
        dark: '#363636',
        light: '#f9f9f9',
      },
      focus: '#339966',
    },
  },
})

export default function App({ Component, pageProps }: AppProps) {
  const [dark, setDark] = React.useState(false)

  React.useEffect(() => {
    const dark = localStorage.getItem('dark')
    if (dark === 'true') {
      setDark(true)
    }
  }, [])

  return (
    <DataProvider>
      <Grommet theme={theme} themeMode={dark ? 'dark' : 'light'} full="min">
        <Component {...pageProps} />
      </Grommet>
    </DataProvider>
  )
}
