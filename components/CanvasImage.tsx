import { createCanvas } from 'canvas'
import { Image } from 'grommet'
import React, { useEffect, useState } from 'react'

interface ICanvasImageProps {
  width: number
  height: number
  top: number
  left: number
  fontSize: number
  fontColor: string
  fontAlign: CanvasTextAlign
  text: string
}

const CanvasImage: React.FC<ICanvasImageProps> = ({
  width,
  height,
  top,
  left,
  fontSize,
  fontColor,
  fontAlign,
  text,
}) => {
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  const [src, setSrc] = useState('')

  useEffect(() => {
    ctx.font = `${fontSize}px "ZCOOL XiaoWei"`
    ctx.fillStyle = fontColor
    ctx.textAlign = fontAlign
    ctx.fillText(text, left, top, width)

    setSrc(canvas.toDataURL())
  }, [canvas, ctx, top, left, fontSize, fontColor, fontAlign, text, width])

  return <Image alt="preview" src={src} />
}

export default CanvasImage
