/*
 * @Author: czy0729
 * @Date: 2022-08-13 09:58:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-19 11:28:50
 */
import React, { useCallback, useMemo } from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { runOnJS } from 'react-native-reanimated'
import { uiStore } from '@stores'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'

/**
 * 获取手指最近一次点击相对于屏幕的坐标
 * @Doc https://docs.swmansion.com/react-native-gesture-handler/docs/gestures/gesture
 */
export const TapListener = ({ children }) => {
  r(COMPONENT)

  const handleSet = useCallback((x: number, y: number) => {
    uiStore.setXY(x, y)
  }, [])
  const tap = useMemo(
    () =>
      Gesture.Tap()
        .maxDuration(250)
        .onEnd(event => {
          runOnJS(handleSet)(event.x, event.y)
        }),
    [handleSet]
  )

  return <GestureDetector gesture={tap}>{children}</GestureDetector>
}

export default TapListener
