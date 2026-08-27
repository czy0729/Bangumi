/*
 * @Author: czy0729
 * @Date: 2020-12-10 20:03:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-27 20:39:17
 */
import React, { useCallback } from 'react'
import { Animated, ScrollView as RNScrollView } from 'react-native'
import { observer } from 'mobx-react'
import { r } from '@utils/dev'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import { ScrollToTop } from '../scroll-to-top'
import { useHorizontalMask, useScrollLock, useScrollViewRef } from './hooks'
import Mask from './mask'
import { COMPONENT } from './ds'

import type { Props as ScrollViewProps, ScrollEvent, ScrollTo } from './types'
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
    maskColors,
    leftMaskStyle: userLeftMaskStyle,
    rightMaskStyle: userRightMaskStyle,

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

    const {
      showMaskValue,
      leftMaskStyle,
      rightMaskStyle,
      maskColors: resolvedMaskColors,
      handleLayout,
      handleOnScroll: handleMaskOnScroll,
      handleOnContentSizeChange
    } = useHorizontalMask({ horizontal, showMask, maskColors, onContentSizeChange })

    /** 外部附加样式与内部 opacity 动画样式合并 (动画始终生效) */
    const leftMaskStyles = userLeftMaskStyle ? [leftMaskStyle, userLeftMaskStyle] : leftMaskStyle
    const rightMaskStyles = userRightMaskStyle
      ? [rightMaskStyle, userRightMaskStyle]
      : rightMaskStyle

    const { ref, scrollTo } = useScrollViewRef({ scrollToTop, forwardRef, connectRef })

    /** 解构出需要包装的滚动回调, 其余直接透传 */
    const {
      onScrollBeginDrag: userOnScrollBeginDrag,
      onScrollEndDrag: userOnScrollEndDrag,
      onMomentumScrollEnd: userOnMomentumScrollEnd,
      ...restOther
    } = other

    const { handleScroll, handleScrollBeginDrag, handleScrollEndDrag, handleMomentumScrollEnd } =
      useScrollLock({
        onScroll,
        onScrollBeginDrag: userOnScrollBeginDrag,
        onScrollEndDrag: userOnScrollEndDrag,
        onMomentumScrollEnd: userOnMomentumScrollEnd
      })

    /** 滚动回调: 先同步遮罩, 再走滚动锁 */
    const handleOnScroll = useCallback(
      (evt: ScrollEvent) => {
        handleMaskOnScroll(evt)
        handleScroll(evt)
      },
      [handleMaskOnScroll, handleScroll]
    )

    /** 实际渲染的滚动组件（普通或带动画） */
    const Component = animated ? Animated.ScrollView : RNScrollView

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

    /** 横向模式用 Mask 包裹实现渐隐遮罩, 纵向直接透传 */
    const elContent = horizontal ? (
      <Mask
        showMask={showMaskValue}
        maskWidth={maskWidth}
        leftMaskStyle={leftMaskStyles}
        rightMaskStyle={rightMaskStyles}
        maskColors={resolvedMaskColors}
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
        {scrollToTop && <ScrollToTop scrollTo={scrollTo} />}
      </>
    )
  }
)

export default ScrollView
