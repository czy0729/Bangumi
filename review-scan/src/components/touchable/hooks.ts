/*
 * @Author: czy0729
 * @Date: 2023-12-30 05:35:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-09 22:51:12
 */
import { useCallback, useState } from 'react'
import { GestureResponderEvent } from 'react-native'
import { Fn } from '@types'

export function useCallOnceInInterval(onPress: Fn) {
  const [disabled, setDisabled] = useState(false)
  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      setDisabled(true)

      /**
       * 这里一定不能用 requestAnimationFrame
       * 会出现一种情况, 比如图片加载很慢, 一直在现实骨架屏动画, 会一直被延迟执行点击, 产生假死现象
       * */
      const { pageX, pageY } = event.nativeEvent

      setTimeout(() => {
        onPress({
          pageX,
          pageY
        })
        setTimeout(() => {
          setDisabled(false)
        }, 400)
      }, 0)
    },
    [onPress]
  )

  return {
    handleDisabled: disabled,
    handlePress
  }
}
