/*
 * @Author: czy0729
 * @Date: 2024-10-14 06:26:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-14 06:32:01
 */
import React from 'react'
import { Flex, Iconfont, Touchable } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../../types'
import { styles } from './styles'

function Milestone(_props, { $, navigation }: Ctx) {
  return (
    <Touchable
      onPress={() => {
        const { id, username } = $.usersInfo
        navigation.push('Milestone', {
          userId: username || id
        })
      }}
    >
      <Flex style={styles.icon} justify='center'>
        <Iconfont name='md-image-aspect-ratio' size={19} color={_.__colorPlain__} />
      </Flex>
    </Touchable>
  )
}

export default obc(Milestone)
