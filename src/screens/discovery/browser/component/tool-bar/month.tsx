/*
 * @Author: czy0729
 * @Date: 2022-06-04 07:06:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 06:58:46
 */
import React from 'react'
import { ToolBar } from '@components'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { DATA_MONTH } from './ds'

import type { Ctx } from '../../types'

function Month() {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const { month } = $.state

    return (
      <ToolBar.Popover
        data={DATA_MONTH}
        text={`${month}月` || '月'}
        type='desc'
        heatmap='索引.月选择'
        onSelect={$.onMonthSelect}
      />
    )
  })
}

export default Month
