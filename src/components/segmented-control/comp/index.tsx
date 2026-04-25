/*
 * @Author: czy0729
 * @Date: 2020-06-24 16:50:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-25 22:34:35
 */
import React, { useCallback, useEffect, useState } from 'react'
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

  const animation = useSharedValue(0)

  useEffect(() => {
    setCurrentSelectedIndex(selectedIndex)
  }, [selectedIndex])

  const handleLayout = useCallback(
    ({
      nativeEvent: {
        layout: { width }
      }
    }) => {
      const newSegmentWidth = values.length ? width / values.length : 0
      if (newSegmentWidth !== segmentWidth) {
        animation.value = newSegmentWidth * (currentSelectedIndex || 0)
        setSegmentWidth(newSegmentWidth)
      }
    },
    [currentSelectedIndex, animation, segmentWidth, values.length]
  )

  const handleChange = useCallback(
    (index: number) => {
      if (currentSelectedIndex === index) return

      if (segmentWidth) {
        animation.value = withTiming(segmentWidth * index, {
          duration: 250,
          easing: Easing.out(Easing.quad)
        })
      }

      setCurrentSelectedIndex(index)

      const event = {
        nativeEvent: {
          value: values[index],
          selectedSegmentIndex: index
        }
      }

      setTimeout(() => {
        onChange && onChange(event)
        onValueChange && onValueChange(values[index])
      }, 300)
    },
    [currentSelectedIndex, values, segmentWidth, animation, onChange, onValueChange]
  )

  useEffect(() => {
    if (segmentWidth) {
      const targetValue = segmentWidth * (currentSelectedIndex || 0)
      if (animation.value !== targetValue) {
        animation.value = withTiming(targetValue, {
          duration: 300,
          easing: Easing.out(Easing.quad)
        })
      }
    }
  }, [segmentWidth, currentSelectedIndex, animation])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: animation.value }]
  }))

  return (
    <View
      style={stl(styles.default, style, styleExtra, backgroundColor && { backgroundColor })}
      onLayout={handleLayout}
    >
      {currentSelectedIndex != null && segmentWidth ? (
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
      ) : null}

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
