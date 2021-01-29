/*
 * @Author: czy0729
 * @Date: 2020-04-28 00:24:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-30 01:16:33
 */
import React from 'react'
import { Heatmap, ToolBar as CompToolBar } from '@components'
import { obc } from '@utils/decorators'

function ToolBar(props, { $ }) {
  const { position } = $.state
  const { filters } = $.monoVoices
  return (
    <CompToolBar>
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
            type={find.title !== '全部' ? 'main' : 'sub'}
            onSelect={label => $.onFilterSelect(label, item.data)}
          />
        )
      })}
      <Heatmap id='角色.职位选择' />
    </CompToolBar>
  )
}

export default obc(ToolBar)
