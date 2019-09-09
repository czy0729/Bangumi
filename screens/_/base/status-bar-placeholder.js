/*
 * @Author: czy0729
 * @Date: 2019-04-14 14:15:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-09 14:55:51
 */
import React from 'react'
import { View } from 'react-native'
import Constants from 'expo-constants'
import _ from '@styles'

function StatusBarPlaceholder({ style }) {
  return (
    <View
      style={[
        {
          height: Constants.statusBarHeight,
          backgroundColor: _.colorPlain
        },
        style
      ]}
    />
  )
}

export default StatusBarPlaceholder
