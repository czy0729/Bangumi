/*
 * @Author: czy0729
 * @Date: 2022-11-21 07:17:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-21 10:17:37
 */
import React from 'react'
import { View } from 'react-native'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { useObserver } from '@utils/hooks'
import { memoStyles } from './styles'
import { Props as OnairProgressProps } from './types'

export { OnairProgressProps }

export const OnairProgress = ({
  epStatus = 0,
  current = 0,
  total = 0,
  defaultTotal = 12,
  height = 7
}: OnairProgressProps) => {
  const totalPercent = Math.min(
    (Math.floor(epStatus || 0) / Math.floor(total || defaultTotal)) * 100,
    100
  )
  const currentPercent = Math.min(
    (Math.floor(current || 0) / Math.floor(total || defaultTotal)) * 100,
    100
  )
  const animatedStyle = useAnimatedStyle(() => ({
    width: withTiming(`${totalPercent ? Math.max(totalPercent, 10) : 0}%`, {
      duration: 120
    })
  }))

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <View
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
              width: `${currentPercent ? Math.max(currentPercent, 10) : 0}%`,
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
      </View>
    )
  })
}
