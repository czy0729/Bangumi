/*
 * @Author: czy0729
 * @Date: 2022-06-04 12:18:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 06:59:12
 */
import React from 'react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { MODEL_BROWSER_SORT } from '@constants'
import { Ctx } from '../../types'

function Sort() {
  const { $ } = useStore<Ctx>()
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

export default ob(Sort)
