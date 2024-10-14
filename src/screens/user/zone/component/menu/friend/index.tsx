/*
 * @Author: czy0729
 * @Date: 2023-06-28 09:56:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-14 06:32:34
 */
import React from 'react'
import { Flex, Iconfont, Touchable } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../../types'
import { styles } from './styles'

function Friend(_props, { $ }: Ctx) {
  if (!$.users.disconnectUrl) return null

  return (
    <Touchable onPress={$.logFriendStatus}>
      <Flex style={styles.icon} justify='center'>
        <Iconfont name='md-face' size={19} color={_.__colorPlain__} />
      </Flex>
    </Touchable>
  )
}

export default obc(Friend)
