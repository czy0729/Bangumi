/*
 * @Author: czy0729
 * @Date: 2023-11-08 00:47:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-10 12:00:00
 */
import React, { forwardRef, memo, useCallback } from 'react'
import { ScrollView } from '../../scroll-view'

import type { ScrollView as RNScrollView } from 'react-native'
import type { ScrollTo } from '../../scroll-view'
import type { Props } from './types'

/**
 * 横向滚动容器
 *  转发 ref 到内部原生 ScrollView:
 *  - FlatList 的 renderScrollComponent 会 cloneElement 注入自己的 scrollRef (scrollToIndex / 嵌套测量需要)
 *  - React 18 (Android) 不会把 ref 当普通 prop 透传, 必须 forwardRef 才能收到
 */
function ScrollViewHorizontal(
  { children, contentContainerStyle, forwardRef: userForwardRef, ...other }: Props,
  ref: React.Ref<RNScrollView>
) {
  /** 项目的 ScrollView 用自定义连接回调 (非 React ref) 暴露实例 */
  const connectRef = useCallback(
    (scrollTo: ScrollTo, scrollViewRef?: RNScrollView) => {
      userForwardRef?.(scrollTo, scrollViewRef)
      if (!ref) return

      if (typeof ref === 'function') ref(scrollViewRef ?? null)
      else ref.current = scrollViewRef ?? null
    },
    [ref, userForwardRef]
  )

  return (
    <ScrollView
      contentContainerStyle={contentContainerStyle}
      scrollEventThrottle={16}
      animated
      horizontal
      {...other}
      forwardRef={connectRef}
    >
      {children}
    </ScrollView>
  )
}

export default memo(forwardRef(ScrollViewHorizontal))
