/*
 * @Author: czy0729
 * @Date: 2024-01-23 18:18:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-23 18:36:03
 */
import React from 'react'
import { Avatar as AvatarComp, UserStatus } from '@components'
import { obc } from '@utils/decorators'
import { InView } from '../../../base'
import { AVATAR_SIZE, ITEM_HEIGHT } from './ds'
import { styles } from './styles'

function Avatar({ index, inViewY, userId, userName, avatar, event }, { navigation }) {
  return (
    <UserStatus userId={userId}>
      <InView style={styles.inView} y={ITEM_HEIGHT * index + inViewY + 1}>
        <AvatarComp
          navigation={navigation}
          userId={userId}
          name={userName}
          size={AVATAR_SIZE}
          src={avatar}
          event={event}
        />
      </InView>
    </UserStatus>
  )
}

export default obc(Avatar)
