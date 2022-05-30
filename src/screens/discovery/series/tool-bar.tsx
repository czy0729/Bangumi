/*
 * @Author: czy0729
 * @Date: 2022-04-19 17:07:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-29 12:37:34
 */
import React from 'react'
import { ToolBar as CompToolBar } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { DATA_AIRTIME } from '@constants'
import { DATA_SORT, DATA_FILTER, DATA_STATUS } from './store'

function ToolBar(props, { $ }) {
  const { sort, filter, airtime, status, fixed } = $.state
  return (
    <CompToolBar>
      <CompToolBar.Popover
        data={DATA_SORT}
        icon='md-sort'
        iconColor={sort ? _.colorDesc : _.colorSub}
        text={sort || '排序'}
        type={sort ? 'desc' : undefined}
        onSelect={$.onSortSelect}
      />
      <CompToolBar.Popover
        data={DATA_AIRTIME}
        text={airtime || '年份'}
        type={airtime ? 'desc' : undefined}
        onSelect={$.onAirtimeSelect}
      />
      <CompToolBar.Popover
        data={DATA_FILTER}
        text={filter || '类型'}
        type={filter ? 'desc' : undefined}
        onSelect={$.onFilterSelect}
      />
      <CompToolBar.Popover
        data={DATA_STATUS}
        text={status || '状态'}
        type={status ? 'desc' : undefined}
        onSelect={$.onStatusSelect}
      />
      <CompToolBar.Popover
        data={[`工具栏 · ${fixed ? '固定' : '浮动'}`]}
        icon='md-more-vert'
        iconColor={_.colorDesc}
        iconSize={20}
        type='desc'
        transparent
        onSelect={title => {
          if (title.includes('工具栏')) {
            $.toggleFixed()
          }
        }}
      />
    </CompToolBar>
  )
}

export default obc(ToolBar)
