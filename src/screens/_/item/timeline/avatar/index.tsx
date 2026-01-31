/*
 * @Author: czy0729
 * @Date: 2022-11-11 19:35:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-31 15:13:30
 */
import React from 'react'
import { View } from 'react-native'
import { Avatar as AvatarComp, UserStatus } from '@components'
import { useObserver } from '@utils/hooks'
import { AVATAR_WIDTH } from '../ds'
import { memoStyles } from './styles'

function Avatar({ navigation, p1Text, userId, avatarSrc, event }) {
  return useObserver(() => {
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
  })
}

export default Avatar
