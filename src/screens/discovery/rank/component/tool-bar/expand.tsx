/*
 * @Author: czy0729
 * @Date: 2022-06-06 08:38:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-22 07:25:32
 */
import React from 'react'
import { ToolBar } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'

function Expand(_props, { $ }: Ctx) {
  return (
    <ToolBar.Icon
      icon={$.state.expand ? 'md-keyboard-arrow-up' : 'md-keyboard-arrow-down'}
      onSelect={$.onExpand}
    />
  )
}

export default obc(Expand)
