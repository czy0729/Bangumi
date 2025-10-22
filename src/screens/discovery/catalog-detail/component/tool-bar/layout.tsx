/*
 * @Author: czy0729
 * @Date: 2024-03-20 00:14:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-22 01:22:09
 */
import React from 'react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { LAYOUT_DS } from '../../ds'
import { LAYOUT_DATA } from './ds'

import type { Ctx } from '../../types'

function Layout() {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
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
  })
}

export default Layout
