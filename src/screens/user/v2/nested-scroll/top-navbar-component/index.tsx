/*
 * @Author: czy0729
 * @Date: 2023-12-30 15:07:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-30 15:18:27
 */
import React from 'react'
import { Flex, Avatar, Text } from '@components'
import { _ } from '@stores'
import { HTMLDecode } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { styles } from './styles'

function TopNavbarComponent(props, { $ }: Ctx) {
  const { avatar, nickname } = $.usersInfo
  return (
    <Flex justify='center'>
      <Avatar
        style={styles.avatar}
        size={28}
        src={$.avatar || avatar.large}
        fallbackSrc={avatar.large}
        borderWidth={0}
      />
      <Text
        style={_.ml.sm}
        type={_.select('plain', 'title')}
        align='center'
        bold
        numberOfLines={1}
      >
        {HTMLDecode(nickname)}
      </Text>
    </Flex>
  )
}

export default obc(TopNavbarComponent)
