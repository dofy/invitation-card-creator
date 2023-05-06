import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid'

type ResData = {
  uuid: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResData>
) {
  const { method } = req
  switch (method) {
    case 'GET':
      res.status(200).json({ uuid: uuidv4() })
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
