/*
 * @Author: czy0729
 * @Date: 2019-10-01 15:44:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 人物列表
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { ListView } from '@components'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils/app'
import { ITEM_HEIGHT } from '../item-recents/ds'
import { ITEM_TEXT_HEIGHT } from '../item/ds'
import { getDividerIndex, renderItem, renderItemRecents } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Characters, Recents } from '@stores/users/types'
import type { Ctx } from '../../types'
import type { Props } from './types'

function List({ id }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handleHeaderRefresh = useCallback(() => $.fetchList(id, true), [$, id])
  const handleFooterRefresh = useCallback(() => $.fetchList(id), [$, id])

  const list = $.list(id)
  if (!list._loaded) return null

  const styles = memoStyles()

  const numColumns = _.portrait(5, 8)

  // 网格 getItemLayout 的索引同为行索引, 估算行高 = 封面 + 文字区
  const grid = _.grid(numColumns)
  const estimatedItemHeight = id === 'recents' ? ITEM_HEIGHT : grid.width + ITEM_TEXT_HEIGHT

  const commonProps = {
    keyExtractor,
    contentContainerStyle: styles.contentContainerStyle,
    estimatedItemHeight,
    onScroll: $.onScroll,
    onHeaderRefresh: handleHeaderRefresh,
    onFooterRefresh: handleFooterRefresh
  } as const

  if (id === 'recents') {
    const dividerIndex = getDividerIndex(list as Recents)
    return (
      <ListView
        ref={$.forwardRef}
        {...commonProps}
        data={list as Recents}
        footerEmptyDataText={`收藏你喜欢的角色/声优/团体\n追踪最新相关作品动态`}
        renderItem={renderItemRecents(dividerIndex)}
      />
    )
  }

  return (
    <ListView
      {...commonProps}
      numColumns={numColumns}
      data={list as Characters}
      renderItem={renderItem}
    />
  )
}

export default observer(List)
