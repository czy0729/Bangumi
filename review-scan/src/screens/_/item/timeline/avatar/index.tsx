/*
 * @Author: czy0729
 * @Date: 2022-11-11 19:35:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-11 20:04:54
 */
import React from 'react'
import { View } from 'react-native'
import { Avatar as AvatarComp, UserStatus } from '@components'
import { ob } from '@utils/decorators'
import { AVATAR_WIDTH } from '../ds'
import { memoStyles } from './styles'

function Avatar({ navigation, p1Text, userId, avatarSrc, event }) {
  const styles = memoStyles()
  return (
    <View style={styles.avatar}>
      {!!avatarSrc && (
        <UserStatus userId={userId}>
          <AvatarComp
            navigation={navigation}
            size={AVATAR_WIDTH}
            userId={userId}
            name={p1Text}
            src={avatarSrc}
            event={event}
          />
        </UserStatus>
      )}
    </View>
  )
}

export default ob(Avatar)
