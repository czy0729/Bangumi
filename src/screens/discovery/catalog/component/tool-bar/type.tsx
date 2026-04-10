/*
 * @Author: czy0729
 * @Date: 2024-07-30 11:51:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-10 00:03:59
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'
import { TYPE_DS } from '../../ds'

import type { Ctx } from '../../types'

const DATA = TYPE_DS.map(item => item.title)

function Type({ type }) {
  const { $ } = useStore<Ctx>()

  return (
    <ToolBar.Popover
      data={DATA}
      icon='icon-more-grid'
      iconColor={_.colorDesc}
      text={type}
      type='desc'
      onSelect={$.onToggleType}
    />
  )
}

export default observer(Type)
