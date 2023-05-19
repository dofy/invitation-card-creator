import { writeFileSync } from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'

type ResData =
  | {
      ok: boolean
    }
  | {
      statusCode: number
      message: string
    }

const post = (req: NextApiRequest, res: NextApiResponse<ResData>) => {
  const { uuid, config } = req.body
  writeFileSync(`output/${uuid}/config`, JSON.stringify(config))
  res.status(200).json({ ok: true })
}

const handler = (req: NextApiRequest, res: NextApiResponse<ResData>) => {
  const { method } = req
  return new Promise(() => {
    method === 'POST'
      ? post(req, res)
      : res
          .setHeader('Allow', ['POST'])
          .status(405)
          .end(`Method ${method} Not Allowed`)
  })
}

export default handler
