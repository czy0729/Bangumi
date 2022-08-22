/*
 * @Author: czy0729
 * @Date: 2021-09-26 07:16:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-21 15:49:27
 */
import React, { useRef, useEffect, useMemo } from 'react'
import { Animated } from 'react-native'
import { Iconfont } from '@components'
import { _ } from '@stores'
import { ColorValue, ViewStyle } from '@types'
import { useObserver } from 'mobx-react-lite'

type Props = {
  style?: ViewStyle
  expand?: boolean
  color?: ColorValue
}

export const IconExpand = ({ style, expand = false, color }: Props) => {
  const rotate = useRef(new Animated.Value(expand ? 1 : 0))
  const styles = useMemo(
    () => [
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
    ],
    [style]
  )
  useEffect(() => {
    requestAnimationFrame(() =>
      Animated.timing(rotate.current, {
        toValue: expand ? 1 : 0,
        duration: 160,
        useNativeDriver: true
      }).start()
    )
  }, [expand])

  return useObserver(() => (
    <Animated.View style={styles}>
      <Iconfont name='md-navigate-next' size={22} color={color || _.colorIcon} />
    </Animated.View>
  ))
}
