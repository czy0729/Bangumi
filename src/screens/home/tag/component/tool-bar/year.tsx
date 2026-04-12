/*
 * @Author: czy0729
 * @Date: 2022-06-05 15:38:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-13 06:20:04
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ToolBar } from '@components'
import { useStore } from '@stores'
import { DATA_AIRTIME } from '@constants'

import type { Ctx } from '../../types'

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

export default observer(Year)
