/*
 * @Author: czy0729
 * @Date: 2023-06-28 09:56:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 06:42:13
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Iconfont, Touchable } from '@components'
import { _, useStore } from '@stores'
import { styles } from './styles'

import type { Ctx } from '../../../types'

function Friend() {
  const { $ } = useStore<Ctx>()

  if (!$.users.disconnectUrl) return null

  return (
    <Touchable onPress={$.logFriendStatus}>
      <Flex style={styles.icon} justify='center'>
        <Iconfont name='md-face' size={19} color={_.__colorPlain__} shadow />
      </Flex>
    </Touchable>
  )
}

export default observer(Friend)
