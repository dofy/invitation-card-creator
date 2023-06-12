import type { CanvasTextAlign } from 'canvas'

type Config = {
  width?: number
  height?: number
  x?: number
  y?: number
  s?: number
  c?: string
  a?: CanvasTextAlign
  fn?: string
  f?: string
  w?: number
}

type Option= {
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
