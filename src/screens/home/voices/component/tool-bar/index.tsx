/*
 * @Author: czy0729
 * @Date: 2020-04-28 00:24:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 11:38:46
 */
import React from 'react'
import { Heatmap, ToolBar as ToolBarComp } from '@components'
import { userStore, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { DATA_STATUS } from '../../ds'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function ToolBar() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const { position, status } = $.state
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

        {userStore.isWebLogin && (
          <ToolBarComp.Popover
            data={DATA_STATUS}
            text={status === '全部' ? '状态' : status}
            type={status !== '全部' ? 'desc' : 'sub'}
            onSelect={$.onStatus}
          />
        )}

        <Heatmap id='角色.职位选择' />
      </ToolBarComp>
    )
  })
}

export default ToolBar
