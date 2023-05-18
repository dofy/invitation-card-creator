import { useData } from '@/context/Context'
import { Box, Button, FileInput, Image } from 'grommet'
import { CloudUpload } from 'grommet-icons'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import StepCard from '../StepCard'

const checkImageType = (files?: File[]) => {
  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg']
  return files && files.length > 0 && allowedTypes.includes(files[0].type)
}

const Step1: React.FC = () => {
  const router = useRouter()
  const { uuid, width, height, id } = router.query

  const { showMessage, hideMessage } = useData()

  const [files, setFiles] = useState<File[]>()
  const [canNext, setCanNext] = useState<boolean>(false)

  useEffect(() => {
    if (!canNext && uuid && id) {
      setCanNext(true)
    }
  }, [canNext, uuid, id])

  const uploadHandler = () => {
    const formData = new FormData()
    files && formData.append('file', files[0])
    uuid && formData.append('uuid', uuid as string)

    fetch('/api/upload/image', {
      method: 'POST',
      body: formData,
    })
      .then((res: Response) => res.json())
      .then((data) => {
        const { uuid, width, height, id } = data
        if (uuid && id) {
          showMessage('恭喜 🎉', '背景图片上传完成.')
          router.push({
            pathname: '/',
            query: { uuid, width, height, id },
          })
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <StepCard
      isFirst={true}
      step={1}
      description="上传背景图片"
      canNext={canNext}
      onNext={() => {
        hideMessage()
        router.push({
          pathname: '/',
          query: {
            ...router.query,
            step: 2,
          },
        })
      }}
    >
      <Box gap="medium" pad="small">
        <FileInput
          messages={{
            dropPrompt: '拖拽「背景图片」到这里, 或者',
            browse: '浏览...',
          }}
          onChange={(_, files) => {
            setFiles(files?.files)
          }}
        />
        <Button
          disabled={!checkImageType(files)}
          icon={<CloudUpload />}
          label="上传图片"
          onClick={uploadHandler}
        />
        {uuid && (
          <Image
            alt={`background width:${width} height:${height}`}
            src={`/api/output/${uuid}/background?id=${id}`}
          />
        )}
      </Box>
    </StepCard>
  )
}

export default Step1
