/*
 * @Author: czy0729
 * @Date: 2021-12-25 03:23:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-16 23:46:33
 */
import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { useObserver } from 'mobx-react'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { useBackHandler } from '@utils/hooks'
import { IOS } from '@constants'
import { Component } from '../component'
import { Flex } from '../flex'
import { Iconfont } from '../iconfont'
import { Mask } from '../mask'
import { Portal } from '../portal'
import { Text } from '../text'
import Btn from './btn'
import Scroll from './scroll'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Props as ActionSheetProps } from './types'

export type { ActionSheetProps }

/** 动作面板 */
export function ActionSheet({
  forwardRef,
  show = false,
  height = 440,
  title = '',
  titleLeft,
  scrollEnabled = true,
  usePortal = true,
  onTitlePress,
  onClose,
  onScroll,
  children
}: ActionSheetProps) {
  r(COMPONENT)

  const progress = useSharedValue(show ? 1 : 0)
  const [showValue, setShow] = useState(show)
  const closingRef = useRef(false)

  const animateTo = useCallback((toValue: number, callback?: () => void) => {
    progress.value = withTiming(
      toValue,
      {
        duration: 240
      },
      finished => {
        if (finished && callback) runOnJS(callback)()
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleShow = useCallback(() => {
    setShow(true)
    requestAnimationFrame(() => animateTo(1))
  }, [animateTo])

  const handleClose = useCallback(() => {
    if (!showValue || closingRef.current) return

    closingRef.current = true
    animateTo(0, () => {
      setTimeout(() => {
        runOnJS(() => setShow(false))()
        closingRef.current = false
        onClose?.()
      }, 280)
    })
  }, [animateTo, onClose, showValue])

  useEffect(() => {
    if (show) handleShow()
  }, [show, handleShow])

  useBackHandler(() => {
    if (IOS) return false

    handleClose()
    return true
  })

  return useObserver(() => {
    const calcHeight = Math.min(
      height || Math.floor(_.window.height * 0.5),
      Math.floor(_.window.height * _.web(0.92, 0.88))
    )

    const contentStyle = useAnimatedStyle(() => ({
      transform: [
        {
          translateY: interpolate(progress.value, [0, 1], [calcHeight, 0])
        }
      ]
    }))

    const maskStyle = useAnimatedStyle(() => ({
      opacity: progress.value
    }))

    if (!showValue) return null

    const styles = memoStyles()
    let elTitle =
      typeof title === 'string'
        ? !!title && (
            <Text size={12} bold type='sub' align='center' onPress={onTitlePress}>
              {title}
            </Text>
          )
        : title

    if (titleLeft) {
      elTitle = (
        <Flex justify='center'>
          {titleLeft}
          {elTitle}
        </Flex>
      )
    }

    const elContent = (
      <View
        style={{
          minHeight: height - _.bottom
        }}
      >
        {!!elTitle && (
          <Flex style={_.mb.sm} justify='center'>
            {elTitle}
            {!!onTitlePress && <Iconfont name='md-navigate-next' size={18} />}
          </Flex>
        )}
        {children}
      </View>
    )

    const elBody = (
      <Suspense>
        <Component id='component-action-sheet' style={styles.actionSheet}>
          <Mask style={maskStyle} onPress={handleClose} />

          <Animated.View style={[styles.content, { height: calcHeight }, contentStyle]}>
            <Scroll
              forwardRef={forwardRef}
              height={calcHeight}
              scrollEnabled={scrollEnabled}
              onScroll={onScroll}
              onClose={handleClose}
            >
              {elContent}
            </Scroll>

            <Btn onClose={handleClose} />
          </Animated.View>
        </Component>
      </Suspense>
    )

    return usePortal ? <Portal>{elBody}</Portal> : elBody
  })
}

export default ActionSheet
