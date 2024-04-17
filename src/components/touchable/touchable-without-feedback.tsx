/*
 * @Author: czy0729
 * @Date: 2023-02-28 16:14:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-17 18:15:24
 */
import React from 'react'
import { TouchableOpacity as RNTouchableOpacity, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

function TouchableWithoutFeedback({ useRN, extraButtonProps = undefined, children, ...other }) {
  const Component = useRN ? RNTouchableOpacity : TouchableOpacity
  return (
    <Component {...other} activeOpacity={1} extraButtonProps={extraButtonProps}>
      <View>{children}</View>
    </Component>
  )
}

export default TouchableWithoutFeedback
