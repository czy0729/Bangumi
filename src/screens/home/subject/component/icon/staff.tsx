/*
 * @Author: czy0729
 * @Date: 2021-01-17 01:25:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 23:27:38
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Iconfont, Link, Text } from '@components'
import { systemStore, useStore } from '@stores'
import styles from './styles'

import type { Ctx } from '../../types'

function IconStaff() {
  const { $ } = useStore<Ctx>()

  if (!systemStore.setting.showStaff) return null

  return (
    <Link
      style={styles.touch}
      path='Persons'
      params={{
        subjectId: $.subjectId,
        name: $.cn
      }}
      eventId='条目.跳转'
      eventData={{
        to: 'Persons',
        from: '制作人员',
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

export default observer(IconStaff)
