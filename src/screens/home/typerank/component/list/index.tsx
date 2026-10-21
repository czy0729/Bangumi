/*
 * @Author: czy0729
 * @Date: 2023-11-01 08:51:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-21 12:00:00
 *
 * 排行榜列表: 本地分页 PaginationList, 按页拉取 OSS 快照
 */
import { observer } from 'mobx-react'
import { Empty } from '@components'
import { ITEM_SEARCH_HEIGHT, PaginationList } from '@_'
import { _, useStore } from '@stores'
import { keyExtractor, renderItem } from './utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { ids } = $.state
  if (!ids.length) return <Empty text='此标签没有足够的列表数据' />

  return (
    <PaginationList
      keyExtractor={keyExtractor}
      contentContainerStyle={_.container.bottom}
      data={ids}
      limit={12}
      // ItemSubject 主体就是 ItemSearch (额外信息以 tip 行追加), 先借用其高度估算, 实测后会自动修正
      estimatedItemHeight={ITEM_SEARCH_HEIGHT}
      renderItem={renderItem}
      onScroll={$.onScroll}
      onPage={$.fetchSubjectsFromOSS}
    />
  )
}

export default observer(List)
