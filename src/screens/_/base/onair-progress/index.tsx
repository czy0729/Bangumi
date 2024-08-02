/*
 * @Author: czy0729
 * @Date: 2022-11-21 07:17:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-19 22:15:11
 */
import React from 'react'
import { View } from 'react-native'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { Component } from '@components'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props as OnairProgressProps } from './types'

export { OnairProgressProps }

/** 放送进度条 */
export const OnairProgress = ({
  epStatus = 0,
  current = 0,
  total = 0,
  defaultTotal = 12,
  height = 7
}: OnairProgressProps) => {
  r(COMPONENT)

  const totalPercent = Math.min(
    (Math.floor(Number(epStatus || 0)) / Math.floor(total || defaultTotal)) * 100,
    100
  )
  const currentPercent = Math.min(
    (Math.floor(current || 0) / Math.floor(total || defaultTotal)) * 100,
    100
  )
  const animatedStyle = useAnimatedStyle(() => ({
    width: withTiming(`${totalPercent ? Math.max(totalPercent, 2) : 0}%`, {
      duration: 120
    })
  }))

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <Component
        id='base-onair-progress'
        style={[
          styles.progress,
          {
            height
          }
        ]}
      >
        <View
          style={[
            styles.progressBar,
            {
              width: `${currentPercent ? Math.max(currentPercent, 2) : 0}%`,
              height
            }
          ]}
        />
        <Animated.View
          style={[
            styles.progressActive,
            animatedStyle,
            {
              height
            }
          ]}
        />
      </Component>
    )
  })
}

export default OnairProgress
