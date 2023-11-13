/*
 * @Author: czy0729
 * @Date: 2021-01-21 17:49:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-03 11:02:53
 */
import React from 'react'
import { View } from 'react-native'
import { Avatar as CompAvatar } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

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

const styles = _.create({
  avatar: {
    marginTop: _.md - 5
  }
})
