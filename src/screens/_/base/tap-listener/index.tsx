/*
 * 获取手指最近一次点击相对于屏幕的坐标
 * @Doc: https://docs.swmansion.com/react-native-gesture-handler/docs/2.1.1/api/gestures/pan-gesture
 * @Author: czy0729
 * @Date: 2022-08-13 09:58:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-07 17:51:46
 */
import React from 'react'
import { View } from 'react-native'
import { useObserver } from 'mobx-react'
import {
  PanGestureHandler,
  PanGestureHandlerStateChangeEvent,
  State
} from 'react-native-gesture-handler'
import { _, uiStore } from '@stores'

export const TapListener = ({ children }) => {
  return useObserver(() => {
    return (
      <PanGestureHandler
        enabled
        // 设置下面值, 使得这个容器不应该能激活手势, 只用来获取点击 x, y 坐标
        minPointers={1}
        maxPointers={1}
        activeOffsetX={_.window.contentWidth}
        activeOffsetY={_.window.contentWidth}
        onHandlerStateChange={(event: PanGestureHandlerStateChangeEvent) => {
          if (event.nativeEvent.state === State.FAILED) {
            uiStore.setXY(
              Math.floor(event.nativeEvent.absoluteX),
              Math.floor(event.nativeEvent.absoluteY)
            )
          }
        }}
      >
        <View style={_.container.flex}>{children}</View>
      </PanGestureHandler>
    )
  })
}
