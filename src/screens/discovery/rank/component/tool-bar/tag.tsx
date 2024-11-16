/*
 * @Author: czy0729
 * @Date: 2024-10-22 07:08:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 09:53:13
 */
import React from 'react'
import { ToolBar } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { DATA_ANIME_TAG, DATA_GAME_TAG } from '@constants'
import { Ctx } from '../../types'

const DATA = {
  动画: DATA_ANIME_TAG,
  游戏: DATA_GAME_TAG
} as const

/** 类型 */
function Tag() {
  const { $ } = useStore<Ctx>()
  const data = DATA[$.typeCn]
  if (!data) return null

  return (
    <ToolBar.Popover
      key={$.typeCn}
      data={data}
      text={$.tag || '类型'}
      type={$.tag === '' ? undefined : 'desc'}
      onSelect={$.onTagSelect}
      heatmap='排行榜.类型选择'
    />
  )
}

export default ob(Tag)
