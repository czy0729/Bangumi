/*
 * @Author: czy0729
 * @Date: 2024-01-23 18:18:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-13 06:11:50
 */
import React from 'react'
import { rakuenStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { InView, UserStatusAvatar } from '../../../base'
import { AVATAR_SIZE, ITEM_HEIGHT } from './ds'
import { styles } from './styles'
import { Props } from './types'

function Avatar({ index, inViewY, userId, userName, avatar, event }: Props) {
  return useObserver(() => (
    <InView style={styles.inView} y={ITEM_HEIGHT * (index + 1) + inViewY}>
      <UserStatusAvatar
        like={rakuenStore.commentTracked(userId)}
        userId={userId}
        userName={userName}
        avatar={avatar}
        size={AVATAR_SIZE}
        event={event}
      />
    </InView>
  ))
}

export default Avatar
