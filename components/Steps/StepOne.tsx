import { useData } from '@/context/Context'
import { Box, Button, FileInput, Image } from 'grommet'
import React, { useState } from 'react'

interface IStepOneProps {
  goNext: () => void
}

const checkImageType = (files?: File[]) => {
  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg']
  return files && files.length > 0 && allowedTypes.includes(files[0].type)
}

const StepOne: React.FC<IStepOneProps> = ({ goNext }) => {
  const { showMessage } = useData()
  const [files, setFiles] = useState<File[]>()
  const [uuid, setUUID] = useState()

  const uploadHandler = () => {
    const formData = new FormData()
    files && formData.append('file', files[0])
    // formData.append('uuid', uuid)

    fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })
      .then((res: Response) => res.json())
      .then((data) => {
        if (data.uuid && data.url) {
          setUUID(data.uuid)
          showMessage('Success', 'Background Image Uploaded')
          goNext()
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <Box gap="medium" pad="small">
      <FileInput
        name="bgfile"
        messages={{
          dropPrompt: 'Drop your background image here or',
        }}
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
          alt="background"
          fit="cover"
          src={`/api/output/${uuid}/background`}
        />
      )}
    </Box>
  )
}

export default StepOne
