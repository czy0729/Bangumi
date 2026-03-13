/*
 * @Author: czy0729
 * @Date: 2023-12-30 15:07:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-12 20:55:53
 */
import React from 'react'
import { Avatar, Flex } from '@components'
import { VerticalAlign } from '@_'
import { _, useStore } from '@stores'
import { HTMLDecode } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function TopNavbarComponent() {
  const { $ } = useStore<Ctx>()
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
      <VerticalAlign
        style={_.ml.sm}
        text={nickname}
        type={_.select('plain', 'title')}
        align='center'
        bold
        shadow
        numberOfLines={1}
      >
        {HTMLDecode(nickname)}
      </VerticalAlign>
    </Flex>
  )
}

export default ob(TopNavbarComponent, COMPONENT)
