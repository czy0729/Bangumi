/*
 * tabbar前面几个页面不会二次渲染
 * 需要使用NavigationEvents的订阅来改变StatusBar的颜色
 * @Doc: https://reactnavigation.org/docs/en/navigation-events.html
 * @Author: czy0729
 * @Date: 2019-08-11 14:02:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-05 20:31:35
 */
import React from 'react'
import { StatusBar } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { IOS } from '@constants'

function StatusBarEvents({
  backgroundColor,
  barStyle,
  translucent,
  animated,
  action
}) {
  const events = () => {
    StatusBar.setBackgroundColor(backgroundColor, animated)
    StatusBar.setBarStyle(barStyle, animated)
    StatusBar.setTranslucent(translucent, animated)
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
        barStyle={barStyle}
        translucent={translucent}
        animated={animated}
      />
      <NavigationEvents {...props} />
    </>
  )
}

StatusBarEvents.defaultProps = {
  backgroundColor: '#ffffff',
  barStyle: 'dark-content',
  translucent: !IOS,
  animated: IOS,
  action: 'onDidFocus'
}

export default StatusBarEvents
