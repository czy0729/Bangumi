/*
 * @Author: czy0729
 * @Date: 2020-12-10 20:03:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-07-04 06:15:29
 */
import React, { useRef } from 'react'
import { ScrollView as RNScrollView } from 'react-native'
import { ScrollToTop } from './scroll-to-top'

export const ScrollView = ({
  scrollToTop,

  // 此属性对于 iOS 需要有默认值, 否则会出现首次渲染滚动条位置不正确的问题
  scrollIndicatorInsets = {
    right: 1
  },
  children,
  ...other
}) => {
  const scrollViewEl = useRef(null)
  return (
    <RNScrollView
      ref={scrollToTop ? ref => (scrollViewEl.current = ref?.scrollTo) : undefined}
      scrollIndicatorInsets={scrollIndicatorInsets}
      {...other}
    >
      {children}
      {scrollToTop && <ScrollToTop scrollTo={scrollViewEl.current} />}
    </RNScrollView>
  )
}
