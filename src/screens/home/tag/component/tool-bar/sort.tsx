/*
 * @Author: czy0729
 * @Date: 2022-06-05 15:30:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 09:00:00
 *
 * 排序选择
 */
import { observer } from 'mobx-react'
import { ToolBar as ToolBarComp } from '@components'
import { _, useStore } from '@stores'
import { MODEL_TAG_ORDERBY, TAG_ORDERBY } from '@constants'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

const DATA = TAG_ORDERBY.map(item => item.label)

function Sort() {
  const { $ } = useStore<Ctx>(COMPONENT)
  const { order } = $.state

  return (
    <ToolBarComp.Popover
      data={DATA}
      icon='md-sort'
      iconColor={_.colorDesc}
      text={order ? MODEL_TAG_ORDERBY.getLabel(order) : '收藏'}
      type='desc'
      onSelect={$.onOrderSelect}
      heatmap='用户标签.排序选择'
    />
  )
}

export default observer(Sort)
