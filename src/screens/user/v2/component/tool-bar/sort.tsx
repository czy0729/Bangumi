/*
 * @Author: czy0729
 * @Date: 2022-06-06 06:10:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-12 03:59:40
 */
import { useMemo } from 'react'
import { observer } from 'mobx-react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'
import { COLLECTIONS_ORDERBY, MODEL_COLLECTIONS_ORDERBY } from '@constants'

import type { CollectionsOrderCn } from '@types'
import type { Ctx } from '../../types'

function Sort() {
  const { $ } = useStore<Ctx>()

  const memoData = useMemo(() => COLLECTIONS_ORDERBY.map(item => item.label), [])

  const { order, scoreFetching } = $.state

  return (
    <ToolBar.Popover
      data={memoData}
      value={order ? MODEL_COLLECTIONS_ORDERBY.getLabel<CollectionsOrderCn>(order) : '收藏时间'}
      icon='md-sort'
      iconColor={_.colorDesc}
      text={order ? MODEL_COLLECTIONS_ORDERBY.getLabel<CollectionsOrderCn>(order) : '收藏时间'}
      loading={scoreFetching}
      type='desc'
      disabled={scoreFetching}
      heatmap='我的.筛选选择'
      onSelect={$.onOrderSelect}
    />
  )
}

export default observer(Sort)
