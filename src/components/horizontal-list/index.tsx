/*
 * @Author: czy0729
 * @Date: 2021-01-24 19:41:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-07 20:06:34
 */
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { observer } from 'mobx-react'
import { desc } from '@utils'
import { r } from '@utils/dev'
import { FROZEN_FN, FROZEN_OBJECT } from '@constants'
import { Component } from '../component'
import Item from './item'
import ScrollViewHorizontal from './scroll-view-horizontal'
import { COMPONENT } from './ds'

export { ScrollViewHorizontal }

import type { NativeSyntheticEvent, NativeScrollEvent } from 'react-native'
import type { Props as HorizontalListProps, WithId, ItemData, TypeCn } from './types'
export type { HorizontalListProps, WithId, ItemData, TypeCn }

/** 通用水平移动列表 */
export const HorizontalList = observer(
  <T extends WithId = ItemData>({
    style,
    contentContainerStyle,
    data,
    counts = FROZEN_OBJECT,
    width = 60,
    height = 60,
    findCn = false,
    typeCn = '',
    relationTypeCn = '',
    ellipsizeMode = 'tail',
    initialRenderNums = 0,
    scrolled: initialScrolled = false,
    showMask,
    maskWidth,
    sortData = true,
    renderItem,
    renderNums,
    onEndReachedOnce,
    onPress = FROZEN_FN as HorizontalListProps<T>['onPress'],
    onSubPress
  }: HorizontalListProps<T>) => {
    r(COMPONENT)

    const [scrolled, setScrolled] = useState(initialScrolled)
    const endReachedRef = useRef(false)

    const memoData = useMemo(() => {
      if (!data?.length) return []

      // 没封面图的置后
      const sortedData = sortData
        ? [...data].sort((a, b) => desc(a, b, item => (item.image ? 1 : 0)))
        : [...data]
      if (!initialRenderNums || scrolled) return sortedData

      return sortedData.filter((_item, index) => index < initialRenderNums)
    }, [data, initialRenderNums, scrolled, sortData])

    // 滚动回调
    const handleScroll = useCallback(
      (evt: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (!scrolled) setScrolled(true)

        // onEndReachedOnce 回调
        if (!endReachedRef.current && onEndReachedOnce) {
          const { x } = evt.nativeEvent.contentOffset
          const contentW = evt.nativeEvent.contentSize.width
          const scrollViewW = evt.nativeEvent.layoutMeasurement.width
          if (scrollViewW + x + 20 >= contentW) {
            onEndReachedOnce()
            endReachedRef.current = true
          }
        }
      },
      [scrolled, onEndReachedOnce]
    )

    return (
      <Component id='component-horizontal-list'>
        <ScrollViewHorizontal
          style={style}
          contentContainerStyle={contentContainerStyle}
          showMask={showMask}
          maskWidth={maskWidth}
          onScroll={handleScroll}
        >
          {memoData.map((item, index) => {
            const key = item.id ?? index
            return renderItem ? (
              <React.Fragment key={key}>{renderItem(item as T, index)}</React.Fragment>
            ) : (
              <Item
                key={key}
                item={item}
                count={counts[String(item.id)] || 0}
                width={width}
                height={height}
                findCn={findCn}
                ellipsizeMode={ellipsizeMode}
                isFirst={index === 0}
                typeCn={typeCn}
                relationTypeCn={relationTypeCn}
                onPress={onPress}
                onSubPress={onSubPress}
              />
            )
          })}
          {typeof renderNums === 'function' && renderNums()}
        </ScrollViewHorizontal>
      </Component>
    )
  }
)

export default HorizontalList
