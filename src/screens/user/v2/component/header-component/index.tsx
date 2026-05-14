/*
 * @Author: czy0729
 * @Date: 2023-12-30 07:06:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-14 19:29:41
 */
import React, { useMemo } from 'react'
import { observer } from 'mobx-react'
import { Flex, Text, Touchable } from '@components'
import { SensorParallaxCard, VerticalAlign } from '@_'
import { _, systemStore, useStore } from '@stores'
import { copy, HTMLDecode } from '@utils'
import CenterAvatar from '../center-avatar'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'
import type { Props } from './types'

function HeaderComponent({ fixed }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { nickname, id, username } = $.usersInfo
  const name = HTMLDecode(nickname)
  const uid = username || id

  const elContent = useMemo(
    () => (
      <Flex direction='column' justify='center'>
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
    ),
    [name, nickname, uid]
  )

  return systemStore.setting.userSensor ? (
    <SensorParallaxCard
      sensitivity={0.3}
      enabled={fixed === undefined ? true : !fixed}
      enableRotate={false}
      reverse
    >
      {elContent}
    </SensorParallaxCard>
  ) : (
    elContent
  )
}

export default observer(HeaderComponent)
