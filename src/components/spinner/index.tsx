/*
 * @Author: czy0729
 * @Date: 2022-08-16 10:57:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 04:01:06
 */
import React, { useCallback, useEffect } from 'react'
import { Image, View } from 'react-native'
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming
} from 'react-native-reanimated'
import { useObserver } from 'mobx-react'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { Flex } from '../flex'
import { COMPONENT, HALF_CIRCLE } from './ds'
import { memoStyles } from './styles'
import { Props as SpinnerProps } from './types'

export { SpinnerProps }

/** Loading 指示器 (新) */
export const Spinner = ({ style, backgroundColor = 'transparent' }: SpinnerProps) => {
  r(COMPONENT)

  const rotation = useSharedValue(0)
  const startAnimation = useCallback(() => {
    rotation.value = 0
    rotation.value = withRepeat(
      withTiming(
        1, // toValue: 1
        {
          duration: 640,
          easing: Easing.linear
        }
      ),
      -1, // inifinite
      false // do not reverse
    )
  }, [rotation])

  useEffect(() => {
    startAnimation()
    return () => {
      cancelAnimation(rotation)
    }
  }, [rotation, startAnimation])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${rotation.value * 360}deg`
      }
    ]
  }))

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <Flex style={style} justify='center'>
        {backgroundColor == 'transparent' ? (
          <Animated.View
            style={[
              styles.circle,
              animatedStyle,
              {
                backgroundColor
              }
            ]}
          >
            <Image style={styles.image} source={HALF_CIRCLE} resizeMode='contain' />
          </Animated.View>
        ) : (
          <Animated.View style={[styles.circle, animatedStyle]}>
            <View
              style={[
                styles.circlePlaceholder,
                {
                  backgroundColor: backgroundColor || _.colorPlain
                }
              ]}
            />
            <View
              style={[
                styles.squrePlaceholder,
                {
                  backgroundColor: backgroundColor || _.colorPlain
                }
              ]}
            />
          </Animated.View>
        )}
      </Flex>
    )
  })
}

export default Spinner
