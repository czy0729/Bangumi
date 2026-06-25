/*
 * @Author: czy0729
 * @Date: 2020-12-10 20:03:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-07 20:07:34
 */
import React, { useEffect, useRef } from 'react'
import { Animated, ScrollView as RNScrollView } from 'react-native'
import { observer } from 'mobx-react'
import { systemStore, uiStore } from '@stores'
import { r } from '@utils/dev'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import { ScrollToTop } from '../scroll-to-top'
import { Mask, useMask } from './mask'
import { COMPONENT, SCROLL_THRESHOLD } from './ds'

import type { NativeSyntheticEvent, NativeScrollEvent } from 'react-native'
import type { Props as ScrollViewProps, ScrollTo } from './types'
export type { ScrollViewProps, ScrollTo }

/** 通用 ScrollView */
export const ScrollView = observer(
  ({
    style,
    contentContainerStyle,
    horizontal,
    scrollToTop,
    forwardRef,
    connectRef,
    animated,
    showMask,
    maskWidth,
    maskColors: colors,

    // 此属性对于 iOS 需要有默认值, 否则会出现首次渲染滚动条位置不正确的问题
    scrollIndicatorInsets = {
      right: 1
    },
    scrollEventThrottle,
    onScroll,
    onContentSizeChange,
    children,
    ...other
  }: ScrollViewProps) => {
    r(COMPONENT)

    const scrollViewEl = useRef(null)
    const scrollStartY = useRef(0)
    const scrollLocked = useRef(false)
    const scrollEndTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
      return () => {
        if (scrollEndTimer.current) clearTimeout(scrollEndTimer.current)
      }
    }, [])

    const showMaskValue = horizontal
      ? showMask === undefined
        ? systemStore.setting.horizontalShowMask
        : showMask
      : false

    const {
      leftMaskStyle,
      rightMaskStyle,
      maskColors,
      handleLayout,
      handleContentSizeChange,
      handleScroll
    } = useMask(colors)

    let ref: React.Ref<RNScrollView>
    if (scrollToTop) {
      ref = ref => {
        scrollViewEl.current = ref?.scrollTo
      }
    } else if (forwardRef || connectRef) {
      ref = ref => {
        ;(forwardRef || connectRef)?.(ref?.scrollTo as ScrollTo, ref)
      }
    }

    const Component = animated ? Animated.ScrollView : RNScrollView

    const handleOnScroll = (evt: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (showMaskValue && horizontal) handleScroll(evt)

      // 滑动距离超过阈值才锁定
      if (!scrollLocked.current) {
        const currentY = evt.nativeEvent.contentOffset.y
        if (Math.abs(currentY - scrollStartY.current) > SCROLL_THRESHOLD) {
          scrollLocked.current = true
          uiStore.setScrolling(true)
        }
      }

      onScroll?.(evt)
    }

    const handleOnContentSizeChange = (w: number, h: number) => {
      if (showMaskValue && horizontal) handleContentSizeChange(w)
      onContentSizeChange?.(w, h)
    }

    const {
      onScrollBeginDrag: userOnScrollBeginDrag,
      onScrollEndDrag: userOnScrollEndDrag,
      onMomentumScrollEnd: userOnMomentumScrollEnd,
      ...restOther
    } = other

    const handleScrollBeginDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      scrollStartY.current = e.nativeEvent.contentOffset.y
      scrollLocked.current = false
      userOnScrollBeginDrag?.(e)
    }

    const handleScrollEndDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (scrollEndTimer.current) clearTimeout(scrollEndTimer.current)
      scrollEndTimer.current = setTimeout(() => {
        scrollLocked.current = false
        uiStore.setScrolling(false)
      }, 100)
      userOnScrollEndDrag?.(e)
    }

    const handleMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      scrollLocked.current = false
      uiStore.setScrolling(false)
      userOnMomentumScrollEnd?.(e)
    }

    const elScrollView = (
      <Component
        ref={ref}
        style={style}
        contentContainerStyle={contentContainerStyle}
        horizontal={horizontal}
        scrollIndicatorInsets={scrollIndicatorInsets}
        scrollEventThrottle={scrollEventThrottle === undefined ? 16 : scrollEventThrottle}
        onScroll={handleOnScroll}
        onContentSizeChange={handleOnContentSizeChange}
        onScrollBeginDrag={handleScrollBeginDrag}
        onScrollEndDrag={handleScrollEndDrag}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        {...restOther}
        {...SCROLL_VIEW_RESET_PROPS}
      >
        {children}
      </Component>
    )

    const elContent = horizontal ? (
      <Mask
        showMask={showMaskValue}
        maskWidth={maskWidth}
        leftMaskStyle={leftMaskStyle}
        rightMaskStyle={rightMaskStyle}
        maskColors={maskColors}
        onLayout={handleLayout}
      >
        {elScrollView}
      </Mask>
    ) : (
      elScrollView
    )

    return (
      <>
        {elContent}
        {scrollToTop && <ScrollToTop scrollTo={scrollViewEl.current} />}
      </>
    )
  }
)

export default ScrollView
