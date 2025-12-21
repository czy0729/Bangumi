/*
 * @Author: czy0729
 * @Date: 2021-09-26 07:16:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-13 16:14:09
 */
import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Component, Iconfont } from '@components'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { USE_NATIVE_DRIVER } from '@constants'
import { COMPONENT } from './ds'
import { Props as IconExpandProps } from './types'

export { IconExpandProps }

export const IconExpand = ({ style, expand = false, color }: IconExpandProps) => {
  r(COMPONENT)

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
        useNativeDriver: USE_NATIVE_DRIVER
      }).start()
    )
  }, [expand])

  return useObserver(() => (
    <Component id='icon-expand'>
      <Animated.View style={styles}>
        <Iconfont name='md-navigate-next' size={22} color={color || _.colorIcon} />
      </Animated.View>
    </Component>
  ))
}

export default IconExpand
