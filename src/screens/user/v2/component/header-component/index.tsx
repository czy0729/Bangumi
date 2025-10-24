/*
 * @Author: czy0729
 * @Date: 2023-12-30 07:06:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-23 17:50:25
 */
import React from 'react'
import { Flex, Text, Touchable } from '@components'
import { VerticalAlign } from '@_'
import { _, useStore } from '@stores'
import { copy, HTMLDecode } from '@utils'
import { useObserver } from '@utils/hooks'
import CenterAvatar from '../center-avatar'
import { COMPONENT } from './ds'

import type { WithViewStyles } from '@types'
import type { Ctx } from '../../types'

function HeaderComponent({ style }: WithViewStyles) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
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
  })
}

export default HeaderComponent
