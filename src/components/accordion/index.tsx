/*
 * @Author: czy0729
 * @Date: 2021-09-26 13:37:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-18 03:47:37
 */
import React, { useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { COMPONENT, DURATION, MIN_HEIGHT } from './ds'

import type { LayoutChangeEvent } from 'react-native'
import type { Props as AccordionProps } from './types'
export type { AccordionProps }

/** 折叠/展开容器，展开/收起均为淡入淡出 + 位移 + 缩放，动画对称 */
export const Accordion = observer(
  ({ style, expand = false, lazy = true, children }: AccordionProps) => {
    r(COMPONENT)

    const [show, setShow] = useState(lazy ? expand : true)
    const translateY = useSharedValue(expand ? 0 : 1000)
    const scale = useSharedValue(expand ? 1 : 0.9)
    const opacity = useSharedValue(expand ? 1 : 0)
    const heightRef = useRef(0)

    const animatedStyles = useAnimatedStyle(
      () =>
        ({
          transform: [{ translateY: translateY.value }, { scale: scale.value }],
          opacity: opacity.value,
          overflow: 'hidden'
        } as const),
      []
    )

    const handleLayout = (evt: LayoutChangeEvent) => {
      const newHeight = Math.max(evt.nativeEvent.layout.height, MIN_HEIGHT)
      if (Math.abs(heightRef.current - newHeight) < 1) return // 忽略微小抖动

      heightRef.current = newHeight
    }

    useEffect(() => {
      if (expand) {
        setShow(true)
        translateY.value = withTiming(0, { duration: DURATION })
        scale.value = withTiming(1, { duration: DURATION })
        opacity.value = withTiming(1, { duration: DURATION })
      } else {
        translateY.value = withTiming(
          heightRef.current + _.bottom,
          { duration: DURATION },
          finished => {
            if (finished && lazy) scheduleOnRN(setShow, false)
          }
        )
        scale.value = withTiming(0.9, { duration: DURATION })
        opacity.value = withTiming(0, { duration: DURATION })
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
