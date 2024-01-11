/*
 * @Author: czy0729
 * @Date: 2022-06-04 07:05:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-01 13:58:40
 */
import React from 'react'
import { ToolBar } from '@components'
import { obc } from '@utils/decorators'
import { DATA_BROWSER_AIRTIME } from '@constants'
import { Ctx } from '../../types'

function Year(props, { $ }: Ctx) {
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

export default obc(Year)
