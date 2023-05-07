import { Box, Button, FileInput } from 'grommet'
import React, { useEffect, useState } from 'react'

interface IStepOneProps {
  onCompleted: () => void
}

const StepOne: React.FC<IStepOneProps> = ({ onCompleted }) => {
  const [uuid, setUUID] = useState<string>('')
  const [files, setFiles] = useState<File[]>()

  useEffect(() => {
    fetch('/api/init', {
      method: 'GET',
    })
      .then((res: Response) => res.json())
      .then(({ uuid }) => {
        setUUID(uuid)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  const uploadHandler = () => {
    if (!files || files.length <= 0) {
      return
    }

    const formData = new FormData()
    formData.append('file', files[0])
    formData.append('uuid', uuid)

    fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })
      .then((res: Response) => res.json())
      .then((data) => {
        if (data.uuid && data.url) {
          onCompleted()
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
        disabled={!files || files.length <= 0}
        label="Upload Background"
        onClick={uploadHandler}
      />
    </Box>
  )
}

export default StepOne
