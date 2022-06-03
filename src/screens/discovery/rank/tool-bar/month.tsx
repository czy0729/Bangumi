/*
 * @Author: czy0729
 * @Date: 2022-06-03 13:34:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-03 13:35:21
 */
import React from 'react'
import { ToolBar } from '@components'
import { obc } from '@utils/decorators'
import { DATA_MONTH } from '@constants'

function Month(props, { $ }) {
  const { month } = $.state

  return (
    <ToolBar.Popover
      data={DATA_MONTH}
      text={month ? `${month}月` : '月'}
      type={month === '' ? undefined : 'desc'}
      heatmap='排行榜.月选择'
      onSelect={$.onMonthSelect}
    />
  )
}

export default obc(Month)
