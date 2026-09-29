/*
 * @Author: czy0729
 * @Date: 2024-03-29 12:52:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-29 16:51:29
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
