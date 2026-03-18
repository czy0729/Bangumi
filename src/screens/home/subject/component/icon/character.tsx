/*
 * @Author: czy0729
 * @Date: 2021-01-16 20:00:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 23:18:48
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Iconfont, Link, Text } from '@components'
import { systemStore, useStore } from '@stores'
import styles from './styles'

import type { Ctx } from '../../types'

function IconCharacter() {
  const { $ } = useStore<Ctx>()

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
}

export default observer(IconCharacter)
