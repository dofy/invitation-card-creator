import {
  Box,
  FormField,
  Heading,
  Image,
  RadioButtonGroup,
  RangeInput,
  Stack,
} from 'grommet'
import React, { useEffect, useState } from 'react'
import CanvasImage from '../CanvasImage'
import ColorPicker from '../ColorPicker'

interface IStepTwoProps {
  goNext: () => void
}

const StepTwo: React.FC<IStepTwoProps> = ({ goNext }) => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const [left, setLeft] = useState(0)
  const [top, setTop] = useState(0)
  const [size, setSize] = useState(0)
  const [color, setColor] = useState('#000000')
  const [align, setAlign] = useState<CanvasTextAlign>('left')

  // TODO: get UUID from StepOne
  const uuid = ''

  useEffect(() => {
    fetch(`/api/size?uuid=${uuid}`)
      .then((res) => res.json())
      .then(({ width, height }) => {
        // TODO: top init
        setWidth(width)
        setHeight(height)
        goNext()
      })
  }, [goNext])

  return (
    <Box gap="medium" pad="small">
      <Box gap="samll">
        <Heading level={4}>Name Text Box:</Heading>
        <Box direction="row">
          <Box fill={true}>
            <FormField label={`X: ${left}`}>
              <RangeInput
                value={left}
                min={0}
                max={width}
                onChange={({ target: { value } }) => {
                  setLeft(parseInt(value))
                }}
              />
            </FormField>
          </Box>
          <Box fill={true}>
            <FormField label={`Y: ${top}`}>
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
          <Box fill={true}>
            <FormField label={`Font Size: ${size}`}>
              <RangeInput
                value={size}
                min={12}
                max={512}
                onChange={({ target: { value } }) => {
                  setSize(parseInt(value))
                }}
              />
            </FormField>
          </Box>
        </Box>
        <Box direction="row">
          <Box fill={true}>
            <FormField label="Text Align:">
              <RadioButtonGroup
                name="align"
                value={align}
                direction="row"
                options={['left', 'center', 'right']}
                onChange={({ target: { value } }) =>
                  setAlign(value as CanvasTextAlign)
                }
              />
            </FormField>
          </Box>
          <Box fill={true}>
            <FormField label="Font Color:">
              <ColorPicker color={color} onChange={setColor} />
            </FormField>
          </Box>
        </Box>
      </Box>
      <Box flex="grow">
        <Stack>
          <Box>
            <Image
              alt="background"
              fit="cover"
              src={`/api/output/${uuid}/background`}
            />
          </Box>
          <Box>
            <CanvasImage
              width={width}
              height={height}
              top={top}
              left={left}
              size={size}
              color={color}
              align={align}
              text="[姓名 Name]"
            />
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}

export default StepTwo
