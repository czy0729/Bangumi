/*
 * @Author: czy0729
 * @Date: 2023-02-28 16:46:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-30 17:37:30
 */
import React from 'react'
import { TouchableOpacity as RNTouchableOpacity } from 'react-native'

// import { TouchableOpacity as GHTouchableOpacity } from 'react-native-gesture-handler'

function TouchableOpacity({ useRN, children, ...other }) {
  // if (useRN) {
  return (
    <RNTouchableOpacity {...other} activeOpacity={0.72}>
      {children}
    </RNTouchableOpacity>
  )
  // }

  // return (
  //   <GHTouchableOpacity {...other} activeOpacity={0.72}>
  //     {children}
  //   </GHTouchableOpacity>
  // )
}

export default TouchableOpacity
