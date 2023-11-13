/*
 * @Author: czy0729
 * @Date: 2021-09-26 07:16:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-14 01:00:48
 */
import React, { useRef, useEffect, useMemo } from 'react'
import { Animated } from 'react-native'
import { useObserver } from 'mobx-react'
import { Component, Iconfont } from '@components'
import { _ } from '@stores'
import { Props as IconExpandProps } from './types'

export { IconExpandProps }

export const IconExpand = ({ style, expand = false, color }: IconExpandProps) => {
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
    <Component id='icon-expand'>
      {/* @ts-expect-error */}
      <Animated.View style={styles}>
        <Iconfont name='md-navigate-next' size={22} color={color || _.colorIcon} />
      </Animated.View>
    </Component>
  ))
}
