/*
 * @Author: czy0729
 * @Date: 2026-08-10 05:26:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-10 06:37:44
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { scheduleOnRN } from '@utils'
import { resolveEasing } from './utils'

import type { LayoutChangeEvent } from 'react-native'
import type { CollapsibleAnimationProps } from './types'

/** 折叠动画状态 */
export const useCollapsibleAnimation = (props: CollapsibleAnimationProps) => {
  const {
    collapsed,
    collapsedHeight = 0,
    duration = 300,
    easing = 'easeOutCubic',
    onAnimationEnd
  } = props

  const [renderChildren, setRenderChildren] = useState(!collapsed)

  const unmountedRef = useRef(false)
  const prevCollapsedRef = useRef(collapsed)
  const expandingRef = useRef(false)
  const progress = useSharedValue(collapsed ? 0 : 1)
  const contentHeight = useSharedValue(0)

  const easingFn = useMemo(() => resolveEasing(easing), [easing])

  const handleAnimationEnd = useCallback(() => {
    if (unmountedRef.current) return
    onAnimationEnd?.()
  }, [onAnimationEnd])

  useEffect(() => {
    if (prevCollapsedRef.current === collapsed) return
    prevCollapsedRef.current = collapsed

    if (collapsed) {
      expandingRef.current = false
      progress.value = withTiming(0, { duration, easing: easingFn }, finished => {
        if (finished) scheduleOnRN(handleAnimationEnd)
      })
      return
    }

    setRenderChildren(true)
    if (contentHeight.value > 0) {
      progress.value = withTiming(1, { duration, easing: easingFn }, finished => {
        if (finished) scheduleOnRN(handleAnimationEnd)
      })
      return
    }

    expandingRef.current = true
  }, [collapsed, duration, easingFn, handleAnimationEnd, progress, contentHeight])

  useEffect(() => {
    return () => {
      unmountedRef.current = true
    }
  }, [])

  const handleLayout = useCallback(
    (evt: LayoutChangeEvent) => {
      // 动画中/收起时 iOS 会按父容器过渡高度重布局内容，onLayout 高度不可信；
      // 仅在首次展开测量或完全展开静止时接受，否则 contentHeight 被污染导致再次展开到错误高度
      if (!expandingRef.current && progress.value < 1) return

      const height = evt.nativeEvent.layout.height
      if (height <= 0 || height === contentHeight.value) return

      contentHeight.value = height
      if (expandingRef.current) {
        expandingRef.current = false
        // 首次测量时容器已是自然高度，直接同步避免先跳回 0 再展开
        progress.value = 1
        handleAnimationEnd()
      }
    },
    [progress, contentHeight, handleAnimationEnd]
  )

  const animatedStyle = useAnimatedStyle(() => {
    // 高度未知（未测量/内容为空）时不约束高度（等价于 react-native-collapsible 补丁的 'unset'），
    // iOS 上内容在 height:0 容器内无法正常布局测量，内容按自然高度显示后才能可靠测高
    if (contentHeight.value <= 0) return { overflow: 'hidden' }

    return {
      height: interpolate(
        progress.value,
        [0, 1],
        [collapsedHeight, contentHeight.value],
        Extrapolation.CLAMP
      ),
      overflow: 'hidden'
    }
  })

  // 动画中/收起时钉住内层内容高度，避免 iOS 随外层过渡高度逐帧重布局内层内容（展开/收起瞬间卡顿）；
  // 完全展开静止时释放钉住让内容保持自然高度，动态内容可通过 onLayout 重新测量
  const contentStyle = useAnimatedStyle(() => {
    if (contentHeight.value > 0 && progress.value < 1) return { height: contentHeight.value }
    return {}
  })

  return { renderChildren, animatedStyle, contentStyle, handleLayout }
}
