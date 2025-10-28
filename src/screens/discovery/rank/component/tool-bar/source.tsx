/*
 * @Author: czy0729
 * @Date: 2024-10-19 17:18:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 09:53:04
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { ToolBar } from '@components'
import { useStore } from '@stores'
import { DATA_SOURCE } from './ds'

import type { Ctx } from '../../types'

/** 来源 */
function Source() {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const typeCn = $.typeCn as '动画'
    const data = DATA_SOURCE[typeCn]
    if (!data) return null

    return (
      <ToolBar.Popover
        key={typeCn}
        data={data}
        text={$.source || '来源'}
        type={$.source === '' ? undefined : 'desc'}
        onSelect={$.onSourceSelect}
        heatmap='排行榜.来源选择'
      />
    )
  })
}

export default Source
