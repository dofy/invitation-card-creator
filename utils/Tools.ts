import { NextRouter } from 'next/router'

const replaceParams = (router: NextRouter, params: any) => {
  router.replace(
    {
      pathname: '/',
      query: {
        ...router.query,
        ...params,
      },
    },
    undefined,
    { shallow: true }
  )
}

const toNumber = (
  value: string | string[] | undefined,
  defaultValue = 0
): number => parseInt(value as string, 10) || defaultValue

export { replaceParams, toNumber }
