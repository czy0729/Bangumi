/*
 * @Author: czy0729
 * @Date: 2020-12-10 20:03:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-12 10:52:41
 */
import React, { useRef } from 'react'
import { ScrollView as RNScrollView } from 'react-native'
import { scrollViewResetProps } from '@constants'
import { ScrollToTop } from '../scroll-to-top'
import { Props as ScrollViewProps } from './types'

export { ScrollViewProps }

export const ScrollView = ({
  scrollToTop,
  connectRef,

  // 此属性对于 iOS 需要有默认值, 否则会出现首次渲染滚动条位置不正确的问题
  scrollIndicatorInsets = {
    right: 1
  },
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
  return (
    <RNScrollView
      ref={ref}
      scrollIndicatorInsets={scrollIndicatorInsets}
      {...other}
      {...scrollViewResetProps}
    >
      {children}
      {scrollToTop && <ScrollToTop scrollTo={scrollViewEl.current} />}
    </RNScrollView>
  )
}
