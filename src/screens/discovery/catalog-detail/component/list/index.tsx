/*
 * @Author: czy0729
 * @Date: 2022-09-06 15:35:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-16 02:25:12
 */
import React, { useMemo } from 'react'
import { observer } from 'mobx-react'
import { PaginationList2 } from '@_'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { TEXT_18X } from '@constants/text'
import Info from '../info'
import { renderBlogItem, renderEpItem, renderItem, renderMonoItem, renderTopicItem } from './utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  // --- Memos ---
  /** 计算列数：动画类型单独逻辑 */
  const memoNumColumns = useMemo(() => {
    if ($.type !== '动画') return 1
    return $.isList ? undefined : $.gridNum
  }, [$.type, $.isList, $.gridNum])

  /** 渲染函数根据 type 选择 */
  const memoRenderFn = useMemo(() => {
    if ($.type === '小组') return renderTopicItem
    if ($.type === '章节') return renderEpItem
    if ($.type === '日志') return renderBlogItem
    if ($.type === '角色' || $.type === '人物') return renderMonoItem
    return renderItem
  }, [$.type])

  // --- Memos (Elements) ---
  const elInfo = useMemo(() => <Info />, [])

  // --- Render ---
  return (
    <PaginationList2
      key={`${$.state.layout}|${memoNumColumns}`}
      keyExtractor={keyExtractor}
      contentContainerStyle={_.container.bottom}
      numColumns={memoNumColumns}
      data={$.data}
      limit={12}
      ListHeaderComponent={elInfo}
      renderItem={memoRenderFn as any}
      footerEmptyDataText={TEXT_18X}
      scrollEventThrottle={16}
      onScroll={$.onScroll}
      onHeaderRefresh={$.fetchCatalogDetail}
    />
  )
}

export default observer(List)
