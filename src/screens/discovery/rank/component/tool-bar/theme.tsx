/*
 * @Author: czy0729
 * @Date: 2024-10-22 07:08:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-22 07:14:15
 */
import React from 'react'
import { ToolBar } from '@components'
import { obc } from '@utils/decorators'
import { DATA_THEME } from '@constants'
import { Ctx } from '../../types'

const DATA = {
  三次元: DATA_THEME
} as const

/** 题材 */
function Theme(_props, { $ }: Ctx) {
  const data = DATA[$.typeCn]
  if (!data) return null

  return (
    <ToolBar.Popover
      key={$.typeCn}
      data={data}
      text={$.theme || '题材'}
      type={$.theme === '' ? undefined : 'desc'}
      onSelect={$.onThemeSelect}
      heatmap='排行榜.题材选择'
    />
  )
}

export default obc(Theme)
