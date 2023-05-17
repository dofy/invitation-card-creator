import { useData } from '@/context/Context'
import { replaceParams } from '@/utils/Tools'
import { Box, Button, FileInput, TextArea } from 'grommet'
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
  const [content, setContent] = useState<string>()

  useEffect(() => {
    if (!canNext && uuid && id) {
      setCanNext(true)
    }
    if (canNext) {
      fetch(`/api/output/${uuid}/name-list?type=text`)
        .then((res) => res.json())
        .then(({ content }) => {
          setContent(content)
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
          showMessage('Success', 'Name-List File Uploaded')
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
      description="Upload the Name-List file"
      canGoBack={true}
      onPrevious={() => router.back()}
      canNext={canNext}
      onNext={() => {
        hideMessage()
        router.push({
          pathname: '/',
          query: {
            ...router.query,
            step: 4,
          },
        })
      }}
    >
      <Box gap="medium" pad="small">
        <FileInput
          messages={{ dropPrompt: 'Drop your Name-List file here or' }}
          onChange={(_, files) => {
            setFiles(files?.files)
          }}
        />
        <Button
          disabled={!checkImageType(files)}
          label="Upload Name-List"
          onClick={uploadHandler}
        />
        {content && (
          <TextArea
            readOnly
            rows={Math.min(content.split(/\r\n|\r|\n/).length, 7)}
          >
            {content}
          </TextArea>
        )}
      </Box>
    </StepCard>
  )
}

export default Step3
