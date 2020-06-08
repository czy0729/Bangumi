/*
 * @Author: czy0729
 * @Date: 2019-04-14 14:15:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-10 04:15:05
 */
import React from 'react'
import { View } from 'react-native'
import Constants from 'expo-constants'
import { observer } from 'mobx-react'

function StatusBarPlaceholder({ style }) {
  return (
    <View
      style={[
        {
          height: Constants.statusBarHeight
        },
        style
      ]}
    />
  )
}

export default observer(StatusBarPlaceholder)
