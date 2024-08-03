/*
 * @Author: czy0729
 * @Date: 2020-12-10 20:03:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 03:59:15
 */
import React, { useRef } from 'react'
import { Animated, ScrollView as RNScrollView } from 'react-native'
import { r } from '@utils/dev'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import { ScrollToTop } from '../scroll-to-top'
import { COMPONENT } from './ds'
import { Props as ScrollViewProps, ScrollTo } from './types'

export { ScrollViewProps, ScrollTo }

/** 通用 ScrollView */
export const ScrollView = ({
  style,
  contentContainerStyle,
  horizontal,
  scrollToTop,
  forwardRef,
  connectRef,
  animated,

  // 此属性对于 iOS 需要有默认值, 否则会出现首次渲染滚动条位置不正确的问题
  scrollIndicatorInsets = {
    right: 1
  },
  scrollEventThrottle,
  onScroll,
  children,
  ...other
}: ScrollViewProps) => {
  r(COMPONENT)

  const scrollViewEl = useRef(null)

  let ref: React.LegacyRef<RNScrollView>
  if (scrollToTop) {
    ref = ref => (scrollViewEl.current = ref?.scrollTo)
  } else if (forwardRef || connectRef) {
    ref = ref => (forwardRef || connectRef)(ref?.scrollTo, ref)
  }

  const Component: any = animated ? Animated.ScrollView : RNScrollView
  return (
    <>
      <Component
        ref={ref}
        style={style}
        contentContainerStyle={contentContainerStyle}
        horizontal={horizontal}
        scrollIndicatorInsets={scrollIndicatorInsets}
        scrollEventThrottle={
          scrollEventThrottle === undefined && onScroll ? 16 : scrollEventThrottle
        }
        onScroll={onScroll}
        {...other}
        {...SCROLL_VIEW_RESET_PROPS}
      >
        {children}
      </Component>
      {scrollToTop && <ScrollToTop scrollTo={scrollViewEl.current} />}
    </>
  )
}

export default ScrollView
