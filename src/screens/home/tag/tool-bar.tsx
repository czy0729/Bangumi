/*
 * @Author: czy0729
 * @Date: 2019-06-08 04:35:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-30 08:07:58
 */
import React from 'react'
import { ToolBar as CompToolBar } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { DATA_AIRTIME, DATA_MONTH } from '@constants'
import { MODEL_TAG_ORDERBY } from '@constants/model'

const orderData = MODEL_TAG_ORDERBY.data.map(item => item.label)

function ToolBar(props, { $ }) {
  const { order, airtime, month, fixed, list, collected } = $.state
  return (
    <CompToolBar style={!list && _.mb.sm}>
      <CompToolBar.Popover
        data={orderData}
        icon='md-sort'
        iconColor={_.colorDesc}
        text={order ? MODEL_TAG_ORDERBY.getLabel(order) : '名称'}
        type='desc'
        heatmap='用户标签.排序选择'
        onSelect={$.onOrderSelect}
      />
      <CompToolBar.Popover
        data={DATA_AIRTIME}
        text={airtime || '年'}
        type={airtime ? 'desc' : 'sub'}
        heatmap='用户标签.年选择'
        onSelect={$.onAirdateSelect}
      />
      <CompToolBar.Popover
        data={DATA_MONTH}
        text={month ? `${month}月` : '月'}
        type={month ? 'desc' : 'sub'}
        heatmap='用户标签.月选择'
        onSelect={$.onMonthSelect}
      />
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
          } else if (title.includes('已收藏')) {
            $.toggleCollected()
          }
        }}
      />
    </CompToolBar>
  )
}

export default obc(ToolBar)
