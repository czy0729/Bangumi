/*
 * @Author: czy0729
 * @Date: 2022-06-04 07:06:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-10 10:20:00
 *
 * 月选择
 */
import { observer } from 'mobx-react'
import { ToolBar } from '@components'
import { useStore } from '@stores'
import { DATA_MONTH } from './ds'

import type { Ctx } from '../../types'

function Month() {
  const { $ } = useStore<Ctx>()

  return (
    <ToolBar.Popover
      data={DATA_MONTH}
      text={`${$.state.month}月`}
      type='desc'
      heatmap='索引.月选择'
      onSelect={$.onMonthSelect}
    />
  )
}

export default observer(Month)
