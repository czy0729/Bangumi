/*
 * @Author: czy0729
 * @Date: 2024-10-04 20:14:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-19 17:14:22
 *
 * 制作人员筛选工具条: 职位过滤 Popover
 */
import { observer } from 'mobx-react'
import { ToolBar as ToolBarComp } from '@components'
import { useStore } from '@stores'
import { LABEL_ALL } from '../../ds'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function ToolBar() {
  const { $ } = useStore<Ctx>(COMPONENT)

  if (!$.persons.list.length) return null

  // 选中项计数从 filters 实时解析, 数据刷新后计数与文案保持最新
  const item = $.filters.find(item => item.title === $.state.position) || $.filters[0]

  return (
    <ToolBarComp>
      <ToolBarComp.Popover
        data={$.filters.map(item => `${item.title} (${item.value})`)}
        text={`${item.title} (${item.value})`}
        onSelect={(_, index) => $.onFilterSelect($.filters[index]?.title ?? LABEL_ALL)}
      />
    </ToolBarComp>
  )
}

export default observer(ToolBar)
