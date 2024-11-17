/*
 * @Author: czy0729
 * @Date: 2020-04-28 00:24:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 11:38:46
 */
import React from 'react'
import { Heatmap, ToolBar as ToolBarComp } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'

function ToolBar() {
  const { $ } = useStore<Ctx>()
  const { position } = $.state
  const { filters = [] } = $.monoVoices
  return (
    <ToolBarComp>
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
            type={find.title !== '全部' ? 'desc' : 'sub'}
            onSelect={(label: string) => $.onFilterSelect(label, item.data)}
          />
        )
      })}
      <Heatmap id='角色.职位选择' />
    </ToolBarComp>
  )
}

export default ob(ToolBar, COMPONENT)
