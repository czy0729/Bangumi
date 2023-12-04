/*
 * @Author: czy0729
 * @Date: 2019-08-11 14:02:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-04 22:14:22
 */
import React from 'react'
import { StatusBarStyle } from 'react-native'
import { observer } from 'mobx-react'
import { IOS, STORYBOOK } from '@constants'
import { _ } from '@stores'
import { StatusBar } from '../status-bar'
import { NavigationEvents } from '../navigation/events'
import { Props as StatusBarEventsProps, PassProps } from './types'

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
    if (STORYBOOK) return null

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
