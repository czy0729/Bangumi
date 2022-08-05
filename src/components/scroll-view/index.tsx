/*
 * @Author: czy0729
 * @Date: 2020-12-10 20:03:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-05 10:56:17
 */
import React, { useRef } from 'react'
import { ScrollView as RNScrollView, ScrollViewProps } from 'react-native'
import { Expand, Fn, ReactNode } from '@types'
import { ScrollToTop } from '../scroll-to-top'

type Props = Expand<
  ScrollViewProps & {
    /** 是否启用点击顶部滚动到顶（安卓 only） */
    scrollToTop?: boolean

    /** 连接 ref.scrollTo */
    connectRef?: (scrollTo: Fn) => any

    children?: ReactNode
  }
>

export const ScrollView = ({
  scrollToTop,
  connectRef,

  // 此属性对于 iOS 需要有默认值, 否则会出现首次渲染滚动条位置不正确的问题
  scrollIndicatorInsets = {
    right: 1
  },
  children,
  ...other
}: Props) => {
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
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      overScrollMode='never'
    >
      {children}
      {scrollToTop && <ScrollToTop scrollTo={scrollViewEl.current} />}
    </RNScrollView>
  )
}
