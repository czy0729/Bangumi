/*
 * @Author: czy0729
 * @Date: 2024-01-19 17:28:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 05:28:02
 */
import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { Button, Flex, Text } from '@components'
import { _, timelineStore, usersStore } from '@stores'
import { confirm, feedback, getStorage, setStorage } from '@utils'
import { r } from '@utils/dev'
import { t } from '@utils/fetch'
import { useMount } from '@utils/hooks'
import { Tag } from '../../../base'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Props } from './types'

function Extra({ userId, connectUserId, repeat }: Props) {
  r(COMPONENT)

  const [connect, setConnect] = useState<boolean | string>(false)

  useMount(() => {
    if (!connectUserId) return

    async function init() {
      if (userId && usersStore?.friendsMap?.[userId]) {
        setConnect('已处理')
        return
      }

      const result = await getStorage(`${COMPONENT}|${connectUserId}`)
      if (result === null) {
        setConnect(true)
      } else if (typeof result === 'string') {
        setConnect(result)
      }
    }

    init()
  })

  if (usersStore.myFriendsMap[userId]) return null

  return (
    <Flex style={_.ml.md} justify='end'>
      {connectUserId && connect !== false ? (
        typeof connect === 'string' ? (
          <Text size={12} type='sub'>
            {connect}
          </Text>
        ) : (
          <>
            <Button
              style={styles.btn}
              type='ghostMain'
              size='sm'
              onPress={() => {
                confirm(
                  '添加好友?',
                  async () => {
                    await timelineStore.doConnect(connectUserId)
                    feedback()
                    setConnect('已处理')
                    setStorage(`${COMPONENT}|${connectUserId}`, '已处理')

                    t('电波提醒.添加好友')
                  },
                  '提醒'
                )
              }}
            >
              同意
            </Button>
            <Button
              style={[styles.btn, _.ml.sm]}
              type='ghostPlain'
              size='sm'
              onPress={() => {
                confirm('确定忽略?', () => {
                  setConnect('已忽略')
                  setStorage(`${COMPONENT}|${connectUserId}`, '已忽略')

                  t('电波提醒.忽略好友')
                })
              }}
            >
              忽略
            </Button>
          </>
        )
      ) : null}
      {!!repeat && <Tag value={`x${repeat + 1}`} />}
    </Flex>
  )
}

export default observer(Extra)
