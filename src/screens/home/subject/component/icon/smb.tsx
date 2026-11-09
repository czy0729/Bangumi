/*
 * @Author: czy0729
 * @Date: 2022-04-07 03:09:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 23:27:26
 */
import { observer } from 'mobx-react'
import { Flex, Iconfont, Link, Text } from '@components'
import { useStore } from '@stores'
import { WEB } from '@constants'
import { COMPONENT_SMB } from './ds'
import styles from './styles'

import type { Ctx } from '../../types'

function IconSMB() {
  const { $ } = useStore<Ctx>(COMPONENT_SMB)

  if (WEB || !$.showSMB[0]) return null

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
