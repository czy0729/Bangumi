/*
 * @Author: czy0729
 * @Date: 2023-04-15 03:47:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-22 15:51:59
 */
import React from 'react'
import { ScrollView as RNScrollView } from 'react-native'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import { StorybookScroll } from '../storybook'
import { COMPONENT } from './ds'
import { Props as ScrollViewProps } from './types'

export { ScrollViewProps }

/** 通用 ScrollView */
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
  r(COMPONENT)

  // Storybook 中通常最外层就有一层 ScrollView, 所以里面不应再套一层
  if (!horizontal) {
    return (
      <StorybookScroll style={stl(style, contentContainerStyle)} onScroll={onScroll}>
        {children}
      </StorybookScroll>
    )
  }

  return (
    <RNScrollView
      style={style}
      contentContainerStyle={contentContainerStyle}
      horizontal={horizontal}
      scrollIndicatorInsets={scrollIndicatorInsets}
      scrollEventThrottle={scrollEventThrottle === undefined && onScroll ? 16 : scrollEventThrottle}
      onScroll={onScroll}
      {...other}
      {...SCROLL_VIEW_RESET_PROPS}
    >
      {children}
    </RNScrollView>
  )
}

export default ScrollView
