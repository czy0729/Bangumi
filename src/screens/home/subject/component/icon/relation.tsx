/*
 * @Author: czy0729
 * @Date: 2024-09-19 20:45:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 23:26:15
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Iconfont, Link, Text } from '@components'
import { useStore } from '@stores'
import { cnjp } from '@utils'
import styles from './styles'

import type { Ctx } from '../../types'

function IconRelation({
  title = '关联',
  list = []
}: {
  title: string
  list: any[] | readonly any[]
}) {
  const { $ } = useStore<Ctx>()

  return (
    <Link
      style={styles.touch}
      path='Overview'
      params={{
        subjectId: $.subjectId,
        title: `${cnjp($.cn, $.jp)}的${title}`,
        path: title,
        _list: JSON.stringify(list)
      }}
      eventId='条目.跳转'
      eventData={{
        to: 'Overview',
        from: title,
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

export default observer(IconRelation)
