/*
 * @Author: czy0729
 * @Date: 2022-06-05 15:44:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 09:00:00
 *
 * 月选择 (需先选年)
 */
import { observer } from 'mobx-react'
import { ToolBar } from '@components'
import { useStore } from '@stores'
import { DATA_MONTH } from '@constants'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function Month() {
  const { $ } = useStore<Ctx>(COMPONENT)
  const { month } = $.state

  return (
    <ToolBar.Popover
      data={DATA_MONTH}
      text={month ? `${month}月` : '月'}
      type={month ? 'desc' : 'sub'}
      heatmap='用户标签.月选择'
      onSelect={$.onMonthSelect}
    />
  )
}

export default observer(Month)
