/*
 * @Author: czy0729
 * @Date: 2022-06-06 06:10:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-31 11:18:57
 */
import React from 'react'
import { ToolBar } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { MODEL_COLLECTIONS_ORDERBY, COLLECTIONS_ORDERBY } from '@constants'
import { CollectionsOrderCn } from '@types'
import { Ctx } from '../../types'

function Sort(props, { $ }: Ctx) {
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

export default obc(Sort)
