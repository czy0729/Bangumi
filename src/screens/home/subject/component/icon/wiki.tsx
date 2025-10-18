/*
 * @Author: czy0729
 * @Date: 2021-07-12 13:36:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 02:02:30
 */
import React from 'react'
import { Flex, Iconfont, Link, Text } from '@components'
import { systemStore, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import styles from './styles'

import type { Ctx } from '../../types'

function IconWiki() {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
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
  })
}

export default IconWiki
