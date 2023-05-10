import fs from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { file } = req.query
  const url = path.join(process.cwd(), 'output', ...(file as string[]))

  fs.access(url, fs.constants.R_OK, (err) => {
    if (err) {
      res.status(404).send('Not found')
    } else {
      res.setHeader('Content-Type', 'application/octet-stream')
      fs.createReadStream(url).pipe(res)
    }
  })
}

export default handler
