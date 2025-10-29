/*
 * @Author: czy0729
 * @Date: 2024-10-22 07:08:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 09:46:11
 */
import React from 'react'
import { ToolBar } from '@components'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { DATA_AREA } from './ds'

import type { Ctx } from '../../types'

/** 地区 */
function Area() {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const typeCn = $.typeCn as '动画' | '三次元'
    const data = DATA_AREA[typeCn]
    if (!data) return null

    return (
      <ToolBar.Popover
        key={typeCn}
        data={data}
        text={$.area || '地区'}
        type={$.area === '' ? undefined : 'desc'}
        onSelect={$.onAreaSelect}
        heatmap='排行榜.地区选择'
      />
    )
  })
}

export default Area
