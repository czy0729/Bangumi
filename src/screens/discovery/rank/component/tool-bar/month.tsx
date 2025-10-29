/*
 * @Author: czy0729
 * @Date: 2022-06-03 13:34:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 09:49:19
 */
import React from 'react'
import { ToolBar } from '@components'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { DATA_MONTH } from '@constants'

import type { Ctx } from '../../types'

/** 月 */
function Month() {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    if (!$.airtime) return null

    return (
      <ToolBar.Popover
        data={DATA_MONTH}
        text={$.month ? `${$.month}月` : '月'}
        type={$.month === '' ? undefined : 'desc'}
        onSelect={$.onMonthSelect}
        heatmap='排行榜.月选择'
      />
    )
  })
}

export default Month
