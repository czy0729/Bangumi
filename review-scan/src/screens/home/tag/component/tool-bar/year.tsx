/*
 * @Author: czy0729
 * @Date: 2022-06-05 15:38:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 11:26:53
 */
import React from 'react'
import { ToolBar } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { DATA_AIRTIME } from '@constants'
import { Ctx } from '../../types'

function Year() {
  const { $ } = useStore<Ctx>()
  const { airtime } = $.state
  return (
    <ToolBar.Popover
      data={DATA_AIRTIME}
      text={airtime || '年'}
      type={airtime ? 'desc' : 'sub'}
      heatmap='用户标签.年选择'
      onSelect={$.onAirdateSelect}
    />
  )
}

export default ob(Year)
