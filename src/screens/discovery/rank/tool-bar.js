/*
 * @Author: czy0729
 * @Date: 2019-06-08 04:35:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-28 01:12:24
 */
import React from 'react'
import { Iconfont, ToolBar as CompToolBar } from '@components'
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
  const { type, filter, airtime, month, list } = $.state
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
        icon='filter'
        iconColor={_.colorMain}
        text={typeCn}
        type='main'
        heatmap='排行榜.类型选择'
        onSelect={$.onTypeSelect}
      />
      {typeCn !== '音乐' && (
        <CompToolBar.Popover
          data={filterData.data.map(item => item.label)}
          text={filterCn === '全部' ? '类型' : filterCn}
          type={filter === '' ? 'desc' : 'main'}
          heatmap='排行榜.筛选选择'
          onSelect={title => $.onFilterSelect(title, filterData)}
        />
      )}
      <CompToolBar.Popover
        data={DATA_AIRTIME}
        text={airtime || '年'}
        type={airtime === '' ? 'desc' : 'main'}
        heatmap='排行榜.年选择'
        onSelect={$.onAirdateSelect}
      />
      <CompToolBar.Popover
        data={DATA_MONTH}
        text={month || '月'}
        type={month === '' ? 'desc' : 'main'}
        heatmap='排行榜.月选择'
        onSelect={$.onMonthSelect}
      />
      <CompToolBar.Touchable heatmap='排行榜.切换布局' onSelect={$.toggleList}>
        <Iconfont
          style={_.mr.xs}
          name='list'
          size={14}
          color={list ? _.colorMain : _.colorDesc}
        />
        <Iconfont
          style={_.ml.sm}
          name='order'
          size={13}
          color={!list ? _.colorMain : _.colorDesc}
        />
      </CompToolBar.Touchable>
    </CompToolBar>
  )
}

export default obc(ToolBar)
