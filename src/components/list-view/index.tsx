/*
 * @Author: czy0729
 * @Date: 2019-04-11 00:46:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-04 06:06:38
 */
import React, { forwardRef, useCallback, useMemo } from 'react'
import { RefreshControl } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { date, simpleTime } from '@utils'
import { r } from '@utils/dev'
import { LIST_EMPTY, WEB } from '@constants'
import { ErrorBoundary } from '../error-boundary'
import Footer from './footer'
import { useListData, useRefreshState, useScrollMethods, useScrollProtection } from './hooks'
import List from './list'
import {
  COMPONENT,
  DEFAULT_MAX_TO_RENDER_PER_BATCH,
  DEFAULT_PROPS,
  DEFAULT_UPDATE_CELLS_BATCHING_PERIOD,
  DEFAULT_WINDOW_SIZE,
  REFRESH_STATE,
  SCROLL_THRESHOLD
} from './ds'

export { FooterEmptyData, FooterFailure, FooterNoMoreData, FooterRefreshing } from './footer'

import type { Props as ListViewProps, ListViewScrollMethods, RenderListProps } from './types'
import type { AnyObject, ListEmpty } from '@types'
export type {
  ListViewInstance,
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
    // footerNoMoreDataText = DEFAULT_PROPS.footerNoMoreDataText,
    footerRefreshingText = DEFAULT_PROPS.footerRefreshingText,
    footerTextType = DEFAULT_PROPS.footerTextType,
    ...restProps
  } = props

  /** hooks 只接收具体字段，不依赖整个 props 引用 */
  const { refreshState, onHeaderRefresh, onFooterRefresh, onEndReached } = useRefreshState<ItemT>({
    data,
    onHeaderRefresh: rawOnHeaderRefresh,
    onFooterRefresh: rawOnFooterRefresh
  })

  const { onScrollBeginDrag, onScroll, onScrollEndDrag, onMomentumScrollEnd, mergeScrollCallback } =
    useScrollProtection()

  const { connectRef } = useScrollMethods(ref)

  const { sections, list } = useListData<ItemT>({
    data,
    sectionKey,
    sections: rawSections
  })

  /** 渲染下拉刷新控制 */
  const renderRefreshControl = useCallback(() => {
    if (!rawOnHeaderRefresh) return null

    return (
      <RefreshControl
        enabled={!!rawOnHeaderRefresh}
        refreshing={refreshState === REFRESH_STATE.HeaderRefreshing}
        title={data._loaded ? `上次刷新时间: ${simpleTime(date(String(data._loaded)))}` : undefined}
        colors={[_.colorMain]}
        titleColor={_.colorSub}
        tintColor={_.colorSub}
        progressViewOffset={progressViewOffset}
        progressBackgroundColor={_.select(_.colorPlain, _._colorDarkModeLevel2)}
        onRefresh={onHeaderRefresh}
        {...refreshControlProps}
      />
    )
  }, [
    rawOnHeaderRefresh,
    refreshState,
    data,
    progressViewOffset,
    refreshControlProps,
    onHeaderRefresh
  ])

  /** 渲染列表底部（加载状态、空数据等） */
  const renderFooter = useCallback(() => {
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

  /** 获取通用属性（样式、刷新控制、优化参数等） */
  const commonProps = useMemo(
    () => ({
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
      maxToRenderPerBatch: optimize ? DEFAULT_MAX_TO_RENDER_PER_BATCH : undefined,
      updateCellsBatchingPeriod: optimize ? DEFAULT_UPDATE_CELLS_BATCHING_PERIOD : undefined,
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
      refreshState,
      renderRefreshControl,
      renderFooter,
      rawOnHeaderRefresh,
      onHeaderRefresh,
      rawOnFooterRefresh,
      onEndReached,
      optimize,
      initialNumToRender
    ]
  )

  /** 渲染列表主体 */
  const renderList = useCallback(() => {
    const renderProps: RenderListProps<ItemT> = {
      ...restProps,
      sectionKey,
      sections: rawSections,
      data
    }
    const passProps: AnyObject = { ...renderProps }

    // 合并滚动回调，确保滑动保护始终生效
    passProps.scrollEventThrottle = SCROLL_THRESHOLD
    passProps.scrollIndicatorInsets =
      passProps.scrollIndicatorInsets ?? DEFAULT_PROPS.scrollIndicatorInsets
    mergeScrollCallback(passProps, 'onScrollBeginDrag', onScrollBeginDrag)
    mergeScrollCallback(passProps, 'onScroll', onScroll)
    mergeScrollCallback(passProps, 'onScrollEndDrag', onScrollEndDrag)
    mergeScrollCallback(passProps, 'onMomentumScrollEnd', onMomentumScrollEnd)

    if (sectionKey || rawSections) {
      passProps.sections = sections
    } else {
      passProps.data = list
    }

    if (WEB) {
      passProps.pagination = data.pagination
      passProps.renderFooter = renderFooter()
      passProps.onFooterRefresh = onFooterRefresh
    }

    return <List {...commonProps} {...passProps} />
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
    renderFooter,
    onFooterRefresh
  ])

  return <ErrorBoundary>{renderList()}</ErrorBoundary>
})

/**
 * 核心：利用类型断言，将 observer(forwardRef(...)) 包装回支持泛型的组件类型
 */
export const ListView = observer(ListViewComponent) as <ItemT>(
  props: ListViewProps<ItemT> & { ref?: React.Ref<ListViewScrollMethods> }
) => React.ReactElement

export default ListView
