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
import { COMPONENT, SCROLL_IDLE_MS, SCROLL_THRESHOLD } from './ds'

import type { NativeSyntheticEvent, NativeScrollEvent } from 'react-native'
import type { TimerRef } from '@types'
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

    /** ScrollView 实例引用，用于 ScrollToTop 组件调用 scrollTo */
    const scrollViewEl = useRef(null)

    /** 滚动起始 Y 坐标，用于计算滑动距离是否超过阈值 */
    const scrollStartY = useRef(0)

    /** 是否已锁定点击，超过阈值后为 true */
    const scrollLocked = useRef(false)

    /** 滚动手势结束防抖定时器（100ms） */
    const scrollEndTimer = useRef<TimerRef | null>(null)

    /** 滚动空闲超时定时器（300ms），兜底释放 isScrolling */
    const scrollIdleTimer = useRef<TimerRef | null>(null)

    useEffect(() => {
      return () => {
        if (scrollEndTimer.current) clearTimeout(scrollEndTimer.current)
        if (scrollIdleTimer.current) clearTimeout(scrollIdleTimer.current)
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

    /** ScrollView ref 回调，按场景分配引用方式 */
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

    /** 实际渲染的滚动组件（普通或带动画） */
    const Component = animated ? Animated.ScrollView : RNScrollView

    const handleOnScroll = (evt: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (showMaskValue && horizontal) handleScroll(evt)

      // 滚动空闲超时：每次 onScroll 重置定时器，停止触发后自动释放 isScrolling
      if (scrollIdleTimer.current) clearTimeout(scrollIdleTimer.current)
      scrollIdleTimer.current = setTimeout(() => {
        scrollLocked.current = false
        uiStore.setScrolling(false)
      }, SCROLL_IDLE_MS)

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

    /** 内容尺寸变化回调，横向遮罩需要同步更新 */
    const handleOnContentSizeChange = (w: number, h: number) => {
      if (showMaskValue && horizontal) handleContentSizeChange(w)
      onContentSizeChange?.(w, h)
    }

    /** 解构出需要包装的滚动回调，其余直接透传 */
    const {
      onScrollBeginDrag: userOnScrollBeginDrag,
      onScrollEndDrag: userOnScrollEndDrag,
      onMomentumScrollEnd: userOnMomentumScrollEnd,
      ...restOther
    } = other

    /** 手指按下开始拖动 → 重置所有定时器和锁定状态 */
    const handleScrollBeginDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (scrollEndTimer.current) clearTimeout(scrollEndTimer.current)
      if (scrollIdleTimer.current) clearTimeout(scrollIdleTimer.current)
      scrollStartY.current = e.nativeEvent.contentOffset.y
      scrollLocked.current = false
      userOnScrollBeginDrag?.(e)
    }

    /** 手指抬起 → 100ms 防抖后释放滚动锁 */
    const handleScrollEndDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (scrollEndTimer.current) clearTimeout(scrollEndTimer.current)
      if (scrollIdleTimer.current) clearTimeout(scrollIdleTimer.current)
      scrollEndTimer.current = setTimeout(() => {
        scrollLocked.current = false
        uiStore.setScrolling(false)
      }, 100)
      userOnScrollEndDrag?.(e)
    }

    /** 惯性滚动结束 → 100ms 防抖后释放滚动锁 */
    const handleMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (scrollEndTimer.current) clearTimeout(scrollEndTimer.current)
      if (scrollIdleTimer.current) clearTimeout(scrollIdleTimer.current)
      scrollEndTimer.current = setTimeout(() => {
        scrollLocked.current = false
        uiStore.setScrolling(false)
      }, 100)
      userOnMomentumScrollEnd?.(e)
    }

    /** 实际渲染的 ScrollView / Animated.ScrollView */
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

    /** 横向模式用 Mask 包裹实现渐隐遮罩，纵向直接透传 */
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
