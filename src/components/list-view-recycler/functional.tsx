/*
 * @Doc: https://github.com/Flipkart/recyclerlistview
 * @Author: czy0729
 * @Date: 2022-07-07 21:07:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-09 12:12:19
 */
import React from 'react'
import { RecyclerListView } from 'recyclerlistview'
// import isEqual from 'lodash.isequal'
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
  ...other
}: ListViewRecyclerProps) {
  const { layoutProvider, dataProvider, rowRenderer } = useRecycler({
    data,
    keyExtractor,
    renderItem,
    ListHeaderComponent
  })
  const { onEndReachedThresholdRelative, onEndReached } = useFooterRefresh({
    data,
    onFooterRefresh
  })
  return (
    <RecyclerListView
      layoutProvider={layoutProvider}
      dataProvider={dataProvider}
      rowRenderer={rowRenderer}
      forceNonDeterministicRendering
      initialRenderIndex={0}
      renderAheadOffset={0}
      layoutSize={DIMENSION}
      ListHeaderComponent={ListHeaderComponent}
      scrollViewProps={SCROLL_VIEW_PROPS}
      onScroll={onScroll}
      onEndReachedThresholdRelative={onEndReachedThresholdRelative}
      onEndReached={onEndReached}
      {...other}
    />
  )
}

export { ListViewRecycler }
