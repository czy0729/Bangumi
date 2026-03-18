/*
 * @Author: czy0729
 * @Date: 2022-04-07 03:09:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 23:27:26
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Iconfont, Link, Text } from '@components'
import { systemStore } from '@stores'
import { WEB } from '@constants'
import styles from './styles'

function IconSMB() {
  if (WEB || !systemStore.setting.showSMB) return null

  return (
    <Link
      style={styles.touch}
      path='Smb'
      eventId='条目.跳转'
      eventData={{
        to: 'SMB',
        from: '本地'
      }}
    >
      <Flex>
        <Text type='sub'>管理</Text>
        <Iconfont name='md-navigate-next' />
      </Flex>
    </Link>
  )
}

export default observer(IconSMB)
