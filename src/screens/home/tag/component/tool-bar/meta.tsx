/*
 * @Author: czy0729
 * @Date: 2024-10-18 03:24:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-13 06:19:04
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ToolBar } from '@components'
import { useStore } from '@stores'
import { DATA_META } from '@constants'

import type { Ctx } from '../../types'

function Meta() {
  const { $ } = useStore<Ctx>()
  const { meta } = $.state

  return (
    <ToolBar.Popover
      data={DATA_META}
      text={meta ? '公共标签' : '用户标签'}
      type={meta ? 'desc' : 'sub'}
      heatmap='用户标签.公共标签'
      onSelect={$.onMetaSelect}
    />
  )
}

export default observer(Meta)
