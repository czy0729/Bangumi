/*
 * @Author: czy0729
 * @Date: 2020-04-28 00:24:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 09:00:00
 *
 * 角色列表: 本地分页 PaginationList
 */
import { observer } from 'mobx-react'
import { PaginationList } from '@_'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  if (!$.monoVoices._loaded) return null

  const { position, outerOrder, innerOrder } = $.state

  return (
    <PaginationList
      // 排序 / 职位变化后整批重建, 回到顶部并从第 1 页开始
      key={`${outerOrder}|${innerOrder}|${position}`}
      keyExtractor={keyExtractor}
      contentContainerStyle={_.container.bottom}
      data={$.sortedMonoVoicesList}
      limit={6}
      renderItem={renderItem}
      scrollEventThrottle={16}
      onScroll={$.onScroll}
      onHeaderRefresh={$.onHeaderRefresh}
      onPage={$.onPage}
    />
  )
}

export default observer(List)
