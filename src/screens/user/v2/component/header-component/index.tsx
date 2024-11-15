/*
 * @Author: czy0729
 * @Date: 2023-12-30 07:06:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-14 01:05:22
 */
import React from 'react'
import { Flex } from '@components'
import { VerticalAlign } from '@_'
import { _, useStore } from '@stores'
import { HTMLDecode } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import CenterAvatar from '../center-avatar'
import { COMPONENT } from './ds'
import { Props } from './types'

function HeaderComponent({ style }: Props) {
  const { $ } = useStore<Ctx>()
  const { nickname, id, username } = $.usersInfo
  return (
    <Flex style={style} direction='column' justify='center'>
      <CenterAvatar />
      <Flex style={_.mt.md}>
        <VerticalAlign text={nickname} type={_.select('plain', 'title')} bold shadow>
          {HTMLDecode(nickname)}
          {username || id ? ` @${username || id}` : ''}
        </VerticalAlign>
      </Flex>
    </Flex>
  )
}

export default ob(HeaderComponent, COMPONENT)
