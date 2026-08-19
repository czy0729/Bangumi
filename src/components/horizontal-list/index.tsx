/*
 * @Author: czy0729
 * @Date: 2021-01-24 19:41:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-19 08:09:48
 */
import React, { useMemo } from 'react'
import { observer } from 'mobx-react'
import { r } from '@utils/dev'
import { FROZEN_FN, FROZEN_OBJECT } from '@constants'
import { Component } from '../component'
import { useHorizontalList } from './hooks'
import Item from './item'
import ScrollViewHorizontal from './scroll-view-horizontal'
import { COMPONENT } from './ds'

export { ScrollViewHorizontal }

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
    sortData,
    initialRenderNums,
    scrolled,
    showMask,
    maskWidth,
    renderItem,
    renderNums,
    onEndReachedOnce,
    onPress = FROZEN_FN as HorizontalListProps<T>['onPress'],
    onSubPress
  }: HorizontalListProps<T>) => {
    r(COMPONENT)

    const { memoData, handleScroll } = useHorizontalList({
      data,
      sortData,
      initialRenderNums,
      scrolled,
      onEndReachedOnce
    })

    const children = useMemo(
      () =>
        memoData.map((item, index) => {
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
        }),
      [
        memoData,
        counts,
        width,
        height,
        findCn,
        ellipsizeMode,
        typeCn,
        relationTypeCn,
        renderItem,
        onPress,
        onSubPress
      ]
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
          {children}
          {typeof renderNums === 'function' && renderNums()}
        </ScrollViewHorizontal>
      </Component>
    )
  }
)

export default HorizontalList
