/*
 * @Author: czy0729
 * @Date: 2022-06-06 06:10:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-06 06:21:05
 */
import React from 'react'
import { ToolBar } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { MODEL_COLLECTIONS_ORDERBY } from '@constants'

function Sort(props, { $ }) {
  const { order } = $.state
  return (
    <ToolBar.Popover
      data={MODEL_COLLECTIONS_ORDERBY.data.map(item => item.label)}
      icon='md-sort'
      iconColor={_.colorDesc}
      text={order ? MODEL_COLLECTIONS_ORDERBY.getLabel(order) : '收藏时间'}
      type='desc'
      heatmap='我的.筛选选择'
      onSelect={$.onOrderSelect}
    />
  )
}

export default obc(Sort)
