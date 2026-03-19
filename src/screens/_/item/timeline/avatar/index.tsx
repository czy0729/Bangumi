/*
 * @Author: czy0729
 * @Date: 2022-11-11 19:35:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 06:30:16
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Avatar as AvatarComp, UserStatus } from '@components'
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

export default observer(Avatar)
