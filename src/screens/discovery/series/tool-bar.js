/*
 * @Author: czy0729
 * @Date: 2022-04-19 17:07:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-20 16:58:00
 */
import React from 'react'
import { ToolBar as CompToolBar } from '@components'
import { obc } from '@utils/decorators'
import { DATA_AIRTIME } from '@constants'
import { DATA_SORT, DATA_FILTER, DATA_STATUS } from './store'

function ToolBar(props, { $ }) {
  const { sort, filter, airtime, status } = $.state
  return (
    <CompToolBar>
      <CompToolBar.Popover
        data={DATA_SORT}
        text={sort || '排序'}
        type={sort ? 'main' : 'desc'}
        onSelect={$.onSortSelect}
      />
      <CompToolBar.Popover
        data={DATA_FILTER}
        text={filter || '类型'}
        type={filter ? 'main' : 'desc'}
        onSelect={$.onFilterSelect}
      />
      <CompToolBar.Popover
        data={DATA_AIRTIME}
        text={airtime || '年份'}
        type={airtime ? 'main' : 'desc'}
        onSelect={$.onAirtimeSelect}
      />
      <CompToolBar.Popover
        data={DATA_STATUS}
        text={status || '状态'}
        type={status ? 'main' : 'desc'}
        onSelect={$.onStatusSelect}
      />
    </CompToolBar>
  )
}

export default obc(ToolBar)
