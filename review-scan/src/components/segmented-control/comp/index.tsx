/*
 * @Author: czy0729
 * @Date: 2020-06-24 16:50:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-06 20:15:14
 */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Animated, Easing, View } from 'react-native'
import { stl } from '@utils'
import { USE_NATIVE_DRIVER } from '@constants'
import { DataSource } from '@types'
import { Props } from '../types'
import { SegmentedControlTab } from '../segmented-control-tab'
import { styles } from './styles'

function SegmentedControlComp<T extends DataSource>({
  style,
  values,
  selectedIndex,
  enabled = true,
  tintColor,
  backgroundColor,
  onChange,
  onValueChange,

  // @add
  styleExtra,
  type,
  size
}: Props<T>) {
  // 组件内缓存一层, 使 UI 能尽快响应
  const [_selectedIndex, _setSelectedIndex] = useState(selectedIndex)
  const [segmentWidth, setSegmentWidth] = useState(0)
  const animation = useRef(new Animated.Value(0)).current

  const handleLayout = useCallback(
    ({
      nativeEvent: {
        layout: { width }
      }
    }) => {
      const newSegmentWidth = values.length ? width / values.length : 0
      if (newSegmentWidth !== segmentWidth) {
        animation.setValue(newSegmentWidth * (_selectedIndex || 0))
        setSegmentWidth(newSegmentWidth)
      }
    },
    [_selectedIndex, animation, segmentWidth, values.length]
  )

  const handleChange = useCallback(
    (index: number) => {
      if (selectedIndex === index) return

      // mocks iOS's nativeEvent
      const event = {
        nativeEvent: {
          value: values[index],
          selectedSegmentIndex: index
        }
      }
      _setSelectedIndex(index)
      setTimeout(() => {
        onChange && onChange(event)
        onValueChange && onValueChange(values[index])
      }, 300)
    },
    [onChange, onValueChange, selectedIndex, values]
  )

  useEffect(() => {
    if (animation && segmentWidth) {
      Animated.timing(animation, {
        toValue: segmentWidth * (_selectedIndex || 0),
        duration: 300,
        easing: Easing.out(Easing.quad),
        useNativeDriver: USE_NATIVE_DRIVER
      }).start()
    }
  }, [animation, segmentWidth, _selectedIndex])

  return (
    <View
      style={stl(
        styles.default,
        style,
        styleExtra,
        backgroundColor && { backgroundColor }
        // !enabled && styles.disabled
      )}
      onLayout={handleLayout}
    >
      {_selectedIndex != null && segmentWidth ? (
        <Animated.View
          style={stl(
            styles.slider,
            {
              transform: [
                {
                  translateX: animation
                }
              ],
              width: segmentWidth - 2,
              backgroundColor: tintColor || 'white'
            },
            styleExtra
          )}
        />
      ) : null}
      {values &&
        values.map((value: string, index: number) => (
          <SegmentedControlTab
            key={index}
            value={value}
            type={type}
            size={size}
            enabled={enabled}
            selected={_selectedIndex === index}
            onSelect={() => {
              handleChange(index)
            }}
          />
        ))}
    </View>
  )
}

export default SegmentedControlComp
