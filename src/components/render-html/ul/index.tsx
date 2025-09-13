/*
 * @Author: czy0729
 * @Date: 2019-08-14 10:15:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-13 09:54:35
 */
import React from 'react'
import { View, ViewProps } from 'react-native'

function Ul({ style, children, ...other }: ViewProps) {
  return (
    <View style={style} {...other}>
      {children}
    </View>
  )
}

export default Ul
