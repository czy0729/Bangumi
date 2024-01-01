/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:57:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-01 11:44:42
 */
import React, { useCallback } from 'react'
import { ListView } from '@components'
import { _ } from '@stores'
import { keyExtractor } from '@utils'
import { memo } from '@utils/decorators'
import ToolBar from '../../component/tool-bar'
import Item from '../../component/item'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

const List = memo(
  ({ page, data, numColumns, onScroll, onHeaderRefresh, onFooterRefresh }) => {
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
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default List
