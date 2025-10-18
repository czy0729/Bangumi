/*
 * @Author: czy0729
 * @Date: 2021-01-16 19:42:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 01:43:59
 */
import React from 'react'
import { Flex, Heatmap, Iconfont, Link, Text } from '@components'
import { useStore } from '@stores'
import { cnjp } from '@utils'
import { useObserver } from '@utils/hooks'
import styles from './styles'

import type { Ctx } from '../../types'

function IconCatalog() {
  const { $ } = useStore<Ctx>()

  return useObserver(() => (
    <Link
      style={styles.touch}
      path='SubjectCatalogs'
      params={{
        subjectId: $.subjectId,
        name: cnjp($.cn, $.jp)
      }}
      eventId='条目.跳转'
      eventData={{
        to: 'SubjectCatalogs',
        from: '目录',
        subjectId: $.subjectId
      }}
    >
      <Flex>
        <Text type='sub'>更多</Text>
        <Iconfont name='md-navigate-next' />
      </Flex>
      <Heatmap id='条目.跳转' from='目录' />
    </Link>
  ))
}

export default IconCatalog
