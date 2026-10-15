/*
 * @Author: czy0729
 * @Date: 2023-06-10 05:40:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-15 12:00:00
 *
 * 列表
 */
import { observer } from 'mobx-react'
import { PaginationList } from '@_'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { ITEM_HEIGHT } from '../item/ds'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  if (!$.state._loaded) return null

  // 还没产出数据时不渲染列表, 占位由 Page 的 Loading 承担, 避免 ListView 提前显示空数据文案
  if ($.isInitialLoading) return null

  return (
    <PaginationList
      key={$.state.type}
      keyExtractor={keyExtractor}
      contentContainerStyle={_.container.bottom}
      estimatedItemHeight={ITEM_HEIGHT}
      data={$.list}
      limit={12}
      skipEnteringExitingAnimations={4}
      renderItem={renderItem}
      onScroll={$.onScroll}
      onPage={$.onPage}
      onNextPage={$.onNextPage}
      onHeaderRefresh={$.onHeaderRefresh}
    />
  )
}

export default observer(List)
