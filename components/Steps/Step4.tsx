import { Box, Button } from 'grommet'
import { Brush, Tools } from 'grommet-icons'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import StepCard from '../StepCard'

const Step4: React.FC = () => {
  const router = useRouter()
  const { uuid, id } = router.query

  const [canNext, setCanNext] = useState<boolean>(false)
  const [busy, setBusy] = useState<boolean>(false)

  const createHandler = () => {
    setBusy(true)
    fetch(`/api/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(router.query),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setCanNext(true)
        setBusy(false)
      })
  }

  return (
    <StepCard
      step={4}
      description="制作邀请函并生成压缩文件"
      canNext={canNext}
      isLast={true}
      onCompleted={() => router.push(`/output/${uuid}/download.zip?id=${id}`)}
      completedLabel="下载所有邀请函"
      canGoBack={true}
      onPrevious={() => router.back()}
    >
      <Box gap="medium" pad="small">
        <Box>
          <Button
            primary
            label="开始制作"
            icon={<Brush />}
            busy={busy}
            onClick={() => createHandler()}
          />
        </Box>
      </Box>
    </StepCard>
  )
}

export default Step4
