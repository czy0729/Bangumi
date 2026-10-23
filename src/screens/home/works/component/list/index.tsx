/*
 * @Author: czy0729
 * @Date: 2020-04-25 14:54:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-22 12:00:00
 *
 * 人物作品列表: ListView, 列表 / 网格双布局与工具条组装
 */
import { useMemo } from 'react'
import { observer } from 'mobx-react'
import { ListView } from '@components'
import { ITEM_SEARCH_HEIGHT } from '@_'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import ToolBar from '../tool-bar'
import { renderGridItem, renderListItem } from './utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const elToolBar = useMemo(() => <ToolBar />, [])

  const { fixed, list } = $.state
  const columns = _.portrait(_.device(3, 4), 5)
  const numColumns = list ? undefined : columns

  return (
    <>
      {fixed && elToolBar}
      <ListView
        // 仅布局/列数变化时重建, 排序与筛选走 resetScrollView 回顶
        key={`${_.orientation}|${numColumns}`}
        keyExtractor={keyExtractor}
        ref={$.forwardRef}
        contentContainerStyle={_.container.bottom}
        data={$.list}
        numColumns={numColumns}
        // 网格不启用 (FlatList 按行索引, 高度缓存会错位)
        estimatedItemHeight={list ? ITEM_SEARCH_HEIGHT : undefined}
        // 数据整批替换时跳过进场动画, 避免闪烁
        skipEnteringExitingAnimations={12}
        ListHeaderComponent={!fixed && elToolBar}
        renderItem={list ? renderListItem : renderGridItem}
        scrollEventThrottle={16}
        onScroll={$.onScroll}
        onHeaderRefresh={$.onHeaderRefresh}
        onFooterRefresh={$.fetchMonoWorks}
      />
    </>
  )
}

export default observer(List)
