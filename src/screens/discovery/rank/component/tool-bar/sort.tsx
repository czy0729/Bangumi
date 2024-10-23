/*
 * @Author: czy0729
 * @Date: 2024-10-20 09:31:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-20 10:56:55
 */
import React from 'react'
import { ToolBar } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { MODEL_TAG_ORDERBY, TAG_ORDERBY } from '@constants'
import { Ctx } from '../../types'

const DATA = TAG_ORDERBY.map(item => item.label)

/** 排序 */
function Sort(_props, { $ }: Ctx) {
  const { sort } = $.state
  return (
    <ToolBar.Popover
      data={DATA}
      icon='md-sort'
      iconColor={_.colorDesc}
      text={sort ? MODEL_TAG_ORDERBY.getLabel(sort) : '收藏'}
      type='desc'
      onSelect={$.onSortSelect}
      heatmap='排行榜.排序选择'
    />
  )
}

export default obc(Sort)
