/*
 * tabbar前面几个页面不会二次渲染
 * 需要使用NavigationEvents的订阅来改变StatusBar的颜色
 * @Doc: https://reactnavigation.org/docs/en/navigation-events.html
 * @Author: czy0729
 * @Date: 2019-08-11 14:02:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-11 21:48:39
 */
import React from 'react'
import { StatusBar as RNStatusBar } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { IOS, MI } from '@constants'
import StatusBar from './status-bar'

function StatusBarEvents({ barStyle }) {
  // 小米和iOS是一致的表现
  let _barStyle = barStyle
  if (IOS || MI) {
    if (!_barStyle) {
      _barStyle = 'dark-content'
    }
  } else {
    _barStyle = 'light-content'
  }
  return (
    <>
      <NavigationEvents
        onDidFocus={() => RNStatusBar.setBarStyle(_barStyle, true)}
      />
      <StatusBar barStyle={_barStyle} />
    </>
  )
}

StatusBarEvents.defaultProps = {
  barStyle: 'dark-content'
}

export default StatusBarEvents
