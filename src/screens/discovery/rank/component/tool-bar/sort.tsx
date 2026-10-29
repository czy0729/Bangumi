/*
 * @Author: czy0729
 * @Date: 2024-10-20 09:31:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 09:50:23
 *
 * 工具栏: 排序
 */
import { observer } from 'mobx-react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'
import { rc } from '@utils/dev'
import { MODEL_TAG_ORDERBY } from '@constants'
import { COMPONENT as PARENT, DATA_SORT } from './ds'

import type { Ctx } from '../../types'

const COMPONENT = rc(PARENT, 'Sort')

/** 排序 */
function Sort() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { sort } = $.state

  return (
    <ToolBar.Popover
      data={DATA_SORT}
      value={sort ? MODEL_TAG_ORDERBY.getLabel(sort) : '收藏'}
      icon='md-sort'
      iconColor={_.colorDesc}
      text={sort ? MODEL_TAG_ORDERBY.getLabel(sort) : '收藏'}
      type='desc'
      onSelect={$.onSortSelect}
      heatmap='排行榜.排序选择'
    />
  )
}

export default observer(Sort)
