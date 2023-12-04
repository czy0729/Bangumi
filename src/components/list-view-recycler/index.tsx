/*
 * @Author: czy0729
 * @Date: 2022-07-07 21:07:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-04 21:51:55
 */
import React, { useCallback } from 'react'
import { RecyclerListView } from 'recyclerlistview'
import Footer from '../list-view/footer'
import { useRecycler, useFooterRefresh } from './utils'
import { SCROLL_VIEW_PROPS, DIMENSION } from './ds'
import { ListViewRecyclerProps } from './types'

export { ListViewRecyclerProps }

/**
 * 未实装
 * @doc https://github.com/Flipkart/recyclerlistview
 */
function ListViewRecycler({
  data,
  keyExtractor,
  renderItem,
  ListHeaderComponent,
  onScroll,
  onFooterRefresh,

  // footer
  footerEmptyDataComponent,
  footerEmptyDataText,
  footerFailureComponent,
  footerFailureText,
  footerNoMoreDataComponent,
  footerRefreshingComponent,
  footerRefreshingText,
  footerTextType,
  showMesume
}: ListViewRecyclerProps) {
  const { layoutProvider, dataProvider, rowRenderer } = useRecycler({
    data,
    keyExtractor,
    renderItem,
    ListHeaderComponent
  })
  const { refreshState, onEndReachedThreshold, onEndReached } = useFooterRefresh({
    data,
    onFooterRefresh
  })
  const renderFooter = useCallback(
    () => (
      <Footer
        refreshState={refreshState}
        filterText={data._filter}
        footerEmptyDataComponent={footerEmptyDataComponent}
        footerEmptyDataText={footerEmptyDataText}
        footerFailureComponent={footerFailureComponent}
        footerFailureText={footerFailureText}
        footerNoMoreDataComponent={footerNoMoreDataComponent}
        footerRefreshingComponent={footerRefreshingComponent}
        footerRefreshingText={footerRefreshingText}
        footerTextType={footerTextType}
        showMesume={showMesume}
      />
    ),
    [
      data._filter,
      footerEmptyDataComponent,
      footerEmptyDataText,
      footerFailureComponent,
      footerFailureText,
      footerNoMoreDataComponent,
      footerRefreshingComponent,
      footerRefreshingText,
      footerTextType,
      refreshState,
      showMesume
    ]
  )

  return (
    <RecyclerListView
      layoutProvider={layoutProvider}
      dataProvider={dataProvider}
      rowRenderer={rowRenderer}
      forceNonDeterministicRendering
      initialRenderIndex={0}
      renderAheadOffset={0}
      layoutSize={DIMENSION}
      scrollViewProps={SCROLL_VIEW_PROPS}
      ListHeaderComponent={ListHeaderComponent}
      renderFooter={renderFooter}
      onScroll={onScroll}
      onEndReachedThreshold={onEndReachedThreshold}
      onEndReached={onEndReached}
    />
  )
}

export { ListViewRecycler }
