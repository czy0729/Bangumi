/*
 * @Author: czy0729
 * @Date: 2019-05-04 15:59:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-23 01:25:45
 */
import React from 'react'
import { StatusBar as RNStatusBar } from 'react-native'
import { IOS, MI } from '@constants'

const StatusBar = ({ barStyle, forceBarStyle }) => {
  let _barStyle = barStyle
  if (!_barStyle) {
    _barStyle = IOS ? 'dark-content' : 'light-content'
  }

  // 小米收的MIUI的头部在不开启沉浸模式的情况下永远都是白色
  if (MI) {
    _barStyle = forceBarStyle || 'dark-content'
  }
  return <RNStatusBar animated translucent={!IOS} barStyle={_barStyle} />
}

export default StatusBar
