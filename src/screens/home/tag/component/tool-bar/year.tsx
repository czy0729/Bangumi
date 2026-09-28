/*
 * @Author: czy0729
 * @Date: 2022-06-05 15:38:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 09:00:00
 *
 * 年选择
 */
import { observer } from 'mobx-react'
import { ToolBar } from '@components'
import { useStore } from '@stores'
import { DATA_AIRTIME } from '@constants'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function Year() {
  const { $ } = useStore<Ctx>(COMPONENT)
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
