import type { CanvasTextAlign } from 'canvas'

type Config = {
  width?: number
  height?: number
  x?: number
  y?: number
  size?: number
  color?: string
  align?: CanvasTextAlign
  font?: string
  weight?: number
  fontName?: string
}

type Option = {
  label: string
  value: string
}

type Weight = {
  name: string
  value: number
}

type Font = {
  family: string
  ext: string
  weights: Weight[]
}
