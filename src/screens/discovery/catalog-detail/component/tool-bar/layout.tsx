/*
 * @Author: czy0729
 * @Date: 2024-03-20 00:14:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 07:23:51
 */
import React from 'react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { LAYOUT_DS } from '../../ds'
import { Ctx } from '../../types'
import { LAYOUT_DATA } from './ds'

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

export default ob(Layout)
