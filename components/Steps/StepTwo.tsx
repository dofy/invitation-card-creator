import { useData } from '@/context/Context'
import {
  Box,
  FormField,
  Heading,
  Image,
  RadioButtonGroup,
  RangeInput,
} from 'grommet'
import React, { useEffect, useState } from 'react'
import { GithubPicker } from 'react-color'

interface IStepTwoProps {
  onCompleted: () => void
}

const StepTwo: React.FC<IStepTwoProps> = ({ onCompleted }) => {
  const { uuid } = useData()
  const [top, setTop] = useState(0)
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [size, setSize] = useState(24)
  const [align, setAlign] = useState('left')
  const [color, setColor] = useState('#000000')

  useEffect(() => {
    fetch(`/api/size?uuid=${uuid}`)
      .then((res) => res.json())
      .then(({ width, height }) => {
        setRight(width)
        setWidth(width)
        setHeight(height)
      })
  }, [uuid])

  return (
    <Box gap="medium" pad="small">
      <Box gap="samll">
        {/* TODO: change to grid */}
        <Heading level={4}>Name Text:</Heading>
        <Box direction="row">
          <Box basis="1/2">
            <FormField label={`Left: ${left}`}>
              <RangeInput
                value={left}
                min={0}
                max={right}
                onChange={({ target: { value } }) => {
                  setLeft(parseInt(value))
                }}
              />
            </FormField>
          </Box>
          <Box basis="1/2">
            <FormField label={`Rigth: ${right}`}>
              <RangeInput
                value={right}
                min={left}
                max={width}
                onChange={({ target: { value } }) => {
                  setRight(parseInt(value))
                }}
              />
            </FormField>
          </Box>
        </Box>
        <Box direction="row">
          <Box basis="1/2">
            <FormField label={`Top: ${top}`}>
              <RangeInput
                value={top}
                min={0}
                max={height}
                onChange={({ target: { value } }) => {
                  setTop(parseInt(value))
                }}
              />
            </FormField>
          </Box>
          <Box basis="1/2">
            <FormField label={`Font Size: ${size}`}>
              <RangeInput
                value={size}
                min={0}
                max={64}
                onChange={({ target: { value } }) => {
                  setSize(parseInt(value))
                }}
              />
            </FormField>
          </Box>
        </Box>
        <Box direction="row">
          <Box basis="1/2">
            <FormField label="Text Align:">
              <RadioButtonGroup
                name="align"
                value={align}
                direction="row"
                options={['left', 'center', 'right']}
                onChange={({ target: { value } }) => setAlign(value)}
              />
            </FormField>
          </Box>
          <Box basis="1/2">
            <FormField label={`Font Color: ${color}`}>
              <GithubPicker
                color={color}
                colors={[
                  '#000000',
                  '#B80000',
                  '#DB3E00',
                  '#FCCB00',
                  '#008B02',
                  '#1273DE',
                  '#004DCF',
                  '#5300EB',
                  '#FFFFFF',
                  '#EB9694',
                  '#FAD0C3',
                  '#FEF3BD',
                  '#C1E1C5',
                  '#C4DEF6',
                  '#BED3F3',
                  '#D4C4FB',
                ]}
                onChangeComplete={({ hex }) => setColor(hex)}
              />
            </FormField>
          </Box>
        </Box>
      </Box>
      <Box flex="grow">
        <Image alt="background" src={`/output/${uuid}/background`} />
      </Box>
    </Box>
  )
}

export default StepTwo
