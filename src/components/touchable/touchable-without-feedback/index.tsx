/*
 * @Author: czy0729
 * @Date: 2023-02-28 16:14:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 14:37:16
 */
import React from 'react'
import { TouchableWithoutFeedback as RNTouchableWithoutFeedback, View } from 'react-native'

function TouchableWithoutFeedback({ style, useRN, children, ...other }) {
  return (
    <RNTouchableWithoutFeedback {...other}>
      <View style={style}>{children}</View>
    </RNTouchableWithoutFeedback>
  )
}

export default TouchableWithoutFeedback
