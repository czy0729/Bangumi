/*
 * @Author: czy0729
 * @Date: 2021-07-15 19:15:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-25 05:11:47
 */
import { observer } from 'mobx-react'
import { Flex, Iconfont, Link, Text } from '@components'
import { useStore } from '@stores'
import { COMPONENT_BLOG } from './ds'
import styles from './styles'

import type { Ctx } from '../../types'

function IconBlog() {
  const { $ } = useStore<Ctx>(COMPONENT_BLOG)

  if (!$.showBlog[0]) return null

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
