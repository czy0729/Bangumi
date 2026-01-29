/*
 * @Author: czy0729
 * @Date: 2023-06-28 09:56:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:04:32
 */
import React from 'react'
import { Flex, Iconfont, Touchable } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { styles } from './styles'

import type { Ctx } from '../../../types'

function Friend() {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    if (!$.users.disconnectUrl) return null

    return (
      <Touchable onPress={$.logFriendStatus}>
        <Flex style={styles.icon} justify='center'>
          <Iconfont name='md-face' size={19} color={_.__colorPlain__} />
        </Flex>
      </Touchable>
    )
  })
}

export default Friend
