/*
 * @Author: czy0729
 * @Date: 2024-03-20 00:14:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-11 12:00:00
 *
 * 布局切换
 */
import { observer } from 'mobx-react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'
import { LAYOUT_DS } from '../../ds'
import { COMPONENT_LAYOUT, LAYOUT_DATA } from './ds'

import type { Ctx } from '../../types'

function Layout() {
  const { $ } = useStore<Ctx>(COMPONENT_LAYOUT)

  const text = LAYOUT_DS.find(item => item.key === $.state.layout)?.title

  return (
    <ToolBar.Popover
      data={LAYOUT_DATA}
      value={text}
      icon={$.state.layout === 'grid' ? 'md-grid-view' : 'md-menu'}
      iconColor={_.colorDesc}
      iconSize={17}
      text={text}
      type='desc'
      onSelect={$.onSwitchLayout}
    />
  )
}

export default observer(Layout)
