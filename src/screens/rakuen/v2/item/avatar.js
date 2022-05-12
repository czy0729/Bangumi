/*
 * @Author: czy0729
 * @Date: 2021-01-21 17:49:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-13 05:06:43
 */
import React from 'react'
import { View } from 'react-native'
import { Avatar as CompAvatar } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

const event = {
  id: '超展开.跳转'
}

function Avatar({ avatar, userName, userId }, { navigation }) {
  return (
    <View style={_.mt.md}>
      <CompAvatar
        navigation={navigation}
        src={avatar}
        name={userName}
        userId={userId}
        event={event}
      />
      {/* <Heatmap
        right={-12}
        id='超展开.跳转'
        data={{
          to: 'Zone',
          alias: '空间'
        }}
      /> */}
    </View>
  )
}

export default obc(Avatar)
