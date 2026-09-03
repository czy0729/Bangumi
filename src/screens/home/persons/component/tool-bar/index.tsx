/*
 * @Author: czy0729
 * @Date: 2024-10-04 20:14:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-19 17:14:22
 *
 * 制作人员筛选工具条: 职位过滤 Popover
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ToolBar as ToolBarComp } from '@components'
import { useStore } from '@stores'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function ToolBar() {
  const { $ } = useStore<Ctx>(COMPONENT)

  if (!$.filters.length) return null

  let text = $.state.position
  if (!text) {
    const item = $.filters[0]
    text = `${item.title} (${item.value})`
  }

  return (
    <ToolBarComp>
      <ToolBarComp.Popover
        data={$.filters.map(item => `${item.title} (${item.value})`)}
        text={text}
        onSelect={$.onFilterSelect}
      />
    </ToolBarComp>
  )
}

export default observer(ToolBar)
