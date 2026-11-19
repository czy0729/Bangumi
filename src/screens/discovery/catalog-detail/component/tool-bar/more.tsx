/*
 * @Author: czy0729
 * @Date: 2026-11-20 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-20 12:00:00
 *
 * 工具栏设置菜单 (布局 / 顺序)
 */
import { observer } from 'mobx-react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'
import { COMPONENT_MORE } from './ds'

import type { Ctx } from '../../types'

function More() {
  const { $ } = useStore<Ctx>(COMPONENT_MORE)

  return (
    <ToolBar.Popover
      data={$.toolBar}
      icon='md-more-vert'
      iconColor={_.colorDesc}
      iconSize={17}
      type='desc'
      transparent
      onSelect={$.onToolBar}
    />
  )
}

export default observer(More)
