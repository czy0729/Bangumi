/*
 * @Author: czy0729
 * @Date: 2020-06-24 16:50:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 22:33:25
 */
import React, { useCallback, useEffect } from 'react'
import { View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { stl } from '@utils'
import { SegmentedControlTab } from './segmented-control-tab'
import { memoStyles } from './styles'

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
  const containerWidth = useSharedValue(0)
  const indexAnim = useSharedValue(selectedIndex)
  const isInitialized = useSharedValue(false)

  useEffect(() => {
    if (containerWidth.value === 0) {
      indexAnim.value = selectedIndex
      return
    }

    indexAnim.value = withTiming(selectedIndex, {
      duration: 250,
      easing: Easing.out(Easing.quad)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex, containerWidth])

  const handleLayout = useCallback(
    ({
      nativeEvent: {
        layout: { width }
      }
    }: LayoutChangeEvent) => {
      if (width > 0) {
        containerWidth.value = width
        if (!isInitialized.value) {
          indexAnim.value = selectedIndex
          isInitialized.value = true
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedIndex]
  )

  const itemWidth = useDerivedValue(() => {
    return values.length > 0 ? containerWidth.value / values.length : 0
  })

  const animatedStyle = useAnimatedStyle(() => {
    const show = isInitialized.value && itemWidth.value > 0

    return {
      opacity: show ? 1 : 0,
      width: itemWidth.value > 0 ? itemWidth.value - 2 : 0,
      transform: [
        {
          translateX: indexAnim.value * itemWidth.value
        }
      ]
    }
  })

  const handlePress = useCallback(
    (index: number) => {
      if (!enabled || index === selectedIndex) return

      const event = {
        nativeEvent: {
          value: values[index],
          selectedSegmentIndex: index
        }
      }
      onChange?.(event)
      onValueChange?.(values[index])
    },
    [enabled, selectedIndex, values, onChange, onValueChange]
  )

  const styles = memoStyles()

  return (
    <View
      style={stl(styles.default, style, styleExtra, backgroundColor && { backgroundColor })}
      onLayout={handleLayout}
    >
      <Animated.View
        style={[
          styles.slider,
          {
            backgroundColor: tintColor || 'white'
          },
          styleExtra,
          animatedStyle
        ]}
      />

      {values?.map((value, index) => (
        <SegmentedControlTab
          key={index}
          value={value}
          type={type}
          size={size}
          enabled={enabled}
          selected={selectedIndex === index}
          onSelect={() => handlePress(index)}
        />
      ))}
    </View>
  )
}

export default SegmentedControlComp
