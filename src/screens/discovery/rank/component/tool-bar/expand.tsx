/*
 * @Author: czy0729
 * @Date: 2022-06-06 08:38:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 09:47:07
 */
import React from 'react'
import { ToolBar } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'

function Expand() {
  const { $ } = useStore<Ctx>()
  return (
    <ToolBar.Icon
      icon={$.state.expand ? 'md-keyboard-arrow-up' : 'md-keyboard-arrow-down'}
      onSelect={$.onExpand}
    />
  )
}

export default ob(Expand)
