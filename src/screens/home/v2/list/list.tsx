/*
 * @Author: czy0729
 * @Date: 2022-06-19 12:58:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-08 23:45:19
 */
import React, { useCallback, useMemo } from 'react'
import { PaginationList2 } from '@_'
import { memo } from '@utils/decorators'
import Filter from '../filter'
import Empty from '../empty'
import { keyExtractor, renderItem } from './utils'
import { DEFAULT_PROPS } from './ds'

const List = memo(
  ({
    forwardRef,
    styles,
    data,
    title,
    scrollToTop,
    showItem,
    onScroll,
    onHeaderRefresh,
    onFooterRefresh
  }) => {
    // global.rerender('Home.List.Main')

    const { length } = data.list
    const emptyComponent = <Empty title={title} length={length} />
    const _renderItem = useCallback(
      ({ item, index }) => {
        // iOS 因为头顶毛玻璃的问题, 不能懒加载 Tab, 所以在 Item 渲染的时候控制是否渲染
        // 安卓是懒加载, 所以可以一直显示
        if (!showItem) return null

        return renderItem({
          item,
          index,
          title
        })
      },
      [title, showItem]
    )
    const ListHeaderComponent = useMemo(
      () => <Filter title={title} length={length} />,
      [title, length]
    )

    return (
      <PaginationList2
        forwardRef={forwardRef}
        contentContainerStyle={styles.contentContainerStyle}
        progressViewOffset={styles.contentContainerStyle.paddingTop}
        keyExtractor={keyExtractor}
        data={data.list}
        limit={20}
        scrollToTop={scrollToTop}
        keyboardDismissMode='on-drag'
        ListHeaderComponent={ListHeaderComponent}
        renderItem={_renderItem}
        footerEmptyDataComponent={emptyComponent}
        footerNoMoreDataComponent={emptyComponent}
        footerNoMoreDataText=''
        scrollEventThrottle={4}
        onScroll={onScroll}
        onHeaderRefresh={onHeaderRefresh}
        onFooterRefresh={onFooterRefresh}
      />
    )
  },
  DEFAULT_PROPS
)

export default List
