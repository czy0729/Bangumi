/*
 * @Author: czy0729
 * @Date: 2023-03-02 20:50:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-30 10:42:10
 */
import React, { useEffect, useMemo, useRef, useState } from 'react'
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
import { IOS } from '@constants'

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
  const animatedRef = useRef(false)

  // 初始化 props
  const defaultProps = useMemo(
    () => ({
      style,
      styleText,
      type,
      text
    }),
    [style, styleText, text, type]
  )
  const [beforeProps, setBeforeProps] = useState(defaultProps)
  const [afterProps, setAfterProps] = useState(defaultProps)

  /** 同步 beforeProps */
  useEffect(() => {
    if (!animate) setBeforeProps(defaultProps)
  }, [animate, style, styleText, type, text, defaultProps])

  /** 动画触发 */
  useEffect(() => {
    if (!animate || animatedRef.current || activeRef.value) return

    if (urlStringify(defaultProps) !== urlStringify(beforeProps)) {
      animatedRef.current = true
      setAfterProps(defaultProps)

      setTimeout(() => {
        // 控制 feedback 只触发一次
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
        opacity: withTiming(isBefore ? 1 - activeRef.value : activeRef.value, config),
        transform: [
          { perspective },
          { rotateX: withTiming(rotate, config) },
          { translateY: withTiming(-activeRef.value * height, config) }
        ]
      } as const
    })

  const beforeStyleAnimated = createAnimatedStyle(true)
  const afterStyleAnimated = createAnimatedStyle(false)

  return useObserver(() => {
    const space = 8
    const containerStyle = {
      height: height * 2 + space,
      paddingTop: space
    }
    const animatedViewStyle = { marginTop: -height }
    const placeholderStyle = { height }

    const { text: beforeText, ...beforeRest } = beforeProps
    const { text: afterText, ...afterRest } = afterProps

    return (
      <>
        <View style={containerStyle}>
          <Animated.View style={[animatedViewStyle, beforeStyleAnimated]}>
            <View style={placeholderStyle} />
            <Button size='sm' {...beforeRest} animate={false}>
              {beforeText}
            </Button>
          </Animated.View>

          <Animated.View style={[animatedViewStyle, afterStyleAnimated]}>
            <View style={placeholderStyle} />
            <Button size='sm' {...afterRest} animate={false}>
              {afterText}
            </Button>
          </Animated.View>
        </View>

        <View style={{ marginTop: -height }} />
      </>
    )
  })
}

export default FlipBtn
