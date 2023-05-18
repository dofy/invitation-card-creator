import { NextApiRequest, NextApiResponse } from 'next'

type ResData =
  | {
      done: boolean
    }
  | {
      statusCode: number
      message: string
    }

const defaultBody = (height: number) => ({
  x: 0,
  y: Math.round(height / 3),
  s: 64,
  c: '#000000',
  a: 'left',
})

// create images and zip files
const create = (req: NextApiRequest, res: NextApiResponse<ResData>) => {
  const { body } = req
  const payload = {
    ...defaultBody(body.height),
    ...body,
  }
  // TODO: create images and zip files
  res.status(200).json(payload)
}

const handler = (req: NextApiRequest, res: NextApiResponse<ResData>) => {
  const { method } = req
  return new Promise(() => {
    method === 'POST'
      ? create(req, res)
      : res
          .setHeader('Allow', ['POST'])
          .status(405)
          .end(`Method ${method} Not Allowed`)
  })
}

export default handler
