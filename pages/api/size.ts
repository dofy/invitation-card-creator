import { NextApiRequest, NextApiResponse } from 'next'
import { cwd } from 'process'

type ResData =
  | {
      width: number
      height: number
    }
  | {
      statusCode: number
      message: string
    }

const getImageSize = (uuid: string, res: NextApiResponse<ResData>) => {
  const { imageSize } = require('image-size')
  const { join } = require('path')
  const path = join(cwd(), 'public', 'output', uuid, 'background')

  imageSize(path, (err: any, dimensions: ResData) => {
    if (err) {
      res.status(500).json({ statusCode: 500, message: err.message })
    } else {
      res.status(200).json(dimensions)
    }
  })
}

const handler = (req: NextApiRequest, res: NextApiResponse<ResData>) => {
  const { query, method } = req
  const { uuid } = query
  return new Promise(() => {
    method === 'GET'
      ? getImageSize(uuid as string, res)
      : res
          .setHeader('Allow', ['GET'])
          .status(405)
          .end(`Method ${method} Not Allowed`)
  })
}

export default handler
