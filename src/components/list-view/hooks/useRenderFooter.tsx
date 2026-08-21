/*
 * @Author: czy0729
 * @Date: 2026-08-21 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-21 12:30:00
 */
import { useCallback } from 'react'
import Footer from '../footer'

import type { ReactNode } from '@types'
import type { UseRenderFooterOptions } from './types'

/**
 * 渲染列表底部（加载状态、空数据等）
 */
export function useRenderFooter<ItemT>(options: UseRenderFooterOptions<ItemT>) {
  const {
    data,
    refreshState,
    footerEmptyDataComponent,
    footerEmptyDataText,
    footerFailureText,
    footerNoMoreDataComponent,
    footerRefreshingText,
    footerTextType,
    showMesume
  } = options

  return useCallback((): ReactNode => {
    const { pagination, _filter } = data

    return (
      <Footer
        filterText={_filter}
        footerEmptyDataComponent={footerEmptyDataComponent}
        footerEmptyDataText={footerEmptyDataText}
        footerFailureText={footerFailureText}
        footerNoMoreDataComponent={footerNoMoreDataComponent}
        footerRefreshingText={footerRefreshingText}
        footerTextType={footerTextType}
        page={pagination?.page}
        pageTotal={pagination?.pageTotal}
        refreshState={refreshState}
        showMesume={showMesume}
      />
    )
  }, [
    data,
    refreshState,
    footerEmptyDataComponent,
    footerEmptyDataText,
    footerFailureText,
    footerNoMoreDataComponent,
    footerRefreshingText,
    footerTextType,
    showMesume
  ])
}
