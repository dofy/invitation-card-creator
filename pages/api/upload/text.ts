import type { File } from 'formidable'
import formidable from 'formidable'
import fs, { mkdirSync, readFileSync, unlinkSync, writeFileSync } from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'

type ResData =
  | {
      id: string
      content: string
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
  form.parse(req, (_, fields, files) => {
    const uuid = fields.uuid
    const file = files.file as File

    const content = fs.readFileSync(file.filepath, 'utf8')

    saveFile(uuid as string, file)
    res.status(200).json({
      id: file.newFilename,
      content,
    })
  })
}

const saveFile = (uuid: string, file: File) => {
  // create path
  const folder = path.join(process.cwd(), 'output', uuid)
  mkdirSync(folder, { recursive: true })
  // read and write file
  const data = readFileSync(file.filepath)
  writeFileSync(`${folder}/name-list`, data)
  unlinkSync(file.filepath)
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
