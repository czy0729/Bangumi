/*
 * @Author: czy0729
 * @Date: 2021-01-17 01:25:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 01:59:14
 */
import React from 'react'
import { Flex, Iconfont, Link, Text } from '@components'
import { systemStore, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import styles from './styles'

function IconStaff() {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
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
  })
}

export default IconStaff
