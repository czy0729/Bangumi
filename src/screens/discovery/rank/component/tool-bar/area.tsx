/*
 * @Author: czy0729
 * @Date: 2024-10-22 07:08:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 09:46:11
 */
import React from 'react'
import { ToolBar } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { DATA_ANIME_AREA, DATA_REAL_AREA } from '@constants'
import { Ctx } from '../../types'

const DATA = {
  动画: DATA_ANIME_AREA,
  三次元: DATA_REAL_AREA
} as const

/** 地区 */
function Area() {
  const { $ } = useStore<Ctx>()
  const data = DATA[$.typeCn]
  if (!data) return null

  return (
    <ToolBar.Popover
      key={$.typeCn}
      data={data}
      text={$.area || '地区'}
      type={$.area === '' ? undefined : 'desc'}
      onSelect={$.onAreaSelect}
      heatmap='排行榜.地区选择'
    />
  )
}

export default ob(Area)
