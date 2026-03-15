/*
 * @Author: czy0729
 * @Date: 2023-12-30 07:06:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-15 16:32:21
 */
import React from 'react'
import { Flex, Text, Touchable } from '@components'
import { SensorParallaxCard, VerticalAlign } from '@_'
import { _, systemStore, useStore } from '@stores'
import { copy, HTMLDecode } from '@utils'
import { useObserver } from '@utils/hooks'
import CenterAvatar from '../center-avatar'
import Sensor from '../sensor'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function HeaderComponent() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const { nickname, id, username } = $.usersInfo
    const name = HTMLDecode(nickname)
    const uid = username || id

    const elContent = (
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
    )

    return (
      <>
        {systemStore.setting.userSensor ? (
          <SensorParallaxCard sensitivity={0.3} enableRotate={false} reverse>
            {elContent}
          </SensorParallaxCard>
        ) : (
          elContent
        )}
        <Sensor style={styles.sensor} />
      </>
    )
  })
}

export default HeaderComponent
