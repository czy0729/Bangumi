/*
 * @Author: czy0729
 * @Date: 2026-08-21 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-21 12:30:00
 */
import { useCallback } from 'react'
import { WEB } from '@constants'
import { DEFAULT_PROPS, SCROLL_THRESHOLD } from '../ds'
import List from '../list'

import type { ListEmpty, ReactNode } from '@types'
import type { RenderListProps } from '../types'
import type { UseRenderListOptions } from './types'

/**
 * 渲染列表主体（FlatList / SectionList 分流）
 * - 合并滚动回调，确保滑动保护始终生效
 * - WEB 端额外透传分页与底部渲染
 */
export function useRenderList<ItemT>(options: UseRenderListOptions<ItemT>) {
  const {
    restProps,
    sectionKey,
    rawSections,
    data,
    list,
    sections,
    mergeScrollCallback,
    onScrollBeginDrag,
    onScroll,
    onScrollEndDrag,
    onMomentumScrollEnd,
    commonProps,
    estimatedItemHeight,
    itemHeightKey,
    renderFooter,
    onFooterRefresh
  } = options

  return useCallback(() => {
    const renderProps: RenderListProps<ItemT> = {
      ...restProps,
      sectionKey,
      sections: rawSections
    }
    const passProps = {
      ...renderProps,
      estimatedItemHeight,
      itemHeightKey
    } as Omit<RenderListProps<ItemT>, 'data'> & {
      pagination?: ListEmpty<ItemT>['pagination']
      renderFooter?: ReactNode
      onFooterRefresh?: () => void
      estimatedItemHeight?: number
      itemHeightKey?: string | number
    }

    // 合并滚动回调，确保滑动保护始终生效
    passProps.scrollEventThrottle = SCROLL_THRESHOLD
    passProps.scrollIndicatorInsets =
      passProps.scrollIndicatorInsets ?? DEFAULT_PROPS.scrollIndicatorInsets
    mergeScrollCallback(passProps, 'onScrollBeginDrag', onScrollBeginDrag)
    mergeScrollCallback(passProps, 'onScroll', onScroll)
    mergeScrollCallback(passProps, 'onScrollEndDrag', onScrollEndDrag)
    mergeScrollCallback(passProps, 'onMomentumScrollEnd', onMomentumScrollEnd)

    if (WEB) {
      passProps.pagination = data.pagination
      passProps.renderFooter = renderFooter()
      passProps.onFooterRefresh = onFooterRefresh
    }

    if (sectionKey || rawSections) {
      return <List {...commonProps} {...passProps} sections={sections} />
    }
    return <List {...commonProps} {...passProps} data={list as ItemT[]} />
  }, [
    restProps,
    sectionKey,
    rawSections,
    data,
    list,
    sections,
    mergeScrollCallback,
    onScrollBeginDrag,
    onScroll,
    onScrollEndDrag,
    onMomentumScrollEnd,
    commonProps,
    estimatedItemHeight,
    itemHeightKey,
    renderFooter,
    onFooterRefresh
  ])
}
