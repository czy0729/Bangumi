/*
 * @Author: czy0729
 * @Date: 2024-10-04 20:14:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-04 21:30:15
 */
import React from 'react'
import { ToolBar as ToolBarComp } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'

function ToolBar(_props, { $ }: Ctx) {
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

export default obc(ToolBar, COMPONENT)
