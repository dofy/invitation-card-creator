import { Config } from '@/types'
import { fonts } from '@/utils/Fonts'
import { replaceParams, toNumber } from '@/utils/Tools'
import {
  Box,
  FormField,
  Image,
  RadioButtonGroup,
  RangeInput,
  Stack,
  Text,
} from 'grommet'
import { Notification } from 'grommet-icons'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import CanvasImage from '../CanvasImage'
import ColorPicker from '../ColorPicker'
import FontSelector from '../FontSelector'
import StepCard from '../StepCard'

const Step2: React.FC = () => {
  const router = useRouter()
  const { uuid } = router.query

  const [config, setConfig] = useState<Config>()

  const [v, setV] = useState<number>()

  useHotkeys(
    [
      'w', // up
      's', // down
      'a', // left
      'd', // right
      'q', // -size
      'e', // +size
      'shift+w',
      'shift+s',
      'shift+a',
      'shift+d',
      'shift+q',
      'shift+e',
      'h',
      'j',
      'k',
      'l',
      // extend
      'up',
      'down',
      'left',
      'right',
      'shift+up',
      'shift+down',
      'shift+left',
      'shift+right',
    ],
    (_, handler) => {
      let newConfig = {}
      const step = handler.shift ? 10 : 1
      switch (handler.keys?.join('')) {
        case 'a':
        case 'left':
          newConfig = { x: (config?.x ?? 0) - step }
          break
        case 'd':
        case 'right':
          newConfig = { x: (config?.x ?? 0) + step }
          break
        case 'h':
          newConfig = { x: Math.round((config?.width ?? 0) / 2) }
          break
        case 'w':
        case 'up':
          newConfig = { y: (config?.y ?? 0) - step }
          break
        case 's':
        case 'down':
          newConfig = { y: (config?.y ?? 0) + step }
          break
        case 'q':
          newConfig = { size: (config?.size ?? 0) - step }
          break
        case 'e':
          newConfig = { size: (config?.size ?? 0) + step }
          break
        case 'j':
          newConfig = { align: 'left' }
          break
        case 'k':
          newConfig = { align: 'center' }
          break
        case 'l':
          newConfig = { align: 'right' }
          break
      }
      setConfig({ ...config, ...newConfig })
    },
    { enableOnFormTags: true, preventDefault: true }
  )

  useEffect(() => {
    if (uuid) {
      setV(Math.random())
      fetch(`/api/output/${uuid}/config`)
        .then((res) => res.json())
        .then((config) => {
          setConfig({
            x: 0,
            size: 64,
            align: 'left',
            color: '#000000',
            y: Math.round(config.height / 3),
            font: fonts[0].family,
            weight: fonts[0].weights[0].value,
            fontName: `${fonts[0].family}_${fonts[0].weights[0].name}`,
            ...config,
          })
        })
    }
  }, [uuid])

  const saveConfig = () => {
    fetch(`/api/config`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uuid, config }),
    })
  }

  return (
    <StepCard
      step={2}
      description="设置嘉宾姓名的位置与样式"
      canGoBack={true}
      onPrevious={() => replaceParams(router, { step: 1 })}
      canNext={true}
      onNext={() => {
        saveConfig()
        replaceParams(router, { step: 3 })
      }}
    >
      <Box gap="medium" pad="small">
        <Box gap="samll">
          <Box direction="row">
            <Box fill={true}>
              <FormField label={`X: ${config?.x}`}>
                <RangeInput
                  value={config?.x}
                  min={0}
                  max={config?.width}
                  onChange={({ target: { value } }) =>
                    setConfig({
                      ...config,
                      x: toNumber(value),
                    })
                  }
                />
              </FormField>
            </Box>
            <Box fill={true}>
              <FormField label={`Y: ${config?.y}`}>
                <RangeInput
                  value={config?.y}
                  min={0}
                  max={config?.height}
                  onChange={({ target: { value } }) =>
                    setConfig({
                      ...config,
                      y: toNumber(value),
                    })
                  }
                />
              </FormField>
            </Box>
            <Box fill={true}>
              <FormField label={`字号: ${config?.size}px`}>
                <RangeInput
                  value={config?.size}
                  min={12}
                  max={512}
                  onChange={({ target: { value } }) =>
                    setConfig({
                      ...config,
                      size: toNumber(value),
                    })
                  }
                />
              </FormField>
            </Box>
          </Box>
          <Box direction="row">
            <Box fill={true}>
              <FormField label="文本对齐方式:">
                <RadioButtonGroup
                  name="align"
                  value={config?.align}
                  direction="row"
                  options={[
                    { label: '居左', value: 'left' },
                    { label: '居中', value: 'center' },
                    { label: '居右', value: 'right' },
                  ]}
                  onChange={({ target: { value } }) =>
                    setConfig({
                      ...config,
                      align: value as CanvasTextAlign,
                    })
                  }
                />
              </FormField>
            </Box>
            <Box fill={true}>
              <FormField label="文字颜色:">
                <ColorPicker
                  color={config?.color as string}
                  onChange={(color) =>
                    setConfig({
                      ...config,
                      color,
                    })
                  }
                />
              </FormField>
            </Box>
          </Box>
          <Box direction="row">
            <Box fill={true}>
              <FontSelector
                config={config}
                onChange={({ option }) => {
                  const { label, value } = option
                  const [font, weight] = value.split(':')
                  setConfig({
                    ...config,
                    font,
                    weight: parseInt(weight, 10),
                    fontName: label,
                  })
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box flex="grow">
          <Stack>
            <Box>
              <Image
                alt={`background image`}
                src={`/api/output/${uuid}/background?v=${v}`}
              />
            </Box>
            <Box>
              <CanvasImage
                width={config?.width as number}
                height={config?.height as number}
                top={config?.y}
                left={config?.x}
                size={config?.size}
                color={config?.color}
                align={config?.align}
                font={config?.font}
                weight={config?.weight}
                text="[姓名 Name]"
              />
            </Box>
          </Stack>
        </Box>
        <Box>
          <Text size="small" as="strong" color="brand">
            <Notification color="brand" size="small" /> 提示:
          </Text>
          <Text size="small" as="em" color="brand">
            - 方向键微调文字位置，Shift+方向键以 10px 为单位调整文字位置。
          </Text>
          <Text size="small" as="em" color="brand">
            - W、S、A、D 等同于方向键。
          </Text>
          <Text size="small" as="em" color="brand">
            - Q、E 设置文字的大小，配合 Shift 以 10px 为单位调整文字大小。
          </Text>
          <Text size="small" as="em" color="brand">
            - J、K、L 对应文字的对齐方式（左、中、右）。
          </Text>
          <Text size="small" as="em" color="brand">
            - H 将文字横坐标置于图片中心。
          </Text>
        </Box>
      </Box>
    </StepCard>
  )
}

export default Step2
