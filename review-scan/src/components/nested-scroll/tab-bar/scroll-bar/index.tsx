/*
 * @Author: czy0729
 * @Date: 2023-12-27 16:35:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-30 09:47:40
 */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { LayoutChangeEvent, ScrollView } from 'react-native'
import { stl } from '@utils'
import { styles } from './styles'
import { Layout, ScrollBarProps } from './types'

export function ScrollBar({ style, page, children, ...props }: ScrollBarProps) {
  const [tabLayouts, setTabLayouts] = useState<Layout[]>([])
  const onTabsLayout = useCallback((layouts: Layout[]) => {
    setTabLayouts(layouts)
  }, [])

  const [contentWidth, setContentWidth] = useState(0)
  const onContentSizeChange = useCallback((w: number) => {
    setContentWidth(w)
  }, [])

  const [scrollBarWidth, setScrollBarWidth] = useState(0)
  const onLayout = useCallback((e: LayoutChangeEvent) => {
    setScrollBarWidth(e.nativeEvent.layout.width)
  }, [])

  const scrollRef = useRef<ScrollView>(null)

  useEffect(() => {
    if (tabLayouts.length - 1 < page || contentWidth === 0 || scrollBarWidth === 0)
      return

    // 获得选中的 Tab 布局数据
    const tabLayout = tabLayouts[page]

    // 计算 Tab 中心到 ScrollBar 中心的 x 轴距离
    const dx = tabLayout.x + tabLayout.width / 2 - scrollBarWidth / 2

    // 计算出 ScrollView 的最大可滚动距离，ScrollView 的可滚动范围是 [0, maxScrollX]
    const maxScrollX = contentWidth - scrollBarWidth

    // 计算出 ScrollView 应该滚动到的 x 坐标，它必须大于等于 0 并且小于等于 maxScrollX
    const x = Math.min(Math.max(0, dx), maxScrollX)

    scrollRef.current?.scrollTo({ x })
  }, [page, tabLayouts, contentWidth, scrollBarWidth])

  return (
    <ScrollView
      ref={scrollRef}
      style={stl(styles.scrollbar, style)}
      horizontal
      showsHorizontalScrollIndicator={false}
      bounces={false}
      onContentSizeChange={onContentSizeChange}
      onLayout={onLayout}
      {...props}
    >
      {React.cloneElement(children as any, { onTabsLayout })}
    </ScrollView>
  )
}
