/*
 * @Author: czy0729
 * @Date: 2020-04-25 14:54:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-07 15:15:42
 */
import React from 'react'
import { ToolBar as ToolBarComp } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { MODEL_MONO_WORKS_ORDERBY, MONO_WORKS_ORDERBY } from '@constants'
import { MonoWorksOrderbyCn } from '@types'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'

function ToolBar() {
  const { $ } = useStore<Ctx>()
  const { order, position } = $.state
  const { filters } = $.monoWorks
  return (
    <ToolBarComp>
      <ToolBarComp.Popover
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
          <ToolBarComp.Popover
            key={item.title}
            data={data}
            text={find.title === '全部' ? item.title : find.title || item.title}
            type={find.title === '全部' ? undefined : 'desc'}
            heatmap='作品.职位选择'
            onSelect={label => $.onFilterSelect(label, item.data)}
          />
        )
      })}
    </ToolBarComp>
  )
}

export default ob(ToolBar, COMPONENT)
