import type { File } from 'formidable'
import formidable from 'formidable'
import { mkdirSync, readFileSync, unlinkSync, writeFileSync } from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

type ResData =
  | {
      uuid: string
      width: number
      height: number
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
  const { imageSize } = require('image-size')
  const { join } = require('path')
  form.parse(req, (err, fields, files) => {
    const uuid = fields.uuid || uuidv4()
    const file = files.file as File
    const path = join('output', uuid, 'background')
    const url = saveFile(uuid as string, file)

    imageSize(path, (err: any, dimensions: ResData) => {
      if (err) {
        res.status(500).json({ statusCode: 500, message: err.message })
      } else {
        res.status(200).json({ uuid: uuid as string, url, ...dimensions })
      }
    })
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
