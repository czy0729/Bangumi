/*
 * @Author: czy0729
 * @Date: 2023-03-01 01:56:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-29 13:16:21
 */
import React, { useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing
} from 'react-native-reanimated'
import { _ } from '@stores'
import { feedback, urlStringify } from '@utils'
import { useObserver } from '@utils/hooks'
import Btns from './btns'
import { memoStyles } from './styles'

const perspective = 2400
const config = {
  duration: 480,
  easing: Easing.inOut(Easing.ease)
}

function FlipBtn({ animate, btnText, rating, privacy, last, onAnimated, onPress }) {
  // global.rerender('Subject.Box.FlipBtn.Main')

  const height = _.device(44, 50)
  const activeRef = useSharedValue(0)
  const beforeStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(activeRef.value ? 0 : 1, config),
      transform: [
        { perspective },
        { rotateX: withTiming(activeRef.value ? '90deg' : '0deg', config) },
        { translateY: withTiming(-activeRef.value * height, config) }
      ]
    }
  })
  const afterStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(activeRef.value ? 1 : 0, config),
      transform: [
        { perspective },
        { rotateX: withTiming(activeRef.value ? '0deg' : '90deg', config) },
        { translateY: withTiming(-activeRef.value * height, config) }
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
      setTimeout(() => {
        feedback()
        activeRef.value = 1

        setTimeout(() => {
          onAnimated()
        }, config.duration)
      }, 240)
    }
  }, [activeRef, beforeProps, animate, btnText, rating, privacy, last, onAnimated])

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.animated, beforeStyle]}>
          <View style={styles.placeholder} />
          <Btns {...beforeProps} onPress={onPress} />
        </Animated.View>
        <Animated.View style={[styles.animated, afterStyle]}>
          <View style={styles.placeholder} />
          <Btns {...afterProps} onPress={onPress} />
        </Animated.View>
      </View>
    )
  })
}

export default FlipBtn
