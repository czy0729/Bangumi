/*
 * @Author: czy0729
 * @Date: 2024-10-18 03:24:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-18 03:25:20
 */
import React from 'react'
import { ToolBar } from '@components'
import { obc } from '@utils/decorators'
import { DATA_META } from '@constants'
import { Ctx } from '../../types'

function Meta(_props, { $ }: Ctx) {
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

export default obc(Meta)
