/*
 * @Author: czy0729
 * @Date: 2023-12-27 17:08:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-01 20:24:36
 */
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { Animated, View, LayoutChangeEvent } from 'react-native'
import { stl } from '@utils'
import { TabBarItem } from '../tab-bar-item'
import { TabBarIndicator } from '../tab-bar-indicator'
import { getIndicatorWidth, getLocalLayout, setLocalLayout } from './utils'
import { styles } from './styles'
import { Layout, Props as TabBarProps } from './types'

export { TabBarProps }

export function TabBar({
  style,
  tabStyle,
  labelStyle,
  indicatorStyle,
  tabs,
  position,
  offset,
  isIdle,
  spacing = 0,
  tabBarLocalKey,
  renderLabel,
  onTabPress,
  onTabsLayout
}: TabBarProps) {
  const inputRange = useMemo(() => tabs.map((_, index) => index), [tabs])
  const [outputRange, setOutputRange] = useState(inputRange.map(() => 0))
  const indicatorWidth = getIndicatorWidth(indicatorStyle)
  const layouts = useRef<Layout[]>([]).current

  const handleTabLayout = useCallback(
    async (index: number, layout: Layout) => {
      layouts[index] = layout

      const length = layouts.filter(layout => layout.width > 0).length
      if (length !== tabs.length) {
        // 本地化上一次的 Layout 数据, 以便之后更快的渲染
        if (length === 1) {
          const data = await getLocalLayout(tabBarLocalKey)
          if (data?.range && data?.layouts) {
            try {
              setOutputRange(data.range)
              onTabsLayout?.(data.layouts)
            } catch (error) {}
          }
        }
        return
      }

      const range: number[] = []
      for (let index = 0; index < length; index++) {
        const { x, width } = layouts[index]

        // 我们希望指示器和所选 Tab 垂直居中对齐
        // 那么指示器的 x 轴偏移量就是 Tab 的 center.x - 指示器的 center.x
        const tabCenterX = x + width / 2
        const indicatorCenterX = indicatorWidth / 2
        range.push(tabCenterX - indicatorCenterX)
      }

      setOutputRange(range)
      onTabsLayout?.(layouts)
      setLocalLayout(tabBarLocalKey, {
        range,
        layouts
      })
    },
    [layouts, tabs.length, onTabsLayout, tabBarLocalKey, indicatorWidth]
  )

  const scrollX = useMemo(
    () =>
      Animated.add(offset, position).interpolate({
        inputRange,
        outputRange
      }),
    [offset, position, inputRange, outputRange]
  )

  const handleTabPress = useCallback(
    (index: number) => {
      if (isIdle) onTabPress?.(index)
    },
    [onTabPress, isIdle]
  )

  return (
    <View style={stl(styles.tabbar, style)}>
      {tabs.map((tab: string, index: number) => (
        <TabBarItem
          key={tab}
          style={stl(tabStyle, {
            marginLeft: index === 0 ? 0 : spacing
          })}
          labelStyle={labelStyle}
          title={tab}
          renderLabel={renderLabel}
          onPress={() => handleTabPress(index)}
          onLayout={(event: LayoutChangeEvent) => handleTabLayout(index, event.nativeEvent.layout)}
        />
      ))}
      <TabBarIndicator style={stl(styles.indicator, indicatorStyle)} scrollX={scrollX} />
    </View>
  )
}
