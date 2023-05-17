import fs from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { file, type } = req.query
  const url = path.join(process.cwd(), 'output', ...(file as string[]))

  try {
    fs.accessSync(url, fs.constants.R_OK)
    if (type && type === 'text') {
      res.status(200).json({ content: fs.readFileSync(url, 'utf8') })
    } else {
      res.setHeader('Content-Type', 'application/octet-stream')
      fs.createReadStream(url).pipe(res)
    }
  } catch (err) {
    res.status(404).send('Not found')
  }
}

export default handler
