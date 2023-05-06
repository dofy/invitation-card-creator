import fs from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'

type ResData =
  | {
      uuid: string
      url: string
    }
  | {
      statusCode: number
      message: string
    }

const handler = async (req: NextApiRequest, res: NextApiResponse<ResData>) => {
  // const uuid = req.query.uuid as string;
  const { body, method } = req
  const { uuid, bgfile } = body
  const folder = path.join(process.cwd(), 'public', 'output', uuid)
  switch (method) {
    case 'POST':
      try {
        // upload file
        fs.mkdirSync(folder, { recursive: true })
        // fs.writeFileSync(
        //   path.join(folder, 'background.png'),
        //   bgfile.replace(/^data:image\/png;base64,/, ''),
        //   'base64'
        // )
        res
          .status(200)
          .json({ uuid: folder, url: `/output/${uuid}/background.png` })
      } catch (err: any) {
        res.status(500).json({ statusCode: 500, message: folder })
        // res.status(500).json({ statusCode: 500, message: err.message })
      }
      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default handler
