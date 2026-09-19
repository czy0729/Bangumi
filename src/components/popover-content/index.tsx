/*
 * @Author: czy0729
 * @Date: 2026-09-19 10:10:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-19 20:59:35
 *
 * 内容浮框: 以调用方给定的绝对定位挂载任意内容, 由 Portal 承载
 */
import { useEffect, useRef } from 'react'
import { Animated, View } from 'react-native'
import { r } from '@utils/dev'
import { DURATION_POPOVER, USE_NATIVE_DRIVER } from '@constants'
import { Component } from '../component'
import { COMPONENT, TRANSLATE_OFFSET } from './ds'

import type { Props as PopoverContentProps } from './types'
export type { PopoverContentProps }

export function PopoverContent({
  visible,
  position = 'bottom',
  style,
  children
}: PopoverContentProps) {
  r(COMPONENT)

  const opacityRef = useRef<Animated.Value | null>(null)
  if (!opacityRef.current) opacityRef.current = new Animated.Value(0)

  const opacity = opacityRef.current

  useEffect(() => {
    const animation = Animated.timing(opacity, {
      toValue: visible ? 1 : 0,
      duration: DURATION_POPOVER,
      useNativeDriver: USE_NATIVE_DRIVER
    })
    animation.start()

    return () => animation.stop()
  }, [visible, opacity])

  return (
    <Component id='component-popover-content'>
      <View style={style} pointerEvents={visible ? 'auto' : 'none'}>
        <Animated.View
          style={{
            opacity,
            transform: [
              {
                translateY: opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: position === 'top' ? [TRANSLATE_OFFSET, 0] : [-TRANSLATE_OFFSET, 0]
                })
              }
            ]
          }}
        >
          {children}
        </Animated.View>
      </View>
    </Component>
  )
}

export default PopoverContent
