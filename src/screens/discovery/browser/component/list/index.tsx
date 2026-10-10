/*
 * @Author: czy0729
 * @Date: 2022-07-27 05:22:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-10 10:20:00
 *
 * 索引列表, 顶部可固定或内嵌工具栏, 网格布局时按列数展示
 */
import { useMemo } from 'react'
import { observer } from 'mobx-react'
import { ListView } from '@components'
import { ITEM_COLLECTIONS_GRID_TEXT_HEIGHT, ITEM_SEARCH_HEIGHT } from '@_'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils/app'
import ToolBar from '../tool-bar'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { layout, fixed } = $.state
  const { _loaded } = $.list
  const numColumns = $.isList ? undefined : $.numColumns

  const grid = _.grid($.numColumns)
  // 网格 getItemLayout 的索引同为行索引, 估算行高 = 封面 + 文字区
  const estimatedItemHeight = $.isList
    ? ITEM_SEARCH_HEIGHT
    : ($.state.type === 'music' ? grid.width : grid.height) + ITEM_COLLECTIONS_GRID_TEXT_HEIGHT

  const elToolBar = useMemo(() => <ToolBar />, [])

  return (
    <>
      {fixed && elToolBar}
      {!fixed && !_loaded && elToolBar}
      {!!_loaded && (
        <ListView
          key={`${layout}|${numColumns}`}
          keyExtractor={keyExtractor}
          ref={$.forwardRef}
          contentContainerStyle={_.container.bottom}
          numColumns={numColumns}
          data={$.list}
          estimatedItemHeight={estimatedItemHeight}
          skipEnteringExitingAnimations={12}
          ListHeaderComponent={!fixed && elToolBar}
          renderItem={renderItem}
          onScroll={$.onScroll}
          onHeaderRefresh={$.onHeaderRefresh}
          onFooterRefresh={$.fetchBrowser}
        />
      )}
    </>
  )
}

export default observer(List)
