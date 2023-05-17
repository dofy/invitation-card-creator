import { NextApiRequest, NextApiResponse } from 'next'
import { readFileSync } from 'fs'
import path from 'path'
import { createCanvas, loadImage } from 'canvas'

type ResData =
  | {
      done: boolean
    }
  | {
      statusCode: number
      message: string
    }

// create images and zip files
const create = (req: NextApiRequest, res: NextApiResponse<ResData>) => {
  const { uuid,width,height, x, y, c, s, a } = req.body
  const url = path.join(process.cwd(), 'output', uuid, 'name-list')
  const content = readFileSync(url, 'utf8')
  const names = content.split(/\r\n|\r|\n/).filter((name) => name !== '')
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')
  const images = names.map((name) => loadImage(`/output/${uuid}/background`))
  Promise.all(images).then((images) => {
    images.forEach((image, index) => {
      ctx.drawImage(image, x[index], y[index], c[index], s[index])
    })
    const buffer = canvas.toBuffer('image/png')

    res.status(200).json({
      done: true,
    })
  }
}

const handler = (req: NextApiRequest, res: NextApiResponse<ResData>) => {
  const { method } = req
  return new Promise(() => {
    method === 'POST'
      ? create
      : res
          .setHeader('Allow', ['POST'])
          .status(405)
          .end(`Method ${method} Not Allowed`)
  })
}

export default handler
