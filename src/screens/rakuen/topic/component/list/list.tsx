/*
 * @Author: czy0729
 * @Date: 2024-01-03 22:16:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-19 11:22:10
 */
import React, { useCallback } from 'react'
import { ListView } from '@components'
import { PaginationList2 } from '@_'
import { _ } from '@stores'
import { keyExtractor } from '@utils'
import { memo } from '@utils/decorators'
import { FROZEN_FN, LIMIT_LIST, LIST_EMPTY, WEB } from '@constants'
import Item from '../item'
import { COMPONENT_MAIN, DEFAULT_PROPS, LISTVIEW_PROPS } from './ds'
import { styles } from './styles'

const List = memo(
  ({
    forwardRef = FROZEN_FN,
    data = LIST_EMPTY,
    postId = '',
    onScroll = FROZEN_FN,
    onScrollToIndexFailed = FROZEN_FN,
    onHeaderRefresh = FROZEN_FN,
    onShowFixedTextarea = FROZEN_FN
  }) => {
    const renderItem = useCallback(
      ({ item, index }) => (
        <Item item={item} index={index} onShowFixedTextarea={onShowFixedTextarea} />
      ),
      [onShowFixedTextarea]
    )

    const passProps = {
      ...LISTVIEW_PROPS,
      keyExtractor,
      style: _.container.content,
      contentContainerStyle: WEB ? _.container.bottom : styles.list,
      lazy: postId ? undefined : 4,
      progressViewOffset: _.ios(_.statusBarHeight, 0),
      removeClippedSubviews: true,
      renderItem,
      onScroll,
      onScrollToIndexFailed,
      onHeaderRefresh
    } as const

    const { list } = data
    if (WEB || list.length <= LIMIT_LIST) {
      return <ListView {...passProps} ref={forwardRef} data={data} />
    }

    return <PaginationList2 {...passProps} forwardRef={forwardRef} data={list} limit={24} />
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default List
