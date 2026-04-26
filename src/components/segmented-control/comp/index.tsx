/*
 * @Author: czy0729
 * @Date: 2020-06-24 16:50:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-26 13:30:52
 */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { stl } from '@utils'
import { SegmentedControlTab } from '../segmented-control-tab'
import { styles } from './styles'

import type { LayoutChangeEvent } from 'react-native'
import type { DataSource } from '@types'
import type { Props } from '../types'

function SegmentedControlComp<T extends DataSource>({
  style,
  values,
  selectedIndex,
  enabled = true,
  tintColor,
  backgroundColor,
  onChange,
  onValueChange,
  styleExtra,
  type,
  size
}: Props<T>) {
  const [currentSelectedIndex, setCurrentSelectedIndex] = useState(selectedIndex)
  const [segmentWidth, setSegmentWidth] = useState(0)

  // 用于标记：是否由用户点击触发（决定是否显示动画）
  const isInternalChange = useRef(false)
  const animation = useSharedValue(0)

  useEffect(() => {
    if (selectedIndex !== currentSelectedIndex) {
      // 外部改变或初始化，不触发动画
      isInternalChange.current = false
      setCurrentSelectedIndex(selectedIndex)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex])

  const handleLayout = useCallback(
    ({
      nativeEvent: {
        layout: { width }
      }
    }: LayoutChangeEvent) => {
      const newSegmentWidth = values.length ? width / values.length : 0
      if (newSegmentWidth !== segmentWidth) {
        // 布局重新计算时，滑块应直接定位，不执行动画
        isInternalChange.current = false
        setSegmentWidth(newSegmentWidth)
      }
    },
    [values.length, segmentWidth]
  )

  useEffect(() => {
    if (segmentWidth > 0 && currentSelectedIndex != null) {
      const targetValue = segmentWidth * currentSelectedIndex

      if (isInternalChange.current) {
        // 只有用户点击时才使用 withTiming 动画
        animation.value = withTiming(targetValue, {
          duration: 250,
          easing: Easing.out(Easing.quad)
        })
      } else {
        // 初次加载、容器大小变化或外部 Props 更新，直接赋值（一步到位）
        animation.value = targetValue
      }

      // 执行完毕后重置标记位
      isInternalChange.current = false
    }
  }, [segmentWidth, currentSelectedIndex, animation])

  const handleChange = useCallback(
    (index: number) => {
      if (currentSelectedIndex === index || !enabled) return

      // 用户点击，开启触发动画的开关
      isInternalChange.current = true
      setCurrentSelectedIndex(index)

      const event = {
        nativeEvent: {
          value: values[index],
          selectedSegmentIndex: index
        }
      }

      setTimeout(() => {
        onChange?.(event)
        onValueChange?.(values[index])
      }, 250)
    },
    [currentSelectedIndex, values, enabled, onChange, onValueChange]
  )

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: animation.value }]
  }))

  return (
    <View
      style={stl(styles.default, style, styleExtra, backgroundColor && { backgroundColor })}
      onLayout={handleLayout}
    >
      {segmentWidth > 0 && currentSelectedIndex != null && (
        <Animated.View
          style={stl(
            styles.slider,
            animatedStyle,
            {
              width: segmentWidth - 2,
              backgroundColor: tintColor || 'white'
            },
            styleExtra
          )}
        />
      )}

      {values?.map?.((value: any, index: number) => (
        <SegmentedControlTab
          key={index}
          value={value}
          type={type}
          size={size}
          enabled={enabled}
          selected={currentSelectedIndex === index}
          onSelect={() => handleChange(index)}
        />
      ))}
    </View>
  )
}

export default SegmentedControlComp
