import { useData } from '@/context/Context'
import { replaceParams } from '@/utils/Tools'
import { Box, Button, FileInput, Markdown, Text } from 'grommet'
import { Chat, CloudUpload } from 'grommet-icons'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import StepCard from '../StepCard'

const checkImageType = (files?: File[]) => {
  const allowedTypes = ['text/plain']
  return files && files.length > 0 && allowedTypes.includes(files[0].type)
}

const Step3: React.FC = () => {
  const router = useRouter()
  const { uuid, id } = router.query

  const { showMessage, hideMessage } = useData()

  const [files, setFiles] = useState<File[]>()
  const [canNext, setCanNext] = useState<boolean>(false)
  const [names, setNames] = useState<string[]>()

  useEffect(() => {
    if (!canNext && uuid && id) {
      setCanNext(true)
    }
    if (canNext) {
      fetch(`/api/output/${uuid}/names?type=json`)
        .then((res) => res.json())
        .then(({ content }) => {
          setNames(
            content
              .split(/\r\n|\r|\n/)
              .map((name: string) => name.trim())
              .filter(Boolean)
          )
        })
    }
  }, [canNext, uuid, id])

  const uploadHandler = () => {
    const formData = new FormData()
    files && formData.append('file', files[0])
    formData.append('uuid', uuid as string)

    fetch('/api/upload/text', {
      method: 'POST',
      body: formData,
    })
      .then((res: Response) => res.json())
      .then(({ id }) => {
        if (id) {
          setCanNext(true)
          showMessage('恭喜 🎉', '嘉宾列表上传完成.')
          replaceParams(router, { id })
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <StepCard
      step={3}
      description="上传嘉宾列表"
      canGoBack={true}
      onPrevious={() => replaceParams(router, { step: 2 })}
      canNext={canNext}
      onNext={() => {
        hideMessage()
        router.push({
          pathname: '/',
          query: {
            ...router.query,
            step: 4,
            id: null,
          },
        })
      }}
    >
      <Box gap="medium" pad="small">
        <Box direction="row" gap="small">
          <Chat color="focus" />
          <Text as="em" color="focus">
            嘉宾列表请保存成 txt 文件, 每行一个姓名.
          </Text>
        </Box>
        <FileInput
          messages={{
            dropPrompt: '拖拽「受邀嘉宾列表」到这里，或者',
            browse: '浏览...',
          }}
          onChange={(_, files) => {
            setFiles(files?.files)
          }}
        />
        <Button
          disabled={!checkImageType(files)}
          icon={<CloudUpload />}
          label="上传嘉宾列表"
          onClick={uploadHandler}
        />
        {names && (
          <Box>
            <Box>嘉宾列表预览（共{names.length}人）:</Box>
            <Box
              height="small"
              overflow="auto"
              pad="small"
              background="light-2"
            >
              <Markdown>{`1. ${names.join('\n1. ')}`}</Markdown>
            </Box>
          </Box>
        )}
      </Box>
    </StepCard>
  )
}

export default Step3
