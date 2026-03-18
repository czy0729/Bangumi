/*
 * @Author: czy0729
 * @Date: 2021-07-15 19:15:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 23:18:19
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Iconfont, Link, Text } from '@components'
import { systemStore, useStore } from '@stores'
import styles from './styles'

import type { Ctx } from '../../types'

function IconBlog() {
  const { $ } = useStore<Ctx>()

  if (!systemStore.setting.showBlog) return null

  return (
    <Link
      style={styles.touch}
      path='Reviews'
      params={{
        subjectId: $.subjectId,
        name: $.cn
      }}
      eventId='条目.跳转'
      eventData={{
        to: 'Reviews',
        from: '日志',
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

export default observer(IconBlog)
