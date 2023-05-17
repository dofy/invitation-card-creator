import { Box, Button, TextArea } from 'grommet'
import { Tools } from 'grommet-icons'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import StepCard from '../StepCard'

const Step4: React.FC = () => {
  const router = useRouter()
  const { uuid, id } = router.query

  const [canNext, setCanNext] = useState<boolean>(false)
  const [content, setContent] = useState<string>('')

  useEffect(() => {
    fetch(`/api/output/${uuid}/name-list?type=text`)
      .then((res) => res.json())
      .then(({ content }) => {
        setContent(content)
      })
  }, [uuid, id])

  const createHandler = () => {
    fetch(`/api/output/${uuid}/create`, {
      method: 'POST',
      body: JSON.stringify(router.query),
    })
      .then((res) => res.json())
      .then(({ content }) => {
        setCanNext(true)
      })
  }

  return (
    <StepCard
      step={4}
      description="Create Images and compress"
      canNext={canNext}
      isLast={true}
      onCompleted={() => router.push(`/output/${uuid}/download.zip?id=${id}`)}
      completedLabel="Download Images"
      canGoBack={true}
      onPrevious={() => router.back()}
    >
      <Box gap="medium" pad="small">
        <Box>
          <TextArea
            readOnly
            rows={Math.min(content.split(/\r\n|\r|\n/).length, 7)}
          >
            {content}
          </TextArea>
        </Box>
        <Box>
          <Button
            primary
            label="Create Images"
            icon={<Tools />}
            onClick={() => createHandler()}
          />
        </Box>
      </Box>
    </StepCard>
  )
}

export default Step4
