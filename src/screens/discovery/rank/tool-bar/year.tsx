/*
 * @Author: czy0729
 * @Date: 2022-06-03 13:33:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-03 13:34:11
 */
import React from 'react'
import { ToolBar } from '@components'
import { obc } from '@utils/decorators'
import { DATA_AIRTIME } from '@constants'

function Year(props, { $ }) {
  const { airtime } = $.state
  return (
    <ToolBar.Popover
      data={DATA_AIRTIME}
      text={airtime || '年'}
      type={airtime === '' ? undefined : 'desc'}
      heatmap='排行榜.年选择'
      onSelect={$.onAirdateSelect}
    />
  )
}

export default obc(Year)
