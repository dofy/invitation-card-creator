
import Head from 'next/head'
import React from 'react'

const GlobalHead: React.FC = () => {
  return (

    <Head>
      <title>{process.env.NEXT_PUBLIC_TITLE}</title>
      <meta name="description" content={process.env.NEXT_PUBLIC_DESC} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

export default GlobalHead