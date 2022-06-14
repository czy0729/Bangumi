/*
 * 状态栏高度占位
 *
 * @Author: czy0729
 * @Date: 2019-04-14 14:15:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-14 12:12:46
 */
import React from 'react'
import { View } from 'react-native'
import Constants from 'expo-constants'
import { ob } from '@utils/decorators'
import { Props as StatusBarPlaceholderProps } from './types'

export { StatusBarPlaceholderProps }

export const StatusBarPlaceholder = ob(({ style }: StatusBarPlaceholderProps) => (
  <View
    style={[
      {
        height: Constants.statusBarHeight
      },
      style
    ]}
  />
))
