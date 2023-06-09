import { useData } from '@/context/Context'
import { replaceParams } from '@/utils/Tools'
import { Box, Button, Text } from 'grommet'
import { Brush, Validate } from 'grommet-icons'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import StepCard from '../StepCard'

const Step4: React.FC = () => {
  const { showMessage } = useData()

  const router = useRouter()
  const { uuid } = router.query

  const [canNext, setCanNext] = useState<boolean>(false)
  const [busy, setBusy] = useState<boolean>(false)
  const [v, setV] = useState<number>()

  useEffect(() => {
    fetch(`/api/output/${uuid}/invitation.zip?type=stat`)
      .then((res) => res.json())
      .then(({ exists }) => {
        setCanNext(exists)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [uuid])

  const createHandler = () => {
    setBusy(true)
    setCanNext(false)
    fetch(`/api/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(router.query),
    })
      .then((res) => res.json())
      .then(() => {
        showMessage('恭喜 🎉', '邀请函制作完成, \n现在可以下载了.')
        setV(Math.random())
        setCanNext(true)
        setBusy(false)
      })
  }

  return (
    <StepCard
      step={4}
      description="批量生成邀请函"
      canNext={canNext}
      isLast={true}
      onCompleted={() =>
        router.push(`/api/output/${uuid}/invitation.zip?v=${v}`)
      }
      completedLabel="下载邀请函"
      canGoBack={true}
      onPrevious={() => replaceParams(router, { step: 3 })}
    >
      <Box gap="medium" pad="small">
        {busy && (
          <Box>
            <Text>正在生成邀请函, 请稍候...</Text>
          </Box>
        )}
        {canNext ? (
          <Box gap="small">
            <Box direction="row" gap="small">
              <Validate color="focus" />
              <Text as="em" color="focus">
                邀请函制作完成, 点击下方按钮下载.
              </Text>
            </Box>
            <Box>
              <Button
                primary
                label="重新生成邀请函"
                icon={<Brush />}
                busy={busy}
                onClick={() => createHandler()}
              />
            </Box>
          </Box>
        ) : (
          <Box>
            <Button
              primary
              label="生成邀请函"
              icon={<Brush />}
              busy={busy}
              onClick={() => createHandler()}
            />
          </Box>
        )}
      </Box>
    </StepCard>
  )
}

export default Step4
