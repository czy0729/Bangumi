/*
 * @Author: czy0729
 * @Date: 2025-10-29 22:46:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-29 05:50:59
 *
 * 非分页模式的列表
 */
import { useCallback, useEffect, useMemo, useState } from 'react'
import { observer } from 'mobx-react'
import { ListView } from '@components'
import { ITEM_COLLECTIONS_GRID_TEXT_HEIGHT, ITEM_SEARCH_HEIGHT } from '@_'
import { _, useStore } from '@stores'
import { keyExtractor, stl } from '@utils'
import { ENTERING_ANIMATIONS_NUM, getColumnNum } from '../ds'
import { TYPE_MUSIC } from '../../ds'
import { EMPTY_RANK } from '../../store/ds'
import ToolBar from '../tool-bar'
import { renderItem } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function FlatList() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const elToolbar = useMemo(() => <ToolBar />, [])

  const handleHeaderRefresh = useCallback(() => $.fetchRankWithoutPagination(true), [$])

  const styles = memoStyles()

  /** 首帧渲染空数据, 让列表容器与 cell 分两批挂载 (同批挂载的 cell 会被 skipEntering 跳过进场动画) */
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  const { show, fixed, type } = $.state
  const columnNum = getColumnNum()

  /** 网格 getItemLayout 的索引同为行索引, 估算行高 = 封面 + 文字区 */
  let estimatedItemHeight = ITEM_SEARCH_HEIGHT
  if (!$.isList) {
    const grid = _.grid(columnNum)
    estimatedItemHeight =
      (type === TYPE_MUSIC ? grid.width : grid.height) + ITEM_COLLECTIONS_GRID_TEXT_HEIGHT
  }

  return (
    <>
      {fixed && elToolbar}
      {show && (
        <ListView
          key={`${$.isList}|${columnNum}`}
          keyExtractor={keyExtractor}
          contentContainerStyle={stl(_.container.bottom, !$.isList && styles.grid)}
          numColumns={$.isList ? undefined : columnNum}
          data={ready ? $.list : EMPTY_RANK}
          estimatedItemHeight={estimatedItemHeight}
          itemHeightKey={`${type}|${$.isList}`}
          skipEnteringExitingAnimations={ENTERING_ANIMATIONS_NUM}
          ListHeaderComponent={!fixed && elToolbar}
          renderItem={renderItem}
          onScroll={$.onScroll}
          onHeaderRefresh={handleHeaderRefresh}
          onFooterRefresh={$.list._loaded ? $.fetchRankWithoutPagination : undefined}
        />
      )}
    </>
  )
}

export default observer(FlatList)
