/*
 * @Author: czy0729
 * @Date: 2020-06-24 16:50:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-12 20:48:26
 */
import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Animated, Easing, View } from 'react-native'
import { stl } from '@utils'
import { SegmentedControlTab } from '../segmented-control-tab'
import { Props } from '../types'
import { styles } from './styles'

function SegmentedControlComp({
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
}: Props) {
  // 组件内缓存一层, 使 UI 能尽快响应
  const [_selectedIndex, _setSelectedIndex] = useState(selectedIndex)
  const [segmentWidth, setSegmentWidth] = useState(0)
  const animation = useRef(new Animated.Value(0)).current

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
        useNativeDriver: true
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
      onLayout={({
        nativeEvent: {
          layout: { width }
        }
      }) => {
        const newSegmentWidth = values.length ? width / values.length : 0
        if (newSegmentWidth !== segmentWidth) {
          animation.setValue(newSegmentWidth * (_selectedIndex || 0))
          setSegmentWidth(newSegmentWidth)
        }
      }}
    >
      {_selectedIndex != null && segmentWidth ? (
        // @ts-expect-error
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
