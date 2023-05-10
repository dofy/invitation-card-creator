import type { File } from 'formidable'
import formidable from 'formidable'
import { mkdirSync, readFileSync, unlinkSync, writeFileSync } from 'fs'
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

export const config = {
  api: {
    bodyParser: false,
  },
}

const post = (req: NextApiRequest, res: NextApiResponse<ResData>) => {
  const form = new formidable.IncomingForm()
  form.parse(req, (err, fields, files) => {
    const { uuid } = fields
    const file = files.file as File
    const url = saveFile(uuid as string, file)
    res.status(200).json({ uuid: uuid as string, url })
  })
}

const saveFile = (uuid: string, file: File) => {
  // create path
  const folder = path.join(process.cwd(), 'output', uuid)
  mkdirSync(folder, { recursive: true })
  // read and write file
  const data = readFileSync(file.filepath)
  writeFileSync(`${folder}/background`, data)
  unlinkSync(file.filepath)
  return `/output/${uuid}/background`
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
