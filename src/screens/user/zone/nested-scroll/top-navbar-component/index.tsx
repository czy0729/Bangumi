/*
 * @Author: czy0729
 * @Date: 2023-12-30 15:07:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-30 07:18:59
 */
import React from 'react'
import { Avatar, Flex, Text } from '@components'
import { _ } from '@stores'
import { HTMLDecode } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function TopNavbarComponent(props, { $ }: Ctx) {
  return (
    <Flex style={styles.topNavbar} justify='center'>
      <Avatar
        key={String($.src)}
        style={styles.avatar}
        size={28}
        src={$.src}
        fallbackSrc={$.usersInfo.avatar.large}
        borderWidth={0}
      />
      <Text
        style={_.ml.sm}
        type={_.select('plain', 'title')}
        align='center'
        bold
        shadow
        numberOfLines={1}
      >
        {HTMLDecode($.usersInfo.nickname)}
      </Text>
    </Flex>
  )
}

export default obc(TopNavbarComponent, COMPONENT)
