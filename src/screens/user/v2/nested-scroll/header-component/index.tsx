/*
 * @Author: czy0729
 * @Date: 2023-12-30 07:06:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-30 15:34:11
 */
import React from 'react'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import CenterAvatar from '../../center-avatar'
import { Ctx } from '../../types'

function HeaderComponent(props, { $ }: Ctx) {
  const { nickname, id, username } = $.usersInfo
  return (
    <Flex direction='column' justify='center'>
      <CenterAvatar />
      <Flex style={_.mt.md}>
        <Text type={_.select('plain', 'title')} bold>
          {nickname}
          {username || id ? ` @${username || id}` : ''}
        </Text>
      </Flex>
    </Flex>
  )
}

export default obc(HeaderComponent)
