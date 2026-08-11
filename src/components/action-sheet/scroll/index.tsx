/*
 * @Author: czy0729
 * @Date: 2024-11-04 17:47:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-26 19:00:21
 */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { feedback, stl } from '@utils'
import { IOS } from '@constants'
import { BTN_HEIGHT, DRAG_THRESHOLD } from '../ds'
import { shouldCloseOnDragEnd, shouldShowDragHint } from '../utils'
import { ScrollView } from '../../scroll-view'
import { Text } from '../../text'
import { memoStyles } from './styles'

import type { ScrollEvent } from '@types'
import type { Props } from '../types'

function Scroll({
  forwardRef,
  contentContainerStyle,
  height,
  scrollEnabled = true,
  onScroll,
  onClose,
  children
}: Pick<
  Props,
  | 'forwardRef'
  | 'contentContainerStyle'
  | 'height'
  | 'scrollEnabled'
  | 'onScroll'
  | 'onClose'
  | 'children'
>) {
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
      const showHint = shouldShowDragHint(dragStartY.current, dragDistance, DRAG_THRESHOLD)

      if (showHint) {
        if (!dragHint) {
          setDragHint('松手收起')
          feedback(true)
        }
      } else if (dragHint) {
        setDragHint('')
      }

      onScroll?.(e)
    },
    [dragHint, onScroll]
  )
  const handleScrollEndDrag = useCallback(
    (e: ScrollEvent) => {
      const dragDistance = e.nativeEvent.contentOffset.y - dragStartY.current
      if (shouldCloseOnDragEnd(scrollY.current, dragDistance, DRAG_THRESHOLD)) {
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
          contentContainerStyle={stl(_.container.bottom, contentContainerStyle)}
          onScrollBeginDrag={IOS ? handleScrollBeginDrag : undefined}
          onScroll={IOS ? handleScroll : onScroll}
          onScrollEndDrag={IOS ? handleScrollEndDrag : undefined}
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
        },
        contentContainerStyle
      ]}
    >
      {children}
    </View>
  )
}

export default observer(Scroll)
