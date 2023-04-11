/*
 * 通用 ScrollView
 * @Author: czy0729
 * @Date: 2020-12-10 20:03:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-11 19:35:10
 */
import React, { useRef } from 'react'
import { ScrollView as RNScrollView, View } from 'react-native'
import { stl } from '@utils'
import { SCROLL_VIEW_RESET_PROPS, STORYBOOK } from '@constants'
import { ScrollToTop } from '../scroll-to-top'
import { styles } from './styles'
import { Props as ScrollViewProps } from './types'

export { ScrollViewProps }

export const ScrollView = ({
  style,
  contentContainerStyle,
  horizontal,
  scrollToTop,
  connectRef,

  // 此属性对于 iOS 需要有默认值, 否则会出现首次渲染滚动条位置不正确的问题
  scrollIndicatorInsets = {
    right: 1
  },
  scrollEventThrottle,
  onScroll,
  children,
  ...other
}: ScrollViewProps) => {
  const scrollViewEl = useRef(null)

  let ref: React.LegacyRef<RNScrollView>
  if (scrollToTop) {
    ref = ref => (scrollViewEl.current = ref?.scrollTo)
  } else if (connectRef) {
    ref = ref => connectRef(ref?.scrollTo)
  }

  // Storybook 中通常最外层就有一层 ScrollView, 所以里面不应再套一层
  if (STORYBOOK && !horizontal) {
    return (
      <View style={stl(style, contentContainerStyle, styles.storybook)}>
        {children}
      </View>
    )
  }

  return (
    <>
      <RNScrollView
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
      </RNScrollView>
      {scrollToTop && <ScrollToTop scrollTo={scrollViewEl.current} />}
    </>
  )
}
