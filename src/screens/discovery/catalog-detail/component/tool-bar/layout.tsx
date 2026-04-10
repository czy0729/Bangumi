/*
 * @Author: czy0729
 * @Date: 2024-03-20 00:14:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-10 05:06:59
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'
import { LAYOUT_DS } from '../../ds'
import { LAYOUT_DATA } from './ds'

import type { Ctx } from '../../types'

function Layout() {
  const { $ } = useStore<Ctx>()

  const text = LAYOUT_DS.find(item => item.key === $.state.layout)?.['title']

  return (
    <ToolBar.Popover
      data={LAYOUT_DATA}
      icon={text === '网格' ? 'md-grid-view' : 'md-menu'}
      iconColor={_.colorDesc}
      iconSize={17}
      text={text}
      type='desc'
      onSelect={$.onSwitchLayout}
    />
  )
}

export default observer(Layout)
