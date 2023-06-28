/*
 * @Author: czy0729
 * @Date: 2023-06-28 09:56:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-28 09:58:22
 */
import React from 'react'
import { Flex, Iconfont, Touchable } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { styles } from './styles'

function Friend(props, { $ }: Ctx) {
  const { disconnectUrl } = $.users
  if (!disconnectUrl) return null

  return (
    <Touchable style={styles.touch} onPress={$.logFriendStatus}>
      <Flex style={styles.icon} justify='center'>
        <Iconfont name='md-face' size={19} color={_.__colorPlain__} />
      </Flex>
    </Touchable>
  )
}

export default obc(Friend)
