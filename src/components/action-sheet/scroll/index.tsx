/*
 * @Author: czy0729
 * @Date: 2024-11-04 17:47:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-18 03:46:57
 */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { feedback } from '@utils'
import { BTN_HEIGHT, DRAG_THRESHOLD } from '../ds'
import { ScrollView } from '../../scroll-view'
import { Text } from '../../text'
import { memoStyles } from './styles'

import type { ScrollEvent } from '@types'
import type { Props } from '../types'

function Scroll({
  forwardRef,
  height,
  scrollEnabled = true,
  onScroll,
  onClose,
  children
}: Pick<Props, 'forwardRef' | 'height' | 'scrollEnabled' | 'onScroll' | 'onClose' | 'children'>) {
  const { bottom } = useSafeAreaInsets()

  const scrollY = useRef(0)
  const dragStartY = useRef(0)
  const [dragHint, setDragHint] = useState('')

  const handleScrollBeginDrag = useCallback((e: ScrollEvent) => {
    dragStartY.current = e.nativeEvent.contentOffset.y
  }, [])
  const handleScroll = useCallback(
    (e: ScrollEvent) => {
      scrollY.current = e.nativeEvent.contentOffset.y
      const dragDistance = e.nativeEvent.contentOffset.y - dragStartY.current

      // 仅当用户从顶部开始下拉时显示提示
      // scrollY.current <= 0 表示内容已经滚到顶部
      // dragDistance < 0 表示用户向下拖动
      if (dragStartY.current <= 0 && dragDistance < 0) {
        if (-dragDistance > DRAG_THRESHOLD) {
          if (!dragHint) {
            setDragHint('松手收起')
            feedback(true)
          }
        } else {
          if (dragHint) setDragHint('')
        }
      } else {
        if (dragHint) setDragHint('')
      }

      onScroll?.(e)
    },
    [dragHint, onScroll]
  )
  const handleScrollEndDrag = useCallback(
    (e: ScrollEvent) => {
      const dragDistance = e.nativeEvent.contentOffset.y - dragStartY.current
      if (scrollY.current <= 0 && dragDistance < -DRAG_THRESHOLD) {
        onClose?.()
      }
    },
    [onClose]
  )

  const hintOpacity = useSharedValue(0)
  const animatedHintStyle = useAnimatedStyle(() => ({
    opacity: hintOpacity.value
  }))
  useEffect(() => {
    hintOpacity.value = withTiming(dragHint ? 1 : 0, { duration: 160 })
  }, [dragHint, hintOpacity])

  const styles = memoStyles()

  if (scrollEnabled) {
    return (
      <>
        <Animated.View style={[styles.dragHint, animatedHintStyle]}>
          <Text type='icon' size={12} align='center'>
            {dragHint}
          </Text>
        </Animated.View>
        <ScrollView
          forwardRef={forwardRef}
          style={[
            styles.scroll,
            {
              height
            }
          ]}
          contentContainerStyle={_.container.bottom}
          onScrollBeginDrag={handleScrollBeginDrag}
          onScroll={handleScroll}
          onScrollEndDrag={handleScrollEndDrag}
        >
          {children}
        </ScrollView>
      </>
    )
  }

  return (
    <View
      style={[
        styles.view,
        {
          height: height - (bottom || 0) - BTN_HEIGHT
        }
      ]}
    >
      {children}
    </View>
  )
}

export default observer(Scroll)
