/*
 * @Author: czy0729
 * @Date: 2024-01-19 17:12:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-12 06:01:01
 */
import React from 'react'
import { Avatar as AvatarComp, UserStatus } from '@components'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { InView } from '../../../base'
import { COMPONENT, ITEM_HEIGHT } from './ds'
import { styles } from './styles'

import type { Props } from './types'

function Avatar({ index, avatar, userId, userName, event }: Props) {
  r(COMPONENT)

  return useObserver(() => (
    <UserStatus userId={userId}>
      <InView style={styles.inView} y={ITEM_HEIGHT * index}>
        <AvatarComp
          key={String(avatar)}
          userId={userId}
          name={userName}
          src={avatar}
          event={event}
        />
      </InView>
    </UserStatus>
  ))
}

export default Avatar
