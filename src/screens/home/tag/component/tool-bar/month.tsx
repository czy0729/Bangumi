/*
 * @Author: czy0729
 * @Date: 2022-06-05 15:44:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-18 13:32:51
 */
import React from 'react'
import { ToolBar } from '@components'
import { obc } from '@utils/decorators'
import { DATA_MONTH } from '@constants'
import { Ctx } from '../../types'

function Month(_props, { $ }: Ctx) {
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

export default obc(Month)
