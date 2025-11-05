/*
 * @Author: czy0729
 * @Date: 2023-03-28 04:54:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 03:33:07
 */
import React, { useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { feedback, urlStringify } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { Component } from '../component'
import { COMPONENT, CONFIG, PERSPECTIVE } from './ds'
import { Props as FlipProps } from './types'

export { FlipProps }

let feedbacked = false

/** 翻转动画 */
export const Flip = ({ style, height, onAnimated, children, ...other }: FlipProps) => {
  r(COMPONENT)

  const animate = true
  const activeRef = useSharedValue(0)
  const beforeStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(activeRef.value ? 0 : 1, CONFIG),
      transform: [
        { perspective: PERSPECTIVE },
        { rotateX: withTiming(activeRef.value ? '90deg' : '0deg', CONFIG) },
        { translateY: withTiming(-activeRef.value * height, CONFIG) }
      ]
    }
  })
  const afterStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(activeRef.value ? 1 : 0, CONFIG),
      transform: [
        { perspective: PERSPECTIVE },
        { rotateX: withTiming(activeRef.value ? '0deg' : '90deg', CONFIG) },
        { translateY: withTiming(-activeRef.value * height, CONFIG) }
      ]
    }
  })

  const [beforeProps, setBeforeProps] = useState({
    ...other
  })
  const [afterProps, setAfterProps] = useState({
    ...other
  })

  useEffect(() => {
    if (!animate) {
      setBeforeProps({
        ...other
      })
    }
  }, [animate, other])

  const animatedRef = useRef(false)
  useEffect(() => {
    if (!animate || animatedRef.current || activeRef.value) return

    const state = {
      ...other
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
          }, CONFIG.duration)
        }

        activeRef.value = 1

        setTimeout(() => {
          if (typeof onAnimated === 'function') onAnimated()
        }, CONFIG.duration)
      }, 240)
    }
  }, [activeRef, beforeProps, animate, onAnimated, other])

  return useObserver(() => {
    const space = 8
    const styles = {
      container: {
        height: height * 2 + space,
        paddingVertical: space / 2,
        marginTop: -space / 2
      },
      animated: {
        marginTop: -height
      },
      placeholder: {
        height
      }
    }
    return (
      <Component id='component-flip' style={style}>
        <View style={styles.container}>
          <Animated.View style={[styles.animated, beforeStyle]}>
            <View style={styles.placeholder} />
            {React.cloneElement(children, beforeProps)}
          </Animated.View>
          <Animated.View style={[styles.animated, afterStyle]}>
            <View style={styles.placeholder} />
            {React.cloneElement(children, afterProps)}
          </Animated.View>
        </View>
        <View
          style={{
            marginTop: -height
          }}
        />
      </Component>
    )
  })
}

export default Flip
