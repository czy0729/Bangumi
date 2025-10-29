/*
 * @Author: czy0729
 * @Date: 2024-10-22 07:08:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 09:53:13
 */
import React from 'react'
import { ToolBar } from '@components'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { DATA_TAG } from './ds'

import type { Ctx } from '../../types'

/** 类型 */
function Tag() {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const typeCn = $.typeCn as '动画' | '游戏'
    const data = DATA_TAG[typeCn]
    if (!data) return null

    return (
      <ToolBar.Popover
        key={typeCn}
        data={data}
        text={$.tag || '类型'}
        type={$.tag === '' ? undefined : 'desc'}
        onSelect={$.onTagSelect}
        heatmap='排行榜.类型选择'
      />
    )
  })
}

export default Tag
