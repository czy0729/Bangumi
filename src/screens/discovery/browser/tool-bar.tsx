/*
 * @Author: czy0729
 * @Date: 2019-06-08 04:35:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-29 14:24:05
 */
import React from 'react'
import { ToolBar as CompToolBar } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { DATA_BROWSER_AIRTIME, DATA_BROWSER_MONTH } from '@constants'
import { MODEL_SUBJECT_TYPE } from '@constants/model'

const typeData = MODEL_SUBJECT_TYPE.data.map(item => item.title)

function ToolBar(props, { $ }) {
  const { type, airtime, month, layout, fixed, collected } = $.state
  const typeCn = MODEL_SUBJECT_TYPE.getTitle(type)
  return (
    <CompToolBar style={!$.isList && _.mb.sm}>
      <CompToolBar.Popover
        data={typeData}
        icon='md-filter-list'
        iconColor={_.colorDesc}
        text={typeCn}
        type='desc'
        heatmap='索引.类型选择'
        onSelect={$.onTypeSelect}
      />
      <CompToolBar.Icon
        icon='md-arrow-back'
        iconColor={_.colorDesc}
        onSelect={$.onAirdatePrev}
      />
      <CompToolBar.Popover
        data={DATA_BROWSER_AIRTIME}
        text={airtime || '年'}
        type='desc'
        heatmap='索引.年选择'
        onSelect={$.onAirdateSelect}
      />
      <CompToolBar.Popover
        data={DATA_BROWSER_MONTH}
        text={`${month}月` || '月'}
        type='desc'
        heatmap='索引.月选择'
        onSelect={$.onMonthSelect}
      />
      <CompToolBar.Icon
        icon='md-arrow-forward'
        iconColor={_.colorDesc}
        onSelect={$.onAirdateNext}
      />
      <CompToolBar.Popover
        data={[
          `工具栏 · ${fixed ? '固定' : '浮动'}`,
          `布　局 · ${layout === 'list' ? '列表' : '网格'}`,
          `已收藏 · ${collected ? '显示' : '隐藏'}`
        ]}
        icon='md-more-vert'
        iconColor={_.colorDesc}
        iconSize={20}
        type='desc'
        transparent
        onSelect={title => {
          if (title.includes('布　局')) {
            $.switchLayout()
          } else if (title.includes('工具栏')) {
            $.toggleFixed()
          } else if (title.includes('已收藏')) {
            $.toggleCollected()
          }
        }}
      />
    </CompToolBar>
  )
}

export default obc(ToolBar)
