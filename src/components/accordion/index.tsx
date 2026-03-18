/*
 * @Author: czy0729
 * @Date: 2021-09-26 13:37:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-18 03:47:37
 */
import React, { useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { ANIMATED_CONFIG, COMPONENT, MIN_HEIGHT } from './ds'

import type { LayoutChangeEvent } from 'react-native'
import type { Props as AccordionProps } from './types'
export type { AccordionProps }

export const Accordion = observer(
  ({ style, expand = false, lazy = true, children }: AccordionProps) => {
    r(COMPONENT)

    const [show, setShow] = useState(lazy ? expand : true)
    const contentHeight = useSharedValue(0)
    const translateY = useSharedValue(expand ? 0 : 1000)
    const heightRef = useRef(0)

    const animatedStyles = useAnimatedStyle(
      () => ({
        transform: [{ translateY: translateY.value }],
        overflow: 'hidden'
      }),
      []
    )

    const handleLayout = (evt: LayoutChangeEvent) => {
      const newHeight = Math.max(evt.nativeEvent.layout.height, MIN_HEIGHT)
      if (Math.abs(heightRef.current - newHeight) < 1) return // 忽略微小抖动

      heightRef.current = newHeight
      contentHeight.value = newHeight
    }

    useEffect(() => {
      if (expand) {
        setShow(true)
        requestAnimationFrame(() => {
          translateY.value = withSpring(0, ANIMATED_CONFIG)
        })
      } else {
        translateY.value = withTiming(heightRef.current + _.bottom, { duration: 280 }, finished => {
          if (finished && lazy) runOnJS(setShow)(false)
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [expand])

    if (lazy && !show) return null

    return (
      <Animated.View style={stl(animatedStyles, style)} pointerEvents='box-none'>
        <View pointerEvents='box-none' onLayout={handleLayout}>
          {children}
        </View>
      </Animated.View>
    )
  }
)

export default Accordion
