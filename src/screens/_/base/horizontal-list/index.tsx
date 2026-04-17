/*
 * @Author: czy0729
 * @Date: 2019-04-08 01:25:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-17 11:27:03
 */
import React, { useCallback, useMemo, useState } from 'react'
import { observer } from 'mobx-react'
import { Component } from '@components'
import { desc } from '@utils'
import { r } from '@utils/dev'
import { FROZEN_ARRAY, FROZEN_FN, FROZEN_OBJECT } from '@constants'
import { PreventTouchPlaceholder } from '../prevent-touch-placeholder'
import Item from './item'
import ScrollViewHorizontal from './scroll-view-horizontal'
import { COMPONENT } from './ds'

import type { Props as HorizontalListProps, WithId } from './types'
export type { HorizontalListProps }

/** 水平列表 */
export const HorizontalList = observer(
  <T extends WithId>({
    style,
    data = FROZEN_ARRAY,
    counts = FROZEN_OBJECT,
    width = 60,
    height = 60,
    findCn = false,
    typeCn = '',
    relationTypeCn = '',
    ellipsizeMode = 'tail',
    initialRenderNums = 0,
    scrolled: initialScrolled = false,
    onPress = FROZEN_FN,
    onSubPress
  }: HorizontalListProps<T>) => {
    r(COMPONENT)

    const [scrolled, setScrolled] = useState(initialScrolled)

    const memoData = useMemo(() => {
      // 没封面图的置后
      const sortedData = [...data].sort((a, b) => desc(a, b, item => (item.image ? 1 : 0)))
      if (!initialRenderNums || scrolled) return sortedData

      return sortedData.filter((_item, index) => index < initialRenderNums)
    }, [data, initialRenderNums, scrolled])

    const handleScroll = useCallback(() => {
      if (!scrolled) setScrolled(true)
    }, [scrolled])

    return (
      <Component id='base-horizontal-list'>
        <ScrollViewHorizontal
          style={style}
          onScroll={!initialRenderNums || scrolled ? undefined : handleScroll}
        >
          {memoData.map((item, index) => (
            <Item
              key={item.id || index}
              item={item}
              count={counts[item.id] || 0}
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
          ))}
        </ScrollViewHorizontal>

        <PreventTouchPlaceholder />
      </Component>
    )
  }
)

export default HorizontalList
