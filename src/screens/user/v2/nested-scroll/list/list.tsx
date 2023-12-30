/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:57:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-30 11:20:28
 */
import React, { useCallback } from 'react'
import { ListView } from '@components'
import { _ } from '@stores'
import { keyExtractor } from '@utils'
import { memo } from '@utils/decorators'
import { rerender } from '@utils/dev'
import ToolBar from '../../tool-bar'
import Item from '../../list/item'
import { DEFAULT_PROPS } from './ds'

const List = memo(
  ({ page, data, numColumns, onScroll, onHeaderRefresh, onFooterRefresh }) => {
    rerender('User.NestedScroll.List.Main')

    const renderItem = useCallback(
      ({ item, index }) => <Item item={item} index={index} page={page} />,
      [page]
    )

    const { page: pageCurrent, pageTotal } = data.pagination
    return (
      <ListView
        keyExtractor={keyExtractor}
        nestedScrollEnabled
        contentContainerStyle={_.container.bottom}
        data={data}
        numColumns={numColumns}
        keyboardDismissMode='on-drag'
        scrollEventThrottle={4}
        renderItem={renderItem}
        ListHeaderComponent={
          <ToolBar page={page} pageCurrent={pageCurrent} pageTotal={pageTotal} />
        }
        onScroll={onScroll}
        onHeaderRefresh={onHeaderRefresh}
        onFooterRefresh={onFooterRefresh}
      />
    )
  },
  DEFAULT_PROPS
)

export default List
