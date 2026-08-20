/*
 * @Author: czy0729
 * @Date: 2024-05-08 21:07:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-20 00:00:00
 */
import { useCallback, useEffect, useState } from 'react'
import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated'
import { _ } from '@stores'
import { COLLECTION_STATUS } from '@constants'
import { SPRING_CONFIG } from './ds'

import type { LayoutChangeEvent } from 'react-native'
import type { Props } from './types'

export function useStatusBtnGroup(value: Props['value']) {
  const { length } = COLLECTION_STATUS
  const colors = [
    _.colorMain,
    _.colorWarning,
    _.colorPrimary,
    _.colorWait,
    _.select(_.colorBg, 'rgb(96, 96, 96)')
  ] as const

  const animate = useSharedValue(false)
  const activeIndex = useSharedValue(
    COLLECTION_STATUS.findIndex(item => item.value === value) || -1
  )
  const [buttonWidth, setButtonWidth] = useState(0)

  const blockStyle = useAnimatedStyle(() => {
    const translateX = activeIndex.value * buttonWidth
    const backgroundColor = colors[activeIndex.value] || 'transparent'
    return {
      width: buttonWidth,
      backgroundColor,
      transform: [
        {
          translateX: animate.value ? withSpring(translateX, SPRING_CONFIG) : translateX
        }
      ]
    }
  })

  const buttonColors = Array.from({ length }, (_, index) =>
    useSharedValue(index === activeIndex.value ? 1 : 0)
  )

  // COLLECTION_STATUS 长度恒定, 循环内调用 hooks 的调用顺序稳定, 故可安全使用
  const buttonStyles = buttonColors.map(color =>
    useAnimatedStyle(() => {
      const textColor = interpolateColor(color.value, [0, 1], ['#000', '#fff'])
      return {
        color: textColor
      }
    })
  )

  const setActiveButton = useCallback(
    (index: number) => {
      buttonColors.forEach((color, i) => {
        color.value = withTiming(i === index ? 1 : 0, {
          duration: 120
        })
      })
    },
    [buttonColors]
  )

  /** 计算活动块的宽度 */
  const handleContainerLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { width } = event.nativeEvent.layout
      setButtonWidth(width / length)
    },
    [length]
  )

  /** 按钮点击 */
  const handleButtonPress = useCallback(
    (index: number) => {
      if (activeIndex.value !== -1) {
        setTimeout(() => {
          animate.value = true
        }, 0)
      }
      activeIndex.value = index
    },
    [activeIndex, animate]
  )

  useEffect(() => {
    const index = COLLECTION_STATUS.findIndex(item => item.value === value)
    if (index !== -1) {
      setTimeout(() => {
        animate.value = true
      }, 40)
    }

    activeIndex.value = index
    setActiveButton(index)
  }, [activeIndex, animate, setActiveButton, value])

  return {
    /** 活动块样式 */
    blockStyle,

    /** 各按钮文字动画样式 */
    buttonStyles,

    /** 计算活动块宽度 */
    handleContainerLayout,

    /** 按钮点击处理 */
    handleButtonPress
  }
}
