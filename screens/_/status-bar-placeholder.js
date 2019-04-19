/*
 * @Author: czy0729
 * @Date: 2019-04-14 14:15:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-14 14:16:34
 */
import React from 'react'
import { View } from 'react-native'
import { Constants } from 'expo'
import { colorPlain } from '@styles'

const StatusBarPlaceholder = () => (
  <View
    style={{
      height: Constants.statusBarHeight,
      backgroundColor: colorPlain
    }}
  />
)

export default StatusBarPlaceholder
