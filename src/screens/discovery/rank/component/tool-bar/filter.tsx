/*
 * @Author: czy0729
 * @Date: 2022-06-03 13:35:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-25 05:22:12
 */
import React from 'react'
import { ToolBar } from '@components'
import { obc } from '@utils/decorators'
import {
  MODEL_RANK_ANIME_FILTER,
  MODEL_RANK_BOOK_FILTER,
  MODEL_RANK_GAME_FILTER,
  MODEL_RANK_REAL_FILTER,
  MODEL_SUBJECT_TYPE
} from '@constants'
import { ModelType, SubjectTypeCn } from '@types'
import { Ctx } from '../../types'

function Filter(props, { $ }: Ctx) {
  const typeCn = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>($.state.type)
  if (typeCn === '音乐') return null

  const { filter } = $.state
  let filterData: ModelType
  switch (typeCn) {
    case '书籍':
      filterData = MODEL_RANK_BOOK_FILTER
      break

    case '游戏':
      filterData = MODEL_RANK_GAME_FILTER
      break

    case '三次元':
      filterData = MODEL_RANK_REAL_FILTER
      break

    default:
      filterData = MODEL_RANK_ANIME_FILTER
      break
  }
  const filterCn = filterData.getLabel(filter)

  return (
    <ToolBar.Popover
      key={typeCn}
      data={filterData.data.map((item: { label: any }) => item.label)}
      text={filterCn === '全部' ? '类型' : filterCn}
      type={filter === '' ? undefined : 'desc'}
      heatmap='排行榜.筛选选择'
      onSelect={(title: string) => $.onFilterSelect(title, filterData)}
    />
  )
}

export default obc(Filter)
