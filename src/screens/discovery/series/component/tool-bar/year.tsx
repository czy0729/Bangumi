/*
 * @Author: czy0729
 * @Date: 2022-06-05 11:48:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-05 13:49:38
 */
import React from 'react'
import { ToolBar } from '@components'
import { obc } from '@utils/decorators'
import { DATA_AIRTIME } from '@constants'
import { Ctx } from '../../types'

function Year(props, { $ }: Ctx) {
  const { airtime } = $.state
  return (
    <ToolBar.Popover
      data={DATA_AIRTIME}
      text={airtime || '年'}
      type={airtime ? 'desc' : undefined}
      onSelect={$.onAirtimeSelect}
    />
  )
}

export default obc(Year)
