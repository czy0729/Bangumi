/*
 * @Author: czy0729
 * @Date: 2022-06-06 06:10:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-13 20:55:19
 */
import React, { useMemo } from 'react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { COLLECTIONS_ORDERBY, MODEL_COLLECTIONS_ORDERBY } from '@constants'
import { CollectionsOrderCn } from '@types'
import { Ctx } from '../../types'

function Sort() {
  const { $ } = useStore<Ctx>()
  const memoData = useMemo(() => COLLECTIONS_ORDERBY.map(item => item.label), [])

  return useObserver(() => {
    const { order } = $.state
    return (
      <ToolBar.Popover
        data={memoData}
        icon='md-sort'
        iconColor={_.colorDesc}
        text={order ? MODEL_COLLECTIONS_ORDERBY.getLabel<CollectionsOrderCn>(order) : '收藏时间'}
        type='desc'
        heatmap='我的.筛选选择'
        onSelect={$.onOrderSelect}
      />
    )
  })
}

export default Sort
