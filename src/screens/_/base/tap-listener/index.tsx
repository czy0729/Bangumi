/*
 * 获取手指最近一次点击相对于屏幕的坐标
 *
 * @Author: czy0729
 * @Date: 2022-08-13 09:58:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-14 11:49:32
 */
import React from 'react'
import { View } from 'react-native'
import { useObserver } from 'mobx-react-lite'
import {
  PanGestureHandler,
  PanGestureHandlerStateChangeEvent,
  State
} from 'react-native-gesture-handler'
import { _, uiStore } from '@stores'
import { IOS } from '@constants'

export const TapListener = ({ children }) => {
  return useObserver(() => (
    <PanGestureHandler
      enabled
      minPointers={1}
      maxPointers={1}
      activeOffsetX={_.wind}
      activeOffsetY={_.wind}
      onHandlerStateChange={(event: PanGestureHandlerStateChangeEvent) => {
        if (event.nativeEvent.state === (IOS ? State.FAILED : State.END)) {
          uiStore.setXY(
            Math.floor(event.nativeEvent.absoluteX),
            Math.floor(event.nativeEvent.absoluteY)
          )
        }
      }}
    >
      <View style={_.container.flex}>{children}</View>
    </PanGestureHandler>
  ))
}
