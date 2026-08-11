/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-11 18:31:19
 */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Dimensions, TouchableWithoutFeedback, View } from 'react-native'
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets'
import { Portal } from '@components/portal'
import { IOS } from '@constants/constants'
import { PAD } from '@constants/device'
import { r } from '@utils/dev'
import { getFocusMargin, getOpacity, getPosition, getScale } from './utils'
import { COMPONENT, DEFAULT_ANIMATION_DURATION } from './ds'
import { styles } from './styles'

import type { Props as ModalViewProps } from './types'
export type { ModalViewProps }

/**
 * 模态框动画核心, 支持 slide-up / slide-down / fade 三种进出场动画
 */
export const ModalView = ({
  animateAppear = false,
  animationType = 'slide-up',
  animationDuration = DEFAULT_ANIMATION_DURATION,
  focus = false,
  maskClosable = true,
  maskStyle,
  onAnimationEnd = () => {},
  onClose = () => {},
  style,
  visible = false,
  wrapStyle,
  children
}: ModalViewProps) => {
    r(COMPONENT)

    const screenHeight = Dimensions.get('window').height
    const focusRatio = PAD ? 0.24 : IOS ? 0.44 : 0.38

    const [rendered, setRendered] = useState(visible)
    const opacity = useSharedValue(getOpacity(visible))
    const translateY = useSharedValue(getPosition(animationType, visible, screenHeight))
    const scale = useSharedValue(getScale(visible))
    const focusMargin = useSharedValue(focus ? getFocusMargin(screenHeight, focusRatio) : 0)

    const visibleRef = useRef(visible)
    const hideNotifiedRef = useRef(false)
    const firstRenderRef = useRef(true)

    const finishHide = useCallback(() => {
      if (hideNotifiedRef.current) return
      hideNotifiedRef.current = true
      setRendered(false)
      onAnimationEnd(false)
    }, [onAnimationEnd])

    // 稳定函数引用, 供动画 worklet 通过 scheduleOnRN 回调 (内联箭头会在 worklet 序列化时导致 iOS 原生闪退)
    const handleAnimationEnd = useCallback(() => {
      onAnimationEnd(true)
    }, [onAnimationEnd])

    const animateDialog = useCallback(
      (nextVisible: boolean) => {
        if (animationType === 'none') {
          if (nextVisible) {
            setRendered(true)
            onAnimationEnd(true)
          } else {
            finishHide()
          }
          return
        }

        visibleRef.current = nextVisible
        hideNotifiedRef.current = false
        if (nextVisible) setRendered(true)

        const slideConfig = {
          duration: animationDuration,
          easing: nextVisible ? Easing.elastic(0.8) : undefined
        }
        const maskConfig = { duration: animationDuration }

        if (animationType === 'slide-up' || animationType === 'slide-down') {
          cancelAnimation(opacity)
          opacity.value = withTiming(getOpacity(nextVisible), maskConfig)
          cancelAnimation(translateY)
          translateY.value = withTiming(
            getPosition(animationType, nextVisible, screenHeight),
            slideConfig,
            finished => {
              if (finished && !nextVisible) scheduleOnRN(finishHide)
              if (finished && nextVisible) scheduleOnRN(handleAnimationEnd)
            }
          )
        } else {
          cancelAnimation(opacity)
          opacity.value = withTiming(getOpacity(nextVisible), maskConfig, finished => {
            if (finished && !nextVisible) scheduleOnRN(finishHide)
            if (finished && nextVisible) scheduleOnRN(handleAnimationEnd)
          })
          cancelAnimation(scale)
          scale.value = withSpring(getScale(nextVisible))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },
      [
        animationDuration,
        animationType,
        finishHide,
        handleAnimationEnd,
        opacity,
        scale,
        screenHeight,
        translateY
      ]
    )

    useEffect(() => {
      if (firstRenderRef.current) {
        firstRenderRef.current = false
        if (animateAppear && visible && animationType !== 'none') {
          opacity.value = 0
          scale.value = getScale(false)
          translateY.value = getPosition(animationType, false, screenHeight)
          setRendered(true)
          animateDialog(true)
        }
        return
      }
      animateDialog(visible)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible])

    useEffect(() => {
      focusMargin.value = withTiming(focus ? getFocusMargin(screenHeight, focusRatio) : 0, {
        duration: 280
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [focus])

    const maskAnimatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }))
    const contentAnimatedStyle = useAnimatedStyle(() => {
      if (animationType === 'fade') {
        return {
          transform: [{ scale: scale.value }],
          opacity: opacity.value
        } as const
      }
      return { transform: [{ translateY: translateY.value }] } as const
    })
    const focusAnimatedStyle = useAnimatedStyle(() => ({ marginTop: focusMargin.value }))

    if (!rendered) {
      return null
    }

    return (
      <Portal>
        <View style={[styles.wrap, wrapStyle]}>
          <TouchableWithoutFeedback onPress={maskClosable ? onClose : undefined}>
            <Animated.View style={[styles.absolute, maskAnimatedStyle]}>
              <View style={[styles.absolute, styles.mask, maskStyle]} />
            </Animated.View>
          </TouchableWithoutFeedback>
          <Animated.View style={[contentAnimatedStyle, focusAnimatedStyle, style]}>
            {children}
          </Animated.View>
        </View>
      </Portal>
    )
  }

export default ModalView
