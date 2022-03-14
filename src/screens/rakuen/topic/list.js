/*
 * @Author: czy0729
 * @Date: 2021-11-26 03:14:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-14 23:15:09
 */
import React from 'react'
import { ListView } from '@components'
import { _ } from '@stores'
import { withTransitionHeader, obc } from '@utils/decorators'
import { keyExtractor } from '@utils/app'
import Top from './top'

function List({ listViewRef, renderItem, onScroll, onScrollToIndexFailed }, { $ }) {
  return (
    <ListView
      ref={listViewRef}
      style={_.container.content}
      contentContainerStyle={styles.contentContainerStyle}
      keyExtractor={keyExtractor}
      data={$.comments}
      lazy={$.postId ? undefined : 4}
      scrollEventThrottle={16}
      removeClippedSubviews={false}
      initialNumToRender={120}
      maxToRenderPerBatch={120}
      updateCellsBatchingPeriod={120}
      scrollToTop
      ListHeaderComponent={<Top />}
      renderItem={renderItem}
      onScroll={onScroll}
      onScrollToIndexFailed={onScrollToIndexFailed}
      onHeaderRefresh={$.fetchTopic}
      onFooterRefresh={$.fetchTopic}
      onEndReachedThreshold={0.5}
      {...withTransitionHeader.listViewProps}
    />
  )
}

export default obc(List)

const styles = _.create({
  contentContainerStyle: {
    paddingBottom: _.bottom
  }
})
