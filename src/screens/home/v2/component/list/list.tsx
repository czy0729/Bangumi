/*
 * @Author: czy0729
 * @Date: 2022-06-19 12:58:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 07:37:09
 */
import React, { useCallback } from 'react'
import { PaginationList2 } from '@_'
import { _, systemStore } from '@stores'
import { memo } from '@utils/decorators'
import { FROZEN_FN, IOS, LIST_EMPTY } from '@constants'
import { TabsLabel } from '../../types'
import Empty from '../empty'
import Filter from '../filter'
import { keyExtractor, renderItem } from './utils'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

const List = memo(
  ({
    forwardRef = FROZEN_FN,
    style = {
      paddingTop: 0,
      paddingBottom: _.bottom
    },
    data = LIST_EMPTY,
    title = '' as TabsLabel,
    showItem = IOS ? false : true,
    onScroll = FROZEN_FN,
    onHeaderRefresh = FROZEN_FN,
    onFooterRefresh
  }) => {
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

    return (
      <PaginationList2
        keyExtractor={keyExtractor}
        forwardRef={forwardRef}
        contentContainerStyle={style}
        progressViewOffset={style.paddingTop}
        data={data.list}
        limit={20}
        keyboardDismissMode='on-drag'
        ListHeaderComponent={
          systemStore.setting.homeFilter ? <Filter title={title} length={length} /> : null
        }
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
