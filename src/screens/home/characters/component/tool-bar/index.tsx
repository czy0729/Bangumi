/*
 * @Author: czy0729
 * @Date: 2026-09-27 07:44:19
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-09-27 07:44:19
 *
 * 角色筛选工具条: 角色定位过滤 Popover
 */
import { observer } from 'mobx-react'
import { ToolBar as ToolBarComp } from '@components'
import { useStore } from '@stores'
import { LABEL_ALL } from '../../ds'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function ToolBar() {
  const { $ } = useStore<Ctx>(COMPONENT)

  if (!$.characters.list.length) return null

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
