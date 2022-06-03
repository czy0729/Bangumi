/*
 * @Author: czy0729
 * @Date: 2022-06-03 13:35:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-03 13:36:33
 */
/*
 * @Author: czy0729
 * @Date: 2019-06-08 04:35:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-03 13:35:41
 */
import React from 'react'
import { ToolBar } from '@components'
import { obc } from '@utils/decorators'
import {
  MODEL_SUBJECT_TYPE,
  MODEL_RANK_ANIME_FILTER,
  MODEL_RANK_BOOK_FILTER,
  MODEL_RANK_GAME_FILTER,
  MODEL_RANK_REAL_FILTER
} from '@constants'

function Filter(props, { $ }) {
  const { type, filter } = $.state
  const typeCn = MODEL_SUBJECT_TYPE.getTitle(type)
  let filterData
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
    typeCn !== '音乐' && (
      <ToolBar.Popover
        data={filterData.data.map(item => item.label)}
        text={filterCn === '全部' ? '类型' : filterCn}
        type={filter === '' ? undefined : 'desc'}
        heatmap='排行榜.筛选选择'
        onSelect={title => $.onFilterSelect(title, filterData)}
      />
    )
  )
}

export default obc(Filter)
