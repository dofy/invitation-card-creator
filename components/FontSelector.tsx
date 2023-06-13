import { Config, Option } from '@/types'
import { fonts } from '@/utils/Fonts'
import { Box, FormField, Select, Text } from 'grommet'
import React from 'react'

interface IFontSelectorProps {
  config?: Config
  onChange?: (...args: any[]) => void
}

const fontOptions: Option[] = []
for (const font of fonts) {
  const weights = font.weights
  for (const weight of weights) {
    fontOptions.push({
      label: `${font.family}_${weight.name}`,
      value: `${font.family}:${weight.value}`,
    })
  }
}

const FontValue = (config?: Config) => {
  return (
    <Box pad="small">
      <Text
        size="large"
        weight={config?.weight}
        style={{ fontFamily: config?.font }}
      >
        {config?.fontName}
      </Text>
    </Box>
  )
}

const FontOption = (props: any) => {
  const { option, config } = props
  const [family, weight] = option.value.split(':')
  const selected = option.value === `${config?.font}:${config?.weight}`
  return (
    <Box pad="small" background={selected ? 'brand' : ''}>
      <Text
        size="large"
        weight={parseInt(weight, 10)}
        style={{ fontFamily: family }}
      >
        {option.label}
      </Text>
    </Box>
  )
}

const FontSelector: React.FC<IFontSelectorProps> = ({ config, onChange }) => {
  return (
    <FormField label="字体:">
      <Select
        options={fontOptions}
        onChange={onChange}
        value={FontValue(config)}
      >
        {(option) => <FontOption option={option} config={config} />}
      </Select>
    </FormField>
  )
}

export default FontSelector
