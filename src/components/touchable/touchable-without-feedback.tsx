/*
 * @Author: czy0729
 * @Date: 2023-02-28 16:14:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-28 16:32:33
 */
import React from 'react'
import { View, TouchableOpacity as RNTouchableOpacity } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

function TouchableWithoutFeedback({ useRN, children, ...other }) {
  const Component = useRN ? RNTouchableOpacity : TouchableOpacity
  return (
    <Component activeOpacity={1} {...other}>
      <View>{children}</View>
    </Component>
  )
}

export default TouchableWithoutFeedback
