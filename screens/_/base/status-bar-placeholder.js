/*
 * @Author: czy0729
 * @Date: 2019-04-14 14:15:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-03 10:49:30
 */
import React from 'react'
import { View } from 'react-native'
import Constants from 'expo-constants'
import { observer } from 'mobx-react'
import { _ } from '@stores'

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

export default observer(StatusBarPlaceholder)
