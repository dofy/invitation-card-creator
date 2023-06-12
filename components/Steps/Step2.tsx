import { Config } from '@/types'
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
import StepCard from '../StepCard'

const Step2: React.FC = () => {
  const router = useRouter()
  const { uuid } = router.query

  const [config, setConfig] = useState<Config>()

  const [v, setV] = useState<number>()

  useHotkeys(
    [
      'left',
      'right',
      'up',
      'down',
      'shift+up',
      'shift+down',
      'l',
      'r',
      'c',
      'h',
    ],
    (_, handler) => {
      let newConfig = {}
      switch (handler.keys?.join('')) {
        case 'left':
          newConfig = { x: (config?.x ?? 0) - 1 }
          break
        case 'right':
          newConfig = { x: (config?.x ?? 0) + 1 }
          break
        case 'h':
          newConfig = { x: Math.round((config?.width ?? 0) / 2) }
          break
        case 'up':
          newConfig = handler.shift
            ? { s: (config?.s ?? 0) + 1 }
            : { y: (config?.y ?? 0) - 1 }
          break
        case 'down':
          newConfig = handler.shift
            ? { s: (config?.s ?? 0) - 1 }
            : { y: (config?.y ?? 0) + 1 }
          break
        case 'l':
          newConfig = { a: 'left' }
          break
        case 'r':
          newConfig = { a: 'right' }
          break
        case 'c':
          newConfig = { a: 'center' }
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
            s: 64,
            a: 'left',
            c: '#000000',
            y: Math.round(config.height / 3),
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
              <FormField label={`字号: ${config?.s}px`}>
                <RangeInput
                  value={config?.s}
                  min={12}
                  max={512}
                  onChange={({ target: { value } }) =>
                    setConfig({
                      ...config,
                      s: toNumber(value),
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
                  value={config?.a}
                  direction="row"
                  options={[
                    { label: '居左', value: 'left' },
                    { label: '居中', value: 'center' },
                    { label: '居右', value: 'right' },
                  ]}
                  onChange={({ target: { value } }) =>
                    setConfig({
                      ...config,
                      a: value as CanvasTextAlign,
                    })
                  }
                />
              </FormField>
            </Box>
            <Box fill={true}>
              <FormField label="文字颜色:">
                <ColorPicker
                  color={config?.c as string}
                  onChange={(c) =>
                    setConfig({
                      ...config,
                      c,
                    })
                  }
                />
              </FormField>
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
                size={config?.s}
                color={config?.c}
                align={config?.a}
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
            - 方向键微调文字位置， Shift+上/下 微调字号。
          </Text>
          <Text size="small" as="em" color="brand">
            - 按 L、C、R 可以快速设置文字的对齐方式。
          </Text>
          <Text size="small" as="em" color="brand">
            - 按 H 设置文字横向居中。
          </Text>
        </Box>
      </Box>
    </StepCard>
  )
}

export default Step2
