/*
 * @Author: czy0729
 * @Date: 2024-10-22 07:08:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 09:54:05
 */
import React from 'react'
import { ToolBar } from '@components'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { DATA_THEME } from './ds'

import type { Ctx } from '../../types'

/** 题材 */
function Theme() {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const typeCn = $.typeCn as '三次元'
    const data = DATA_THEME[typeCn]
    if (!data) return null

    return (
      <ToolBar.Popover
        key={typeCn}
        data={data}
        text={$.theme || '题材'}
        type={$.theme === '' ? undefined : 'desc'}
        onSelect={$.onThemeSelect}
        heatmap='排行榜.题材选择'
      />
    )
  })
}

export default Theme
