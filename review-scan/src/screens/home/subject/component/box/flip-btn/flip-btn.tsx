/*
 * @Author: czy0729
 * @Date: 2023-03-01 01:56:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-22 17:04:46
 */
import React, { useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { _ } from '@stores'
import { feedback, postTask, urlStringify } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import Btns from './btns'
import { ANIMATED_CONFIG, COMPONENT_MAIN, PERSPECTIVE } from './ds'
import { memoStyles } from './styles'

function FlipBtn({ animate, btnText, rating, privacy, last, onAnimated, onPress }) {
  r(COMPONENT_MAIN)

  const height = _.device(44, 50)
  const activeRef = useSharedValue(0)
  const beforeStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(activeRef.value ? 0 : 1, ANIMATED_CONFIG),
      transform: [
        { perspective: PERSPECTIVE },
        { rotateX: withTiming(activeRef.value ? '90deg' : '0deg', ANIMATED_CONFIG) },
        { translateY: withTiming(-activeRef.value * height, ANIMATED_CONFIG) }
      ]
    }
  })
  const afterStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(activeRef.value ? 1 : 0, ANIMATED_CONFIG),
      transform: [
        { perspective: PERSPECTIVE },
        { rotateX: withTiming(activeRef.value ? '0deg' : '90deg', ANIMATED_CONFIG) },
        { translateY: withTiming(-activeRef.value * height, ANIMATED_CONFIG) }
      ]
    }
  })

  const [beforeProps, setBeforeProps] = useState({
    btnText,
    rating,
    privacy,
    last
  })
  const [afterProps, setAfterProps] = useState({
    btnText,
    rating,
    privacy,
    last
  })

  useEffect(() => {
    if (!animate) {
      setBeforeProps({
        btnText,
        rating,
        privacy,
        last
      })
    }
  }, [animate, btnText, last, privacy, rating])

  const animatedRef = useRef(false)
  useEffect(() => {
    if (!animate || animatedRef.current || activeRef.value) return

    const state = {
      btnText,
      rating,
      privacy,
      last
    }
    if (urlStringify(state) !== urlStringify(beforeProps)) {
      animatedRef.current = true
      setAfterProps(state)
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
  }, [activeRef, beforeProps, animate, btnText, rating, privacy, last, onAnimated])

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
