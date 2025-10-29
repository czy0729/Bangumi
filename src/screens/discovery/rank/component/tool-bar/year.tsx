/*
 * @Author: czy0729
 * @Date: 2022-06-03 13:33:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 09:54:45
 */
import React from 'react'
import { ToolBar } from '@components'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { DATA_AIRTIME } from '@constants'

import type { Ctx } from '../../types'

/** 年 */
function Year() {
  const { $ } = useStore<Ctx>()

  return useObserver(() => (
    <ToolBar.Popover
      data={DATA_AIRTIME}
      text={$.airtime || '时间'}
      type={$.airtime === '' ? undefined : 'desc'}
      onSelect={$.onAirdateSelect}
      heatmap='排行榜.年选择'
    />
  ))
}

export default Year
