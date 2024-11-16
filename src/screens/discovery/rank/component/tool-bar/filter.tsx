/*
 * @Author: czy0729
 * @Date: 2022-06-03 13:35:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 09:48:50
 */
import React from 'react'
import { ToolBar } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import {
  MODEL_RANK_ANIME_FILTER,
  MODEL_RANK_BOOK_FILTER,
  MODEL_RANK_GAME_FILTER,
  MODEL_RANK_REAL_FILTER
} from '@constants'
import { RankFilter } from '@types'
import { Ctx } from '../../types'

const DATA = {
  动画: MODEL_RANK_ANIME_FILTER,
  书籍: MODEL_RANK_BOOK_FILTER,
  游戏: MODEL_RANK_GAME_FILTER,
  三次元: MODEL_RANK_REAL_FILTER
} as const

/** 一级分类 */
function Filter() {
  const { $ } = useStore<Ctx>()
  if (!DATA[$.typeCn]) return null

  const { filter } = $.state
  const data = DATA[$.typeCn]
  const text: string = data.getLabel(filter)
  return (
    <ToolBar.Popover
      key={$.typeCn}
      data={data.data.map((item: { label: string }) => item.label)}
      text={text === '全部' ? '分类' : text}
      type={filter === '' ? undefined : 'desc'}
      onSelect={(title: RankFilter) => $.onFilterSelect(title, data)}
      heatmap='排行榜.筛选选择'
    />
  )
}

export default ob(Filter)
