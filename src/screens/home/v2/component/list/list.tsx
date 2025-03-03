/*
 * @Author: czy0729
 * @Date: 2022-06-19 12:58:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-01 19:00:11
 */
import React, { useCallback, useMemo } from 'react'
import { PaginationList2 } from '@_'
import { useStore } from '@stores'
import { memo } from '@utils/decorators'
import { Ctx } from '../../types'
import Empty from '../empty'
import Filter from '../filter'
import { keyExtractor, renderItem } from './utils'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

const List = memo(
  ({
    forwardRef,
    style,
    data,
    title,
    scrollToTop,
    showItem,
    onScroll,
    onHeaderRefresh,
    onFooterRefresh
  }) => {
    const { $, navigation } = useStore<Ctx>()
    const { length } = data.list
    const elEmpty = <Empty title={title} length={length} />
    const handleRenderItem = useCallback(
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
      () => <Filter $={$} navigation={navigation} title={title} length={length} />,
      [$, navigation, title, length]
    )

    return (
      <PaginationList2
        keyExtractor={keyExtractor}
        forwardRef={forwardRef}
        contentContainerStyle={style}
        progressViewOffset={style.paddingTop}
        data={data.list}
        limit={20}
        scrollToTop={scrollToTop}
        keyboardDismissMode='on-drag'
        ListHeaderComponent={ListHeaderComponent}
        renderItem={handleRenderItem}
        footerEmptyDataComponent={elEmpty}
        footerNoMoreDataComponent={elEmpty}
        footerNoMoreDataText=''
        scrollEventThrottle={16}
        onScroll={onScroll}
        onHeaderRefresh={onHeaderRefresh}
        onFooterRefresh={onFooterRefresh}
      />
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default List
