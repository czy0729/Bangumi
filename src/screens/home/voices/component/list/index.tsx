/*
 * @Author: czy0729
 * @Date: 2020-04-28 00:24:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-22 12:00:00
 *
 * 角色列表: 本地分页 PaginationList
 */
import { observer } from 'mobx-react'
import { ITEM_VOICE_HEIGHT, ITEM_VOICE_HEIGHT_COLLECTED, PaginationList } from '@_'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  if (!$.monoVoices._loaded) return null

  const { position, outerOrder, innerOrder, status } = $.state

  return (
    <PaginationList
      // 筛选变化时重建, 回到顶部并重置页码
      key={`${outerOrder}|${innerOrder}|${position}|${status}`}
      keyExtractor={keyExtractor}
      contentContainerStyle={_.container.bottom}
      data={$.sortedMonoVoicesList}
      limit={6}
      skipEnteringExitingAnimations={4}
      // 收藏筛选下条目更矮
      estimatedItemHeight={status === '全部' ? ITEM_VOICE_HEIGHT : ITEM_VOICE_HEIGHT_COLLECTED}
      renderItem={renderItem}
      scrollEventThrottle={16}
      onScroll={$.onScroll}
      onHeaderRefresh={$.onHeaderRefresh}
      onPage={$.onPage}
    />
  )
}

export default observer(List)
