/*
 * tabbar前面几个页面不会二次渲染
 * 需要使用NavigationEvents的订阅来改变StatusBar的颜色
 * @Doc: https://reactnavigation.org/docs/en/navigation-events.html
 * @Author: czy0729
 * @Date: 2019-08-11 14:02:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-11 14:23:41
 */
import React from 'react'
import { StatusBar as RNStatusBar } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { IOS, MI } from '@constants'
import StatusBar from './status-bar'

function StatusBarEvents({ barStyle }) {
  let _barStyle = barStyle
  if (!_barStyle) {
    _barStyle = IOS ? 'dark-content' : 'light-content'
    _barStyle = MI ? 'dark-content' : 'light-content'
  }

  // 小米的MIUI的头部在不开启沉浸模式的情况下永远都是白色
  // @issue 由于暂时安卓端不能沉浸, MIUI使用dark, 其他用light
  // if (!IOS) {
  //   _barStyle = MI ? 'dark-content' : 'light-content'
  // }
  return (
    <>
      <NavigationEvents
        onWillFocus={() => RNStatusBar.setBarStyle(_barStyle, true)}
      />
      <StatusBar barStyle={_barStyle} />
    </>
  )
}

StatusBarEvents.defaultProps = {
  barStyle: 'dark-content'
}

export default StatusBarEvents
