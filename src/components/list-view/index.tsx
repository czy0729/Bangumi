/*
 * @Author: czy0729
 * @Date: 2019-04-11 00:46:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-22 07:05:05
 */
import React, { forwardRef, useCallback, useRef } from 'react'
import { observer } from 'mobx-react'
import { r } from '@utils/dev'
import { LIST_EMPTY } from '@constants'
import { ErrorBoundary } from '../error-boundary'
import { useListCommonProps } from './hooks/useListCommonProps'
import { useListData } from './hooks/useListData'
import { useRefreshState } from './hooks/useRefreshState'
import { useRenderFooter } from './hooks/useRenderFooter'
import { useRenderList } from './hooks/useRenderList'
import { useRenderRefreshControl } from './hooks/useRenderRefreshControl'
import { useScrollMethods } from './hooks/useScrollMethods'
import { useScrollProtection } from './hooks/useScrollProtection'
import { COMPONENT, DEFAULT_PROPS } from './ds'

export { FooterEmptyData, FooterFailure, FooterNoMoreData, FooterRefreshing } from './footer'

import type { Props as ListViewProps, ListViewScrollMethods } from './types'
import type { ListArray, ListEmpty } from '@types'
export type {
  ListViewInstance,
  ListViewScrollMethods,
  ScrollToEnd,
  ScrollToIndex,
  ScrollToItem,
  ScrollToLocation,
  ScrollToOffset
} from './types'
export type { ListViewProps }

/**
 * 客户端通用长列表
 *  - 整合了 FlatList 和 SectionList
 *  - FlatList 需要给 data 传递客户端统一列表结构 ListEmpty<ItemT>
 *  - SectionList 需要传递 sections, sectionKey
 *  - skipEnteringExitingAnimations 能制造进场效果
 * */
const ListViewComponent = forwardRef(function ListViewComponent<ItemT>(
  props: ListViewProps<ItemT>,
  ref: React.Ref<ListViewScrollMethods>
) {
  r(COMPONENT)

  /** 用 ref 持有 props，避免依赖整个 props 引用 */
  const {
    data = LIST_EMPTY as ListEmpty<ItemT>,
    sectionKey = DEFAULT_PROPS.sectionKey,
    sections: rawSections,
    refreshControlProps = DEFAULT_PROPS.refreshControlProps,
    style,
    optimize = DEFAULT_PROPS.optimize,
    maxToRenderPerBatch,
    updateCellsBatchingPeriod,
    estimatedItemHeight,
    itemHeightKey,
    showFooter = DEFAULT_PROPS.showFooter,
    showMesume = DEFAULT_PROPS.showMesume,
    progressViewOffset,
    scrollToTop: _scrollToTop,
    initialNumToRender,
    ListFooterComponent,
    onHeaderRefresh: rawOnHeaderRefresh,
    onFooterRefresh: rawOnFooterRefresh,
    footerEmptyDataComponent,
    footerEmptyDataText = DEFAULT_PROPS.footerEmptyDataText,
    footerFailureText = DEFAULT_PROPS.footerFailureText,
    footerNoMoreDataComponent,
    footerRefreshingText = DEFAULT_PROPS.footerRefreshingText,
    footerTextType = DEFAULT_PROPS.footerTextType,
    ...restProps
  } = props

  /** hooks 只接收具体字段，不依赖整个 props 引用 */
  const {
    refreshState,
    onHeaderRefresh: runHeaderRefresh,
    onFooterRefresh,
    onEndReached
  } = useRefreshState<ItemT>({
    data,
    onHeaderRefresh: rawOnHeaderRefresh,
    onFooterRefresh: rawOnFooterRefresh
  })

  /**
   * 头部刷新「成功」结束视为整批替换数据（分页回到第 1 页），自增代号使高度缓存全部重建为预估高度；
   * 同实体追加分页代号不变，保留已测量高度。
   * 刷新失败（回调 reject、数据未替换）时不自增，避免白丢已测高度
   */
  const cacheGenerationRef = useRef(0)
  const onHeaderRefresh = useCallback(async () => {
    await runHeaderRefresh()
    cacheGenerationRef.current += 1
  }, [runHeaderRefresh])

  const { onScrollBeginDrag, onScroll, onScrollEndDrag, onMomentumScrollEnd, mergeScrollCallback } =
    useScrollProtection()

  const { connectRef } = useScrollMethods(ref)

  const { sections, list } = useListData<ItemT>({
    data,
    sectionKey,
    sections: rawSections
  })

  const renderRefreshControl = useRenderRefreshControl({
    rawOnHeaderRefresh,
    refreshState,
    data,
    progressViewOffset,
    refreshControlProps,
    onHeaderRefresh
  })

  const renderFooter = useRenderFooter({
    data,
    refreshState,
    footerEmptyDataComponent,
    footerEmptyDataText,
    footerFailureText,
    footerNoMoreDataComponent,
    footerRefreshingText,
    footerTextType,
    showMesume
  })

  const commonProps = useListCommonProps({
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
  })

  const renderList = useRenderList<ItemT>({
    restProps,
    sectionKey,
    rawSections,
    data,
    list: list as ListArray<ItemT>,
    sections,
    mergeScrollCallback,
    onScrollBeginDrag,
    onScroll,
    onScrollEndDrag,
    onMomentumScrollEnd,
    commonProps,
    estimatedItemHeight,
    itemHeightKey:
      itemHeightKey === undefined
        ? cacheGenerationRef.current
        : `${itemHeightKey}#${cacheGenerationRef.current}`,
    renderFooter,
    onFooterRefresh
  })

  return <ErrorBoundary>{renderList()}</ErrorBoundary>
})

/**
 * 核心：利用类型断言，将 observer(forwardRef(...)) 包装回支持泛型的组件类型
 */
export const ListView = observer(ListViewComponent) as <ItemT>(
  props: ListViewProps<ItemT> & { ref?: React.Ref<ListViewScrollMethods> }
) => React.ReactElement

export default ListView
