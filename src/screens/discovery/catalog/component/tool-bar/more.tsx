/*
 * @Author: czy0729
 * @Date: 2024-07-30 20:26:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-10 00:01:00
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'

import type { Ctx } from '../../types'

function More() {
  const { $ } = useStore<Ctx>()

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
