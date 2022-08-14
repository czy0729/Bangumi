/*
 * @Author: czy0729
 * @Date: 2021-11-26 03:14:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-14 12:46:35
 */
import React from 'react'
import { ListView } from '@components'
import { PaginationList2 } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { keyExtractor } from '@utils/app'
import Top from '../top'
import { Ctx } from '../types'

function List({ forwardRef, renderItem, onScroll, onScrollToIndexFailed }, { $ }: Ctx) {
  const { list } = $.comments
  const passProps = {
    style: _.container.content,
    contentContainerStyle: _.container.bottom,
    keyExtractor: keyExtractor,
    lazy: $.postId ? undefined : 4,
    progressViewOffset: _.ios(_.statusBarHeight, 0),
    scrollEventThrottle: 16,
    removeClippedSubviews: false,
    initialNumToRender: 120,
    maxToRenderPerBatch: 120,
    updateCellsBatchingPeriod: 120,
    scrollToTop: true,
    ListHeaderComponent: <Top />,
    renderItem: renderItem,
    onScroll: onScroll,
    onScrollToIndexFailed: onScrollToIndexFailed,
    onHeaderRefresh: $.fetchTopic,
    onFooterRefresh: $.fetchTopic,
    onEndReachedThreshold: 0.5
  }

  if (list.length <= 96) {
    return <ListView ref={forwardRef} data={$.comments} {...passProps} />
  }

  return (
    <PaginationList2 forwardRef={forwardRef} data={list} limit={12} {...passProps} />
  )
}

export default obc(List)
