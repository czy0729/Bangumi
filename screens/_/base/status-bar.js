/*
 * @Author: czy0729
 * @Date: 2019-05-04 15:59:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-27 15:54:37
 */
import React from 'react'
import { StatusBar as RNStatusBar } from 'react-native'
import { IOS, MI } from '@constants'

const StatusBar = ({ barStyle }) => {
  let _barStyle = barStyle
  if (!_barStyle) {
    _barStyle = IOS ? 'dark-content' : 'light-content'
  }

  // 小米收的MIUI的头部在不开启沉浸模式的情况下永远都是白色
  // @issue 由于暂时安卓端不能沉浸, MIUI使用dark, 其他用light
  if (!IOS) {
    _barStyle = MI ? 'dark-content' : 'light-content'
  }
  return <RNStatusBar animated translucent={!IOS} barStyle={_barStyle} />
}

export default StatusBar
