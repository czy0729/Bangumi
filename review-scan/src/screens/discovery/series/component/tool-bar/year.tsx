/*
 * @Author: czy0729
 * @Date: 2022-06-05 11:48:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 08:00:35
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
      type={airtime ? 'desc' : undefined}
      onSelect={$.onAirtimeSelect}
    />
  )
}

export default ob(Year)
