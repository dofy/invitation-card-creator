import AdmZip from 'adm-zip'
import { Image, createCanvas, loadImage, registerFont } from 'canvas'
import filenamify from 'filenamify'
import { readFileSync } from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'

type ResData =
  | {
      id: string
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

const makeImage = (payload: any, image: Image, name: string): Buffer => {
  const { width, height, x, y, s, c, a } = payload
  const canvas = createCanvas(parseInt(width, 10), parseInt(height, 10))
  const ctx = canvas.getContext('2d')
  ctx.drawImage(image, 0, 0, width, height)
  ctx.font = `${s}px ZCOOLXiaoWei`
  ctx.fillStyle = c
  ctx.textAlign = a

  ctx.fillText(name, x, y)

  return canvas.toBuffer('image/png')
}

// create images and zip files
const create = (req: NextApiRequest, res: NextApiResponse<ResData>) => {
  const { body } = req
  const payload = {
    ...defaultBody(body.height),
    ...body,
  }

  // create images and zip files
  const { uuid } = payload
  const cwd = process.cwd()
  const font = path.join(cwd, 'fonts', 'ZCOOLXiaoWei-Regular.ttf')
  const base = path.join(cwd, 'output', uuid)
  const zip = new AdmZip()

  // register font
  registerFont(font, { family: 'ZCOOLXiaoWei' })
  // read background image
  loadImage(path.join(base, 'background')).then((image) => {
    // read names file
    readFileSync(path.join(base, 'names'), 'utf-8')
      // slice names by line
      .split(/\r\n|\r|\n/)
      // trim and filter empty line
      .map((name) => name.trim())
      .filter(Boolean)
      // create images and zip files
      .forEach((name) => {
        zip.addFile(`${filenamify(name)}.png`, makeImage(payload, image, name))
      })

    // save zip file
    zip.writeZip(path.join(base, 'invitation.zip'))

    // response random id
    res.status(200).json({ id: Math.random().toString(36).substring(2) })
  })
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
