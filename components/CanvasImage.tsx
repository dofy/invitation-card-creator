import { createCanvas } from 'canvas'
import { Image } from 'grommet'
import React, { useEffect, useState } from 'react'

interface ICanvasImageProps {
  width: number
  height: number
  top?: number
  left?: number
  size?: number
  color?: string
  align?: CanvasTextAlign
  font?: string
  weight?: number
  text: string
}

const CanvasImage: React.FC<ICanvasImageProps> = ({
  width,
  height,
  top = 0,
  left = 0,
  size = 16,
  color = '#000000',
  align = 'left',
  font = 'ZCOOL QingKe HuangYou',
  weight = 400,
  text,
}) => {
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  const [src, setSrc] = useState('')

  useEffect(() => {
    ctx.font = `${weight} ${size}px "${font}"`
    ctx.fillStyle = color
    ctx.textAlign = align
    ctx.textBaseline = 'middle'
    // ctx.translate(width / 2, height / 2)
    // ctx.rotate(90 * (Math.PI / 180))
    ctx.fillText(text, left, top)

    setSrc(canvas.toDataURL())
  }, [canvas, ctx, text, width, size, color, align, left, top, font, weight])

  return <Image alt="preview" src={src} />
}

export default CanvasImage
