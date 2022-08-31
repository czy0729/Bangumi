/*
 * 状态栏高度占位
 *
 * @Author: czy0729
 * @Date: 2019-04-14 14:15:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-01 00:47:12
 */
import React from 'react'
import { View } from 'react-native'
import Constants from 'expo-constants'
import { ob } from '@utils/decorators'
import { WSA } from '@constants'
import { Props as StatusBarPlaceholderProps } from './types'

export { StatusBarPlaceholderProps }

export const StatusBarPlaceholder = ob(({ style }: StatusBarPlaceholderProps) => {
  if (WSA) return null

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
})
