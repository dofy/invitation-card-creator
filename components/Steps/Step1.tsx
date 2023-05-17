import { useData } from '@/context/Context'
import { Box, Button, FileInput, Image } from 'grommet'
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
    if (!canNext && uuid && width && height) {
      setCanNext(true)
    }
  }, [canNext, height, uuid, width])

  const uploadHandler = () => {
    const formData = new FormData()
    files && formData.append('file', files[0])
    uuid && formData.append('uuid', uuid as string)

    fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })
      .then((res: Response) => res.json())
      .then((data) => {
        const { uuid, width, height, id } = data
        if (uuid && id) {
          showMessage('Success', 'Background Image Uploaded')
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
      description="Upload your background image"
      canNext={canNext}
      onNext={() => {
        hideMessage()
        router.push(
          `/?step=2&id=${id}&uuid=${uuid}&width=${width}&height=${height}`
        )
      }}
    >
      <Box gap="medium" pad="small">
        <FileInput
          name="bgfile"
          messages={{ dropPrompt: 'Drop your background image here or' }}
          onChange={(_, files) => {
            setFiles(files?.files)
          }}
        />
        <Button
          disabled={!checkImageType(files)}
          label="Upload Background"
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
