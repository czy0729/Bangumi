/*
 * tabbar前面几个页面不会二次渲染
 * 需要使用NavigationEvents的订阅来改变StatusBar的颜色
 * @Doc: https://reactnavigation.org/docs/en/navigation-events.html
 * @Author: czy0729
 * @Date: 2019-08-11 14:02:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-08 18:16:27
 */
import React from 'react'
import { StatusBar } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { IOS } from '@constants'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

export const StatusBarEvents = ob(
  ({
    tinygrail = false,
    backgroundColor = '#ffffff',
    barStyle = 'dark-content',
    translucent = !IOS,
    animated = IOS,
    action = 'onDidFocus'
  }) => {
    let _barStyle
    if (tinygrail) {
      _barStyle = barStyle
    } else {
      // 黑暗模式可以一直设置为light-content
      _barStyle = _.mode === 'light' ? barStyle : 'light-content'
    }
    const events = () => {
      if (!IOS) {
        StatusBar.setBackgroundColor(backgroundColor, animated)
        StatusBar.setTranslucent(translucent, animated)
      }
      StatusBar.setBarStyle(_barStyle, animated)
    }
    const props = {
      onDidFocus: () => events()
    }
    if (action === 'onWillFocus') {
      props.onWillFocus = () => events()
    }
    return (
      <>
        <StatusBar
          backgroundColor={backgroundColor}
          barStyle={_barStyle}
          translucent={translucent}
          animated={animated}
        />
        <NavigationEvents {...props} />
      </>
    )
  }
)
