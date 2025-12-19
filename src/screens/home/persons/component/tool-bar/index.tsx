/*
 * @Author: czy0729
 * @Date: 2024-10-04 20:14:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-19 17:14:22
 */
import React from 'react'
import { ToolBar as ToolBarComp } from '@components'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function ToolBar() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
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
  })
}

export default ToolBar
