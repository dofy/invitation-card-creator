import '@/styles/globals.css'
import { Grommet } from 'grommet'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (<Grommet full>
    <Component {...pageProps} />
  </Grommet>)
}
