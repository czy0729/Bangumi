/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:02:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-11 21:12:27
 */
import React from 'react'
import { Flex, Text } from '@components'
import { obc } from '@utils/decorators'
import { _ } from '@stores'
import CenterAvatar from '../center-avatar'
import { Ctx } from '../types'

function Head({ style }, { $ }: Ctx) {
  // global.rerender('User.Head')

  const { nickname, id, username } = $.usersInfo
  return (
    <Flex style={style} justify='center' direction='column'>
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

export default obc(Head)
