/*
 * @Author: czy0729
 * @Date: 2019-05-04 15:59:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-11 21:30:39
 */
import React from 'react'
import { StatusBar as RNStatusBar } from 'react-native'
import { IOS, MI } from '@constants'

const StatusBar = ({ barStyle }) => {
  // 小米和iOS是一致的表现
  let _barStyle = barStyle
  if (IOS || MI) {
    if (!_barStyle) {
      _barStyle = 'dark-content'
    }
  } else {
    _barStyle = 'light-content'
  }
  return <RNStatusBar animated translucent={!IOS} barStyle={_barStyle} />
}

export default StatusBar
