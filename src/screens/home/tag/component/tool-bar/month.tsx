/*
 * @Author: czy0729
 * @Date: 2022-06-05 15:44:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-13 06:19:26
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ToolBar } from '@components'
import { useStore } from '@stores'
import { DATA_MONTH } from '@constants'

import type { Ctx } from '../../types'

function Month() {
  const { $ } = useStore<Ctx>()
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
