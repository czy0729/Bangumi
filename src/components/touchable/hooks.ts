/*
 * @Author: czy0729
 * @Date: 2023-12-30 05:35:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-09 22:51:12
 */
import { useCallback, useState } from 'react'
import { uiStore } from '@stores'
import { CLICK_LOCK_MS } from './ds'

import type { GestureResponderEvent } from 'react-native'
import type { TouchableHandlePress } from './types'

export function useCallOnceInInterval(onPress: TouchableHandlePress) {
  const [disabled, setDisabled] = useState(false)

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      // 滑动过程中不响应点击，防止误触
      if (uiStore.isScrolling) return

      setDisabled(true)

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

        setTimeout(() => {
          setDisabled(false)
        }, CLICK_LOCK_MS)
      })
    },
    [onPress]
  )

  return {
    handleDisabled: disabled,
    handlePress
  }
}
