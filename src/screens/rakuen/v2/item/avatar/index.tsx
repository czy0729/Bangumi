/*
 * @Author: czy0729
 * @Date: 2021-01-21 17:49:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-11 20:24:42
 */
import React from 'react'
import { View } from 'react-native'
import { Avatar as CompAvatar } from '@_'
import { obc } from '@utils/decorators'
import { styles } from './styles'

const EVENT = {
  id: '超展开.跳转'
} as const

function Avatar({ avatar, userName, userId }, { navigation }) {
  return (
    <View style={styles.avatar}>
      <CompAvatar
        navigation={navigation}
        src={avatar}
        name={userName}
        userId={userId}
        event={EVENT}
      />
    </View>
  )
}

export default obc(Avatar)
