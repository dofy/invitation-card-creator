import { replaceParams, toNumber } from '@/utils/Tools'
import {
  Box,
  FormField,
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

  const defaultY = (): number => {
    const result = toNumber(y)
    const imgHeight = toNumber(height)

    return result || (imgHeight ? Math.round(imgHeight / 3) : 0)
  }

  return (
    <StepCard
      step={2}
      description="设置嘉宾姓名的位置与样式"
      canGoBack={true}
      onPrevious={() => replaceParams(router, { step: 1 })}
      canNext={true}
      onNext={() =>
        router.push({
          pathname: '/',
          query: {
            ...router.query,
            step: 3,
            id: null,
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
                    replaceParams(router, { x: value })
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
                    replaceParams(router, { y: value })
                  }}
                />
              </FormField>
            </Box>
            <Box fill={true}>
              <FormField label={`字号: ${toNumber(s, 64)}px`}>
                <RangeInput
                  value={toNumber(s, 64)}
                  min={12}
                  max={512}
                  onChange={({ target: { value } }) => {
                    replaceParams(router, { s: value })
                  }}
                />
              </FormField>
            </Box>
          </Box>
          <Box direction="row">
            <Box fill={true}>
              <FormField label="文本对齐方式:">
                <RadioButtonGroup
                  name="align"
                  value={a || 'left'}
                  direction="row"
                  options={[
                    { label: '居左', value: 'left' },
                    { label: '居中', value: 'center' },
                    { label: '居右', value: 'right' },
                  ]}
                  onChange={({ target: { value } }) =>
                    replaceParams(router, { a: value })
                  }
                />
              </FormField>
            </Box>
            <Box fill={true}>
              <FormField label="文字颜色:">
                <ColorPicker
                  color={(c as string) || '#000000'}
                  onChange={(c) => {
                    replaceParams(router, { c })
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
                color={(c as string) || '#000000'}
                align={(a as CanvasTextAlign) || 'left'}
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
