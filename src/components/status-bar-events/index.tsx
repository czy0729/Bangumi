/*
 * @Author: czy0729
 * @Date: 2019-08-11 14:02:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-17 12:51:56
 */
import React from 'react'
import { StatusBarStyle } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { IOS, WEB } from '@constants'
import { NavigationEvents } from '../navigation/events'
import { StatusBar } from '../status-bar'
import { COMPONENT } from './ds'
import { PassProps, Props as StatusBarEventsProps } from './types'

export { StatusBarEventsProps }

/**
 * @deprecated tabbar 前面几个页面不会二次渲染, 需要使用 NavigationEvents 的订阅来改变 StatusBar 的颜色
 * @doc https://reactnavigation.org/docs/en/navigation-events.html
 * */
export const StatusBarEvents = observer(
  ({
    tinygrail = false,
    backgroundColor = '#ffffff',
    barStyle = 'dark-content',
    translucent = false,
    animated = IOS,
    action = 'onDidFocus'
  }: StatusBarEventsProps) => {
    r(COMPONENT)

    if (WEB) return null

    let _barStyle: StatusBarStyle
    if (tinygrail) {
      _barStyle = barStyle
    } else {
      // 黑暗模式可以一直设置为 light-content
      _barStyle = _.mode === 'light' ? barStyle : 'light-content'
    }

    const events = () => {
      if (!IOS) {
        StatusBar.setBackgroundColor(backgroundColor, animated)
        StatusBar.setTranslucent(translucent)
      }
      StatusBar.setBarStyle(_barStyle, animated)
    }
    const props: PassProps = {
      onDidFocus: () => events()
    }
    if (action === 'onWillFocus') props.onWillFocus = () => events()

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

export default StatusBarEvents
