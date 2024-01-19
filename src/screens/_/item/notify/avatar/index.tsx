/*
 * @Author: czy0729
 * @Date: 2024-01-19 17:12:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-19 17:22:21
 */
import React from 'react'
import { Avatar as AvatarComp, UserStatus } from '@components'
import { ob } from '@utils/decorators'
import { InView } from '../../../base'
import { COMPONENT, ITEM_HEIGHT } from './ds'
import { styles } from './styles'

function Avatar({ navigation, index, avatar, userId, userName, event }) {
  return (
    <UserStatus userId={userId}>
      <InView style={styles.inView} y={ITEM_HEIGHT * index + 1}>
        <AvatarComp
          key={String(avatar)}
          navigation={navigation}
          userId={userId}
          name={userName}
          src={avatar}
          event={event}
        />
      </InView>
    </UserStatus>
  )
}

export default ob(Avatar, COMPONENT)
