/* eslint-disable react-hooks/exhaustive-deps */
/*
 * @Author: czy0729
 * @Date: 2021-09-26 13:37:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-05 06:22:43
 */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { LayoutChangeEvent, View } from 'react-native'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { COMPONENT, MIN_HEIGHT } from './ds'
import { Props as AccordionProps } from './types'

export { AccordionProps }

/** 手风琴 */
export const Accordion = ({ style, expand = false, lazy = true, children }: AccordionProps) => {
  r(COMPONENT)

  const [show, setShow] = useState(lazy ? expand : true)
  const expanded = useRef(expand)
  const contentHeight = useSharedValue(0) // 存储 children 的实际高度
  const translateY = useSharedValue(0) // 用于 translateY 动画

  // 动态样式
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    overflow: 'hidden'
  }))

  // 监听 children 高度变化
  const handleLayout = useCallback(
    (evt: LayoutChangeEvent) => {
      const newHeight = Math.max(evt.nativeEvent.layout.height, MIN_HEIGHT)
      if (contentHeight.value === newHeight) return // 如果高度没有变化，直接返回

      // 更新内容高度
      contentHeight.value = newHeight

      // 如果当前是展开状态，同步更新 translateY
      if (expand) {
        translateY.value = withSpring(0, {
          damping: 20, // 阻尼，控制回弹力度
          stiffness: 200 // 刚度，控制动画速度
        })
      }
    },
    [expand]
  )

  // 展开/收起控制
  useEffect(() => {
    if (expand) {
      setShow(true)
      expanded.current = true
      // 展开时，translateY 使用弹簧动画过渡到 0
      translateY.value = withSpring(0, {
        damping: 20, // 阻尼，控制回弹力度
        stiffness: 200 // 刚度，控制动画速度
      })
    } else {
      // 收起时，translateY 使用普通动画过渡到 contentHeight.value
      translateY.value = withTiming(contentHeight.value + _.bottom, { duration: 160 }, finished => {
        if (finished) {
          runOnJS(setShow)(false)
        }
      })
    }
  }, [expand])

  // 如果 children 高度变化，重新触发动画
  useEffect(() => {
    if (expand) {
      translateY.value = withSpring(0, {
        damping: 20,
        stiffness: 200
      })
    }
  }, [contentHeight.value]) // 监听 contentHeight 的变化

  if (!expanded.current && lazy && !show) return null

  return (
    <Animated.View style={[animatedStyles, style]} pointerEvents='box-none'>
      <View pointerEvents='box-none' onLayout={handleLayout}>
        {children}
      </View>
    </Animated.View>
  )
}

export default Accordion
