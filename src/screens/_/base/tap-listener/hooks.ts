/*
 * @Author: czy0729
 * @Date: 2026-08-21 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-21 00:00:00
 */
import { useCallback, useMemo } from 'react'
import { Gesture } from 'react-native-gesture-handler'
import { uiStore } from '@stores'
import { scheduleOnRN } from '@utils/worklets'

/** 创建 Tap 手势, 记录最近一次点击的屏幕坐标 */
export function useTapGesture() {
  const handleSet = useCallback((x: number, y: number) => {
    uiStore.setXY(x, y)
  }, [])

  return useMemo(
    () =>
      Gesture.Tap()
        .maxDuration(250)
        .onEnd(event => {
          // absoluteX / absoluteY 为相对窗口 (屏幕) 的坐标, x / y 相对所绑定视图
          scheduleOnRN(handleSet, event.absoluteX, event.absoluteY)
        }),
    [handleSet]
  )
}
