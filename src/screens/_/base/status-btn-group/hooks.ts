/*
 * @Author: czy0729
 * @Date: 2024-05-08 21:07:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-21 16:52:40
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

  /** 白天主题, 按钮非选定下文字为黑色, 选定为白色 */
  const getButtonStyle = (index: number) => {
    return useAnimatedStyle(() => {
      const color = interpolateColor(buttonColors[index].value, [0, 1], ['#000', '#fff'])
      return {
        color
      }
    })
  }
  const setActiveButton = useCallback(
    (index: number) => {
      buttonColors.forEach((color, i) => {
        color.value = withTiming(i === index ? 1 : 0, {
          duration: 80
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
    blockStyle,
    getButtonStyle,
    handleContainerLayout,
    handleButtonPress
  }
}
