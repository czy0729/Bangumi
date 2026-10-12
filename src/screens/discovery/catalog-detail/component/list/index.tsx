/*
 * @Author: czy0729
 * @Date: 2022-09-06 15:35:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-12 06:29:12
 *
 * 列表容器
 */
import { useMemo } from 'react'
import { observer } from 'mobx-react'
import { ITEM_COLLECTIONS_GRID_TEXT_HEIGHT, ITEM_COLLECTIONS_HEIGHT, PaginationList } from '@_'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { TEXT_18X } from '@constants/text'
import {
  DEFAULT_TYPE,
  TEXT_TYPE_BLOG,
  TEXT_TYPE_CHARACTER,
  TEXT_TYPE_EP,
  TEXT_TYPE_PERSON,
  TEXT_TYPE_TOPIC
} from '../../ds'
import { CATALOG_EP_HEIGHT } from '../ep/ds'
import { CATALOG_BLOG_HEIGHT } from '../blog/ds'
import Info from '../info'
import { CATALOG_MONO_HEIGHT } from '../mono/ds'
import { CATALOG_TOPIC_HEIGHT } from '../topic/ds'
import { renderBlogItem, renderEpItem, renderItem, renderMonoItem, renderTopicItem } from './utils'
import { COMPONENT } from './ds'

import type { PaginationListProps } from '@_'
import type { Ctx, ListData } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  /** 计算列数：动画类型单独逻辑 */
  const memoNumColumns = useMemo(() => {
    if ($.type !== DEFAULT_TYPE) return 1
    return $.isList ? undefined : $.gridNum
  }, [$.type, $.isList, $.gridNum])

  /** 渲染函数根据 type 选择 (条目与渲染函数一一对应, 联合函数需断言为列表签名) */
  const memoRenderFn = useMemo(() => {
    if ($.type === TEXT_TYPE_TOPIC) return renderTopicItem
    if ($.type === TEXT_TYPE_EP) return renderEpItem
    if ($.type === TEXT_TYPE_BLOG) return renderBlogItem
    if ($.type === TEXT_TYPE_CHARACTER || $.type === TEXT_TYPE_PERSON) return renderMonoItem
    return renderItem
  }, [$.type]) as PaginationListProps<ListData>['renderItem']

  /** 条目估算高度 (网格按行高, 其余按单行; 测量后会写入高度缓存) */
  const estimatedItemHeight = useMemo(() => {
    if ($.type === TEXT_TYPE_CHARACTER || $.type === TEXT_TYPE_PERSON) return CATALOG_MONO_HEIGHT
    if ($.type === TEXT_TYPE_EP) return CATALOG_EP_HEIGHT
    if ($.type === TEXT_TYPE_BLOG) return CATALOG_BLOG_HEIGHT
    if ($.type === TEXT_TYPE_TOPIC) return CATALOG_TOPIC_HEIGHT

    if ($.isList) return ITEM_COLLECTIONS_HEIGHT
    return _.grid($.gridNum).height + ITEM_COLLECTIONS_GRID_TEXT_HEIGHT
  }, [$.type, $.isList, $.gridNum])

  const elInfo = useMemo(() => <Info />, [])

  return (
    <PaginationList<ListData>
      key={`${$.state.layout}|${$.type}|${memoNumColumns}`}
      keyExtractor={keyExtractor}
      contentContainerStyle={_.container.bottom}
      numColumns={memoNumColumns}
      data={$.data}
      limit={12}
      estimatedItemHeight={estimatedItemHeight}
      skipEnteringExitingAnimations={12}
      ListHeaderComponent={elInfo}
      renderItem={memoRenderFn}
      footerEmptyDataText={TEXT_18X}
      scrollEventThrottle={16}
      onScroll={$.onScroll}
      onHeaderRefresh={$.fetchCatalogDetail}
    />
  )
}

export default observer(List)
