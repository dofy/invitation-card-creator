import { Box, Stack } from 'grommet'
import React, { useState } from 'react'
import { GithubPicker } from 'react-color'

interface IColorPickerProps {
  color: string
  onChange: (color: string) => void
}

const ColorPicker: React.FC<IColorPickerProps> = ({ color, onChange }) => {
  const [show, setShow] = useState(false)

  return (
    <Stack
      style={{
        zIndex: 1,
      }}
    >
      <Box
        onClick={() => setShow(!show)}
        background={color}
        pad={'14.2px'}
        margin="small"
        border={{
          color: 'brand',
        }}
      />
      {show && (
        <GithubPicker
          color={color}
          triangle="hide"
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
          onChange={({ hex }) => {
            setShow(false)
            onChange(hex)
          }}
        />
      )}
    </Stack>
  )
}

export default ColorPicker
