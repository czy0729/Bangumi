/*
 * @Author: czy0729
 * @Date: 2021-04-06 19:39:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 02:01:08
 */
import React from 'react'
import { Flex, Iconfont, Link, Text } from '@components'
import { systemStore, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import styles from './styles'

import type { Ctx } from '../../types'

function IconTopic() {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    if (!systemStore.setting.showTopic) return null

    return (
      <Link
        style={styles.touch}
        path='Board'
        params={{
          subjectId: $.subjectId,
          name: $.cn
        }}
        eventId='条目.跳转'
        eventData={{
          to: 'Board',
          from: '帖子',
          subjectId: $.subjectId
        }}
      >
        <Flex>
          <Text type='sub'>更多</Text>
          <Iconfont name='md-navigate-next' />
        </Flex>
      </Link>
    )
  })
}

export default IconTopic
