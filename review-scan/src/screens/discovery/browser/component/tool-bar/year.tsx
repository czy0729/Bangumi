/*
 * @Author: czy0729
 * @Date: 2022-06-04 07:05:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 06:59:18
 */
import React from 'react'
import { ToolBar } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { DATA_BROWSER_AIRTIME } from '@constants'
import { Ctx } from '../../types'

function Year() {
  const { $ } = useStore<Ctx>()
  const { airtime } = $.state
  return (
    <ToolBar.Popover
      data={DATA_BROWSER_AIRTIME}
      text={airtime || '年'}
      type='desc'
      heatmap='索引.年选择'
      onSelect={$.onAirdateSelect}
    />
  )
}

export default ob(Year)
