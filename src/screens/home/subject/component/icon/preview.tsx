/*
 * @Author: czy0729
 * @Date: 2022-10-21 13:06:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 01:54:45
 */
import React from 'react'
import { Flex, Iconfont, Link, Text } from '@components'
import { systemStore, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import styles from './styles'

function IconPreview({ data, headers }) {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
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
  })
}

export default IconPreview
