/*
 * @Author: czy0729
 * @Date: 2021-01-16 20:00:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 01:44:27
 */
import React from 'react'
import { Flex, Iconfont, Link, Text } from '@components'
import { systemStore, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import styles from './styles'

import type { Ctx } from '../../types'

function IconCharacter() {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    if (!systemStore.setting.showCharacter) return null

    return (
      <Link
        style={styles.touch}
        path='Characters'
        params={{
          subjectId: $.subjectId,
          name: $.cn
        }}
        eventId='条目.跳转'
        eventData={{
          to: 'Characters',
          from: '角色',
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

export default IconCharacter
