/*
 * @Author: czy0729
 * @Date: 2021-07-15 17:28:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-28 00:00:00
 *
 * 影评列表
 */
import { observer } from 'mobx-react'
import { ListView } from '@components'
import { EmptyCompact } from '@_'
import { _, useStore } from '@stores'
import { ITEM_HEIGHT } from '../item/ds'
import { keyExtractor, renderItem } from './utils'
import { COMPONENT, ENTERING_ANIMATIONS_NUM } from './ds'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { list, _loaded } = $.reviews
  if (_loaded && !list.length) return <EmptyCompact />

  return (
    <ListView
      keyExtractor={keyExtractor}
      contentContainerStyle={_.container.bottom}
      estimatedItemHeight={ITEM_HEIGHT}
      skipEnteringExitingAnimations={ENTERING_ANIMATIONS_NUM}
      data={$.reviews}
      renderItem={renderItem}
      onScroll={$.onScroll}
      onHeaderRefresh={$.onHeaderRefresh}
      onFooterRefresh={$.fetchReviews}
    />
  )
}

export default observer(List)
