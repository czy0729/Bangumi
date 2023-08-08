/*
 * @Author: czy0729
 * @Date: 2021-11-26 03:14:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-07 16:41:38
 */
import React from 'react'
import { ListView } from '@components'
import { PaginationList2 } from '@_'
import { _ } from '@stores'
import { keyExtractor } from '@utils'
import { obc } from '@utils/decorators'
import Top from '../top'
import { Ctx } from '../types'

function List({ forwardRef, renderItem, onScroll, onScrollToIndexFailed }, { $ }: Ctx) {
  const { list } = $.comments
  const passProps = {
    style: _.container.content,
    contentContainerStyle: _.container.bottom,
    keyExtractor,
    lazy: $.postId ? undefined : 4,
    progressViewOffset: _.ios(_.statusBarHeight, 0),
    scrollEventThrottle: 16,
    // removeClippedSubviews: false,
    initialNumToRender: 120,
    maxToRenderPerBatch: 120,
    updateCellsBatchingPeriod: 120,
    scrollToTop: true,
    keyboardDismissMode: 'on-drag',
    ListHeaderComponent: <Top />,
    renderItem,
    onScroll,
    onScrollToIndexFailed,
    onHeaderRefresh: $.fetchTopic,
    onFooterRefresh: $.fetchTopic,
    onEndReachedThreshold: 0.5
  } as const

  if (list.length <= 64) {
    return (
      <ListView
        ref={forwardRef}
        data={$.comments}
        {...passProps}
        // contentContainerStyle={styles.flexWrap}
      />
    )
  }

  return (
    <PaginationList2 forwardRef={forwardRef} data={list} limit={16} {...passProps} />
  )
}

export default obc(List)
