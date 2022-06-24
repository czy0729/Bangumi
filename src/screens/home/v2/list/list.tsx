/*
 * @Author: czy0729
 * @Date: 2022-06-19 12:58:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-20 17:08:33
 */
import React from 'react'
import { ListView } from '@components'
import { _ } from '@stores'
import { memo } from '@utils/decorators'
import Filter from '../filter'
import Empty from '../empty'
import { keyExtractor, renderItem } from './utils'
import { DEFAULT_PROPS } from './ds'

const List = memo(
  ({
    styles,
    connectRef,
    data,
    title,
    scrollToTop,
    onHeaderRefresh,
    onFooterRefresh
  }) => {
    global.rerender('Home.List.Main')

    const emptyComponent = <Empty title={title} length={data.list.length} />
    return (
      <ListView
        ref={connectRef}
        style={styles.listView}
        contentContainerStyle={styles.contentContainerStyle}
        keyExtractor={keyExtractor}
        data={data}
        progressViewOffset={_.ios(styles.contentContainerStyle.paddingTop - _.sm, 0)}
        ListHeaderComponent={<Filter />}
        footerNoMoreDataText=''
        footerEmptyDataComponent={emptyComponent}
        footerNoMoreDataComponent={emptyComponent}
        scrollToTop={scrollToTop}
        renderItem={renderItem}
        onHeaderRefresh={onHeaderRefresh}
        onFooterRefresh={onFooterRefresh}
      />
    )
  },
  DEFAULT_PROPS
)

export default List