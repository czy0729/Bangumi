/*
 * @Author: czy0729
 * @Date: 2022-07-30 04:30:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-21 12:00:00
 *
 * 标签条目列表: ListView, 列表/网格双布局与工具条组装
 */
import { useCallback, useMemo } from 'react'
import { observer } from 'mobx-react'
import { ListView } from '@components'
import { ITEM_COLLECTIONS_GRID_TEXT_HEIGHT, ITEM_SEARCH_HEIGHT, Notice } from '@_'
import { _, useStore } from '@stores'
import { keyExtractor, x18s } from '@utils'
import { TEXT_18X } from '@constants'
import ToolBar from '../tool-bar'
import GridItem from './grid'
import ListItem from './list'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { TagItem } from '@stores/tag/types'
import type { RenderItem } from '@types'
import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { list, fixed, meta, order } = $.state

  const columns = _.portrait(_.device(3, 4), 5)
  const numColumns = list ? undefined : columns
  // 网格 getItemLayout 的索引同为行索引, 估算行高 = 封面 + 文字区
  const grid = _.grid(columns)
  const estimatedItemHeight = list
    ? ITEM_SEARCH_HEIGHT
    : ($.params.type === 'music' ? grid.width : grid.height) + ITEM_COLLECTIONS_GRID_TEXT_HEIGHT

  const elToolBar = useMemo(() => <ToolBar />, [])
  const elListHeaderComponent = useMemo(
    () => (
      <>
        {!fixed && elToolBar}
        {order === 'rank' && !meta && (
          <Notice>
            因标签为用户自行添加，
            「按排名」排序在热门标签下可能毫无意义，推荐「按收藏」排序，也可点击右上角进入「分类排名」以获取更准确的快照数据。
          </Notice>
        )}
      </>
    ),
    [elToolBar, fixed, meta, order]
  )

  const renderItem = useCallback(
    ({ item, index }: RenderItem<TagItem>) =>
      list ? (
        <ListItem item={item} index={index} />
      ) : (
        <GridItem item={item} index={index} numColumns={numColumns} />
      ),
    [list, numColumns]
  )

  return (
    <>
      {fixed && elToolBar}
      {!!$.list._loaded && (
        <ListView
          // 只随布局与列数重建, 筛选变化走 resetScrollView 回顶, 保留列表实例
          key={`${_.orientation}${numColumns}`}
          keyExtractor={keyExtractor}
          ref={$.forwardRef}
          contentContainerStyle={!fixed ? styles.contentContainerStyle : _.container.bottom}
          numColumns={numColumns}
          data={$.list}
          estimatedItemHeight={estimatedItemHeight}
          // 列表实例常驻, 数据整批替换时跳过前 12 项的进场动画, 避免筛选后闪烁
          skipEnteringExitingAnimations={12}
          ListHeaderComponent={elListHeaderComponent}
          renderItem={renderItem}
          footerEmptyDataText={x18s($.params.tag) ? TEXT_18X : undefined}
          scrollEventThrottle={16}
          onScroll={$.onScroll}
          onHeaderRefresh={$.onHeaderRefresh}
          onFooterRefresh={$.onFooterRefresh}
        />
      )}
    </>
  )
}

export default observer(List)
