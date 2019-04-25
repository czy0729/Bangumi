/*
 * @Author: czy0729
 * @Date: 2019-04-14 14:15:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-24 15:33:42
 */
import React from 'react'
import { View } from 'react-native'
import { Constants } from 'expo'
import { colorPlain } from '@styles'

const StatusBarPlaceholder = ({ style }) => (
  <View
    style={[
      {
        height: Constants.statusBarHeight,
        backgroundColor: colorPlain
      },
      style
    ]}
  />
)

export default StatusBarPlaceholder
