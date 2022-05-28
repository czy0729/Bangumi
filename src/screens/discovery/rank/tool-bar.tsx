/*
 * @Author: czy0729
 * @Date: 2019-06-08 04:35:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-28 13:29:48
 */
import React from 'react'
import { ToolBar as CompToolBar } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { DATA_AIRTIME, DATA_MONTH } from '@constants'
import {
  MODEL_SUBJECT_TYPE,
  MODEL_RANK_ANIME_FILTER,
  MODEL_RANK_BOOK_FILTER,
  MODEL_RANK_GAME_FILTER,
  MODEL_RANK_REAL_FILTER
} from '@constants/model'

const typeData = MODEL_SUBJECT_TYPE.data.map(item => item.title)

function ToolBar(props, { $ }) {
  const { type, filter, airtime, month, list, fixed, collected } = $.state
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
    <CompToolBar>
      <CompToolBar.Popover
        data={typeData}
        icon='md-filter-list'
        iconColor={_.colorDesc}
        text={typeCn}
        type='desc'
        heatmap='排行榜.类型选择'
        onSelect={$.onTypeSelect}
      />
      <CompToolBar.Popover
        data={DATA_AIRTIME}
        text={airtime || '年'}
        type={airtime === '' ? undefined : 'desc'}
        heatmap='排行榜.年选择'
        onSelect={$.onAirdateSelect}
      />
      <CompToolBar.Popover
        data={DATA_MONTH}
        text={month ? `${month}月` : '月'}
        type={month === '' ? undefined : 'desc'}
        heatmap='排行榜.月选择'
        onSelect={$.onMonthSelect}
      />
      {typeCn !== '音乐' && (
        <CompToolBar.Popover
          data={filterData.data.map(item => item.label)}
          text={filterCn === '全部' ? '类型' : filterCn}
          type={filter === '' ? undefined : 'desc'}
          heatmap='排行榜.筛选选择'
          onSelect={title => $.onFilterSelect(title, filterData)}
        />
      )}
      <CompToolBar.Popover
        data={[
          `工具栏 · ${fixed ? '固定' : '浮动'}`,
          `布　局 · ${list ? '列表' : '网格'}`,
          `已收藏 · ${collected ? '显示' : '隐藏'}`
        ]}
        icon='md-more-vert'
        iconColor={_.colorDesc}
        iconSize={20}
        type='desc'
        transparent
        onSelect={title => {
          if (title.includes('布　局')) {
            $.toggleList()
          } else if (title.includes('工具栏')) {
            $.toggleFixed()
          } else if (title.includes('已收藏：')) {
            $.toggleCollected()
          }
        }}
      />
    </CompToolBar>
  )
}

export default obc(ToolBar)
