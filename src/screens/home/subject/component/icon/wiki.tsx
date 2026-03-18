/*
 * @Author: czy0729
 * @Date: 2021-07-12 13:36:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 23:31:32
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Iconfont, Link, Text } from '@components'
import { systemStore, useStore } from '@stores'
import styles from './styles'

import type { Ctx } from '../../types'

function IconWiki() {
  const { $ } = useStore<Ctx>()

  if (!systemStore.setting.showInfo) return null

  return (
    <Link
      style={styles.touch}
      path='SubjectWiki'
      params={{
        subjectId: $.subjectId,
        name: $.cn
      }}
      eventId='条目.跳转'
      eventData={{
        to: 'SubjectWiki',
        from: '详情',
        subjectId: $.subjectId
      }}
    >
      <Flex>
        <Text type='sub'>修订</Text>
        <Iconfont name='md-navigate-next' />
      </Flex>
    </Link>
  )
}

export default observer(IconWiki)
