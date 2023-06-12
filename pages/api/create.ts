import AdmZip from 'adm-zip'
import { Image, createCanvas, loadImage, registerFont } from 'canvas'
import filenamify from 'filenamify'
import { readFileSync } from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'

// const FontName = 'ZCOOLXiaoWei'
const FontName = 'LongCang'

type ResData =
  | {
      ok: boolean
    }
  | {
      statusCode: number
      message: string
    }

const makeImage = (payload: any, image: Image, name: string): Buffer => {
  const { width, height, x, y, s, c, a } = payload
  const canvas = createCanvas(parseInt(width, 10), parseInt(height, 10))
  const ctx = canvas.getContext('2d')
  ctx.drawImage(image, 0, 0, width, height)
  ctx.font = `${s}px ${FontName}`
  ctx.fillStyle = c
  ctx.textAlign = a

  ctx.fillText(name, x, y)

  return canvas.toBuffer('image/png')
}

// create images and zip files
const create = (req: NextApiRequest, res: NextApiResponse<ResData>) => {
  // create images and zip files
  const { uuid } = req.body
  const font = path.join('fonts', `${FontName}/${FontName}-Regular.ttf`)
  const base = path.join('output', uuid)
  const zip = new AdmZip()

  // read config file
  const config = JSON.parse(readFileSync(path.join(base, 'config'), 'utf-8'))

  // register font
  registerFont(font, { family: FontName })
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
        zip.addFile(`${filenamify(name)}.png`, makeImage(config, image, name))
      })

    // save zip file
    zip.writeZip(path.join(base, 'invitation.zip'), (err) => {
      if (err) {
        res.status(500).json({ statusCode: 500, message: err.message })
      } else {
        res.status(200).json({ ok: true })
      }
    })
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
