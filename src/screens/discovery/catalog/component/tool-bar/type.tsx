/*
 * @Author: czy0729
 * @Date: 2024-07-30 11:51:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 07:11:57
 */
import React from 'react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { TYPE_DS } from '../../ds'

import type { Ctx } from '../../types'

const DATA = TYPE_DS.map(item => item.title)

function Type({ type }) {
  const { $ } = useStore<Ctx>()

  return useObserver(() => (
    <ToolBar.Popover
      data={DATA}
      icon='icon-more-grid'
      iconColor={_.colorDesc}
      text={type}
      type='desc'
      onSelect={$.onToggleType}
    />
  ))
}

export default Type
