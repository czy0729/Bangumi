/*
 * @Author: czy0729
 * @Date: 2022-06-05 11:48:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 08:00:35
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
      type={airtime ? 'desc' : undefined}
      onSelect={$.onAirtimeSelect}
    />
  )
}

export default observer(Year)
