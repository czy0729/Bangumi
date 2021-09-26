/*
 * @Author: czy0729
 * @Date: 2021-09-26 07:16:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-09-26 08:50:01
 */
import React, { useRef, useEffect } from 'react'
import { Animated } from 'react-native'
import { Iconfont } from '@components'
import { _ } from '@stores'

export const IconExpand = ({ style, expand = false, color = _.colorIcon }) => {
  const rotate = useRef(new Animated.Value(expand ? 1 : 0))
  useEffect(() => {
    Animated.timing(rotate.current, {
      toValue: expand ? 1 : 0,
      duration: 160,
      useNativeDriver: false
    }).start()
  }, [expand])
  return (
    <Animated.View
      style={[
        style,
        {
          transform: [
            {
              rotate: rotate.current.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '90deg']
              })
            }
          ]
        }
      ]}
    >
      <Iconfont name='md-navigate-next' size={22} color={color} />
    </Animated.View>
  )
}
