/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:57:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-24 08:40:36
 */
import React, { useCallback } from 'react'
import { ListView } from '@components'
import { keyExtractor } from '@utils'
import { memo } from '@utils/decorators'
import { FROZEN_FN } from '@constants'
import Item from '../../component/item'
import Pagination from '../../component/pagination'
import ToolBar from '../../component/tool-bar'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

import type { ListViewProps } from '@components'

const List = memo(
  ({
    styles,
    list = true,
    page = 0,
    data,
    numColumns,
    userPagination = false,
    onScroll,
    onHeaderRefresh = FROZEN_FN,
    onFooterRefresh = FROZEN_FN
  }) => {
    const { page: pageCurrent, pageTotal } = data.pagination

    const passProps: Pick<
      ListViewProps,
      'contentContainerStyle' | 'ListFooterComponent' | 'onHeaderRefresh' | 'onFooterRefresh'
    > = {
      contentContainerStyle: list ? styles.list : styles.grid
    }
    if (userPagination) {
      passProps.ListFooterComponent = <Pagination pageTotal={pageTotal} />
    } else {
      passProps.onHeaderRefresh = onHeaderRefresh
      passProps.onFooterRefresh = onFooterRefresh
    }

    const renderItem = useCallback(
      ({ item, index }) => <Item item={item} index={index} page={page} />,
      [page]
    )

    return (
      <ListView
        keyExtractor={keyExtractor}
        nestedScrollEnabled
        data={data}
        numColumns={numColumns}
        keyboardDismissMode='on-drag'
        scrollEventThrottle={16}
        renderItem={renderItem}
        ListHeaderComponent={
          <ToolBar page={page} pageCurrent={pageCurrent} pageTotal={pageTotal} />
        }
        onScroll={onScroll}
        {...passProps}
      />
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default List
