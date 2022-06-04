/*
 * https://github.com/react-native-community/segmented-control/tree/master/js
 *
 * @Author: czy0729
 * @Date: 2020-06-24 16:50:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-04 22:52:30
 */
import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Animated, Easing, View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { SegmentedControlTab } from './segmented-control-tab'
import { styles } from './styles'
import { Props } from './types'

/**
 * SegmentedControl
 * iOS 13 Style UISegmentedControl Component for Android and Web
 */
const SegmentedControlComp = ({
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
}: Props) => {
  // 组件内缓存一层, 使UI能尽快响应
  const [_selectedIndex, _setSelectedIndex] = useState(selectedIndex)
  const [segmentWidth, setSegmentWidth] = useState(0)
  const animation = useRef(new Animated.Value(0)).current

  const handleChange = useCallback(
    (index: number) => {
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
      }, 0)
    },
    [onChange, onValueChange, values]
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
      style={[
        styles.default,
        style,
        styleExtra,
        backgroundColor && { backgroundColor }
        // !enabled && styles.disabled
      ]}
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
        <Animated.View
          style={[
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
          ]}
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

export const SegmentedControl = observer(
  ({ tintColor, fontStyle, activeFontStyle, backgroundColor, ...other }: Props) => (
    <SegmentedControlComp
      tintColor={tintColor || _.select(_.colorPlain, _._colorDarkModeLevel2)}
      backgroundColor={backgroundColor || _.colorBg}
      {...other}
    />
  )
)
