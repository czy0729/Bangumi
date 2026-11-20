/*
 * @Author: czy0729
 * @Date: 2026-11-21 03:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-21 03:00:00
 */
import * as React from 'react'
import { Animated } from 'react-native'

export function useAnimatedValue(initialValue: number) {
  const lazyRef = React.useRef<Animated.Value | undefined>(undefined)

  if (lazyRef.current === undefined) {
    lazyRef.current = new Animated.Value(initialValue)
  }

  return lazyRef.current as Animated.Value
}
