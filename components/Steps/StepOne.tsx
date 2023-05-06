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
      // method: 'POST',
    })
      .then((res: Response) => res.json())
      .then(({ uuid }) => {
        console.log({ uuid })
        setUUID(uuid)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  useEffect(() => {
    console.log('files:', files)
  }, [files])

  const uploadHandler = () => {
    if (!files || files.length <= 0) {
      return
    }

    const formData = new FormData()
    formData.append('bgfile', files[0])
    formData.append('uuid', uuid)

    fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })
      .then((res: Response) => res.json())
      .then((res) => {
        console.log(res)
        // onCompleted()
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <Box gap="medium" pad="small">
      <FileInput
        name="bgfile"
        onChange={(_, files) => {
          console.log(files?.files)
          setFiles(files?.files)
          // onCompleted()
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
