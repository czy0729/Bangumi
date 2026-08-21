/*
 * @Author: czy0729
 * @Date: 2026-08-21 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-21 12:30:00
 */
import { useMemo } from 'react'
import { _ } from '@stores'
import {
  DEFAULT_MAX_TO_RENDER_PER_BATCH,
  DEFAULT_UPDATE_CELLS_BATCHING_PERIOD,
  DEFAULT_WINDOW_SIZE,
  REFRESH_STATE
} from '../ds'

import type { CommonProps, UseListCommonPropsOptions } from './types'

/**
 * 获取通用属性（样式、刷新控制、优化参数等）
 */
export function useListCommonProps<ItemT>(options: UseListCommonPropsOptions<ItemT>) {
  const {
    style,
    connectRef,
    showFooter,
    ListFooterComponent,
    renderFooter,
    refreshState,
    renderRefreshControl,
    rawOnHeaderRefresh,
    onHeaderRefresh,
    rawOnFooterRefresh,
    onEndReached,
    maxToRenderPerBatch,
    optimize,
    updateCellsBatchingPeriod,
    initialNumToRender
  } = options

  return useMemo(
    (): CommonProps => ({
      style,
      connectRef,
      ListHeaderComponentStyle: _.container.block,
      ListFooterComponentStyle: _.container.block,
      ListFooterComponent: showFooter
        ? ListFooterComponent || renderFooter()
        : ListFooterComponent ?? null,
      refreshing: refreshState === REFRESH_STATE.HeaderRefreshing,
      refreshControl: renderRefreshControl(),
      onRefresh: rawOnHeaderRefresh ? onHeaderRefresh : undefined,
      onEndReached: rawOnFooterRefresh ? onEndReached : undefined,
      onEndReachedThreshold: 0.3,
      maxToRenderPerBatch:
        maxToRenderPerBatch ?? (optimize ? DEFAULT_MAX_TO_RENDER_PER_BATCH : undefined),
      updateCellsBatchingPeriod:
        updateCellsBatchingPeriod ?? (optimize ? DEFAULT_UPDATE_CELLS_BATCHING_PERIOD : undefined),
      initialNumToRender: initialNumToRender || 10,
      windowSize: optimize ? DEFAULT_WINDOW_SIZE : undefined,
      showsHorizontalScrollIndicator: false,
      showsVerticalScrollIndicator: false
    }),
    [
      style,
      connectRef,
      showFooter,
      ListFooterComponent,
      renderFooter,
      refreshState,
      renderRefreshControl,
      rawOnHeaderRefresh,
      onHeaderRefresh,
      rawOnFooterRefresh,
      onEndReached,
      maxToRenderPerBatch,
      optimize,
      updateCellsBatchingPeriod,
      initialNumToRender
    ]
  )
}
