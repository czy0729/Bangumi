/*
 * @Author: czy0729
 * @Date: 2020-12-10 20:03:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-03 15:35:58
 */
import React, { useRef } from 'react'
import { ScrollView as RNScrollView, ScrollViewProps } from 'react-native'
import { Expand, ReactNode } from '@types'
import { ScrollToTop } from '../scroll-to-top'

type Props = Expand<
  ScrollViewProps & {
    /** 是否启用点击顶部滚动到顶（安卓 only） */
    scrollToTop?: boolean

    children?: ReactNode
  }
>

export const ScrollView = ({
  scrollToTop,

  // 此属性对于 iOS 需要有默认值, 否则会出现首次渲染滚动条位置不正确的问题
  scrollIndicatorInsets = {
    right: 1
  },
  children,
  ...other
}: Props) => {
  const scrollViewEl = useRef(null)
  return (
    <RNScrollView
      ref={scrollToTop ? ref => (scrollViewEl.current = ref?.scrollTo) : undefined}
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
