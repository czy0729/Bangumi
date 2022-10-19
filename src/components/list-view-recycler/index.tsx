/*
 * @Doc: https://github.com/Flipkart/recyclerlistview
 * @Author: czy0729
 * @Date: 2022-07-07 21:07:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-19 14:01:08
 */
import React, { useCallback } from 'react'
import { RecyclerListView } from 'recyclerlistview'
import Footer from '../list-view/footer'
import { useRecycler, useFooterRefresh } from './utils'
import { SCROLL_VIEW_PROPS, DIMENSION } from './ds'
import { ListViewRecyclerProps } from './types'

export { ListViewRecyclerProps }

function ListViewRecycler({
  data,
  keyExtractor,
  renderItem,
  ListHeaderComponent,
  onScroll,
  onFooterRefresh,
  onHeaderRefresh,

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
        length={data.list.length}
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
        onHeaderRefresh={onHeaderRefresh}
        onFooterRefresh={onFooterRefresh}
      />
    ),
    [
      data._filter,
      data.list.length,
      footerEmptyDataComponent,
      footerEmptyDataText,
      footerFailureComponent,
      footerFailureText,
      footerNoMoreDataComponent,
      footerRefreshingComponent,
      footerRefreshingText,
      footerTextType,
      onFooterRefresh,
      onHeaderRefresh,
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
