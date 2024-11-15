/*
 * @Author: czy0729
 * @Date: 2022-06-06 06:10:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-12 20:55:45
 */
import React from 'react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { COLLECTIONS_ORDERBY, MODEL_COLLECTIONS_ORDERBY } from '@constants'
import { CollectionsOrderCn } from '@types'
import { Ctx } from '../../types'

function Sort() {
  const { $ } = useStore<Ctx>()
  const { order } = $.state
  return (
    <ToolBar.Popover
      data={COLLECTIONS_ORDERBY.map(item => item.label)}
      icon='md-sort'
      iconColor={_.colorDesc}
      text={order ? MODEL_COLLECTIONS_ORDERBY.getLabel<CollectionsOrderCn>(order) : '收藏时间'}
      type='desc'
      heatmap='我的.筛选选择'
      onSelect={$.onOrderSelect}
    />
  )
}

export default ob(Sort)
