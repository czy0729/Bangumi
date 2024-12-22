/*
 * @Author: czy0729
 * @Date: 2023-02-28 16:14:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-18 11:32:50
 */
import React from 'react'
import { TouchableWithoutFeedback as RNTouchableWithoutFeedback, View } from 'react-native'

// import { TouchableOpacity } from 'react-native-gesture-handler'

function TouchableWithoutFeedback({
  style,
  useRN,
  // extraButtonProps = undefined,
  children,
  ...other
}) {
  // if (useRN) {
  return (
    <RNTouchableWithoutFeedback {...other}>
      <View style={style}>{children}</View>
    </RNTouchableWithoutFeedback>
  )
  // }

  // return (
  //   <TouchableOpacity {...other} activeOpacity={1} extraButtonProps={extraButtonProps}>
  //     <View>{children}</View>
  //   </TouchableOpacity>
  // )
}

export default TouchableWithoutFeedback
