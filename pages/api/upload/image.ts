import type { File } from 'formidable'
import formidable from 'formidable'
import { mkdirSync, readFileSync, unlinkSync, writeFileSync } from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import path, { join } from 'path'
import { v4 as uuidv4 } from 'uuid'

type ResData =
  | {
      uuid: string
      // TODO: remove
      id: string
      width: number
      height: number
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
  form.parse(req, (_, fields, files) => {
    const uuid = (fields.uuid as string) || uuidv4()
    const file = files.file as File

    saveFile(uuid, file)

    imageSize(
      join('output', uuid, 'background'),
      (err: any, dimensions: any) => {
        if (err) {
          res.status(500).json({ statusCode: 500, message: err.message })
        } else {
          writeFileSync(
            join('output', uuid, 'config'),
            JSON.stringify(dimensions)
          )
          res.status(200).json({ uuid, ...dimensions, id: file.newFilename })
        }
      }
    )
  })
}

const saveFile = (uuid: string, file: File) => {
  // create path
  const folder = path.join('output', uuid)
  mkdirSync(folder, { recursive: true })
  // read and write file
  const data = readFileSync(file.filepath)
  writeFileSync(`${folder}/background`, data)
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
