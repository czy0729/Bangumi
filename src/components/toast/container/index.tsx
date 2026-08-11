/*
 * @Author: czy0729
 * @Date: 2020-09-28 18:30:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-11 10:00:00
 */
import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, TouchableOpacity, View } from 'react-native'
import { observer } from 'mobx-react'
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming
} from 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets'
import { syncThemeStore } from '@utils/async'
import { r } from '@utils/dev'
import BlurView from '../blur-view'
import Desc from '../desc'
import { COMPONENT } from '../ds'
import { memoStyles, styles } from './styles'

import type { ToastProps } from './type'

/**
 * Toast 单条提示容器, 淡入淡出 + loading 时显示关闭
 */
function Container({
  duration = 3,
  mask = true,
  onClose,
  onAnimationEnd,
  type = '',
  content
}: ToastProps) {
  r(COMPONENT)

  const _ = syncThemeStore()
  const stylesMemo = memoStyles()

  const [showClose, setShowClose] = useState(false)
  const opacity = useSharedValue(0)

  // 稳定函数引用, 供动画 worklet 通过 scheduleOnRN 回调 (内联箭头会在 worklet 序列化时导致 iOS 原生闪退)
  const handleAnimationEnd = useCallback(() => {
    if (onClose) onClose()
    if (onAnimationEnd) onAnimationEnd()
  }, [onClose, onAnimationEnd])

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 200 }, finished => {
      if (!finished || duration <= 0) return
      opacity.value = withDelay(
        duration * 1000,
        withTiming(0, { duration: 200 }, end => {
          if (!end) return
          scheduleOnRN(handleAnimationEnd)
        })
      )
    })

    let timer: ReturnType<typeof setTimeout>
    if (type === 'loading') {
      timer = setTimeout(() => {
        setShowClose(true)
      }, 5600)
    }
    return () => {
      clearTimeout(timer)
      cancelAnimation(opacity)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }))

  let iconDom: React.ReactElement | null = null
  if (type === 'loading') {
    iconDom = (
      <ActivityIndicator
        style={stylesMemo.centering}
        animating
        color={_.isDark ? 'white' : 'gray'}
      />
    )
  }

  return (
    <View
      style={styles.container}
      pointerEvents={mask && !showClose ? undefined : 'box-none'}
    >
      <TouchableOpacity style={stylesMemo.innerContainer} activeOpacity={1} onPress={onAnimationEnd}>
        <Animated.View style={animatedStyle}>
          <BlurView
            style={[stylesMemo.innerWrap, iconDom ? stylesMemo.iconToast : stylesMemo.textToast]}
          >
            <View style={styles.body}>
              {iconDom}
              <Desc style={stylesMemo.content} showClose={showClose}>
                {content}
              </Desc>
            </View>
          </BlurView>
        </Animated.View>
      </TouchableOpacity>
    </View>
  )
}

export default observer(Container)