/*
 * @Author: czy0729
 * @Date: 2020-04-28 00:24:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-09 22:28:13
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Heatmap, ToolBar as ToolBarComp } from '@components'
import { userStore, useStore } from '@stores'
import { MODEL_MONO_VOICES_INNER_ORDERBY, MODEL_MONO_VOICES_OUTER_ORDERBY } from '@constants'
import { DATA_STATUS } from '../../ds'
import { COMPONENT, DATA_INNER_ORDERBY, DATA_OUTER_ORDERBY } from './ds'

import type { Ctx } from '../../types'

function ToolBar() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { position, status, outerOrder, innerOrder } = $.state
  const { filters = [] } = $.monoVoices

  const outerOrderText = MODEL_MONO_VOICES_OUTER_ORDERBY.getLabel(outerOrder)
  const innerOrderText = MODEL_MONO_VOICES_INNER_ORDERBY.getLabel(innerOrder)

  return (
    <ToolBarComp>
      <ToolBarComp.Popover
        data={DATA_OUTER_ORDERBY}
        text={!outerOrderText || outerOrderText === '默认' ? '外层排序' : outerOrderText}
        type={outerOrder ? 'main' : 'sub'}
        onSelect={$.onOuterOrderSelect}
      />

      <ToolBarComp.Popover
        data={DATA_INNER_ORDERBY}
        text={!innerOrderText || innerOrderText === '默认' ? '内层排序' : innerOrderText}
        type={innerOrder ? 'main' : 'sub'}
        onSelect={$.onInnerOrderSelect}
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
}

export default observer(ToolBar)
