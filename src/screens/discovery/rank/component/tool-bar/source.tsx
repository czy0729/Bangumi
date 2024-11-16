/*
 * @Author: czy0729
 * @Date: 2024-10-19 17:18:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 09:53:04
 */
import React from 'react'
import { ToolBar } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { DATA_SOURCE } from '@constants'
import { Ctx } from '../../types'

const DATA = {
  动画: DATA_SOURCE
} as const

/** 来源 */
function Source() {
  const { $ } = useStore<Ctx>()
  const data = DATA[$.typeCn]
  if (!data) return null

  return (
    <ToolBar.Popover
      key={$.typeCn}
      data={data}
      text={$.source || '来源'}
      type={$.source === '' ? undefined : 'desc'}
      onSelect={$.onSourceSelect}
      heatmap='排行榜.来源选择'
    />
  )
}

export default ob(Source)
