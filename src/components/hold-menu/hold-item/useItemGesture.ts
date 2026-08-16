/*
 * @Author: czy0729
 * @Date: 2026-08-09 05:55:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-09 05:58:05
 */
import { useCallback, useMemo } from 'react'
import { Gesture } from 'react-native-gesture-handler'
import { scheduleOnRN } from '@utils'
import { useHoldMenu } from '../context'
import type { ItemGestureProps } from './types'

/** HoldItem 手势控制器: 长按/点按/双击展开, clone 上的点按关闭 */
export const useItemGesture = ({
  activateOn,
  onStart,
  scaleBack,
  isAnimating,
  close,
  closeOnTap
}: ItemGestureProps) => {
  const { active } = useHoldMenu()

  // tap/double-tap 手指移动成拖动被取消时, 中断缩放序列并清理已提交内容, 避免展开菜单
  const cancelBeforeOpen = useCallback(
    (_event: unknown, success: boolean) => {
      'worklet'
      if (!success && active.value !== 1) {
        isAnimating.value = false
        scaleBack()
        scheduleOnRN(close)
      }
    },
    [active, isAnimating, scaleBack, close]
  )

  const gesture = useMemo(() => {
    if (activateOn === 'double-tap') {
      return Gesture.Tap()
        .numberOfTaps(2)
        .onStart(onStart)
        .onFinalize(cancelBeforeOpen)
    }

    if (activateOn === 'tap') {
      return Gesture.Tap()
        .numberOfTaps(1)
        .onStart(onStart)
        .onFinalize(cancelBeforeOpen)
    }

    return Gesture.LongPress()
      .minDuration(150)
      .onStart(onStart)
      .onFinalize(() => {
        'worklet'
        if (active.value !== 1) {
          isAnimating.value = false
          scaleBack()
          // 未展开即结束, 清理已提交但未激活的菜单内容
          scheduleOnRN(close)
        }
      })
  }, [activateOn, onStart, cancelBeforeOpen, active, isAnimating, close])

  const overlayGesture = useMemo(
    () =>
      Gesture.Tap()
        .numberOfTaps(1)
        .onEnd(() => {
          'worklet'
          if (closeOnTap) {
            scheduleOnRN(close)
          }
        }),
    [closeOnTap, close]
  )

  return { gesture, overlayGesture }
}
