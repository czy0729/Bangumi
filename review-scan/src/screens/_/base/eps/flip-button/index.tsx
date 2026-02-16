/*
 * @Author: czy0729
 * @Date: 2023-03-02 20:50:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-30 10:42:10
 */
import React, { useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { Button } from '@components'
import { _ } from '@stores'
import { feedback, urlStringify } from '@utils'
import { useObserver } from '@utils/hooks'

const perspective = 2400
const config = {
  duration: 480,
  easing: Easing.inOut(Easing.ease)
}
let feedbacked = false

function FlipBtn({ style, styleText, type, text, onAnimated }) {
  const animate = true
  const { height = _.device(32, 44) } = style
  const activeRef = useSharedValue(0)
  const beforeStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(activeRef.value ? 0 : 1, config),
      transform: [
        { perspective },
        { rotateX: withTiming(activeRef.value ? '90deg' : '0deg', config) },
        { translateY: withTiming(-activeRef.value * height, config) }
      ]
    } as const
  })
  const afterStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(activeRef.value ? 1 : 0, config),
      transform: [
        { perspective },
        { rotateX: withTiming(activeRef.value ? '0deg' : '90deg', config) },
        { translateY: withTiming(-activeRef.value * height, config) }
      ]
    } as const
  })

  const [beforeProps, setBeforeProps] = useState({
    style,
    styleText,
    type,
    text
  })
  const [afterProps, setAfterProps] = useState({
    style,
    styleText,
    type,
    text
  })

  useEffect(() => {
    if (!animate) {
      setBeforeProps({
        style,
        styleText,
        type,
        text
      })
    }
  }, [animate, style, styleText, type, text])

  const animatedRef = useRef(false)
  useEffect(() => {
    if (!animate || animatedRef.current || activeRef.value) return

    const state = {
      style,
      styleText,
      type,
      text
    }
    if (urlStringify(state) !== urlStringify(beforeProps)) {
      animatedRef.current = true
      setAfterProps(state)
      setTimeout(() => {
        // 因为很可能有多个按钮同时做动画, feedback 需要控制同一时间最多只触发一次
        if (!feedbacked) {
          feedback()
          feedbacked = true

          setTimeout(() => {
            feedbacked = false
          }, config.duration)
        }

        activeRef.value = 1

        setTimeout(() => {
          onAnimated()
        }, config.duration)
      }, 240)
    }
  }, [activeRef, beforeProps, animate, style, styleText, type, text, onAnimated])

  return useObserver(() => {
    const space = 8
    const styles = {
      container: {
        height: height * 2 + space,
        paddingTop: space,
        backfaceVisibility: 'hidden'
      },
      animated: {
        marginTop: -height
      },
      placeholder: {
        height
      }
    } as const
    const { text: beforeText, ...beforeRest } = beforeProps
    const { text: afterText, ...afterRest } = afterProps
    return (
      <>
        <View style={styles.container}>
          <Animated.View style={[styles.animated, beforeStyle]}>
            <View style={styles.placeholder} />
            <Button size='sm' {...beforeRest} animate={false}>
              {beforeText}
            </Button>
          </Animated.View>
          <Animated.View style={[styles.animated, afterStyle]}>
            <View style={styles.placeholder} />
            <Button size='sm' {...afterRest} animate={false}>
              {afterText}
            </Button>
          </Animated.View>
        </View>
        <View
          style={{
            marginTop: -height
          }}
        />
      </>
    )
  })
}

export default FlipBtn
