/*
 * @Author: czy0729
 * @Date: 2023-12-30 07:06:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-03 10:35:39
 */
import React from 'react'
import { Flex, Text, Touchable } from '@components'
import { VerticalAlign } from '@_'
import { _, useStore } from '@stores'
import { copy, HTMLDecode } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import CenterAvatar from '../center-avatar'
import { COMPONENT } from './ds'
import { Props } from './types'

function HeaderComponent({ style }: Props) {
  const { $ } = useStore<Ctx>()
  const { nickname, id, username } = $.usersInfo
  const name = HTMLDecode(nickname)
  const uid = username || id
  return (
    <Flex style={style} direction='column' justify='center'>
      <CenterAvatar />
      <Flex style={_.mt.md}>
        <Touchable
          onLongPress={() => {
            copy(name)
          }}
        >
          <VerticalAlign text={nickname} type='__plain__' bold shadow>
            {name}
          </VerticalAlign>
        </Touchable>
        <Touchable
          onLongPress={() => {
            copy(uid)
          }}
        >
          <Text type='__plain__' bold shadow>
            {uid ? ` @${uid}` : ''}
          </Text>
        </Touchable>
      </Flex>
    </Flex>
  )
}

export default ob(HeaderComponent, COMPONENT)
