/*
 * @Author: czy0729
 * @Date: 2024-10-22 07:08:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 09:54:05
 */
import React from 'react'
import { ToolBar } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { DATA_THEME } from '@constants'
import { Ctx } from '../../types'

const DATA = {
  三次元: DATA_THEME
} as const

/** 题材 */
function Theme() {
  const { $ } = useStore<Ctx>()
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

export default ob(Theme)
