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
      <Text size="large" weight={config?.w} style={{ fontFamily: config?.f }}>
        {config?.fn}
      </Text>
    </Box>
  )
}

const FontOption = (option: any) => {
  const [family, weight] = option.value.split(':')
  return (
    <Box pad="small">
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
        {FontOption}
      </Select>
    </FormField>
  )
}

export default FontSelector
