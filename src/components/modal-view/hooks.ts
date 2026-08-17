/*
 * @Author: czy0729
 * @Date: 2026-08-12 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-17 06:56:54
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { Dimensions } from 'react-native'
import {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { scheduleOnRN } from '@utils'
import { IOS } from '@constants/constants'
import { PAD } from '@constants/device'
import { getFocusMargin, getOpacity, getPosition, getScale } from './utils'

import type { Props } from './types'

export type ModalAnimationOptions = Pick<
  Props,
  'animationType' | 'animateAppear' | 'focus' | 'onAnimationEnd' | 'visible'
>

/** 内容淡入时长 (ms): 500ms 现代规范, 让材质到达有存在感 */
const DURATION_CONTENT = 500
/** 遮罩淡入时长 (ms): 稍快于表面, 让表面成为主角 */
const DURATION_MASK = 250

/**
 * 模态框进出场动画 hook
 *
 * 按 ui-spec 动效规范:
 * - 进入/退出同路径, opacity + scale 用 withTiming 同步材质化 (同曲线同时长, 无分层感),
 *   fade 缩放出现从 1.05 回落正常, 出场从正常放大到 1.05
 * - 遮罩纯 opacity 淡入, 时长略短于表面
 * - 只动画 transform / opacity
 */
export const useModalAnimation = ({
  animationType = 'slide-up',
  animateAppear = false,
  focus = false,
  onAnimationEnd = () => {},
  visible = false
}: ModalAnimationOptions) => {
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

      const maskConfig = { duration: DURATION_MASK }
      const contentConfig = {
        duration: nextVisible ? DURATION_CONTENT : DURATION_MASK,
        easing: nextVisible ? Easing.out(Easing.cubic) : Easing.in(Easing.quad)
      }

      if (animationType === 'slide-up' || animationType === 'slide-down') {
        cancelAnimation(opacity)
        opacity.value = withTiming(getOpacity(nextVisible), maskConfig)
        cancelAnimation(translateY)
        translateY.value = withTiming(
          getPosition(animationType, nextVisible, screenHeight),
          maskConfig,
          finished => {
            if (finished && !nextVisible) scheduleOnRN(finishHide)
            if (finished && nextVisible) scheduleOnRN(handleAnimationEnd)
          }
        )
      } else {
        // fade: opacity + scale 同步材质化
        cancelAnimation(opacity)
        cancelAnimation(scale)
        opacity.value = withTiming(getOpacity(nextVisible), contentConfig, finished => {
          if (finished && !nextVisible) scheduleOnRN(finishHide)
          if (finished && nextVisible) scheduleOnRN(handleAnimationEnd)
        })
        scale.value = withTiming(getScale(nextVisible), contentConfig)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [
      animationType,
      finishHide,
      handleAnimationEnd,
      onAnimationEnd,
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

  return { rendered, maskAnimatedStyle, contentAnimatedStyle, focusAnimatedStyle }
}
