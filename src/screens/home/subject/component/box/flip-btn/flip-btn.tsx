/*
 * @Author: czy0729
 * @Date: 2023-03-01 01:56:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-20 04:42:21
 */
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { _ } from '@stores'
import { feedback, postTask, urlStringify } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { IOS } from '@constants'
import Btns from './btns'
import { ANIMATED_CONFIG, COMPONENT_MAIN, PERSPECTIVE } from './ds'
import { memoStyles } from './styles'

import type { FlipBtnProps } from './types'

function FlipBtn({ animate, btnText, rating, privacy, last, onAnimated, onPress }: FlipBtnProps) {
  r(COMPONENT_MAIN)

  const height = _.device(44, 50)
  const activeRef = useSharedValue(0)
  const animatedRef = useRef(false)

  const defaultProps = useMemo(
    () => ({
      btnText,
      rating,
      privacy,
      last
    }),
    [btnText, last, privacy, rating]
  )
  const [beforeProps, setBeforeProps] = useState(defaultProps)
  const [afterProps, setAfterProps] = useState(defaultProps)

  /** 更新 beforeProps */
  useEffect(() => {
    if (!animate) setBeforeProps(defaultProps)
  }, [animate, btnText, rating, privacy, last, defaultProps])

  /** 动画触发 */
  useEffect(() => {
    if (!animate || animatedRef.current || activeRef.value) return

    if (urlStringify(defaultProps) !== urlStringify(beforeProps)) {
      animatedRef.current = true
      setAfterProps(defaultProps)

      postTask(
        () => {
          feedback()
          activeRef.value = 1

          postTask(
            () => {
              onAnimated()
            },
            ANIMATED_CONFIG.duration,
            'user-visible'
          )
        },
        240,
        'user-visible'
      )
    }
  }, [animate, beforeProps, defaultProps, activeRef, onAnimated])

  const createAnimatedStyle = (isBefore: boolean) =>
    useAnimatedStyle(() => {
      const rotate = IOS
        ? '0deg'
        : isBefore
        ? activeRef.value
          ? '90deg'
          : '0deg'
        : activeRef.value
        ? '0deg'
        : '90deg'

      return {
        opacity: withTiming(isBefore ? 1 - activeRef.value : activeRef.value, ANIMATED_CONFIG),
        transform: [
          { perspective: PERSPECTIVE },
          { rotateX: withTiming(rotate, ANIMATED_CONFIG) },
          { translateY: withTiming(-activeRef.value * height, ANIMATED_CONFIG) }
        ]
      } as const
    })

  const beforeStyle = createAnimatedStyle(true)
  const afterStyle = createAnimatedStyle(false)

  return useObserver(() => {
    const styles = memoStyles()

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.animated, beforeStyle]} pointerEvents='box-none'>
          <View style={styles.placeholder} pointerEvents='none' />
          <Btns {...beforeProps} onPress={onPress} />
        </Animated.View>

        <Animated.View style={[styles.animated, afterStyle]} pointerEvents='none'>
          <View style={styles.placeholder} />
          <Btns {...afterProps} onPress={onPress} />
        </Animated.View>
      </View>
    )
  })
}

export default FlipBtn
