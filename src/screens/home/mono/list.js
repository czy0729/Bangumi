/*
 * @Author: czy0729
 * @Date: 2021-11-26 03:42:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-26 03:53:24
 */
import React from 'react'
import { ListView } from '@components'
import { _ } from '@stores'
import { withTransitionHeader, obc } from '@utils/decorators'
import { keyExtractor } from '@utils/app'
import Info from './info'

function List({ renderItem, onScroll }, { $ }) {
  return (
    <ListView
      contentContainerStyle={styles.contentContainerStyle}
      keyExtractor={keyExtractor}
      data={$.monoComments}
      scrollEventThrottle={16}
      scrollToTop
      ListHeaderComponent={<Info />}
      removeClippedSubviews={false}
      renderItem={renderItem}
      onScroll={onScroll}
      onHeaderRefresh={$.onHeaderRefresh}
      onFooterRefresh={$.fetchMono}
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
