/*
 * @Author: czy0729
 * @Date: 2019-05-04 15:59:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-04 16:15:11
 */
import React from 'react'
import { StatusBar as RNStatusBar } from 'react-native'
import { IOS } from '@constants'

const StatusBar = ({ barStyle }) => {
  let _barStyle = barStyle
  if (!_barStyle) {
    _barStyle = IOS ? 'dark-content' : 'light-content'
  }
  return <RNStatusBar animated translucent={!IOS} barStyle={barStyle} />
}

export default StatusBar
