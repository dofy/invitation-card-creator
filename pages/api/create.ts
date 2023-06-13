import { fonts } from '@/utils/Fonts'
import AdmZip from 'adm-zip'
import { Image, createCanvas, loadImage, registerFont } from 'canvas'
import filenamify from 'filenamify'
import { readFileSync } from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'

// register font
fonts.forEach((font) => {
  const { family, ext, weights } = font
  weights.forEach((weight) => {
    const { value, name } = weight
    const folder = family.replaceAll(' ', '_')
    const file = family.replaceAll(' ', '')
    const fontPath = path.join('fonts', `${folder}/${file}-${name}.${ext}`)
    registerFont(fontPath, { family, weight: value.toString() })
  })
})

type ResData =
  | {
      ok: boolean
    }
  | {
      statusCode: number
      message: string
    }

const makeImage = (payload: any, image: Image, name: string): Buffer => {
  const { width, height, x, y, size, color, align, font, weight } = payload
  const canvas = createCanvas(parseInt(width, 10), parseInt(height, 10))
  const ctx = canvas.getContext('2d')
  ctx.drawImage(image, 0, 0, width, height)
  ctx.font = `${weight} ${size}px "${font}"`
  ctx.fillStyle = color
  ctx.textAlign = align
  ctx.textBaseline = 'middle'

  ctx.fillText(name, x, y)

  return canvas.toBuffer('image/png')
}

// create images and zip files
const create = (req: NextApiRequest, res: NextApiResponse<ResData>) => {
  // create images and zip files
  const { uuid } = req.body
  const base = path.join('output', uuid)
  const zip = new AdmZip()

  // read config file
  const config = JSON.parse(readFileSync(path.join(base, 'config'), 'utf-8'))

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
