/*
 * @Author: czy0729
 * @Date: 2023-02-28 16:46:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-10 20:16:20
 */
import React from 'react'
import { View, TouchableOpacity as RNTouchableOpacity } from 'react-native'
import { TouchableOpacity as GHTouchableOpacity } from 'react-native-gesture-handler'

function TouchableOpacity({ useRN, children, ...other }) {
  const Component = useRN ? RNTouchableOpacity : GHTouchableOpacity
  return (
    <Component activeOpacity={0.72} {...other}>
      <View>{children}</View>
    </Component>
  )
}

export default TouchableOpacity
