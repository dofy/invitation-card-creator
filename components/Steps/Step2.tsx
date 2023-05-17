import {
  Box,
  FormField,
  Heading,
  Image,
  RadioButtonGroup,
  RangeInput,
  Stack,
} from 'grommet'
import { useRouter } from 'next/router'
import React from 'react'
import CanvasImage from '../CanvasImage'
import ColorPicker from '../ColorPicker'
import StepCard from '../StepCard'

const Step2: React.FC = () => {
  const router = useRouter()

  const { id, uuid, width, height, x, y, s, c, a } = router.query

  const replaceParams = (params: any) => {
    router.replace(
      {
        pathname: '/',
        query: {
          ...router.query,
          ...params,
        },
      },
      undefined,
      { shallow: true }
    )
  }

  const toNumber = (
    value: string | string[] | undefined,
    defaultValue = 0
  ): number => parseInt(value as string, 10) || defaultValue

  const defaultY = (): number => {
    const result = toNumber(y)
    const imgHeight = toNumber(height)

    return result || (imgHeight ? Math.round(imgHeight / 3) : 0)
  }

  return (
    <StepCard
      step={2}
      description="Update the Name Box position and style"
      canGoBack={true}
      onPrevious={() => router.back()}
      canNext={true}
      onNext={() =>
        router.push({
          pathname: '/',
          query: {
            ...router.query,
            step: 3,
          },
        })
      }
    >
      <Box gap="medium" pad="small">
        <Box gap="samll">
          <Box direction="row">
            <Box fill={true}>
              <FormField label={`X: ${toNumber(x)}`}>
                <RangeInput
                  value={toNumber(x)}
                  min={0}
                  max={toNumber(width, 10)}
                  onChange={({ target: { value } }) => {
                    replaceParams({ x: value })
                  }}
                />
              </FormField>
            </Box>
            <Box fill={true}>
              <FormField label={`Y: ${defaultY()}`}>
                <RangeInput
                  value={defaultY()}
                  min={0}
                  max={toNumber(height, 10)}
                  onChange={({ target: { value } }) => {
                    replaceParams({ y: value })
                  }}
                />
              </FormField>
            </Box>
            <Box fill={true}>
              <FormField label={`Font Size: ${toNumber(s, 64)}`}>
                <RangeInput
                  value={toNumber(s, 64)}
                  min={12}
                  max={512}
                  onChange={({ target: { value } }) => {
                    replaceParams({ s: value })
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
                  value={a || 'left'}
                  direction="row"
                  options={['left', 'center', 'right']}
                  onChange={({ target: { value } }) =>
                    replaceParams({ a: value })
                  }
                />
              </FormField>
            </Box>
            <Box fill={true}>
              <FormField label="Font Color:">
                <ColorPicker
                  color={(c as string) || '#000000'}
                  onChange={(c) => {
                    replaceParams({ c })
                  }}
                />
              </FormField>
            </Box>
          </Box>
        </Box>
        <Box flex="grow">
          <Stack>
            <Box>
              <Image
                alt={`background width:${width} height:${height}`}
                src={`/api/output/${uuid}/background?id=${id}`}
              />
            </Box>
            <Box>
              <CanvasImage
                width={toNumber(width, 10)}
                height={toNumber(height, 10)}
                top={defaultY()}
                left={toNumber(x)}
                size={toNumber(s, 64)}
                color={c as string}
                align={a as CanvasTextAlign}
                text="[姓名 Name]"
              />
            </Box>
          </Stack>
        </Box>
      </Box>
    </StepCard>
  )
}

export default Step2
