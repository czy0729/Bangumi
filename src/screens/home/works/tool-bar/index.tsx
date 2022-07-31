/*
 * @Author: czy0729
 * @Date: 2020-04-25 14:54:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-31 18:27:15
 */
import React from 'react'
import { ToolBar as CompToolBar } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { MODEL_MONO_WORKS_ORDERBY, MONO_WORKS_ORDERBY } from '@constants'
import { MonoWorksOrderbyCn } from '@types'
import { Ctx } from '../types'

function ToolBar(props, { $ }: Ctx) {
  const { order, position, list, fixed, collected } = $.state
  const { filters } = $.monoWorks
  return (
    <CompToolBar>
      <CompToolBar.Popover
        data={MONO_WORKS_ORDERBY.map(item => item.label)}
        icon='md-sort'
        iconColor={_.colorDesc}
        text={MODEL_MONO_WORKS_ORDERBY.getLabel<MonoWorksOrderbyCn>(order)}
        type='desc'
        heatmap='作品.排序选择'
        onSelect={$.onOrderSelect}
      />
      {filters.map(item => {
        const data = item.data.map(i => i.title)
        const find = item.data.find(i => i.value === position) || {
          title: '全部'
        }
        return (
          <CompToolBar.Popover
            key={item.title}
            data={data}
            text={find.title === '全部' ? item.title : find.title || item.title}
            type={find.title === '全部' ? undefined : 'desc'}
            heatmap='作品.职位选择'
            onSelect={label => $.onFilterSelect(label, item.data)}
          />
        )
      })}
      <CompToolBar.Popover
        data={[
          `布局（${list ? '列表' : '网格'}）`,
          `筛选（${fixed ? '固定' : '浮动'}）`,
          `收藏（${collected ? '显示' : '隐藏'}）`
        ]}
        icon='md-more-vert'
        iconColor={_.colorDesc}
        iconSize={20}
        type='desc'
        transparent
        onSelect={title => {
          if (title.includes('布局')) return $.onToggleList()
          if (title.includes('筛选')) return $.onToggleToolbar('fixed')
          if (title.includes('收藏')) return $.onToggleToolbar('collected')
        }}
      />
    </CompToolBar>
  )
}

export default obc(ToolBar)
