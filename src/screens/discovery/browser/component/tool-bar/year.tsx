/*
 * @Author: czy0729
 * @Date: 2022-06-04 07:05:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-10 10:20:00
 *
 * 年选择
 */
import { observer } from 'mobx-react'
import { ToolBar } from '@components'
import { useStore } from '@stores'
import { DATA_BROWSER_AIRTIME } from '@constants'

import type { Ctx } from '../../types'

function Year() {
  const { $ } = useStore<Ctx>()

  return (
    <ToolBar.Popover
      data={DATA_BROWSER_AIRTIME}
      text={$.state.airtime || '年'}
      type='desc'
      heatmap='索引.年选择'
      onSelect={$.onAirdateSelect}
    />
  )
}

export default observer(Year)
