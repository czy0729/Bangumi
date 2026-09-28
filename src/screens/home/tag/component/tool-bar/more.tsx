/*
 * @Author: czy0729
 * @Date: 2022-06-05 15:46:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 09:00:00
 *
 * 工具栏设置菜单 (固定 / 布局 / 显示收藏)
 */
import { observer } from 'mobx-react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function More() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return (
    <ToolBar.Popover
      data={$.toolBar}
      icon='md-more-vert'
      iconColor={_.colorDesc}
      iconSize={16}
      type='desc'
      transparent
      onSelect={$.onToolBar}
    />
  )
}

export default observer(More)
