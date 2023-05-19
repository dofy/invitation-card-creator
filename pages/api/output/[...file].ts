import { createReadStream, existsSync, readFileSync } from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'

export const config = {
  api: {
    responseLimit: false,
  },
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { file, type } = req.query
  const url = path.join('output', ...(file as string[]))

  try {
    switch (type) {
      case 'stat':
        res.status(200).json({ exists: existsSync(url) })
        break
      case 'json':
        res.status(200).json({ content: readFileSync(url, 'utf8') })
        break
      case 'text':
        res.status(200).send(readFileSync(url, 'utf8'))
        break
      default:
        res.setHeader('Content-Type', 'application/octet-stream')
        createReadStream(url).pipe(res)
    }
  } catch (err) {
    res.status(404).send(`File "${path.join(...(file as string[]))}" Not found`)
  }
}

export default handler
