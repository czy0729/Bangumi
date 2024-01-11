/*
 * @Author: czy0729
 * @Date: 2022-06-04 12:18:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-01 13:58:34
 */
import React from 'react'
import { ToolBar } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { MODEL_BROWSER_SORT } from '@constants'
import { Ctx } from '../../types'

function Sort(props, { $ }: Ctx) {
  const { sort } = $.state
  return (
    <ToolBar.Popover
      data={MODEL_BROWSER_SORT.data.map(item => item.label)}
      icon='md-sort'
      iconColor={_.colorDesc}
      text={MODEL_BROWSER_SORT.getLabel(sort)}
      type='desc'
      // heatmap='索引.排序选择'
      onSelect={$.onOrderSelect}
    />
  )
}

export default obc(Sort)
