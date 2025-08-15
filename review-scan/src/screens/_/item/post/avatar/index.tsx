/*
 * @Author: czy0729
 * @Date: 2024-01-23 18:18:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-13 19:36:36
 */
import React from 'react'
import { rakuenStore } from '@stores'
import { ob } from '@utils/decorators'
import { useNavigation } from '@utils/hooks'
import { InView, UserStatusAvatar } from '../../../base'
import { AVATAR_SIZE, ITEM_HEIGHT } from './ds'
import { styles } from './styles'

function Avatar({ index, inViewY, userId, userName, avatar, event }) {
  const navigation = useNavigation()
  return (
    <InView style={styles.inView} y={ITEM_HEIGHT * (index + 1) + inViewY}>
      <UserStatusAvatar
        navigation={navigation}
        like={rakuenStore.commentTracked(userId)}
        userId={userId}
        userName={userName}
        avatar={avatar}
        size={AVATAR_SIZE}
        event={event}
      />
    </InView>
  )
}

export default ob(Avatar)
