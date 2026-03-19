/*
 * @Author: czy0729
 * @Date: 2023-02-28 16:46:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 14:32:31
 */
import React from 'react'
import { TouchableOpacity as RNTouchableOpacity } from 'react-native'

function TouchableOpacity({ useRN, children, ...other }) {
  return (
    <RNTouchableOpacity {...other} activeOpacity={0.72}>
      {children}
    </RNTouchableOpacity>
  )
}

export default TouchableOpacity
