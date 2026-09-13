/*
 * @Author: czy0729
 * @Date: 2023-12-30 05:35:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-13 16:20:00
 */
import { useCallback, useRef } from 'react'
import { uiStore } from '@stores'
import { CLICK_LOCK_MS } from './ds'

import type { TimerRef } from '@types'
import type { GestureResponderEvent } from 'react-native'
import type { TouchableHandlePress } from './types'

export function useCallOnceInInterval(onPress: TouchableHandlePress) {
  /**
   * 防双击锁: 用 ref 而不是 state
   *  - 点击路径上不产生任何 React 重渲染, 抬手后动作能立即执行
   *  - 间隔小于一帧的连点可能在锁生效前重复进入, 这里同步加锁挡掉
   */
  const lockedRef = useRef(false)

  /** 解锁计时器, 只保留最新一个 */
  const timerRef = useRef<TimerRef>(null)

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      // 滑动过程中不响应点击，防止误触
      if (uiStore.isScrolling) return
      if (lockedRef.current) return

      lockedRef.current = true

      /**
       * 这里一定不能用 requestAnimationFrame
       * 会出现一种情况, 比如图片加载很慢, 一直在现实骨架屏动画, 会一直被延迟执行点击, 产生假死现象
       * 微任务比 setTimeout(0) 更快, 且不受 rAF 渲染队列阻塞
       * */
      const { pageX, pageY } = event.nativeEvent

      Promise.resolve().then(() => {
        onPress({
          pageX,
          pageY
        })

        if (timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => {
          timerRef.current = null
          lockedRef.current = false
        }, CLICK_LOCK_MS)
      })
    },
    [onPress]
  )

  return {
    handlePress
  }
}
