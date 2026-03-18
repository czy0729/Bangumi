/*
 * @Author: czy0729
 * @Date: 2022-10-21 13:06:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 23:25:51
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Iconfont, Link, Text } from '@components'
import { systemStore, useStore } from '@stores'
import styles from './styles'

import type { Ctx } from '../../types'

function IconPreview({ data, headers }) {
  const { $ } = useStore<Ctx>()

  if (!systemStore.setting.showThumbs) return null

  return (
    <Link
      style={styles.touch}
      path='Preview'
      params={{
        subjectId: $.subjectId,
        cn: $.cn,
        jp: $.jp,
        year: $.year,
        _images: JSON.stringify(data || []),
        _headers: JSON.stringify(headers || {})
      }}
      eventId='条目.跳转'
      eventData={{
        to: 'Preview',
        from: '预览',
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

export default observer(IconPreview)
