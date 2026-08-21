/*
 * @Author: czy0729
 * @Date: 2026-08-22 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-22 00:00:00
 */
import { useCallback, useMemo } from 'react'
import { _ } from '@stores'
import { useInsets } from '@utils/hooks'
import { IOS, PAD } from '@constants'
import { H_TABBAR } from '../../ds'
import Empty from '../empty'
import Filter from '../filter'
import { renderItem } from './utils'
import { IOS_PAD_MULTI_TAB, IOS_PAD_SINGLE_TAB } from './ds'

import type { RenderItem } from '@types'
import type { ItemType, UseListElementsOptions } from './types'

/**
 * 列表内容样式
 * - 顶部留白 = header 高度 + （单 Tab 边距 / H_TABBAR）+ iPad 微调
 */
export function useListStyle(isSingleTab: boolean) {
  const { headerHeight } = useInsets()
  const basePadding = headerHeight + (isSingleTab ? _.sm : H_TABBAR)
  const iosPadAdjustment = IOS && PAD ? (isSingleTab ? IOS_PAD_SINGLE_TAB : IOS_PAD_MULTI_TAB) : 0

  return useMemo(
    () => ({
      paddingTop: basePadding + iosPadAdjustment,
      paddingBottom: _.bottom
    }),
    [basePadding, iosPadAdjustment]
  )
}

/**
 * 列表各区域渲染元素
 */
export function useListElements({ title, showItem, homeFilter, length }: UseListElementsOptions) {
  const elListHeaderComponent = useMemo(
    () => (homeFilter ? <Filter title={title} length={length} /> : null),
    [homeFilter, length, title]
  )

  const elEmpty = useMemo(() => <Empty title={title} length={length} />, [length, title])

  /**
   * iOS 因为头顶毛玻璃的问题, 不能懒加载 Tab, 所以在 Item 渲染的时候控制是否渲染;
   * 安卓是懒加载, 所以可以一直显示
   */
  const handleRenderItem = useCallback(
    ({ item, index }: RenderItem<ItemType>) => {
      if (!showItem) return null

      return renderItem({
        item,
        index,
        title
      })
    },
    [title, showItem]
  )

  return {
    /** 列表头文字过滤组件 */
    elListHeaderComponent,

    /** 底部空数据 / 无更多组件 */
    elEmpty,

    /** 条目渲染回调 */
    handleRenderItem
  }
}
