/*
 * @Author: czy0729
 * @Date: 2019-04-14 14:15:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-08 18:16:54
 */
import React from 'react'
import { View } from 'react-native'
import Constants from 'expo-constants'
import { ob } from '@utils/decorators'

export const StatusBarPlaceholder = ob(({ style }) => (
  <View
    style={[
      {
        height: Constants.statusBarHeight
      },
      style
    ]}
  />
))
